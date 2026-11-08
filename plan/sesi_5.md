# Sesi 5 — Logical Consequence & Inference Rules

## 1. Informasi Sesi

**Topik:** Logical Consequence, Inference Rules, dan Automated Reasoning

**Materi prasyarat:**
- Sesi 1: Introduction to Formal Logic
- Sesi 2: Propositional Logic & Logical Symbols
- Sesi 3: Truth Tables & Logical Evaluation
- Sesi 4: Logical Equivalence, Logical Consequence & Validity

**Fokus pembelajaran:**

Mahasiswa memahami bagaimana sebuah sistem komputer dapat menarik kesimpulan baru berdasarkan fakta dan aturan yang tersedia menggunakan prinsip logika formal.

---

## 2. Learning Objectives

Setelah mengikuti sesi ini, mahasiswa diharapkan mampu:

1. Menjelaskan pengertian logical consequence.
2. Membedakan logical consequence dengan inference rules.
3. Memahami dan menerapkan beberapa inference rules.
4. Menarik kesimpulan dari sekumpulan fakta dan aturan.
5. Mengimplementasikan proses penalaran sederhana menggunakan program.
6. Memahami penerapan logical reasoning dalam expert system dan AI.

---

# 3. Review: Apa Itu Logical Consequence?

Pada sesi sebelumnya, kita telah mempelajari bahwa logical consequence merupakan hubungan antara sekumpulan premis dan sebuah kesimpulan.

Secara formal:

\[
KB \models Q
\]

Artinya, Knowledge Base (KB) secara logis mengimplikasikan Q.

Dengan kata lain, apabila seluruh premis dalam KB benar, maka Q harus benar.

### Contoh sederhana

Diketahui:

- P: Hari hujan.
- Q: Jalan menjadi basah.

Aturan:

\[
P \rightarrow Q
\]

Fakta:

\[
P
\]

Kesimpulan:

\[
Q
\]

Jika diketahui bahwa hari hujan dan terdapat aturan bahwa jika hari hujan maka jalan basah, kita dapat menyimpulkan bahwa jalan basah.

Kesimpulan tersebut merupakan logical consequence dari premis yang tersedia.

### Pertanyaan penting

Bagaimana komputer mengetahui bahwa Q dapat disimpulkan dari P dan P → Q?

Di sinilah kita membutuhkan **Inference Rules**.

---

# 4. Inference Rules

## 4.1 Pengertian Inference Rules

Inference rules adalah aturan formal yang digunakan untuk menurunkan kesimpulan dari satu atau beberapa premis.

Inference rules memberikan pola penalaran yang dapat digunakan untuk menghasilkan kesimpulan baru.

Salah satu inference rule yang paling terkenal adalah Modus Ponens.

## 4.2 Modus Ponens

Modus Ponens digunakan ketika kita mengetahui:

1. Jika P, maka Q.
2. P benar.

Maka kita dapat menyimpulkan Q.

Bentuk formal:

\[
\frac{P \rightarrow Q \quad P}{Q}
\]

Contoh:

- Jika seseorang login, maka seseorang memiliki session.
- Dion berhasil login.
- Maka Dion memiliki session.

Representasi logika:

\[
P \rightarrow Q
\]

\[
P
\]

\[
\therefore Q
\]

Contoh implementasi:

```javascript
const facts = {
  loggedIn: true,
};

const conclusion = facts.loggedIn
  ? true
  : false;

console.log(conclusion);
```

Kode tersebut menunjukkan penerapan sederhana pola Modus Ponens.

Namun, dalam sistem yang lebih kompleks, aturan dan fakta biasanya disimpan secara terpisah dan dievaluasi oleh inference engine.

## 4.3 Modus Tollens

Modus Tollens digunakan ketika kita mengetahui:

1. Jika P, maka Q.
2. Q salah.

Maka kita dapat menyimpulkan bahwa P salah.

Bentuk formal:

\[
\frac{P \rightarrow Q \quad \neg Q}{\neg P}
\]

Contoh:

- Jika server berjalan, maka endpoint dapat diakses.
- Endpoint tidak dapat diakses.
- Maka server tidak berjalan.

Representasi:

\[
P \rightarrow Q
\]

\[
\neg Q
\]

\[
\therefore \neg P
\]

**Catatan:** Contoh ini mengasumsikan bahwa aturan tersebut merupakan hubungan yang pasti. Dalam sistem nyata, endpoint mungkin tidak dapat diakses karena masalah jaringan atau firewall. Jadi, asumsi aturan harus diperhatikan.

## 4.4 Hypothetical Syllogism

Inference rule ini digunakan untuk menghubungkan dua implikasi.

Diketahui:

\[
P \rightarrow Q
\]

\[
Q \rightarrow R
\]

Maka:

\[
P \rightarrow R
\]

Contoh:

- Jika pengguna login, maka pengguna memiliki session.
- Jika pengguna memiliki session, maka pengguna dapat mengakses dashboard.
- Maka jika pengguna login, pengguna dapat mengakses dashboard.

## 4.5 Disjunctive Syllogism

Digunakan ketika terdapat dua kemungkinan dan salah satunya diketahui salah.

Diketahui:

\[
P \lor Q
\]

\[
\neg P
\]

Maka:

\[
Q
\]

Contoh:

- Sistem menggunakan database PostgreSQL atau MySQL.
- Sistem tidak menggunakan PostgreSQL.
- Maka sistem menggunakan MySQL.

Kesimpulan tersebut berlaku dengan asumsi bahwa kedua pilihan tersebut merupakan alternatif yang mencakup seluruh kemungkinan.

## 4.6 Ringkasan Inference Rules

| Inference Rule | Bentuk Formal |
|---|---|
| Modus Ponens | \(P \rightarrow Q,\ P \therefore Q\) |
| Modus Tollens | \(P \rightarrow Q,\ \neg Q \therefore \neg P\) |
| Hypothetical Syllogism | \(P \rightarrow Q,\ Q \rightarrow R \therefore P \rightarrow R\) |
| Disjunctive Syllogism | \(P \lor Q,\ \neg P \therefore Q\) |

---

# 5. Logical Consequence vs Inference Rules

Kedua konsep ini saling berhubungan, tetapi tidak sama.

| Logical Consequence | Inference Rules |
|---|---|
| Hubungan logis antara premis dan kesimpulan | Aturan untuk menurunkan kesimpulan |
| Menentukan apakah kesimpulan mengikuti premis | Menentukan bagaimana kesimpulan diturunkan |
| Bersifat semantik | Biasanya dijelaskan secara sintaktis |

Contoh:

Diketahui:

\[
P \rightarrow Q
\]

\[
P
\]

Kita ingin mengetahui apakah Q merupakan konsekuensi logis dari kedua premis tersebut.

Jawabannya:

\[
\{P \rightarrow Q, P\} \models Q
\]

Kita dapat membuktikannya menggunakan Modus Ponens:

\[
\frac{P \rightarrow Q \quad P}{Q}
\]

Jadi:

- Logical consequence menyatakan bahwa Q memang mengikuti premis.
- Modus Ponens menyediakan cara formal untuk menurunkan Q.

---

# 6. Automated Reasoning

## 6.1 Apa Itu Automated Reasoning?

Automated reasoning adalah proses ketika komputer melakukan penalaran secara otomatis berdasarkan representasi fakta, aturan, dan prosedur logika.

Komputer tidak harus memahami bahasa manusia seperti manusia memahami percakapan.

Komputer dapat memproses representasi formal yang telah diberikan kepadanya.

Misalnya:

**Fakta:**

\[
Registered(Dion)
\]

**Aturan:**

\[
Registered(x) \land NoFine(x)
\rightarrow EligibleToBorrow(x)
\]

**Fakta tambahan:**

\[
NoFine(Dion)
\]

Maka sistem dapat menyimpulkan:

\[
EligibleToBorrow(Dion)
\]

Komputer memperoleh kesimpulan baru berdasarkan fakta dan aturan yang tersedia.

## 6.2 Knowledge Base

Knowledge Base (KB) adalah tempat menyimpan fakta dan aturan yang diketahui sistem.

Contoh:

```text
Facts:
- registered(dion)
- no_fine(dion)

Rules:
- registered(X) AND no_fine(X)
  -> eligible_to_borrow(X)
```

Knowledge Base tidak hanya berisi data, tetapi juga pengetahuan dalam bentuk aturan.

## 6.3 Inference Engine

Inference Engine adalah bagian dari sistem yang mengevaluasi fakta dan aturan untuk menghasilkan kesimpulan.

Secara sederhana, prosesnya:

1. Membaca fakta dari Knowledge Base.
2. Memeriksa aturan yang tersedia.
3. Mengevaluasi kondisi aturan.
4. Menurunkan kesimpulan jika kondisi terpenuhi.
5. Menambahkan kesimpulan baru ke Knowledge Base jika sistem mendukungnya.
6. Mengulangi proses jika masih ada aturan yang dapat diterapkan.

---

# 7. Implementasi Logical Reasoning dengan JavaScript

Sekarang kita akan membuat sistem sederhana yang dapat menarik kesimpulan dari fakta dan aturan.

## 7.1 Menyiapkan Knowledge Base

```javascript
const facts = {
  registered: true,
  noFine: true,
};

const rules = [
  {
    conditions: ["registered", "noFine"],
    conclusion: "eligibleToBorrow",
  },
];
```

Kita memiliki dua fakta:

- Pengguna sudah terdaftar.
- Pengguna tidak memiliki denda.

Aturannya:

Jika pengguna terdaftar DAN tidak memiliki denda, maka pengguna boleh meminjam buku.

## 7.2 Membuat Inference Engine

```javascript
function infer(facts, rules) {
  const conclusions = [];

  for (const rule of rules) {
    const conditionsSatisfied =
      rule.conditions.every(
        (condition) => facts[condition] === true
      );

    if (conditionsSatisfied) {
      conclusions.push(rule.conclusion);
    }
  }

  return conclusions;
}

const result = infer(facts, rules);

console.log(result);
// ["eligibleToBorrow"]
```

## 7.3 Bagaimana Prosesnya?

Sistem melakukan langkah berikut:

1. Membaca aturan.
2. Memeriksa apakah `registered` bernilai true.
3. Memeriksa apakah `noFine` bernilai true.
4. Karena semua kondisi terpenuhi, sistem menghasilkan kesimpulan `eligibleToBorrow`.

Perhatikan bahwa sistem tidak secara eksplisit diberi fakta bahwa pengguna boleh meminjam buku.

Kesimpulan tersebut dihasilkan dari aturan dan fakta yang tersedia.

Inilah salah satu bentuk automated reasoning.

**Batasan implementasi:** Kode ini baru menangani kondisi AND dan fakta bernilai true. Belum mendukung negasi, OR, aturan bertingkat, konflik antaraturan, atau pembuktian formal secara umum.

---

# 8. Forward Chaining dan Backward Chaining

Ada dua pendekatan umum untuk melakukan penalaran dalam rule-based system.

## 8.1 Forward Chaining

Forward chaining adalah pendekatan yang dimulai dari fakta yang diketahui, kemudian mencari aturan yang kondisinya terpenuhi untuk menghasilkan kesimpulan baru.

Contoh:

Fakta:

\[
P
\]

Aturan:

\[
P \rightarrow Q
\]

\[
Q \rightarrow R
\]

Proses:

1. Sistem mengetahui P.
2. Aturan pertama cocok, sehingga sistem menyimpulkan Q.
3. Q menjadi fakta baru.
4. Aturan kedua cocok, sehingga sistem menyimpulkan R.

Hasil:

\[
P \Rightarrow Q \Rightarrow R
\]

Forward chaining cocok ketika sistem memiliki banyak fakta dan ingin mengetahui semua kesimpulan yang dapat dihasilkan.

Contoh penggunaan:
- Sistem rekomendasi berbasis aturan.
- Monitoring sistem.
- Sistem deteksi berdasarkan kondisi.
- Expert system yang memproses banyak fakta.

## 8.2 Backward Chaining

Backward chaining dimulai dari kesimpulan yang ingin dibuktikan, kemudian mencari fakta dan aturan yang dapat mendukung kesimpulan tersebut.

Misalnya, sistem ingin membuktikan:

\[
EligibleToBorrow(Dion)
\]

Sistem mencari aturan:

\[
Registered(x) \land NoFine(x)
\rightarrow EligibleToBorrow(x)
\]

Kemudian sistem memeriksa dua kondisi:

- Apakah `Registered(Dion)` benar?
- Apakah `NoFine(Dion)` benar?

Jika keduanya benar, tujuan berhasil dibuktikan.

Backward chaining cocok ketika sistem hanya perlu menjawab pertanyaan tertentu.

Contoh penggunaan:
- Sistem diagnosis.
- Sistem tanya jawab berbasis aturan.
- Sistem konsultasi.
- Prolog dan logic programming.

## 8.3 Perbandingan

| Forward Chaining | Backward Chaining |
|---|---|
| Berangkat dari fakta | Berangkat dari tujuan |
| Mencari kesimpulan yang dapat dihasilkan | Mencari bukti untuk tujuan |
| Data-driven | Goal-driven |
| Dapat menghasilkan banyak kesimpulan | Fokus pada kesimpulan tertentu |

---

# 9. Hubungan dengan Prolog

Prolog merupakan bahasa pemrograman logic programming yang menggunakan fakta, aturan, dan query.

Contoh:

```prolog
registered(dion).
no_fine(dion).

eligible_to_borrow(X) :-
    registered(X),
    no_fine(X).
```

Query:

```prolog
?- eligible_to_borrow(dion).
```

Hasil:

```text
true.
```

Mengapa hasilnya true?

Karena Prolog menemukan:

1. `registered(dion)` bernilai benar.
2. `no_fine(dion)` bernilai benar.
3. Aturan `eligible_to_borrow(X)` mensyaratkan kedua kondisi tersebut.

Maka Prolog dapat membuktikan bahwa:

```prolog
eligible_to_borrow(dion)
```

Prolog menggunakan mekanisme unification dan backward chaining untuk mencari pembuktian terhadap query.

---

# 10. Logical Reasoning dalam Software Engineering

Logical reasoning juga digunakan dalam berbagai bidang software engineering.

## 10.1 Access Control

Menentukan apakah pengguna memiliki hak akses terhadap suatu resource.

Aturan:

\[
AdminRole(x) \land Authenticated(x)
\rightarrow CanAccessDashboard(x)
\]

Jika pengguna memiliki role admin dan sudah terautentikasi, sistem dapat menyimpulkan bahwa pengguna boleh mengakses dashboard.

## 10.2 Business Rules

Misalnya sistem e-commerce memiliki aturan:

\[
Paid(order) \land StockAvailable(order)
\rightarrow CanProcessOrder(order)
\]

Sistem dapat menentukan apakah pesanan dapat diproses.

## 10.3 Program Verification

Dalam program verification, logika digunakan untuk membuktikan bahwa program memenuhi spesifikasi tertentu.

Contoh:

```javascript
function withdraw(balance, amount) {
  if (amount <= balance) {
    return balance - amount;
  }

  return balance;
}
```

Kita ingin memastikan bahwa saldo tidak pernah negatif.

Spesifikasi sederhananya:

\[
balance \geq 0
\]

Jika:

\[
amount \leq balance
\]

maka setelah penarikan:

\[
balance - amount \geq 0
\]

Dengan asumsi saldo awal tidak negatif, aturan ini dapat digunakan untuk membuktikan bahwa hasil penarikan tetap tidak negatif.

---

# 11. Kesalahpahaman yang Perlu Dihindari

### 1. Logical consequence bukan sekadar menjalankan IF-ELSE

IF-ELSE dalam program adalah instruksi yang dieksekusi berdasarkan kondisi.

Logical consequence adalah hubungan semantik yang menyatakan bahwa suatu kesimpulan mengikuti premis.

IF-ELSE dapat digunakan untuk mengimplementasikan aturan logika tertentu, tetapi keduanya tidak identik.

### 2. Komputer tidak otomatis mengetahui fakta dunia nyata

Jika Knowledge Base menyimpan fakta yang salah, sistem dapat menghasilkan kesimpulan yang salah secara faktual meskipun proses inferensinya benar.

### 3. Kesimpulan baru tidak selalu harus dimasukkan ke database permanen

Kesimpulan dapat disimpan sementara selama proses reasoning, dihitung kembali, atau disimpan sebagai fakta turunan sesuai kebutuhan sistem.

### 4. Tidak semua inference rule menghasilkan kesimpulan yang valid

Contoh pola yang salah:

\[
P \rightarrow Q
\]

\[
Q
\]

\[
\therefore P
\]

Ini disebut affirming the consequent dan merupakan kesalahan penalaran.

---

# 12. Aktivitas Pembelajaran: Membuat Rule-Based Expert System

## Problem-Based Learning

### Studi Kasus: Sistem Kelayakan Peminjaman Buku

Sebuah perpustakaan ingin membuat sistem yang dapat menentukan apakah pengguna boleh meminjam buku.

Sistem memiliki aturan berikut:

1. Pengguna harus terdaftar.
2. Pengguna tidak boleh memiliki denda.
3. Pengguna tidak boleh sedang terkena pemblokiran.
4. Jika seluruh kondisi terpenuhi, pengguna boleh meminjam buku.

### Representasi Proposisi

- P: Pengguna terdaftar.
- Q: Pengguna tidak memiliki denda.
- R: Pengguna tidak diblokir.
- S: Pengguna boleh meminjam buku.

Aturan:

\[
(P \land Q \land R) \rightarrow S
\]

### Tugas Mahasiswa

1. Tentukan fakta yang perlu disimpan dalam Knowledge Base.
2. Representasikan aturan menggunakan simbol logika.
3. Buat minimal tiga skenario pengguna dengan kondisi berbeda.
4. Tentukan apakah pengguna boleh meminjam buku.
5. Implementasikan aturan menggunakan JavaScript.
6. Jelaskan bagaimana sistem memperoleh kesimpulannya.
7. Identifikasi apa yang terjadi jika salah satu fakta tidak diketahui.

### Skenario Pengujian

| Skenario | P | Q | R | Hasil yang diharapkan |
|---|---|---|---|---|
| A | True | True | True | Boleh meminjam |
| B | True | False | True | Tidak boleh meminjam |
| C | True | True | False | Tidak boleh meminjam |
| D | False | True | True | Tidak boleh meminjam |

### Pertanyaan Analisis

1. Mengapa sistem dapat menghasilkan kesimpulan bahwa pengguna boleh meminjam buku?
2. Apakah kesimpulan tersebut merupakan logical consequence dari fakta dan aturan?
3. Apa perbedaan antara fakta yang diberikan dengan kesimpulan yang dihasilkan sistem?
4. Apakah program tersebut menggunakan Modus Ponens?
5. Bagaimana jika pengguna memiliki status denda yang tidak diketahui?
6. Apa perbedaan jika sistem menggunakan forward chaining dan backward chaining?

---

# 13. Assessment

## A. Pemahaman Konsep

Jawab pertanyaan berikut:

1. Apa yang dimaksud dengan logical consequence?
2. Apa fungsi inference rules?
3. Apa perbedaan Modus Ponens dan Modus Tollens?
4. Apa perbedaan forward chaining dan backward chaining?
5. Apa fungsi Knowledge Base dalam expert system?
6. Apa fungsi Inference Engine?
7. Mengapa fakta yang salah dapat menghasilkan kesimpulan yang salah?

## B. Analisis Logika

Diketahui:

\[
P \rightarrow Q
\]

\[
Q \rightarrow R
\]

\[
P
\]

Pertanyaan:

1. Kesimpulan apa yang dapat diturunkan?
2. Inference rules apa yang digunakan?
3. Apakah R merupakan logical consequence dari ketiga premis tersebut?

## C. Implementasi

Buat program sederhana yang menerima fakta:

```javascript
const facts = {
  isLoggedIn: true,
  hasActiveSubscription: true,
  accountSuspended: false,
};
```

Aturan:

- Pengguna harus login.
- Pengguna harus memiliki subscription aktif.
- Akun tidak boleh suspended.

Jika seluruh kondisi terpenuhi, sistem menyimpulkan pengguna dapat mengakses fitur premium.

Mahasiswa harus mengimplementasikan:
- Knowledge Base.
- Rules.
- Inference Engine.
- Kesimpulan yang dihasilkan.

---

# 14. Rubrik Penilaian

| Aspek | Bobot |
|---|---:|
| Ketepatan representasi logika | 20% |
| Pemahaman inference rules | 20% |
| Ketepatan proses penalaran | 25% |
| Implementasi program | 25% |
| Penjelasan dan analisis | 10% |
| **Total** | **100%** |

---

# 15. Indikator Keberhasilan Pembelajaran

Mahasiswa dianggap memahami materi apabila mampu:

- Menjelaskan logical consequence dengan contoh.
- Membedakan logical consequence dan inference rules.
- Menggunakan Modus Ponens untuk menarik kesimpulan.
- Memahami proses forward chaining dan backward chaining.
- Mengubah fakta dan aturan menjadi representasi logika.
- Membuat program sederhana yang menghasilkan kesimpulan berdasarkan aturan.

---

# 16. Kesimpulan

Pada sesi ini kita telah mempelajari bagaimana logika formal dapat digunakan untuk melakukan penalaran secara otomatis.

Konsep-konsep utama:

1. **Logical Consequence:** menentukan apakah kesimpulan mengikuti premis.
2. **Inference Rules:** aturan untuk menurunkan kesimpulan.
3. **Knowledge Base:** menyimpan fakta dan aturan.
4. **Inference Engine:** memproses fakta dan aturan untuk menghasilkan kesimpulan.
5. **Forward Chaining:** memulai reasoning dari fakta.
6. **Backward Chaining:** memulai reasoning dari tujuan.

Inti pembelajaran:

> Komputer dapat menghasilkan kesimpulan baru bukan karena komputer memiliki pemahaman seperti manusia, melainkan karena pengetahuan direpresentasikan dalam bentuk yang dapat diproses dan aturan penalaran diterapkan secara sistematis.

---

# 17. Transisi ke Sesi Berikutnya

Setelah mahasiswa memahami bagaimana fakta dan aturan digunakan untuk menarik kesimpulan, pertanyaan selanjutnya adalah:

**Bagaimana jika sistem memiliki banyak aturan dan fakta, dan kita ingin mencari kombinasi yang memenuhi suatu kondisi logika?**

Topik berikutnya adalah:

**Sesi 6 — Predicate Logic & First-Order Logic**

Materi yang akan dipelajari:

- Keterbatasan propositional logic.
- Predicate dan argument.
- Variables dan constants.
- Universal quantifier (∀).
- Existential quantifier (∃).
- Representasi pengetahuan menggunakan predicate logic.
- Penerapan predicate logic dalam AI dan Prolog.
