export type ThemeName =
  | "Dracula"
  | "Taffy"
  | "One Dark"
  | "Tokyo Night"
  | "Monokai"
  | "Vercel Light";

export type StoredSettings = {
  theme: ThemeName;
  fontSize: number;
};

export type EditorHistory = {
  past: string[];
  future: string[];
};
