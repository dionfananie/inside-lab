export const sessionTwoSections = [
  { id: "tujuan", label: "Tujuan belajar" },
  { id: "review", label: "Review sesi 1" },
  { id: "apa-itu-propositional-logic", label: "Propositional logic" },
  { id: "atomic-compound", label: "Atomic & compound" },
  { id: "logical-connectives", label: "Logical connectives" },
  { id: "ringkasan-connectives", label: "Ringkasan operator" },
  { id: "terjemahan", label: "Terjemahan ke simbol" },
  { id: "parentheses", label: "Tanda kurung" },
  { id: "operator-program", label: "Operator di program" },
  { id: "case-study", label: "Mini case study" },
  { id: "kesimpulan", label: "Kesimpulan" },
  { id: "knowledge-check", label: "Knowledge check" },
];

export const sessionTwoObjectives = [
  "Menjelaskan pengertian Propositional Logic.",
  "Membedakan proposisi dan bukan proposisi.",
  "Mengidentifikasi proposisi atomik dan proposisi majemuk.",
  "Memahami simbol-simbol dasar dalam logika proposisional.",
  "Mengubah pernyataan bahasa alami menjadi representasi simbolik.",
  "Menggabungkan beberapa proposisi menggunakan Logical Connectives.",
  "Menjelaskan perbedaan AND, OR, NOT, IMPLICATION, dan BICONDITIONAL.",
  "Mengevaluasi formula logika sederhana menggunakan nilai TRUE dan FALSE.",
  "Memahami bagaimana operator logika digunakan dalam program komputer.",
];

export const propositionExamples = [
  ["Jakarta adalah ibu kota Indonesia.", "Ya", "Memiliki nilai kebenaran"],
  ["2 + 3 = 5", "Ya", "Dapat dibuktikan benar"],
  ["Hari ini hujan.", "Ya", "Dapat dievaluasi berdasarkan kondisi"],
  ["Semua manusia membutuhkan oksigen.", "Ya", "Merupakan pernyataan"],
  ["10 lebih kecil dari 5.", "Ya", "Memiliki nilai kebenaran FALSE"],
];

export const nonPropositionExamples = [
  ["Tolong tutup pintu!", "Tidak", "Perintah"],
  ["Apakah hari ini hujan?", "Tidak", "Pertanyaan"],
  ["Semoga saya lulus.", "Tidak", "Harapan"],
  ["Wah, bagus sekali!", "Tidak", "Ekspresi atau penilaian tanpa konteks"],
  ["x + 2 = 5", "Belum", "Nilai x belum ditentukan"],
];

export const atomicCompoundTable = [
  ["Tidak menggunakan connective", "Menggunakan connective"],
  ["Bentuk paling sederhana", "Gabungan proposisi"],
  ["Contoh: P", "Contoh: P ∧ Q"],
  ["Contoh: Q", "Contoh: ¬Q"],
  ["Contoh: R", "Contoh: (P ∧ Q) → R"],
];

export type TruthTable = {
  headers: string[];
  rows: string[][];
};

export type Connective = {
  id: string;
  name: string;
  symbol: string;
  meaning: string;
  trueWhen: string;
  truthTable: TruthTable;
  code?: string;
  note?: string;
};

export const connectives: Connective[] = [
  {
    id: "negation",
    name: "Negation (NOT)",
    symbol: "¬P",
    meaning: "\u201CTidak P\u201D atau \u201Cbukan P\u201D.",
    trueWhen: "P bernilai FALSE",
    truthTable: {
      headers: ["P", "¬P"],
      rows: [
        ["TRUE", "FALSE"],
        ["FALSE", "TRUE"],
      ],
    },
    code: `const isRaining = true;
const isNotRaining = !isRaining;
console.log(isNotRaining); // false`,
    note: "Operator NOT membalik nilai boolean.",
  },
  {
    id: "conjunction",
    name: "Conjunction (AND)",
    symbol: "P ∧ Q",
    meaning: "\u201CP dan Q\u201D. TRUE hanya jika kedua proposisi TRUE.",
    trueWhen: "Keduanya TRUE",
    truthTable: {
      headers: ["P", "Q", "P ∧ Q"],
      rows: [
        ["TRUE", "TRUE", "TRUE"],
        ["TRUE", "FALSE", "FALSE"],
        ["FALSE", "TRUE", "FALSE"],
        ["FALSE", "FALSE", "FALSE"],
      ],
    },
    code: `if (isLoggedIn && hasPermission) {
  console.log("Access granted");
}`,
    note: "AND dipakai ketika seluruh syarat harus bernilai TRUE.",
  },
  {
    id: "disjunction",
    name: "Disjunction (OR)",
    symbol: "P ∨ Q",
    meaning: "\u201CP atau Q\u201D. TRUE jika minimal satu proposisi TRUE.",
    trueWhen: "Minimal satu TRUE",
    truthTable: {
      headers: ["P", "Q", "P ∨ Q"],
      rows: [
        ["TRUE", "TRUE", "TRUE"],
        ["TRUE", "FALSE", "TRUE"],
        ["FALSE", "TRUE", "TRUE"],
        ["FALSE", "FALSE", "FALSE"],
      ],
    },
    code: `const hasEmail = true;
const hasPhoneNumber = false;
const canRegister = hasEmail || hasPhoneNumber;
console.log(canRegister); // true`,
    note: "OR klasik bersifat inclusive: keduanya boleh TRUE sekaligus.",
  },
  {
    id: "implication",
    name: "Implication (IF...THEN)",
    symbol: "P → Q",
    meaning: "\u201CJika P, maka Q.\u201D P disebut antecedent, Q disebut consequent.",
    trueWhen: "Kecuali P TRUE dan Q FALSE",
    truthTable: {
      headers: ["P", "Q", "P → Q"],
      rows: [
        ["TRUE", "TRUE", "TRUE"],
        ["TRUE", "FALSE", "FALSE"],
        ["FALSE", "TRUE", "TRUE"],
        ["FALSE", "FALSE", "TRUE"],
      ],
    },
    code: `const isLoggedIn = true;
const hasPermission = false;
const rule = !isLoggedIn || hasPermission;
console.log(rule); // false`,
    note: "!P || Q adalah implementasi material implication P → Q.",
  },
  {
    id: "biconditional",
    name: "Biconditional (IFF)",
    symbol: "P ↔ Q",
    meaning: "\u201CP jika dan hanya jika Q.\u201D TRUE ketika keduanya bernilai sama.",
    trueWhen: "Nilai P dan Q sama",
    truthTable: {
      headers: ["P", "Q", "P ↔ Q"],
      rows: [
        ["TRUE", "TRUE", "TRUE"],
        ["TRUE", "FALSE", "FALSE"],
        ["FALSE", "TRUE", "FALSE"],
        ["FALSE", "FALSE", "TRUE"],
      ],
    },
    note: "P ↔ Q ≡ (P → Q) ∧ (Q → P).",
  },
];

export const xorTable: TruthTable = {
  headers: ["P", "Q", "P ∨ Q", "P ⊕ Q"],
  rows: [
    ["TRUE", "TRUE", "TRUE", "FALSE"],
    ["TRUE", "FALSE", "TRUE", "TRUE"],
    ["FALSE", "TRUE", "TRUE", "TRUE"],
    ["FALSE", "FALSE", "FALSE", "FALSE"],
  ],
};

export const summaryConnectives = [
  ["¬P", "Negation", "NOT P", "P FALSE"],
  ["P ∧ Q", "Conjunction", "P AND Q", "Keduanya TRUE"],
  ["P ∨ Q", "Disjunction", "P OR Q", "Minimal satu TRUE"],
  ["P → Q", "Implication", "IF P THEN Q", "Kecuali P TRUE dan Q FALSE"],
  ["P ↔ Q", "Biconditional", "P IFF Q", "Nilai P dan Q sama"],
  ["P ⊕ Q", "Exclusive OR", "XOR", "Tepat satu TRUE"],
];

export const translationExamples = [
  {
    title: "Contoh 1: AND",
    statement: "Saya belajar dan mengerjakan tugas.",
    mapping: ["P = Saya belajar.", "Q = Saya mengerjakan tugas."],
    formula: "P ∧ Q",
  },
  {
    title: "Contoh 2: OR",
    statement: "Saya akan menggunakan Go atau JavaScript.",
    mapping: ["P = Saya menggunakan Go.", "Q = Saya menggunakan JavaScript."],
    formula: "P ∨ Q",
    note: "Jika hanya salah satu yang boleh dipilih, gunakan XOR.",
  },
  {
    title: "Contoh 3: NOT",
    statement: "Saya tidak belajar.",
    mapping: ["P = Saya belajar."],
    formula: "¬P",
  },
  {
    title: "Contoh 4: IMPLICATION",
    statement: "Jika pengguna login, maka pengguna dapat mengakses dashboard.",
    mapping: ["P = Pengguna login.", "Q = Pengguna dapat mengakses dashboard."],
    formula: "P → Q",
  },
  {
    title: "Contoh 5: Compound formula",
    statement:
      "Jika pengguna login dan memiliki permission, maka pengguna dapat mengakses dashboard.",
    mapping: [
      "P = Pengguna login.",
      "Q = Pengguna memiliki permission.",
      "R = Pengguna dapat mengakses dashboard.",
    ],
    formula: "(P ∧ Q) → R",
  },
];

export const programOperators = [
  ["¬P", "!P", "!p"],
  ["P ∧ Q", "P && Q", "p && q"],
  ["P ∨ Q", "P || Q", "p || q"],
  ["P → Q", "!P || Q", "!p || q"],
  ["P ↔ Q", "P === Q", "p == q"],
];

export type KnowledgeCheckQuestion = {
  number: number;
  prompt: string;
  code?: string;
  list?: string[];
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
          "Apa yang dimaksud dengan proposisi? Mengapa kalimat “Tolong tutup pintu!” bukan termasuk proposisi?",
        answer:
          "Proposisi adalah pernyataan deklaratif yang memiliki tepat satu nilai kebenaran (TRUE/FALSE). “Tolong tutup pintu!” bukan proposisi karena merupakan perintah, sehingga tidak dapat dinilai benar atau salah.",
      },
      {
        number: 2,
        prompt:
          "Apa perbedaan Atomic Proposition dan Compound Proposition? Berikan masing-masing dua contoh.",
        answer:
          "Atomic proposition adalah proposisi sederhana tanpa connective, misalnya P dan Q. Compound proposition adalah gabungan proposisi dengan connective, misalnya P ∧ Q dan ¬Q.",
      },
      {
        number: 3,
        prompt:
          "Mengapa komputer menggunakan representasi TRUE dan FALSE untuk melakukan evaluasi logika? Jelaskan hubungan proposisi dengan tipe data boolean dalam bahasa pemrograman.",
        answer:
          "Komputer membutuhkan representasi yang dapat dievaluasi secara konsisten. TRUE/FALSE menjadi dasar evaluasi, dan proposisi dipetakan ke variabel boolean di program sehingga operasi logika dapat dijalankan.",
      },
    ],
  },
  {
    id: "logical-connectives",
    title: "Bagian B — Pemahaman Logical Connectives",
    questions: [
      {
        number: 4,
        prompt:
          "Diketahui P = Saya belajar dan Q = Saya mengerjakan tugas. Tuliskan representasi formal dari: (a) belajar dan mengerjakan tugas, (b) belajar atau mengerjakan tugas, (c) tidak belajar, (d) jika belajar maka mengerjakan tugas.",
        answer:
          "a. P ∧ Q; b. P ∨ Q; c. ¬P; d. P → Q.",
      },
      {
        number: 5,
        prompt:
          "Apa perbedaan antara OR dan XOR? Berikan contoh situasi nyata untuk masing-masing.",
        answer:
          "OR inklusif bernilai TRUE jika minimal satu proposisi TRUE (boleh keduanya). XOR bernilai TRUE hanya jika tepat satu proposisi TRUE. Contoh OR: punya email atau telepon untuk daftar. Contoh XOR: memilih tepat satu jadwal ujian.",
      },
      {
        number: 6,
        prompt:
          "Mengapa formula P → Q bernilai TRUE ketika P = FALSE dan Q = FALSE? Jelaskan menggunakan pemahaman Anda sendiri.",
        answer:
          "Implikasi hanya melanggar aturan ketika antecedent P benar tetapi consequent Q salah. Jika P tidak terjadi, aturan tidak dilanggar, sehingga P → Q bernilai TRUE.",
      },
    ],
  },
  {
    id: "evaluasi-formula",
    title: "Bagian C — Evaluasi Formula",
    questions: [
      {
        number: 7,
        prompt:
          "Diketahui P = TRUE, Q = FALSE, R = TRUE. Tentukan hasil evaluasi: a. P ∧ Q; b. P ∨ Q; c. ¬Q; d. P → Q; e. P ↔ R.",
        answer:
          "a. FALSE; b. TRUE; c. TRUE; d. FALSE; e. TRUE.",
      },
      {
        number: 8,
        prompt:
          "Diberikan pernyataan: “Jika pengguna login dan memiliki permission, maka pengguna dapat mengakses dashboard.” Definisikan proposisi P, Q, dan R, lalu tuliskan formula logikanya.",
        answer:
          "P = Pengguna login; Q = Pengguna memiliki permission; R = Pengguna dapat mengakses dashboard. Formula: (P ∧ Q) → R.",
      },
      {
        number: 9,
        prompt:
          "Diberikan formula (P ∨ Q) ∧ ¬R dengan P = FALSE, Q = TRUE, R = TRUE. Tentukan nilai akhir formula dan jelaskan urutan evaluasinya.",
        answer:
          "P ∨ Q = FALSE ∨ TRUE = TRUE. ¬R = FALSE. Maka (P ∨ Q) ∧ ¬R = TRUE ∧ FALSE = FALSE.",
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
          "Anda diminta membuat sistem validasi registrasi pengguna. Aturan: “Pengguna dapat registrasi jika memiliki email atau nomor telepon, dan belum terdaftar sebelumnya.” Tentukan proposisi, simbol, formula, kondisi registrasi diperbolehkan, dan contoh implementasi JavaScript.",
        answer:
          "P = memiliki email; Q = memiliki nomor telepon; R = belum terdaftar. Formula: (P ∨ Q) ∧ R. Registrasi diperbolehkan ketika minimal salah satu kontak tersedia dan pengguna belum terdaftar. Implementasi: if ((hasEmail || hasPhone) && !isRegistered) { ... }.",
      },
    ],
  },
];
