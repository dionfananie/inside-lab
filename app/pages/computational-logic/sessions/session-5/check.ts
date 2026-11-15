import type { SessionKnowledgeCheck } from "../../check/types";

export const sessionFiveCheck: SessionKnowledgeCheck = {
  multipleChoice: [
    {
      number: 1,
      prompt:
        "Dalam materi sesi ini, logical consequence dituliskan sebagai KB ⊨ Q. Apa makna paling tepat dari notasi tersebut?",
      options: [
        {
          id: "a",
          text: "KB dan Q selalu bernilai salah secara bersamaan sehingga tidak ada hubungan logis di antara keduanya.",
        },
        {
          id: "b",
          text: "Jika seluruh premis yang ada di dalam KB bernilai benar, maka Q harus bernilai benar.",
        },
        {
          id: "c",
          text: "Q dapat menimpa isi KB karena keduanya ditulis dengan simbol yang sama.",
        },
        {
          id: "d",
          text: "KB hanya menyimpan aturan inferensi, sedangkan Q adalah nama program yang menjalankannya.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "KB ⊨ Q berarti Q merupakan konsekuensi logis dari KB: setiap kali seluruh premis di KB benar, Q pasti benar. Hubungan ini bersifat semantik antara premis dan kesimpulan.",
    },
    {
      number: 2,
      prompt:
        "Manakah pernyataan yang paling tepat membedakan logical consequence dengan inference rules?",
      options: [
        {
          id: "a",
          text: "Logical consequence menentukan bagaimana kesimpulan diturunkan, sedangkan inference rules menentukan apakah kesimpulan mengikuti premis.",
        },
        {
          id: "b",
          text: "Logical consequence adalah hubungan logis yang bersifat semantik antara premis dan kesimpulan, sedangkan inference rules adalah aturan formal untuk menurunkan kesimpulan yang biasanya dijelaskan secara sintaktis.",
        },
        {
          id: "c",
          text: "Logical consequence bersifat sintaktis, sedangkan inference rules bersifat semantik.",
        },
        {
          id: "d",
          text: "Logical consequence hanya berlaku pada program IF-ELSE, sedangkan inference rules hanya berlaku pada Prolog.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Logical consequence bersifat semantik karena menentukan apakah kesimpulan mengikuti premis, sedangkan inference rules menjelaskan cara menurunkannya dan umumnya bersifat sintaktis.",
    },
    {
      number: 3,
      prompt:
        "Perhatikan fakta dan aturan berikut. Kesimpulan apa yang dapat diturunkan, dan inference rule apa yang digunakan?",
      code: "Fakta: Registered(Teddy), NoFine(Teddy)\nAturan: Registered(x) AND NoFine(x) -> EligibleToBorrow(x)",
      options: [
        {
          id: "a",
          text: "EligibleToBorrow(Teddy) diturunkan dengan Modus Ponens karena seluruh kondisi aturan terpenuhi.",
        },
        {
          id: "b",
          text: "Tidak ada kesimpulan yang bisa diturunkan karena aturan tersebut membutuhkan lebih dari satu fakta.",
        },
        {
          id: "c",
          text: "NoFine(Teddy) diturunkan dengan Disjunctive Syllogism karena fakta berbentuk pilihan.",
        },
        {
          id: "d",
          text: "EligibleToBorrow(Teddy) diturunkan dengan Modus Tollens karena konsekuennya dinegasikan.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "Ketika seluruh kondisi aturan (Registered dan NoFine) terpenuhi, kesimpulan EligibleToBorrow(Teddy) diturunkan mengikuti pola Modus Ponens pada rule-based system.",
    },
    {
      number: 4,
      prompt: "Diberikan pernyataan berikut. Kesimpulan yang sah menurut Modus Tollens adalah?",
      code: "Jika server berjalan, maka endpoint dapat diakses.\nEndpoint tidak dapat diakses.",
      options: [
        {
          id: "a",
          text: "Maka endpoint dapat diakses, karena server pasti sedang berjalan.",
        },
        {
          id: "b",
          text: "Maka server berjalan, karena endpoint tidak dapat diakses.",
        },
        {
          id: "c",
          text: "Maka server tidak berjalan, karena negasi konsekuen menghasilkan negasi anteseden.",
        },
        {
          id: "d",
          text: "Maka server dan endpoint berjalan bersamaan tanpa pengecualian.",
        },
      ],
      correctOptionId: "c",
      explanation:
        "Modus Tollens berbentuk P → Q, ¬Q ∴ ¬P. Dari 'jika server berjalan maka endpoint dapat diakses' dan 'endpoint tidak dapat diakses', disimpulkan 'server tidak berjalan'.",
    },
    {
      number: 5,
      prompt:
        "Diberikan dua implikasi berikut. Kesimpulan apa yang diperoleh dengan Hypothetical Syllogism?",
      code: "Jika login, maka punya session.\nJika punya session, maka bisa akses dashboard.",
      options: [
        {
          id: "a",
          text: "Jika login, maka bisa akses dashboard, karena dua implikasi dirangkai menjadi P → R.",
        },
        {
          id: "b",
          text: "Login pasti terjadi sehingga dashboard pasti dapat diakses saat itu juga.",
        },
        {
          id: "c",
          text: "Jika bisa akses dashboard, maka pengguna pasti sedang login pada waktu yang sama.",
        },
        {
          id: "d",
          text: "Session tidak diperlukan untuk mengakses dashboard.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "Hypothetical Syllogism berbentuk P → Q, Q → R ∴ P → R, sehingga dari 'login → session' dan 'session → akses dashboard' diperoleh 'login → akses dashboard'.",
    },
    {
      number: 6,
      prompt: "Diberikan pernyataan berikut. Kesimpulan yang sah menurut Disjunctive Syllogism adalah?",
      code: "Sistem memakai PostgreSQL atau MySQL.\nSistem tidak memakai PostgreSQL.",
      options: [
        {
          id: "a",
          text: "Sistem memakai PostgreSQL, karena pilihan pertama harus selalu benar.",
        },
        {
          id: "b",
          text: "Sistem memakai MySQL, karena salah satu pilihan dieliminasi sehingga pilihan lainnya benar.",
        },
        {
          id: "c",
          text: "Sistem memakai PostgreSQL dan MySQL secara bersamaan.",
        },
        {
          id: "d",
          text: "Tidak dapat disimpulkan apa pun karena informasinya kurang lengkap.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Disjunctive Syllogism berbentuk P ∨ Q, ¬P ∴ Q. Karena PostgreSQL dieliminasi (¬P), maka pilihan yang tersisa, yaitu MySQL (Q), yang benar.",
    },
    {
      number: 7,
      prompt:
        "Dalam arsitektur rule-based expert system, apa perbedaan Knowledge Base dan Inference Engine?",
      options: [
        {
          id: "a",
          text: "Knowledge Base memproses aturan untuk menghasilkan kesimpulan, sedangkan Inference Engine menyimpan fakta dan aturan.",
        },
        {
          id: "b",
          text: "Knowledge Base menyimpan fakta dan aturan, sedangkan Inference Engine memproses keduanya untuk menghasilkan kesimpulan.",
        },
        {
          id: "c",
          text: "Knowledge Base dan Inference Engine adalah istilah berbeda untuk komponen yang sama.",
        },
        {
          id: "d",
          text: "Inference Engine menyimpan fakta secara permanen, sedangkan Knowledge Base hanya menampilkan hasil kepada pengguna.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Knowledge Base berisi fakta dan aturan, sedangkan Inference Engine menerapkan aturan pada fakta tersebut untuk menurunkan kesimpulan baru.",
    },
    {
      number: 8,
      prompt:
        "Manakah pernyataan yang paling tepat menggambarkan perbedaan forward chaining dan backward chaining?",
      options: [
        {
          id: "a",
          text: "Forward chaining berangkat dari tujuan (goal-driven), sedangkan backward chaining berangkat dari fakta (data-driven).",
        },
        {
          id: "b",
          text: "Forward chaining berangkat dari fakta (data-driven) untuk mencari kesimpulan, sedangkan backward chaining berangkat dari tujuan (goal-driven) untuk mencari bukti.",
        },
        {
          id: "c",
          text: "Keduanya berangkat dari tujuan, hanya berbeda pada bahasa pemrograman yang dipakai.",
        },
        {
          id: "d",
          text: "Forward chaining hanya digunakan pada Prolog, sedangkan backward chaining hanya pada JavaScript.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Forward chaining bersifat data-driven karena berangkat dari fakta dan berpotensi menghasilkan banyak kesimpulan, sedangkan backward chaining bersifat goal-driven karena berangkat dari tujuan dan mencari buktinya.",
    },
  ],
  essay: {
    number: 9,
    prompt:
      "Pada studi kasus kelayakan peminjaman buku, pengguna boleh meminjam bila terdaftar, tidak punya denda, dan tidak diblokir, dengan aturan (P ∧ Q ∧ R) → S. Jelaskan bagaimana sebuah inference engine sederhana menarik kesimpulan S dari fakta dan aturan tersebut, inference rule apa yang dipakai, dan apa yang terjadi bila salah satu fakta tidak diketahui.",
    code: "P = Terdaftar. Q = Tidak ada denda.\nR = Tidak diblokir. S = Boleh meminjam.\nAturan: (P ∧ Q ∧ R) → S",
    referenceAnswer:
      "Inference engine sederhana membaca fakta yang tersedia (terdaftar, tidak ada denda, dan tidak diblokir) bersama aturan (P ∧ Q ∧ R) → S. Sistem memeriksa apakah seluruh kondisi aturan terpenuhi; jika P, Q, dan R semuanya bernilai benar, maka kondisi terpenuhi dan kesimpulan S (boleh meminjam) diturunkan sebagai fakta baru menggunakan pola Modus Ponens. Proses ini dapat diulang selama masih ada aturan yang cocok, dan karena kesimpulan tidak diberikan secara eksplisit, hal ini merupakan salah satu bentuk automated reasoning. Bila salah satu fakta tidak diketahui, kondisi tidak dapat dipastikan terpenuhi sehingga S tidak dapat diturunkan dengan pasti. Perlu dicatat bahwa jika fakta yang disimpan salah, sistem dapat menghasilkan kesimpulan yang salah secara faktual meskipun proses inferensinya valid, karena inference engine hanya menerapkan aturan secara konsisten.",
  },
};
