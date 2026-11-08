# Sesi 2 — Propositional Logic & Logical Symbols

## 1. Learning Objectives

Setelah menyelesaikan sesi ini, mahasiswa diharapkan mampu:

1. Menjelaskan pengertian Propositional Logic.
2. Membedakan proposisi dan bukan proposisi.
3. Mengidentifikasi proposisi atomik dan proposisi majemuk.
4. Memahami simbol-simbol dasar dalam logika proposisional.
5. Mengubah pernyataan bahasa alami menjadi representasi simbolik.
6. Menggabungkan beberapa proposisi menggunakan Logical Connectives.
7. Menjelaskan perbedaan AND, OR, NOT, IMPLICATION, dan BICONDITIONAL.
8. Mengevaluasi formula logika sederhana menggunakan nilai TRUE dan FALSE.
9. Memahami bagaimana operator logika digunakan dalam program komputer.

---

# 2. Review Sesi Sebelumnya

Pada Sesi 1, kita telah mempelajari bahwa logika formal memiliki tiga komponen utama:

1. Syntax: aturan pembentukan formula.
2. Semantics: aturan interpretasi dan penentuan nilai kebenaran.
3. Inference Rules: aturan untuk menghasilkan kesimpulan berdasarkan premis.

Kita juga telah memahami bahwa komputer membutuhkan representasi yang terstruktur agar dapat melakukan evaluasi dan reasoning.

Pada sesi ini, kita akan mempelajari salah satu bentuk representasi logika formal yang paling dasar, yaitu Propositional Logic.

Pertanyaan pengantar:

"Bagaimana komputer dapat memproses kalimat seperti 'Hari ini hujan dan jalanan basah' menggunakan simbol dan nilai TRUE atau FALSE?"

---

# 3. Apa Itu Propositional Logic?

## 3.1 Definisi

Propositional Logic atau Logika Proposisional adalah cabang logika formal yang mempelajari hubungan antara proposisi menggunakan operator logika.

Proposisi adalah pernyataan deklaratif yang memiliki tepat satu nilai kebenaran, yaitu:

- TRUE (Benar).
- FALSE (Salah).

Dalam Propositional Logic, setiap proposisi direpresentasikan menggunakan simbol seperti P, Q, R, dan seterusnya.

Contoh:

P = Hari ini hujan.

Q = Jalanan basah.

R = Saya membawa payung.

Setiap proposisi dapat dievaluasi menjadi TRUE atau FALSE berdasarkan kondisi atau interpretasi yang diberikan.

Misalnya:

Jika hari ini benar-benar hujan:

P = TRUE

Jika hari ini tidak hujan:

P = FALSE

## 3.2 Apa yang Disebut Proposisi?

Tidak semua kalimat merupakan proposisi.

Sebuah kalimat disebut proposisi jika kalimat tersebut merupakan pernyataan deklaratif yang dapat ditentukan nilai kebenarannya.

Contoh proposisi:

| Kalimat | Proposisi? | Alasan |
|---|---|---|
| Jakarta adalah ibu kota Indonesia. | Ya | Memiliki nilai kebenaran |
| 2 + 3 = 5 | Ya | Dapat dibuktikan benar |
| Hari ini hujan. | Ya | Dapat dievaluasi berdasarkan kondisi |
| Semua manusia membutuhkan oksigen. | Ya | Merupakan pernyataan |
| 10 lebih kecil dari 5. | Ya | Memiliki nilai kebenaran FALSE |

Contoh bukan proposisi:

| Kalimat | Proposisi? | Alasan |
|---|---|---|
| Tolong tutup pintu! | Tidak | Perintah |
| Apakah hari ini hujan? | Tidak | Pertanyaan |
| Semoga saya lulus. | Tidak | Harapan |
| Wah, bagus sekali! | Tidak | Ekspresi atau penilaian tanpa konteks yang cukup |
| x + 2 = 5 | Belum | Nilai x belum ditentukan |

Catatan:

Pernyataan yang memiliki variabel bebas seperti x + 2 = 5 belum merupakan proposisi karena nilai kebenarannya bergantung pada nilai x.

Jika diberikan x = 3, pernyataan tersebut menjadi proposisi yang bernilai TRUE.

## 3.3 Mengapa Proposisi Penting?

Komputer membutuhkan representasi yang dapat dievaluasi secara konsisten.

Proposisi menyediakan representasi dasar berupa nilai TRUE atau FALSE.

Contoh dalam program:

```javascript
const isRaining = true;
const isRoadWet = false;
```

Kedua variabel tersebut dapat merepresentasikan proposisi.

Komputer dapat menggunakan nilai tersebut untuk menjalankan operasi logika.

---

# 4. Atomic Proposition dan Compound Proposition

Dalam Propositional Logic, terdapat dua bentuk utama proposisi.

## 4.1 Atomic Proposition (Proposisi Atomik)

Atomic Proposition adalah proposisi sederhana yang tidak dibangun dari proposisi lain menggunakan operator logika.

Contoh:

P = Hari ini hujan.

Q = Saya membawa payung.

R = Jalanan basah.

Setiap proposisi tersebut merupakan satu kesatuan.

Kita tidak sedang menganalisis struktur logika di dalam masing-masing pernyataan.

## 4.2 Compound Proposition (Proposisi Majemuk)

Compound Proposition adalah proposisi yang dibentuk dengan menggabungkan satu atau lebih proposisi menggunakan Logical Connectives.

Contoh:

P = Hari ini hujan.

Q = Jalanan basah.

Formula:

P ∧ Q

Artinya:

"Hari ini hujan DAN jalanan basah."

Contoh lainnya:

P ∨ Q

Artinya:

"Hari ini hujan ATAU jalanan basah."

¬P

Artinya:

"Hari ini TIDAK hujan."

## 4.3 Perbandingan

| Atomic Proposition | Compound Proposition |
|---|---|
| Tidak menggunakan connective untuk menggabungkan proposisi | Menggunakan connective |
| Bentuk paling sederhana | Gabungan proposisi |
| Contoh: P | Contoh: P ∧ Q |
| Contoh: Q | Contoh: ¬Q |
| Contoh: R | Contoh: (P ∧ Q) → R |

Konsep penting:

Proposisi atomik merupakan blok dasar untuk membangun formula yang lebih kompleks.

---

# 5. Logical Symbols dan Logical Connectives

Logical Connectives adalah operator yang digunakan untuk menggabungkan atau memodifikasi proposisi.

Terdapat lima operator dasar yang perlu dipahami.

## 5.1 Negation (NOT)

Simbol:

¬P

Makna:

"Tidak P" atau "bukan P".

Negation digunakan untuk membalik nilai kebenaran sebuah proposisi.

Contoh:

P = Hari ini hujan.

¬P = Hari ini tidak hujan.

Truth Table:

| P | ¬P |
|---|---|
| TRUE | FALSE |
| FALSE | TRUE |

Contoh dalam JavaScript:

```javascript
const isRaining = true;

const isNotRaining = !isRaining;

console.log(isNotRaining); // false
```

Perhatikan bahwa operator NOT membalik nilai boolean.

## 5.2 Conjunction (AND)

Simbol:

P ∧ Q

Makna:

"P dan Q".

Conjunction bernilai TRUE hanya jika kedua proposisi bernilai TRUE.

Contoh:

P = Saya belajar.

Q = Saya mengerjakan tugas.

P ∧ Q berarti:

"Saya belajar DAN mengerjakan tugas."

Truth Table:

| P | Q | P ∧ Q |
|---|---|---|
| TRUE | TRUE | TRUE |
| TRUE | FALSE | FALSE |
| FALSE | TRUE | FALSE |
| FALSE | FALSE | FALSE |

Contoh implementasi:

```javascript
const isStudying = true;
const hasDoneAssignment = true;

const result = isStudying && hasDoneAssignment;

console.log(result); // true
```

Kapan AND digunakan?

Ketika suatu kondisi hanya terpenuhi jika seluruh syarat yang ditentukan bernilai TRUE.

Contoh:

```javascript
if (isLoggedIn && hasPermission) {
  console.log("Access granted");
}
```

Pengguna hanya dapat mengakses fitur jika sudah login DAN memiliki permission.

## 5.3 Disjunction (OR)

Simbol:

P ∨ Q

Makna:

"P atau Q".

Disjunction bernilai TRUE jika minimal salah satu proposisi bernilai TRUE.

Dalam logika proposisional klasik, OR merupakan inclusive OR.

Artinya, kedua proposisi boleh bernilai TRUE secara bersamaan.

Contoh:

P = Saya minum kopi.

Q = Saya minum teh.

P ∨ Q berarti:

"Saya minum kopi ATAU teh, atau keduanya."

Truth Table:

| P | Q | P ∨ Q |
|---|---|---|
| TRUE | TRUE | TRUE |
| TRUE | FALSE | TRUE |
| FALSE | TRUE | TRUE |
| FALSE | FALSE | FALSE |

Contoh implementasi:

```javascript
const hasEmail = true;
const hasPhoneNumber = false;

const canRegister = hasEmail || hasPhoneNumber;

console.log(canRegister); // true
```

Artinya, pengguna dapat mendaftar jika memiliki email ATAU nomor telepon.

### Inclusive OR vs Exclusive OR

Perlu diperhatikan bahwa terdapat dua interpretasi OR.

Inclusive OR:

P ∨ Q

TRUE jika:
- P benar.
- Q benar.
- Keduanya benar.

Exclusive OR (XOR):

P ⊕ Q

TRUE hanya jika tepat satu proposisi bernilai TRUE.

Truth Table:

| P | Q | P ∨ Q | P ⊕ Q |
|---|---|---|---|
| T | T | T | F |
| T | F | T | T |
| F | T | T | T |
| F | F | F | F |

Contoh:

"Untuk mengikuti ujian, mahasiswa boleh memilih tepat satu dari dua jadwal."

Jika memilih jadwal pagi dan sore sekaligus tidak diperbolehkan, kondisi tersebut lebih sesuai dengan XOR.

## 5.4 Implication (IF...THEN)

Simbol:

P → Q

Makna:

"Jika P, maka Q."

P disebut antecedent.

Q disebut consequent.

Contoh:

P = Saya belajar.

Q = Saya lulus ujian.

P → Q berarti:

"Jika saya belajar, maka saya lulus ujian."

Truth Table:

| P | Q | P → Q |
|---|---|---|
| TRUE | TRUE | TRUE |
| TRUE | FALSE | FALSE |
| FALSE | TRUE | TRUE |
| FALSE | FALSE | TRUE |

Mengapa implikasi bernilai FALSE hanya ketika P TRUE dan Q FALSE?

Karena implikasi menyatakan bahwa jika P terjadi, Q harus benar.

Ketika P terjadi tetapi Q tidak terjadi, aturan tersebut dilanggar.

Jika P tidak terjadi, implikasi tidak dilanggar.

### Contoh dalam komputer

```javascript
const isLoggedIn = true;
const hasPermission = false;

// Jika user login, maka user memiliki permission.
const rule = !isLoggedIn || hasPermission;

console.log(rule); // false
```

Catatan:

Operator `!P || Q` merupakan implementasi dari material implication `P → Q`.

Implikasi formal tidak otomatis menunjukkan hubungan sebab-akibat.

## 5.5 Biconditional (IF AND ONLY IF)

Simbol:

P ↔ Q

Makna:

"P jika dan hanya jika Q."

Biconditional bernilai TRUE ketika kedua proposisi memiliki nilai kebenaran yang sama.

Truth Table:

| P | Q | P ↔ Q |
|---|---|---|
| TRUE | TRUE | TRUE |
| TRUE | FALSE | FALSE |
| FALSE | TRUE | FALSE |
| FALSE | FALSE | TRUE |

Contoh:

P = Bilangan habis dibagi 2.

Q = Bilangan tersebut genap.

P ↔ Q menyatakan bahwa P dan Q memiliki hubungan dua arah.

Secara formal:

P ↔ Q ≡ (P → Q) ∧ (Q → P)

Artinya:

- Jika P, maka Q.
- Jika Q, maka P.

Kedua implikasi harus benar.

Contoh dalam sistem:

P = Pengguna terverifikasi.

Q = Status akun verified.

Jika sistem mendefinisikan kedua kondisi tersebut sebagai ekuivalen, hubungan dua arah dapat direpresentasikan menggunakan biconditional.

---

# 6. Ringkasan Logical Connectives

| Simbol | Nama | Makna | TRUE ketika |
|---|---|---|---|
| ¬P | Negation | NOT P | P FALSE |
| P ∧ Q | Conjunction | P AND Q | Keduanya TRUE |
| P ∨ Q | Disjunction | P OR Q | Minimal satu TRUE |
| P → Q | Implication | IF P THEN Q | Kecuali P TRUE dan Q FALSE |
| P ↔ Q | Biconditional | P IFF Q | Nilai P dan Q sama |
| P ⊕ Q | Exclusive OR | XOR | Tepat satu TRUE |

---

# 7. Mengubah Bahasa Alami Menjadi Simbol Logika

Salah satu kemampuan penting dalam Computational Logic adalah menerjemahkan kalimat bahasa alami menjadi formula formal.

Proses ini disebut logical translation atau symbolic representation.

## 7.1 Contoh 1: AND

Pernyataan:

"Saya belajar dan mengerjakan tugas."

Definisi:

P = Saya belajar.

Q = Saya mengerjakan tugas.

Representasi:

P ∧ Q

## 7.2 Contoh 2: OR

Pernyataan:

"Saya akan menggunakan Go atau JavaScript."

Definisi:

P = Saya menggunakan Go.

Q = Saya menggunakan JavaScript.

Representasi:

P ∨ Q

Catatan: Jika hanya salah satu yang boleh dipilih, gunakan XOR.

## 7.3 Contoh 3: NOT

Pernyataan:

"Saya tidak belajar."

Definisi:

P = Saya belajar.

Representasi:

¬P

## 7.4 Contoh 4: IMPLICATION

Pernyataan:

"Jika pengguna login, maka pengguna dapat mengakses dashboard."

Definisi:

P = Pengguna login.

Q = Pengguna dapat mengakses dashboard.

Representasi:

P → Q

## 7.5 Contoh 5: Compound Formula

Pernyataan:

"Jika pengguna login dan memiliki permission, maka pengguna dapat mengakses dashboard."

Definisi:

P = Pengguna login.

Q = Pengguna memiliki permission.

R = Pengguna dapat mengakses dashboard.

Representasi:

(P ∧ Q) → R

Makna:

Pengguna hanya dapat memenuhi aturan akses apabila kedua kondisi terpenuhi.

---

# 8. Mengapa Parentheses (Tanda Kurung) Penting?

Tanda kurung digunakan untuk menentukan struktur formula dan menghindari ambiguitas.

Contoh:

P ∧ Q ∨ R

Bandingkan dengan:

(P ∧ Q) ∨ R

Dan:

P ∧ (Q ∨ R)

Ketiganya memiliki struktur berbeda.

Misalnya:

P = TRUE
Q = FALSE
R = TRUE

Formula pertama, dengan asumsi prioritas AND sebelum OR:

(P ∧ Q) ∨ R

= (TRUE ∧ FALSE) ∨ TRUE

= FALSE ∨ TRUE

= TRUE

Formula kedua:

P ∧ (Q ∨ R)

= TRUE ∧ (FALSE ∨ TRUE)

= TRUE ∧ TRUE

= TRUE

Pada assignment tersebut hasilnya kebetulan sama.

Namun jika:

P = FALSE
Q = TRUE
R = FALSE

Formula pertama:

(P ∧ Q) ∨ R

= (FALSE ∧ TRUE) ∨ FALSE

= FALSE

Formula kedua:

P ∧ (Q ∨ R)

= FALSE ∧ (TRUE ∨ FALSE)

= FALSE

Hasilnya juga sama.

Untuk melihat perbedaannya, gunakan:

P = TRUE
Q = FALSE
R = TRUE

Kedua formula tersebut tetap sama pada assignment ini karena operator AND dan OR memiliki pola tertentu. Karena itu, mahasiswa sebaiknya tidak menebak struktur formula hanya dari hasil satu assignment.

Fokuslah pada struktur pohon dan urutan evaluasi.

Contoh formula dengan perbedaan yang jelas:

P ∨ (Q ∧ R)

Berbeda struktur dengan:

(P ∨ Q) ∧ R

Jika:

P = TRUE
Q = FALSE
R = FALSE

Maka:

P ∨ (Q ∧ R) = TRUE

(P ∨ Q) ∧ R = FALSE

Kesimpulan:

Tanda kurung menentukan bagaimana formula dikelompokkan dan dievaluasi.

---

# 9. Operator Logika dalam Bahasa Pemrograman

Logical Connectives bukan hanya konsep matematika. Operator tersebut digunakan secara langsung dalam bahasa pemrograman.

| Logika Formal | JavaScript | Go |
|---|---|---|
| ¬P | !P | !p |
| P ∧ Q | P && Q | p && q |
| P ∨ Q | P \|\| Q | p \|\| q |
| P → Q | !P \|\| Q | !p \|\| q |
| P ↔ Q | P === Q | p == q |

Contoh JavaScript:

```javascript
const isLoggedIn = true;
const hasPermission = true;
const isBlocked = false;

const canAccess =
  isLoggedIn &&
  hasPermission &&
  !isBlocked;

console.log(canAccess); // true
```

Representasi logika:

P = Pengguna login.

Q = Pengguna memiliki permission.

R = Pengguna diblokir.

Formula:

P ∧ Q ∧ ¬R

Hasilnya TRUE karena:
- P = TRUE.
- Q = TRUE.
- R = FALSE.
- ¬R = TRUE.

Sehingga:

TRUE ∧ TRUE ∧ TRUE = TRUE

Catatan:

Dalam pemrograman, operator boolean dapat memiliki perilaku tambahan seperti short-circuit evaluation. Hal tersebut merupakan mekanisme evaluasi bahasa pemrograman dan perlu dibedakan dari definisi semantik operator dalam logika klasik.

---

# 10. Mini Case Study: Sistem Akses Pengguna

Bayangkan Anda sedang mengembangkan sistem autentikasi untuk sebuah aplikasi.

Sistem memiliki aturan:

"Pengguna dapat mengakses dashboard jika sudah login, memiliki permission, dan tidak diblokir."

Definisikan:

P = Pengguna sudah login.

Q = Pengguna memiliki permission.

R = Pengguna diblokir.

S = Pengguna dapat mengakses dashboard.

Formula:

(P ∧ Q ∧ ¬R) → S

Jika sistem memiliki kondisi:

P = TRUE

Q = TRUE

R = FALSE

Maka:

(P ∧ Q ∧ ¬R) = TRUE

Berdasarkan aturan:

TRUE → S

Agar implikasi tetap TRUE, S harus TRUE.

Jadi:

S = TRUE

### Pertanyaan Analisis

Bagaimana jika pengguna:
- Sudah login.
- Tidak memiliki permission.
- Tidak diblokir.

Apakah pengguna dapat mengakses dashboard berdasarkan aturan tersebut?

Bagaimana jika pengguna:
- Sudah login.
- Memiliki permission.
- Diblokir?

Diskusikan bagaimana operator AND dan NOT memengaruhi keputusan sistem.

Catatan: Formula implikasi merupakan representasi aturan. Formula ini tidak otomatis menentukan nilai S jika antecedent tidak terpenuhi. Sistem akses nyata biasanya menggunakan kebijakan tambahan seperti default deny.

---

# 11. Kesimpulan Sesi 2

Propositional Logic merupakan cabang logika formal yang menggunakan proposisi dan operator logika untuk membentuk formula.

Proposisi adalah pernyataan yang memiliki nilai TRUE atau FALSE.

Proposisi dapat dibagi menjadi:

1. Atomic Proposition: pernyataan sederhana.
2. Compound Proposition: gabungan beberapa proposisi menggunakan operator logika.

Lima operator utama:

1. Negation (¬): membalik nilai kebenaran.
2. Conjunction (∧): TRUE jika seluruh proposisi TRUE.
3. Disjunction (∨): TRUE jika minimal satu proposisi TRUE.
4. Implication (→): FALSE hanya ketika antecedent TRUE dan consequent FALSE.
5. Biconditional (↔): TRUE ketika kedua proposisi memiliki nilai kebenaran yang sama.

Simbol-simbol tersebut dapat diterjemahkan menjadi operator boolean dalam bahasa pemrograman.

Dengan demikian, Propositional Logic menjadi fondasi untuk memahami bagaimana komputer mengevaluasi kondisi, menjalankan aturan, dan membentuk formula logika yang lebih kompleks.

---

# 12. Knowledge Check — Evaluasi Pemahaman

## Petunjuk

Jawablah seluruh pertanyaan menggunakan pemahaman sendiri.

Jangan hanya menghafalkan definisi. Berikan alasan dan contoh ketika diminta.

### Bagian A — Pemahaman Konsep

**Pertanyaan 1**

Apa yang dimaksud dengan proposisi?

Mengapa kalimat "Tolong tutup pintu!" bukan termasuk proposisi?

**Pertanyaan 2**

Apa perbedaan Atomic Proposition dan Compound Proposition?

Berikan masing-masing dua contoh.

**Pertanyaan 3**

Mengapa komputer menggunakan representasi TRUE dan FALSE untuk melakukan evaluasi logika?

Jelaskan hubungan proposisi dengan tipe data boolean dalam bahasa pemrograman.

### Bagian B — Pemahaman Logical Connectives

**Pertanyaan 4**

Diketahui:

P = Saya belajar.

Q = Saya mengerjakan tugas.

Tuliskan representasi formal dari pernyataan berikut:

a. Saya belajar dan mengerjakan tugas.

b. Saya belajar atau mengerjakan tugas.

c. Saya tidak belajar.

d. Jika saya belajar, maka saya mengerjakan tugas.

**Pertanyaan 5**

Apa perbedaan antara OR dan XOR?

Berikan contoh situasi nyata yang menggunakan OR dan contoh yang menggunakan XOR.

**Pertanyaan 6**

Mengapa formula P → Q bernilai TRUE ketika P = FALSE dan Q = FALSE?

Jelaskan menggunakan pemahaman Anda sendiri.

### Bagian C — Evaluasi Formula

**Pertanyaan 7**

Diketahui:

P = TRUE

Q = FALSE

R = TRUE

Tentukan hasil evaluasi:

a. P ∧ Q

b. P ∨ Q

c. ¬Q

d. P → Q

e. P ↔ R

**Pertanyaan 8**

Diberikan pernyataan:

"Jika pengguna login dan memiliki permission, maka pengguna dapat mengakses dashboard."

Definisikan proposisi P, Q, dan R, kemudian tuliskan formula logikanya.

**Pertanyaan 9**

Diberikan formula:

(P ∨ Q) ∧ ¬R

Dengan:

P = FALSE

Q = TRUE

R = TRUE

Tentukan nilai akhir formula dan jelaskan urutan evaluasinya.

### Bagian D — Computational Thinking

**Pertanyaan 10**

Anda diminta membuat sistem validasi registrasi pengguna.

Aturan:

"Pengguna dapat melakukan registrasi jika memiliki email atau nomor telepon, dan belum terdaftar sebelumnya."

Tentukan:

1. Proposisi yang diperlukan.
2. Simbol yang digunakan.
3. Formula logika.
4. Kondisi ketika registrasi diperbolehkan.
5. Contoh implementasi sederhana menggunakan JavaScript.

---

# 13. Rubrik Penilaian

Total nilai: 100 poin.

| Bagian | Nomor | Bobot |
|---|---|---:|
| Pemahaman konsep | 1–3 | 30 |
| Logical Connectives | 4–6 | 30 |
| Evaluasi formula | 7–9 | 30 |
| Computational Thinking | 10 | 10 |
| **Total** | **10 pertanyaan** | **100** |

## Kriteria Penilaian

| Skor | Kriteria |
|---|---|
| 4 | Jawaban benar, penjelasan logis, dan contoh sesuai |
| 3 | Jawaban benar tetapi penjelasan belum lengkap |
| 2 | Memahami sebagian konsep tetapi terdapat kesalahan |
| 1 | Jawaban kurang tepat |
| 0 | Tidak menjawab atau tidak relevan |

Untuk pertanyaan 10, gunakan bobot 10 poin berdasarkan kelengkapan representasi, formula, evaluasi, dan implementasi.

## Interpretasi Hasil

| Nilai | Interpretasi |
|---|---|
| 90–100 | Sangat memahami |
| 80–89 | Memahami |
| 70–79 | Cukup memahami |
| 60–69 | Perlu penguatan |
| Di bawah 60 | Belum memahami |

---

# 14. Indikator Pemahaman untuk Pengajar

| Konsep | Indikator pemahaman |
|---|---|
| Proposition | Mampu membedakan pernyataan dan bukan pernyataan |
| Atomic Proposition | Mampu mengidentifikasi proposisi sederhana |
| Compound Proposition | Mampu menggabungkan proposisi |
| Negation | Memahami pembalikan nilai TRUE/FALSE |
| Conjunction | Memahami bahwa seluruh kondisi harus TRUE |
| Disjunction | Memahami bahwa minimal satu kondisi harus TRUE |
| Implication | Memahami hubungan antecedent dan consequent |
| Biconditional | Memahami hubungan dua arah |
| Symbolic Representation | Mampu mengubah kalimat menjadi formula |
| Computational Logic | Mampu menghubungkan formula dengan evaluasi boolean dalam program |

**Catatan untuk pengajar:**

Berikan perhatian khusus pada pertanyaan 5, 6, 8, dan 10.

Pertanyaan tersebut dapat mengungkap apakah mahasiswa:
- Memahami perbedaan OR dan XOR.
- Memahami semantik implication.
- Mampu menerjemahkan bahasa alami menjadi formula.
- Mampu menghubungkan logika formal dengan implementasi program.

---

# 15. Transisi ke Sesi Berikutnya

Pada sesi ini, mahasiswa telah mempelajari simbol dan operator dasar dalam Propositional Logic.

Namun, ketika formula menjadi semakin kompleks, bagaimana cara menentukan apakah formula tersebut TRUE atau FALSE untuk seluruh kemungkinan kondisi?

Contohnya:

(P ∧ Q) → R

Untuk menjawab pertanyaan tersebut, mahasiswa perlu memahami Truth Table.

Topik Sesi 3:

**Truth Tables, Logical Evaluation & Well-Formed Formula**

Materi berikutnya:
1. Pengertian Truth Table.
2. Cara membuat Truth Table.
3. Evaluasi formula kompleks.
4. Operator precedence dan parentheses.
5. Well-Formed Formula.
6. Tautology, Contradiction, dan Contingency.

Pertanyaan pengantar:

"Jika terdapat tiga proposisi P, Q, dan R, berapa banyak kombinasi nilai TRUE dan FALSE yang harus diperiksa untuk mengetahui seluruh kemungkinan hasil formula?"

Pertanyaan tersebut menjadi awal pembelajaran Truth Table.