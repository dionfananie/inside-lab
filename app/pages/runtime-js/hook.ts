import type { KeyboardEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  closingPair,
  fallbackSettings,
  initialSource,
  maximumFontSize,
  maximumHistoryEntries,
  minimumFontSize,
  openingPair,
  settingsKey,
  themes,
} from "./data";
import { loadSettings } from "./helpers";
import {
  createRuntimeRunner,
  type RuntimeEntry,
} from "./runtime-js-runner";
import type { EditorHistory, ThemeName } from "./types";

export default function useRuntimeJs() {
  const [source, setSource] = useState(initialSource);
  const [history, setHistory] = useState<EditorHistory>({
    past: [],
    future: [],
  });
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

  function updateSource(nextSource: string) {
    if (nextSource === source) return;
    setHistory((current) => ({
      past: [...current.past.slice(-(maximumHistoryEntries - 1)), source],
      future: [],
    }));
    setSource(nextSource);
  }

  function undoSource() {
    const previousSource = history.past.at(-1);
    if (previousSource === undefined) return;
    setHistory({
      past: history.past.slice(0, -1),
      future: [source, ...history.future].slice(0, maximumHistoryEntries),
    });
    setSource(previousSource);
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function redoSource() {
    const nextSource = history.future[0];
    if (nextSource === undefined) return;
    setHistory({
      past: [...history.past.slice(-(maximumHistoryEntries - 1)), source],
      future: history.future.slice(1),
    });
    setSource(nextSource);
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.nativeEvent.isComposing) return;

    const key = event.key.toLowerCase();
    const commandKey = event.ctrlKey || event.metaKey;
    if (commandKey && key === "z") {
      event.preventDefault();
      if (event.shiftKey) redoSource();
      else undoSource();
      return;
    }
    if (event.ctrlKey && key === "y") {
      event.preventDefault();
      redoSource();
      return;
    }
    if (commandKey || event.altKey) return;

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
        updateSource(`${before}\n${innerIndent}\n${leading}${after}`);
        setEditorSelection(before.length + 1 + innerIndent.length);
        return;
      }

      const nextIndent = openedHere ? leading + indentUnit : leading;
      updateSource(`${before}\n${nextIndent}${after}`);
      setEditorSelection(before.length + 1 + nextIndent.length);
      return;
    }

    if (closing) {
      event.preventDefault();
      updateSource(
        `${value.slice(0, start)}${event.key}${value.slice(start, end)}${closing}${value.slice(end)}`,
      );
      setEditorSelection(start + 1, end + 1);
      return;
    }

    if (start === end && opening && value[start] === event.key) {
      event.preventDefault();
      setEditorSelection(start + 1);
      return;
    }

    if (event.key === "Backspace" && start === end && start > 0) {
      const opening = value[start - 1] as keyof typeof closingPair;
      if (closingPair[opening] === value[start]) {
        event.preventDefault();
        updateSource(`${value.slice(0, start - 1)}${value.slice(start + 1)}`);
        setEditorSelection(start - 1);
      }
    }
  }

  function restoreStarter() {
    updateSource(initialSource);
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

  return {
    source,
    history,
    themeName,
    setThemeName,
    entries,
    status,
    elapsed,
    paused,
    setPaused,
    fullscreen,
    setFullscreen,
    fontSize,
    fontSizeInput,
    editorRef,
    textareaRef,
    theme,
    themePalette,
    fullscreenLabel,
    lineCount,
    editorContentHeight,
    updateSource,
    undoSource,
    redoSource,
    handleEditorKeyDown,
    restoreStarter,
    changeFontSize,
    commitFontSize,
  };
}

export type RuntimeJsModel = ReturnType<typeof useRuntimeJs>;
