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
      { label: "Definisi truth table", terms: ["truth table", "tabel kebenaran", "kombinasi", "nilai kebenaran"] },
      { label: "Alasan memeriksa semua", terms: ["seluruh", "semua", "tidak terlewat", "pasti", "lengkap"] },
    ],
  },
  2: {
    minWords: 10,
    concepts: [
      { label: "Hasil 32", terms: ["32", "2⁵", "2^5"] },
      { label: "Penjelasan 2^n", terms: ["2", "pangkat", "dua nilai", "true", "false"] },
    ],
  },
  3: {
    minWords: 12,
    concepts: [
      { label: "Definisi WFF", terms: ["wff", "well-formed", "syntax", "sintaksis", "struktur"] },
      { label: "WFF tidak selalu TRUE", terms: ["belum tentu", "tidak selalu", "bisa false", "bisa salah"] },
      { label: "Memberi contoh", terms: ["contoh", "misalnya"] },
    ],
  },
  4: {
    minWords: 12,
    concepts: [
      { label: "Hasil P ∧ Q", terms: ["p ∧ q", "p and q", "false", "salah"] },
      { label: "Hasil P ∨ Q", terms: ["p ∨ q", "p or q", "true", "benar"] },
      { label: "Hasil ¬R", terms: ["¬r", "not r", "negasi"] },
      { label: "Hasil implikasi", terms: ["p → q", "p -> q", "implikasi", "false"] },
    ],
  },
  5: {
    minWords: 12,
    concepts: [
      { label: "Jumlah kombinasi 8", terms: ["8", "2³", "2^3", "delapan"] },
      { label: "Evaluasi P ∨ Q", terms: ["p ∨ q", "p or q"] },
      { label: "Evaluasi ¬R", terms: ["¬r", "not r", "negasi r"] },
      { label: "Evaluasi AND terakhir", terms: ["and", "∧"] },
    ],
  },
  6: {
    minWords: 12,
    concepts: [
      { label: "Formula A TRUE", terms: ["a = true", "p ∨ (q ∧ r)", "true"] },
      { label: "Formula B FALSE", terms: ["b = false", "(p ∨ q) ∧ r", "false"] },
      { label: "Menjelaskan perbedaan", terms: ["berbeda", "struktur", "kurung", "parentheses"] },
    ],
  },
  7: {
    minWords: 14,
    concepts: [
      { label: "Tautology", terms: ["tautology", "tautologi", "selalu true", "selalu benar"] },
      { label: "Contradiction", terms: ["contradiction", "kontradiksi", "selalu false", "selalu salah"] },
      { label: "Contingency", terms: ["contingency", "kontingensi", "campuran"] },
    ],
  },
  8: {
    minWords: 14,
    concepts: [
      { label: "Definisi satisfiable", terms: ["satisfiable", "setidaknya satu", "minimal satu", "ada assignment"] },
      { label: "Definisi tautology", terms: ["tautology", "tautologi", "selalu true", "selalu benar"] },
      { label: "Memberi contoh", terms: ["contoh", "misalnya"] },
    ],
  },
  9: {
    minWords: 10,
    concepts: [
      { label: "Bukan WFF", terms: ["bukan wff", "tidak valid", "salah syntax", "bukan formula"] },
      { label: "Alasan operator butuh operand", terms: ["operand", "operator", "and", "butuh dua"] },
      { label: "Memberi contoh WFF", terms: ["contoh", "(p ∧ q)", "¬p", "valid"] },
    ],
  },
  10: {
    minWords: 15,
    concepts: [
      { label: "Jumlah kombinasi 8", terms: ["8", "2³", "2^3", "delapan"] },
      { label: "Evaluasi formula", terms: ["!(p && q)", "¬(p ∧ q)", "or", "evaluasi", "→"] },
      { label: "Klasifikasi", terms: ["tautology", "contradiction", "contingency", "klasifikasi"] },
      { label: "Contoh JavaScript", terms: ["javascript", "kode", "function", "if", "js"] },
    ],
  },
};
