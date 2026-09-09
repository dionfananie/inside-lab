import {
  fallbackSettings,
  maximumFontSize,
  minimumFontSize,
  settingsKey,
  themeNames,
} from "./data";
import type { StoredSettings, ThemeName } from "./types";

export function loadSettings(): StoredSettings {
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
