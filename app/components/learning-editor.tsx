import { Editor, type Theme } from '@sugar-high/react';


const editorTheme = {
  background: '#1d3027',
  foreground: '#e4efe8',
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

export function LearningEditor({
  value,
  onChange,
  readOnly = false,
}: {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="code-editor">
      <Editor
        aria-label="Area latihan kode JavaScript"
        lang="javascript"
        value={value}
        onChange={onChange}
        controls={false}
        lineNumbers
        wrapLongLines
        padding="1rem"
        indent="  "
        fontSize="14px"
        fontFamily="var(--font-geist-mono), monospace"
        theme={editorTheme}
        textareaProps={{
          'aria-label': 'Editor kode JavaScript',
          'aria-describedby': 'exercise-instruction',
          'aria-readonly': readOnly,
          readOnly,
          spellCheck: false,
          autoCapitalize: 'off',
          autoComplete: 'off',
          autoCorrect: 'off',
        }}
      />
    </div>
  );
}
