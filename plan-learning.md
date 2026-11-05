# Plan Learning — Refactor Homepage Menjadi 2 Jalur Belajar

## 1. Tujuan

Refactor homepage `insideLab` agar memiliki **2 endpoint/pintu masuk belajar** yang jelas:

1. **Learning JS** — seluruh materi JavaScript yang sudah ada, termasuk **Runtime JS (jsrunner)** sebagai playground.
2. **Computational Logic** — berisi **SAT Solver** dan materi computational logic lain yang akan ditambahkan bertahap.

> Catatan: "endpoint" di sini berarti **entry point / jalur belajar** di homepage, bukan endpoint API/backend. Tidak ada perubahan backend pada refactor ini.

Target akhir:

- Pengunjung langsung memahami bahwa ada dua jalur besar: JavaScript dan Computational Logic.
- Runtime JS tidak lagi terlihat sebagai jalur terpisah, tetapi menjadi bagian dari Learning JS.
- SAT Solver dan Logic Lab berada di bawah payung Computational Logic.
- Homepage tetap ringkas, tidak menampilkan tiga kartu besar yang setara seperti sekarang.
- Struktur konten siap menerima materi computational logic baru per sesi.

---

## 2. Kondisi Saat Ini

### Route yang sudah ada

| Route | Isi | Status |
|---|---|---|
| `/` | Homepage | Ada |
| `/js/:chapterId` | Learning JS per bab | Ada |
| `/play` | Runtime JS playground (jsrunner) | Ada |
| `/computational-logic` | Redirect ke `/computational-logic/proportional-logic` | Ada |
| `/computational-logic/proportional-logic` | Logic Lab | Ada |
| `/computational-logic/sat-solver` | SAT Solver | Ada |
| `/lab` | Halaman lab/positioning produk | Ada, di luar dua jalur utama |

### Masalah pada homepage saat ini

- `LabsSection` menampilkan **3 kartu sejajar**: JS Learning, Logic Lab, dan Runtime JS.
- Runtime JS terlihat sebagai jalur ketiga, padahal secara konsep ia adalah alat bantu untuk Learning JS.
- Computational Logic belum tampil sebagai satu jalur utuh; Logic Lab dan SAT Solver belum dikelompokkan dalam satu cerita.
- Header JS Learning (`app/pages/js-learning/components/LearningHeader.tsx`) masih memiliki entry point langsung ke Computational Logic (`Computational Logic ↗`), sehingga dua jalur bercampur di dalam satu halaman belajar.
- Belum ada gambaran kurikulum computational logic (6 sesi) di homepage.
- Header dan footer masih menyebut "Logic Lab" secara terpisah, bukan "Computational Logic".

---

## 3. Target Information Architecture

### 3.1 Dua jalur utama di homepage

```text
Homepage
├── 01 / Learning JS
│   ├── Jalur bab JavaScript (existing)
│   │   └── /js/:chapterId
│   └── Runtime JS (jsrunner)
│       └── /play
│
└── 02 / Computational Logic
    ├── Computational Logic overview
    │   └── /computational-logic
    ├── Logic Lab / logika proposisional (existing)
    │   └── /computational-logic/proportional-logic
    └── SAT Solver
        └── /computational-logic/sat-solver
```

### 3.2 Prinsip navigasi

- Homepage hanya menonjolkan **2 kartu/jalur utama**.
- Runtime JS menjadi tautan sekunder di dalam kartu **Learning JS**.
- SAT Solver dan Logic Lab menjadi tautan di dalam kartu **Computational Logic**.
- `/computational-logic` diubah dari redirect menjadi **landing page Computational Logic**.
- Header Learning JS tidak memiliki tautan silang ke Computational Logic; perpindahan jalur dilakukan dari homepage atau footer.
- Route lama tetap dipertahankan agar tidak ada tautan yang rusak.

---

## 4. Perubahan Homepage

### 4.1 Hero

- Tetap mempertahankan identitas "belajar dengan mencoba".
- CTA utama menjadi dua pilihan:
  - **Mulai Learning JS** → `/js/:chapterId` pertama.
  - **Jelajahi Computational Logic** → `/computational-logic`.
- Runtime JS tetap bisa diakses sebagai CTA sekunder di dalam konteks Learning JS, bukan CTA utama ketiga.

### 4.2 Metrics

Metrics disesuaikan agar mencerminkan dua jalur:

- Jumlah bab JavaScript.
- Jumlah bagian materi JavaScript.
- Jumlah latihan JavaScript.
- Jumlah bentuk argumen / aktivitas computational logic.

Jika nanti jumlah sesi computational logic sudah final, tambahkan metrik "6 sesi computational logic" atau jumlah modul yang tersedia.

### 4.3 Section jalur belajar

Ganti `LabsSection` yang sekarang berisi 3 kartu menjadi section **2 jalur**:

#### Kartu 1 — Learning JS

Isi:

- Judul: **Learning JS**
- Deskripsi: materi JavaScript bertahap dari nilai dasar sampai asynchronous programming.
- Sub-tautan:
  - Mulai bab pertama.
  - Buka Runtime JS (`/play`).
- Info: jumlah bab, bagian, dan latihan.

#### Kartu 2 — Computational Logic

Isi:

- Judul: **Computational Logic**
- Deskripsi: belajar logika yang dipakai untuk bernalar, memvalidasi argumen, dan menyelesaikan masalah seperti SAT.
- Sub-tautan:
  - Buka Computational Logic (`/computational-logic`).
  - SAT Solver (`/computational-logic/sat-solver`).
  - Logic Lab (`/computational-logic/proportional-logic`).
- Info: SAT Solver + kurikulum 6 sesi (bertahap).

### 4.4 Section kurikulum

- `CurriculumSection` yang ada tetap menjadi daftar bab JavaScript.
- Beri label jelas: **Jalur Learning JS**.
- Tambahkan section baru untuk **Kurikulum Computational Logic** yang menampilkan tabel 6 sesi.
- Karena konten sesi belum dibuat, tampilkan status **"Segera hadir"** atau **"Dalam pengembangan"**.
- Jangan membuat tautan ke halaman sesi yang belum ada.

### 4.5 Header dan footer

#### Header Learning JS

- `Learning JS` → bab pertama atau `/js/...`.
- Header hanya berisi navigasi internal Learning JS: brand, pemilih bab, progres, dan kontrol belajar.
- **Hapus entry point `Computational Logic ↗`** dari `app/pages/js-learning/components/LearningHeader.tsx`.
- Setelah dihapus, tidak ada tautan silang dari header Learning JS ke `/computational-logic`, `/computational-logic/proportional-logic`, atau `/computational-logic/sat-solver`.
- Tautan ke Computational Logic tetap tersedia dari homepage, footer global, dan halaman Computational Logic itu sendiri.

#### Header Computational Logic

- `Computational Logic` → `/computational-logic`.
- `Runtime JS` dapat tetap ada sebagai tautan kecil, tetapi bukan navigasi utama sejajar dengan dua jalur.

Footer:

- JavaScript → bab pertama.
- Runtime JS → `/play`.
- Computational Logic → `/computational-logic`.
- SAT Solver → `/computational-logic/sat-solver`.

---

## 5. Kurikulum Computational Logic

Konten berikut menjadi acuan landing page Computational Logic dan roadmap materi. Keenam sesi sekarang memiliki halaman pengantar yang dapat diakses; latihan interaktif khusus akan terus diperdalam di fase berikutnya.

| Sesi | Materi dan target RPS | Aktivitas aktif mahasiswa |
|---|---|---|
| 1 | Pengantar computational logic dalam AI: logika formal, sintaks, dan semantik | **AI Decision Challenge:** kelompok memeriksa contoh keputusan sistem AI, mengidentifikasi aturan logis yang digunakan, dan berdebat apakah keputusan tersebut valid. |
| 2 | Logika proposisional dan tabel kebenaran | **Truth Table Race:** mahasiswa membuat tabel kebenaran dari skenario sistem login atau akses fitur, lalu bertukar soal dengan kelompok lain untuk memverifikasi hasil. |
| 3 | Ekivalensi logis, CNF, dan DNF | **Logic Transformation Puzzle:** setiap kelompok mengubah ekspresi ke bentuk normal, lalu kelompok lain memeriksa kesetaraan hasilnya. |
| 4 | Aturan inferensi dan validitas argumen | **Valid or Invalid?:** mahasiswa mengadili sekumpulan argumen, menentukan validitasnya, dan membela keputusan dengan aturan inferensi. |
| 5 | Aljabar Boolean dan penyederhanaan | **Circuit Optimization Challenge:** mahasiswa menyederhanakan ekspresi Boolean untuk aturan akses atau rangkaian digital, kemudian membandingkan solusi paling sederhana. |
| 6 | Logika predikat, kuantor, dan interpretasi | **Translate the World:** mahasiswa mengubah pernyataan bahasa sehari-hari menjadi logika predikat, lalu menguji maknanya menggunakan contoh dan counterexample. |

### 5.1 Pemetaan ke fitur yang sudah ada

| Sesi | Fitur existing yang relevan | Rencana |
|---|---|---|
| 1 | Belum ada | Halaman pengantar logika formal, sintaks dan semantik, serta studi kasus keputusan AI |
| 2 | Logic Lab / tabel kebenaran | Perluas skenario login dan akses fitur |
| 3 | SAT Solver (CNF) | Tambahkan latihan transformasi CNF/DNF |
| 4 | Logic Lab (22 bentuk argumen) | Tambahkan mode valid/invalid |
| 5 | Belum ada | Halaman aljabar Boolean + penyederhanaan |
| 6 | Belum ada | Halaman logika predikat + kuantor |

Implementasi sesi 1 mengikuti `plan/sesi_1.md`: halaman materi lengkap berisi tujuan belajar, logika formal, sintaks, semantik, inference rules, contoh AI, rangkuman, dan knowledge check interaktif.

### 5.2 Status konten

| Status | Arti |
|---|---|
| `ready` | Materi dan halaman sudah tersedia |
| `coming-soon` | Judul dan ringkasan tampil, halaman belum ada |
| `draft` | Sedang disusun, belum dipublikasikan |

Sesi 1–6 memakai status `ready` karena halaman materi pengantarnya sudah tersedia. Logic Lab dan SAT Solver menjadi alat praktik untuk sesi terkait.

---

## 6. Struktur File yang Diusulkan

```text
app/
├── routes.ts
├── routes/
│   ├── home.tsx
│   └── computational-logic.tsx          # diubah: landing page, bukan redirect
├── pages/
│   ├── home/
│   │   ├── View.tsx                     # komposisi 2 jalur
│   │   ├── data.ts                      # data jalur + sesi computational logic
│   │   ├── types.ts                     # tipe LearningTrack, LogicSession
│   │   ├── useHome.ts
│   │   └── components/
│   │       ├── HeroSection.tsx          # CTA dua jalur
│   │       ├── TracksSection.tsx        # pengganti LabsSection (2 kartu)
│   │       ├── CurriculumSection.tsx    # jalur Learning JS
│   │       ├── LogicCurriculumSection.tsx # tabel 6 sesi
│   │       ├── MetricsSection.tsx
│   │       ├── HomeHeader.tsx
│   │       └── HomeFooter.tsx
│   ├── computational-logic/             # halaman baru (opsional, fase berikutnya)
│   │   ├── View.tsx
│   │   ├── data.ts
│   │   └── components/
│   ├── js-learning/
│   │   └── components/
│   │       └── LearningHeader.tsx       # hapus entry point Computational Logic
│   └── sat-solver/                      # existing, tidak diubah dulu
├── pages/logic-lab/                     # existing
└── pages/runtime-js/                    # existing
```

Catatan:

- `LabsSection.tsx` bisa diganti nama menjadi `TracksSection.tsx` agar sesuai konsep 2 jalur.
- Jika ingin perubahan lebih kecil, `LabsSection.tsx` boleh dipertahankan namanya tetapi isinya diubah menjadi 2 kartu.
- Halaman `/computational-logic` sebaiknya dibuat sebagai landing page nyata agar SAT Solver punya konteks kurikulum.

---

## 7. Model Data yang Diusulkan

```ts
export type LearningTrackId = "learning-js" | "computational-logic";

export type LearningTrack = {
  id: LearningTrackId;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  links: Array<{ label: string; href: string }>;
  meta: string[];
};

export type LogicSessionStatus = "ready" | "coming-soon" | "draft";

export type LogicSession = {
  session: number;
  topic: string;
  target: string;
  activity: string;
  status: LogicSessionStatus;
  href?: string;
};
```

Data jalur dan 6 sesi disimpan di `app/pages/home/data.ts` agar homepage tidak penuh JSX statis.

---

## 8. Rencana Eksekusi

### Fase 1 — Information architecture dan data

- [x] Tambahkan tipe `LearningTrack` dan `LogicSession`.
- [x] Pindahkan data 2 jalur dan 6 sesi ke `data.ts`.
- [x] Tentukan label final: "Learning JS" dan "Computational Logic".

### Fase 2 — Refactor homepage

- [x] Ubah hero menjadi dua CTA utama.
- [x] Ganti 3 kartu `LabsSection` menjadi 2 kartu jalur.
- [x] Masukkan Runtime JS sebagai tautan di kartu Learning JS.
- [x] Masukkan SAT Solver dan Logic Lab sebagai tautan di kartu Computational Logic.
- [x] Tambahkan section kurikulum Computational Logic dengan tabel 6 sesi dan status sesi.
- [x] Hapus entry point `Computational Logic ↗` dari header Learning JS (`LearningHeader.tsx`).
- [x] Pastikan header Learning JS hanya berisi navigasi internal Learning JS dan tidak menautkan ke route Computational Logic.
- [x] Sesuaikan metrics, header, footer, dan copy.

### Fase 3 — Landing page Computational Logic

- [x] Ubah `/computational-logic` dari redirect menjadi landing page.
- [x] Tampilkan ringkasan jalur, tautan Logic Lab dan SAT Solver, serta roadmap 6 sesi.
- [x] Tambahkan meta title, description, canonical, dan social meta.
- [x] Masukkan route ini ke sitemap.

### Fase 4 — Konten sesi (bertahap, di masa depan)

- [x] Sesi 1: buat halaman pengantar logika formal, sintaks dan semantik, serta AI Decision Challenge.
- [x] Sesi 2: perluas Logic Lab untuk skenario login/akses fitur.
- [x] Sesi 4: tambahkan mode valid/invalid argument.
- [x] Sesi 3, 5, 6: buat halaman materi baru saat konten siap.
- [x] Ubah status sesi dari `coming-soon` menjadi `ready` setelah halaman tersedia.

### Fase 5 — Verifikasi

- [x] Semua route lama tetap dipertahankan.
- [x] Tidak ada tautan ke halaman sesi yang belum ada.
- [x] Responsive di mobile, tablet, dan desktop.
- [x] Keyboard navigation dan aria label tetap baik.
- [x] Typecheck dan production build lolos.
- [x] Sitemap dan metadata diperbarui.

---

## 9. Acceptance Criteria

- Homepage menampilkan **2 jalur utama**, bukan 3 kartu setara.
- Runtime JS dapat diakses dari jalur **Learning JS**.
- SAT Solver dapat diakses dari jalur **Computational Logic**.
- Header Learning JS **tidak lagi** menampilkan entry point/tautan ke Computational Logic.
- Navigasi silang ke Computational Logic hanya tersedia dari homepage, footer global, dan halaman Computational Logic.
- Landing page `/computational-logic` menampilkan 6 sesi kurikulum.
- Sesi yang belum memiliki halaman ditandai dengan jelas sebagai "Segera hadir" dan tidak menjadi tautan mati.
- Route existing tidak berubah dan tidak menimbulkan 404.
- Copy header, footer, hero, dan metrics konsisten dengan konsep dua jalur.
- Build dan typecheck lolos.

---

## 10. Di Luar Scope

- Implementasi materi lengkap untuk 6 sesi computational logic.
- Perubahan besar pada SAT Solver, Logic Lab, atau Runtime JS.
- Backend, database, autentikasi, atau progress lintas perangkat.
- Penghapusan route `/lab` atau halaman eksperimen lain.
- Rename route `/play` menjadi route baru; URL lama dipertahankan.

---

## 11. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| Runtime JS kehilangan visibilitas setelah digabung ke Learning JS | Tetap tampilkan sebagai tautan sekunder yang jelas di kartu dan footer. |
| SAT Solver sulit ditemukan | Tampilkan sebagai tautan utama di kartu Computational Logic dan landing page. |
| Setelah entry point dihapus, pengguna Learning JS bingung pindah jalur | Sediakan tautan Computational Logic di homepage dan footer global, bukan di header Learning JS. |
| Tabel 6 sesi terlihat seperti konten yang sudah jadi | Beri badge status "Segera hadir" dan hindari tautan palsu. |
| Perubahan homepage merusak layout mobile | Uji breakpoint 600px dan 900px serta grid dua kartu. |
| Route `/computational-logic` yang sebelumnya redirect berubah perilaku | Pastikan landing page baru tetap mengarahkan pengguna ke Logic Lab dan SAT Solver. |
