import type { Theme } from "@sugar-high/react";
import {
  monokai,
  oneDarkPro,
  taffy,
  tokyoNight,
  vercel,
} from "@sugar-high/react/themes";

import type { StoredSettings, ThemeName } from "./types";

export const initialSource = `// A little code. Instant answers.
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

export const themes = {
  Dracula: draculaTheme,
  Taffy: taffy.dark,
  "One Dark": oneDarkPro.dark,
  "Tokyo Night": tokyoNight.dark,
  Monokai: monokai.dark,
  "Vercel Light": vercel.light,
} satisfies Record<ThemeName, Theme>;

export const defaultFontSize = 14;
export const minimumFontSize = 10;
export const maximumFontSize = 32;

export const closingPair = {
  "(": ")",
  "[": "]",
  "{": "}",
} as const;

export const openingPair = {
  ")": "(",
  "]": "[",
  "}": "{",
} as const;

export const settingsKey = "inside-lab:play:settings:v1";
export const themeNames = Object.keys(themes) as ThemeName[];
export const maximumHistoryEntries = 100;

export const fallbackSettings: StoredSettings = {
  theme: "Taffy",
  fontSize: defaultFontSize,
};
