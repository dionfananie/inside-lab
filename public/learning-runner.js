/* Learner code runs only in this disposable Worker, never on the UI thread. */
const send = self.postMessage.bind(self);
function explainError(error) {
  const guidance = {
    SyntaxError:
      'Penulisan kode belum sesuai. Periksa tanda kutip, kurung, dan bentuk kode yang diminta.',
    ReferenceError:
      'Ada nama yang belum dikenali. Periksa ejaan, huruf besar-kecil, dan apakah variabel yang diminta sudah dibuat.',
    TypeError:
      'Operasi ini tidak sesuai dengan nilai yang digunakan. Periksa tipe data dan cara penggunaannya.',
    RangeError:
      'Operasi melewati batas yang dapat diproses. Periksa nilai dan perhitunganmu.',
  };
  const name = error?.name ?? 'Error';
  const detail = error?.message ?? String(error);
  return (
    (guidance[name] ??
      'Kode belum berhasil dijalankan. Periksa kembali kode dan petunjuk latihan.') +
    '\n' +
    name +
    ': ' +
    detail
  );
}
function format(value, depth = 0, seen = new Set()) {
  if (depth > 5) return '…';
  if (typeof value === 'string') return JSON.stringify(value.slice(0, 2000));
  if (value === undefined) return 'undefined';
  if (typeof value === 'number')
    return Object.is(value, -0) ? '-0' : String(value);
  if (value === null || typeof value !== 'object') return String(value);
  if (seen.has(value)) return '[Circular]';
  seen.add(value);
  const result = Array.isArray(value)
    ? '[' +
      value
        .slice(0, 50)
        .map((v) => format(v, depth + 1, seen))
        .join(', ') +
      ']'
    : '{' +
      Object.keys(value)
        .slice(0, 30)
        .map((k) => k + ': ' + format(value[k], depth + 1, seen))
        .join(', ') +
      '}';
  seen.delete(value);
  return result;
}
function equal(a, b) {
  if (Object.is(a, b)) return true;
  if (
    typeof a === 'number' &&
    typeof b === 'number' &&
    Number.isFinite(a) &&
    Number.isFinite(b)
  )
    return Math.abs(a - b) < 1e-9;
  if (
    !a ||
    !b ||
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    Array.isArray(a) !== Array.isArray(b)
  )
    return false;
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length &&
    keys.every((k) => Object.hasOwn(b, k) && equal(a[k], b[k]))
  );
}
async function evaluate(code, mode, probe, inputs, args = []) {
  const logs = [];
  const log = (...values) => {
    if (logs.length < 60)
      logs.push(
        values
          .map((v) => (typeof v === 'string' ? v.slice(0, 2000) : format(v)))
          .join(' '),
      );
  };
  const capture = Object.freeze({
    log,
    info: log,
    warn: log,
    error: log,
    clear: () => {
      logs.length = 0;
    },
  });
  const suffix =
    mode === 'expression'
      ? 'return (\n' + code + '\n);'
      : mode === 'function'
        ? code + '\n;return (' + probe + ')(...__args);'
        : code + '\n;return ' + (probe ? '(' + probe + ')' : 'undefined') + ';';
  const pending = new Function(
    'console',
    '__args',
    ...Object.keys(inputs),
    '"use strict";\n' + suffix,
  )(capture, args, ...Object.values(inputs));
  const value = await pending;
  // Give queued microtasks and zero-delay callbacks a chance to write console output.
  if (mode === 'console') await new Promise((resolve) => setTimeout(resolve, 0));
  return { value: mode === 'console' ? logs.join('\n') : value, logs };
}
self.onmessage = async ({ data }) => {
  const { id, code, mode, probe, tests, action } = data;
  try {
    if (action === 'run') {
      const r = await evaluate(code, mode, probe, tests[0].inputs, tests[0].args);
      send({ id, logs: r.logs, value: format(r.value) });
    } else {
      const results = [];
      for (const test of tests) {
        try {
          const r = await evaluate(code, mode, probe, test.inputs, test.args);
          results.push({
            name: test.name,
            pass: equal(r.value, test.expected),
            input: format(test.args?.length ? test.args : test.inputs),
            expected: format(test.expected),
            received: format(r.value),
          });
        } catch (e) {
          results.push({
            name: test.name,
            pass: false,
            input: format(test.inputs),
            expected: format(test.expected),
            received: explainError(e),
          });
        }
      }
      send({ id, results });
    }
  } catch (e) {
    send({ id, error: explainError(e), logs: [] });
  }
};
