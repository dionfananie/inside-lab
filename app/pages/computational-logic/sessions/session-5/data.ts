export const sessionFiveSections = [
  { id: "tujuan", label: "Tujuan belajar" },
  { id: "review", label: "Review logical consequence" },
  { id: "inference-rules", label: "Inference rules" },
  { id: "consequence-vs-rules", label: "Consequence vs rules" },
  { id: "automated-reasoning", label: "Automated reasoning" },
  { id: "inference-engine", label: "Inference engine (JS)" },
  { id: "chaining", label: "Forward & backward chaining" },
  { id: "prolog", label: "Prolog" },
  { id: "software-engineering", label: "Software engineering" },
  { id: "kesalahpahaman", label: "Kesalahpahaman" },
  { id: "aktivitas", label: "Aktivitas PBL" },
  { id: "kesimpulan", label: "Kesimpulan" },
  { id: "knowledge-check", label: "Knowledge check" },
];

export const sessionFiveObjectives = [
  "Menjelaskan pengertian logical consequence.",
  "Membedakan logical consequence dengan inference rules.",
  "Memahami dan menerapkan beberapa inference rules.",
  "Menarik kesimpulan dari sekumpulan fakta dan aturan.",
  "Mengimplementasikan proses penalaran sederhana menggunakan program.",
  "Memahami penerapan logical reasoning dalam expert system dan AI.",
];

export type InferenceRule = {
  name: string;
  premises: string[];
  conclusion: string;
  form: string;
  example: string[];
};

export const inferenceRules: InferenceRule[] = [
  {
    name: "Modus Ponens",
    premises: ["P → Q", "P"],
    conclusion: "Q",
    form: "P → Q, P ∴ Q",
    example: [
      "Jika seseorang login, maka ia memiliki session.",
      "Teddy berhasil login.",
      "Maka Teddy memiliki session.",
    ],
  },
  {
    name: "Modus Tollens",
    premises: ["P → Q", "¬Q"],
    conclusion: "¬P",
    form: "P → Q, ¬Q ∴ ¬P",
    example: [
      "Jika server berjalan, maka endpoint dapat diakses.",
      "Endpoint tidak dapat diakses.",
      "Maka server tidak berjalan.",
    ],
  },
  {
    name: "Hypothetical Syllogism",
    premises: ["P → Q", "Q → R"],
    conclusion: "P → R",
    form: "P → Q, Q → R ∴ P → R",
    example: [
      "Jika login, maka punya session.",
      "Jika punya session, maka bisa akses dashboard.",
      "Maka jika login, bisa akses dashboard.",
    ],
  },
  {
    name: "Disjunctive Syllogism",
    premises: ["P ∨ Q", "¬P"],
    conclusion: "Q",
    form: "P ∨ Q, ¬P ∴ Q",
    example: [
      "Sistem memakai PostgreSQL atau MySQL.",
      "Sistem tidak memakai PostgreSQL.",
      "Maka sistem memakai MySQL.",
    ],
  },
];

export const consequenceVsRulesTable = [
  ["Hubungan logis antara premis dan kesimpulan", "Aturan untuk menurunkan kesimpulan"],
  ["Menentukan apakah kesimpulan mengikuti premis", "Menentukan bagaimana kesimpulan diturunkan"],
  ["Bersifat semantik", "Biasanya dijelaskan secara sintaktis"],
];

export const chainingComparisonTable = [
  ["Berangkat dari fakta yang sudah diketahui", "Berangkat dari goal yang ingin dibuktikan"],
  ["Data-driven", "Goal-driven"],
  ["Menerapkan aturan untuk menghasilkan fakta baru", "Mencari aturan yang dapat membuktikan goal"],
  ["Dapat menghasilkan banyak kesimpulan sekaligus", "Fokus pada satu kesimpulan"],
  ["Tidak perlu mengetahui goal di awal", "Harus mengetahui goal di awal"],
  ["Risiko ledakan kombinasi fakta", "Risiko subgoal berulang atau loop tanpa kontrol"],
  ["Cocok untuk monitoring, alert, dan diagnosis", "Cocok untuk query, Prolog, dan pembuktian"],
];

export const forwardChainingTrace = [
  ["1", "P", "P → Q", "Q"],
  ["2", "P, Q", "Q → R", "R"],
  ["3", "P, Q, R", "R → S", "S (goal tercapai)"],
  ["4", "P, Q, R, S", "Tidak ada aturan baru", "Proses berhenti"],
];

export const backwardChainingTrace = [
  ["1", "S", "R → S", "Subgoal R"],
  ["2", "R", "Q → R", "Subgoal Q"],
  ["3", "Q", "P → Q", "Subgoal P"],
  ["4", "P", "Fakta awal", "Berhasil; semua subgoal terpenuhi"],
  ["5", "S", "Rantai bukti lengkap", "S terbukti"],
];

export const chainingUseCases = [
  {
    title: "Pilih forward chaining jika...",
    description:
      "Fakta terus bertambah dan sistem perlu menghasilkan semua konsekuensi yang mungkin, misalnya monitoring, deteksi anomali, alert, atau diagnosis dari gejala.",
  },
  {
    title: "Pilih backward chaining jika...",
    description:
      "Goal sudah jelas dan sistem hanya perlu mencari bukti untuk goal tersebut, misalnya query knowledge base, sistem pakar konsultasi, atau eksekusi Prolog.",
  },
];

export const misconceptionList = [
  { title: "Logical consequence bukan sekadar IF-ELSE", description: "IF-ELSE adalah instruksi program, sedangkan logical consequence adalah hubungan semantik antara premis dan kesimpulan." },
  { title: "Komputer tidak otomatis tahu fakta dunia nyata", description: "Jika Knowledge Base menyimpan fakta salah, sistem dapat menghasilkan kesimpulan yang salah secara faktual meski proses inferensinya benar." },
  { title: "Kesimpulan tidak selalu disimpan permanen", description: "Kesimpulan bisa disimpan sementara, dihitung ulang, atau disimpan sebagai fakta turunan sesuai kebutuhan." },
  { title: "Tidak semua inference rule valid", description: "Contoh affirming the consequent: P → Q, Q ∴ P adalah kesalahan penalaran." },
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
        prompt: "Apa yang dimaksud dengan logical consequence?",
        answer: "Logical consequence adalah hubungan ketika kesimpulan harus bernilai TRUE setiap kali seluruh premis bernilai TRUE, ditulis KB ⊨ Q.",
      },
      {
        number: 2,
        prompt: "Apa fungsi inference rules?",
        answer: "Inference rules adalah aturan formal untuk menurunkan kesimpulan baru dari satu atau lebih premis, misalnya Modus Ponens.",
      },
      {
        number: 3,
        prompt: "Apa perbedaan Modus Ponens dan Modus Tollens?",
        answer: "Modus Ponens: dari P → Q dan P disimpulkan Q. Modus Tollens: dari P → Q dan ¬Q disimpulkan ¬P.",
      },
      {
        number: 4,
        prompt: "Apa perbedaan forward chaining dan backward chaining?",
        answer: "Forward chaining berangkat dari fakta untuk menghasilkan kesimpulan. Backward chaining berangkat dari tujuan dan mencari bukti yang mendukung.",
      },
    ],
  },
  {
    id: "analisis",
    title: "Bagian B — Analisis Logika",
    questions: [
      {
        number: 5,
        prompt: "Apa perbedaan Knowledge Base dan Inference Engine?",
        answer: "Knowledge Base menyimpan fakta dan aturan. Inference Engine memproses fakta dan aturan tersebut untuk menghasilkan kesimpulan.",
      },
      {
        number: 6,
        prompt: "Diberikan P → Q, Q → R, dan P. Kesimpulan apa yang dapat diturunkan dan inference rules apa yang digunakan?",
        answer: "Dengan Modus Ponens dari P → Q dan P diperoleh Q. Lalu dengan Hypothetical Syllogism (atau Modus Ponens lagi) diperoleh R.",
      },
      {
        number: 7,
        prompt: "Apakah R merupakan logical consequence dari ketiga premis P → Q, Q → R, dan P? Jelaskan.",
        answer: "Ya. Setiap kali ketiga premis TRUE, R pasti TRUE, sehingga {P → Q, Q → R, P} ⊨ R.",
      },
      {
        number: 8,
        prompt: "Mengapa fakta yang salah dapat menghasilkan kesimpulan yang salah?",
        answer: "Karena inference engine hanya menerapkan aturan secara konsisten. Jika premisnya salah, kesimpulan bisa salah secara faktual meskipun proses penalarannya valid.",
      },
    ],
  },
  {
    id: "implementasi",
    title: "Bagian C — Implementasi",
    questions: [
      {
        number: 9,
        prompt: "Jelaskan bagaimana inference engine sederhana bekerja: membaca aturan, memeriksa kondisi, lalu menurunkan kesimpulan.",
        answer: "Inference engine membaca fakta, memeriksa apakah seluruh kondisi aturan terpenuhi, lalu menambahkan kesimpulan sebagai fakta baru, dan mengulangi proses selama ada aturan yang cocok.",
      },
      {
        number: 10,
        prompt: "Pada sistem kelayakan peminjaman buku (P ∧ Q ∧ R) → S, apakah program tersebut menggunakan Modus Ponens? Apa yang terjadi jika salah satu fakta tidak diketahui?",
        answer: "Ya, program menurunkan S dari (P ∧ Q ∧ R) ketika semua kondisi terpenuhi (Modus Ponens). Jika ada fakta yang tidak diketahui, kondisi tidak dapat dipastikan terpenuhi sehingga kesimpulan tidak bisa ditarik dengan pasti.",
      },
    ],
  },
];
