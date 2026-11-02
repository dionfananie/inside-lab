# SAT Solver — Plan

> insideLab / Computational Logic · Halaman baru
> Status: DRAFT — menunggu persetujuan arah sebelum implementasi

## Tujuan

Satu halaman interaktif **SAT Solver** yang memungkinkan pengguna:

1. Menulis **kalimat biasa** (bahasa alami) sebagai masukan.
2. Menekan **Enter** atau **tombol tambah** → kalimat otomatis dikonversi menjadi
   **pernyataan SAT** (klausa simbolik) yang sudah jadi.
3. Melihat **variabel** dan **jumlah pernyataan** bertambah otomatis.
4. Mengedit langsung pada **input SAT** (klausa per baris) maupun **menghapus**
   per baris lewat tombol di baris tersebut.
5. Memeriksa apakah kumpulan pernyataan dapat dipenuhi bersama-sama:
   **SAT** (ada penugasan) atau **UNSAT** (kontradiksi).

---

## 0. Tujuan konten

Halaman ini adalah **konten pembelajaran** (bukan sekadar alat hitung). Oleh karena
itu struktur mengikuti pola `logic-lab`: pengguna tidak hanya memasukkan soal lalu
melihat hasil, tetapi juga mendapatkan **penjelasan konsep SAT** yang runtut.

Alur pembelajaran yang diusulkan:

```text
01 / KENALI
    Apa itu SAT, satisfiable, unsatisfiable, klausa, literal, CNF.

02 / COBA & AMATI
    Masukkan kalimat → jadi klausa SAT → jalankan solver.

03 / PAHAMI HASIL
    SAT (assignment contoh) atau UNSAT (kontradiksi) + alasan ringkas.
```

Setiap istilah (Satisfiability, Klausa, Literal, CNF, Assignment) dijelaskan dalam
`SatIntroduction` dengan gaya `LogicIntroduction` (collapsible "Baru mulai?") dan
legend operator, sehingga pengguna paham *mengapa* hasilnya demikian, bukan cuma
*tahu* hasilnya.

---

## 1. Ringkasan produk & perilaku

### Alur utama pengguna

```text
[Tulis kalimat biasa]  →  Enter / klik "Tambah"
        │
        ▼
[kalimat diubah jadi klausa SAT simbolik]
        │
        ▼
[variabel auto-space, jumlah statement +1]
        │
        ▼
[daftar klausa, tiap baris: edit inline + tombol hapus]
        │
        ▼
[tombol "Periksa" → SAT / UNSAT + assignment]
```

### Fitur inti

| # | Fitur | Detail |
|---|-------|--------|
| 1 | Input kalimat alami | Satu text input besar (bisa multi-baris) |
| 2 | Konversi → simbol SAT | Kalimat → klausa dalam notasi `&`, `\|`, `!`, `->`, `<->`, variabel `p, q, r, s` |
| 3 | Enter / klik = tambah | Submit menambah klausa baru, input dikosongkan lagi |
| 4 | Daftar klausa per baris | Setiap klausa satu baris, bisa diedit langsung |
| 5 | Hapus per baris | Tombol hapus muncul saat hover (atau selalu tampil saat focus) |
| 6 | Counter variabel & statement | Otomatis bertambah sesuai isi klausa |
| 7 | Pemeriksaan SAT/UNSAT | DPLL + fallback brute-force, tampilkan hasil + satu assignment |

---

### Halaman ini memuat (section khas pembelajaran)

Selain interaksi alat, halaman akan memuat bagian pembelajaran:

- `SatIntroduction` — ringkasan konsep: apa itu SAT, klausa, literal, CNF,
  memakai `<details>` collapsible "Baru mulai?" seperti `LogicIntroduction`.
- Legend operator beserta padanan bahasa alami.
- `SatResult` — tidak hanya menampilkan SAT/UNSAT, tetapi juga menjelaskan:
  - SAT: tunjukkan satu penugasan yang membuat semua klausa benar.
  - UNSAT: jelaskan bahwa tidak ada penugasan yang memenuhi semua klausa sekaligus.

---

## 2. Konversi kalimat → simbol SAT

### Input & output

Input:

```text
Kalimat biasa, mis.
"Saya belajar atau saya tidak paham"
"Kalau hujan maka jalanan basah"
"Halaman ini terbuka dan kode berhasil dijalankan"
```

Output (klausa SAT per baris):

```text
p ; ¬p      →  dibaca (belajar ∨ ¬belajar)
q ; r        →  (hujan → basah)
             →  (halaman ∧ kode)
```

### Prinsip konversi

- Setiap **kalimat utuh** = satu pernyataan/klausa.
- Tiap pernyataan atomik (kata kunci yang muncul) diberi **variabel** `p, q, r, s ...`
  yang **bertambah otomatis** sesuai urutan kemunculan/penambahan.
- **Konektor alami** (dan/atau/jika...maka/tidak/bila dan hanya bila) diterjemahkan
  ke operator boolean.
- Konversi otomatis **di sisi client** (browser), tanpa backend — konsisten dengan
  `logic-lab` yang sudah ada.

### Pemetaan bahasa → simbol (tahap awal / heuristik)

| Kalimat/kata kunci | Simbol |
|---|---|
| dan, serta, dengan | `∧` atau `&` |
| atau, ataupun | `∨` atau `\|` |
| tidak, bukan, tak | `¬` atau `!` |
| jika … maka, kalau … maka | `→` atau `->` |
| jika dan hanya jika | `↔` atau `<->` |

> Catatan penting (jujur): konversi **kalimat alami → klausa SAT** adalah masalah
> NLP yang tidak sepele. Untuk POC, konversi memakai heuristik pola sederhana
> (kata konektor + frasa), bukan parser bahasa penuh. Pengguna tetap dapat
> mengedit hasil konversi secara manual di daftar klausa.

---

## 3. Model data (client-side)

Semua state lokal di komponen; tidak ada endpoint backend baru.

```ts
type Statement = {
  id: string;            // id unik utk key & hapus
  clause: string;        // notasi SAT, mis. "p | !q"
};

type SatState = {
  statements: Statement[];
  // variabel diturunkan dari isi klausa, tidak disimpan terpisah:
  //   variabel = kumpulan token huruf (p,q,r,s...) yang muncul
};

type SatResult =
  | { status: 'idle' }
  | { status: 'sat';    assignment: Record<string, boolean> }
  | { status: 'unsat' }
  | { status: 'error';  message: string };
```

### Penomoran variabel

- Kamus token → variabel dibuat saat kalimat pertama ditambahkan.
- Token baru mendapat huruf berikutnya `p, q, r, s, t, u, v, w, x, y, z`
  (super-set dari 4 variabel yang saat ini didukung `propositional-logic.ts`).
- Jika lebih dari 26 token, fallback ke penamaan `x1, x2, ...`.

---

## 4. Algoritma solver

### Pilihan: DPLL + brute-force fallback

1. **Parse** tiap klausa memakai parser yang diperluas dari
   `app/lib/propositional-logic.ts` (saat ini hanya 4 variabel; perlu diperluas
   untuk token bebas).
2. **Normalisasi** ke CNF (Conjunctive Normal Form) bila diperlukan.
3. **Solver DPLL** sederhana (memakai propagasi unit + pure literal bila mudah,
   atau backtracking dasar untuk POC).
4. **Verifikasi brute-force** sebagai penjamin kebenaran untuk jumlah variabel
   kecil (≤ 12), lalu hasilnya ditampilkan.

Kompleksitas praktis:

```text
Untuk POC, jumlah variabel kecil (≤ 12): eksponential 2^n masih cepat.
Ke depan bisa naikkan dengan watcher / CDCL, tapi tidak perlu untuk versi awal.
```

### Output

```text
SAT   → "Dapat dipenuhi" + satu assignment contoh
        mis. { p: true, q: false, r: true }
UNSAT → "Kontradiksi, tidak dapat dipenuhi sekaligus"
```

---

## 5. Struktur file yang akan dibuat

Mengikuti pola `app/pages/<feature>/` yang sudah dipakai `logic-lab`, `js-learning`, `runtime-js`.

```text
app/lib/sat.ts                          # parser + konverter + DPLL solver (pure)
app/routes/sat-solver.tsx               # route tipis: meta + render <SatSolverPage/>
app/pages/sat-solver/
  index.ts                              # re-export default View
  View.tsx                              # komposisi section
  useSatSolver.ts                       # hook: state statements, hasil, aksi
  types.ts                              # tipe Statement, SatResult, dll
  helpers.ts                            # konversi kalimat→klausa, penomoran variabel
  data.ts                               # contoh kalimat awal, operator legend
  sat-solver.css                        # gaya khusus (mengikuti logic.css / runtime-js.css)
  components/
    SatHeader.tsx                       # header + nav ala LogicHeader
    SatIntroduction.tsx                 # penjelasan konsep SAT + legend operator
    SentenceInput.tsx                   # input kalimat utama (Enter → tambah)
    ClauseList.tsx                      # daftar klausa per baris (edit + hapus hover)
    SatResult.tsx                       # hasil SAT/UNSAT + assignment
```

### Perubahan pada route

```text
app/routes.ts
  + route("computational-logic/sat-solver", "routes/sat-solver.tsx")
```

---

## 6. Detail interaksi (sesuai permintaan)

### Input kalimat

- Satu `<textarea>` atau `<input>` besar.
- Enter → tambah statement (jangan bikin baris baru, kecuali tombol modifikasi).
- Tombol "Tambah" → sama seperti Enter.
- Setelah tambah, input dikosongkan dan fokus kembali ke input.

### Daftar klausa (statement)

- Tiap klausa tampil satu baris.
- **Edit inline**: klik teks → jadi input yang bisa diubah langsung; Enter menyimpan.
- **Hover** → muncul tombol **hapus (×)** di ujung baris.
- Untuk aksesibilitas/keyboard: tombol hapus juga bisa difokuskan tanpa hover
  (tab), tidak bergantung hover saja.

### Counter otomatis

- Jumlah **statement** = banyak baris klausa.
- Jumlah **variabel** = banyak token huruf unik yang muncul di semua klausa.
- Counter tampil di area ringkasan dan update real-time.

---

## 7. Visual & gaya

Mengikuti bahasa visual `insideLab` (logic-lab):

- Header pakai `<InsideLabBrand area="Computational Logic" />`.
- Nav konsisten dengan halaman logic-lab.
- Section berlabel angka `01`, `02`, `03` mengikuti pola logic-lab.
- Warna, tombol shadcn/ui (`Button`, `Input`, `Badge`, `Table`) yang sudah ada.
- CSS khusus di `sat-solver.css` agar konsisten dengan `logic.css`.

> Akan jalankan `antislop` sebelum UI dibangun. Perlu konfirmasi arah desain
> (DESIGN.md belum ada untuk inside-lab) — default: mengikuti gaya logic-lab yang
> sudah mapan, agar tidak monoton/stagnan.

---

## 8. Ruang lingkup & non-goals

### Di dalam scope

- Konversi heuristik kalimat → klausa SAT.
- Edit inline + hapus per baris.
- Counter variabel & statement otomatis.
- Solver DPLL + brute-force untuk POC.
- Tampilan SAT/UNSAT + satu assignment.
- Route + meta SEO (judul, deskripsi, canonical).

### Di luar scope (versi awal)

- Parser NLP penuh (konversi sempurna dari kalimat alami).
- Solver CDCL skala besar.
- Backend/persistence (semua client-side).
- Visualisasi langkah DPLL yang detail (bisa menyusul).

---

## 9. Keputusan format DIMACS CNF

- Format utama adalah DIMACS CNF numerik, bukan formula simbolik.
- Header otomatis: `p cnf <jumlah-variable> <jumlah-klausa>`.
- Setiap klausa berisi literal angka dan diakhiri `0`, misalnya `1 -3 0`.
- Angka positif berarti literal biasa; angka negatif berarti negasi.
- Batas editor: variabel `1..26`; jumlah klausa mengikuti baris aktif.
- Input utama mendukung satu klausa atau bulk dengan baris baru/titik koma.
- Editor inline dan kontrol hapus per baris tetap tersedia.
- Input kalimat biasa tetap tersedia sebagai konverter POC ke klausa angka.

---

## 10. Langkah eksekusi

1. Parser/validator DIMACS CNF client-side.
2. Editor klausa numerik dengan counter otomatis dan preview header.
3. Solver SAT/UNSAT client-side + contoh assignment.
4. Konverter kalimat sederhana sebagai fitur pembelajaran tambahan.
5. `npm run typecheck` + `npm run build` + `git diff --check`.
