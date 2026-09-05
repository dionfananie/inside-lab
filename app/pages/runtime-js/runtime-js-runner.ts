import { parse } from "acorn";

export type RuntimeEntry = {
  kind: string;
  text: string;
  line?: number;
};

export function compileRuntimeSource(source: string, capture: string) {
  const tree = parse(source, {
    ecmaVersion: "latest",
    sourceType: "script",
    allowAwaitOutsideFunction: true,
    locations: true,
  });
  let compiled = source;

  for (const node of [...tree.body].reverse()) {
    if (node.type === "ExpressionStatement" && !("directive" in node)) {
      const expression = (
        node as typeof node & { expression: { start: number; end: number } }
      ).expression;
      compiled =
        compiled.slice(0, node.start) +
        `${capture}(( ${source.slice(expression.start, expression.end)} ), ${node.loc?.start.line});` +
        compiled.slice(node.end);
    }
  }

  return compiled;
}

export function createRuntimeRunner(
  source: string,
  onEntry: (entry: RuntimeEntry) => void,
  onState: (state: string, elapsed: number) => void,
) {
  const started = performance.now();
  const capture = `__capture_${Math.random().toString(36).slice(2)}`;
  let compiled: string;

  try {
    compiled = compileRuntimeSource(source, capture);
  } catch (error) {
    onEntry({ kind: "error", text: String(error) });
    onState("Error", performance.now() - started);
    return () => {};
  }

  const script = `
    const send = self.postMessage.bind(self);
    let count = 0;
    function format(value, seen = new WeakSet(), depth = 0) {
      if (typeof value === 'string') return JSON.stringify(value.length > 10000 ? value.slice(0, 10000) + '…' : value);
      if (typeof value === 'bigint') return value + 'n';
      if (typeof value === 'function') return '[Function ' + (value.name || 'anonymous') + ']';
      if (value === null || typeof value !== 'object') return String(value);
      if (seen.has(value)) return '[Circular]';
      if (depth > 4) return '[…]';
      seen.add(value);
      if (value instanceof Error) return value.name + ': ' + value.message;
      if (value instanceof Date) return value.toISOString();
      if (value instanceof Map) return 'Map ' + format(Array.from(value.entries()), seen, depth + 1);
      if (value instanceof Set) return 'Set ' + format(Array.from(value), seen, depth + 1);
      if (value instanceof Promise) return '[Promise]';
      const keys = Object.keys(value).slice(0, 50);
      const items = keys.map((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        return (Array.isArray(value) ? '' : key + ': ') +
          (descriptor && 'value' in descriptor ? format(descriptor.value, seen, depth + 1) : '[Getter]');
      });
      seen.delete(value);
      return Array.isArray(value)
        ? '[ ' + items.join(', ') + (value.length > 50 ? ', …' : '') + ' ]'
        : '{\\n  ' + items.join(',\\n  ') + '\\n}';
    }
    function emit(kind, values, line) {
      if (count++ >= 200) return;
      try {
        send({ type: 'entry', entry: { kind, text: values.map((value) => format(value)).join(' '), line } });
      } catch {
        send({ type: 'entry', entry: { kind: 'error', text: 'Unable to display this value' } });
      }
    }
    self.console = Object.fromEntries(
      ['log', 'info', 'warn', 'error', 'debug', 'table', 'dir'].map((kind) => [
        kind,
        (...values) => emit(kind, values),
      ]),
    );
    self.addEventListener('error', (event) => {
      emit('error', [event.message]);
      send({ type: 'error' });
    });
    self.addEventListener('unhandledrejection', (event) => {
      emit('error', [event.reason]);
      send({ type: 'error' });
    });
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    (async () => {
      try {
        await new AsyncFunction(${JSON.stringify(capture)}, ${JSON.stringify(compiled)})(
          (value, line) => {
            if (value !== undefined) emit('result', [value], line);
          },
        );
        send({ type: 'done' });
      } catch (error) {
        emit('error', [error]);
        send({ type: 'error' });
      }
    })();
  `;

  const url = URL.createObjectURL(new Blob([script], { type: "text/javascript" }));
  let worker: Worker;

  try {
    worker = new Worker(url);
  } catch (error) {
    URL.revokeObjectURL(url);
    onEntry({ kind: "error", text: String(error) });
    onState("Error", 0);
    return () => {};
  }

  let failed = false;
  let completed = false;
  const timeout = setTimeout(() => {
    worker.terminate();
    URL.revokeObjectURL(url);
    if (!failed && !completed) {
      onEntry({
        kind: "warn",
        text: "Execution stopped after 5 seconds. Check for an infinite loop or long-running promise.",
      });
      onState("Stopped", performance.now() - started);
    }
  }, 5000);

  worker.onmessage = (event) => {
    if (event.data.type === "entry") {
      onEntry(event.data.entry);
      if (event.data.entry.kind === "error") failed = true;
    }
    if (event.data.type === "done" || event.data.type === "error") {
      completed = true;
      onState(
        failed || event.data.type === "error" ? "Error" : "Ready",
        performance.now() - started,
      );
    }
  };
  worker.onerror = (event) => {
    failed = true;
    onEntry({ kind: "error", text: event.message });
    onState("Error", performance.now() - started);
  };

  return () => {
    clearTimeout(timeout);
    worker.terminate();
    URL.revokeObjectURL(url);
  };
}
