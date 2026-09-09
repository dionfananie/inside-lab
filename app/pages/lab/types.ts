import type { LucideIcon } from "lucide-react";

export type LanguageId = "javascript" | "python" | "java" | "cpp";

export type Language = {
  id: LanguageId;
  short: string;
  name: string;
  role: string;
  description: string;
  accent: string;
  uses: readonly string[];
  code: readonly (readonly [string, string])[];
};

export type RoadmapStep = {
  number: string;
  kicker: string;
  title: string;
  copy: string;
  tag: string;
  icon: LucideIcon;
};

export type EngineeringSkill = {
  icon: LucideIcon;
  label: string;
  title: string;
  copy: string;
  className: string;
};
