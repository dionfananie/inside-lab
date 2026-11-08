export type AnswerRubricConcept = {
  label: string;
  terms: string[];
};

export type AnswerRubric = {
  concepts: AnswerRubricConcept[];
  minWords: number;
};

export const answerRubrics: Record<number, AnswerRubric> = {
  1: {
    minWords: 10,
    concepts: [
      { label: "Definisi", terms: ["logical consequence", "konsekuensi", "premis", "kesimpulan"] },
      { label: "Selalu benar", terms: ["selalu", "harus benar", "true", "⊨"] },
    ],
  },
  2: {
    minWords: 8,
    concepts: [
      { label: "Fungsi", terms: ["aturan", "menurunkan", "kesimpulan", "premis"] },
      { label: "Contoh", terms: ["modus ponens", "contoh"] },
    ],
  },
  3: {
    minWords: 12,
    concepts: [
      { label: "Modus Ponens", terms: ["modus ponens", "p", "q"] },
      { label: "Modus Tollens", terms: ["modus tollens", "¬q", "negasi", "¬p"] },
    ],
  },
  4: {
    minWords: 12,
    concepts: [
      { label: "Forward chaining", terms: ["forward", "fakta", "data"] },
      { label: "Backward chaining", terms: ["backward", "tujuan", "goal"] },
    ],
  },
  5: {
    minWords: 12,
    concepts: [
      { label: "Knowledge base", terms: ["knowledge base", "fakta", "aturan", "menyimpan"] },
      { label: "Inference engine", terms: ["inference engine", "memproses", "kesimpulan", "mengevaluasi"] },
    ],
  },
  6: {
    minWords: 12,
    concepts: [
      { label: "Modus ponens", terms: ["modus ponens", "p → q", "p"] },
      { label: "Hypothetical syllogism", terms: ["hypothetical syllogism", "silogisme", "q → r"] },
      { label: "Kesimpulan R", terms: ["r", "kesimpulan"] },
    ],
  },
  7: {
    minWords: 10,
    concepts: [
      { label: "Ya", terms: ["ya", "merupakan", "logical consequence"] },
      { label: "Alasan", terms: ["selalu", "true", "premis", "⊨"] },
    ],
  },
  8: {
    minWords: 12,
    concepts: [
      { label: "Alasan", terms: ["premis salah", "fakta salah", "konsisten", "aturan"] },
      { label: "Valid vs faktual", terms: ["valid", "faktual", "proses", "benar"] },
    ],
  },
  9: {
    minWords: 14,
    concepts: [
      { label: "Membaca fakta", terms: ["fakta", "membaca", "knowledge base"] },
      { label: "Memeriksa aturan", terms: ["aturan", "kondisi", "memeriksa"] },
      { label: "Menurunkan kesimpulan", terms: ["kesimpulan", "menurunkan", "fakta baru"] },
    ],
  },
  10: {
    minWords: 14,
    concepts: [
      { label: "Modus ponens", terms: ["modus ponens", "kondisi", "s"] },
      { label: "Kondisi terpenuhi", terms: ["terpenuhi", "semua", "p ∧ q ∧ r"] },
      { label: "Fakta tidak diketahui", terms: ["tidak diketahui", "tidak pasti", "tidak bisa"] },
    ],
  },
};
