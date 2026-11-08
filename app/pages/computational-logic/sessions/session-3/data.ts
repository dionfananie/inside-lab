export const sessionThreeSections = [
  { id: "tujuan", label: "Tujuan belajar" },
  { id: "review", label: "Review sesi 2" },
  { id: "apa-itu-truth-table", label: "Apa itu truth table?" },
  { id: "kombinasi", label: "Jumlah kombinasi" },
  { id: "truth-table-connectives", label: "Truth table operator" },
  { id: "formula-kompleks", label: "Evaluasi kompleks" },
  { id: "precedence", label: "Precedence & parentheses" },
  { id: "wff", label: "Well-formed formula" },
  { id: "klasifikasi", label: "Tautology, contradiction, contingency" },
  { id: "satisfiable", label: "Satisfiable & unsatisfiable" },
  { id: "komputer", label: "Truth table ke komputer" },
  { id: "case-study", label: "Mini case study" },
  { id: "kesalahan", label: "Kesalahan umum" },
  { id: "kesimpulan", label: "Kesimpulan" },
  { id: "knowledge-check", label: "Knowledge check" },
];

export const sessionThreeObjectives = [
  "Menjelaskan pengertian Truth Table dan fungsinya dalam logika formal.",
  "Menentukan jumlah kombinasi nilai kebenaran dari sejumlah proposisi.",
  "Membuat Truth Table untuk formula dengan satu, dua, dan tiga proposisi.",
  "Mengevaluasi formula kompleks menggunakan Logical Connectives.",
  "Memahami operator precedence dan penggunaan parentheses.",
  "Menjelaskan pengertian Well-Formed Formula (WFF).",
  "Membedakan formula yang valid dan tidak valid secara sintaksis.",
  "Mengidentifikasi Tautology, Contradiction, dan Contingency.",
  "Menjelaskan bagaimana komputer mengevaluasi formula logika.",
  "Mengimplementasikan evaluasi logika sederhana menggunakan program.",
];

export const operatorReviewTable = [
  ["¬", "Negation", "NOT"],
  ["∧", "Conjunction", "AND"],
  ["∨", "Disjunction", "OR"],
  ["→", "Implication", "IF...THEN"],
  ["↔", "Biconditional", "IF AND ONLY IF"],
];

export const combinationTable = [
  ["1", "2¹", "2"],
  ["2", "2²", "4"],
  ["3", "2³", "8"],
  ["4", "2⁴", "16"],
  ["5", "2⁵", "32"],
  ["6", "2⁶", "64"],
];

export const connectiveTruthTables = [
  {
    name: "Negation (NOT)",
    symbol: "¬P",
    description: "Negation membalik nilai kebenaran proposisi.",
    headers: ["P", "¬P"],
    rows: [
      ["T", "F"],
      ["F", "T"],
    ],
  },
  {
    name: "Conjunction (AND)",
    symbol: "P ∧ Q",
    description: "AND bernilai TRUE hanya jika kedua proposisi bernilai TRUE.",
    headers: ["P", "Q", "P ∧ Q"],
    rows: [
      ["T", "T", "T"],
      ["T", "F", "F"],
      ["F", "T", "F"],
      ["F", "F", "F"],
    ],
  },
  {
    name: "Disjunction (OR)",
    symbol: "P ∨ Q",
    description: "OR bernilai TRUE jika minimal satu proposisi bernilai TRUE.",
    headers: ["P", "Q", "P ∨ Q"],
    rows: [
      ["T", "T", "T"],
      ["T", "F", "T"],
      ["F", "T", "T"],
      ["F", "F", "F"],
    ],
  },
  {
    name: "Implication",
    symbol: "P → Q",
    description: "Implikasi bernilai FALSE hanya ketika P TRUE dan Q FALSE.",
    headers: ["P", "Q", "P → Q"],
    rows: [
      ["T", "T", "T"],
      ["T", "F", "F"],
      ["F", "T", "T"],
      ["F", "F", "T"],
    ],
  },
  {
    name: "Biconditional",
    symbol: "P ↔ Q",
    description: "Biconditional bernilai TRUE ketika P dan Q memiliki nilai kebenaran yang sama.",
    headers: ["P", "Q", "P ↔ Q"],
    rows: [
      ["T", "T", "T"],
      ["T", "F", "F"],
      ["F", "T", "F"],
      ["F", "F", "T"],
    ],
  },
];

export const complexTruthTable = {
  description:
    "Formula hanya bernilai FALSE pada baris ketika P TRUE, Q TRUE, dan R FALSE.",
  headers: ["P", "Q", "R", "P ∧ Q", "(P ∧ Q) → R"],
  rows: [
    ["T", "T", "T", "T", "T"],
    ["T", "T", "F", "T", "F"],
    ["T", "F", "T", "F", "T"],
    ["T", "F", "F", "F", "T"],
    ["F", "T", "T", "F", "T"],
    ["F", "T", "F", "F", "T"],
    ["F", "F", "T", "F", "T"],
    ["F", "F", "F", "F", "T"],
  ],
};

export const precedenceTable = [
  ["1", "Negation", "¬"],
  ["2", "Conjunction", "∧"],
  ["3", "Disjunction", "∨"],
  ["4", "Implication", "→"],
  ["5", "Biconditional", "↔"],
];

export const wffExamples = ["P", "¬P", "(P ∧ Q)", "(P ∨ Q)", "(P → Q)", "(P ∧ Q) → R", "¬(P ∨ Q)", "(P → Q) ∧ (Q → R)"];
export const notWffExamples = ["∧ P Q", "P →", "→ P Q", "P ∧", "(P ∧ Q", "¬ ∧ P"];

export const classificationTable = [
  ["Tautology", "Selalu TRUE", "P ∨ ¬P"],
  ["Contradiction", "Selalu FALSE", "P ∧ ¬P"],
  ["Contingency", "Bisa TRUE dan FALSE", "P ∧ Q"],
];

export const satisfiableTable = [
  ["Tautology", "Ya"],
  ["Contradiction", "Tidak"],
  ["Contingency", "Ya"],
];

export const complexityTable = [
  ["2", "4"],
  ["3", "8"],
  ["5", "32"],
  ["10", "1.024"],
  ["20", "1.048.576"],
  ["30", "1.073.741.824"],
];

export const registrasiTruthTable = {
  description:
    "Registrasi diizinkan (kolom terakhir TRUE) hanya ketika minimal satu kontak tersedia dan pengguna belum terdaftar.",
  headers: ["P", "Q", "R", "P ∨ Q", "¬R", "(P ∨ Q) ∧ ¬R"],
  rows: [
    ["T", "T", "T", "T", "F", "F"],
    ["T", "T", "F", "T", "T", "T"],
    ["T", "F", "T", "T", "F", "F"],
    ["T", "F", "F", "T", "T", "T"],
    ["F", "T", "T", "T", "F", "F"],
    ["F", "T", "F", "T", "T", "T"],
    ["F", "F", "T", "F", "F", "F"],
    ["F", "F", "F", "F", "T", "F"],
  ],
};

export const commonMistakes = [
  { title: "Tidak memeriksa seluruh kombinasi", description: "Dengan tiga proposisi harus ada 2³ = 8 baris, bukan 4." },
  { title: "Salah mengevaluasi implication", description: "P → Q hanya FALSE ketika P TRUE dan Q FALSE, bukan ketika P dan Q berbeda." },
  { title: "Mengabaikan parentheses", description: "P ∨ (Q ∧ R) berbeda struktur dengan (P ∨ Q) ∧ R." },
  { title: "Menganggap WFF berarti TRUE", description: "WFF hanya berarti syntax valid; P ∧ Q bisa bernilai FALSE." },
  { title: "Menganggap satisfiable sama dengan tautology", description: "Satisfiable cukup ada satu assignment TRUE; tautology harus selalu TRUE." },
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
          "Apa yang dimaksud dengan Truth Table? Mengapa Truth Table perlu memeriksa seluruh kombinasi nilai TRUE dan FALSE?",
        answer:
          "Truth Table adalah metode untuk menampilkan seluruh kombinasi nilai kebenaran proposisi dan hasil evaluasi formula. Seluruh kombinasi diperiksa agar tidak ada kemungkinan yang terlewat dan kesimpulan menjadi pasti.",
      },
      {
        number: 2,
        prompt:
          "Jika terdapat lima proposisi atomik yang berbeda, berapa jumlah kombinasi nilai kebenaran yang harus diperiksa? Jelaskan bagaimana Anda mendapatkannya.",
        answer:
          "2⁵ = 32 kombinasi. Setiap proposisi punya dua nilai (TRUE/FALSE), sehingga totalnya 2 dikali dirinya sendiri sebanyak jumlah proposisi.",
      },
      {
        number: 3,
        prompt:
          "Apa perbedaan antara WFF dan formula yang bernilai TRUE? Apakah formula yang syntax-nya valid selalu bernilai TRUE? Berikan contoh.",
        answer:
          "WFF adalah formula dengan struktur sintaksis valid. Formula WFF belum tentu bernilai TRUE. Contoh: P ∧ Q adalah WFF, tetapi bernilai FALSE ketika P = TRUE dan Q = FALSE.",
      },
    ],
  },
  {
    id: "evaluasi-formula",
    title: "Bagian B — Evaluasi Formula",
    questions: [
      {
        number: 4,
        prompt:
          "Diketahui P = TRUE, Q = FALSE, R = TRUE. Evaluasilah: a. P ∧ Q; b. P ∨ Q; c. ¬R; d. P → Q; e. (P ∧ Q) → R. Jelaskan hasilnya.",
        answer:
          "a. FALSE; b. TRUE; c. FALSE; d. FALSE; e. TRUE (karena FALSE → TRUE = TRUE).",
      },
      {
        number: 5,
        prompt:
          "Buatlah Truth Table untuk (P ∨ Q) ∧ ¬R. Terdapat berapa kombinasi nilai kebenaran?",
        answer:
          "Terdapat 2³ = 8 kombinasi. Table dibuat dari seluruh kombinasi P, Q, R, lalu evaluasi P ∨ Q, ¬R, dan terakhir (P ∨ Q) ∧ ¬R.",
      },
      {
        number: 6,
        prompt:
          "Apa perbedaan hasil A = P ∨ (Q ∧ R) dan B = (P ∨ Q) ∧ R dengan P = TRUE, Q = FALSE, R = FALSE? Tunjukkan langkah evaluasinya.",
        answer:
          "A = TRUE ∨ (FALSE ∧ FALSE) = TRUE. B = (TRUE ∨ FALSE) ∧ FALSE = TRUE ∧ FALSE = FALSE. Jadi hasilnya berbeda.",
      },
    ],
  },
  {
    id: "analisis-formula",
    title: "Bagian C — Analisis Formula",
    questions: [
      {
        number: 7,
        prompt:
          "Tentukan apakah formula berikut termasuk Tautology, Contradiction, atau Contingency: a. P ∨ ¬P; b. P ∧ ¬P; c. P → Q. Buat Truth Table untuk mendukung jawaban.",
        answer:
          "a. Tautology (selalu TRUE). b. Contradiction (selalu FALSE). c. Contingency (ada TRUE dan FALSE).",
      },
      {
        number: 8,
        prompt:
          "Apa perbedaan antara Satisfiable dan Tautology? Apakah sebuah formula dapat satisfiable tetapi bukan tautology? Berikan contoh.",
        answer:
          "Satisfiable berarti minimal ada satu assignment TRUE. Tautology berarti selalu TRUE. Formula dapat satisfiable tanpa menjadi tautology, contohnya P ∧ Q (TRUE hanya saat keduanya TRUE).",
      },
      {
        number: 9,
        prompt:
          "Diberikan formula: P ∧. Apakah formula tersebut merupakan WFF? Jelaskan, lalu berikan contoh formula yang benar secara syntax.",
        answer:
          "P ∧ bukan WFF karena operator AND membutuhkan dua operand. Contoh WFF: (P ∧ Q) atau ¬P.",
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
          "Anda diminta membuat program yang mengevaluasi (P ∧ Q) → R. Jelaskan jumlah kombinasi, cara komputer menghasilkan kombinasi, cara mengevaluasi, dan cara menentukan tautology/contradiction/contingency. Berikan contoh implementasi JavaScript.",
        answer:
          "Ada 2³ = 8 kombinasi. Komputer menghasilkan assignment dengan bit, mengevaluasi dengan !(P && Q) || R, lalu mengklasifikasikan: semua TRUE → tautology, semua FALSE → contradiction, campuran → contingency.",
      },
    ],
  },
];
