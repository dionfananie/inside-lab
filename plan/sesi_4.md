# Sesi 4 — Logical Equivalence, Logical Consequence & Validity

## 1. Learning Objectives

Setelah menyelesaikan sesi ini, mahasiswa diharapkan mampu:

1. Menjelaskan pengertian Logical Equivalence.
2. Membuktikan kesetaraan dua formula menggunakan Truth Table.
3. Memahami dan menerapkan hukum-hukum ekuivalensi logika.
4. Menjelaskan pengertian Logical Consequence (Entailment).
5. Membedakan Logical Equivalence dan Logical Consequence.
6. Menentukan validitas suatu argumen berdasarkan premis dan kesimpulan.
7. Membedakan Validity dan Soundness.
8. Mengidentifikasi kesalahan dalam proses penarikan kesimpulan.
9. Menggunakan logika untuk menganalisis argumen dalam kehidupan sehari-hari dan sistem komputer.

---

# 2. Review Sesi Sebelumnya

Pada Sesi 3, kita telah mempelajari Truth Table sebagai metode untuk mengevaluasi formula berdasarkan seluruh kemungkinan nilai kebenaran.

Kita juga telah mempelajari:

- Well-Formed Formula (WFF).
- Operator Precedence.
- Tautology.
- Contradiction.
- Contingency.
- Satisfiable dan Unsatisfiable.

Pada sesi sebelumnya, kita menggunakan Truth Table untuk mengetahui nilai kebenaran sebuah formula.

Sekarang, kita akan menggunakan kemampuan tersebut untuk menjawab pertanyaan yang lebih kompleks.

Contoh:

Diberikan dua formula:

```text
P → Q
```

Dan:

```text
¬P ∨ Q
```

Kedua formula tersebut memiliki struktur yang berbeda.

Namun, apakah keduanya memiliki makna logis yang sama?

Bagaimana cara membuktikannya?

Untuk menjawab pertanyaan tersebut, kita perlu memahami Logical Equivalence.

---

# 3. Logical Equivalence

## 3.1 Definisi

Logical Equivalence adalah hubungan antara dua formula logika yang selalu menghasilkan nilai kebenaran yang sama untuk seluruh kemungkinan interpretasi.

Dengan kata lain, dua formula disebut logically equivalent jika tidak ada satu pun kombinasi nilai proposisi yang menghasilkan perbedaan nilai kebenaran antara keduanya.

Simbol yang digunakan:

≡

Contoh:

```text
P → Q ≡ ¬P ∨ Q
```

Artinya:

Formula `P → Q` secara logis ekuivalen dengan formula `¬P ∨ Q`.

Walaupun bentuk penulisannya berbeda, keduanya memiliki nilai kebenaran yang sama pada setiap kemungkinan kombinasi P dan Q.

## 3.2 Mengapa Logical Equivalence Penting?

Logical Equivalence memungkinkan kita mengubah suatu formula menjadi bentuk lain tanpa mengubah makna logisnya.

Hal ini berguna untuk:

1. Menyederhanakan formula.
2. Membuktikan kesetaraan dua ekspresi.
3. Mengoptimalkan evaluasi formula.
4. Melakukan transformasi formula untuk SAT Solver.
5. Membantu proses pembuktian matematis.
6. Memverifikasi aturan dalam sistem komputer.

Contoh dalam pemrograman:

```javascript
const resultA = !p || q;
const resultB = !(p && !q);
```

Kedua ekspresi tersebut menghasilkan nilai Boolean yang sama untuk seluruh kombinasi p dan q.

Secara logika:

```text
¬P ∨ Q ≡ ¬(P ∧ ¬Q)
```

---

# 4. Membuktikan Logical Equivalence Menggunakan Truth Table

Salah satu cara untuk membuktikan Logical Equivalence adalah membandingkan hasil Truth Table dari dua formula.

Jika kedua kolom hasil selalu sama, maka kedua formula logically equivalent.

## 4.1 Contoh Pembuktian

Buktikan:

```text
P → Q ≡ ¬P ∨ Q
```

Langkah 1: Buat seluruh kombinasi P dan Q.

Langkah 2: Evaluasi formula pertama.

```text
P → Q
```

Langkah 3: Evaluasi formula kedua.

```text
¬P ∨ Q
```

Langkah 4: Bandingkan hasilnya.

Truth Table:

| P | Q | P → Q | ¬P | ¬P ∨ Q |
|---|---|---|---|---|
| T | T | T | F | T |
| T | F | F | F | F |
| F | T | T | T | T |
| F | F | T | T | T |

Perhatikan kolom:

- P → Q
- ¬P ∨ Q

Keduanya selalu menghasilkan nilai yang sama.

Kesimpulan:

```text
P → Q ≡ ¬P ∨ Q
```

Kedua formula terbukti logically equivalent.

## 4.2 Bagaimana Jika Hasilnya Berbeda?

Contoh:

```text
P ∧ Q
```

Dan:

```text
P ∨ Q
```

Truth Table:

| P | Q | P ∧ Q | P ∨ Q |
|---|---|---|---|
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | F |

Terdapat baris yang menghasilkan nilai berbeda.

Maka:

```text
P ∧ Q ≢ P ∨ Q
```

Kedua formula tidak logically equivalent.

**Kesimpulan:**

Untuk membuktikan Logical Equivalence menggunakan Truth Table, seluruh baris kedua formula harus memiliki nilai kebenaran yang sama.

---

# 5. Logical Laws (Hukum-Hukum Ekuivalensi Logika)

Selain Truth Table, kita dapat menggunakan hukum-hukum logika untuk melakukan transformasi formula.

Hukum-hukum ini memungkinkan kita menyederhanakan atau mengubah bentuk formula tanpa mengubah nilai kebenarannya.

## 5.1 Double Negation Law

Bentuk:

```text
¬(¬P) ≡ P
```

Artinya:

Negasi dari negasi suatu proposisi sama dengan proposisi itu sendiri.

Contoh:

P = Hari ini hujan.

¬P = Hari ini tidak hujan.

¬(¬P) = Tidak benar bahwa hari ini tidak hujan.

Sehingga kembali menjadi P.

## 5.2 De Morgan's Laws

De Morgan's Laws digunakan untuk mengubah negasi dari formula AND dan OR.

Hukum pertama:

```text
¬(P ∧ Q) ≡ ¬P ∨ ¬Q
```

Artinya:

Tidak benar bahwa P dan Q keduanya benar.

Sama dengan:

P salah atau Q salah.

Contoh:

P = Saya belajar.

Q = Saya mengerjakan tugas.

Formula:

```text
¬(P ∧ Q)
```

Artinya:

"Saya tidak melakukan keduanya secara bersamaan."

Secara ekuivalen:

```text
¬P ∨ ¬Q
```

Artinya:

"Saya tidak belajar atau saya tidak mengerjakan tugas, atau keduanya."

Hukum kedua:

```text
¬(P ∨ Q) ≡ ¬P ∧ ¬Q
```

Artinya:

Tidak benar bahwa P atau Q benar.

Sama dengan:

P salah dan Q salah.

Contoh:

P = Saya minum kopi.

Q = Saya minum teh.

Formula:

```text
¬(P ∨ Q)
```

Artinya:

"Saya tidak minum kopi maupun teh."

Secara ekuivalen:

```text
¬P ∧ ¬Q
```

## 5.3 Commutative Law

Urutan proposisi dalam AND dan OR dapat ditukar tanpa mengubah hasil.

```text
P ∧ Q ≡ Q ∧ P
```

```text
P ∨ Q ≡ Q ∨ P
```

Contoh:

"Saya belajar dan mengerjakan tugas."

Secara logika ekuivalen dengan:

"Saya mengerjakan tugas dan belajar."

Keduanya memiliki nilai kebenaran yang sama.

## 5.4 Associative Law

Pengelompokan proposisi pada AND dan OR dapat diubah tanpa mengubah hasil.

```text
(P ∧ Q) ∧ R ≡ P ∧ (Q ∧ R)
```

```text
(P ∨ Q) ∨ R ≡ P ∨ (Q ∨ R)
```

Contoh:

```text
(P ∧ Q) ∧ R
```

Ekuivalen dengan:

```text
P ∧ (Q ∧ R)
```

Keduanya mensyaratkan P, Q, dan R bernilai TRUE.

## 5.5 Distributive Law

AND dapat didistribusikan terhadap OR.

```text
P ∧ (Q ∨ R)
≡
(P ∧ Q) ∨ (P ∧ R)
```

OR juga dapat didistribusikan terhadap AND.

```text
P ∨ (Q ∧ R)
≡
(P ∨ Q) ∧ (P ∨ R)
```

Contoh:

```text
P ∧ (Q ∨ R)
```

Dapat diubah menjadi:

```text
(P ∧ Q) ∨ (P ∧ R)
```

Keduanya memiliki nilai kebenaran yang sama untuk seluruh kemungkinan interpretasi.

## 5.6 Implication Law

Implikasi dapat diubah menjadi kombinasi NOT dan OR.

```text
P → Q ≡ ¬P ∨ Q
```

Ini merupakan salah satu hukum paling penting dalam Propositional Logic.

Contoh:

"Jika pengguna login, maka pengguna dapat mengakses dashboard."

P = Pengguna login.

Q = Pengguna dapat mengakses dashboard.

Representasi:

```text
P → Q
```

Ekuivalen dengan:

```text
¬P ∨ Q
```

## 5.7 Biconditional Law

Biconditional dapat direpresentasikan menggunakan dua implication.

```text
P ↔ Q
≡
(P → Q) ∧ (Q → P)
```

Artinya:

- Jika P, maka Q.
- Jika Q, maka P.

Kedua kondisi harus terpenuhi.

## 5.8 Identity Law

```text
P ∧ TRUE ≡ P
```

```text
P ∨ FALSE ≡ P
```

Contoh:

Jika P bernilai TRUE, maka P AND TRUE tetap TRUE.

Jika P bernilai FALSE, maka P AND TRUE tetap FALSE.

Nilai P tidak berubah.

## 5.9 Domination Law

```text
P ∨ TRUE ≡ TRUE
```

```text
P ∧ FALSE ≡ FALSE
```

Artinya:

- P OR TRUE selalu TRUE.
- P AND FALSE selalu FALSE.

## 5.10 Idempotent Law

```text
P ∧ P ≡ P
```

```text
P ∨ P ≡ P
```

Mengulang proposisi yang sama menggunakan AND atau OR tidak mengubah hasil.

## 5.11 Ringkasan Logical Laws

| Nama Hukum | Formula |
|---|---|
| Double Negation | ¬¬P ≡ P |
| De Morgan 1 | ¬(P ∧ Q) ≡ ¬P ∨ ¬Q |
| De Morgan 2 | ¬(P ∨ Q) ≡ ¬P ∧ ¬Q |
| Commutative | P ∧ Q ≡ Q ∧ P |
| Associative | (P ∧ Q) ∧ R ≡ P ∧ (Q ∧ R) |
| Distributive | P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R) |
| Implication | P → Q ≡ ¬P ∨ Q |
| Biconditional | P ↔ Q ≡ (P → Q) ∧ (Q → P) |
| Identity | P ∧ TRUE ≡ P |
| Domination | P ∨ TRUE ≡ TRUE |
| Idempotent | P ∧ P ≡ P |

---

# 6. Logical Consequence (Entailment)

## 6.1 Definisi

Logical Consequence atau Logical Entailment adalah hubungan ketika suatu formula merupakan konsekuensi logis dari satu atau lebih premis.

Dengan kata lain, sebuah kesimpulan disebut logical consequence jika kesimpulan tersebut harus bernilai TRUE setiap kali seluruh premis bernilai TRUE.

Simbol:

```text
Γ ⊨ Q
```

Keterangan:

- Γ = Kumpulan premis.
- ⊨ = Entails atau secara logis mengakibatkan.
- Q = Kesimpulan.

Contoh:

```text
Premis 1:
P → Q

Premis 2:
P

Kesimpulan:
Q
```

Secara formal:

```text
{P → Q, P} ⊨ Q
```

Artinya:

Q merupakan konsekuensi logis dari kedua premis tersebut.

## 6.2 Contoh dalam Kehidupan Sehari-hari

Diberikan:

Premis 1:

Jika hujan, maka jalanan basah.

Premis 2:

Hari ini hujan.

Kesimpulan:

Jalanan basah.

Definisikan:

P = Hari ini hujan.

Q = Jalanan basah.

Formula:

```text
P → Q
P
∴ Q
```

Kesimpulan tersebut mengikuti premis secara logis.

## 6.3 Bagaimana Membuktikan Logical Consequence?

Salah satu metode adalah menggunakan Truth Table.

Prinsipnya:

Tidak boleh ada baris yang membuat seluruh premis TRUE tetapi kesimpulan FALSE.

Contoh:

Premis:

```text
P → Q
P
```

Kesimpulan:

```text
Q
```

Truth Table:

| P | Q | P → Q | P | Seluruh Premis TRUE? |
|---|---|---|---|---|
| T | T | T | T | Ya |
| T | F | F | T | Tidak |
| F | T | T | F | Tidak |
| F | F | T | F | Tidak |

Perhatikan:

Hanya baris pertama yang membuat seluruh premis TRUE.

Pada baris tersebut, Q juga TRUE.

Tidak ada kondisi ketika kedua premis TRUE tetapi Q FALSE.

Maka:

```text
{P → Q, P} ⊨ Q
```

Argumen tersebut merupakan logical consequence.

## 6.4 Counterexample dalam Logical Consequence

Untuk membuktikan bahwa suatu kesimpulan tidak mengikuti premis, kita dapat mencari counterexample.

Counterexample adalah interpretasi yang membuat:

- Seluruh premis TRUE.
- Kesimpulan FALSE.

Jika ditemukan kondisi tersebut, argumen tidak valid secara logis.

Contoh:

Premis 1:

```text
P → Q
```

Premis 2:

```text
Q
```

Kesimpulan:

```text
P
```

Apakah kesimpulan tersebut mengikuti kedua premis?

Coba assignment:

P = FALSE.

Q = TRUE.

Evaluasi:

Premis 1:

FALSE → TRUE = TRUE.

Premis 2:

TRUE.

Kesimpulan:

FALSE.

Ditemukan kondisi ketika seluruh premis TRUE tetapi kesimpulan FALSE.

Maka:

```text
{P → Q, Q} ⊭ P
```

Argumen tersebut tidak valid.

---

# 7. Perbedaan Logical Equivalence dan Logical Consequence

Kedua konsep ini sering membingungkan karena sama-sama membahas hubungan antarformula.

Namun, keduanya memiliki fungsi berbeda.

## 7.1 Logical Equivalence

Logical Equivalence membandingkan dua formula.

Pertanyaannya:

"Apakah kedua formula selalu menghasilkan nilai kebenaran yang sama?"

Contoh:

```text
P → Q ≡ ¬P ∨ Q
```

Kedua formula selalu memiliki hasil yang sama.

## 7.2 Logical Consequence

Logical Consequence membandingkan kumpulan premis dengan suatu kesimpulan.

Pertanyaannya:

"Apakah kesimpulan harus benar jika seluruh premis benar?"

Contoh:

```text
P → Q
P
∴ Q
```

Kesimpulan Q harus benar jika kedua premis benar.

## 7.3 Tabel Perbandingan

| Aspek | Logical Equivalence | Logical Consequence |
|---|---|---|
| Tujuan | Membandingkan dua formula | Menguji hubungan premis dan kesimpulan |
| Simbol | ≡ | ⊨ |
| Pertanyaan | Apakah hasil keduanya selalu sama? | Apakah kesimpulan mengikuti premis? |
| Metode | Membandingkan Truth Table | Memeriksa apakah ada counterexample |
| Contoh | P → Q ≡ ¬P ∨ Q | {P → Q, P} ⊨ Q |

## 7.4 Hubungan Keduanya

Terdapat hubungan matematis antara Logical Equivalence dan Logical Consequence.

Dua formula P dan Q disebut logically equivalent jika:

```text
P ⊨ Q
```

Dan:

```text
Q ⊨ P
```

Artinya, keduanya saling mengimplikasikan.

Dengan demikian:

```text
P ≡ Q
```

dapat dipahami sebagai dua arah entailment.

---

# 8. Validity (Validitas Argumen)

## 8.1 Definisi

Validity adalah sifat suatu argumen ketika tidak mungkin seluruh premis bernilai TRUE sementara kesimpulannya FALSE.

Argumen disebut valid jika kesimpulan mengikuti premis secara logis.

Validity tidak bergantung pada apakah premis tersebut benar secara faktual di dunia nyata.

Validity hanya membahas hubungan logis antara premis dan kesimpulan.

## 8.2 Contoh Argumen Valid

Diberikan:

1. Jika seseorang belajar, maka dia memahami materi.
2. Seseorang belajar.
3. Maka, seseorang memahami materi.

Representasi:

```text
P → Q
P
∴ Q
```

Argumen ini valid.

Mengapa?

Karena tidak ada kemungkinan kedua premis TRUE tetapi kesimpulan FALSE.

## 8.3 Contoh Argumen Tidak Valid

Diberikan:

1. Jika seseorang belajar, maka dia memahami materi.
2. Seseorang memahami materi.
3. Maka, seseorang belajar.

Representasi:

```text
P → Q
Q
∴ P
```

Argumen ini tidak valid.

Mengapa?

Karena seseorang mungkin memahami materi melalui pengalaman, membaca, atau cara belajar lainnya tanpa memenuhi P sesuai definisi yang diberikan.

Counterexample:

P = FALSE.

Q = TRUE.

Premis 1:

FALSE → TRUE = TRUE.

Premis 2:

TRUE.

Kesimpulan:

FALSE.

Kedua premis TRUE tetapi kesimpulan FALSE.

Jadi, argumen tersebut tidak valid.

## 8.4 Bentuk Argumen yang Perlu Diwaspadai

Dua pola kesalahan penalaran berikut sering muncul.

### A. Affirming the Consequent

Bentuk:

```text
P → Q
Q
∴ P
```

Pola ini tidak valid.

Contoh:

- Jika hujan, jalanan basah.
- Jalanan basah.
- Maka, hujan.

Kesimpulan tidak dapat dipastikan karena jalanan mungkin basah akibat penyebab lain.

### B. Denying the Antecedent

Bentuk:

```text
P → Q
¬P
∴ ¬Q
```

Pola ini juga tidak valid.

Contoh:

- Jika hujan, jalanan basah.
- Tidak hujan.
- Maka, jalanan tidak basah.

Jalanan masih mungkin basah karena penyebab lain.

Penting:

Kedua bentuk ini tidak valid dalam logika klasik karena tidak menjamin kesimpulan mengikuti premis.

---

# 9. Soundness (Argumen yang Sound)

## 9.1 Definisi

Soundness adalah sifat suatu argumen yang memenuhi dua kondisi:

1. Argumen tersebut valid secara logis.
2. Seluruh premisnya benar secara faktual.

Dengan demikian:

```text
Sound Argument = Valid Argument + True Premises
```

## 9.2 Contoh Argumen Valid tetapi Tidak Sound

Diberikan:

1. Semua kucing dapat terbang.
2. Miko adalah kucing.
3. Maka, Miko dapat terbang.

Representasi:

```text
P → Q
P
∴ Q
```

Argumen tersebut valid secara struktur.

Namun, premis bahwa semua kucing dapat terbang tidak benar secara faktual.

Maka, argumen tersebut tidak sound.

## 9.3 Contoh Argumen Sound

Diberikan:

1. Semua manusia adalah makhluk hidup.
2. Socrates adalah manusia.
3. Maka, Socrates adalah makhluk hidup.

Argumen tersebut:

- Valid secara logis.
- Memiliki premis yang benar.

Maka, argumen tersebut sound.

## 9.4 Perbandingan Validity dan Soundness

| Aspek | Validity | Soundness |
|---|---|---|
| Fokus | Struktur logis argumen | Struktur dan kebenaran premis |
| Premis harus faktual benar? | Tidak | Ya |
| Kesimpulan mengikuti premis? | Ya | Ya |
| Contoh | Semua kucing terbang; Miko kucing; Miko terbang | Semua manusia makhluk hidup; Socrates manusia; Socrates makhluk hidup |

## 9.5 Mengapa Perbedaan Ini Penting dalam AI?

Sistem AI berbasis aturan dapat menghasilkan kesimpulan yang benar berdasarkan aturan yang dimilikinya.

Namun, hasil tersebut belum tentu benar secara faktual jika fakta atau aturan yang digunakan salah.

Contoh:

```text
FACT:
All electric vehicles can fly.

FACT:
Car A is an electric vehicle.

RULE:
If something is an electric vehicle,
then it can fly.
```

Sistem dapat menyimpulkan:

```text
Car A can fly.
```

Proses reasoning mungkin valid berdasarkan pengetahuan yang diberikan.

Namun, pengetahuan awalnya salah.

Hal ini menunjukkan bahwa kualitas hasil reasoning tidak hanya bergantung pada algoritma, tetapi juga pada kualitas fakta dan aturan yang digunakan.

---

# 10. Penerapan Logical Equivalence dan Validity dalam Komputer

Konsep yang dipelajari tidak hanya digunakan dalam pembuktian matematis.

Konsep tersebut juga memiliki penerapan langsung dalam software engineering dan Artificial Intelligence.

## 10.1 Boolean Expression Optimization

Dalam pemrograman, dua ekspresi dapat memiliki hasil Boolean yang sama meskipun struktur penulisannya berbeda.

Contoh:

```javascript
const resultA = !(p && q);

const resultB = !p || !q;
```

Keduanya ekuivalen berdasarkan De Morgan's Law.

```text
¬(P ∧ Q) ≡ ¬P ∨ ¬Q
```

Penggunaan transformasi seperti ini dapat membantu menyederhanakan kondisi dan meningkatkan keterbacaan kode.

Namun, optimasi kode nyata juga perlu mempertimbangkan efek samping dan urutan evaluasi ekspresi.

## 10.2 Software Verification

Logical Equivalence dapat digunakan untuk memeriksa apakah dua implementasi kondisi menghasilkan perilaku Boolean yang sama.

Contoh:

```javascript
function canAccessA(isLoggedIn, hasPermission) {
  return isLoggedIn && hasPermission;
}

function canAccessB(isLoggedIn, hasPermission) {
  return !( !isLoggedIn || !hasPermission );
}
```

Kedua fungsi menghasilkan output yang sama untuk seluruh kombinasi input Boolean.

Kita dapat membuktikannya menggunakan Truth Table atau pengujian exhaustive untuk input Boolean yang terbatas.

## 10.3 SAT Solver

SAT Solver menggunakan prinsip satisfiability untuk menentukan apakah terdapat assignment yang membuat formula bernilai TRUE.

Contoh:

```text
(P ∨ Q) ∧ (¬P ∨ R)
```

Sistem mencari assignment yang memenuhi formula.

Konsep Logical Equivalence juga digunakan ketika formula diubah ke bentuk lain agar lebih mudah diproses oleh algoritma SAT.

## 10.4 Rule-Based Expert System

Expert System menggunakan fakta dan aturan untuk menghasilkan kesimpulan.

Contoh:

```text
FACT:
User is logged in.

RULE:
If user is logged in,
then user can access the dashboard.
```

Representasi:

```text
P → Q
P
∴ Q
```

Sistem menggunakan aturan logika untuk menarik kesimpulan.

## 10.5 Hubungan dengan Software Engineering

Dalam pengembangan aplikasi, kita sering menggunakan logika tanpa menyadarinya.

Contoh:

```javascript
if (
  isAuthenticated &&
  hasPermission &&
  !isBlocked
) {
  accessDashboard();
}
```

Formula:

```text
P ∧ Q ∧ ¬R
```

Logical reasoning membantu developer:

- Memeriksa kondisi yang mungkin terjadi.
- Menghindari kondisi yang bertentangan.
- Menyederhanakan Boolean expression.
- Memastikan aturan bisnis konsisten.
- Memverifikasi hasil suatu fungsi.

---

# 11. Kesalahan Umum dalam Memahami Materi

## Kesalahan 1: Menganggap Logical Equivalence Sama dengan Kesimpulan

Logical Equivalence membandingkan dua formula.

Logical Consequence menguji apakah kesimpulan mengikuti premis.

Keduanya memiliki tujuan berbeda.

## Kesalahan 2: Menganggap Jika P → Q dan Q Benar, Maka P Pasti Benar

Pola tersebut dikenal sebagai Affirming the Consequent.

Pola tersebut tidak valid.

## Kesalahan 3: Menganggap Validity Berarti Premis Benar

Validity hanya memastikan bahwa kesimpulan mengikuti premis secara logis.

Premis masih mungkin salah secara faktual.

## Kesalahan 4: Menganggap Argumen Tidak Sound Berarti Tidak Valid

Argumen dapat valid tetapi tidak sound.

Hal tersebut terjadi ketika struktur logisnya benar tetapi ada premis yang salah.

## Kesalahan 5: Menganggap Dua Formula dengan Bentuk Berbeda Pasti Memiliki Makna Berbeda

Contoh:

```text
P → Q
```

Dan:

```text
¬P ∨ Q
```

Keduanya memiliki bentuk berbeda tetapi secara logis ekuivalen.

---

# 12. Kesimpulan Sesi 4

Logical Equivalence merupakan hubungan antara dua formula yang selalu menghasilkan nilai kebenaran sama untuk seluruh interpretasi.

Logical Consequence merupakan hubungan ketika suatu kesimpulan harus benar jika seluruh premis benar.

Validity merupakan sifat argumen yang tidak memungkinkan seluruh premis benar sementara kesimpulan salah.

Soundness merupakan sifat argumen yang valid dengan seluruh premis benar secara faktual.

Konsep penting:

1. Logical Equivalence: dua formula memiliki hasil yang selalu sama.
2. Logical Laws: aturan untuk mengubah formula tanpa mengubah makna logis.
3. Logical Consequence: kesimpulan mengikuti premis.
4. Validity: tidak ada counterexample dengan premis TRUE dan kesimpulan FALSE.
5. Soundness: argumen valid dan seluruh premis benar.

**Inti pembelajaran:**

Logika formal tidak hanya membantu kita mengevaluasi pernyataan, tetapi juga membuktikan kesetaraan formula, menguji validitas argumen, dan memastikan bahwa kesimpulan benar-benar mengikuti informasi yang tersedia.

---

# 13. Knowledge Check — Evaluasi Pemahaman

## Petunjuk

Jawablah pertanyaan menggunakan pemahaman sendiri.

Untuk pertanyaan analisis, tunjukkan proses penalaran dan berikan contoh jika diminta.

### Bagian A — Pemahaman Konsep

**Pertanyaan 1**

Apa yang dimaksud dengan Logical Equivalence?

Bagaimana cara membuktikan bahwa dua formula logically equivalent?

**Pertanyaan 2**

Apa perbedaan Logical Equivalence dan Logical Consequence?

Berikan masing-masing satu contoh.

**Pertanyaan 3**

Apa perbedaan Validity dan Soundness?

Apakah sebuah argumen dapat valid tetapi tidak sound? Jelaskan menggunakan contoh.

### Bagian B — Logical Laws

**Pertanyaan 4**

Gunakan De Morgan's Law untuk mengubah formula berikut:

```text
¬(P ∨ Q)
```

Jelaskan mengapa hasil transformasinya ekuivalen.

**Pertanyaan 5**

Buktikan menggunakan Truth Table bahwa:

```text
P → Q ≡ ¬P ∨ Q
```

**Pertanyaan 6**

Sederhanakan formula berikut menggunakan hukum ekuivalensi:

```text
¬(¬P)
```

Sebutkan hukum yang digunakan.

### Bagian C — Logical Consequence dan Validity

**Pertanyaan 7**

Diberikan premis:

```text
P → Q
P
```

Kesimpulan:

```text
Q
```

Apakah kesimpulan tersebut merupakan logical consequence dari kedua premis?

Jelaskan menggunakan penalaran logis.

**Pertanyaan 8**

Diberikan argumen:

```text
P → Q
Q
∴ P
```

Apakah argumen tersebut valid?

Jika tidak, temukan counterexample menggunakan nilai TRUE dan FALSE.

**Pertanyaan 9**

Diberikan argumen:

1. Semua ikan adalah mamalia.
2. Nemo adalah ikan.
3. Maka, Nemo adalah mamalia.

Apakah argumen tersebut valid?

Apakah argumen tersebut sound?

Jelaskan perbedaan keduanya.

### Bagian D — Computational Thinking

**Pertanyaan 10**

Anda sedang melakukan code review terhadap dua fungsi berikut:

```javascript
function checkA(p, q) {
  return !(p && q);
}

function checkB(p, q) {
  return !p || !q;
}
```

Jawablah:

1. Apakah kedua fungsi menghasilkan output yang sama?
2. Hukum logika apa yang menjelaskan hubungan keduanya?
3. Bagaimana cara membuktikannya menggunakan Truth Table?
4. Mengapa konsep Logical Equivalence berguna dalam software engineering?

---

# 14. Rubrik Penilaian

Total nilai: 100 poin.

| Bagian | Nomor | Bobot |
|---|---|---:|
| Pemahaman konsep | 1–3 | 30 |
| Logical Laws | 4–6 | 25 |
| Logical Consequence dan Validity | 7–9 | 30 |
| Computational Thinking | 10 | 15 |
| **Total** | **10 pertanyaan** | **100** |

## Kriteria Penilaian

| Skor | Kriteria |
|---|---|
| 4 | Jawaban benar, penjelasan logis, dan pembuktian tepat |
| 3 | Jawaban benar tetapi penjelasan belum lengkap |
| 2 | Memahami sebagian konsep tetapi terdapat kesalahan |
| 1 | Jawaban kurang tepat |
| 0 | Tidak menjawab atau tidak relevan |

## Interpretasi Hasil

| Nilai | Interpretasi |
|---|---|
| 90–100 | Sangat memahami |
| 80–89 | Memahami |
| 70–79 | Cukup memahami |
| 60–69 | Perlu penguatan |
| Di bawah 60 | Belum memahami |

---

# 15. Indikator Pemahaman untuk Pengajar

| Konsep | Indikator pemahaman |
|---|---|
| Logical Equivalence | Mampu membuktikan kesetaraan formula |
| Truth Table | Mampu membandingkan hasil dua formula |
| Logical Laws | Mampu melakukan transformasi formula |
| De Morgan's Laws | Mampu mengubah negasi AND dan OR |
| Entailment | Mampu menentukan apakah kesimpulan mengikuti premis |
| Counterexample | Mampu menemukan kondisi yang membuktikan argumen tidak valid |
| Validity | Mampu mengevaluasi struktur argumen |
| Soundness | Mampu membedakan validitas dan kebenaran faktual |
| Computational Logic | Mampu menghubungkan ekuivalensi dengan evaluasi program |

**Catatan untuk pengajar:**

Perhatikan khususnya pertanyaan 3, 5, 8, 9, dan 10.

Pertanyaan tersebut dapat mengidentifikasi apakah mahasiswa benar-benar memahami perbedaan antara kesetaraan formula, hubungan premis-kesimpulan, validitas, dan kebenaran faktual.

---

# 16. Transisi ke Sesi Berikutnya

Pada sesi ini, mahasiswa telah mempelajari bagaimana membuktikan kesetaraan formula dan mengevaluasi validitas suatu argumen.

Namun, bagaimana komputer dapat menghasilkan kesimpulan secara otomatis dari sejumlah premis?

Misalnya:

```text
P → Q
P
```

Komputer dapat menghasilkan:

```text
Q
```

Bagaimana proses tersebut dilakukan tanpa harus membuat Truth Table untuk seluruh kemungkinan?

Untuk menjawab pertanyaan tersebut, kita akan mempelajari Rules of Inference.

## Topik Sesi 5 — Rules of Inference & Logical Reasoning

Materi berikutnya:

1. Pengertian Inference Rules.
2. Modus Ponens.
3. Modus Tollens.
4. Hypothetical Syllogism.
5. Disjunctive Syllogism.
6. Conjunction dan Simplification.
7. Resolution.
8. Forward Chaining.
9. Backward Chaining.
10. Implementasi inference engine sederhana.

Pertanyaan pengantar:

"Jika komputer diberikan beberapa fakta dan aturan, bagaimana komputer dapat menghasilkan fakta baru yang sebelumnya tidak diberikan secara eksplisit?"

Pertanyaan tersebut menjadi fondasi untuk memahami automated reasoning dan Rule-Based AI.