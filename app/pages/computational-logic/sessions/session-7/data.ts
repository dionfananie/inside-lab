export const sessionSevenSections = [
  { id: "tujuan", label: "Tujuan belajar" },
  { id: "mengapa-pembuktian", label: "Mengapa pembuktian formal?" },
  { id: "formal-proof", label: "Formal proof & notasi ⊢" },
  { id: "natural-deduction", label: "Natural Deduction" },
  { id: "aturan-and", label: "Conjunction (∧)" },
  { id: "aturan-or", label: "Disjunction (∨)" },
  { id: "aturan-implikasi", label: "Implication (→)" },
  { id: "aturan-negasi", label: "Negation (¬)" },
  { id: "ringkasan-aturan", label: "Ringkasan aturan" },
  { id: "subproof", label: "Subproof & asumsi" },
  { id: "contoh-pembuktian", label: "Contoh pembuktian" },
  { id: "predicate", label: "Natural Deduction pada predicate logic" },
  { id: "perbandingan", label: "Proof, truth table & consequence" },
  { id: "penerapan", label: "Penerapan dalam CS & AI" },
  { id: "aktivitas", label: "Aktivitas PBL" },
  { id: "kesimpulan", label: "Kesimpulan" },
  { id: "knowledge-check", label: "Knowledge check" },
];

export const sessionSevenObjectives = [
  "Menjelaskan pengertian formal proof dan notasi Γ ⊢ Q.",
  "Membedakan derivasi sintaktis (⊢) dan konsekuensi semantik (⊨).",
  "Menjelaskan prinsip introduction dan elimination pada Natural Deduction.",
  "Menggunakan aturan ∧I, ∧E, ∨I, ∨E, →I, →E, ¬I, dan ¬E.",
  "Menyusun pembuktian dengan asumsi sementara dan subproof.",
  "Menutup asumsi dengan aturan yang tepat agar kesimpulan tetap sah.",
  "Membuktikan kesimpulan sederhana dari sekumpulan premis.",
  "Menerapkan aturan dasar Natural Deduction pada predicate logic.",
  "Mengidentifikasi langkah pembuktian yang tidak valid.",
];

export const formalProofSteps = [
  ["1", "P → Q", "Premise"],
  ["2", "P", "Premise"],
  ["3", "Q", "→E (1, 2) / Modus Ponens"],
];

export const syntacticVsSemantic = [
  [
    "⊢ (syntactic derivation)",
    "Kesimpulan dapat diturunkan dengan aturan pembuktian formal.",
  ],
  [
    "⊨ (semantic entailment)",
    "Kesimpulan benar pada setiap interpretasi yang membuat semua premis benar.",
  ],
];

export const soundnessCompleteness = [
  {
    title: "Sound",
    description:
      "Sistem pembuktian disebut sound jika setiap formula yang dapat dibuktikan memang merupakan konsekuensi semantik. Sistem tidak menghasilkan kesimpulan yang tidak sah.",
  },
  {
    title: "Complete",
    description:
      "Sistem pembuktian disebut complete jika setiap konsekuensi semantik dapat dibuktikan di dalam sistem tersebut. Tidak ada kebenaran yang tertinggal.",
  },
];

export const naturalDeductionRules = [
  {
    name: "AND Introduction (∧I)",
    form: "P, Q ⊢ P ∧ Q",
    explanation: "Dari P dan Q, simpulkan P ∧ Q.",
  },
  {
    name: "AND Elimination (∧E)",
    form: "P ∧ Q ⊢ P   |   P ∧ Q ⊢ Q",
    explanation: "Dari P ∧ Q, kita dapat mengambil P atau Q.",
  },
  {
    name: "OR Introduction (∨I)",
    form: "P ⊢ P ∨ Q   |   Q ⊢ P ∨ Q",
    explanation: "Dari salah satu proposisi, simpulkan disjungsi yang memuatnya.",
  },
  {
    name: "OR Elimination (∨E)",
    form: "P ∨ Q, [P] ⊢ R, [Q] ⊢ R ⊢ R",
    explanation:
      "Jika P ∨ Q benar, dari asumsi P dapat dibuktikan R, dan dari asumsi Q juga dapat dibuktikan R, maka R dapat disimpulkan.",
  },
  {
    name: "Implication Elimination (→E)",
    form: "P → Q, P ⊢ Q",
    explanation: "Modus Ponens: dari P → Q dan P, simpulkan Q.",
  },
  {
    name: "Implication Introduction (→I)",
    form: "[P] ⊢ Q, lalu tutup asumsi ⊢ P → Q",
    explanation:
      "Jika dengan mengasumsikan P kita dapat membuktikan Q, simpulkan P → Q. Asumsi P ditutup setelah pembuktian selesai.",
  },
  {
    name: "Negation Introduction (¬I)",
    form: "[P] ⊢ ⊥, lalu tutup asumsi ⊢ ¬P",
    explanation:
      "Jika asumsi P menghasilkan kontradiksi, simpulkan ¬P.",
  },
  {
    name: "Negation Elimination (¬E)",
    form: "P, ¬P ⊢ ⊥",
    explanation: "Dari P dan ¬P, simpulkan kontradiksi.",
  },
];

export const ruleSummaryTable = [
  ["AND (∧)", "Dari P dan Q, simpulkan P ∧ Q.", "Dari P ∧ Q, ambil P atau Q."],
  [
    "OR (∨)",
    "Dari P, simpulkan P ∨ Q.",
    "Dari P ∨ Q dan pembuktian dua kasus, simpulkan R.",
  ],
  [
    "Implication (→)",
    "Asumsikan P dan buktikan Q, lalu simpulkan P → Q.",
    "Dari P → Q dan P, simpulkan Q.",
  ],
  [
    "Negation (¬)",
    "Asumsikan P dan dapatkan kontradiksi, lalu simpulkan ¬P.",
    "Dari P dan ¬P, simpulkan kontradiksi.",
  ],
];

export const implicationIntroExample = [
  ["1", "P", "Asumsi sementara"],
  ["2", "P → P", "→I (1), tutup asumsi"],
];

export const transitivityProof = [
  ["1", "P → Q", "Premise"],
  ["2", "Q → R", "Premise"],
  ["3", "P", "Asumsi sementara"],
  ["4", "Q", "→E (1, 3)"],
  ["5", "R", "→E (2, 4)"],
  ["6", "P → R", "→I (3–5), tutup asumsi"],
];

export const conjunctionProof = [
  ["1", "P", "Premise"],
  ["2", "Q", "Premise"],
  ["3", "P ∧ Q", "∧I (1, 2)"],
];

export const negationProof = [
  ["1", "P → Q", "Premise"],
  ["2", "P → ¬Q", "Premise"],
  ["3", "P", "Asumsi sementara"],
  ["4", "Q", "→E (1, 3)"],
  ["5", "¬Q", "→E (2, 3)"],
  ["6", "⊥", "¬E (4, 5)"],
  ["7", "¬P", "¬I (3–6), tutup asumsi"],
];

export const predicateRules = [
  ["Universal Elimination (∀E)", "∀x P(x) ⊢ P(a)", "Menerapkan aturan universal pada objek tertentu."],
  ["Universal Introduction (∀I)", "P(a) ⊢ ∀x P(x)", "a dipilih sembarang dan pembuktian tidak bergantung pada asumsi khusus tentang a."],
  ["Existential Introduction (∃I)", "P(a) ⊢ ∃x P(x)", "Menunjukkan bahwa minimal ada satu saksi yang memenuhi P."],
  ["Existential Elimination (∃E)", "∃x P(x), [P(a)] ⊢ R", "Memperkenalkan nama sementara a yang baru, lalu menutupnya saat kesimpulan R tidak bergantung pada a."],
];

export const predicateProof = [
  ["1", "∀x (Student(x) → MustTakeExam(x))", "Premise"],
  ["2", "Student(Dion)", "Premise"],
  ["3", "Student(Dion) → MustTakeExam(Dion)", "∀E (1)"],
  ["4", "MustTakeExam(Dion)", "→E (3, 2)"],
];

export const comparisonTable = [
  [
    "Truth table",
    "Evaluasi kombinasi nilai kebenaran",
    "Memeriksa validitas atau ekuivalensi formula proposisional.",
  ],
  [
    "Logical consequence (⊨)",
    "Semantik/model",
    "Menentukan apakah kesimpulan mengikuti premis pada semua model.",
  ],
  [
    "Formal proof (⊢)",
    "Sintaks/aturan",
    "Menunjukkan langkah penurunan kesimpulan.",
  ],
  [
    "Natural Deduction",
    "Sistem formal proof",
    "Membuktikan kesimpulan dengan aturan introduction dan elimination.",
  ],
];

export const applicationCards = [
  {
    title: "Automated theorem proving",
    description:
      "Sistem mencari pembuktian formula secara otomatis untuk memeriksa konsistensi spesifikasi dan memverifikasi properti perangkat lunak.",
  },
  {
    title: "Type theory",
    description:
      "Melalui Curry–Howard correspondence, tipe dipandang sebagai proposisi dan program sebagai bukti. Gagasan ini mendasari proof assistant dan dependently typed language.",
  },
];

export const commonMistakes = [
  {
    title: "Affirming the consequent",
    description:
      "Dari P → Q dan Q tidak dapat disimpulkan P. Pola ini tidak valid karena Q bisa benar melalui alasan lain.",
  },
  {
    title: "Asumsi yang tidak ditutup",
    description:
      "Kesimpulan yang masih bergantung pada asumsi sementara belum sah sebagai teorema. Tutup asumsi dengan →I atau ¬I.",
  },
  {
    title: "Aturan yang tidak cocok",
    description:
      "∧E hanya berlaku pada formula yang berbentuk P ∧ Q, bukan pada implikasi atau disjungsi.",
  },
  {
    title: "Nama sementara pada ∃E",
    description:
      "Nama baru pada ∃E harus benar-benar baru dan tidak boleh muncul di kesimpulan akhir atau asumsi lain.",
  },
];

export const activityProof = [
  ["1", "(P ∧ Q) → R", "Premise"],
  ["2", "(R ∧ S) → T", "Premise"],
  ["3", "P", "Fakta / premise"],
  ["4", "Q", "Fakta / premise"],
  ["5", "S", "Fakta / premise"],
  ["6", "P ∧ Q", "∧I (3, 4)"],
  ["7", "R", "→E (1, 6)"],
  ["8", "R ∧ S", "∧I (7, 5)"],
  ["9", "T", "→E (2, 8)"],
];
