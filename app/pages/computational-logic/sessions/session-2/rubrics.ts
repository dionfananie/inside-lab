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
      { label: "Definisi proposisi", terms: ["pernyataan", "deklaratif", "nilai kebenaran", "benar atau salah", "true"] },
      { label: "Alasan bukan proposisi", terms: ["perintah", "bukan pernyataan", "tidak bisa dinilai", "tidak memiliki nilai kebenaran"] },
    ],
  },
  2: {
    minWords: 12,
    concepts: [
      { label: "Atomic proposition", terms: ["atomik", "atomic", "sederhana", "tidak dibangun"] },
      { label: "Compound proposition", terms: ["majemuk", "compound", "gabungan", "connective", "operator"] },
      { label: "Memberi contoh", terms: ["contoh", "misalnya"] },
    ],
  },
  3: {
    minWords: 12,
    concepts: [
      { label: "Representasi konsisten", terms: ["konsisten", "dievaluasi", "evaluasi"] },
      { label: "Tipe data boolean", terms: ["boolean", "true", "false", "tipe data"] },
      { label: "Hubungan dengan program", terms: ["komputer", "program", "variabel"] },
    ],
  },
  4: {
    minWords: 10,
    concepts: [
      { label: "AND", terms: ["and", "∧", "p∧q", "p and q"] },
      { label: "OR", terms: ["or", "∨", "p∨q", "p or q"] },
      { label: "NOT", terms: ["not", "¬", "negasi", "¬p"] },
      { label: "Implication", terms: ["implikasi", "→", "->", "jika maka"] },
    ],
  },
  5: {
    minWords: 14,
    concepts: [
      { label: "OR inklusif", terms: ["or", "∨", "inklusif", "inclusive", "minimal satu"] },
      { label: "XOR eksklusif", terms: ["xor", "⊕", "eksklusif", "exclusive", "tepat satu"] },
      { label: "Memberi contoh", terms: ["contoh", "misalnya"] },
    ],
  },
  6: {
    minWords: 12,
    concepts: [
      { label: "Antecedent salah", terms: ["antecedent", "anteseden", "p = false", "p salah", "p false"] },
      { label: "Aturan tidak dilanggar", terms: ["tidak dilanggar", "aturan tidak dilanggar", "implikasi", "jika maka"] },
      { label: "Hasil TRUE", terms: ["true", "benar"] },
    ],
  },
  7: {
    minWords: 12,
    concepts: [
      { label: "P ∧ Q", terms: ["p and q", "p ∧ q", "p∧q"] },
      { label: "P ∨ Q", terms: ["p or q", "p ∨ q", "p∨q"] },
      { label: "¬Q", terms: ["¬q", "not q", "negasi q", "negation"] },
      { label: "P → Q", terms: ["p → q", "p -> q", "implikasi", "jika p maka q"] },
      { label: "P ↔ R", terms: ["p ↔ r", "p <-> r", "biconditional", "biimplikasi"] },
    ],
  },
  8: {
    minWords: 10,
    concepts: [
      { label: "P = login", terms: ["login", "p = login", "pengguna login"] },
      { label: "Q = permission", terms: ["permission", "izin", "q = permission", "q = izin"] },
      { label: "R = dashboard", terms: ["dashboard", "akses", "r = dashboard"] },
      { label: "Formula implikasi", terms: ["implikasi", "→", "->", "(p ∧ q) → r", "jika maka"] },
    ],
  },
  9: {
    minWords: 12,
    concepts: [
      { label: "Evaluasi P ∨ Q", terms: ["p or q", "p ∨ q", "true"] },
      { label: "Evaluasi ¬R", terms: ["¬r", "not r", "negasi r"] },
      { label: "AND terakhir", terms: ["and", "∧"] },
      { label: "Hasil akhir FALSE", terms: ["false", "salah"] },
    ],
  },
  10: {
    minWords: 15,
    concepts: [
      { label: "Email atau telepon", terms: ["email", "nomor telepon", "telepon"] },
      { label: "Belum terdaftar", terms: ["belum terdaftar", "tidak terdaftar", "¬r", "not registered"] },
      { label: "Formula logika", terms: ["formula", "∨", "∧", "or", "and"] },
      { label: "Implementasi JavaScript", terms: ["javascript", "kode", "if", "implementasi", "js"] },
    ],
  },
};
