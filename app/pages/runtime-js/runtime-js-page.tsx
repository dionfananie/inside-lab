import type { CSSProperties, KeyboardEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Code, Editor, type Theme } from "@sugar-high/react";
import {
  monokai,
  oneDarkPro,
  taffy,
  tokyoNight,
  vercel,
} from "@sugar-high/react/themes";
import {
  Braces,
  CircleCheck,
  Maximize2,
  Minimize2,
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

const draculaTheme = {
  background: "#282a36",
  foreground: "#f8f8f2",
  caret: "#f8f8f2",
  lineNumber: "#6272a4",
  lineHighlight: "#44475a",
  identifier: "#f8f8f2",
  keyword: "#ff79c6",
  string: "#f1fa8c",
  class: "#8be9fd",
  property: "#50fa7b",
  entity: "#bd93f9",
  jsxliterals: "#ffb86c",
  sign: "#ff79c6",
  comment: "#6272a4",
} satisfies Theme;

const themes = {
  Dracula: draculaTheme,
  Taffy: taffy.dark,
  "One Dark": oneDarkPro.dark,
  "Tokyo Night": tokyoNight.dark,
  Monokai: monokai.dark,
  "Vercel Light": vercel.light,
};

type ThemeName = keyof typeof themes;

const defaultFontSize = 14;
const minimumFontSize = 10;
const maximumFontSize = 32;

const closingPair = {
  "(": ")",
  "[": "]",
  "{": "}",
} as const;

const openingPair = {
  ")": "(",
  "]": "[",
  "}": "{",
} as const;

const settingsKey = "inside-lab:play:settings:v1";
const themeNames = Object.keys(themes) as ThemeName[];

type StoredSettings = {
  theme: ThemeName;
  fontSize: number;
};

const fallbackSettings: StoredSettings = {
  theme: "Taffy",
  fontSize: defaultFontSize,
};

function loadSettings(): StoredSettings {
  if (typeof window === "undefined") return fallbackSettings;
  try {
    const raw = window.localStorage.getItem(settingsKey);
    if (!raw) return fallbackSettings;
    const parsed = JSON.parse(raw) as Partial<StoredSettings>;
    return {
      theme: themeNames.includes(parsed.theme as ThemeName)
        ? (parsed.theme as ThemeName)
        : fallbackSettings.theme,
      fontSize:
        Number.isFinite(parsed.fontSize) && typeof parsed.fontSize === "number"
          ? Math.min(
              maximumFontSize,
              Math.max(minimumFontSize, Math.round(parsed.fontSize)),
            )
          : fallbackSettings.fontSize,
    };
  } catch {
    return fallbackSettings;
  }
}

export default function RuntimeJsPage() {
  const [source, setSource] = useState(initialSource);
  const [themeName, setThemeName] = useState<ThemeName>(fallbackSettings.theme);
  const [entries, setEntries] = useState<RuntimeEntry[]>([]);
  const [status, setStatus] = useState("Starting");
  const [elapsed, setElapsed] = useState(0);
  const [revision, setRevision] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(fallbackSettings.fontSize);
  const [fontSizeInput, setFontSizeInput] = useState(
    String(fallbackSettings.fontSize),
  );
  const [settingsReady, setSettingsReady] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const theme = themes[themeName];
  const themePalette = [
    theme.keyword,
    theme.string,
    theme.class,
    theme.property,
    theme.entity,
  ];
  const fullscreenLabel = fullscreen
    ? "Exit fullscreen editor"
    : "Fullscreen editor";
  const lineCount = source.split("\n").length;
  const lineHeight = Math.round(fontSize * 1.5);
  const editorContentHeight = lineCount * lineHeight + 36;

  useLayoutEffect(() => {
    const stored = loadSettings();
    setThemeName(stored.theme);
    setFontSize(stored.fontSize);
    setFontSizeInput(String(stored.fontSize));
    setSettingsReady(true);
  }, []);

  useEffect(() => {
    if (!settingsReady) return;
    try {
      window.localStorage.setItem(
        settingsKey,
        JSON.stringify({ theme: themeName, fontSize }),
      );
    } catch {}
  }, [settingsReady, themeName, fontSize]);

  useLayoutEffect(() => {
    const editor = editorRef.current;
    const textarea = textareaRef.current;
    if (!editor || !textarea) return;

    textarea.scrollTop = 0;
    const caretLine =
      source.slice(0, textarea.selectionStart).split("\n").length - 1;
    const caretTop = 18 + caretLine * lineHeight;
    const safeEdge = 18;

    if (caretTop < editor.scrollTop + safeEdge) {
      editor.scrollTop = Math.max(0, caretTop - safeEdge);
    } else if (
      caretTop + lineHeight >
      editor.scrollTop + editor.clientHeight - safeEdge
    ) {
      editor.scrollTop =
        caretTop + lineHeight - editor.clientHeight + safeEdge;
    }
  }, [source, lineHeight]);

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

  useEffect(() => {
    if (!fullscreen) return;

    const previousOverflow = document.documentElement.style.overflow;
    const exitFullscreen = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
    };

    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", exitFullscreen);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", exitFullscreen);
    };
  }, [fullscreen]);

  function setEditorSelection(start: number, end = start) {
    requestAnimationFrame(() => {
      textareaRef.current?.setSelectionRange(start, end);
    });
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.nativeEvent.isComposing ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    ) {
      return;
    }

    const textarea = event.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const closing = closingPair[event.key as keyof typeof closingPair];
    const opening = openingPair[event.key as keyof typeof openingPair];

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const indentUnit = "  ";
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const leading = /^[ \t]*/.exec(value.slice(lineStart, start))?.[0] ?? "";
      const before = value.slice(0, start);
      const after = value.slice(end);
      const previousChar = start > 0 ? value[start - 1] : "";
      const nextChar = after[0] ?? "";

      const openedHere = "{[(".includes(previousChar);
      const closerAdjacent = "}])".includes(nextChar);

      if (previousChar === "{" && closerAdjacent) {
        const innerIndent = leading + indentUnit;
        setSource(`${before}\n${innerIndent}\n${leading}${after}`);
        setEditorSelection(before.length + 1 + innerIndent.length);
        return;
      }

      const nextIndent = openedHere ? leading + indentUnit : leading;
      setSource(`${before}\n${nextIndent}${after}`);
      setEditorSelection(before.length + 1 + nextIndent.length);
      return;
    }

    if (closing) {
      event.preventDefault();
      setSource(
        `${value.slice(0, start)}${event.key}${value.slice(start, end)}${closing}${value.slice(end)}`,
      );
      setEditorSelection(start + 1, end + 1);
      return;
    }

    if (
      start === end &&
      opening &&
      value[start] === event.key
    ) {
      event.preventDefault();
      setEditorSelection(start + 1);
      return;
    }

    if (event.key === "Backspace" && start === end && start > 0) {
      const opening = value[start - 1] as keyof typeof closingPair;
      if (closingPair[opening] === value[start]) {
        event.preventDefault();
        setSource(`${value.slice(0, start - 1)}${value.slice(start + 1)}`);
        setEditorSelection(start - 1);
      }
    }
  }

  function restoreStarter() {
    setSource(initialSource);
    setPaused(false);
    setRevision((current) => current + 1);
  }

  function changeFontSize(value: string) {
    setFontSizeInput(value);
    const nextFontSize = Number(value);
    if (
      Number.isFinite(nextFontSize) &&
      nextFontSize >= minimumFontSize &&
      nextFontSize <= maximumFontSize
    ) {
      setFontSize(nextFontSize);
    }
  }

  function commitFontSize() {
    const parsedFontSize =
      fontSizeInput.trim() === "" ? fontSize : Number(fontSizeInput);
    const nextFontSize = Number.isFinite(parsedFontSize)
      ? Math.min(
          maximumFontSize,
          Math.max(minimumFontSize, Math.round(parsedFontSize)),
        )
      : fontSize;

    setFontSize(nextFontSize);
    setFontSizeInput(String(nextFontSize));
  }

  return (
    <main
      className={`runtime-workspace ${themeName === "Vercel Light" ? "runtime-light" : "dark"}${
        fullscreen ? " runtime-fullscreen" : ""
      }`}
      style={
        {
          "--runtime-editor-bg": theme.background,
          "--runtime-font-size": `${fontSize}px`,
        } as CSSProperties
      }
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
            <div className="runtime-theme-picker">
              <Palette size={16} />
              <span
                className="runtime-theme-swatches"
                aria-hidden="true"
                title={`${themeName} color palette`}
              >
                {themePalette.map((color, index) => (
                  <i
                    className="runtime-theme-swatch"
                    style={{ backgroundColor: color }}
                    key={`${color}-${index}`}
                  />
                ))}
              </span>
              <NativeSelect
                aria-label="Editor and output color theme"
                value={themeName}
                onChange={(event) => setThemeName(event.target.value as ThemeName)}
              >
                {Object.keys(themes).map((name) => (
                  <NativeSelectOption key={name}>{name}</NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <label className="runtime-font-size">
              <span className="runtime-font-size-label">Font size</span>
              <input
                type="number"
                min={minimumFontSize}
                max={maximumFontSize}
                step="1"
                inputMode="numeric"
                value={fontSizeInput}
                onChange={(event) => changeFontSize(event.currentTarget.value)}
                onBlur={commitFontSize}
                onKeyDown={(event) => {
                  if (event.key === "Enter") event.currentTarget.blur();
                }}
                aria-label="Editor font size in pixels"
              />
              <span className="runtime-font-size-unit" aria-hidden="true">
                px
              </span>
            </label>
            <span className="runtime-toolbar-divider" />
            <Button
              variant="ghost"
              className="runtime-tool-button"
              onClick={() => setFullscreen((current) => !current)}
              title={fullscreenLabel}
              aria-label={fullscreenLabel}
              aria-pressed={fullscreen}
            >
              {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </Button>
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
                fontSize={`${fontSize}px`}
                fontFamily="'Geist Mono', 'Cascadia Code', 'SFMono-Regular', Consolas, monospace"
                theme={theme}
                textareaProps={{
                  "aria-label": "JavaScript source code",
                  spellCheck: false,
                  onKeyDown: handleEditorKeyDown,
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
                    <Code
                      lang="javascript"
                      theme={theme}
                      padding="0"
                      wrapLongLines
                      fontSize={`${fontSize}px`}
                    >
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
