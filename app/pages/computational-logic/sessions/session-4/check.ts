import type { SessionKnowledgeCheck } from "../../check/types";

export const sessionFourCheck: SessionKnowledgeCheck = {
  multipleChoice: [
    {
      number: 1,
      prompt: "Dalam logika, apa yang dimaksud dengan logical equivalence antara dua formula?",
      options: [
        {
          id: "a",
          text: "Dua formula yang selalu ditulis dengan simbol dan urutan operator yang persis sama.",
        },
        {
          id: "b",
          text: "Dua formula yang selalu menghasilkan nilai kebenaran yang sama untuk seluruh interpretasi atau seluruh kombinasi nilai variabelnya.",
        },
        {
          id: "c",
          text: "Dua formula yang hanya menghasilkan nilai kebenaran sama ketika seluruh variabelnya bernilai TRUE.",
        },
        {
          id: "d",
          text: "Dua formula yang memiliki jumlah operator logika dan jumlah variabel yang sama.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Logical equivalence (simbol ≡) berarti kedua formula memiliki nilai kebenaran yang identik pada seluruh baris truth table, bukan sekadar bentuk atau panjang penulisannya.",
    },
    {
      number: 2,
      prompt:
        "Bagaimana cara yang tepat untuk membuktikan bahwa dua formula bersifat logically equivalent menggunakan truth table?",
      code: "P → Q   dan   ¬P ∨ Q",
      options: [
        {
          id: "a",
          text: "Cukup memeriksa satu baris truth table yang membuat kedua formula bernilai TRUE.",
        },
        {
          id: "b",
          text: "Membandingkan kolom hasil kedua formula; ekuivalen jika seluruh baris pada kedua kolom bernilai sama.",
        },
        {
          id: "c",
          text: "Menghitung jumlah operator pada masing-masing formula, lalu memastikan jumlahnya identik.",
        },
        {
          id: "d",
          text: "Membandingkan baris pertama saja, karena baris pertama selalu menentukan hasil akhir.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Pembuktian equivalence dilakukan dengan membandingkan kolom hasil kedua formula pada seluruh baris; jika semuanya sama, kedua formula terbukti ekuivalen.",
    },
    {
      number: 3,
      prompt:
        "Gunakan De Morgan's Law untuk menyederhanakan formula berikut tanpa mengubah nilai kebenarannya.",
      code: "¬(P ∨ Q)",
      options: [
        { id: "a", text: "¬P ∨ ¬Q" },
        { id: "b", text: "¬P ∧ ¬Q" },
        { id: "c", text: "P ∧ Q" },
        { id: "d", text: "¬P → Q" },
      ],
      correctOptionId: "b",
      explanation:
        "De Morgan 2 menyatakan ¬(P ∨ Q) ≡ ¬P ∧ ¬Q, sehingga negasi dari disjungsi berubah menjadi konjungsi dari masing-masing negasi.",
    },
    {
      number: 4,
      prompt: "Menurut hukum Implication (implication law), formula P → Q ekuivalen dengan formula manakah?",
      options: [
        { id: "a", text: "P → Q ≡ P ∨ ¬Q" },
        { id: "b", text: "P → Q ≡ ¬P ∧ Q" },
        { id: "c", text: "P → Q ≡ ¬P ∨ Q" },
        { id: "d", text: "P → Q ≡ P ∧ Q" },
      ],
      correctOptionId: "c",
      explanation:
        "Hukum Implication menyatakan P → Q ≡ ¬P ∨ Q. Ekuivalensi ini terbukti karena kolom truth table keduanya selalu sama (T, F, T, T).",
    },
    {
      number: 5,
      prompt:
        "Diberikan premis P → Q dan P, dengan kesimpulan Q. Pernyataan manakah yang benar mengenai hubungan ini?",
      options: [
        {
          id: "a",
          text: "Q bukan logical consequence, karena ada satu baris yang membuat Q bernilai FALSE.",
        },
        {
          id: "b",
          text: "Ini bukan logical consequence sebab ekuivalen dengan affirming the consequent.",
        },
        {
          id: "c",
          text: "Ini adalah logical consequence ({P → Q, P} ⊨ Q) karena tidak ada baris yang membuat kedua premis TRUE namun Q bernilai FALSE.",
        },
        {
          id: "d",
          text: "Q ekuivalen dengan premis P → Q, sehingga keduanya selalu bernilai sama.",
        },
      ],
      correctOptionId: "c",
      explanation:
        "Ini adalah pola Modus Ponens. Satu-satunya baris dengan seluruh premis TRUE juga membuat Q TRUE, sehingga tidak ada counterexample dan Q merupakan logical consequence.",
    },
    {
      number: 6,
      prompt: "Perhatikan argumen berikut. Apakah argumen ini valid, dan mengapa?",
      code: "P → Q\nQ\n∴ P",
      options: [
        {
          id: "a",
          text: "Valid, karena kedua premis dan kesimpulannya selalu konsisten satu sama lain.",
        },
        {
          id: "b",
          text: "Valid, karena berbentuk Modus Ponens sehingga kesimpulan pasti mengikuti premis.",
        },
        {
          id: "c",
          text: "Tidak valid, karena ini affirming the consequent; counterexample-nya P = FALSE dan Q = TRUE membuat kedua premis TRUE tetapi kesimpulan FALSE.",
        },
        {
          id: "d",
          text: "Tidak valid, karena premisnya saling bertentangan sehingga tidak dapat dievaluasi.",
        },
      ],
      correctOptionId: "c",
      explanation:
        "Pola P → Q, Q ∴ P adalah affirming the consequent. Ketika P FALSE dan Q TRUE, kedua premis TRUE tetapi kesimpulan FALSE, sehingga argumen tidak valid.",
    },
    {
      number: 7,
      prompt: "Manakah pernyataan yang paling tepat mengenai perbedaan validity dan soundness pada suatu argumen?",
      options: [
        {
          id: "a",
          text: "Validity menuntut premis benar secara faktual, sedangkan soundness hanya memeriksa struktur logisnya.",
        },
        {
          id: "b",
          text: "Validity hanya membahas hubungan logis antara premis dan kesimpulan, sedangkan soundness berarti argumen valid sekaligus seluruh premisnya benar secara faktual.",
        },
        {
          id: "c",
          text: "Setiap argumen yang valid pasti selalu sound, karena struktur yang benar menjamin premis yang benar.",
        },
        {
          id: "d",
          text: "Validity dan soundness adalah istilah yang sama untuk menyatakan bahwa kesimpulan argumen bernilai TRUE.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Sound = Valid + premis benar. Sebuah argumen bisa valid secara struktur tetapi tidak sound jika ada premis yang salah secara faktual.",
    },
    {
      number: 8,
      prompt:
        "Perhatikan dua fungsi berikut. Keduanya menghasilkan output yang sama untuk seluruh kombinasi input. Hukum ekuivalensi apa yang menjelaskan hal ini?",
      code: "function checkA(p, q) { return !(p && q); }\nfunction checkB(p, q) { return !p || !q; }",
      options: [
        { id: "a", text: "Double Negation, karena ¬(¬P) ≡ P." },
        { id: "b", text: "De Morgan's Law, karena ¬(P ∧ Q) ≡ ¬P ∨ ¬Q." },
        {
          id: "c",
          text: "Distributive, karena P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R).",
        },
        { id: "d", text: "Commutative, karena P ∧ Q ≡ Q ∧ P." },
      ],
      correctOptionId: "b",
      explanation:
        "checkA menghitung ¬(P ∧ Q) dan checkB menghitung ¬P ∨ ¬Q. Sesuai De Morgan's Law keduanya ekuivalen, sehingga outputnya selalu sama untuk semua input.",
    },
  ],
  essay: {
    number: 9,
    prompt:
      "Jelaskan perbedaan antara logical equivalence dan logical consequence, lalu jelaskan perbedaan antara validity dan soundness. Setelah itu, berikan satu contoh argumen yang valid tetapi tidak sound, dan jelaskan mengapa argumen tersebut valid namun tidak sound.",
    referenceAnswer:
      "Logical equivalence (simbol ≡) membandingkan dua formula dan menyatakan keduanya selalu memiliki nilai kebenaran yang sama pada seluruh interpretasi, contohnya P → Q ≡ ¬P ∨ Q. Sebaliknya, logical consequence (simbol ⊨) menguji hubungan antara premis dan kesimpulan, yaitu apakah kesimpulan harus bernilai TRUE setiap kali seluruh premis bernilai TRUE, contohnya {P → Q, P} ⊨ Q. Validity hanya berbicara tentang struktur logis argumen: tidak mungkin seluruh premis TRUE sementara kesimpulan FALSE. Soundness lebih kuat, yaitu argumen valid sekaligus seluruh premisnya benar secara faktual (Sound = Valid + premis benar). Contoh argumen yang valid tetapi tidak sound: \"Semua kucing dapat terbang; Miko adalah kucing; maka Miko dapat terbang.\" Argumen ini valid karena mengikuti pola Modus Ponens yang benar secara struktur, tetapi tidak sound karena premisnya (\"semua kucing dapat terbang\") salah secara faktual.",
  },
};
