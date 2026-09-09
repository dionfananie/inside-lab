import { Code } from "@sugar-high/react";
import { Terminal } from "lucide-react";

import type { RuntimeJsModel } from "../hook";

type RuntimeOutputPaneProps = {
  runtime: RuntimeJsModel;
};

export default function RuntimeOutputPane({ runtime }: RuntimeOutputPaneProps) {
  const { entries, paused, status, theme, fontSize } = runtime;

  return (
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
  );
}
