import { Square } from "lucide-react";

import { Button } from "~/components/ui/button";

import type { RuntimeJsModel } from "../hook";

type RuntimeStatusBarProps = {
  runtime: RuntimeJsModel;
};

export default function RuntimeStatusBar({ runtime }: RuntimeStatusBarProps) {
  const { status, elapsed, lineCount, paused, setPaused } = runtime;

  return (
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
  );
}
