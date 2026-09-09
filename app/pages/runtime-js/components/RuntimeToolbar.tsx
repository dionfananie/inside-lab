import {
  Maximize2,
  Minimize2,
  Palette,
  Redo2,
  RotateCcw,
  Undo2,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "~/components/ui/native-select";

import { maximumFontSize, minimumFontSize, themes } from "../data";
import type { RuntimeJsModel } from "../hook";
import type { ThemeName } from "../types";

type RuntimeToolbarProps = {
  runtime: RuntimeJsModel;
};

export default function RuntimeToolbar({ runtime }: RuntimeToolbarProps) {
  const {
    themeName,
    setThemeName,
    themePalette,
    fontSizeInput,
    changeFontSize,
    commitFontSize,
    undoSource,
    redoSource,
    history,
    fullscreen,
    setFullscreen,
    fullscreenLabel,
    restoreStarter,
  } = runtime;

  return (
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
          className="runtime-tool-button runtime-history-button"
          onClick={undoSource}
          disabled={history.past.length === 0}
          title="Undo (Ctrl/Cmd+Z)"
          aria-label="Undo code change"
          aria-keyshortcuts="Control+Z Meta+Z"
        >
          <Undo2 size={16} />
        </Button>
        <Button
          variant="ghost"
          className="runtime-tool-button runtime-history-button"
          onClick={redoSource}
          disabled={history.future.length === 0}
          title="Redo (Ctrl+Y or Ctrl/Cmd+Shift+Z)"
          aria-label="Redo code change"
          aria-keyshortcuts="Control+Y Control+Shift+Z Meta+Shift+Z"
        >
          <Redo2 size={16} />
        </Button>
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
  );
}
