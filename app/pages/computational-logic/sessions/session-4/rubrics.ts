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
    minWords: 12,
    concepts: [
      { label: "Definisi equivalence", terms: ["equivalence", "ekuivalen", "sama", "nilai kebenaran"] },
      { label: "Cara membuktikan", terms: ["truth table", "tabel kebenaran", "membandingkan", "seluruh baris"] },
    ],
  },
  2: {
    minWords: 14,
    concepts: [
      { label: "Equivalence", terms: ["equivalence", "ekuivalen", "dua formula"] },
      { label: "Consequence", terms: ["consequence", "entailment", "premis", "kesimpulan"] },
      { label: "Memberi contoh", terms: ["contoh", "misalnya", "p → q", "⊨"] },
    ],
  },
  3: {
    minWords: 14,
    concepts: [
      { label: "Validity", terms: ["valid", "validitas", "struktur", "logis"] },
      { label: "Soundness", terms: ["sound", "faktual", "premis benar"] },
      { label: "Memberi contoh", terms: ["contoh", "misalnya", "kucing"] },
    ],
  },
  4: {
    minWords: 10,
    concepts: [
      { label: "Hasil De Morgan", terms: ["¬p ∧ ¬q", "not p and not q", "de morgan"] },
      { label: "Alasan ekuivalen", terms: ["ekuivalen", "sama", "nilai kebenaran"] },
    ],
  },
  5: {
    minWords: 12,
    concepts: [
      { label: "Truth table", terms: ["truth table", "tabel kebenaran"] },
      { label: "Hasil P → Q", terms: ["p → q", "p -> q", "implikasi"] },
      { label: "Hasil ¬P ∨ Q", terms: ["¬p ∨ q", "not p or q", "or"] },
      { label: "Kesimpulan ekuivalen", terms: ["sama", "ekuivalen", "identik"] },
    ],
  },
  6: {
    minWords: 8,
    concepts: [
      { label: "Hasil P", terms: ["p", "≡ p"] },
      { label: "Hukum double negation", terms: ["double negation", "negasi ganda", "¬(¬p)"] },
    ],
  },
  7: {
    minWords: 12,
    concepts: [
      { label: "Kesimpulan ya", terms: ["ya", "valid", "mengikuti", "logical consequence"] },
      { label: "Modus ponens", terms: ["modus ponens", "p → q", "premis"] },
      { label: "Tidak ada counterexample", terms: ["tidak ada", "counterexample", "seluruh premis"] },
    ],
  },
  8: {
    minWords: 12,
    concepts: [
      { label: "Tidak valid", terms: ["tidak valid", "invalid", "affirming the consequent"] },
      { label: "Counterexample", terms: ["counterexample", "p = false", "q = true", "false", "true"] },
    ],
  },
  9: {
    minWords: 14,
    concepts: [
      { label: "Valid", terms: ["valid", "struktur", "logis"] },
      { label: "Tidak sound", terms: ["tidak sound", "premis salah", "faktual", "mamalia"] },
      { label: "Membedakan keduanya", terms: ["perbedaan", "validitas", "kebenaran"] },
    ],
  },
  10: {
    minWords: 15,
    concepts: [
      { label: "Output sama", terms: ["sama", "ekuivalen", "output"] },
      { label: "De Morgan", terms: ["de morgan", "¬(p ∧ q)", "not p or not q"] },
      { label: "Truth table", terms: ["truth table", "tabel kebenaran", "membuktikan"] },
      { label: "Manfaat di SE", terms: ["software engineering", "menyederhanakan", "verifikasi", "kode"] },
    ],
  },
};
