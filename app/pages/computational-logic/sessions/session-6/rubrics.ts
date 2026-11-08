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
    minWords: 14,
    concepts: [
      { label: "Propositional", terms: ["propositional", "proposisi", "satu kesatuan", "p", "q"] },
      { label: "Predicate", terms: ["predicate", "predikat", "objek", "hubungan", "struktur"] },
    ],
  },
  2: {
    minWords: 8,
    concepts: [
      { label: "Predicate", terms: ["predicate", "predikat", "properti", "hubungan"] },
      { label: "Contoh", terms: ["student", "likes", "contoh"] },
    ],
  },
  3: {
    minWords: 10,
    concepts: [
      { label: "Constant", terms: ["constant", "konstanta", "objek tertentu", "teddy"] },
      { label: "Variable", terms: ["variable", "variabel", "umum", "x"] },
    ],
  },
  4: {
    minWords: 12,
    concepts: [
      { label: "Universal", terms: ["universal", "∀", "semua", "for all"] },
      { label: "Existential", terms: ["existential", "∃", "setidaknya satu", "ada"] },
    ],
  },
  5: {
    minWords: 8,
    concepts: [
      { label: "Universal", terms: ["∀", "forall", "semua"] },
      { label: "Implikasi", terms: ["→", "implikasi", "human", "living"] },
    ],
  },
  6: {
    minWords: 8,
    concepts: [
      { label: "Existential", terms: ["∃", "exists", "ada"] },
      { label: "Conjunction", terms: ["∧", "and", "student", "likes"] },
    ],
  },
  7: {
    minWords: 10,
    concepts: [
      { label: "Bound variable", terms: ["bound", "terikat", "cakupan", "quantifier"] },
      { label: "Free variable", terms: ["free", "bebas", "tidak terikat"] },
    ],
  },
  8: {
    minWords: 12,
    concepts: [
      { label: "Urutan quantifier", terms: ["urutan", "quantifier", "∀x ∃y", "∃y ∀x"] },
      { label: "Makna berbeda", terms: ["berbeda", "makna", "sendiri", "satu"] },
    ],
  },
  9: {
    minWords: 12,
    concepts: [
      { label: "Kesimpulan mortal", terms: ["mortal", "socrates", "kesimpulan"] },
      { label: "Instantiation + Modus Ponens", terms: ["instantiation", "modus ponens", "instantiasi"] },
    ],
  },
  10: {
    minWords: 14,
    concepts: [
      { label: "Fakta", terms: ["fakta", "student", "takes"] },
      { label: "Aturan", terms: ["aturan", ":-", "rule"] },
      { label: "Query", terms: ["query", "?-", "mencari"] },
    ],
  },
};
