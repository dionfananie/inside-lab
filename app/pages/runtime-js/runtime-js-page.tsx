import type { CSSProperties } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Code, Editor } from "@sugar-high/react";
import {
  monokai,
  oneDarkPro,
  taffy,
  tokyoNight,
  vercel,
} from "@sugar-high/react/themes";
import {
  ArrowUpRight,
  Braces,
  CircleCheck,
  Palette,
  RotateCcw,
  Square,
  Terminal,
  Zap,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "~/components/ui/native-select";

import {
  createRuntimeRunner,
  type RuntimeEntry,
} from "./runtime-js-runner";

const initialSource = `// A little code. Instant answers.
const name = 'world'
console.log(\`Hello, \${name}!\`)

// Try changing these numbers
const numbers = [1, 2, 3, 4, 5]
numbers.map(n => n * 2)

// Objects, just as you expect
const project = {
  name: 'Runtime JS',
  live: true,
  possibilities: Infinity
}
project

// Async works here, too
await Promise.resolve('Ready when you are ✨')`;

const themes = {
  Taffy: taffy.dark,
  "One Dark": oneDarkPro.dark,
  "Tokyo Night": tokyoNight.dark,
  Monokai: monokai.dark,
  "Vercel Light": vercel.light,
};

type ThemeName = keyof typeof themes;

export default function RuntimeJsPage() {
  const [source, setSource] = useState(initialSource);
  const [themeName, setThemeName] = useState<ThemeName>("Taffy");
  const [entries, setEntries] = useState<RuntimeEntry[]>([]);
  const [status, setStatus] = useState("Starting");
  const [elapsed, setElapsed] = useState(0);
  const [revision, setRevision] = useState(0);
  const [paused, setPaused] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const theme = themes[themeName];
  const lineCount = source.split("\n").length;
  const editorContentHeight = lineCount * 21 + 36;

  useLayoutEffect(() => {
    const editor = editorRef.current;
    const textarea = textareaRef.current;
    if (!editor || !textarea) return;

    textarea.scrollTop = 0;
    const caretLine =
      source.slice(0, textarea.selectionStart).split("\n").length - 1;
    const caretTop = 18 + caretLine * 21;
    const safeEdge = 18;

    if (caretTop < editor.scrollTop + safeEdge) {
      editor.scrollTop = Math.max(0, caretTop - safeEdge);
    } else if (
      caretTop + 21 >
      editor.scrollTop + editor.clientHeight - safeEdge
    ) {
      editor.scrollTop =
        caretTop + 21 - editor.clientHeight + safeEdge;
    }
  }, [source]);

  useEffect(() => {
    if (paused) {
      setStatus("Paused");
      return;
    }

    setStatus("Typing");
    let stop = () => {};
    const timer = setTimeout(() => {
      setEntries([]);
      setStatus("Running");
      stop = createRuntimeRunner(
        source,
        (entry) =>
          setEntries((previous) => [...previous, entry].slice(-200)),
        (state, milliseconds) => {
          setStatus(state);
          setElapsed(milliseconds);
        },
      );
    }, 400);

    return () => {
      clearTimeout(timer);
      stop();
    };
  }, [source, revision, paused]);

  function restoreStarter() {
    setSource(initialSource);
    setPaused(false);
    setRevision((current) => current + 1);
  }

  return (
    <main
      className={`runtime-workspace ${themeName === "Vercel Light" ? "runtime-light" : "dark"}`}
      style={{ "--runtime-editor-bg": theme.background } as CSSProperties}
    >
      <header className="runtime-topbar">
        <a className="runtime-brand" href="/play" aria-label="Runtime JS home">
          <span className="runtime-brand-icon">
            <Braces size={22} />
          </span>
          runtime<span className="runtime-js-word">js</span>
          <span className="runtime-beta">PLAYGROUND</span>
        </a>
        <div className="runtime-header-note">Less setup. More experimenting.</div>
        <a
          className="runtime-sugar-link"
          href="https://github.com/huozhi/sugar-high"
          target="_blank"
          rel="noreferrer"
        >
          Powered by Sugar High <ArrowUpRight size={14} />
        </a>
      </header>

      <section className="runtime-intro">
        <div>
          <div className="runtime-eyebrow">
            <span /> YOUR JAVASCRIPT SCRATCHPAD
          </div>
          <h1>Think it. Type it. See it.</h1>
          <p>A place for quick ideas, curious experiments, and instant answers.</p>
        </div>
        <div className="runtime-live-badge">
          <Zap size={15} fill="currentColor" /> No run button needed
        </div>
      </section>

      <section className="runtime-playground" aria-label="JavaScript playground">
        <div className="runtime-toolbar">
          <div className="runtime-file-label">
            <span className="runtime-js-file">JS</span> playground.js
            <span className="runtime-file-dot" />
          </div>
          <div className="runtime-toolbar-controls">
            <Palette size={16} />
            <NativeSelect
              aria-label="Editor color theme"
              value={themeName}
              onChange={(event) => setThemeName(event.target.value as ThemeName)}
            >
              {Object.keys(themes).map((name) => (
                <NativeSelectOption key={name}>{name}</NativeSelectOption>
              ))}
            </NativeSelect>
            <span className="runtime-toolbar-divider" />
            <Button
              variant="ghost"
              className="runtime-tool-button"
              onClick={restoreStarter}
              title="Restore starter example"
              aria-label="Restore starter example"
            >
              <RotateCcw size={16} />
            </Button>
          </div>
        </div>

        <div className="runtime-panes">
          <section className="runtime-editor-pane" aria-label="Code editor">
            <div className="runtime-pane-heading">
              <span>
                <Braces size={15} /> SOURCE
              </span>
              <span>JavaScript</span>
            </div>
            <div className="runtime-editor-scroll">
              <Editor
                ref={editorRef}
                textareaRef={textareaRef}
                className="runtime-code-editor"
                style={
                  {
                    "--editor-content-height": `${editorContentHeight}px`,
                  } as CSSProperties
                }
                value={source}
                onChange={setSource}
                lang="javascript"
                controls={false}
                lineNumbers
                wrapLongLines={false}
                padding="24px"
                fontSize="14px"
                fontFamily="'Geist Mono', 'Cascadia Code', 'SFMono-Regular', Consolas, monospace"
                theme={theme}
                textareaProps={{
                  "aria-label": "JavaScript source code",
                  spellCheck: false,
                }}
              />
            </div>
          </section>

          <section className="runtime-output-pane" aria-label="Live output">
            <div className="runtime-pane-heading">
              <span>
                <Terminal size={15} /> OUTPUT
                <b className="runtime-count">{entries.length}</b>
              </span>
              <span className="runtime-live-text">
                <span
                  className={`runtime-dot ${paused ? "runtime-muted-dot" : ""}`}
                />
                {paused ? "Paused" : "Live"}
              </span>
            </div>
            <div
              className="runtime-output-scroll"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {entries.length ? (
                entries.map((entry, index) => (
                  <div
                    className={`runtime-result runtime-result-${entry.kind}`}
                    key={index}
                  >
                    <div className="runtime-result-meta">
                      <span>
                        {entry.kind === "result"
                          ? "↳"
                          : entry.kind === "error"
                            ? "!"
                            : "›"}
                      </span>
                      <span>{entry.line ? `line ${entry.line}` : entry.kind}</span>
                    </div>
                    <Code lang="javascript" theme={theme} padding="0" wrapLongLines>
                      {entry.text}
                    </Code>
                  </div>
                ))
              ) : (
                <div className="runtime-empty">
                  <Terminal size={25} />
                  <p>
                    {status === "Running"
                      ? "Evaluating your code…"
                      : "Your next idea starts here."}
                  </p>
                  <span>Write an expression or use console.log().</span>
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className="runtime-editor-status">
          <div>
            <span
              className={`runtime-dot ${status === "Error" || status === "Stopped" ? "runtime-error-dot" : ""}`}
            />
            <span>{status === "Ready" ? "All good" : status}</span>
            <span className="runtime-dim">{elapsed.toFixed(1)} ms</span>
          </div>
          <div>
            <span className="runtime-dim">{lineCount} lines</span>
            <Button
              variant="ghost"
              className="runtime-pause-button"
              onClick={() => setPaused((current) => !current)}
            >
              <Square size={11} />
              {paused ? "Resume auto-run" : "Pause auto-run"}
            </Button>
          </div>
        </footer>
      </section>

      <footer className="runtime-page-footer">
        <span>
          <CircleCheck size={14} /> Runs in your browser
        </span>
        <span>
          Auto-runs after 400 ms <span className="runtime-footer-dot">·</span>
          Tab to indent <span className="runtime-footer-dot">·</span>
          Async / await supported
        </span>
        <span className="runtime-footer-end">Make something click.</span>
      </footer>
    </main>
  );
}
