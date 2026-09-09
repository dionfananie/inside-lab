import { useState } from "react";

import { languages } from "./data";
import type { LanguageId } from "./types";

export function useLabPage() {
  const [languageId, setLanguageId] = useState<LanguageId>("javascript");
  const activeLanguage =
    languages.find((language) => language.id === languageId) ?? languages[0];

  return { activeLanguage, setLanguageId };
}

export type LabPageInteractions = ReturnType<typeof useLabPage>;
