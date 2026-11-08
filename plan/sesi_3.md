# Sesi 3 — Truth Tables, Logical Evaluation & Well-Formed Formula

## 1. Learning Objectives

Setelah menyelesaikan sesi ini, mahasiswa diharapkan mampu:

1. Menjelaskan pengertian Truth Table dan fungsinya dalam logika formal.
2. Menentukan jumlah kombinasi nilai kebenaran dari sejumlah proposisi.
3. Membuat Truth Table untuk formula dengan satu, dua, dan tiga proposisi.
4. Mengevaluasi formula kompleks menggunakan Logical Connectives.
5. Memahami operator precedence dan penggunaan parentheses.
6. Menjelaskan pengertian Well-Formed Formula (WFF).
7. Membedakan formula yang valid dan tidak valid secara sintaksis.
8. Mengidentifikasi Tautology, Contradiction, dan Contingency.
9. Menjelaskan bagaimana komputer mengevaluasi formula logika.
10. Mengimplementasikan evaluasi logika sederhana menggunakan program.

---

# 2. Review Sesi Sebelumnya

Pada Sesi 2, kita telah mempelajari Propositional Logic dan lima operator logika utama:

| Simbol | Nama | Makna |
|---|---|---|
| ¬ | Negation | NOT |
| ∧ | Conjunction | AND |
| ∨ | Disjunction | OR |
| → | Implication | IF...THEN |
| ↔ | Biconditional | IF AND ONLY IF |

Kita juga telah mempelajari bahwa setiap proposisi memiliki nilai kebenaran TRUE atau FALSE.

Contoh:

P = Hari ini hujan.

Q = Jalanan basah.

Formula:

P → Q

Pertanyaan:

Jika P dan Q memiliki nilai kebenaran yang berbeda-beda, bagaimana kita menentukan hasil formula tersebut?

Bagaimana jika terdapat tiga proposisi atau lebih?

Untuk menjawab pertanyaan tersebut, kita menggunakan Truth Table.

---

# 3. Apa Itu Truth Table?

## 3.1 Definisi

Truth Table atau Tabel Kebenaran adalah metode dalam logika formal yang digunakan untuk menunjukkan seluruh kemungkinan kombinasi nilai kebenaran dari proposisi dan hasil evaluasi suatu formula.

Truth Table digunakan untuk mengevaluasi formula secara sistematis berdasarkan seluruh kemungkinan nilai TRUE dan FALSE.

Dengan Truth Table, kita tidak perlu menebak hasil suatu formula.

Kita dapat memeriksa setiap kemungkinan kondisi secara terstruktur.

## 3.2 Mengapa Truth Table Penting?

Bayangkan terdapat formula:

(P ∧ Q) → R

Kita memiliki tiga proposisi:

- P = Hari ini hujan.
- Q = Saya membawa payung.
- R = Saya tidak kehujanan.

Setiap proposisi memiliki dua kemungkinan nilai:

- TRUE
- FALSE

Kita perlu memeriksa seluruh kemungkinan kombinasi P, Q, dan R.

Truth Table membantu kita menjawab:

1. Kapan formula bernilai TRUE?
2. Kapan formula bernilai FALSE?
3. Apakah formula selalu TRUE?
4. Apakah formula selalu FALSE?
5. Apakah terdapat kombinasi yang membuat formula TRUE?

Truth Table merupakan salah satu metode dasar untuk menganalisis semantik Propositional Logic.

---

# 4. Cara Menentukan Jumlah Kombinasi Truth Table

Jika terdapat n proposisi atomik yang berbeda, jumlah kombinasi nilai kebenarannya adalah:

2ⁿ

Keterangan:

- n = jumlah proposisi atomik.
- Setiap proposisi memiliki dua kemungkinan nilai, TRUE atau FALSE.

Contoh:

| Jumlah Proposisi | Perhitungan | Jumlah Kombinasi |
|---|---|---:|
| 1 | 2¹ | 2 |
| 2 | 2² | 4 |
| 3 | 2³ | 8 |
| 4 | 2⁴ | 16 |
| 5 | 2⁵ | 32 |
| 6 | 2⁶ | 64 |

Mengapa menggunakan pangkat?

Karena setiap proposisi memiliki dua kemungkinan nilai kebenaran.

Jika terdapat dua proposisi:

P = TRUE atau FALSE.

Q = TRUE atau FALSE.

Setiap kemungkinan P dapat dikombinasikan dengan setiap kemungkinan Q.

Sehingga:

2 × 2 = 4 kombinasi.

Jika terdapat tiga proposisi:

2 × 2 × 2 = 8 kombinasi.

## 4.1 Contoh Dua Proposisi

Diberikan:

P = Hari ini hujan.

Q = Jalanan basah.

Seluruh kombinasi:

| P | Q |
|---|---|
| T | T |
| T | F |
| F | T |
| F | F |

Terdapat empat kemungkinan.

## 4.2 Contoh Tiga Proposisi

Diberikan:

P = Hari ini hujan.

Q = Saya membawa payung.

R = Jalanan basah.

Seluruh kombinasi:

| P | Q | R |
|---|---|---|
| T | T | T |
| T | T | F |
| T | F | T |
| T | F | F |
| F | T | T |
| F | T | F |
| F | F | T |
| F | F | F |

Terdapat delapan kemungkinan.

## 4.3 Pola Membuat Kombinasi

Untuk membuat tabel secara sistematis:

- Kolom P berubah setiap empat baris.
- Kolom Q berubah setiap dua baris.
- Kolom R berubah setiap satu baris.

Contoh:

| P | Q | R |
|---|---|---|
| T | T | T |
| T | T | F |
| T | F | T |
| T | F | F |
| F | T | T |
| F | T | F |
| F | F | T |
| F | F | F |

Pola ini dapat digunakan untuk membuat Truth Table dengan jumlah proposisi yang lebih banyak.

---

# 5. Truth Table untuk Logical Connectives

Sebelum mengevaluasi formula kompleks, kita perlu memahami hasil masing-masing operator.

## 5.1 Negation (NOT)

Formula:

¬P

Negation membalik nilai kebenaran proposisi.

| P | ¬P |
|---|---|
| T | F |
| F | T |

Jika P = TRUE, maka ¬P = FALSE.

Jika P = FALSE, maka ¬P = TRUE.

## 5.2 Conjunction (AND)

Formula:

P ∧ Q

AND bernilai TRUE hanya jika kedua proposisi TRUE.

| P | Q | P ∧ Q |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

## 5.3 Disjunction (OR)

Formula:

P ∨ Q

OR bernilai TRUE jika minimal satu proposisi TRUE.

| P | Q | P ∨ Q |
|---|---|---|
| T | T | T |
| T | F | T |
| F | T | T |
| F | F | F |

## 5.4 Implication

Formula:

P → Q

Implikasi bernilai FALSE hanya ketika P TRUE dan Q FALSE.

| P | Q | P → Q |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

## 5.5 Biconditional

Formula:

P ↔ Q

Biconditional bernilai TRUE ketika P dan Q memiliki nilai kebenaran yang sama.

| P | Q | P ↔ Q |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | T |

---

# 6. Mengevaluasi Formula Kompleks

Pada formula sederhana, kita hanya mengevaluasi satu operator.

Namun, formula yang lebih kompleks dapat memiliki beberapa operator sekaligus.

Contoh:

(P ∧ Q) → R

Untuk mengevaluasinya, kita perlu memecah formula menjadi beberapa bagian.

## 6.1 Contoh Evaluasi Formula dengan Tiga Proposisi

Diberikan:

P = Hari ini hujan.

Q = Saya membawa payung.

R = Jalanan basah.

Formula:

(P ∧ Q) → R

Langkah pertama: buat seluruh kombinasi P, Q, dan R.

Langkah kedua: evaluasi bagian dalam kurung.

P ∧ Q

Langkah ketiga: evaluasi hasil sebelumnya menggunakan implication.

(P ∧ Q) → R

Truth Table:

| P | Q | R | P ∧ Q | (P ∧ Q) → R |
|---|---|---|---|---|
| T | T | T | T | T |
| T | T | F | T | F |
| T | F | T | F | T |
| T | F | F | F | T |
| F | T | T | F | T |
| F | T | F | F | T |
| F | F | T | F | T |
| F | F | F | F | T |

## 6.2 Memahami Salah Satu Baris

Ambil baris kedua:

| P | Q | R |
|---|---|---|
| T | T | F |

Evaluasi:

P ∧ Q

= TRUE ∧ TRUE

= TRUE

Kemudian:

(P ∧ Q) → R

= TRUE → FALSE

= FALSE

Jadi, hasil formula pada baris tersebut adalah FALSE.

## 6.3 Mengapa Baris Lain Bernilai TRUE?

Contoh baris ketiga:

P = TRUE

Q = FALSE

R = TRUE

Evaluasi:

P ∧ Q = FALSE

Kemudian:

FALSE → TRUE = TRUE

Hal ini mengikuti semantik material implication.

Formula hanya dilanggar ketika antecedent TRUE tetapi consequent FALSE.

---

# 7. Operator Precedence dan Parentheses

Ketika formula memiliki beberapa operator, kita perlu mengetahui urutan evaluasinya.

Konsep ini disebut Operator Precedence.

Operator precedence menentukan operator mana yang dievaluasi terlebih dahulu ketika formula tidak memiliki tanda kurung yang cukup untuk menentukan pengelompokan.

Urutan prioritas yang umum digunakan dalam Propositional Logic adalah:

| Prioritas | Operator | Simbol |
|---|---|---|
| 1 | Negation | ¬ |
| 2 | Conjunction | ∧ |
| 3 | Disjunction | ∨ |
| 4 | Implication | → |
| 5 | Biconditional | ↔ |

Catatan: Konvensi precedence dapat berbeda antar buku atau sistem. Untuk menghindari ambiguitas, penggunaan parentheses sangat disarankan.

## 7.1 Contoh Tanpa Parentheses

Formula:

P ∨ Q ∧ R

Dengan aturan precedence di atas, AND dievaluasi lebih dahulu.

Sehingga formula tersebut diinterpretasikan sebagai:

P ∨ (Q ∧ R)

Bukan:

(P ∨ Q) ∧ R

## 7.2 Contoh dengan Parentheses

Bandingkan:

Formula A:

P ∨ (Q ∧ R)

Formula B:

(P ∨ Q) ∧ R

Keduanya memiliki struktur berbeda.

Diberikan:

P = TRUE

Q = FALSE

R = FALSE

Evaluasi Formula A:

P ∨ (Q ∧ R)

= TRUE ∨ (FALSE ∧ FALSE)

= TRUE ∨ FALSE

= TRUE

Evaluasi Formula B:

(P ∨ Q) ∧ R

= (TRUE ∨ FALSE) ∧ FALSE

= TRUE ∧ FALSE

= FALSE

Hasilnya berbeda.

Ini membuktikan bahwa struktur formula memengaruhi hasil evaluasi.

## 7.3 Mengapa Parentheses Penting dalam Komputer?

Komputer membutuhkan struktur yang jelas untuk mengetahui bagaimana suatu formula harus dievaluasi.

Dalam bahasa pemrograman:

```javascript
const resultA = p || (q && r);

const resultB = (p || q) && r;
```

Kedua ekspresi tersebut memiliki struktur evaluasi berbeda.

Parentheses membantu memastikan maksud programmer direpresentasikan dengan benar.

---

# 8. Well-Formed Formula (WFF)

## 8.1 Definisi

Well-Formed Formula (WFF) adalah formula logika yang dibentuk sesuai dengan aturan syntax yang telah ditentukan.

Dengan kata lain, WFF adalah formula yang memiliki struktur sintaksis valid.

Ingat kembali materi Sesi 1:

Syntax menentukan bagaimana simbol boleh disusun.

WFF merupakan hasil dari penerapan aturan syntax tersebut.

## 8.2 Aturan Pembentukan WFF

Dalam Propositional Logic, aturan pembentukan WFF adalah:

1. Setiap proposisi atomik seperti P, Q, dan R merupakan WFF.
2. Jika P merupakan WFF, maka ¬P merupakan WFF.
3. Jika P dan Q merupakan WFF, maka (P ∧ Q) merupakan WFF.
4. Jika P dan Q merupakan WFF, maka (P ∨ Q) merupakan WFF.
5. Jika P dan Q merupakan WFF, maka (P → Q) merupakan WFF.
6. Jika P dan Q merupakan WFF, maka (P ↔ Q) merupakan WFF.

Aturan tersebut bersifat rekursif.

Artinya, formula yang sudah valid dapat digunakan untuk membentuk formula yang lebih kompleks.

## 8.3 Contoh WFF

Formula berikut valid secara syntax:

```text
P

¬P

(P ∧ Q)

(P ∨ Q)

(P → Q)

(P ∧ Q) → R

¬(P ∨ Q)

(P → Q) ∧ (Q → R)
```

Semua formula tersebut memiliki struktur yang dapat dibangun menggunakan aturan pembentukan WFF.

## 8.4 Contoh Bukan WFF

Formula berikut tidak valid secara syntax:

```text
∧ P Q

P →

→ P Q

P ∧

(P ∧ Q

¬ ∧ P
```

Alasannya:

- Operator binary seperti AND membutuhkan dua operand.
- Operator implication membutuhkan antecedent dan consequent.
- Tanda kurung harus berpasangan.
- Operator harus ditempatkan sesuai aturan pembentukan formula.

## 8.5 WFF Tidak Menentukan Kebenaran

Penting untuk dipahami:

Formula yang valid secara syntax belum tentu bernilai TRUE.

Contoh:

P ∧ Q

Formula tersebut merupakan WFF.

Namun jika:

P = TRUE

Q = FALSE

Maka:

P ∧ Q = FALSE

Jadi:

- WFF menjawab apakah formula memiliki struktur yang benar.
- Truth Table menjawab bagaimana nilai kebenaran formula pada setiap interpretasi.

Kedua konsep ini berbeda.

---

# 9. Tautology, Contradiction, dan Contingency

Truth Table dapat digunakan untuk mengklasifikasikan formula berdasarkan seluruh kemungkinan nilai kebenarannya.

Terdapat tiga kategori utama.

## 9.1 Tautology

### Definisi

Tautology adalah formula yang selalu bernilai TRUE untuk seluruh kemungkinan interpretasi proposisi.

Contoh:

P ∨ ¬P

Formula tersebut menyatakan:

"P atau bukan P."

Truth Table:

| P | ¬P | P ∨ ¬P |
|---|---|---|
| T | F | T |
| F | T | T |

Hasilnya selalu TRUE.

Artinya, formula tersebut merupakan tautology.

Contoh lainnya:

P → P

| P | P → P |
|---|---|
| T | T |
| F | T |

Formula ini juga selalu TRUE.

## 9.2 Contradiction

### Definisi

Contradiction adalah formula yang selalu bernilai FALSE untuk seluruh kemungkinan interpretasi.

Contoh:

P ∧ ¬P

Formula tersebut menyatakan:

"P dan bukan P."

Truth Table:

| P | ¬P | P ∧ ¬P |
|---|---|---|
| T | F | F |
| F | T | F |

Hasilnya selalu FALSE.

Dalam logika klasik, suatu proposisi dan negasinya tidak dapat sekaligus benar pada interpretasi yang sama.

Contoh lainnya:

P ↔ ¬P

Formula tersebut juga selalu FALSE.

## 9.3 Contingency

### Definisi

Contingency adalah formula yang memiliki setidaknya satu interpretasi TRUE dan setidaknya satu interpretasi FALSE.

Contoh:

P ∧ Q

Truth Table:

| P | Q | P ∧ Q |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

Formula tersebut terkadang TRUE dan terkadang FALSE.

Oleh karena itu, formula tersebut merupakan contingency.

## 9.4 Perbandingan

| Kategori | Karakteristik | Contoh |
|---|---|---|
| Tautology | Selalu TRUE | P ∨ ¬P |
| Contradiction | Selalu FALSE | P ∧ ¬P |
| Contingency | Bisa TRUE dan FALSE | P ∧ Q |

## 9.5 Mengapa Klasifikasi Ini Penting?

Klasifikasi formula dapat digunakan untuk:

1. Memeriksa konsistensi aturan.
2. Mengidentifikasi aturan yang selalu benar.
3. Menemukan kondisi yang mustahil dipenuhi.
4. Memverifikasi formula dalam sistem komputer.
5. Menganalisis constraint dalam SAT Solver.

---

# 10. Satisfiable dan Unsatisfiable

Selain tiga klasifikasi sebelumnya, terdapat istilah lain yang penting dalam Computational Logic.

## 10.1 Satisfiable

Formula disebut satisfiable jika terdapat minimal satu interpretasi yang membuat formula bernilai TRUE.

Contoh:

P ∧ Q

Formula tersebut satisfiable karena:

P = TRUE

Q = TRUE

Menghasilkan TRUE.

## 10.2 Unsatisfiable

Formula disebut unsatisfiable jika tidak ada interpretasi yang dapat membuat formula bernilai TRUE.

Contoh:

P ∧ ¬P

Tidak ada assignment yang dapat membuat formula tersebut TRUE.

## 10.3 Hubungan dengan Klasifikasi Formula

| Kategori | Satisfiable? |
|---|---|
| Tautology | Ya |
| Contradiction | Tidak |
| Contingency | Ya |

Perlu dipahami:

Satisfiable tidak berarti formula selalu benar.

Satisfiable hanya berarti terdapat setidaknya satu kombinasi yang membuat formula TRUE.

Konsep ini menjadi fondasi untuk mempelajari SAT Solver pada materi AI berikutnya.

---

# 11. Dari Truth Table ke Komputer

Bagaimana komputer dapat membuat Truth Table secara otomatis?

Komputer dapat menggunakan algoritma untuk:

1. Mengidentifikasi proposisi atomik.
2. Menghasilkan seluruh kombinasi nilai TRUE dan FALSE.
3. Mengevaluasi formula untuk setiap kombinasi.
4. Menyimpan hasil evaluasi.
5. Mengklasifikasikan formula.

## 11.1 Menghasilkan Seluruh Kombinasi

Jika terdapat n proposisi, komputer perlu menghasilkan:

2ⁿ kombinasi.

Contoh implementasi JavaScript:

```javascript
function generateAssignments(variables) {
  const total = 2 ** variables.length;
  const assignments = [];

  for (let i = 0; i < total; i++) {
    const assignment = {};

    variables.forEach((variable, index) => {
      const bit =
        (i >> (variables.length - index - 1)) & 1;

      assignment[variable] = bit === 1;
    });

    assignments.push(assignment);
  }

  return assignments;
}

console.log(
  generateAssignments(["P", "Q"])
);
```

Output:

```javascript
[
  { P: false, Q: false },
  { P: false, Q: true },
  { P: true, Q: false },
  { P: true, Q: true }
]
```

Urutan kombinasi tidak harus sama dengan tabel yang ditampilkan sebelumnya. Yang penting seluruh kombinasi muncul tepat satu kali.

## 11.2 Mengevaluasi Formula

Contoh formula:

(P ∧ Q) → R

Implementasi:

```javascript
function evaluateFormula({ P, Q, R }) {
  return !(P && Q) || R;
}

const assignments = [
  { P: true, Q: true, R: true },
  { P: true, Q: true, R: false },
  { P: true, Q: false, R: true },
  { P: true, Q: false, R: false },
  { P: false, Q: true, R: true },
  { P: false, Q: true, R: false },
  { P: false, Q: false, R: true },
  { P: false, Q: false, R: false }
];

for (const assignment of assignments) {
  console.log({
    ...assignment,
    result: evaluateFormula(assignment)
  });
}
```

Mengapa menggunakan:

```javascript
!(P && Q) || R
```

Karena dalam propositional logic klasik:

A → B ≡ ¬A ∨ B

Sehingga:

(P ∧ Q) → R

Setara dengan:

¬(P ∧ Q) ∨ R

## 11.3 Mengklasifikasikan Formula

Setelah seluruh hasil evaluasi diperoleh, komputer dapat menentukan jenis formula.

Contoh:

```javascript
function classifyFormula(results) {
  if (results.every(Boolean)) {
    return "TAUTOLOGY";
  }

  if (results.every(result => !result)) {
    return "CONTRADICTION";
  }

  return "CONTINGENCY";
}
```

Penjelasan:

- Jika seluruh hasil TRUE, maka tautology.
- Jika seluruh hasil FALSE, maka contradiction.
- Jika hasilnya campuran, maka contingency.

Catatan:

Kode tersebut mengasumsikan `results` berisi hasil evaluasi seluruh kemungkinan assignment dari formula yang sama.

## 11.4 Kompleksitas

Jumlah baris Truth Table bertambah secara eksponensial.

| Variabel | Kombinasi |
|---|---:|
| 2 | 4 |
| 3 | 8 |
| 5 | 32 |
| 10 | 1.024 |
| 20 | 1.048.576 |
| 30 | 1.073.741.824 |

Artinya, Truth Table sangat baik untuk pembelajaran dan formula kecil.

Namun, untuk formula dengan banyak variabel, memeriksa seluruh kemungkinan kombinasi dapat menjadi mahal secara komputasi.

Inilah salah satu alasan SAT Solver menggunakan algoritma yang lebih efisien daripada sekadar membuat seluruh Truth Table.

---

# 12. Mini Case Study: Validasi Sistem Registrasi

Bayangkan Anda sedang membuat sistem registrasi pengguna.

Aturan:

"Pengguna dapat melakukan registrasi jika memiliki email atau nomor telepon, dan belum terdaftar sebelumnya."

Definisikan:

P = Pengguna memiliki email.

Q = Pengguna memiliki nomor telepon.

R = Pengguna sudah terdaftar.

S = Pengguna dapat melakukan registrasi.

Formula:

(P ∨ Q) ∧ ¬R

Formula tersebut merepresentasikan kondisi yang harus dipenuhi agar pengguna dapat melakukan registrasi.

Truth Table:

| P | Q | R | P ∨ Q | ¬R | (P ∨ Q) ∧ ¬R |
|---|---|---|---|---|---|
| T | T | T | T | F | F |
| T | T | F | T | T | T |
| T | F | T | T | F | F |
| T | F | F | T | T | T |
| F | T | T | T | F | F |
| F | T | F | T | T | T |
| F | F | T | F | F | F |
| F | F | F | F | T | F |

Kesimpulan:

Pengguna dapat melakukan registrasi jika:

1. Memiliki email atau nomor telepon.
2. Belum pernah terdaftar.

Contoh implementasi:

```javascript
function canRegister({
  hasEmail,
  hasPhone,
  isRegistered
}) {
  return (
    (hasEmail || hasPhone) &&
    !isRegistered
  );
}
```

Contoh:

```javascript
const result = canRegister({
  hasEmail: true,
  hasPhone: false,
  isRegistered: false
});

console.log(result); // true
```

Penting:

Formula di atas merepresentasikan kondisi eligibility. Sistem registrasi nyata masih membutuhkan validasi email, keunikan nomor telepon, verifikasi identitas, dan pemeriksaan lainnya.

---

# 13. Kesalahan Umum dalam Memahami Truth Table

## Kesalahan 1: Tidak Memeriksa Seluruh Kombinasi

Jika terdapat tiga proposisi, mahasiswa hanya membuat empat baris.

Seharusnya:

2³ = 8 kombinasi.

## Kesalahan 2: Salah Mengevaluasi Implication

Banyak mahasiswa menganggap P → Q bernilai FALSE ketika P dan Q berbeda.

Padahal:

| P | Q | P → Q |
|---|---|---|
| T | F | F |
| F | T | T |

Implikasi hanya FALSE ketika antecedent TRUE dan consequent FALSE.

## Kesalahan 3: Mengabaikan Parentheses

Formula:

P ∨ (Q ∧ R)

Berbeda dengan:

(P ∨ Q) ∧ R

Struktur formula menentukan urutan evaluasi.

## Kesalahan 4: Menganggap WFF Berarti TRUE

Formula:

P ∧ Q

Merupakan WFF.

Namun hasilnya bisa FALSE.

WFF hanya menunjukkan syntax yang valid, bukan nilai kebenaran.

## Kesalahan 5: Menganggap Satisfiable Sama dengan Tautology

Satisfiable berarti setidaknya ada satu assignment yang membuat formula TRUE.

Tautology berarti seluruh assignment membuat formula TRUE.

---

# 14. Kesimpulan Sesi 3

Truth Table adalah metode untuk mengevaluasi formula logika berdasarkan seluruh kemungkinan kombinasi nilai kebenaran.

Jika terdapat n proposisi atomik, jumlah kombinasi adalah:

2ⁿ

Truth Table membantu kita menentukan hasil formula dan mengidentifikasi karakteristiknya.

Well-Formed Formula merupakan formula yang disusun sesuai aturan syntax logika.

Formula yang valid secara syntax belum tentu bernilai TRUE.

Terdapat tiga klasifikasi utama formula:

1. Tautology: selalu TRUE.
2. Contradiction: selalu FALSE.
3. Contingency: dapat TRUE atau FALSE.

Selain itu, konsep satisfiable dan unsatisfiable menjadi dasar untuk memahami SAT Solver.

Komputer dapat membuat Truth Table secara otomatis menggunakan algoritma untuk menghasilkan assignment dan mengevaluasi formula.

**Inti pembelajaran:**

Truth Table mengubah proses evaluasi logika menjadi prosedur sistematis yang dapat dilakukan manusia maupun komputer.

---

# 15. Knowledge Check — Evaluasi Pemahaman

## Petunjuk

Jawablah seluruh pertanyaan berdasarkan materi yang telah dipelajari.

Berikan alasan pada setiap pertanyaan yang meminta penjelasan.

### Bagian A — Pemahaman Konsep

**Pertanyaan 1**

Apa yang dimaksud dengan Truth Table?

Mengapa Truth Table perlu memeriksa seluruh kombinasi nilai TRUE dan FALSE?

**Pertanyaan 2**

Jika terdapat lima proposisi atomik yang berbeda, berapa jumlah kombinasi nilai kebenaran yang harus diperiksa?

Jelaskan bagaimana Anda mendapatkan jawabannya.

**Pertanyaan 3**

Apa perbedaan antara WFF dan formula yang bernilai TRUE?

Apakah formula yang memiliki syntax valid selalu bernilai TRUE? Berikan contoh.

### Bagian B — Evaluasi Formula

**Pertanyaan 4**

Diketahui:

P = TRUE

Q = FALSE

R = TRUE

Evaluasilah formula berikut:

a. P ∧ Q

b. P ∨ Q

c. ¬R

d. P → Q

e. (P ∧ Q) → R

Jelaskan hasilnya.

**Pertanyaan 5**

Buatlah Truth Table untuk:

(P ∨ Q) ∧ ¬R

Terdapat berapa kombinasi nilai kebenaran?

**Pertanyaan 6**

Apa perbedaan hasil dari kedua formula berikut?

A = P ∨ (Q ∧ R)

B = (P ∨ Q) ∧ R

Gunakan assignment:

P = TRUE

Q = FALSE

R = FALSE

Tunjukkan langkah evaluasinya.

### Bagian C — Analisis Formula

**Pertanyaan 7**

Tentukan apakah formula berikut termasuk Tautology, Contradiction, atau Contingency.

a. P ∨ ¬P

b. P ∧ ¬P

c. P → Q

Buat Truth Table untuk mendukung jawaban Anda.

**Pertanyaan 8**

Apa perbedaan antara Satisfiable dan Tautology?

Apakah sebuah formula dapat satisfiable tetapi bukan tautology? Berikan contoh.

**Pertanyaan 9**

Diberikan formula:

P ∧

Apakah formula tersebut merupakan WFF?

Jelaskan mengapa.

Kemudian berikan contoh formula yang benar secara syntax.

### Bagian D — Computational Thinking

**Pertanyaan 10**

Anda diminta membuat program yang mengevaluasi formula:

(P ∧ Q) → R

Jelaskan:

1. Berapa kombinasi yang harus diperiksa?
2. Bagaimana komputer menghasilkan kombinasi tersebut?
3. Bagaimana komputer mengevaluasi formula?
4. Bagaimana komputer menentukan apakah formula merupakan tautology, contradiction, atau contingency?

Berikan contoh implementasi menggunakan JavaScript.

---

# 16. Rubrik Penilaian

Total nilai: 100 poin.

| Bagian | Nomor | Bobot |
|---|---|---:|
| Pemahaman konsep | 1–3 | 25 |
| Evaluasi formula | 4–6 | 30 |
| Analisis formula | 7–9 | 30 |
| Computational Thinking | 10 | 15 |
| **Total** | **10 pertanyaan** | **100** |

## Kriteria Penilaian

| Skor | Kriteria |
|---|---|
| 4 | Jawaban benar, penjelasan logis, dan proses evaluasi tepat |
| 3 | Jawaban benar tetapi penjelasan belum lengkap |
| 2 | Memahami sebagian konsep tetapi terdapat kesalahan |
| 1 | Jawaban kurang tepat dan tidak menunjukkan pemahaman |
| 0 | Tidak menjawab atau tidak relevan |

Untuk setiap pertanyaan, nilai dapat dihitung berdasarkan skor 0–4 yang kemudian dikonversi sesuai bobot pertanyaan.

## Interpretasi Hasil

| Nilai | Interpretasi |
|---|---|
| 90–100 | Sangat memahami |
| 80–89 | Memahami |
| 70–79 | Cukup memahami |
| 60–69 | Perlu penguatan |
| Di bawah 60 | Belum memahami |

---

# 17. Indikator Pemahaman untuk Pengajar

| Konsep | Indikator pemahaman |
|---|---|
| Truth Table | Mampu menjelaskan fungsi Truth Table |
| Kombinasi | Mampu menentukan jumlah kemungkinan berdasarkan 2ⁿ |
| Logical Evaluation | Mampu mengevaluasi formula kompleks |
| Parentheses | Memahami pengaruh pengelompokan formula |
| Operator Precedence | Memahami prioritas operator |
| WFF | Mampu membedakan formula valid dan tidak valid |
| Tautology | Mampu mengidentifikasi formula yang selalu TRUE |
| Contradiction | Mampu mengidentifikasi formula yang selalu FALSE |
| Contingency | Mampu mengidentifikasi formula dengan hasil campuran |
| Satisfiability | Mampu membedakan satisfiable dan tautology |
| Computational Logic | Mampu menjelaskan proses evaluasi formula oleh komputer |

**Catatan untuk pengajar:**

Berikan perhatian khusus pada pertanyaan 3, 6, 7, 8, dan 10.

Pertanyaan tersebut menguji apakah mahasiswa memahami hubungan antara syntax, semantics, struktur formula, dan evaluasi komputasional.

---

# 18. Transisi ke Sesi Berikutnya

Pada sesi ini, mahasiswa telah memahami bagaimana formula dievaluasi menggunakan Truth Table.

Mereka juga telah memahami bagaimana mengklasifikasikan formula berdasarkan hasil evaluasi.

Namun, apakah dua formula yang memiliki bentuk berbeda dapat memiliki makna logis yang sama?

Contohnya:

P → Q

Dan:

¬P ∨ Q

Apakah keduanya memiliki hasil yang sama untuk seluruh kemungkinan nilai P dan Q?

Bagaimana cara membuktikannya?

Pertanyaan tersebut menjadi pengantar menuju Sesi 4.

## Topik Sesi 4 — Logical Equivalence, Logical Consequence & Validity

Materi berikutnya:

1. Logical Equivalence.
2. Logical Laws.
3. De Morgan's Laws.
4. Logical Consequence (Entailment).
5. Valid and Invalid Arguments.
6. Soundness.
7. Penggunaan logika untuk membuktikan argumen.

Pertanyaan pengantar:

"Jika dua formula ditulis menggunakan simbol yang berbeda, bagaimana kita dapat membuktikan bahwa keduanya memiliki makna logis yang sama?"

Pertanyaan ini menjadi dasar untuk mempelajari Logical Equivalence.