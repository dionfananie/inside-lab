# Sesi 7 --- Pembuktian Formal dan Natural Deduction

## 1. Informasi Sesi

**Topik:** Formal Proof & Natural Deduction\
**Metode:** Ceramah interaktif, diskusi, dan latihan pembuktian\
**Prasyarat:** Propositional Logic, Truth Table, Logical Consequence,
Inference Rules, dan Predicate Logic.

## 2. Learning Objectives

Mahasiswa mampu: 1. Menjelaskan formal proof. 2. Membedakan `⊢`
(pembuktian sintaktis) dan `⊨` (konsekuensi semantik). 3. Menjelaskan
Natural Deduction. 4. Menggunakan aturan introduction dan elimination.
5. Menyusun pembuktian dengan asumsi sementara atau subproof. 6.
Membuktikan kesimpulan sederhana dari sekumpulan premis. 7. Menerapkan
aturan dasar pada predicate logic.

## 3. Mengapa Pembuktian Formal Diperlukan?

Misalkan: - P: Dion belajar. - Q: Dion lulus ujian.

Premis:

\[ P `\rightarrow `{=tex}Q \] \[ P \]

Kesimpulan:

\[ Q \]

Pembuktian formal menunjukkan setiap langkah dan alasan yang digunakan.

    Langkah Formula                     Alasan
  --------- --------------------------- ------------------------------
          1 (P `\rightarrow `{=tex}Q)   Premise
          2 \(P\)                       Premise
          3 \(Q\)                       Modus Ponens / → Elimination

## 4. Formal Proof

Formal proof adalah urutan langkah yang menunjukkan bahwa formula dapat
diturunkan dari premis menggunakan aturan pembuktian yang ditentukan.

\[ `\Gamma `{=tex}`\vdash `{=tex}Q \]

-   Γ: sekumpulan premis atau asumsi.
-   ⊢: dapat dibuktikan secara sintaktis.
-   Q: formula yang ingin dibuktikan.

### Perbedaan `⊢` dan `⊨`

  -----------------------------------------------------------------------
  Simbol                  Nama                    Makna
  ----------------------- ----------------------- -----------------------
  (`\vdash`{=tex})        Syntactic derivation    Kesimpulan dapat
                                                  diturunkan dengan
                                                  aturan pembuktian
                                                  formal

  (`\models`{=tex})       Semantic entailment     Kesimpulan benar pada
                                                  setiap interpretasi
                                                  yang membuat semua
                                                  premis benar
  -----------------------------------------------------------------------

Sistem pembuktian disebut **sound** jika setiap formula yang dapat
dibuktikan memang merupakan konsekuensi semantik. Sistem disebut
**complete** jika setiap konsekuensi semantik dapat dibuktikan dalam
sistem tersebut.

## 5. Natural Deduction

Natural Deduction adalah salah satu sistem formal proof yang menggunakan
aturan untuk memperkenalkan (*introduction*) dan menggunakan atau
menghilangkan (*elimination*) operator logika.

-   **Introduction rules:** membentuk atau memperkenalkan operator dalam
    kesimpulan.
-   **Elimination rules:** menggunakan informasi dari formula yang
    memiliki operator tersebut.

### 5.1 Conjunction --- AND (`∧`)

**AND Introduction (∧I)**

Dari P dan Q, simpulkan (P `\land `{=tex}Q).

\[ `\frac{P \quad Q}{P \land Q}`{=tex} \]

**AND Elimination (∧E)**

Dari (P `\land `{=tex}Q), kita dapat mengambil P atau Q.

\[ `\frac{P \land Q}{P}`{=tex} `\qquad`{=tex}
`\frac{P \land Q}{Q}`{=tex} \]

### 5.2 Disjunction --- OR (`∨`)

**OR Introduction (∨I)**

Dari P, simpulkan (P `\lor `{=tex}Q).

\[ `\frac{P}{P \lor Q}`{=tex} \]

**OR Elimination (∨E)**

Jika (P `\lor `{=tex}Q), dan dari asumsi P dapat dibuktikan R serta dari
asumsi Q juga dapat dibuktikan R, maka R dapat disimpulkan.

\[ `\frac{P \lor Q \quad [P]\vdash R \quad [Q]\vdash R}{R}`{=tex} \]

### 5.3 Implication --- Implikasi (`→`)

**Implication Elimination (→E)** --- Modus Ponens:

\[ `\frac{P \rightarrow Q \quad P}{Q}`{=tex} \]

**Implication Introduction (→I)**

Jika dengan mengasumsikan P kita dapat membuktikan Q, simpulkan (P
`\rightarrow `{=tex}Q). Asumsi P ditutup setelah pembuktian selesai.

\[ `\frac{[P]\quad \vdots \quad Q}{P \rightarrow Q}`{=tex} \]

Contoh membuktikan (P `\rightarrow `{=tex}P): 1. Asumsikan P. 2. P
tersedia dari asumsi. 3. Tutup asumsi dan simpulkan (P
`\rightarrow `{=tex}P).

### 5.4 Negation --- NOT (`¬`)

**Negation Introduction (¬I):** jika asumsi P menghasilkan kontradiksi,
simpulkan (`\neg `{=tex}P).

\[ `\frac{[P]\quad \vdots \quad \bot}{\neg P}`{=tex} \]

**Negation Elimination (¬E):** dari P dan ¬P, simpulkan kontradiksi.

\[ `\frac{P \quad \neg P}{\bot}`{=tex} \]

Simbol (`\bot`{=tex}) menyatakan kontradiksi.

### 5.5 Ringkasan Aturan

  -----------------------------------------------------------------------
  Operator                Introduction            Elimination
  ----------------------- ----------------------- -----------------------
  AND (`∧`)               Dari P dan Q, simpulkan Dari P ∧ Q, ambil P
                          P ∧ Q                   atau Q

  OR (`∨`)                Dari P, simpulkan P ∨ Q Dari P ∨ Q dan
                                                  pembuktian dua kasus,
                                                  simpulkan R

  Implikasi (`→`)         Asumsikan P dan         Dari P → Q dan P,
                          buktikan Q, lalu        simpulkan Q
                          simpulkan P → Q         

  Negasi (`¬`)            Asumsikan P dan         Dari P dan ¬P,
                          dapatkan kontradiksi,   simpulkan kontradiksi
                          simpulkan ¬P            
  -----------------------------------------------------------------------

Notasi dapat sedikit berbeda antar buku atau sistem Natural Deduction.
Materi ini menggunakan aturan standar untuk logika klasik.

## 6. Subproof dan Asumsi Sementara

Subproof adalah bagian pembuktian yang menggunakan asumsi sementara.
Subproof digunakan, antara lain, untuk implication introduction dan
negation introduction.

Diketahui:

\[ P `\rightarrow `{=tex}Q \] \[ Q `\rightarrow `{=tex}R \]

Buktikan:

\[ P `\rightarrow `{=tex}R \]

    Langkah Formula                     Alasan
  --------- --------------------------- -------------------------
          1 (P `\rightarrow `{=tex}Q)   Premise
          2 (Q `\rightarrow `{=tex}R)   Premise
          3 \(P\)                       Asumsi sementara
          4 \(Q\)                       →E (1, 3)
          5 \(R\)                       →E (2, 4)
          6 (P `\rightarrow `{=tex}R)   →I (3--5), tutup asumsi

Kita mengasumsikan P. Dari P dan (P `\rightarrow `{=tex}Q), diperoleh Q.
Dari Q dan (Q `\rightarrow `{=tex}R), diperoleh R. Karena R berhasil
dibuktikan dari asumsi P, kita simpulkan (P `\rightarrow `{=tex}R).

## 7. Contoh Pembuktian Lain

### Membuktikan AND

Diketahui P dan Q. Buktikan (P `\land `{=tex}Q).

    Langkah Formula               Alasan
  --------- --------------------- -----------
          1 \(P\)                 Premise
          2 \(Q\)                 Premise
          3 (P `\land `{=tex}Q)   ∧I (1, 2)

### Membuktikan Negasi

Diketahui:

\[ P `\rightarrow `{=tex}Q \] \[ P `\rightarrow `{=tex}`\neg `{=tex}Q \]

Buktikan (`\neg `{=tex}P).

    Langkah Formula                                  Alasan
  --------- ---------------------------------------- -------------------------
          1 (P `\rightarrow `{=tex}Q)                Premise
          2 (P `\rightarrow `{=tex}`\neg `{=tex}Q)   Premise
          3 \(P\)                                    Asumsi sementara
          4 \(Q\)                                    →E (1, 3)
          5 (`\neg `{=tex}Q)                         →E (2, 3)
          6 (`\bot`{=tex})                           ¬E (4, 5)
          7 (`\neg `{=tex}P)                         ¬I (3--6), tutup asumsi

## 8. Natural Deduction pada Predicate Logic

### Universal Elimination (∀E)

Dari pernyataan yang berlaku untuk semua objek, kita dapat menerapkannya
pada objek tertentu.

\[ `\frac{\forall x P(x)}{P(a)}`{=tex} \]

Contoh:

\[ `\forall `{=tex}x(Human(x) `\rightarrow `{=tex}Mortal(x)) \]

Dapat diterapkan pada Dion:

\[ Human(Dion) `\rightarrow `{=tex}Mortal(Dion) \]

Jika diketahui (Human(Dion)), maka dengan →E diperoleh (Mortal(Dion)).

### Universal Introduction (∀I)

Jika kita membuktikan P(a) untuk objek a yang dipilih secara sembarang,
dan pembuktian tidak bergantung pada asumsi khusus tentang a, kita dapat
menyimpulkan:

\[ `\forall `{=tex}x P(x) \]

### Existential Introduction (∃I)

Dari fakta bahwa suatu objek memiliki properti tertentu, simpulkan bahwa
setidaknya ada satu objek yang memiliki properti tersebut.

\[ `\frac{P(a)}{\exists x P(x)}`{=tex} \]

Contoh:

\[ Student(Dion) `\vdash `{=tex}`\exists `{=tex}x Student(x) \]

### Existential Elimination (∃E)

Jika diketahui bahwa ada objek yang memenuhi P, kita dapat
memperkenalkan nama sementara yang baru untuk objek tersebut dan
menggunakannya dalam subproof. Nama sementara harus baru dan tidak boleh
membuat kesimpulan akhir bergantung pada identitas objek yang belum
diketahui.

## 9. Formal Proof, Truth Table, dan Logical Consequence

  -----------------------------------------------------------------------
  Konsep                  Pendekatan              Fungsi
  ----------------------- ----------------------- -----------------------
  Truth Table             Evaluasi kombinasi      Memeriksa validitas
                          nilai kebenaran         atau ekuivalensi
                                                  formula proposisional

  Logical Consequence     Semantik/model          Menentukan apakah
  (`⊨`)                                           kesimpulan mengikuti
                                                  premis pada semua model

  Formal Proof (`⊢`)      Sintaks/aturan          Menunjukkan langkah
                          pembuktian              penurunan kesimpulan

  Natural Deduction       Sistem formal proof     Membuktikan kesimpulan
                                                  dengan aturan
                                                  introduction dan
                                                  elimination
  -----------------------------------------------------------------------

Truth table memeriksa semua kemungkinan nilai kebenaran formula
proposisional. Natural Deduction memperlihatkan bagaimana kesimpulan
diturunkan langkah demi langkah. Truth table proposisional biasa tidak
cukup untuk menangani variabel dan quantifier pada predicate logic.

## 10. Penerapan dalam Computer Science dan AI

### Program Verification

Contoh:

``` javascript
function withdraw(balance, amount) {
  if (amount <= balance) {
    return balance - amount;
  }
  return balance;
}
```

Kita ingin memastikan saldo tidak negatif.

Asumsi awal:

\[ balance `\geq 0`{=tex} \]

Kondisi penarikan:

\[ amount `\leq `{=tex}balance \]

Hasil penarikan:

\[ balance - amount `\geq 0`{=tex} \]

Dalam formal verification, spesifikasi dapat ditulis menggunakan Hoare
triple:

\[ {P} C {Q} \]

-   P: precondition.
-   C: command atau program.
-   Q: postcondition.

### Automated Theorem Proving

Sistem dapat mencari pembuktian formula secara otomatis, misalnya untuk
membuktikan teorema, memeriksa konsistensi spesifikasi, dan
memverifikasi properti program.

### Type Theory

Dalam Curry--Howard correspondence, tipe dapat dipandang sebagai
proposisi dan program atau nilai sebagai bukti dari proposisi tersebut.
Gagasan ini menjadi dasar teoritis bagi proof assistant dan dependently
typed programming language.

## 11. Aktivitas Pembelajaran --- Problem-Based Learning

### Studi Kasus: Sistem Peminjaman Buku

Aturan: 1. Jika pengguna terdaftar dan tidak memiliki denda, maka
pengguna memenuhi syarat untuk meminjam buku. 2. Jika pengguna memenuhi
syarat dan buku tersedia, maka peminjaman dapat dilakukan.

Definisikan: - P: Pengguna terdaftar. - Q: Pengguna tidak memiliki
denda. - R: Pengguna memenuhi syarat. - S: Buku tersedia. - T:
Peminjaman dapat dilakukan.

Premis:

\[ (P `\land `{=tex}Q) `\rightarrow `{=tex}R \] \[ (R `\land `{=tex}S)
`\rightarrow `{=tex}T \]

Fakta:

\[ P,`\quad `{=tex}Q,`\quad `{=tex}S \]

Tujuan pembuktian:

\[ T \]

### Tugas Mahasiswa

1.  Identifikasi premis dan kesimpulan.
2.  Tentukan aturan Natural Deduction yang diperlukan.
3.  Susun pembuktian dalam tabel langkah, formula, dan alasan.
4.  Jelaskan kapan menggunakan AND Introduction.
5.  Jelaskan kapan menggunakan Implication Elimination.
6.  Pastikan setiap langkah memiliki justifikasi yang sah.

Petunjuk: - Dari P dan Q, buktikan (P `\land `{=tex}Q). - Dari ((P
`\land `{=tex}Q) `\rightarrow `{=tex}R), buktikan R. - Dari R dan S,
buktikan (R `\land `{=tex}S). - Dari ((R `\land `{=tex}S)
`\rightarrow `{=tex}T), buktikan T.

## 12. Assessment

### A. Pemahaman Konsep

1.  Apa yang dimaksud dengan formal proof?
2.  Apa perbedaan `⊢` dan `⊨`?
3.  Apa yang dimaksud dengan Natural Deduction?
4.  Apa perbedaan introduction rules dan elimination rules?
5.  Apa fungsi asumsi sementara?
6.  Apa yang dimaksud dengan subproof?
7.  Apa perbedaan Universal Introduction dan Universal Elimination?
8.  Mengapa setiap langkah pembuktian harus memiliki justifikasi?

### B. Pembuktian Propositional Logic

1.  Diketahui P dan Q. Buktikan (P `\land `{=tex}Q).
2.  Diketahui (P `\rightarrow `{=tex}Q) dan (Q `\rightarrow `{=tex}R).
    Buktikan (P `\rightarrow `{=tex}R).
3.  Diketahui (P `\rightarrow `{=tex}Q) dan (P
    `\rightarrow `{=tex}`\neg `{=tex}Q). Buktikan (`\neg `{=tex}P).

### C. Pembuktian Predicate Logic

Diketahui:

\[ `\forall `{=tex}x(Student(x) `\rightarrow `{=tex}MustTakeExam(x)) \]
\[ Student(Dion) \]

Buktikan:

\[ MustTakeExam(Dion) \]

Tuliskan setiap langkah dan aturan yang digunakan.

### D. Analisis Kesalahan

Seorang mahasiswa membuat pembuktian:

    Langkah Formula                     Alasan
  --------- --------------------------- --------------
          1 (P `\rightarrow `{=tex}Q)   Premise
          2 \(Q\)                       Premise
          3 \(P\)                       Modus Ponens

Pertanyaan: 1. Apakah pembuktian tersebut valid? 2. Di bagian mana
kesalahannya? 3. Mengapa pola tersebut disebut affirming the consequent?
4. Berikan counterexample.

## 13. Rubrik Penilaian

  Aspek                                     Bobot
  ------------------------------------ ----------
  Pemahaman konsep formal proof               15%
  Ketepatan memilih aturan inferensi          25%
  Ketepatan urutan pembuktian                 25%
  Penggunaan asumsi dan subproof              15%
  Penjelasan alasan pembuktian                20%
  **Total**                              **100%**

## 14. Indikator Keberhasilan

Mahasiswa dianggap memahami materi apabila mampu: - Menjelaskan formal
proof dan Natural Deduction. - Membedakan konsekuensi semantik dan
pembuktian sintaktis. - Menggunakan aturan introduction dan
elimination. - Menyusun pembuktian dengan asumsi sementara. - Menutup
asumsi dengan aturan yang tepat. - Membuktikan kesimpulan dari beberapa
premis. - Mengidentifikasi langkah pembuktian yang tidak valid.

## 15. Kesimpulan

Konsep utama: 1. **Formal Proof:** urutan langkah pembuktian menggunakan
aturan formal. 2. **Natural Deduction:** salah satu sistem pembuktian
formal. 3. **Introduction Rules:** aturan untuk memperkenalkan operator
dalam kesimpulan. 4. **Elimination Rules:** aturan untuk menggunakan
informasi dari formula. 5. **Subproof:** pembuktian lokal dengan asumsi
sementara. 6. **Soundness:** sistem pembuktian tidak menghasilkan
kesimpulan yang tidak valid secara semantik. 7. **Completeness:**
kesimpulan yang benar secara semantik dapat dibuktikan dalam sistem
tersebut.

> Dalam logika, kita tidak cukup hanya menyatakan bahwa sebuah
> kesimpulan benar. Kita harus menunjukkan bagaimana kesimpulan tersebut
> diperoleh melalui langkah-langkah penalaran yang sah.

## 16. Transisi ke Sesi Berikutnya

Materi setelah sesi ini dapat berfokus pada transformasi formula ke
bentuk normal, unification dan resolution, knowledge representation,
logic programming menggunakan Prolog, serta penerapan reasoning pada
sistem AI.
