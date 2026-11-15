import type { SessionKnowledgeCheck } from "../../check/types";

export const sessionOneCheck: SessionKnowledgeCheck = {
  multipleChoice: [
    {
      number: 1,
      prompt: "Menurut materi sesi ini, apa yang dimaksud dengan logika?",
      options: [
        {
          id: "a",
          text: "Ilmu yang mempelajari prinsip dan aturan penalaran untuk menentukan apakah suatu kesimpulan dapat ditarik secara benar dari informasi yang diberikan.",
        },
        {
          id: "b",
          text: "Cabang matematika yang hanya berfokus pada operasi bilangan dan perhitungan aritmetika semata.",
        },
        {
          id: "c",
          text: "Kumpulan fakta yang disusun berdasarkan urutan abjad agar mudah dicari oleh komputer.",
        },
        {
          id: "d",
          text: "Teknik menghafal rumus agar seseorang dapat menjawab soal tanpa perlu memahami proses penalaran.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "Logika adalah ilmu tentang prinsip dan aturan penalaran untuk menarik kesimpulan secara benar dari informasi yang tersedia, bukan sekadar aritmetika atau kumpulan fakta.",
    },
    {
      number: 2,
      prompt: "Manakah pernyataan yang tepat mengenai perbedaan logika sehari-hari dan logika formal?",
      options: [
        {
          id: "a",
          text: "Logika sehari-hari selalu tidak ambigu, sedangkan logika formal justru dirancang agar memiliki banyak makna.",
        },
        {
          id: "b",
          text: "Logika sehari-hari memakai bahasa alami yang bisa ambigu, sedangkan logika formal memakai simbol dan aturan yang dirancang agar tidak ambigu dan konsisten.",
        },
        {
          id: "c",
          text: "Logika formal tidak membutuhkan aturan evaluasi karena hanya mengandalkan interpretasi manusia.",
        },
        {
          id: "d",
          text: "Logika sehari-hari menggunakan simbol dan formula, sedangkan logika formal hanya menggunakan bahasa alami.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Logika sehari-hari menggunakan bahasa alami yang dapat ambigu dan bervariasi, sementara logika formal menggunakan simbol dan aturan formal sehingga maknanya lebih jelas dan dapat dievaluasi berdasarkan aturan.",
    },
    {
      number: 3,
      prompt:
        "Perhatikan argumen berikut. Apa yang ditunjukkan contoh ini tentang hubungan antara kebenaran penalaran dan kebenaran fakta?",
      list: ["Semua kucing dapat terbang.", "Miko adalah kucing.", "Maka, Miko dapat terbang."],
      options: [
        {
          id: "a",
          text: "Argumen tersebut tidak valid secara logika karena kesimpulannya tidak benar di dunia nyata.",
        },
        {
          id: "b",
          text: "Argumen tersebut membuktikan bahwa logika selalu menghasilkan kesimpulan yang benar secara faktual.",
        },
        {
          id: "c",
          text: "Argumen tersebut valid secara logis jika kedua premis diterima sebagai benar, tetapi premis pertamanya tidak benar dalam kenyataan, sehingga kebenaran penalaran berbeda dengan kebenaran fakta.",
        },
        {
          id: "d",
          text: "Argumen tersebut menunjukkan bahwa syntax dan semantics pada akhirnya merupakan dua hal yang sama.",
        },
      ],
      correctOptionId: "c",
      explanation:
        "Logika membantu memastikan proses penarikan kesimpulan konsisten dengan premis dan aturan, tetapi tidak selalu membuktikan kebenaran faktual. Kesimpulan bisa valid secara logis namun salah secara fakta jika premisnya salah.",
    },
    {
      number: 4,
      prompt:
        "Manakah pernyataan yang paling tepat mengenai peran logika formal dalam komputer dan Artificial Intelligence?",
      options: [
        {
          id: "a",
          text: "Logika formal memungkinkan komputer merepresentasikan informasi secara terstruktur, mengevaluasi nilai kebenarannya, dan menghasilkan kesimpulan melalui automated reasoning, seperti pada Expert System dan SAT Solver.",
        },
        {
          id: "b",
          text: "Logika formal tidak relevan bagi komputer karena komputer tidak dapat mengevaluasi simbol dan formula.",
        },
        {
          id: "c",
          text: "Semua pendekatan AI seperti Machine Learning dan LLM wajib menulis setiap aturan logika formal secara eksplisit.",
        },
        {
          id: "d",
          text: "Logika formal hanya digunakan untuk menyimpan data dalam jumlah besar tanpa pernah dipakai untuk menarik kesimpulan.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "Logika formal penting karena memungkinkan representasi terstruktur, evaluasi nilai kebenaran, dan automated reasoning. Penerapannya antara lain Expert System, SAT Solver, automated theorem proving, dan knowledge representation, meski tidak semua pendekatan AI memakai logika formal.",
    },
    {
      number: 5,
      prompt:
        "Dalam logika formal, komponen yang menentukan makna suatu formula dan bagaimana nilai kebenarannya (TRUE atau FALSE) ditentukan disebut ...",
      options: [
        {
          id: "a",
          text: "Syntax, karena komponen ini memeriksa susunan simbol agar formula yang terbentuk valid.",
        },
        {
          id: "b",
          text: "Semantics, karena komponen ini menentukan makna formula dan menetapkan apakah formula bernilai TRUE atau FALSE.",
        },
        {
          id: "c",
          text: "Inference Rules, karena komponen ini menarik kesimpulan dari premis yang tersedia.",
        },
        {
          id: "d",
          text: "Compiler, karena komponen ini menerjemahkan formula logika menjadi instruksi mesin.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Semantics menentukan makna suatu formula dan nilai kebenarannya, sedangkan syntax hanya memeriksa validitas susunan simbol dan inference rules mengatur penarikan kesimpulan.",
    },
    {
      number: 6,
      prompt: "Perhatikan susunan formula berikut. Manakah pernyataan yang tepat tentang syntax?",
      code: `P AND Q
P → Q
AND P →`,
      options: [
        {
          id: "a",
          text: "Semua formula tersebut valid secara syntax karena semuanya mengandung operator logika.",
        },
        {
          id: "b",
          text: "Hanya baris pertama dan kedua yang valid secara syntax, sedangkan 'AND P →' tidak valid karena susunan simbolnya melanggar aturan pembentukan formula.",
        },
        {
          id: "c",
          text: "Hanya 'AND P →' yang valid karena menggunakan operator logika yang lebih banyak.",
        },
        {
          id: "d",
          text: "Syntax tidak dapat menilai validitas susunan, karena validitas hanya ditentukan oleh semantics.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Syntax memeriksa bagaimana simbol disusun menjadi formula yang valid. P AND Q dan P → Q mengikuti aturan, sedangkan AND P → tidak valid karena susunan simbolnya salah.",
    },
    {
      number: 7,
      prompt: "Diberikan formula implikasi dengan interpretasi berikut. Kapan formula tersebut bernilai FALSE?",
      code: `P → Q
P = Saya makan durian.
Q = Saya mengalami sakit kepala.`,
      options: [
        {
          id: "a",
          text: "Ketika saya tidak makan durian (P = FALSE) dan saya tidak mengalami sakit kepala (Q = FALSE).",
        },
        {
          id: "b",
          text: "Ketika saya makan durian (P = TRUE) tetapi saya tidak mengalami sakit kepala (Q = FALSE).",
        },
        {
          id: "c",
          text: "Ketika saya tidak makan durian (P = FALSE) tetapi saya mengalami sakit kepala (Q = TRUE).",
        },
        {
          id: "d",
          text: "Formula bernilai FALSE setiap kali saya tidak makan durian, apa pun nilai Q.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Implikasi P → Q hanya bernilai FALSE ketika anteceden P benar tetapi konsekuen Q salah. Jika P tidak terjadi, aturannya tidak dilanggar sehingga implikasi tetap bernilai TRUE.",
    },
    {
      number: 8,
      prompt: "Perhatikan aturan inferensi berikut. Kesimpulan apa yang dapat dihasilkan dan aturan apa yang digunakan?",
      code: `Premis 1: P → Q
Premis 2: P`,
      options: [
        {
          id: "a",
          text: "Kesimpulannya P, karena premis yang lebih pendek selalu menjadi kesimpulan akhir.",
        },
        {
          id: "b",
          text: "Kesimpulannya Q, karena aturan Modus Ponens menyatakan bahwa dari P → Q dan P dapat disimpulkan Q.",
        },
        {
          id: "c",
          text: "Kesimpulannya NOT Q, karena implikasi selalu membalik nilai kebenaran konsekuennya.",
        },
        {
          id: "d",
          text: "Tidak ada kesimpulan yang dapat dihasilkan karena kedua premis dianggap tidak saling berhubungan.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Inference Rules mengatur bagaimana kesimpulan ditarik dari premis. Melalui Modus Ponens, dari premis P → Q dan P diperoleh kesimpulan Q.",
    },
  ],
  essay: {
    number: 9,
    prompt:
      "Jelaskan hubungan antara syntax, semantics, dan inference rules dalam logika formal. Gunakan contoh formula P → Q dengan interpretasi P = 'Hari ini hujan' dan Q = 'Jalanan basah' untuk menggambarkan peran masing-masing komponen secara berurutan.",
    referenceAnswer:
      "Ketiga komponen logika formal saling melengkapi dan bekerja secara berurutan. Pertama, syntax memastikan bahwa P → Q merupakan formula yang valid, yaitu bahwa simbol-simbolnya disusun sesuai aturan pembentukan formula. Kedua, semantics menentukan makna formula tersebut dan nilai kebenarannya; dengan interpretasi P = 'Hari ini hujan' dan Q = 'Jalanan basah', formula P → Q bermakna 'Jika hari ini hujan, maka jalanan basah', dan berdasarkan tabel kebenaran implikasi, formula hanya bernilai FALSE ketika P benar tetapi Q salah. Ketiga, inference rules mengatur bagaimana kesimpulan dihasilkan dari premis; sebagai contoh, dengan Modus Ponens dari premis P → Q dan P dapat disimpulkan Q, sehingga jika hari ini benar hujan maka dapat disimpulkan jalanan basah. Dengan demikian, komputer membutuhkan representasi yang benar secara struktur (syntax), interpretasi yang jelas (semantics), dan aturan penalaran (inference rules) untuk menghasilkan kesimpulan yang konsisten dan dapat diperiksa.",
  },
};
