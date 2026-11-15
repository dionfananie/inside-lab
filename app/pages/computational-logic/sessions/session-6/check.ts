import type { SessionKnowledgeCheck } from "../../check/types";

export const sessionSixCheck: SessionKnowledgeCheck = {
  multipleChoice: [
    {
      number: 1,
      prompt:
        "Mengapa predicate logic lebih diperlukan daripada propositional logic untuk merepresentasikan aturan seperti “semua mahasiswa wajib ikut ujian”?",
      options: [
        {
          id: "a",
          text: "Karena propositional logic sudah dapat menangani aturan tersebut dengan satu simbol tunggal tanpa perlu menguraikan objek di dalamnya.",
        },
        {
          id: "b",
          text: "Karena propositional logic harus menuliskan aturan tersebut satu per satu untuk setiap mahasiswa (P1 → Q1, P2 → Q2), sedangkan predicate logic cukup memakai variabel seperti Student(x) → MustTakeExam(x).",
        },
        {
          id: "c",
          text: "Karena propositional logic hanya dapat menyatakan negasi, sehingga aturan yang bersifat universal tidak mungkin dinyatakan sama sekali.",
        },
        {
          id: "d",
          text: "Karena propositional logic tidak memiliki operator dasar seperti AND dan OR untuk menghubungkan antarpernyataan.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Propositional logic memperlakukan pernyataan sebagai satu kesatuan sehingga aturan universal harus diuraikan per objek; predicate logic mengatasinya dengan variabel dan quantifier.",
    },
    {
      number: 2,
      prompt: "Apa yang dimaksud dengan predicate dalam predicate logic?",
      options: [
        {
          id: "a",
          text: "Simbol yang merepresentasikan objek tertentu secara spesifik, misalnya Teddy.",
        },
        {
          id: "b",
          text: "Simbol yang menyatakan properti atau hubungan antarobjek, misalnya Student(Teddy) atau Likes(Teddy, Mathematics).",
        },
        {
          id: "c",
          text: "Simbol yang selalu menghasilkan objek atau term baru seperti FatherOf(Teddy).",
        },
        {
          id: "d",
          text: "Simbol yang berfungsi menggantikan nilai kebenaran benar dan salah dari sebuah proposisi.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Predicate menyatakan properti atau hubungan antarobjek, contohnya Student(Teddy) dan Likes(Teddy, Mathematics).",
    },
    {
      number: 3,
      prompt: "Perhatikan tabel komponen predicate logic berikut. Pernyataan mana yang benar?",
      list: [
        "Constant — objek tertentu — contoh: Teddy",
        "Variable — objek umum — contoh: x",
        "Predicate — properti atau hubungan — contoh: Student(x)",
        "Function — menghasilkan objek lain — contoh: FatherOf(x)",
      ],
      options: [
        {
          id: "a",
          text: "Constant merepresentasikan objek umum, sedangkan variable merepresentasikan objek tertentu.",
        },
        {
          id: "b",
          text: "Constant merujuk pada objek tertentu seperti Teddy, sedangkan variable merepresentasikan objek secara umum seperti x.",
        },
        {
          id: "c",
          text: "Constant dan variable keduanya selalu menghasilkan nilai kebenaran benar atau salah.",
        },
        {
          id: "d",
          text: "Constant hanya dipakai di dalam quantifier, sedangkan variable hanya boleh muncul di luar quantifier.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Constant merujuk objek tertentu (misal Teddy), sedangkan variable merepresentasikan objek secara umum (misal x).",
    },
    {
      number: 4,
      prompt: "Apa perbedaan antara predicate dan function dalam predicate logic?",
      options: [
        {
          id: "a",
          text: "Predicate menghasilkan objek atau term, sedangkan function menghasilkan nilai kebenaran benar atau salah.",
        },
        {
          id: "b",
          text: "Predicate menghasilkan nilai kebenaran seperti Student(Teddy), sedangkan function menghasilkan objek atau term seperti FatherOf(Teddy).",
        },
        {
          id: "c",
          text: "Predicate tidak menerima argumen sama sekali, sedangkan function wajib menerima argumen berupa angka.",
        },
        {
          id: "d",
          text: "Predicate dan function pada dasarnya sama karena keduanya selalu mengembalikan nilai benar atau salah.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Predicate mengembalikan nilai kebenaran (Student(Teddy)), sedangkan function mengembalikan objek atau term (FatherOf(Teddy)).",
    },
    {
      number: 5,
      prompt:
        "Kalimat “Semua mahasiswa mengambil mata kuliah AI” direpresentasikan sebagai formula berikut. Mengapa operator yang digunakan adalah implikasi (→) dan bukan konjungsi (∧)?",
      code: "∀x (Student(x) → Takes(x, AI))",
      options: [
        {
          id: "a",
          text: "Karena implikasi memastikan setiap objek yang memenuhi Student(x) juga memenuhi Takes(x, AI), sehingga sesuai dengan makna “semua”.",
        },
        {
          id: "b",
          text: "Karena konjungsi tidak boleh dipakai bersama quantifier universal dalam bentuk apa pun.",
        },
        {
          id: "c",
          text: "Karena implikasi dipakai untuk menyatakan keberadaan minimal satu objek yang memenuhi kondisi.",
        },
        {
          id: "d",
          text: "Karena implikasi selalu bernilai benar sehingga seluruh formula menjadi benar tanpa perlu memeriksa objek.",
        },
      ],
      correctOptionId: "a",
      explanation:
        "Quantifier universal dipadukan dengan implikasi sehingga setiap objek yang memenuhi Student(x) harus juga memenuhi Takes(x, AI).",
    },
    {
      number: 6,
      prompt:
        "Kalimat “Ada mahasiswa yang mengambil mata kuliah AI” direpresentasikan sebagai formula berikut. Operator penghubung apa yang tepat untuk mengisi bagian rumpang dan mengapa?",
      code: "∃x (Student(x) ? Takes(x, AI))",
      options: [
        {
          id: "a",
          text: "Implikasi (→), karena sama seperti quantifier universal agar setiap mahasiswa memenuhi kondisi yang diberikan.",
        },
        {
          id: "b",
          text: "Konjungsi (∧), karena ∃ menyatakan setidaknya ada satu objek yang sekaligus Student dan Takes AI.",
        },
        {
          id: "c",
          text: "Negasi (¬), karena pernyataan keberadaan selalu dinyatakan dalam bentuk penyangkalan.",
        },
        {
          id: "d",
          text: "Bikondisional (↔), karena kondisinya harus berlaku dua arah untuk semua objek.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Quantifier existential dipadukan dengan konjungsi, sehingga ∃x (Student(x) ∧ Takes(x, AI)) berarti ada mahasiswa yang juga mengambil AI.",
    },
    {
      number: 7,
      prompt:
        "Perhatikan hukum negasi quantifier berikut. Kalimat “Tidak semua mahasiswa lulus” ekuivalen dengan penyataan mana?",
      list: ["¬∀x P(x) ≡ ∃x ¬P(x)", "¬∃x P(x) ≡ ∀x ¬P(x)"],
      options: [
        {
          id: "a",
          text: "Semua mahasiswa tidak lulus, yaitu ∀x ¬Lulus(x).",
        },
        {
          id: "b",
          text: "Ada mahasiswa yang tidak lulus, yaitu ∃x ¬Lulus(x).",
        },
        {
          id: "c",
          text: "Tidak ada mahasiswa yang lulus, yaitu ¬∃x Lulus(x).",
        },
        {
          id: "d",
          text: "Semua mahasiswa lulus, yaitu ∀x Lulus(x).",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Berdasarkan hukum negasi quantifier, ¬∀x P(x) ekuivalen dengan ∃x ¬P(x), sehingga “tidak semua lulus” berarti ada mahasiswa yang tidak lulus.",
    },
    {
      number: 8,
      prompt:
        "Perhatikan potongan formula berikut. Pernyataan mana yang benar mengenai bound variable dan free variable?",
      code: "∀x (Student(x) → Smart(x))\nStudent(x) ∧ ∃y Likes(y, Mathematics)",
      options: [
        {
          id: "a",
          text: "Pada baris pertama x adalah free variable karena berada di luar cakupan quantifier.",
        },
        {
          id: "b",
          text: "Pada baris kedua y adalah bound variable karena berada dalam cakupan ∃, sedangkan x adalah free variable karena tidak terikat quantifier mana pun.",
        },
        {
          id: "c",
          text: "Pada baris kedua x dan y keduanya bound variable karena muncul bersama-sama dalam satu formula.",
        },
        {
          id: "d",
          text: "Semua variabel pada kedua baris adalah bound variable karena selalu didahului simbol quantifier.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Bound variable berada dalam cakupan quantifier (y pada ∃y), sedangkan free variable tidak terikat quantifier mana pun (x pada baris kedua).",
    },
  ],
  essay: {
    number: 9,
    prompt:
      "Diberikan fakta Student(Teddy) dan aturan ∀x (Student(x) → MustTakeExam(x)). Jelaskan kesimpulan yang dapat diturunkan, inference rule yang digunakan, serta bagaimana bentuk penalaran ini diimplementasikan dalam Prolog.",
    code: "Fakta: Student(Teddy)\nAturan: ∀x (Student(x) → MustTakeExam(x))",
    referenceAnswer:
      "Kesimpulan yang dapat diturunkan adalah MustTakeExam(Teddy). Penalaran dilakukan dengan universal instantiation, yaitu mengganti variabel x dengan konstanta Teddy sehingga diperoleh Student(Teddy) → MustTakeExam(Teddy); fakta Student(Teddy) bersama implikasi tersebut lalu diolah dengan Modus Ponens sehingga menyimpulkan MustTakeExam(Teddy). Dalam Prolog, konsep ini diimplementasikan sebagai fakta seperti student(teddy). beserta aturan takes_ai(X) :- student(X), takes(X, ai)., kemudian dijalankan dengan query ?- takes_ai(X). untuk mencari seluruh objek yang memenuhi aturan tersebut.",
  },
};
