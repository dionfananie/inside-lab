export const sessionFourSections = [
  { id: "tujuan", label: "Tujuan belajar" },
  { id: "review", label: "Review sesi 3" },
  { id: "logical-equivalence", label: "Logical equivalence" },
  { id: "pembuktian", label: "Pembuktian equivalence" },
  { id: "logical-laws", label: "Logical laws" },
  { id: "logical-consequence", label: "Logical consequence" },
  { id: "perbedaan", label: "Equivalence vs consequence" },
  { id: "validity", label: "Validity" },
  { id: "soundness", label: "Soundness" },
  { id: "penerapan", label: "Penerapan di komputer" },
  { id: "kesalahan", label: "Kesalahan umum" },
  { id: "kesimpulan", label: "Kesimpulan" },
  { id: "knowledge-check", label: "Knowledge check" },
];

export const sessionFourObjectives = [
  "Menjelaskan pengertian Logical Equivalence.",
  "Membuktikan kesetaraan dua formula menggunakan Truth Table.",
  "Memahami dan menerapkan hukum-hukum ekuivalensi logika.",
  "Menjelaskan pengertian Logical Consequence (Entailment).",
  "Membedakan Logical Equivalence dan Logical Consequence.",
  "Menentukan validitas suatu argumen berdasarkan premis dan kesimpulan.",
  "Membedakan Validity dan Soundness.",
  "Mengidentifikasi kesalahan dalam proses penarikan kesimpulan.",
  "Menggunakan logika untuk menganalisis argumen dalam kehidupan sehari-hari dan sistem komputer.",
];

export const equivalenceProofTable = {
  headers: ["P", "Q", "P → Q", "¬P", "¬P ∨ Q"],
  rows: [
    ["T", "T", "T", "F", "T"],
    ["T", "F", "F", "F", "F"],
    ["F", "T", "T", "T", "T"],
    ["F", "F", "T", "T", "T"],
  ],
};

export const notEquivalentTable = {
  headers: ["P", "Q", "P ∧ Q", "P ∨ Q"],
  rows: [
    ["T", "T", "T", "T"],
    ["T", "F", "F", "T"],
    ["F", "T", "F", "T"],
    ["F", "F", "F", "F"],
  ],
};

export const logicalLaws = [
  ["Double Negation", "¬¬P ≡ P"],
  ["De Morgan 1", "¬(P ∧ Q) ≡ ¬P ∨ ¬Q"],
  ["De Morgan 2", "¬(P ∨ Q) ≡ ¬P ∧ ¬Q"],
  ["Commutative", "P ∧ Q ≡ Q ∧ P"],
  ["Associative", "(P ∧ Q) ∧ R ≡ P ∧ (Q ∧ R)"],
  ["Distributive", "P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R)"],
  ["Implication", "P → Q ≡ ¬P ∨ Q"],
  ["Biconditional", "P ↔ Q ≡ (P → Q) ∧ (Q → P)"],
  ["Identity", "P ∧ TRUE ≡ P"],
  ["Domination", "P ∨ TRUE ≡ TRUE"],
  ["Idempotent", "P ∧ P ≡ P"],
];

export const consequenceProofTable = {
  headers: ["P", "Q", "P → Q", "P", "Seluruh premis TRUE?"],
  rows: [
    ["T", "T", "T", "T", "Ya"],
    ["T", "F", "F", "T", "Tidak"],
    ["F", "T", "T", "F", "Tidak"],
    ["F", "F", "T", "F", "Tidak"],
  ],
};

export const equivalenceConsequenceTable = [
  ["Tujuan", "Membandingkan dua formula", "Menguji hubungan premis dan kesimpulan"],
  ["Simbol", "≡", "⊨"],
  ["Pertanyaan", "Apakah hasil keduanya selalu sama?", "Apakah kesimpulan mengikuti premis?"],
  ["Metode", "Membandingkan truth table", "Memeriksa apakah ada counterexample"],
  ["Contoh", "P → Q ≡ ¬P ∨ Q", "{P → Q, P} ⊨ Q"],
];

export const validitySoundnessTable = [
  ["Fokus", "Struktur logis argumen", "Struktur dan kebenaran premis"],
  ["Premis harus faktual benar?", "Tidak", "Ya"],
  ["Kesimpulan mengikuti premis?", "Ya", "Ya"],
];

export const commonMistakes = [
  { title: "Logical equivalence = kesimpulan", description: "Equivalence membandingkan dua formula, consequence menguji premis dan kesimpulan." },
  { title: "P → Q dan Q benar, maka P benar", description: "Ini affirming the consequent, pola yang tidak valid." },
  { title: "Validity berarti premis benar", description: "Validity hanya memastikan kesimpulan mengikuti premis secara logis." },
  { title: "Argumen tidak sound berarti tidak valid", description: "Argumen bisa valid tetapi tidak sound jika ada premis yang salah." },
  { title: "Bentuk berbeda pasti makna berbeda", description: "P → Q dan ¬P ∨ Q berbeda bentuk tetapi logically equivalent." },
];

export type KnowledgeCheckQuestion = {
  number: number;
  prompt: string;
  code?: string;
  answer: string;
};

export type KnowledgeCheckGroup = {
  id: string;
  title: string;
  questions: KnowledgeCheckQuestion[];
};

export const knowledgeCheckGroups: KnowledgeCheckGroup[] = [
  {
    id: "pemahaman-konsep",
    title: "Bagian A — Pemahaman Konsep",
    questions: [
      {
        number: 1,
        prompt:
          "Apa yang dimaksud dengan Logical Equivalence? Bagaimana cara membuktikan bahwa dua formula logically equivalent?",
        answer:
          "Logical equivalence adalah hubungan dua formula yang selalu menghasilkan nilai kebenaran sama untuk seluruh interpretasi. Dibuktikan dengan membandingkan truth table kedua formula; seluruh baris harus sama.",
      },
      {
        number: 2,
        prompt:
          "Apa perbedaan Logical Equivalence dan Logical Consequence? Berikan masing-masing satu contoh.",
        answer:
          "Equivalence membandingkan dua formula (contoh: P → Q ≡ ¬P ∨ Q). Consequence menguji apakah kesimpulan mengikuti premis (contoh: {P → Q, P} ⊨ Q).",
      },
      {
        number: 3,
        prompt:
          "Apa perbedaan Validity dan Soundness? Apakah sebuah argumen dapat valid tetapi tidak sound? Jelaskan menggunakan contoh.",
        answer:
          "Validity hanya soal struktur logis, sedangkan soundness juga mensyaratkan premis benar. Argumen dapat valid tetapi tidak sound, contoh: semua kucing dapat terbang; Miko kucing; maka Miko dapat terbang.",
      },
    ],
  },
  {
    id: "logical-laws",
    title: "Bagian B — Logical Laws",
    questions: [
      {
        number: 4,
        prompt:
          "Gunakan De Morgan's Law untuk mengubah formula ¬(P ∨ Q). Jelaskan mengapa hasil transformasinya ekuivalen.",
        answer:
          "¬(P ∨ Q) ≡ ¬P ∧ ¬Q. Kedua sisi menghasilkan nilai kebenaran yang sama untuk seluruh kombinasi P dan Q.",
      },
      {
        number: 5,
        prompt:
          "Buktikan menggunakan Truth Table bahwa P → Q ≡ ¬P ∨ Q.",
        answer:
          "Buat truth table untuk P → Q dan ¬P ∨ Q; kolom hasil keduanya identik (T, F, T, T), sehingga ekuivalen.",
      },
      {
        number: 6,
        prompt:
          "Sederhanakan formula ¬(¬P) menggunakan hukum ekuivalensi. Sebutkan hukum yang digunakan.",
        answer:
          "¬(¬P) ≡ P, menggunakan Double Negation Law.",
      },
    ],
  },
  {
    id: "consequence-validity",
    title: "Bagian C — Logical Consequence dan Validity",
    questions: [
      {
        number: 7,
        prompt:
          "Diberikan premis P → Q dan P, dengan kesimpulan Q. Apakah Q merupakan logical consequence dari kedua premis? Jelaskan.",
        answer:
          "Ya. Tidak ada kondisi ketika kedua premis TRUE tetapi Q FALSE, sehingga {P → Q, P} ⊨ Q (Modus Ponens).",
      },
      {
        number: 8,
        prompt:
          "Diberikan argumen P → Q, Q, ∴ P. Apakah argumen tersebut valid? Jika tidak, temukan counterexample.",
        answer:
          "Tidak valid (affirming the consequent). Counterexample: P = FALSE, Q = TRUE; kedua premis TRUE tetapi kesimpulan FALSE.",
      },
      {
        number: 9,
        prompt:
          "Diberikan argumen: Semua ikan adalah mamalia; Nemo adalah ikan; maka Nemo adalah mamalia. Apakah argumen valid? Apakah sound? Jelaskan.",
        answer:
          "Argumen valid secara struktur (bentuk valid), tetapi tidak sound karena premis “semua ikan adalah mamalia” salah secara faktual.",
      },
    ],
  },
  {
    id: "computational-thinking",
    title: "Bagian D — Computational Thinking",
    questions: [
      {
        number: 10,
        prompt:
          "Diberikan fungsi checkA(p, q) = !(p && q) dan checkB(p, q) = !p || !q. Apakah outputnya sama? Hukum apa yang menjelaskan? Bagaimana membuktikannya dengan truth table? Mengapa equivalence berguna dalam software engineering?",
        code: "function checkA(p, q) { return !(p && q); }\nfunction checkB(p, q) { return !p || !q; }",
        answer:
          "Kedua fungsi menghasilkan output sama untuk semua kombinasi, sesuai De Morgan's Law: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q. Dibuktikan dengan truth table, dan berguna untuk menyederhanakan serta memverifikasi kondisi di kode.",
      },
    ],
  },
];
