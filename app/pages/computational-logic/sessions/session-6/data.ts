export const sessionSixSections = [
  { id: "tujuan", label: "Tujuan belajar" },
  { id: "keterbatasan", label: "Keterbatasan propositional logic" },
  { id: "apa-itu-predicate-logic", label: "Predicate logic" },
  { id: "komponen", label: "Komponen predicate logic" },
  { id: "quantifier", label: "Quantifier" },
  { id: "scope", label: "Scope & bound variable" },
  { id: "negasi-quantifier", label: "Negasi quantifier" },
  { id: "translasi", label: "Translasi bahasa alami" },
  { id: "consequence", label: "Logical consequence" },
  { id: "prolog", label: "Prolog" },
  { id: "penerapan", label: "Penerapan dalam AI" },
  { id: "aktivitas", label: "Aktivitas PBL" },
  { id: "kesimpulan", label: "Kesimpulan" },
  { id: "knowledge-check", label: "Knowledge check" },
];

export const sessionSixObjectives = [
  "Menjelaskan keterbatasan propositional logic.",
  "Menjelaskan pengertian predicate logic dan first-order logic.",
  "Membedakan proposition dan predicate.",
  "Memahami penggunaan constant, variable, function, dan predicate.",
  "Memahami universal quantifier dan existential quantifier.",
  "Mengubah kalimat bahasa alami menjadi representasi predicate logic.",
  "Melakukan penalaran sederhana menggunakan predicate logic.",
  "Memahami penerapan predicate logic dalam AI dan logic programming.",
];

export const componentsTable = [
  ["Constant", "Objek tertentu", "Teddy"],
  ["Variable", "Objek umum", "x"],
  ["Predicate", "Properti atau hubungan", "Student(x)"],
  ["Function", "Menghasilkan objek lain", "FatherOf(x)"],
];

export const quantifierComparisonTable = [
  ["Semua objek", "Setidaknya satu objek"],
  ["For all", "There exists"],
  ["Berlaku untuk seluruh objek", "Berlaku untuk minimal satu objek"],
  ["Contoh: semua mahasiswa belajar", "Contoh: ada mahasiswa yang belajar"],
];

export const quantifierLaws = [
  ["¬∀x P(x)", "∃x ¬P(x)"],
  ["¬∃x P(x)", "∀x ¬P(x)"],
];

export const translationExamples = [
  {
    title: "Contoh 1 — Universal",
    statement: "Semua mahasiswa mengambil mata kuliah AI.",
    formula: "∀x (Student(x) → Takes(x, AI))",
  },
  {
    title: "Contoh 2 — Existential",
    statement: "Ada mahasiswa yang mengambil mata kuliah AI.",
    formula: "∃x (Student(x) ∧ Takes(x, AI))",
  },
  {
    title: "Contoh 3 — Negasi existential",
    statement: "Tidak ada mahasiswa yang malas.",
    formula: "¬∃x (Student(x) ∧ Lazy(x)) ≡ ∀x (Student(x) → ¬Lazy(x))",
  },
  {
    title: "Contoh 4 — Setiap mahasiswa punya pembimbing",
    statement: "Setiap mahasiswa memiliki setidaknya satu dosen pembimbing.",
    formula: "∀x (Student(x) → ∃y Advises(y, x))",
  },
  {
    title: "Contoh 5 — Satu dosen membimbing semua",
    statement: "Ada satu dosen yang membimbing semua mahasiswa.",
    formula: "∃y ∀x (Student(x) → Advises(y, x))",
  },
];

export const knowledgeCheckGroups = [
  {
    id: "pemahaman-konsep",
    title: "Bagian A — Pemahaman Konsep",
    questions: [
      {
        number: 1,
        prompt: "Apa perbedaan propositional logic dan predicate logic?",
        answer: "Propositional logic memperlakukan pernyataan sebagai satu kesatuan (P, Q). Predicate logic melihat struktur internal pernyataan dan merepresentasikan objek, properti, serta hubungan antarobjek.",
      },
      {
        number: 2,
        prompt: "Apa yang dimaksud dengan predicate?",
        answer: "Predicate menyatakan properti atau hubungan antarobjek, misalnya Student(Teddy) atau Likes(Teddy, Mathematics).",
      },
      {
        number: 3,
        prompt: "Apa perbedaan constant dan variable?",
        answer: "Constant merujuk objek tertentu (misal Teddy), sedangkan variable merepresentasikan objek secara umum (misal x).",
      },
      {
        number: 4,
        prompt: "Apa perbedaan universal quantifier (∀) dan existential quantifier (∃)?",
        answer: "∀ berarti kondisi berlaku untuk semua objek; ∃ berarti setidaknya ada satu objek yang memenuhi kondisi.",
      },
    ],
  },
  {
    id: "translasi-analisis",
    title: "Bagian B — Translasi & Analisis",
    questions: [
      {
        number: 5,
        prompt: "Ubah kalimat “Semua manusia adalah makhluk hidup” menjadi predicate logic.",
        answer: "∀x (Human(x) → LivingThing(x)).",
      },
      {
        number: 6,
        prompt: "Ubah kalimat “Ada mahasiswa yang menyukai pemrograman” menjadi predicate logic.",
        answer: "∃x (Student(x) ∧ Likes(x, Programming)).",
      },
      {
        number: 7,
        prompt: "Apa yang dimaksud dengan bound variable dan free variable?",
        answer: "Bound variable adalah variabel yang berada dalam cakupan quantifier. Free variable tidak terikat quantifier mana pun.",
      },
      {
        number: 8,
        prompt: "Mengapa urutan quantifier dapat mengubah makna formula?",
        answer: "Urutan menentukan objek mana yang dipilih lebih dulu. ∀x ∃y berarti setiap x punya y-nya sendiri, sedangkan ∃y ∀x berarti ada satu y untuk semua x.",
      },
    ],
  },
  {
    id: "consequence-implementasi",
    title: "Bagian C — Consequence & Implementasi",
    questions: [
      {
        number: 9,
        prompt: "Diberikan ∀x (Human(x) → Mortal(x)) dan Human(Socrates). Kesimpulan apa yang dapat diturunkan, dan inference rule apa yang digunakan?",
        answer: "Mortal(Socrates). Menggunakan universal instantiation lalu Modus Ponens.",
      },
      {
        number: 10,
        prompt: "Jelaskan bagaimana Prolog merepresentasikan fakta, aturan, dan query untuk mencari mahasiswa yang mengambil mata kuliah AI.",
        answer: "Fakta seperti student(teddy) dan takes(teddy, ai), aturan takes_ai(X) :- student(X), takes(X, ai), lalu query ?- takes_ai(X) untuk mencari seluruh objek yang memenuhi.",
      },
    ],
  },
];
