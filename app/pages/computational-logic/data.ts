import type { LogicSession } from "./types";

export const logicSessions: LogicSession[] = [
  {
    session: 1,
    topic: "Pengantar logika formal: sintaks, semantik, dan inference rules",
    target: "Memahami logika formal, sintaks, semantik, dan peran aturan dalam keputusan AI.",
    activity: "AI Decision Challenge: periksa keputusan sistem AI, identifikasi aturan logisnya, dan debat validitasnya.",
    status: "ready",
    href: "/computational-logic/session/1",
  },
  {
    session: 2,
    topic: "Logika proposisional dan tabel kebenaran",
    target: "Menyusun proposisi, mengevaluasi operator logika, dan membaca tabel kebenaran.",
    activity: "Truth Table Race: buat tabel kebenaran untuk skenario login atau akses fitur, lalu verifikasi hasil kelompok lain.",
    status: "ready",
    href: "/computational-logic/session/2",
    tool: { label: "Buka Logic Lab", href: "/computational-logic/proportional-logic" },
  },
  {
    session: 3,
    topic: "Ekivalensi logis, CNF, dan DNF",
    target: "Mengubah ekspresi ke bentuk normal dan memeriksa apakah dua ekspresi memiliki makna yang sama.",
    activity: "Logic Transformation Puzzle: ubah ekspresi ke bentuk normal dan periksa kesetaraan hasil kelompok lain.",
    status: "ready",
    href: "/computational-logic/session/3",
    tool: { label: "Buka SAT Solver", href: "/computational-logic/sat-solver" },
  },
  {
    session: 4,
    topic: "Aturan inferensi dan validitas argumen",
    target: "Menguji apakah kesimpulan mengikuti premis menggunakan aturan inferensi.",
    activity: "Valid or Invalid?: adili argumen, tentukan validitasnya, dan bela keputusan dengan aturan inferensi.",
    status: "ready",
    href: "/computational-logic/session/4",
    tool: { label: "Buka Logic Lab", href: "/computational-logic/proportional-logic" },
  },
  {
    session: 5,
    topic: "Aljabar Boolean dan penyederhanaan",
    target: "Menyederhanakan aturan Boolean agar lebih mudah dipahami dan diimplementasikan.",
    activity: "Circuit Optimization Challenge: sederhanakan aturan akses atau rangkaian digital dan bandingkan solusi.",
    status: "ready",
    href: "/computational-logic/session/5",
  },
  {
    session: 6,
    topic: "Logika predikat, kuantor, dan interpretasi",
    target: "Menerjemahkan pernyataan dunia nyata ke logika predikat dan mengujinya dengan counterexample.",
    activity: "Translate the World: ubah pernyataan sehari-hari menjadi logika predikat dan uji dengan counterexample.",
    status: "ready",
    href: "/computational-logic/session/6",
  },
];

export function findLogicSession(sessionId: string | undefined) {
  const session = Number(sessionId);
  return logicSessions.find((item) => item.session === session);
}

export const logicPrinciples = [
  ["Formal", "Aturan ditulis dengan simbol dan grammar yang dapat diperiksa."],
  ["Sintaks", "Menentukan apakah sebuah ekspresi memiliki bentuk yang sah."],
  ["Semantik", "Menentukan makna dan nilai kebenaran sebuah ekspresi."],
  ["Validitas", "Memeriksa apakah kesimpulan benar-benar mengikuti premis."],
] as const;

export const sessionLessons: Record<number, {
  question: string;
  concepts: string[];
  example: string;
  takeaway: string;
  practice?: { label: string; formula: string; verdict: string }[];
}> = {
  2: {
    question: "Kapan sebuah proposisi atau kombinasi proposisi bernilai benar?",
    concepts: ["Proposisi", "Nilai kebenaran", "¬, ∧, ∨, →, ↔", "Tabel kebenaran"],
    example: "(login ∧ memiliki_izin) → akses_diberikan",
    takeaway: "Tabel kebenaran membantu memeriksa semua kemungkinan, bukan hanya contoh yang kebetulan terlihat benar.",
  },
  3: {
    question: "Bagaimana ekspresi dapat ditulis ulang tanpa mengubah maknanya?",
    concepts: ["Ekivalensi logis", "CNF", "DNF", "Klausa dan literal"],
    example: "(p → q) ≡ (¬p ∨ q)",
    takeaway: "Bentuk normal membuat formula lebih mudah diproses oleh algoritma dan solver.",
  },
  4: {
    question: "Apakah kesimpulan benar-benar mengikuti premis?",
    concepts: ["Premis dan kesimpulan", "Modus ponens", "Kontrapositif", "Counterexample"],
    example: "p → q, p ⊢ q",
    takeaway: "Argumen valid bukan berarti premisnya selalu benar; validitas hanya memeriksa hubungan premis dan kesimpulan.",
    practice: [
      { label: "Valid", formula: "p → q, p ⊢ q", verdict: "Modus ponens: kesimpulan mengikuti premis." },
      { label: "Invalid", formula: "p → q, q ⊢ p", verdict: "Affirming the consequent: q benar tidak menjamin p benar." },
    ],
  },
  5: {
    question: "Bagaimana aturan Boolean dibuat lebih sederhana?",
    concepts: ["Identitas Boolean", "Absorpsi", "De Morgan", "Optimasi aturan"],
    example: "(p ∧ q) ∨ (p ∧ ¬q) ≡ p",
    takeaway: "Penyederhanaan dapat mengurangi kompleksitas aturan tanpa mengubah perilakunya.",
  },
  6: {
    question: "Bagaimana kita menyatakan objek, sifat, dan hubungan di dunia nyata?",
    concepts: ["Predikat", "Kuantor universal ∀", "Kuantor eksistensial ∃", "Interpretasi dan counterexample"],
    example: "∀x (pengguna(x) → memiliki_id(x))",
    takeaway: "Logika predikat membuat klaim tentang banyak objek menjadi eksplisit dan dapat diuji.",
  },
};
