import type { Part } from './chapter-one';
export const moreParts: Part[] = [
  {
    id: 'numbers',
    title: 'Angka dan perhitungan',
    description:
      'Lakukan perhitungan sederhana dan pahami urutan pengerjaannya.',
    highlights: ['**', '+', '-', '*', '/', '%', 'Infinity', 'NaN'],
    core: 'Tipe number mencakup bilangan bulat dan pecahan. Gunakan + untuk tambah, - untuk kurang, * untuk kali, / untuk bagi, % untuk sisa pembagian, dan ** untuk pangkat. Perkalian, pembagian, dan sisa pembagian dikerjakan sebelum penjumlahan atau pengurangan. Bagian di dalam tanda kurung dikerjakan lebih dahulu.',
    model: ['17 % 5', 'sisa pembagian', '2'],
    why: '17 dibagi 5 menghasilkan 3 kelompok utuh dengan sisa 2. Karena itu, 17 % 5 menghasilkan 2. Prinsip yang sama bisa dipakai untuk mencari sisa menit setelah diubah menjadi jam.',
    example:
      '12 + 4 * 3;    // 24: kerjakan 4 * 3 dahulu\n(12 + 4) * 3;  // 48: kerjakan 12 + 4 dahulu\n17 % 5;        // 2: sisa pembagian\n2 ** 5;        // 32: 2 pangkat 5\n7 / 2;         // 3.5: pecahan memakai titik',
    mistake:
      '% mencari sisa pembagian, bukan persentase. Pecahan disimpan dengan ketelitian terbatas: 0.1 + 0.2 bisa menghasilkan 0.30000000000000004, bukan tepat 0.3. Pembagian 8 / 0 menghasilkan Infinity; 0 / 0 menghasilkan NaN, penanda hasil perhitungan yang bukan angka yang valid.',
    exercises: [
      {
        id: 'numbers-predict',
        stage: 'Prediksi',
        mode: 'console',
        title: 'Operasi mana dulu?',
        instruction:
          'Berapa hasil yang ditampilkan kode berikut? Perhatikan urutan perkalian dan penjumlahan.',
        starter: 'console.log(6 + 3 * 4);',
        options: ['36', '18', '24', '15'],
        answer: '18',
        explanation:
          'JavaScript menghitung 3 * 4 terlebih dahulu, yaitu 12. Setelah itu, 6 + 12 menghasilkan 18. Jika ingin menjumlahkan lebih dahulu, tulis (6 + 3) * 4.',
        tests: [{ name: 'Prioritas operasi', inputs: {}, expected: '18' }],
        hints: [
          'Tanda * berarti perkalian. Kerjakan bagian itu lebih dahulu.',
          'Setelah 3 * 4 dihitung, ekspresinya menjadi 6 + 12.',
        ],
        solution: 'console.log(6 + 3 * 4);',
      },
      {
        id: 'numbers-complete',
        stage: 'Lengkapi',
        mode: 'expression',
        title: 'Hitung biaya pesanan',
        instruction:
          'Variabel price adalah harga satu barang, quantity adalah jumlah barang, dan shipping adalah ongkos kirim. Hitung harga seluruh barang, lalu tambahkan ongkos kirim satu kali. Gunakan ketiga nama variabel agar kode bekerja untuk pesanan yang berbeda.',
        starter: '// Ganti 0 dengan perhitungan biaya pesanan\n0',
        tests: [
          {
            name: 'Pesanan biasa',
            inputs: { price: 18000, quantity: 3, shipping: 7000 },
            expected: 61000,
          },
          {
            name: 'Satu barang',
            inputs: { price: 9500, quantity: 1, shipping: 0 },
            expected: 9500,
          },
          {
            name: 'Gratis ongkir',
            inputs: { price: 12000, quantity: 4, shipping: 0 },
            expected: 48000,
          },
        ],
        hints: [
          'Harga seluruh barang adalah harga satu barang dikali jumlahnya. Gunakan operator *.',
          'Kalikan price dengan quantity, lalu tambahkan shipping.',
        ],
        solution: 'price * quantity + shipping',
      },
      {
        id: 'numbers-build',
        stage: 'Bangun',
        mode: 'script',
        title: 'Ubah menit menjadi jam',
        instruction:
          'totalMinutes berisi jumlah menit, berupa bilangan bulat mulai dari 0. Buat minutes untuk sisa menit dan hours untuk jumlah jam utuh. Contoh: 137 menit menjadi 2 jam dan 17 menit. Hitung sisa menit dahulu, lalu kurangi dari total sebelum membaginya dengan 60.',
        starter:
          '// Satu jam = 60 menit.\n// Buat minutes dahulu, lalu hours, menggunakan const.\n',
        probe: '[hours, minutes]',
        tests: [
          {
            name: 'Dua jam lebih',
            inputs: { totalMinutes: 137 },
            expected: [2, 17],
          },
          {
            name: 'Kurang dari sejam',
            inputs: { totalMinutes: 42 },
            expected: [0, 42],
          },
          {
            name: 'Jam tepat',
            inputs: { totalMinutes: 180 },
            expected: [3, 0],
          },
          { name: 'Nol menit', inputs: { totalMinutes: 0 }, expected: [0, 0] },
        ],
        hints: [
          'Gunakan totalMinutes % 60 untuk menghitung sisa menit. Simpan sebagai minutes.',
          'Gunakan (totalMinutes - minutes) / 60 untuk menghitung hours. Tanda kurung membuat pengurangan dikerjakan dahulu.',
        ],
        solution:
          'const minutes = totalMinutes % 60;\nconst hours = (totalMinutes - minutes) / 60;',
      },
    ],
  },
  {
    id: 'strings',
    title: 'Teks dan penggabungannya',
    description: 'Gabungkan teks dengan nama, angka, dan hasil perhitungan.',
    highlights: ['${...}', '\\n', '+', '`'],
    core: 'String adalah teks, termasuk huruf, angka, spasi, atau tanda baca. Tulis string di antara kutip tunggal (\'), kutip ganda ("), atau backtick (`). Operator + menyambung teks. String dengan backtick disebut template literal: kamu bisa menyisipkan nilai dengan ${...}, misalnya `Halo, ${name}`.',
    model: ['"Halo, " + "Nara"', 'gabungkan', '"Halo, Nara"'],
    why: 'Bagian di dalam ${...} dibaca sebagai kode JavaScript. Nilainya dihitung lebih dahulu, lalu dimasukkan ke teks. Cara ini memudahkan pembuatan pesan yang isinya mengikuti nilai variabel.',
    example:
      '"Kopi" + " susu";     // "Kopi susu"\nconst name = "Nara";\n`Halo, ${name}`;      // "Halo, Nara"\n`Total: ${4 * 12000}`;// "Total: 48000"\n"Baris 1\\nBaris 2";   // \\n membuat baris baru',
    mistake:
      '${...} hanya menyisipkan nilai jika teks memakai backtick (`), bukan kutip biasa. Spasi tidak ditambahkan otomatis: "Halo" + "Nara" menjadi "HaloNara". Tulis \\n di dalam string untuk membuat baris baru; huruf n saja tidak cukup.',
    exercises: [
      {
        id: 'strings-predict',
        stage: 'Prediksi',
        mode: 'console',
        title: 'Perhitungan di dalam teks',
        instruction:
          'Kode ini memakai backtick dan ${...}. Apa teks yang muncul setelah perhitungan di dalamnya selesai?',
        starter: 'console.log(`Ada ${2 + 3} tiket`);',
        options: ['Ada 23 tiket', 'Ada 5 tiket', 'Ada ${2 + 3} tiket', '5'],
        answer: 'Ada 5 tiket',
        explanation:
          'Bagian ${2 + 3} menghitung 2 + 3 menjadi 5. Nilai 5 lalu dimasukkan ke teks, sehingga hasilnya Ada 5 tiket.',
        tests: [
          {
            name: 'Menyisipkan hasil perhitungan',
            inputs: {},
            expected: 'Ada 5 tiket',
          },
        ],
        hints: [
          'Di dalam ${...}, 2 dan 3 adalah angka tanpa kutip.',
          'Hitung 2 + 3, lalu tempatkan hasilnya di antara teks "Ada " dan " tiket".',
        ],
        solution: 'console.log(`Ada ${2 + 3} tiket`);',
      },
      {
        id: 'strings-complete',
        stage: 'Lengkapi',
        mode: 'expression',
        title: 'Label yang bisa berubah',
        instruction:
          'item berisi nama barang dan quantity berisi jumlahnya. Buat teks dengan pola nama barang — jumlah pcs. Untuk item = "Notebook" dan quantity = 4, hasilnya harus "Notebook — 4 pcs". Pertahankan spasi dan tanda —; gunakan variabel agar nama dan jumlah bisa berubah.',
        starter: '// Ganti string kosong dengan label barang\n""',
        tests: [
          {
            name: 'Notebook',
            inputs: { item: 'Notebook', quantity: 4 },
            expected: 'Notebook — 4 pcs',
          },
          {
            name: 'Barang lain',
            inputs: { item: 'Pencil', quantity: 12 },
            expected: 'Pencil — 12 pcs',
          },
          {
            name: 'Stok kosong',
            inputs: { item: 'Eraser', quantity: 0 },
            expected: 'Eraser — 0 pcs',
          },
        ],
        hints: [
          'Gunakan backtick (`) untuk membungkus teks. Sisipkan nama variabel dengan ${...}.',
          'Susun ${item}, lalu " — ", lalu ${quantity}, lalu " pcs" di dalam backtick.',
        ],
        solution: '`${item} — ${quantity} pcs`',
      },
      {
        id: 'strings-build',
        stage: 'Bangun',
        mode: 'script',
        title: 'Struk dua baris',
        instruction:
          'product berisi nama barang dan count berisi jumlahnya. Buat variabel receipt menggunakan const. Isinya harus dua baris: baris pertama diawali "Item: " dan nama barang, baris kedua diawali "Qty: " dan jumlahnya. Contoh untuk Tea dan 2: baris pertama "Item: Tea", baris kedua "Qty: 2". Jangan tambahkan baris kosong.',
        starter:
          '// Buat receipt dengan const.\n// Gunakan \\n di dalam teks untuk memulai baris kedua.\n',
        probe: 'receipt',
        tests: [
          {
            name: 'Tea',
            inputs: { product: 'Tea', count: 2 },
            expected: 'Item: Tea\nQty: 2',
          },
          {
            name: 'Nama dengan spasi',
            inputs: { product: 'Oat Milk', count: 3 },
            expected: 'Item: Oat Milk\nQty: 3',
          },
        ],
        hints: [
          'Gunakan template literal agar product dan count dapat disisipkan ke teks.',
          'Di dalam backtick, susun Item: ${product}, lalu \\n, lalu Qty: ${count}.',
        ],
        solution: 'const receipt = `Item: ${product}\\nQty: ${count}`;',
      },
    ],
  },
  {
    id: 'comparisons',
    title: 'Boolean dan perbandingan',
    description:
      'Bandingkan dua nilai untuk mendapatkan jawaban benar atau salah.',
    highlights: ['!==', '===', '>=', '<=', '>', '<', '='],
    core: 'Boolean hanya memiliki dua nilai: true (benar) dan false (salah). Operator > berarti lebih besar, < lebih kecil, >= lebih besar atau sama dengan, dan <= lebih kecil atau sama dengan. Untuk nilai dasar yang kita pelajari, === memeriksa apakah nilai dan tipenya sama. Operator !== memeriksa kebalikannya.',
    model: ['score >= 75', 'perbandingan', 'true / false'],
    why: 'Pada contoh score >= 75, score adalah nilai ujian. Hasilnya true jika nilainya 75 atau lebih, dan false jika kurang dari 75. Hasil perbandingan ini bisa disimpan dalam variabel untuk dipakai lagi.',
    example:
      '12 > 9;         // true\n12 <= 9;        // false\n75 >= 75;       // true: batas ikut dihitung\n"8" === 8;      // false: teks berbeda dari angka\n"sky" !== "Sky";// true: hurufnya berbeda',
    mistake:
      'Dalam const score = 75;, tanda = memberi nilai pada variabel. Tanda === dipakai untuk membandingkan. Jangan tertukar. Tanda > tidak menyertakan nilai yang sama, sedangkan >= menyertakannya. Perbandingan teks membedakan huruf besar dan kecil.',
    exercises: [
      {
        id: 'compare-predict',
        stage: 'Prediksi',
        mode: 'console',
        title: 'Terlihat sama, tipe berbeda',
        instruction:
          'Apa hasil perbandingan dengan === berikut? Periksa tipe kedua nilai, bukan hanya angka yang terlihat.',
        starter: 'console.log("18" === 18);',
        options: ['true', 'false', '18', 'Error'],
        answer: 'false',
        explanation:
          '"18" bertipe string, sedangkan 18 bertipe number. Karena tipenya berbeda, === menghasilkan false meskipun keduanya tampak seperti angka 18.',
        tests: [
          {
            name: 'Perbandingan nilai dan tipe',
            inputs: {},
            expected: 'false',
          },
        ],
        hints: [
          'Nilai di sebelah kiri memakai tanda kutip. Nilai di sebelah kanan tidak.',
          'Untuk nilai ini, === hanya menghasilkan true jika nilai dan tipenya sama.',
        ],
        solution: 'console.log("18" === 18);',
      },
      {
        id: 'compare-complete',
        stage: 'Lengkapi',
        mode: 'expression',
        title: 'Sudah memenuhi batas?',
        instruction:
          'score berisi nilai ujian dan target berisi nilai minimum yang dibutuhkan. Buat ekspresi yang menghasilkan true jika score sama dengan atau lebih besar dari target, dan false jika di bawahnya.',
        starter: '// Bandingkan score dengan target\nfalse',
        tests: [
          {
            name: 'Di atas batas',
            inputs: { score: 88, target: 75 },
            expected: true,
          },
          {
            name: 'Tepat di batas',
            inputs: { score: 75, target: 75 },
            expected: true,
          },
          {
            name: 'Di bawah batas',
            inputs: { score: 74, target: 75 },
            expected: false,
          },
        ],
        hints: [
          'Nilai yang tepat sama dengan target juga harus menghasilkan true.',
          'Gunakan >= untuk memeriksa “lebih besar atau sama dengan”.',
        ],
        solution: 'score >= target',
      },
      {
        id: 'compare-build',
        stage: 'Bangun',
        mode: 'script',
        title: 'Cek kode undangan',
        instruction:
          'enteredCode adalah kode yang dimasukkan pengguna, sedangkan expectedCode adalah kode yang benar. Buat variabel isMatch menggunakan const. Isinya true hanya jika kedua kode sama nilai dan tipenya; selain itu false. Huruf besar dan kecil juga harus cocok.',
        starter: '// Buat isMatch untuk menyimpan hasil perbandingan\n',
        probe: 'isMatch',
        tests: [
          {
            name: 'Kode cocok',
            inputs: { enteredCode: 'NIGHT7', expectedCode: 'NIGHT7' },
            expected: true,
          },
          {
            name: 'Huruf berbeda',
            inputs: { enteredCode: 'night7', expectedCode: 'NIGHT7' },
            expected: false,
          },
          {
            name: 'Tipe berbeda',
            inputs: { enteredCode: 1234, expectedCode: '1234' },
            expected: false,
          },
        ],
        hints: [
          'Bandingkan enteredCode dengan expectedCode menggunakan ===.',
          'Tulis const isMatch = ..., lalu isi bagian kanan = dengan perbandingan kedua kode.',
        ],
        solution: 'const isMatch = enteredCode === expectedCode;',
      },
    ],
  },
  {
    id: 'logical',
    title: 'Menggabungkan kondisi',
    description: 'Buat aturan dengan “dan”, “atau”, serta “tidak”.',
    highlights: ['&&', '||', '!'],
    core: 'Kondisi adalah nilai atau perbandingan yang digunakan untuk menentukan pilihan. Untuk nilai boolean, && berarti “dan”: kedua sisi harus true. Operator || berarti “atau”: setidaknya satu sisi harus true. Operator ! berarti “tidak”: membalik true menjadi false, atau false menjadi true.',
    model: ['true && false', 'keduanya harus true', 'false'],
    why: 'Aturan masuk acara dapat memiliki dua syarat: cukup umur dan punya tiket. Gabungkan keduanya dengan &&. Gunakan tanda kurung ketika beberapa kondisi perlu dikelompokkan.',
    example:
      'true && true;   // true\ntrue && false;  // false\nfalse || true;  // true\nfalse || false; // false\n!true;          // false\n!false;         // true',
    mistake:
      '|| tidak berarti “hanya satu yang benar”. Jika kedua sisi true, hasilnya tetap true. JavaScript tidak selalu membaca kedua sisi: pada false && ..., sisi kanan dilewati; pada true || ..., sisi kanan juga dilewati. Ini disebut short-circuit. Penggunaan || untuk nilai selain boolean dibahas di bagian 7.',
    exercises: [
      {
        id: 'logic-predict',
        stage: 'Prediksi',
        mode: 'console',
        title: 'Gabungkan dua aturan',
        instruction:
          'Apa hasil gabungan kondisi ini? Hitung isi tanda kurung dan !true, lalu gabungkan hasilnya dengan &&.',
        starter: 'console.log((true || false) && !true);',
        options: ['true', 'false', 'undefined', 'Error'],
        answer: 'false',
        explanation:
          'true || false menghasilkan true karena ada satu sisi yang true. !true menjadi false. Akhirnya, true && false menghasilkan false karena kedua sisi tidak sama-sama true.',
        tests: [{ name: 'Kombinasi boolean', inputs: {}, expected: 'false' }],
        hints: [
          '!true berarti kebalikan dari true, yaitu false.',
          'Setelah kedua bagian dihitung, yang tersisa adalah true && false.',
        ],
        solution: 'console.log((true || false) && !true);',
      },
      {
        id: 'logic-complete',
        stage: 'Lengkapi',
        mode: 'expression',
        title: 'Boleh masuk acara?',
        instruction:
          'age berisi usia dan hasTicket menunjukkan apakah seseorang punya tiket. Hasilkan true hanya jika usianya minimal 18 tahun dan hasTicket bernilai true. Jika salah satu syarat tidak terpenuhi, hasilnya harus false.',
        starter: '// Gabungkan dua syarat\nfalse',
        tests: [
          {
            name: 'Dewasa, punya tiket',
            inputs: { age: 20, hasTicket: true },
            expected: true,
          },
          {
            name: 'Belum cukup umur',
            inputs: { age: 17, hasTicket: true },
            expected: false,
          },
          {
            name: 'Tanpa tiket',
            inputs: { age: 24, hasTicket: false },
            expected: false,
          },
          {
            name: 'Tepat 18',
            inputs: { age: 18, hasTicket: true },
            expected: true,
          },
        ],
        hints: [
          'Buat perbandingan age >= 18 untuk syarat usia.',
          'Gabungkan perbandingan usia dan hasTicket dengan &&. hasTicket sudah berupa boolean.',
        ],
        solution: 'age >= 18 && hasTicket',
      },
      {
        id: 'logic-build',
        stage: 'Bangun',
        mode: 'script',
        title: 'Aturan akses ruang belajar',
        instruction:
          'Buat variabel canAccess untuk izin masuk ruang belajar. Seseorang boleh masuk jika akunnya tidak diblokir dan ia memiliki keanggotaan atau tiket harian. isBlocked berarti akun diblokir, isMember berarti punya keanggotaan, dan hasDayPass berarti punya tiket harian. Ketiganya boolean. Akun yang diblokir selalu mendapat hasil false.',
        starter:
          '// Buat canAccess menggunakan const.\n// Syarat: tidak diblokir DAN (anggota ATAU punya tiket harian).\n',
        probe: 'canAccess',
        tests: [
          {
            name: 'Anggota, akun tidak diblokir',
            inputs: { isBlocked: false, isMember: true, hasDayPass: false },
            expected: true,
          },
          {
            name: 'Punya tiket harian',
            inputs: { isBlocked: false, isMember: false, hasDayPass: true },
            expected: true,
          },
          {
            name: 'Diblokir meskipun punya tiket harian',
            inputs: { isBlocked: true, isMember: false, hasDayPass: true },
            expected: false,
          },
          {
            name: 'Tanpa akses',
            inputs: { isBlocked: false, isMember: false, hasDayPass: false },
            expected: false,
          },
        ],
        hints: [
          '!isBlocked menghasilkan true ketika akun tidak diblokir.',
          'Kelompokkan (isMember || hasDayPass), lalu gabungkan dengan !isBlocked menggunakan &&.',
        ],
        solution: 'const canAccess = !isBlocked && (isMember || hasDayPass);',
      },
    ],
  },
  {
    id: 'conditional',
    title: 'Memilih satu dari dua nilai',
    description:
      'Gunakan sebuah kondisi untuk memilih teks, angka, atau nilai lain.',
    highlights: ['??', '?', ':', '>=', '>', 'true', 'false'],
    core: 'Operator kondisional memakai pola kondisi ? nilaiJikaBenar : nilaiJikaSalah. Jika kondisi bernilai true, hasilnya adalah nilai setelah ?. Jika false, hasilnya adalah nilai setelah :. Operator ini juga disebut ternary karena memiliki tiga bagian. Pada latihan ini, kondisinya berupa boolean atau hasil perbandingan.',
    model: ['kondisi', '? nilai jika true', ': nilai jika false'],
    why: 'Misalnya, status kelulusan bergantung pada nilai ujian. Kamu bisa memilih teks "Lulus" atau "Coba lagi", lalu menyimpan teks yang terpilih dalam variabel. Hanya bagian yang terpilih yang dihitung.',
    example:
      'const score = 82;\nconst label = score >= 75 ? "Lulus" : "Coba lagi";\n// label berisi "Lulus" karena 82 >= 75 adalah true\n\nconst isMember = false;\nconst fee = isMember ? 0 : 15000;\n// fee berisi 15000 karena isMember adalah false',
    mistake:
      'Tanda ? dan : harus dipakai berpasangan. Urutannya penting. Nilai untuk kondisi true diletakkan setelah ?, sedangkan nilai untuk false diletakkan setelah :. Jangan tertukar dengan ??, yaitu operator berbeda yang akan dibahas berikutnya.',
    exercises: [
      {
        id: 'conditional-predict',
        stage: 'Prediksi',
        mode: 'console',
        title: 'Tepat di batas',
        instruction:
          'Kode ini membandingkan 70 dengan 70 menggunakan >, lalu memilih teks. Teks mana yang ditampilkan?',
        starter: 'console.log(70 > 70 ? "Lolos" : "Ulang");',
        options: ['Lolos', 'Ulang', 'true', 'false'],
        answer: 'Ulang',
        explanation:
          '70 > 70 menghasilkan false karena 70 tidak lebih besar dari dirinya sendiri. Jadi, teks setelah : dipilih, yaitu "Ulang". Jika memakai >=, hasilnya berbeda.',
        tests: [{ name: 'Cabang false', inputs: {}, expected: 'Ulang' }],
        hints: [
          'Tanda > berarti lebih besar, bukan lebih besar atau sama dengan.',
          'Jika kondisi false, pilih nilai yang ditulis setelah :.',
        ],
        solution: 'console.log(70 > 70 ? "Lolos" : "Ulang");',
      },
      {
        id: 'conditional-complete',
        stage: 'Lengkapi',
        mode: 'expression',
        title: 'Label kelulusan',
        instruction:
          'score berisi nilai ujian. Buat ekspresi yang menghasilkan teks "Lulus" jika score minimal 75, atau "Latihan lagi" jika kurang dari 75. Tulis teksnya persis, termasuk huruf besar dan spasi.',
        starter: '// Pola: kondisi ? nilaiJikaBenar : nilaiJikaSalah\n""',
        tests: [
          { name: 'Di atas batas', inputs: { score: 92 }, expected: 'Lulus' },
          { name: 'Tepat 75', inputs: { score: 75 }, expected: 'Lulus' },
          {
            name: 'Di bawah batas',
            inputs: { score: 74 },
            expected: 'Latihan lagi',
          },
        ],
        hints: [
          'Gunakan score >= 75 sebagai kondisi sebelum tanda ?.',
          'Tempatkan "Lulus" setelah ? dan "Latihan lagi" setelah :.',
        ],
        solution: 'score >= 75 ? "Lulus" : "Latihan lagi"',
      },
      {
        id: 'conditional-build',
        stage: 'Bangun',
        mode: 'script',
        title: 'Pilih biaya layanan',
        instruction:
          'isMember bernilai true untuk anggota dan false untuk bukan anggota. subtotal adalah biaya sebelum layanan. Buat serviceFee bernilai 0 untuk anggota atau 5000 untuk bukan anggota. Lalu buat total berisi subtotal ditambah serviceFee. Gunakan const untuk kedua variabel.',
        starter: '// Buat serviceFee dan total\n',
        probe: '[serviceFee, total]',
        tests: [
          {
            name: 'Anggota',
            inputs: { isMember: true, subtotal: 40000 },
            expected: [0, 40000],
          },
          {
            name: 'Bukan anggota',
            inputs: { isMember: false, subtotal: 40000 },
            expected: [5000, 45000],
          },
          {
            name: 'Subtotal nol',
            inputs: { isMember: false, subtotal: 0 },
            expected: [5000, 5000],
          },
        ],
        hints: [
          'Pakai isMember sebagai kondisi untuk memilih 0 atau 5000, lalu simpan sebagai serviceFee.',
          'Setelah serviceFee dibuat, tulis const total = subtotal + serviceFee;.',
        ],
        solution:
          'const serviceFee = isMember ? 0 : 5000;\nconst total = subtotal + serviceFee;',
      },
    ],
  },
  {
    id: 'defaults',
    title: 'Nilai kosong dan nilai pengganti',
    description:
      'Tentukan kapan data perlu diganti dan kapan nilai 0 atau false harus dipertahankan.',
    highlights: ['??', '||', '&&', 'undefined', 'null', 'truthy', 'falsy'],
    core: 'undefined biasanya berarti nilai belum tersedia, sedangkan null menyatakan tidak ada nilai secara sengaja. Nilai pengganti (default) dipakai saat data tidak memenuhi syarat tertentu. a || b memilih b jika a dianggap salah dalam kondisi (falsy). a ?? b memilih b hanya jika a adalah null atau undefined. Jika syarat penggantian tidak terpenuhi, keduanya mempertahankan a.',
    model: ['0 ?? 10', '0 bukan null / undefined', '0'],
    why: 'Stok 0 berarti barang habis, bukan datanya hilang. Karena itu, 0 ?? 10 tetap menghasilkan 0. Sebaliknya, 0 || 10 menghasilkan 10 karena || memperlakukan 0 sebagai falsy.',
    example:
      '0 || 10;        // 10\n0 ?? 10;        // 0\n"" || "Tamu";   // "Tamu"\n"" ?? "Tamu";   // ""\nnull ?? 10;     // 10\nundefined ?? 10;// 10',
    mistake:
      'Contoh nilai falsy dalam materi ini adalah false, 0, "", null, undefined, dan NaN. Nilai yang dianggap benar disebut truthy; teks "0" dan "false" termasuk truthy karena tidak kosong. ?? mempertahankan 0, false, dan "". Jika menggabungkan ?? dengan || atau &&, gunakan tanda kurung.',
    exercises: [
      {
        id: 'defaults-predict',
        stage: 'Prediksi',
        mode: 'console',
        title: 'Stok kosong bukan data hilang',
        instruction:
          'Dua baris berikut memakai nilai 0 yang sama, tetapi operatornya berbeda. Pilih hasil baris pertama, lalu baris kedua.',
        starter: 'console.log(0 || 12);\nconsole.log(0 ?? 12);',
        options: ['12, lalu 0', '0, lalu 12', '12, lalu 12', '0, lalu 0'],
        answer: '12, lalu 0',
        explanation:
          '0 adalah falsy, sehingga 0 || 12 memilih 12. Pada baris kedua, 0 bukan null atau undefined, sehingga 0 ?? 12 mempertahankan 0.',
        tests: [
          { name: 'Dua aturan nilai pengganti', inputs: {}, expected: '12\n0' },
        ],
        hints: [
          '|| mengganti nilai falsy. ?? hanya mengganti null atau undefined.',
          'Angka 0 adalah falsy, tetapi bukan null dan bukan undefined.',
        ],
        solution: 'console.log(0 || 12);\nconsole.log(0 ?? 12);',
      },
      {
        id: 'defaults-complete',
        stage: 'Lengkapi',
        mode: 'expression',
        title: 'Pertahankan stok nol',
        instruction:
          'stock berisi jumlah stok. Perbaiki kode agar menggunakan nilai stock, termasuk jika nilainya 0. Gunakan 12 hanya jika stock adalah null atau undefined.',
        starter:
          '// Kode ini masih salah ketika stock bernilai 0.\n// Ganti operatornya agar stok 0 tetap dipertahankan.\nstock || 12',
        tests: [
          { name: 'Stok tersedia', inputs: { stock: 8 }, expected: 8 },
          { name: 'Stok habis', inputs: { stock: 0 }, expected: 0 },
          { name: 'Belum diisi', inputs: { stock: undefined }, expected: 12 },
          { name: 'Stok bernilai null', inputs: { stock: null }, expected: 12 },
        ],
        hints: [
          'Dengan ||, stok 0 akan diganti menjadi 12. Itu tidak sesuai kebutuhan latihan.',
          'Gunakan operator ?? untuk mengganti hanya null atau undefined.',
        ],
        solution: 'stock ?? 12',
      },
      {
        id: 'defaults-build',
        stage: 'Bangun',
        mode: 'script',
        title: 'Nama tampilan dan notifikasi',
        instruction:
          'Buat dua variabel dengan const. displayName memakai nickname, atau "Tamu" jika nickname berupa teks kosong, null, atau undefined. notifications memakai preference, atau true jika preference adalah null atau undefined. preference berupa boolean jika tersedia: false berarti pengguna mematikan notifikasi dan harus tetap false.',
        starter: '// Buat displayName dan notifications\n',
        probe: '[displayName, notifications]',
        tests: [
          {
            name: 'Preferensi tersedia',
            inputs: { nickname: 'Lina', preference: false },
            expected: ['Lina', false],
          },
          {
            name: 'Nama kosong',
            inputs: { nickname: '', preference: undefined },
            expected: ['Tamu', true],
          },
          {
            name: 'Nilai null',
            inputs: { nickname: null, preference: null },
            expected: ['Tamu', true],
          },
          {
            name: 'Notifikasi aktif',
            inputs: { nickname: 'Raka', preference: true },
            expected: ['Raka', true],
          },
        ],
        hints: [
          'Nama kosong boleh diganti, tetapi pilihan false pada notifikasi tidak boleh diganti. Kedua variabel memerlukan operator yang berbeda.',
          'Gunakan nickname || "Tamu" untuk displayName dan preference ?? true untuk notifications.',
        ],
        solution:
          'const displayName = nickname || "Tamu";\nconst notifications = preference ?? true;',
      },
    ],
  },
  {
    id: 'coercion',
    title: 'Mengubah tipe data',
    description: 'Ubah teks angka menjadi angka sebelum melakukan perhitungan.',
    highlights: ['===', '==', '+', '-', 'Number', 'String', 'Boolean', 'NaN'],
    core: 'JavaScript kadang mengubah tipe secara otomatis; proses ini disebut type coercion. Contohnya, "7" + 2 menyambung teks menjadi "72", sedangkan "7" - 2 menghitung angka dan menghasilkan 5. Agar tujuanmu jelas, ubah tipe sendiri dengan Number(nilai), String(nilai), atau Boolean(nilai). Masukkan nilai yang ingin diubah di dalam tanda kurung.',
    model: ['"7"', 'Number()', '7'],
    why: 'Data dari kolom isian teks sering berupa string. Number("7") menghasilkan angka 7, sehingga Number("7") + 2 menghasilkan 9. Konversi yang disengaja membantu menghindari penggabungan teks saat kamu ingin menjumlahkan angka.',
    example:
      '"7" + 2;         // "72": gabungkan teks\n"7" - 2;         // 5: pengurangan angka\nNumber("7") + 2; // 9: ubah menjadi angka dahulu\nString(7);       // "7": ubah menjadi teks\nBoolean("");     // false: teks kosong adalah falsy\nBoolean("false");// true: teks ini tidak kosong',
    mistake:
      'Boolean("false") menghasilkan true, bukan false, karena teksnya tidak kosong. Number("") dan Number(null) menghasilkan 0; Number(undefined) atau Number("halo") menghasilkan NaN. Operator == dapat mengubah tipe saat membandingkan, sedangkan === tidak. Misalnya, false == 0 adalah true, tetapi false === 0 adalah false.',
    exercises: [
      {
        id: 'coercion-predict',
        stage: 'Prediksi',
        mode: 'console',
        title: 'Satu string, dua operasi',
        instruction:
          'Apa hasil baris pertama dan kedua? Perhatikan bahwa "9" adalah teks dan kedua baris memakai operator yang berbeda.',
        starter: 'console.log("9" + 2);\nconsole.log("9" - 2);',
        options: ['92, lalu 7', '11, lalu 7', '92, lalu 92', '11, lalu NaN'],
        answer: '92, lalu 7',
        explanation:
          'Pada baris pertama, + menyambung "9" dan 2 menjadi teks "92". Pada baris kedua, - mengubah "9" menjadi angka lalu menghitung 9 - 2, yaitu 7.',
        tests: [
          { name: 'Perubahan tipe otomatis', inputs: {}, expected: '92\n7' },
        ],
        hints: [
          'Dengan teks pada contoh ini, + melakukan penggabungan, bukan penjumlahan.',
          'Operator - melakukan pengurangan angka, sehingga "9" perlu diubah menjadi angka dahulu.',
        ],
        solution: 'console.log("9" + 2);\nconsole.log("9" - 2);',
      },
      {
        id: 'coercion-complete',
        stage: 'Lengkapi',
        mode: 'expression',
        title: 'Jumlahkan, jangan gabungkan',
        instruction:
          'qtyText berisi jumlah dalam bentuk teks angka yang valid, sedangkan bonus sudah berupa number. Perbaiki kode agar qtyText diubah menjadi number sebelum ditambah bonus. Contoh: "7" dengan bonus 2 harus menghasilkan angka 9, bukan teks "72".',
        starter: '// Perbaiki agar menjadi perhitungan angka\nqtyText + bonus',
        tests: [
          {
            name: 'Jumlah biasa',
            inputs: { qtyText: '7', bonus: 2 },
            expected: 9,
          },
          { name: 'Nol', inputs: { qtyText: '0', bonus: 3 }, expected: 3 },
          {
            name: 'Desimal',
            inputs: { qtyText: '2.5', bonus: 1 },
            expected: 3.5,
          },
          {
            name: 'Ada spasi',
            inputs: { qtyText: ' 10 ', bonus: 2 },
            expected: 12,
          },
        ],
        hints: [
          'Number(...) mengubah nilai di dalam kurung menjadi angka jika nilainya dapat dibaca sebagai angka.',
          'Ganti qtyText dengan Number(qtyText), lalu tambahkan bonus.',
        ],
        solution: 'Number(qtyText) + bonus',
      },
      {
        id: 'coercion-build',
        stage: 'Bangun',
        mode: 'script',
        title: 'Latihan gabungan: ringkasan pesanan',
        instruction:
          'priceText dan quantityText berisi harga dan jumlah dalam bentuk teks angka yang valid. Ubah keduanya menjadi angka. Buat total dari harga × jumlah, lalu kurangi discount; gunakan 0 jika discount adalah null atau undefined. Buat summary dengan pola "Total: [total] — [status]". Statusnya "Gratis ongkir" jika total minimal 30000, atau "Ongkir berbayar" jika kurang. Contoh: "Total: 36000 — Gratis ongkir". Ganti [total] dan [status] dengan hasilnya, tanpa tanda kurung siku.',
        starter:
          '// 1. Ubah harga dan jumlah menjadi angka, lalu hitung total.\n// 2. Pilih status ongkir berdasarkan total.\n// 3. Buat summary dengan teks dan spasi yang sesuai.\n',
        probe: '[total, summary]',
        tests: [
          {
            name: 'Dapat gratis ongkir',
            inputs: { priceText: '12000', quantityText: '3', discount: null },
            expected: [36000, 'Total: 36000 — Gratis ongkir'],
          },
          {
            name: 'Di bawah batas',
            inputs: {
              priceText: '10000',
              quantityText: '2',
              discount: undefined,
            },
            expected: [20000, 'Total: 20000 — Ongkir berbayar'],
          },
          {
            name: 'Tepat batas setelah diskon',
            inputs: { priceText: '16000', quantityText: '2', discount: 2000 },
            expected: [30000, 'Total: 30000 — Gratis ongkir'],
          },
          {
            name: 'Diskon nol',
            inputs: { priceText: '7500', quantityText: '4', discount: 0 },
            expected: [30000, 'Total: 30000 — Gratis ongkir'],
          },
        ],
        hints: [
          'Gunakan Number(priceText) * Number(quantityText) - (discount ?? 0), lalu simpan sebagai total.',
          'Simpan hasil total >= 30000 ? "Gratis ongkir" : "Ongkir berbayar" sebagai shipping. Buat summary dengan template literal `Total: ${total} — ${shipping}`.',
        ],
        solution:
          'const total = Number(priceText) * Number(quantityText) - (discount ?? 0);\nconst shipping = total >= 30000 ? "Gratis ongkir" : "Ongkir berbayar";\nconst summary = `Total: ${total} — ${shipping}`;',
      },
    ],
  },
];
