import type { SessionKnowledgeCheck } from "../../check/types";

export const sessionTwoCheck: SessionKnowledgeCheck = {
  multipleChoice: [
    {
      number: 1,
      prompt:
        "Manakah pernyataan berikut yang paling tepat menjelaskan pengertian proposisi dalam logika proposisional?",
      options: [
        {
          id: "a",
          text: "Pernyataan berupa pertanyaan yang baru dapat dinilai benar atau salah setelah lawan bicara memberikan jawabannya.",
        },
        {
          id: "b",
          text: "Pernyataan deklaratif yang memiliki tepat satu nilai kebenaran, yaitu TRUE atau FALSE, dan diwakili dengan simbol seperti P, Q, atau R.",
        },
        {
          id: "c",
          text: "Kumpulan beberapa kalimat yang digabungkan dengan tanda baca panjang tanpa memperhatikan nilai kebenarannya sama sekali.",
        },
        {
          id: "d",
          text: "Pernyataan yang selalu bernilai TRUE dan tidak pernah bisa bernilai FALSE dalam kondisi apa pun.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Proposisi adalah pernyataan deklaratif dengan tepat satu nilai kebenaran (TRUE atau FALSE), sehingga dapat direpresentasikan dengan simbol seperti P, Q, dan R.",
    },
    {
      number: 2,
      prompt:
        "Perhatikan kalimat \u201cTolong tutup pintu!\u201d. Mengapa kalimat tersebut bukan termasuk proposisi?",
      options: [
        {
          id: "a",
          text: "Karena kalimat tersebut terlalu pendek sehingga belum mampu memuat nilai kebenaran yang utuh.",
        },
        {
          id: "b",
          text: "Karena kalimat tersebut mengandung tanda seru yang selalu menandakan emosi penulis, bukan nilai benar atau salah.",
        },
        {
          id: "c",
          text: "Karena kalimat tersebut merupakan perintah, sehingga tidak dapat dinilai benar atau salah sebagai sebuah pernyataan.",
        },
        {
          id: "d",
          text: "Karena kalimat tersebut tidak memuat operator logika seperti AND, OR, atau NOT di dalamnya.",
        },
      ],
      correctOptionId: "c",
      explanation:
        "Kalimat perintah seperti \u201cTolong tutup pintu!\u201d bukan proposisi karena bukan pernyataan deklaratif, sehingga tidak memiliki nilai kebenaran.",
    },
    {
      number: 3,
      prompt:
        "Proposisi dibedakan menjadi atomic proposition dan compound proposition. Manakah pilihan berikut yang merupakan contoh compound proposition?",
      options: [
        {
          id: "a",
          text: "P, yaitu satu proposisi sederhana yang berdiri sendiri tanpa dibangun dari proposisi lain menggunakan operator logika.",
        },
        {
          id: "b",
          text: "Q, yaitu simbol tunggal yang mewakili satu pernyataan deklaratif sederhana tanpa connective.",
        },
        {
          id: "c",
          text: "R, yaitu proposisi atomik yang menjadi blok dasar dan tidak dibangun dari proposisi lain.",
        },
        {
          id: "d",
          text: "P \u2227 Q, yaitu proposisi yang dibentuk dengan menggabungkan dua proposisi memakai logical connective.",
        },
      ],
      correctOptionId: "d",
      explanation:
        "Compound proposition dibentuk dengan menggabungkan proposisi memakai logical connectives, misalnya P \u2227 Q, P \u2228 Q, \u00acP, atau (P \u2227 Q) \u2192 R. Sedangkan P, Q, dan R adalah atomic proposition.",
    },
    {
      number: 4,
      prompt:
        "Diketahui P = \u201cSaya belajar\u201d dan Q = \u201cSaya mengerjakan tugas\u201d. Manakah pasangan representasi simbolik yang benar untuk keempat pernyataan berikut ini?",
      list: [
        "Pernyataan 1: Saya belajar dan mengerjakan tugas.",
        "Pernyataan 2: Saya belajar atau mengerjakan tugas.",
        "Pernyataan 3: Saya tidak belajar.",
        "Pernyataan 4: Jika saya belajar, maka saya mengerjakan tugas.",
      ],
      options: [
        {
          id: "a",
          text: "Pernyataan 1 = P \u2228 Q, Pernyataan 2 = P \u2227 Q, Pernyataan 3 = \u00acP, dan Pernyataan 4 = Q \u2192 P.",
        },
        {
          id: "b",
          text: "Pernyataan 1 = P \u2227 Q, Pernyataan 2 = P \u2228 Q, Pernyataan 3 = \u00acP, dan Pernyataan 4 = P \u2192 Q.",
        },
        {
          id: "c",
          text: "Pernyataan 1 = P \u2227 Q, Pernyataan 2 = P \u2228 Q, Pernyataan 3 = \u00acQ, dan Pernyataan 4 = P \u2194 Q.",
        },
        {
          id: "d",
          text: "Pernyataan 1 = \u00acP, Pernyataan 2 = \u00acQ, Pernyataan 3 = P \u2227 Q, dan Pernyataan 4 = P \u2192 Q.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Kata \u201cdan\u201d menjadi \u2227, \u201catau\u201d menjadi \u2228, \u201ctidak\u201d menjadi \u00ac (negasi dari P), dan \u201cjika ... maka ...\u201d menjadi implikasi P \u2192 Q.",
    },
    {
      number: 5,
      prompt:
        "Berdasarkan tabel kebenarannya, apa perbedaan utama antara OR (disjunction) dan XOR (exclusive OR)?",
      options: [
        {
          id: "a",
          text: "OR bernilai TRUE hanya ketika tepat satu proposisi bernilai TRUE, sedangkan XOR bernilai TRUE ketika minimal satu proposisi bernilai TRUE.",
        },
        {
          id: "b",
          text: "OR selalu bernilai TRUE untuk semua kombinasi nilai, sedangkan XOR selalu bernilai FALSE untuk semua kombinasi nilai.",
        },
        {
          id: "c",
          text: "OR bernilai TRUE ketika minimal satu proposisi bernilai TRUE, sedangkan XOR bernilai TRUE hanya ketika tepat satu proposisi bernilai TRUE.",
        },
        {
          id: "d",
          text: "OR dan XOR selalu menghasilkan nilai yang sama untuk setiap kombinasi, sehingga keduanya dapat saling menggantikan.",
        },
      ],
      correctOptionId: "c",
      explanation:
        "OR (inclusive) bernilai TRUE jika minimal satu proposisi TRUE, termasuk saat keduanya TRUE. XOR bernilai TRUE hanya jika tepat satu proposisi TRUE, sehingga TRUE \u2295 TRUE bernilai FALSE.",
    },
    {
      number: 6,
      prompt:
        "Simbol P \u2194 Q (biconditional atau IFF) dalam logika proposisional bernilai TRUE pada kondisi apa?",
      options: [
        {
          id: "a",
          text: "Ketika nilai kebenaran P dan Q sama, yaitu ketika keduanya TRUE atau ketika keduanya FALSE.",
        },
        {
          id: "b",
          text: "Ketika P bernilai TRUE dan Q bernilai FALSE, karena kedua nilai selalu harus berlawanan.",
        },
        {
          id: "c",
          text: "Ketika P bernilai TRUE tanpa perlu memperhatikan nilai kebenaran dari Q sama sekali.",
        },
        {
          id: "d",
          text: "Ketika hanya tepat satu di antara P atau Q yang bernilai TRUE, dan tidak pernah keduanya sekaligus.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "Biconditional P \u2194 Q bernilai TRUE ketika nilai P dan Q sama, dan ekuivalen dengan (P \u2192 Q) \u2227 (Q \u2192 P).",
    },
    {
      number: 7,
      prompt:
        "Perhatikan potongan kode berikut. Ekspresi !isLoggedIn || hasPermission merupakan implementasi dari material implication P \u2192 Q. Jika isLoggedIn bernilai true dan hasPermission bernilai false, apa nilai rule dan mengapa demikian?",
      code: `const isLoggedIn = true;
const hasPermission = false;
const rule = !isLoggedIn || hasPermission;
console.log(rule);`,
      options: [
        {
          id: "a",
          text: "rule bernilai false, karena P (isLoggedIn) bernilai TRUE dan Q (hasPermission) bernilai FALSE, sehingga implikasi P \u2192 Q bernilai FALSE.",
        },
        {
          id: "b",
          text: "rule bernilai true, karena operator || selalu menghasilkan true selama salah satu operannya berupa variabel apa pun.",
        },
        {
          id: "c",
          text: "rule bernilai true, karena operator NOT (!) membalik seluruh hasil ekspresi menjadi kebalikannya.",
        },
        {
          id: "d",
          text: "rule bernilai false, karena kedua proposisi harus bernilai FALSE agar implikasi P \u2192 Q dapat bernilai TRUE.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "Dengan P = TRUE dan Q = FALSE, !isLoggedIn = false dan hasPermission = false, sehingga rule = false. Ini sejalan dengan implikasi P \u2192 Q yang hanya bernilai FALSE ketika P TRUE dan Q FALSE.",
    },
    {
      number: 8,
      prompt:
        "Berapa nilai akhir dari formula (P \u2228 Q) \u2227 \u00acR jika diketahui P = FALSE, Q = TRUE, dan R = TRUE?",
      code: `P = FALSE, Q = TRUE, R = TRUE
(P \u2228 Q) \u2227 \u00acR = ?`,
      options: [
        {
          id: "a",
          text: "TRUE, karena P \u2228 Q bernilai TRUE dan \u00acR juga bernilai TRUE sehingga keduanya digabung menghasilkan TRUE.",
        },
        {
          id: "b",
          text: "FALSE, karena P \u2228 Q bernilai TRUE sedangkan \u00acR bernilai FALSE, dan TRUE \u2227 FALSE menghasilkan FALSE.",
        },
        {
          id: "c",
          text: "TRUE, karena hasil akhir formula selalu mengikuti nilai dari Q yang bernilai TRUE.",
        },
        {
          id: "d",
          text: "FALSE, karena seluruh proposisi di dalam formula dianggap bernilai TRUE agar formula bernilai TRUE.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "P \u2228 Q = FALSE \u2228 TRUE = TRUE, lalu \u00acR = FALSE. Karena TRUE \u2227 FALSE = FALSE, maka nilai akhir formula adalah FALSE.",
    },
  ],
  essay: {
    number: 9,
    prompt:
      "Jelaskan perbedaan antara proposisi dan bukan proposisi, serta perbedaan antara atomic proposition dan compound proposition. Setelah itu, perhatikan pernyataan berikut: \u201cPengguna dapat mengakses dashboard jika sudah login, memiliki permission, dan tidak diblokir.\u201d Definisikan proposisi P, Q, R, dan S, ubah pernyataan tersebut menjadi representasi simbolik, lalu jelaskan bagaimana formula itu diterapkan memakai operator logika dalam sebuah program.",
    referenceAnswer:
      "Proposisi adalah pernyataan deklaratif yang memiliki tepat satu nilai kebenaran, yaitu TRUE atau FALSE, misalnya \u201cJakarta adalah ibu kota Indonesia\u201d atau \u201c2 + 3 = 5\u201d. Sebaliknya, bukan proposisi adalah kalimat yang tidak dapat dinilai benar atau salah, seperti perintah (\u201cTolong tutup pintu!\u201d), pertanyaan (\u201cApakah hari ini hujan?\u201d), harapan (\u201cSemoga saya lulus\u201d), ekspresi penilaian, atau pernyataan dengan variabel bebas seperti x + 2 = 5 yang nilai kebenarannya belum dapat ditentukan. Atomic proposition adalah proposisi sederhana yang tidak dibangun dari proposisi lain memakai operator logika, contohnya P, Q, dan R. Compound proposition adalah proposisi yang dibentuk dengan menggabungkan beberapa proposisi memakai logical connectives, contohnya P \u2227 Q, P \u2228 Q, \u00acP, dan (P \u2227 Q) \u2192 R. Untuk pernyataan \u201cPengguna dapat mengakses dashboard jika sudah login, memiliki permission, dan tidak diblokir\u201d, kita definisikan P = Pengguna sudah login, Q = Pengguna memiliki permission, R = Pengguna diblokir, dan S = Pengguna dapat mengakses dashboard. Kalimat tersebut berarti akses diberikan ketika login, permission terpenuhi, dan pengguna tidak diblokir, sehingga formula logikanya adalah (P \u2227 Q \u2227 \u00acR) \u2192 S. Operator \u00acR menunjukkan negasi karena \u201ctidak diblokir\u201d berarti proposisi R harus FALSE. Dalam program, formula ini dapat diterapkan sebagai kondisi boolean, misalnya const canAccess = isLoggedIn && hasPermission && !isBlocked; yang setara dengan P \u2227 Q \u2227 \u00acR, lalu digunakan sebagai syarat implikasi untuk menentukan nilai S. Perlu dipahami bahwa formula implikasi hanya bernilai FALSE ketika antecedent (P \u2227 Q \u2227 \u00acR) TRUE namun consequent S FALSE, sehingga sistem nyata biasanya menambahkan kebijakan seperti default deny.",
  },
};
