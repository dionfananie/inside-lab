# Sesi 1 — Introduction to Formal Logic

## 1. Learning Objectives

Setelah menyelesaikan sesi ini, mahasiswa diharapkan mampu:

1. Menjelaskan pengertian logika.
2. Menjelaskan pengertian logika formal.
3. Membedakan logika sehari-hari dengan logika formal.
4. Menjelaskan mengapa logika formal dibutuhkan dalam komputer dan Artificial Intelligence.
5. Mengidentifikasi tiga komponen utama logika formal: Syntax, Semantics, dan Inference Rules.
6. Menganalisis contoh sederhana penggunaan logika formal dalam kehidupan sehari-hari dan sistem komputer.

---

# 2. Apa Itu Logika?

## 2.1 Definisi Logika

Logika adalah ilmu yang mempelajari prinsip dan aturan penalaran untuk menentukan apakah suatu kesimpulan dapat ditarik secara benar dari sejumlah informasi atau pernyataan yang diberikan.

Manusia menggunakan logika dalam kehidupan sehari-hari untuk:

- Mengambil keputusan.
- Memecahkan masalah.
- Menganalisis informasi.
- Menilai suatu argumen.
- Menarik kesimpulan berdasarkan fakta.

### Contoh dalam kehidupan sehari-hari

Perhatikan tiga pernyataan berikut:

1. Jika hujan, maka jalanan basah.
2. Hari ini hujan.
3. Maka, jalanan basah.

Bagaimana seseorang bisa menghasilkan kesimpulan pada pernyataan ketiga?

Karena terdapat hubungan logis antara pernyataan pertama dan kedua.

Kita mengetahui bahwa:
- Hujan merupakan kondisi yang menyebabkan aturan pada pernyataan pertama berlaku.
- Kondisi hujan benar-benar terjadi.
- Oleh karena itu, berdasarkan kedua informasi tersebut, kita dapat menarik kesimpulan bahwa jalanan basah.

Proses menarik kesimpulan berdasarkan informasi dan aturan inilah yang disebut penalaran atau reasoning.

### Hal yang perlu dipahami

Logika tidak selalu membuktikan bahwa suatu pernyataan benar secara faktual.

Logika membantu memastikan bahwa proses penarikan kesimpulan konsisten dengan premis dan aturan yang digunakan.

Misalnya:

1. Semua kucing dapat terbang.
2. Miko adalah kucing.
3. Maka, Miko dapat terbang.

Kesimpulan tersebut valid secara logis jika kedua premis diterima sebagai benar.

Namun, premis pertama tidak benar dalam kenyataan.

Contoh ini menunjukkan bahwa kebenaran proses penalaran dan kebenaran fakta merupakan dua hal yang berbeda.

---

# 3. Apa Itu Logika Formal?

## 3.1 Definisi Logika Formal

Logika Formal (Formal Logic) adalah sistem penalaran yang menggunakan bahasa formal, simbol, aturan pembentukan formula, dan aturan interpretasi untuk merepresentasikan serta mengevaluasi pernyataan dan argumen secara sistematis.

Logika formal memungkinkan kita mengubah kalimat bahasa sehari-hari menjadi representasi yang lebih terstruktur dan tidak ambigu.

### Contoh: Bahasa sehari-hari

"Jika seseorang belajar, maka dia memahami materi."

Pernyataan tersebut dapat direpresentasikan menggunakan simbol:

P → Q

Keterangan:

- P = Seseorang belajar.
- Q = Seseorang memahami materi.
- → = Jika ... maka ...

Dengan demikian:

P → Q

Memiliki arti:

"Jika P benar, maka Q harus benar."

Simbol tersebut membuat suatu pernyataan dapat dianalisis menggunakan aturan formal.

## 3.2 Mengapa Menggunakan Simbol?

Bahasa sehari-hari memiliki beberapa keterbatasan ketika digunakan untuk penalaran formal.

### A. Ambiguitas

Satu kalimat dapat memiliki lebih dari satu interpretasi.

Contoh:

"Saya akan membeli kopi atau teh."

Apakah maksudnya:
- Hanya membeli salah satu?
- Membeli kopi dan teh sekaligus juga diperbolehkan?

Dalam logika formal, kita dapat membedakan inclusive OR dan exclusive OR.

### B. Ketidakkonsistenan

Bahasa manusia tidak selalu menggunakan istilah dengan makna yang konsisten.

Simbol formal memberikan aturan yang lebih jelas.

### C. Sulit dievaluasi secara otomatis

Komputer membutuhkan representasi yang terstruktur agar dapat mengevaluasi suatu pernyataan berdasarkan algoritma.

Dengan menggunakan simbol dan aturan formal, komputer dapat memproses pernyataan tersebut secara sistematis.

## 3.3 Perbedaan Logika Sehari-hari dan Logika Formal

| Aspek | Logika Sehari-hari | Logika Formal |
|---|---|---|
| Representasi | Bahasa alami | Simbol dan formula |
| Struktur | Dapat bervariasi | Mengikuti aturan formal |
| Ambiguitas | Bisa ambigu | Dirancang agar tidak ambigu |
| Evaluasi | Sering membutuhkan interpretasi manusia | Dapat dievaluasi berdasarkan aturan |
| Contoh | Jika hujan, jalan basah | P → Q |

Penting untuk dipahami bahwa logika formal bukan berarti bahasa sehari-hari tidak dapat digunakan untuk bernalar.

Logika formal memberikan cara untuk merepresentasikan dan mengevaluasi penalaran secara lebih presisi.

---

# 4. Mengapa Logika Formal Penting dalam Komputer dan AI?

## 4.1 Komputer Membutuhkan Representasi yang Terstruktur

Komputer memproses informasi melalui representasi data dan instruksi.

Misalnya, komputer dapat mengevaluasi:

```javascript
const temperature = 39;
const hasCough = true;

if (temperature > 38 && hasCough) {
  console.log("High risk");
}
```

Komputer tidak perlu memahami arti demam atau batuk seperti manusia.

Komputer hanya mengevaluasi:
- Apakah temperature > 38 bernilai TRUE?
- Apakah hasCough bernilai TRUE?
- Apakah kedua kondisi tersebut memenuhi operator AND?

Jika kedua kondisi benar, komputer menjalankan instruksi di dalam IF.

Ini merupakan contoh sederhana penerapan logika dalam pemrograman.

## 4.2 Logika Formal Membantu Komputer Melakukan Reasoning

Bayangkan komputer diberikan beberapa informasi:

Fakta:
- Hari ini hujan.
- Jika hujan, jalanan basah.

Dari informasi tersebut, komputer diharapkan dapat menghasilkan kesimpulan:

- Jalanan basah.

Bagaimana komputer dapat menghasilkan kesimpulan yang tidak diberikan secara langsung?

Karena komputer memiliki aturan yang digunakan untuk menghubungkan fakta dengan kesimpulan.

Inilah yang disebut automated reasoning.

Secara sederhana:

```text
FAKTA:
Hujan = TRUE

ATURAN:
Jika Hujan = TRUE
Maka JalanBasah = TRUE

KESIMPULAN:
JalanBasah = TRUE
```

Komputer dapat menjalankan proses tersebut tanpa harus diberitahu secara eksplisit bahwa jalanan basah.

## 4.3 Penerapan Logika Formal dalam Artificial Intelligence

Logika formal menjadi salah satu fondasi dalam pengembangan AI, khususnya sistem yang menggunakan penalaran berbasis aturan.

Beberapa penerapannya:

### A. Expert System

Expert System adalah sistem AI yang menggunakan kumpulan fakta dan aturan untuk menghasilkan keputusan atau rekomendasi.

Contoh:

Sistem rekomendasi troubleshooting komputer.

Aturan:

```text
IF computer_does_not_turn_on
AND power_indicator_is_off
THEN check_power_cable
```

Jika kedua kondisi terpenuhi, sistem dapat menyarankan pengguna untuk memeriksa kabel listrik.

### B. SAT Solver

SAT Solver adalah sistem yang menentukan apakah suatu formula logika dapat dibuat bernilai TRUE melalui kombinasi nilai variabel tertentu.

Contoh:

```text
(P OR Q) AND (NOT P OR R)
```

SAT Solver mencari kombinasi TRUE/FALSE yang memenuhi formula tersebut.

Teknologi ini digunakan dalam berbagai bidang, seperti:
- Software verification.
- Hardware verification.
- Scheduling.
- Constraint solving.

### C. Automated Theorem Proving

Teknologi ini memungkinkan komputer membuktikan suatu pernyataan berdasarkan premis dan aturan inferensi.

Contoh:

```text
Premis 1:
Jika P maka Q.

Premis 2:
P benar.

Kesimpulan:
Q benar.
```

Komputer dapat menghasilkan kesimpulan menggunakan aturan penalaran yang telah didefinisikan.

### D. Knowledge Representation

Knowledge Representation adalah cara menyimpan pengetahuan dalam bentuk yang dapat digunakan komputer untuk melakukan reasoning.

Contoh:

```text
Fakta:
Dion adalah mahasiswa.

Aturan:
Semua mahasiswa wajib mengikuti ujian.

Kesimpulan:
Dion wajib mengikuti ujian.
```

Pengetahuan tidak hanya disimpan sebagai teks, tetapi juga direpresentasikan melalui fakta dan aturan yang saling berhubungan.

## 4.4 Apakah Semua AI Menggunakan Logika Formal?

Tidak.

Logika formal merupakan salah satu pendekatan dalam Artificial Intelligence, bukan satu-satunya.

Contoh pendekatan AI:

| Pendekatan | Cara Kerja |
|---|---|
| Rule-Based AI | Menggunakan aturan dan fakta |
| Symbolic AI | Menggunakan representasi simbol dan reasoning |
| Machine Learning | Mempelajari pola dari data |
| Deep Learning | Menggunakan neural network untuk mempelajari representasi kompleks |
| LLM | Menghasilkan respons berdasarkan pola yang dipelajari dari data dan konteks |

Contohnya:

- Expert System menggunakan aturan eksplisit.
- Machine Learning dapat mempelajari pola dari data tanpa aturan yang ditulis satu per satu.
- LLM menghasilkan respons berdasarkan model yang telah dilatih.

Walaupun pendekatannya berbeda, logika formal tetap penting untuk memahami dasar penalaran, konsistensi, pembuktian, dan representasi pengetahuan.

---

# 5. Tiga Komponen Utama Logika Formal

Logika formal memiliki tiga komponen penting:

1. Syntax (Sintaksis)
2. Semantics (Semantik)
3. Inference Rules (Aturan Inferensi)

Ketiganya memiliki peran yang berbeda dan saling melengkapi.

## 5.1 Syntax (Sintaksis)

### Definisi

Syntax adalah aturan yang menentukan bagaimana simbol-simbol logika boleh disusun menjadi formula yang valid.

Syntax hanya memeriksa struktur dan susunan simbol.

Syntax tidak menentukan apakah sebuah pernyataan benar atau salah.

### Contoh

Formula:

```text
P AND Q
```

Strukturnya valid.

Formula:

```text
P → Q
```

Strukturnya juga valid.

Namun:

```text
AND P →
```

Bukan formula yang valid karena susunan simbolnya tidak mengikuti aturan syntax.

### Analogi dalam Programming

Perhatikan kode berikut:

```javascript
const age = 20;
```

Kode tersebut memiliki syntax yang valid.

Sementara:

```javascript
const = age 20;
```

Memiliki kesalahan syntax.

Compiler atau parser dapat mendeteksi kesalahan tersebut sebelum program dijalankan.

Hal serupa berlaku pada logika formal.

Parser dapat memeriksa apakah suatu formula mengikuti grammar yang telah ditentukan.

### Pertanyaan utama Syntax

"Apakah formula ini disusun dengan benar berdasarkan aturan logika?"

---

## 5.2 Semantics (Semantik)

### Definisi

Semantics adalah aturan yang menentukan makna suatu formula dan bagaimana menentukan nilai kebenarannya berdasarkan interpretasi tertentu.

Jika syntax memastikan formula disusun dengan benar, semantics menentukan apa arti formula tersebut dan apakah formula bernilai TRUE atau FALSE.

### Contoh

Diberikan formula:

```text
P → Q
```

Interpretasi:

```text
P = Saya makan durian.
Q = Saya mengalami sakit kepala.
```

Maka formula tersebut memiliki makna:

"Jika saya makan durian, maka saya mengalami sakit kepala."

Semantik operator implication menentukan hasil evaluasinya:

| P | Q | P → Q |
|---|---|---|
| TRUE | TRUE | TRUE |
| TRUE | FALSE | FALSE |
| FALSE | TRUE | TRUE |
| FALSE | FALSE | TRUE |

Perhatikan bahwa formula hanya bernilai FALSE ketika P benar dan Q salah.

Mengapa demikian?

Karena implikasi menyatakan bahwa setiap kali P terjadi, Q harus benar.

Jika P tidak terjadi, aturan tersebut tidak dilanggar.

### Syntax Valid Belum Tentu Bernilai TRUE

Misalnya:

```text
P AND Q
```

Formula tersebut valid secara syntax.

Namun jika:

```text
P = TRUE
Q = FALSE
```

Hasilnya:

```text
TRUE AND FALSE = FALSE
```

Artinya:
- Syntax menentukan apakah formula valid secara struktur.
- Semantics menentukan nilai kebenaran formula.

### Pertanyaan utama Semantics

"Apa makna formula ini dan kapan formula tersebut bernilai TRUE atau FALSE?"

---

## 5.3 Inference Rules (Aturan Inferensi)

### Definisi

Inference Rules adalah aturan formal yang digunakan untuk menghasilkan kesimpulan berdasarkan satu atau lebih premis.

Jika syntax membentuk formula dan semantics mengevaluasi formula, inference rules mengatur bagaimana kita dapat menarik kesimpulan dari informasi yang tersedia.

### Contoh: Modus Ponens

Diberikan dua premis:

```text
Premis 1:
P → Q

Premis 2:
P
```

Maka kesimpulannya:

```text
Q
```

Contoh dalam kehidupan sehari-hari:

```text
Premis 1:
Jika hujan, maka jalanan basah.

Premis 2:
Hari ini hujan.

Kesimpulan:
Jalanan basah.
```

Komputer dapat menggunakan aturan ini untuk menurunkan fakta baru.

### Contoh dalam Expert System

```text
FAKTA:
temperature_high = TRUE

ATURAN:
IF temperature_high = TRUE
THEN possible_fever = TRUE

KESIMPULAN:
possible_fever = TRUE
```

Sistem menggunakan fakta dan aturan untuk menghasilkan kesimpulan.

### Pertanyaan utama Inference Rules

"Bagaimana kita dapat menghasilkan kesimpulan berdasarkan premis yang tersedia?"

---

# 6. Hubungan antara Syntax, Semantics, dan Inference Rules

Ketiga komponen ini memiliki hubungan yang saling melengkapi.

Contoh:

```text
P = Hari ini hujan.
Q = Jalanan basah.

Formula:
P → Q
```

### Tahap 1: Syntax

Memastikan bahwa:

```text
P → Q
```

Merupakan formula yang valid.

### Tahap 2: Semantics

Menentukan makna:

"Jika hari ini hujan, maka jalanan basah."

Kemudian mengevaluasi nilai kebenarannya berdasarkan kondisi P dan Q.

### Tahap 3: Inference Rules

Diberikan:

```text
P → Q
P
```

Menggunakan Modus Ponens untuk mendapatkan:

```text
Q
```

### Ringkasan

| Komponen | Peran | Analogi |
|---|---|---|
| Syntax | Memastikan struktur formula valid | Grammar bahasa pemrograman |
| Semantics | Menentukan makna dan nilai kebenaran | Evaluasi ekspresi |
| Inference Rules | Menghasilkan kesimpulan | Proses reasoning |

**Konsep utama:** Komputer membutuhkan representasi yang benar secara struktur, interpretasi yang jelas, dan aturan penalaran untuk menghasilkan kesimpulan yang konsisten.

---

# 7. Ringkasan Sesi 1

Logika adalah ilmu yang mempelajari prinsip penalaran untuk menarik kesimpulan secara benar.

Logika formal merupakan sistem penalaran yang menggunakan simbol, struktur, dan aturan formal untuk merepresentasikan serta mengevaluasi pernyataan.

Logika formal penting dalam komputer dan AI karena memungkinkan informasi direpresentasikan secara terstruktur, dievaluasi, dan digunakan untuk melakukan automated reasoning.

Tiga komponen utama:

1. **Syntax:** Bagaimana simbol disusun menjadi formula yang valid.
2. **Semantics:** Apa makna formula dan bagaimana menentukan nilai kebenarannya.
3. **Inference Rules:** Bagaimana kesimpulan dihasilkan dari premis.

Ketiganya merupakan fondasi untuk mempelajari Propositional Logic, Predicate Logic, SAT Solver, dan Rule-Based AI pada sesi berikutnya.

---

# 8. Knowledge Check — Evaluasi Pemahaman

## Petunjuk

Jawab seluruh pertanyaan berdasarkan materi yang telah dipelajari.

Tujuan evaluasi ini bukan sekadar menguji kemampuan menghafal definisi, tetapi mengukur apakah mahasiswa benar-benar memahami konsep dan dapat menerapkannya.

### Bagian A — Pemahaman Konsep

**Pertanyaan 1**

Menurut pemahaman Anda, apa yang dimaksud dengan logika?

Jelaskan menggunakan bahasa Anda sendiri dan berikan satu contoh penerapannya dalam kehidupan sehari-hari.

**Pertanyaan 2**

Apa perbedaan antara logika sehari-hari dan logika formal?

Mengapa logika formal menggunakan simbol untuk merepresentasikan pernyataan?

**Pertanyaan 3**

Apakah suatu kesimpulan yang dihasilkan melalui proses logika pasti benar secara faktual?

Jelaskan menggunakan contoh.

### Bagian B — Penerapan Logika Formal

**Pertanyaan 4**

Perhatikan pernyataan berikut:

"Jika seseorang belajar dengan rajin, maka dia memahami materi."

Tentukan:
- Apa proposisi P?
- Apa proposisi Q?
- Bagaimana representasi formalnya?

**Pertanyaan 5**

Mengapa komputer tidak cukup hanya diberikan kalimat bahasa sehari-hari untuk melakukan reasoning secara konsisten?

Jelaskan hubungan antara simbol, aturan, dan proses evaluasi.

**Pertanyaan 6**

Sebuah sistem memiliki aturan:

```text
IF suhu > 38 AND batuk = TRUE
THEN possible_fever = TRUE
```

Diketahui:
- Suhu = 39.
- Batuk = TRUE.

Apa kesimpulan sistem?

Jelaskan bagaimana sistem mendapatkan kesimpulan tersebut.

### Bagian C — Memahami Tiga Komponen Logika Formal

**Pertanyaan 7**

Jelaskan perbedaan Syntax dan Semantics menggunakan contoh formula:

```text
P AND Q
```

Apakah formula tersebut selalu bernilai TRUE? Mengapa?

**Pertanyaan 8**

Diberikan formula:

```text
P → Q
```

Dengan:
- P = TRUE