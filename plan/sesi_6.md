# Sesi 6 — Predicate Logic & First-Order Logic

## 1. Informasi Sesi

**Topik:** Predicate Logic dan First-Order Logic (FOL)

**Materi prasyarat:**
- Sesi 1: Introduction to Formal Logic
- Sesi 2: Propositional Logic & Logical Symbols
- Sesi 3: Truth Tables & Logical Evaluation
- Sesi 4: Logical Equivalence, Logical Consequence & Validity
- Sesi 5: Logical Consequence & Inference Rules

**Fokus pembelajaran:**

Mahasiswa memahami bagaimana merepresentasikan pengetahuan yang lebih kompleks menggunakan predicate, variable, constant, function, dan quantifier.

---

# 2. Learning Objectives

Setelah mengikuti sesi ini, mahasiswa diharapkan mampu:

1. Menjelaskan keterbatasan propositional logic.
2. Menjelaskan pengertian predicate logic dan first-order logic.
3. Membedakan proposition dan predicate.
4. Memahami penggunaan constant, variable, function, dan predicate.
5. Memahami universal quantifier dan existential quantifier.
6. Mengubah kalimat bahasa alami menjadi representasi predicate logic.
7. Melakukan penalaran sederhana menggunakan predicate logic.
8. Memahami penerapan predicate logic dalam AI dan logic programming.

---

# 3. Review: Keterbatasan Propositional Logic

Pada sesi sebelumnya, kita telah mempelajari propositional logic.

Propositional logic merepresentasikan pernyataan menggunakan simbol seperti P, Q, dan R.

Contoh:

- P: Dion adalah mahasiswa.
- Q: Dion mengambil mata kuliah AI.
- R: Dion lulus mata kuliah AI.

Kita dapat merepresentasikan hubungan tersebut:

\[
P \land Q \rightarrow R
\]

Namun, propositional logic memiliki keterbatasan.

## 3.1 Masalah ketika jumlah objek bertambah

Misalnya terdapat aturan:

> Semua mahasiswa wajib mengikuti ujian.

Jika kita menggunakan propositional logic, kita harus membuat proposisi untuk setiap mahasiswa:

\[
P_1 \rightarrow Q_1
\]

\[
P_2 \rightarrow Q_2
\]

\[
P_3 \rightarrow Q_3
\]

Dan seterusnya.

Jika terdapat 10.000 mahasiswa, kita harus membuat banyak proposisi secara terpisah.

Selain itu, propositional logic tidak secara langsung merepresentasikan hubungan umum antara mahasiswa dan ujian.

Kita membutuhkan representasi yang lebih fleksibel.

## 3.2 Solusi: Predicate Logic

Predicate logic memungkinkan kita membuat pernyataan menggunakan variabel.

Contoh:

\[
Student(x) \rightarrow MustTakeExam(x)
\]

Artinya:

> Jika x adalah mahasiswa, maka x wajib mengikuti ujian.

Kita tidak perlu menulis aturan untuk setiap mahasiswa.

Variabel x dapat merepresentasikan berbagai objek dalam domain pembicaraan.

Inilah salah satu keunggulan predicate logic.

---

# 4. Apa Itu Predicate Logic?

Predicate logic adalah sistem logika formal yang memungkinkan kita merepresentasikan objek, properti objek, dan hubungan antarobjek.

Berbeda dengan propositional logic yang memperlakukan pernyataan sebagai satu kesatuan, predicate logic memungkinkan kita melihat struktur internal sebuah pernyataan.

Contoh kalimat:

> Dion adalah mahasiswa.

Dalam propositional logic:

\[
P
\]

Dalam predicate logic:

\[
Student(Dion)
\]

Penjelasan:

- `Student` adalah predicate.
- `Dion` adalah objek atau constant.
- Pernyataan tersebut menyatakan bahwa Dion memiliki properti sebagai mahasiswa.

Contoh lain:

> Dion menyukai matematika.

\[
Likes(Dion, Mathematics)
\]

Predicate `Likes` memiliki dua argument, yaitu Dion dan Mathematics.

Dengan demikian, predicate logic dapat merepresentasikan hubungan antara objek.

---

# 5. Komponen dalam Predicate Logic

Ada beberapa komponen utama yang perlu dipahami.

## 5.1 Constant

Constant digunakan untuk merepresentasikan objek tertentu.

Contoh:

\[
Dion
\]

\[
Jakarta
\]

\[
Mathematics
\]

Constant merujuk pada objek tertentu dalam suatu domain.

Contoh:

\[
Student(Dion)
\]

Artinya Dion merupakan mahasiswa.

## 5.2 Variable

Variable digunakan untuk merepresentasikan objek yang belum ditentukan secara spesifik.

Contoh:

\[
Student(x)
\]

Artinya x adalah mahasiswa.

Nilai x dapat merujuk pada Dion, Budi, Andi, atau objek lain dalam domain yang relevan.

Perbedaan:

| Constant | Variable |
|---|---|
| Merujuk pada objek tertentu | Merepresentasikan objek secara umum |
| Contoh: Dion | Contoh: x |
| Nilainya ditentukan | Nilainya bergantung pada interpretasi atau assignment |

## 5.3 Predicate

Predicate menyatakan properti atau hubungan antarobjek.

Contoh predicate dengan satu argument:

\[
Student(Dion)
\]

\[
Human(Dion)
\]

\[
Adult(Dion)
\]

Contoh predicate dengan dua argument:

\[
Likes(Dion, Mathematics)
\]

\[
Teaches(John, AI)
\]

\[
Owns(Dion, Laptop)
\]

Jumlah argument disebut arity.

Contoh:

- `Student(x)` memiliki arity 1.
- `Likes(x, y)` memiliki arity 2.
- `Between(x, y, z)` memiliki arity 3.

Predicate dapat menghasilkan nilai True atau False berdasarkan interpretasi terhadap objek dan hubungan yang direpresentasikan.

## 5.4 Function

Function digunakan untuk merepresentasikan suatu pemetaan dari objek ke objek lain.

Contoh:

\[
FatherOf(Dion)
\]

Artinya objek yang merupakan ayah dari Dion.

Contoh lain:

\[
AgeOf(Dion)
\]

Dalam representasi first-order logic, function menghasilkan suatu term atau objek, bukan langsung nilai kebenaran.

Contoh:

\[
Human(FatherOf(Dion))
\]

Artinya ayah Dion adalah manusia.

Perbedaan:

- Predicate menghasilkan nilai kebenaran.
- Function menghasilkan objek atau term.

## 5.5 Ringkasan Komponen

| Komponen | Fungsi | Contoh |
|---|---|---|
| Constant | Objek tertentu | `Dion` |
| Variable | Objek umum | `x` |
| Predicate | Properti atau hubungan | `Student(x)` |
| Function | Menghasilkan objek lain | `FatherOf(x)` |

---

# 6. Quantifier

Quantifier digunakan untuk menyatakan berapa banyak objek dalam suatu domain yang memenuhi kondisi tertentu.

Ada dua quantifier utama dalam first-order logic:

1. Universal Quantifier (∀)
2. Existential Quantifier (∃)

## 6.1 Universal Quantifier (∀)

Universal quantifier menyatakan bahwa suatu kondisi berlaku untuk semua objek dalam domain.

Simbol:

\[
\forall
\]

Dibaca: For All atau For Every.

Contoh kalimat:

> Semua mahasiswa wajib mengikuti ujian.

Representasi:

\[
\forall x(Student(x) \rightarrow MustTakeExam(x))
\]

Artinya:

Untuk setiap objek x, jika x adalah mahasiswa, maka x wajib mengikuti ujian.

### Contoh lainnya

> Semua manusia membutuhkan oksigen.

\[
\forall x(Human(x) \rightarrow NeedsOxygen(x))
\]

> Semua kucing adalah hewan.

\[
\forall x(Cat(x) \rightarrow Animal(x))
\]

### Mengapa menggunakan implikasi?

Perhatikan:

\[
\forall x(Student(x) \rightarrow MustTakeExam(x))
\]

Kita menggunakan implikasi karena aturan hanya berlaku untuk objek yang merupakan mahasiswa.

Bukan berarti seluruh objek dalam domain harus mahasiswa.

Jika domain mencakup manusia, hewan, dan benda, formula tersebut tetap memiliki makna yang benar.

## 6.2 Existential Quantifier (∃)

Existential quantifier menyatakan bahwa terdapat setidaknya satu objek yang memenuhi suatu kondisi.

Simbol:

\[
\exists
\]

Dibaca: There Exists.

Contoh kalimat:

> Ada mahasiswa yang menyukai matematika.

Representasi:

\[
\exists x(Student(x) \land Likes(x, Mathematics))
\]

Artinya terdapat setidaknya satu objek x yang merupakan mahasiswa dan menyukai matematika.

Contoh lainnya:

> Ada manusia yang bisa berbicara lebih dari tiga bahasa.

\[
\exists x(Human(x) \land SpeaksMoreThanThreeLanguages(x))
\]

> Ada mahasiswa yang mendapatkan nilai A.

\[
\exists x(Student(x) \land GetsGradeA(x))
\]

## 6.3 Perbedaan Universal dan Existential

| Universal (∀) | Existential (∃) |
|---|---|
| Semua objek | Setidaknya satu objek |
| For all | There exists |
| Berlaku untuk seluruh objek dalam domain | Berlaku untuk minimal satu objek |
| Contoh: semua mahasiswa belajar | Contoh: ada mahasiswa yang belajar |

Perhatikan perbedaan berikut:

\[
\forall x(Student(x) \rightarrow Smart(x))
\]

Artinya semua mahasiswa pintar.

Sedangkan:

\[
\exists x(Student(x) \land Smart(x))
\]

Artinya setidaknya ada satu mahasiswa yang pintar.

Kedua pernyataan tersebut memiliki makna yang berbeda.

---

# 7. Scope Quantifier dan Bound Variable

Dalam predicate logic, kita juga harus memperhatikan cakupan quantifier.

Contoh:

\[
\forall x(Student(x) \rightarrow Smart(x))
\]

Variabel x berada dalam cakupan universal quantifier.

Variabel tersebut disebut bound variable.

Contoh lainnya:

\[
\exists x(Student(x) \land Likes(x, Mathematics))
\]

Variabel x juga merupakan bound variable.

Namun, perhatikan:

\[
Student(x) \land \exists y(Likes(y, Mathematics))
\]

Pada formula tersebut:

- y adalah bound variable.
- x adalah free variable karena tidak terikat oleh quantifier.

Perbedaan:

- Bound variable: variabel yang berada dalam cakupan quantifier.
- Free variable: variabel yang tidak berada dalam cakupan quantifier.

Formula yang memiliki free variable belum menjadi closed formula atau sentence dalam pengertian first-order logic.

---

# 8. Negasi pada Quantifier

Negasi pada quantifier memiliki aturan penting.

## 8.1 Negasi Universal Quantifier

\[
\neg \forall x P(x)
\]

Ekuivalen dengan:

\[
\exists x \neg P(x)
\]

Artinya:

Tidak benar bahwa semua objek memiliki properti P.

Sama dengan:

Ada setidaknya satu objek yang tidak memiliki properti P.

Contoh:

> Tidak semua mahasiswa lulus.

Ekuivalen dengan:

> Ada mahasiswa yang tidak lulus.

Representasi:

\[
\neg \forall x(Student(x) \rightarrow Passed(x))
\]

Ekuivalen dengan:

\[
\exists x(Student(x) \land \neg Passed(x))
\]

## 8.2 Negasi Existential Quantifier

\[
\neg \exists x P(x)
\]

Ekuivalen dengan:

\[
\forall x \neg P(x)
\]

Artinya:

Tidak ada objek yang memiliki properti P.

Contoh:

> Tidak ada mahasiswa yang mendapatkan nilai F.

Ekuivalen dengan:

> Semua mahasiswa tidak mendapatkan nilai F.

Representasi:

\[
\neg \exists x(Student(x) \land GetsGradeF(x))
\]

Ekuivalen dengan:

\[
\forall x(Student(x) \rightarrow \neg GetsGradeF(x))
\]

## 8.3 Ringkasan Hukum Quantifier

| Formula | Ekuivalen |
|---|---|
| \(\neg \forall x P(x)\) | \(\exists x \neg P(x)\) |
| \(\neg \exists x P(x)\) | \(\forall x \neg P(x)\) |

Hukum ini mirip dengan hukum De Morgan dalam propositional logic, tetapi diterapkan pada quantifier.

---

# 9. Mengubah Bahasa Alami Menjadi Predicate Logic

Kemampuan penting dalam predicate logic adalah mengubah kalimat bahasa manusia menjadi representasi formal.

Perhatikan contoh berikut.

## Contoh 1

Kalimat:

> Semua mahasiswa mengambil mata kuliah AI.

Predicate:

- `Student(x)`
- `Takes(x, AI)`

Representasi:

\[
\forall x(Student(x) \rightarrow Takes(x, AI))
\]

## Contoh 2

Kalimat:

> Ada mahasiswa yang mengambil mata kuliah AI.

Representasi:

\[
\exists x(Student(x) \land Takes(x, AI))
\]

## Contoh 3

Kalimat:

> Tidak ada mahasiswa yang malas.

Representasi:

\[
\neg \exists x(Student(x) \land Lazy(x))
\]

Ekuivalen dengan:

\[
\forall x(Student(x) \rightarrow \neg Lazy(x))
\]

## Contoh 4

Kalimat:

> Setiap mahasiswa memiliki setidaknya satu dosen pembimbing.

Predicate:

- `Student(x)`
- `Advises(y, x)`

Representasi:

\[
\forall x(Student(x) \rightarrow \exists y(Advises(y, x)))
\]

Perhatikan urutan quantifier:

- Untuk setiap mahasiswa x.
- Terdapat setidaknya satu dosen y yang membimbing mahasiswa tersebut.

## Contoh 5

Kalimat:

> Ada satu dosen yang membimbing semua mahasiswa.

Representasi:

\[
\exists y \forall x(Student(x) \rightarrow Advises(y, x))
\]

Perhatikan bahwa contoh 4 dan contoh 5 berbeda.

Contoh 4: setiap mahasiswa boleh memiliki dosen pembimbing yang berbeda.

Contoh 5: terdapat satu dosen yang membimbing seluruh mahasiswa.

Ini menunjukkan bahwa urutan quantifier dapat mengubah makna pernyataan.

---

# 10. Predicate Logic dan Logical Consequence

Pada sesi 5, kita telah mempelajari bagaimana logical consequence digunakan untuk menarik kesimpulan dari fakta dan aturan.

Konsep yang sama juga berlaku dalam predicate logic.

Contoh:

Fakta:

\[
Student(Dion)
\]

Aturan:

\[
\forall x(Student(x) \rightarrow MustTakeExam(x))
\]

Kesimpulan:

\[
MustTakeExam(Dion)
\]

Secara formal:

\[
\{\forall x(Student(x) \rightarrow MustTakeExam(x)), Student(Dion)\}
\models MustTakeExam(Dion)
\]

Bagaimana prosesnya?

1. Sistem mengetahui bahwa semua mahasiswa wajib mengikuti ujian.
2. Sistem mengetahui bahwa Dion adalah mahasiswa.
3. Sistem mengganti variabel x dengan Dion.
4. Sistem memperoleh aturan:

\[
Student(Dion) \rightarrow MustTakeExam(Dion)
\]

5. Karena `Student(Dion)` benar, menggunakan Modus Ponens sistem menyimpulkan:

\[
MustTakeExam(Dion)
\]

Proses penggantian variabel tersebut berkaitan dengan universal instantiation.

## 10.1 Universal Instantiation

Jika:

\[
\forall x P(x)
\]

Maka untuk objek tertentu a:

\[
P(a)
\]

Contoh:

\[
\forall x(Human(x) \rightarrow Mortal(x))
\]

Maka:

\[
Human(Dion) \rightarrow Mortal(Dion)
\]

## 10.2 Existential Instantiation

Jika:

\[
\exists x P(x)
\]

Maka kita dapat memperkenalkan sebuah simbol baru untuk merepresentasikan objek yang memenuhi P.

Contoh:

\[
\exists x(Student(x))
\]

Kita dapat memperkenalkan constant baru, misalnya `c`, sehingga:

\[
Student(c)
\]

Namun, c bukan berarti Dion atau objek tertentu yang sudah diketahui. c hanya mewakili suatu objek yang keberadaannya dijamin oleh premis.

---

# 11. Implementasi Predicate Logic dengan Prolog

Prolog merupakan salah satu bahasa pemrograman yang menggunakan prinsip logic programming.

Prolog memungkinkan kita mendefinisikan fakta, aturan, dan query.

Contoh:

```prolog
student(dion).
student(budi).
student(andi).

takes(dion, ai).
takes(budi, ai).

takes_ai(X) :-
    student(X),
    takes(X, ai).
```

Query:

```prolog
?- takes_ai(X).
```

Hasil:

```text
X = dion ;
X = budi.
```

Prolog mencari seluruh objek yang memenuhi aturan `takes_ai(X)`.

## 11.1 Menggunakan Universal Rule

Contoh:

```prolog
human(dion).
human(budi).

mortal(X) :-
    human(X).
```

Query:

```prolog
?- mortal(dion).
```

Hasil:

```text
true.
```

Aturan `mortal(X) :- human(X)` berlaku untuk setiap X yang memenuhi `human(X)`.

Dalam Prolog, aturan tersebut memiliki interpretasi universal terhadap variabel yang muncul dalam aturan.

## 11.2 Menggunakan Existential Query

Contoh:

```prolog
student(dion).
student(budi).

likes(dion, mathematics).
```

Query:

```prolog
?- student(X), likes(X, mathematics).
```

Hasil:

```text
X = dion.
```

Query tersebut mencari setidaknya satu mahasiswa yang menyukai matematika.

**Catatan:** Prolog tidak sama persis dengan seluruh first-order logic. Prolog standar umumnya menggunakan subset Horn clause dengan mekanisme unification, resolution, dan backward chaining. Implementasinya juga memiliki asumsi tertentu, seperti negation as failure, yang tidak identik dengan negasi klasik.

---

# 12. Penerapan Predicate Logic dalam AI

Predicate logic dapat digunakan untuk merepresentasikan pengetahuan yang memiliki objek, properti, dan hubungan.

## 12.1 Expert System

Contoh sistem konsultasi pendidikan.

Aturan:

\[
\forall x(Student(x) \land LowGrade(x) \rightarrow NeedsTutoring(x))
\]

Jika sistem mengetahui:

\[
Student(Dion)
\]

\[
LowGrade(Dion)
\]

Sistem dapat menyimpulkan:

\[
NeedsTutoring(Dion)
\]

## 12.2 Knowledge Representation

Predicate logic dapat merepresentasikan pengetahuan mengenai suatu domain.

Contoh:

\[
Parent(John, Mary)
\]

\[
Parent(Mary, Alice)
\]

Dari dua fakta tersebut, kita dapat membuat aturan:

\[
Parent(x,y) \land Parent(y,z) \rightarrow Grandparent(x,z)
\]

Sistem dapat menyimpulkan:

\[
Grandparent(John, Alice)
\]

## 12.3 Natural Language Processing

Predicate logic dapat digunakan sebagai salah satu bentuk representasi makna kalimat.

Kalimat:

> John memberikan buku kepada Mary.

Representasi sederhana:

\[
Gives(John, Book, Mary)
\]

Representasi ini menunjukkan hubungan antara pelaku, objek, dan penerima.

## 12.4 Automated Reasoning

Predicate logic dapat digunakan dalam proses pembuktian formal dan penalaran otomatis.

Contohnya:
- Membuktikan suatu pernyataan.
- Mencari objek yang memenuhi kondisi.
- Memeriksa konsistensi aturan.
- Menurunkan fakta baru dari aturan yang tersedia.

---

# 13. Aktivitas Pembelajaran: Knowledge Base untuk Universitas

## Problem-Based Learning

Sebuah universitas ingin membuat sistem sederhana untuk mengetahui hubungan mahasiswa, dosen, dan mata kuliah.

Sistem memiliki fakta berikut:

1. Dion adalah mahasiswa.
2. Budi adalah mahasiswa.
3. Andi adalah dosen.
4. Andi mengajar mata kuliah AI.
5. Dion mengambil mata kuliah AI.
6. Budi mengambil mata kuliah Database.

### Tugas 1: Membuat Predicate

Tentukan predicate yang sesuai untuk merepresentasikan fakta tersebut.

Contoh:

\[
Student(Dion)
\]

\[
Lecturer(Andi)
\]

\[
Teaches(Andi, AI)
\]

### Tugas 2: Membuat Universal Rule

Buat aturan:

> Semua mahasiswa yang mengambil mata kuliah AI wajib mengikuti ujian AI.

Representasikan menggunakan predicate logic.

### Tugas 3: Membuat Existential Statement

Buat pernyataan:

> Ada mahasiswa yang mengambil mata kuliah AI.

### Tugas 4: Menarik Kesimpulan

Dari fakta dan aturan yang tersedia, apakah kita dapat menyimpulkan bahwa Dion wajib mengikuti ujian AI?

Jelaskan proses reasoning-nya.

### Tugas 5: Implementasi Prolog

Implementasikan fakta dan aturan tersebut menggunakan Prolog.

Buat query untuk mencari:
- Semua mahasiswa.
- Semua mahasiswa yang mengambil AI.
- Semua mahasiswa yang wajib mengikuti ujian AI.
- Apakah terdapat mahasiswa yang mengambil AI?

---

# 14. Assessment

## A. Pemahaman Konsep

Jawab pertanyaan berikut:

1. Apa perbedaan propositional logic dan predicate logic?
2. Apa yang dimaksud dengan predicate?
3. Apa perbedaan constant dan variable?
4. Apa fungsi function dalam first-order logic?
5. Apa perbedaan universal quantifier dan existential quantifier?
6. Apa yang dimaksud dengan bound variable dan free variable?
7. Mengapa urutan quantifier dapat mengubah makna formula?
8. Apa perbedaan logical consequence pada propositional logic dan predicate logic?

## B. Translasi Bahasa Alami

Ubah kalimat berikut menjadi predicate logic.

1. Semua manusia adalah makhluk hidup.
2. Ada mahasiswa yang menyukai pemrograman.
3. Tidak ada mahasiswa yang mendapatkan nilai F.
4. Setiap dosen mengajar setidaknya satu mata kuliah.
5. Ada satu dosen yang mengajar semua mahasiswa.
6. Semua mahasiswa yang lulus ujian mendapatkan sertifikat.

## C. Analisis Logika

Diketahui:

\[
\forall x(Human(x) \rightarrow Mortal(x))
\]

\[
Human(Socrates)
\]

Pertanyaan:

1. Apa arti masing-masing premis?
2. Kesimpulan apa yang dapat diturunkan?
3. Inference rule apa yang digunakan?
4. Apakah kesimpulan tersebut merupakan logical consequence dari kedua premis?

## D. Implementasi

Buat program menggunakan Prolog yang dapat merepresentasikan:

- Mahasiswa.
- Dosen.
- Mata kuliah.
- Relasi mengambil mata kuliah.
- Relasi mengajar mata kuliah.

Buat aturan untuk mencari mahasiswa yang mengambil mata kuliah AI.

---

# 15. Rubrik Penilaian

| Aspek | Bobot |
|---|---:|
| Pemahaman konsep predicate logic | 20% |
| Ketepatan penggunaan quantifier | 20% |
| Translasi bahasa alami ke simbol logika | 25% |
| Kemampuan reasoning | 15% |
| Implementasi Prolog | 20% |
| **Total** | **100%** |

---

# 16. Indikator Keberhasilan Pembelajaran

Mahasiswa dianggap memahami materi apabila mampu:

- Menjelaskan mengapa propositional logic memiliki keterbatasan.
- Membuat predicate untuk merepresentasikan properti dan hubungan objek.
- Menggunakan constant dan variable dengan benar.
- Membedakan universal dan existential quantifier.
- Memahami scope quantifier.
- Mengubah kalimat bahasa alami menjadi formula predicate logic.
- Menarik kesimpulan sederhana menggunakan universal instantiation dan Modus Ponens.
- Mengimplementasikan fakta, aturan, dan query sederhana menggunakan Prolog.

---

# 17. Kesimpulan

Pada sesi ini kita telah mempelajari bagaimana predicate logic memperluas kemampuan propositional logic.

Konsep utama:

1. **Predicate:** merepresentasikan properti atau hubungan objek.
2. **Constant:** merepresentasikan objek tertentu.
3. **Variable:** merepresentasikan objek secara umum.
4. **Function:** menghasilkan objek atau term lain.
5. **Universal Quantifier (∀):** menyatakan bahwa suatu kondisi berlaku untuk semua objek dalam domain.
6. **Existential Quantifier (∃):** menyatakan bahwa setidaknya terdapat satu objek yang memenuhi kondisi.
7. **Logical Consequence:** memungkinkan sistem menurunkan kesimpulan dari fakta dan aturan predicate logic.

Inti pembelajaran:

> Propositional logic membantu komputer memproses hubungan antarpernyataan, sedangkan predicate logic memungkinkan komputer merepresentasikan objek, properti, dan hubungan antarobjek secara lebih terstruktur.

---

# 18. Transisi ke Sesi Berikutnya

Setelah mahasiswa memahami bagaimana pengetahuan direpresentasikan menggunakan predicate logic, pertanyaan berikutnya adalah:

**Bagaimana komputer dapat melakukan pembuktian logis secara sistematis terhadap formula yang lebih kompleks?**

Topik berikutnya:

**Sesi 7 — First-Order Logic Inference & Resolution**

Materi yang akan dipelajari:
- Substitution dan unification.
- Universal dan existential instantiation.
- Existential generalization.
- First-order logic inference.
- Normal forms.
- Conversion to Clausal Form.
- Resolution.
- Automated theorem proving.