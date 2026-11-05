export const sessionOneObjectives = [
  "Menjelaskan pengertian logika.",
  "Menjelaskan pengertian logika formal.",
  "Membedakan logika sehari-hari dengan logika formal.",
  "Menjelaskan mengapa logika formal dibutuhkan dalam komputer dan Artificial Intelligence.",
  "Mengidentifikasi tiga komponen utama logika formal: Syntax, Semantics, dan Inference Rules.",
  "Menganalisis contoh sederhana penggunaan logika formal dalam kehidupan sehari-hari dan sistem komputer.",
];

export const everydayVsFormal = [
  ["Representasi", "Bahasa alami", "Simbol dan formula"],
  ["Struktur", "Dapat bervariasi", "Mengikuti aturan formal"],
  ["Ambiguitas", "Bisa ambigu", "Dirancang agar tidak ambigu"],
  ["Evaluasi", "Sering membutuhkan interpretasi manusia", "Dapat dievaluasi berdasarkan aturan"],
  ["Contoh", "Jika hujan, jalan basah", "P → Q"],
];

export const aiApproaches = [
  ["Rule-Based AI", "Menggunakan aturan dan fakta"],
  ["Symbolic AI", "Menggunakan representasi simbol dan reasoning"],
  ["Machine Learning", "Mempelajari pola dari data"],
  ["Deep Learning", "Menggunakan neural network untuk mempelajari representasi kompleks"],
  ["LLM", "Menghasilkan respons berdasarkan pola yang dipelajari dari data dan konteks"],
];

export const implicationTruthTable = [
  ["TRUE", "TRUE", "TRUE"],
  ["TRUE", "FALSE", "FALSE"],
  ["FALSE", "TRUE", "TRUE"],
  ["FALSE", "FALSE", "TRUE"],
];

export const componentSummary = [
  ["Syntax", "Memastikan struktur formula valid", "Grammar bahasa pemrograman"],
  ["Semantics", "Menentukan makna dan nilai kebenaran", "Evaluasi ekspresi"],
  ["Inference Rules", "Menghasilkan kesimpulan", "Proses reasoning"],
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
          "Menurut pemahaman Anda, apa yang dimaksud dengan logika? Jelaskan menggunakan bahasa Anda sendiri dan berikan satu contoh penerapannya dalam kehidupan sehari-hari.",
        answer:
          "Logika adalah ilmu tentang prinsip penalaran untuk menarik kesimpulan secara benar dari informasi yang tersedia. Contohnya, jika hujan maka jalanan basah, dan hari ini hujan, maka dapat disimpulkan jalanan basah.",
      },
      {
        number: 2,
        prompt:
          "Apa perbedaan antara logika sehari-hari dan logika formal? Mengapa logika formal menggunakan simbol untuk merepresentasikan pernyataan?",
        answer:
          "Logika sehari-hari memakai bahasa alami yang bisa ambigu dan bervariasi. Logika formal memakai simbol, grammar, dan aturan evaluasi yang konsisten. Simbol membuat struktur pernyataan eksplisit sehingga dapat diperiksa oleh manusia maupun komputer.",
      },
      {
        number: 3,
        prompt:
          "Apakah suatu kesimpulan yang dihasilkan melalui proses logika pasti benar secara faktual? Jelaskan menggunakan contoh.",
        answer:
          "Tidak. Kesimpulan bisa valid secara logika tetapi salah secara faktual jika premisnya salah. Contoh: semua kucing dapat terbang, Miko adalah kucing, maka Miko dapat terbang. Penalaran valid, tetapi premis pertama tidak benar di dunia nyata.",
      },
    ],
  },
  {
    id: "penerapan-logika-formal",
    title: "Bagian B — Penerapan Logika Formal",
    questions: [
      {
        number: 4,
        prompt:
          "Perhatikan pernyataan berikut: “Jika seseorang belajar dengan rajin, maka dia memahami materi.” Tentukan proposisi P, proposisi Q, dan representasi formalnya.",
        answer:
          "P = seseorang belajar dengan rajin; Q = seseorang memahami materi; representasi formalnya P → Q.",
      },
      {
        number: 5,
        prompt:
          "Mengapa komputer tidak cukup hanya diberikan kalimat bahasa sehari-hari untuk melakukan reasoning secara konsisten? Jelaskan hubungan antara simbol, aturan, dan proses evaluasi.",
        answer:
          "Bahasa sehari-hari dapat ambigu dan strukturnya tidak selalu eksplisit. Komputer membutuhkan simbol yang jelas, aturan pembentukan formula, dan aturan evaluasi agar proses reasoning dapat dijalankan secara konsisten dan dapat diperiksa.",
      },
      {
        number: 6,
        prompt:
          "Sebuah sistem memiliki aturan berikut. Diketahui suhu = 39 dan batuk = TRUE. Apa kesimpulan sistem, dan bagaimana sistem mendapatkannya?",
        code: "IF suhu > 38 AND batuk = TRUE\nTHEN possible_fever = TRUE",
        answer:
          "Kesimpulannya possible_fever = TRUE. Sistem mengevaluasi suhu > 38 sebagai TRUE, batuk = TRUE sebagai TRUE, lalu TRUE AND TRUE menghasilkan TRUE sehingga instruksi THEN dijalankan.",
      },
    ],
  },
  {
    id: "tiga-komponen",
    title: "Bagian C — Memahami Tiga Komponen Logika Formal",
    questions: [
      {
        number: 7,
        prompt:
          "Jelaskan perbedaan Syntax dan Semantics menggunakan contoh formula P AND Q. Apakah formula tersebut selalu bernilai TRUE? Mengapa?",
        answer:
          "Syntax memeriksa apakah P AND Q disusun sesuai aturan; semantics menentukan nilainya berdasarkan interpretasi P dan Q. Formula tidak selalu TRUE. Jika P = TRUE dan Q = FALSE, maka P AND Q = FALSE.",
      },
      {
        number: 8,
        prompt:
          "Diberikan formula P → Q dengan P = TRUE dan Q = FALSE. Tentukan nilai formula tersebut dan jelaskan alasannya.",
        answer:
          "P → Q bernilai FALSE. Implikasi hanya bernilai FALSE ketika anteceden P benar tetapi konsekuen Q salah.",
      },
    ],
  },
];
