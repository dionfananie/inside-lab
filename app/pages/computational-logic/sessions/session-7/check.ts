import type { SessionKnowledgeCheck } from "../../check/types";

export const sessionSevenCheck: SessionKnowledgeCheck = {
  multipleChoice: [
    {
      number: 1,
      prompt: "Apa yang dimaksud dengan formal proof?",
      options: [
        {
          id: "a",
          text: "Daftar seluruh kemungkinan nilai kebenaran yang dimiliki oleh sebuah formula proposisional.",
        },
        {
          id: "b",
          text: "Urutan langkah yang menunjukkan bahwa sebuah formula dapat diturunkan dari premis menggunakan aturan pembuktian yang ditetapkan.",
        },
        {
          id: "c",
          text: "Program komputer yang otomatis menemukan semua model dari sebuah Knowledge Base.",
        },
        {
          id: "d",
          text: "Pernyataan bahwa premis dan kesimpulan selalu bernilai benar pada semua interpretasi.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Formal proof adalah urutan langkah yang menunjukkan penurunan sebuah formula dari premis dengan aturan pembuktian formal, sehingga setiap langkah dapat diperiksa.",
    },
    {
      number: 2,
      prompt:
        "Notasi Γ ⊢ Q dan Γ ⊨ Q memiliki makna yang berbeda. Pernyataan mana yang paling tepat?",
      options: [
        {
          id: "a",
          text: "Γ ⊢ Q berarti Q benar pada semua interpretasi, sedangkan Γ ⊨ Q berarti Q dapat diturunkan secara sintaktis.",
        },
        {
          id: "b",
          text: "Γ ⊢ Q berarti Q dapat diturunkan secara sintaktis dengan aturan formal, sedangkan Γ ⊨ Q berarti Q benar pada setiap interpretasi yang membuat semua premis Γ benar.",
        },
        {
          id: "c",
          text: "Keduanya memiliki makna yang sama karena sama-sama menyatakan bahwa Q benar.",
        },
        {
          id: "d",
          text: "Γ ⊢ Q hanya dipakai pada truth table, sedangkan Γ ⊨ Q hanya dipakai pada program komputer.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "⊢ menyatakan derivasi sintaktis menggunakan aturan pembuktian, sedangkan ⊨ menyatakan konsekuensi semantik: Q benar pada semua interpretasi yang membuat premis benar.",
    },
    {
      number: 3,
      prompt:
        "Perhatikan premis berikut. Kesimpulan apa yang sah dan aturan apa yang digunakan?",
      code: "P → Q\nP",
      options: [
        {
          id: "a",
          text: "Q, menggunakan Implication Elimination (→E) atau Modus Ponens.",
        },
        {
          id: "b",
          text: "¬P, menggunakan Modus Tollens.",
        },
        {
          id: "c",
          text: "P ∧ Q, menggunakan AND Introduction (∧I).",
        },
        {
          id: "d",
          text: "Tidak ada kesimpulan yang dapat diturunkan karena Q belum diketahui benar.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "Dari P → Q dan P, →E (Modus Ponens) menghasilkan Q. Aturan ini tidak menuntut Q diketahui lebih dahulu; Q justru menjadi kesimpulan.",
    },
    {
      number: 4,
      prompt:
        "Saat membuktikan P → Q menggunakan aturan Implication Introduction (→I), langkah yang tepat adalah ...",
      options: [
        {
          id: "a",
          text: "Mengasumsikan P, menurunkan Q, lalu menutup asumsi dan menyimpulkan P → Q.",
        },
        {
          id: "b",
          text: "Mengasumsikan Q, menurunkan P, lalu menyimpulkan P → Q tanpa menutup asumsi.",
        },
        {
          id: "c",
          text: "Membuktikan P dan Q secara terpisah, lalu menggabungkannya dengan ∧I.",
        },
        {
          id: "d",
          text: "Mengasumsikan ¬P, menurunkan kontradiksi, lalu menyimpulkan P → Q dengan ¬E.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "→I bekerja dengan membuka subproof: asumsikan anteseden P, turunkan konsekuen Q, lalu tutup asumsi dan simpulkan P → Q.",
    },
    {
      number: 5,
      prompt:
        "Aturan AND Introduction (∧I) menghasilkan kesimpulan apa dari premis P dan Q?",
      code: "P\nQ",
      options: [
        {
          id: "a",
          text: "P ∨ Q, menggunakan OR Introduction (∨I).",
        },
        {
          id: "b",
          text: "P ∧ Q, menggunakan AND Introduction (∧I).",
        },
        {
          id: "c",
          text: "P → Q, menggunakan Implication Introduction (→I).",
        },
        {
          id: "d",
          text: "¬P, menggunakan Negation Introduction (¬I).",
        },
      ],
      correctOptionId: "b",
      explanation:
        "∧I menggabungkan dua proposisi yang sudah tersedia: dari P dan Q, simpulkan P ∧ Q.",
    },
    {
      number: 6,
      prompt:
        "Diketahui P ∨ Q. Dari asumsi P dapat dibuktikan R, dan dari asumsi Q juga dapat dibuktikan R. Apa yang dapat disimpulkan?",
      options: [
        {
          id: "a",
          text: "R, menggunakan OR Elimination (∨E), karena kedua kemungkinan menghasilkan R.",
        },
        {
          id: "b",
          text: "P ∧ Q, menggunakan AND Introduction (∧I), karena kedua kasus telah diperiksa.",
        },
        {
          id: "c",
          text: "¬R, menggunakan Negation Introduction (¬I), karena terdapat dua asumsi.",
        },
        {
          id: "d",
          text: "Tidak ada kesimpulan, karena setiap cabang disjungsi harus menghasilkan kesimpulan yang berbeda.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "∨E memungkinkan kesimpulan R jika R dapat diturunkan dari masing-masing kemungkinan P dan Q. Karena kedua cabang menghasilkan R, R sah disimpulkan.",
    },
    {
      number: 7,
      prompt:
        "Seorang mahasiswa menyusun pembuktian berikut. Apa evaluasi yang paling tepat?",
      code: "1. P → Q    Premise\n2. Q        Premise\n3. P        Modus Ponens",
      options: [
        {
          id: "a",
          text: "Valid, karena Modus Ponens dapat digunakan dari dua premis apa pun yang berkaitan.",
        },
        {
          id: "b",
          text: "Valid, karena Q adalah anteseden dan P adalah konsekuen pada implikasi.",
        },
        {
          id: "c",
          text: "Tidak valid; dari P → Q dan Q tidak dapat disimpulkan P. Pola ini disebut affirming the consequent.",
        },
        {
          id: "d",
          text: "Tidak valid hanya karena penulisan nomor langkahnya salah, tetapi isi pembuktiannya benar.",
        },
      ],
      correctOptionId: "c",
      explanation:
        "Modus Ponens membutuhkan P (anteseden), bukan Q (konsekuen). Dari P → Q dan Q, P tidak harus benar. Contoh counterexample: P salah, Q benar membuat implikasi tetap benar.",
    },
    {
      number: 8,
      prompt:
        "Perhatikan premis predicate logic berikut. Kesimpulan apa yang sah dan aturan apa yang digunakan?",
      code: "∀x (Student(x) → MustTakeExam(x))\nStudent(Dion)",
      options: [
        {
          id: "a",
          text: "MustTakeExam(Dion), menggunakan ∀E untuk mendapatkan Student(Dion) → MustTakeExam(Dion), lalu →E.",
        },
        {
          id: "b",
          text: "∀x MustTakeExam(x), menggunakan ∀I karena aturan berlaku untuk semua mahasiswa.",
        },
        {
          id: "c",
          text: "∃x Student(x), menggunakan ∃I karena Dion adalah seorang mahasiswa.",
        },
        {
          id: "d",
          text: "Tidak ada kesimpulan, karena Dion tidak disebutkan di dalam formula universal.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "∀E mengganti x dengan Dion sehingga diperoleh Student(Dion) → MustTakeExam(Dion). Bersama fakta Student(Dion), →E menghasilkan MustTakeExam(Dion).",
    },
  ],
  essay: {
    number: 9,
    prompt:
      "Pada studi kasus sistem peminjaman buku, aturan yang berlaku adalah (P ∧ Q) → R dan (R ∧ S) → T, dengan fakta P, Q, dan S. Susun pembuktian T langkah demi langkah, sebutkan aturan Natural Deduction yang digunakan pada setiap langkah, dan jelaskan mengapa kesimpulan tersebut sah.",
    code: "P = Pengguna terdaftar.\nQ = Pengguna tidak memiliki denda.\nR = Pengguna memenuhi syarat meminjam.\nS = Buku tersedia.\nT = Peminjaman dapat dilakukan.\n\nPremis: (P ∧ Q) → R, (R ∧ S) → T\nFakta: P, Q, S\nTujuan: T",
    referenceAnswer:
      "Pembuktian dapat disusun sebagai berikut. Langkah 1: (P ∧ Q) → R sebagai premise. Langkah 2: (R ∧ S) → T sebagai premise. Langkah 3: P sebagai fakta. Langkah 4: Q sebagai fakta. Langkah 5: S sebagai fakta. Langkah 6: dari P dan Q diperoleh P ∧ Q dengan AND Introduction (∧I). Langkah 7: dari (P ∧ Q) → R dan P ∧ Q diperoleh R dengan Implication Elimination (→E) atau Modus Ponens. Langkah 8: dari R dan S diperoleh R ∧ S dengan ∧I. Langkah 9: dari (R ∧ S) → T dan R ∧ S diperoleh T dengan →E. Kesimpulan T sah karena setiap langkah mengikuti aturan Natural Deduction dan hanya bergantung pada premis serta fakta yang diberikan, tanpa asumsi sementara yang tertinggal.",
  },
};
