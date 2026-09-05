import { Editor, type Theme } from '@sugar-high/react';

const editorTheme: Theme = {
  background: '#15241f',
  foreground: '#e4efe8',
  caret: '#d3f4af',
  lineNumber: '#729085',
  lineHighlight: '#20332b',
  identifier: '#e4efe8',
  keyword: '#c7b6ef',
  string: '#c2dfa3',
  class: '#f0bf82',
  property: '#e4efe8',
  entity: '#f0bf82',
  jsxliterals: '#c2dfa3',
  sign: '#b6dcc5',
  comment: '#8caaa0',
};

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
