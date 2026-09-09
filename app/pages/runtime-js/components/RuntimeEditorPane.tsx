import type { CSSProperties } from "react";
import { Editor } from "@sugar-high/react";
import { Braces } from "lucide-react";

import type { RuntimeJsModel } from "../useRuntimeJs";

type RuntimeEditorPaneProps = {
  runtime: RuntimeJsModel;
};

export default function RuntimeEditorPane({ runtime }: RuntimeEditorPaneProps) {
  const {
    editorRef,
    textareaRef,
    editorContentHeight,
    source,
    updateSource,
    fontSize,
    theme,
    handleEditorKeyDown,
  } = runtime;

  return (
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
          onChange={updateSource}
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
  );
}
