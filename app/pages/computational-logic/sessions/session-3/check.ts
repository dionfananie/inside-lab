import type { SessionKnowledgeCheck } from "../../check/types";

export const sessionThreeCheck: SessionKnowledgeCheck = {
  multipleChoice: [
    {
      number: 1,
      prompt:
        "Apa pengertian Truth Table dan mengapa ia penting dalam logika formal?",
      options: [
        {
          id: "a",
          text: "Sebuah tabel yang hanya menampilkan hasil akhir sebuah formula tanpa memperhatikan nilai kebenaran tiap proposisi.",
        },
        {
          id: "b",
          text: "Metode untuk menunjukkan seluruh kemungkinan kombinasi nilai kebenaran proposisi beserta hasil evaluasi formula secara terstruktur.",
        },
        {
          id: "c",
          text: "Cara singkat untuk membuktikan bahwa semua formula logika selalu bernilai TRUE tanpa perlu memeriksa tiap baris.",
        },
        {
          id: "d",
          text: "Teknik mengganti operator logika dengan operator aritmetika agar formula lebih mudah dihitung secara numerik.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Truth table menampilkan seluruh kombinasi nilai kebenaran proposisi dan hasil evaluasi formula, sehingga setiap kemungkinan diperiksa secara terstruktur tanpa menebak.",
    },
    {
      number: 2,
      prompt:
        "Jika terdapat lima proposisi atomik yang berbeda, berapa jumlah kombinasi nilai kebenaran yang harus diperiksa dalam Truth Table?",
      options: [
        {
          id: "a",
          text: "10 kombinasi, karena setiap proposisi menambah tepat dua baris baru pada tabel.",
        },
        {
          id: "b",
          text: "25 kombinasi, karena jumlah proposisi dikalikan dengan lima pada setiap perhitungan.",
        },
        {
          id: "c",
          text: "32 kombinasi, karena 2⁵ = 32 dengan setiap proposisi bernilai TRUE atau FALSE.",
        },
        {
          id: "d",
          text: "5 kombinasi, karena setiap proposisi cukup diwakili oleh satu baris saja di dalam tabel.",
        },
      ],
      correctOptionId: "c",
      explanation:
        "Jumlah kombinasi mengikuti rumus 2ⁿ. Untuk lima proposisi, 2⁵ = 32 kombinasi nilai kebenaran.",
    },
    {
      number: 3,
      prompt: "Pada kondisi seperti apa sebuah implikasi P → Q bernilai FALSE?",
      options: [
        {
          id: "a",
          text: "Ketika P dan Q memiliki nilai kebenaran yang berbeda antara satu dengan yang lain.",
        },
        {
          id: "b",
          text: "Ketika P bernilai FALSE dan Q bernilai TRUE sehingga implikasi menjadi salah.",
        },
        {
          id: "c",
          text: "Ketika P bernilai TRUE dan Q bernilai FALSE, sedangkan kondisi lainnya bernilai TRUE.",
        },
        {
          id: "d",
          text: "Ketika kedua proposisi P dan Q sama-sama bernilai FALSE pada saat yang bersamaan.",
        },
      ],
      correctOptionId: "c",
      explanation:
        "Implikasi P → Q hanya bernilai FALSE ketika anteseden P TRUE dan konsekuen Q FALSE; semua kondisi lain bernilai TRUE.",
    },
    {
      number: 4,
      prompt:
        "Diberikan P = TRUE, Q = TRUE, dan R = FALSE. Berapakah nilai dari formula (P ∧ Q) → R?",
      code: "(P ∧ Q) → R\nP = TRUE, Q = TRUE, R = FALSE",
      options: [
        {
          id: "a",
          text: "TRUE, karena implikasi selalu bernilai TRUE ketika R bernilai FALSE dalam formula apa pun.",
        },
        {
          id: "b",
          text: "FALSE, karena P ∧ Q bernilai TRUE lalu TRUE → FALSE menghasilkan nilai FALSE.",
        },
        {
          id: "c",
          text: "TRUE, karena hasil di dalam tanda kurung selalu diabaikan pada evaluasi implikasi.",
        },
        {
          id: "d",
          text: "FALSE, karena P ∧ Q sudah bernilai FALSE sejak bagian dalam kurung dievaluasi.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Bagian dalam kurung P ∧ Q = TRUE, kemudian TRUE → FALSE hanya terjadi pada baris ini sehingga hasilnya FALSE.",
    },
    {
      number: 5,
      prompt:
        "Dengan mengikuti operator precedence pada sesi ini, bagaimana formula P ∨ Q ∧ R seharusnya diinterpretasikan?",
      options: [
        {
          id: "a",
          text: "Sebagai (P ∨ Q) ∧ R karena operator selalu dibaca berurutan dari kiri ke kanan.",
        },
        {
          id: "b",
          text: "Sebagai P ∨ (Q ∧ R) karena Conjunction ∧ memiliki prioritas lebih tinggi daripada Disjunction ∨.",
        },
        {
          id: "c",
          text: "Sebagai P ∧ (Q ∨ R) karena operator ∧ selalu dipindahkan ke depan terlebih dahulu.",
        },
        {
          id: "d",
          text: "Formula tersebut tidak dapat diinterpretasikan karena tidak memakai tanda kurung sama sekali.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Dalam operator precedence, ∧ (prioritas 2) dievaluasi sebelum ∨ (prioritas 3), sehingga P ∨ Q ∧ R dibaca sebagai P ∨ (Q ∧ R).",
    },
    {
      number: 6,
      prompt:
        "Manakah pernyataan yang benar mengenai Well-Formed Formula (WFF) dan formula P ∧?",
      code: "P ∧",
      options: [
        {
          id: "a",
          text: "P ∧ adalah WFF karena AND merupakan operator logika yang valid untuk digunakan.",
        },
        {
          id: "b",
          text: "P ∧ bukan WFF karena operator AND membutuhkan dua operand, sedangkan (P ∧ Q) adalah contoh WFF.",
        },
        {
          id: "c",
          text: "P ∧ adalah WFF tetapi selalu bernilai TRUE karena hanya memuat satu proposisi tunggal.",
        },
        {
          id: "d",
          text: "Semua formula yang memuat simbol ∧ secara otomatis bukan merupakan WFF yang valid.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "WFF adalah formula dengan struktur sintaksis valid. P ∧ tidak valid karena ∧ membutuhkan dua operand, sedangkan (P ∧ Q) valid secara sintaksis.",
    },
    {
      number: 7,
      prompt:
        "Perhatikan daftar formula berikut. Manakah pasangan klasifikasi Tautology, Contradiction, dan Contingency yang benar?",
      list: ["P ∨ ¬P", "P ∧ ¬P", "P → Q"],
      options: [
        {
          id: "a",
          text: "P ∨ ¬P adalah Contradiction, P ∧ ¬P adalah Tautology, dan P → Q adalah Contingency.",
        },
        {
          id: "b",
          text: "P ∨ ¬P adalah Tautology, P ∧ ¬P adalah Contradiction, dan P → Q adalah Contingency.",
        },
        {
          id: "c",
          text: "Ketiganya termasuk Contingency karena semuanya dapat bernilai TRUE dan FALSE secara bergantian.",
        },
        {
          id: "d",
          text: "P ∨ ¬P dan P ∧ ¬P keduanya Tautology, sedangkan P → Q merupakan Contradiction.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "P ∨ ¬P selalu TRUE (tautology), P ∧ ¬P selalu FALSE (contradiction), dan P → Q kadang TRUE kadang FALSE sehingga tergolong contingency.",
    },
    {
      number: 8,
      prompt:
        "Apa perbedaan antara formula yang satisfiable dan formula yang merupakan tautology?",
      options: [
        {
          id: "a",
          text: "Satisfiable dan tautology sebenarnya sama saja karena keduanya pasti selalu bernilai TRUE.",
        },
        {
          id: "b",
          text: "Formula satisfiable hanya perlu memiliki minimal satu interpretasi yang membuatnya TRUE, sedangkan tautology harus selalu TRUE pada semua interpretasi.",
        },
        {
          id: "c",
          text: "Formula satisfiable selalu bernilai FALSE, sedangkan formula tautology selalu bernilai TRUE pada setiap baris.",
        },
        {
          id: "d",
          text: "Tautology merupakan bagian dari contradiction, sedangkan formula satisfiable tidak dapat diklasifikasikan sama sekali.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Satisfiable berarti ada minimal satu assignment yang membuat formula TRUE; tautology harus selalu TRUE. Contohnya P ∧ Q satisfiable tetapi bukan tautology.",
    },
  ],
  essay: {
    number: 9,
    prompt:
      "Jelaskan secara runtut bagaimana sebuah program komputer dapat membangun dan menggunakan Truth Table untuk mengevaluasi formula (P ∧ Q) → R, mulai dari menghasilkan seluruh kombinasi nilai kebenaran, mengevaluasi formula pada tiap baris, hingga mengklasifikasikan hasilnya sebagai tautology, contradiction, atau contingency.",
    code: "(P ∧ Q) → R",
    referenceAnswer:
      "Karena terdapat tiga proposisi (P, Q, dan R), jumlah kombinasi nilai kebenaran adalah 2³ = 8 baris. Komputer menghasilkan seluruh kombinasi dengan mengiterasi angka 0 sampai 7, lalu mengubah setiap angka menjadi deretan bit (0 berarti FALSE dan 1 berarti TRUE) dan memetakan setiap bit ke proposisi P, Q, dan R. Pada setiap baris, formula dievaluasi mengikuti urutan operasi: hitung terlebih dahulu bagian di dalam tanda kurung, yaitu P ∧ Q yang bernilai TRUE hanya jika P dan Q sama-sama TRUE, kemudian evaluasi implikasi (P ∧ Q) → R yang bernilai FALSE hanya ketika (P ∧ Q) TRUE dan R FALSE, sedangkan kondisi lainnya bernilai TRUE. Setelah semua baris selesai dievaluasi, hasilnya diklasifikasikan: jika semua hasil TRUE maka formula adalah tautology, jika semua hasil FALSE maka contradiction, dan jika hasilnya bercampur antara TRUE dan FALSE maka tergolong contingency. Untuk formula (P ∧ Q) → R, hasilnya bercampur karena hanya bernilai FALSE pada baris P=TRUE, Q=TRUE, dan R=FALSE, sehingga formula ini merupakan contingency, bukan tautology. Karena formula ini hanya efisien untuk proposisi dalam jumlah kecil, formula berukuran besar umumnya dievaluasi dengan bantuan SAT Solver.",
  },
};
