export type HomeChapter = {
  id: string;
  title: string;
  number: string;
  partCount: number;
  exerciseCount: number;
};

export type HomeExercise = {
  id: string;
  stage: "Prediksi" | "Lengkapi" | "Bangun";
  mode: "expression" | "script" | "console" | "function";
  title: string;
  instruction: string;
  starter: string;
  options?: string[];
};

export type HomePageProps = {
  chapters: HomeChapter[];
  firstExercises: HomeExercise[];
  totalParts: number;
  totalExercises: number;
  ruleCount: number;
  origin?: string;
};
