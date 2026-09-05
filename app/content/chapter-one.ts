import { moreParts } from './more-parts';
export type TestCase = {
  name: string;
  inputs: Record<string, unknown>;
  args?: unknown[];
  expected: unknown;
};
export type Exercise = {
  id: string;
  stage: 'Prediksi' | 'Lengkapi' | 'Bangun';
  mode: 'expression' | 'script' | 'console' | 'function';
  title: string;
  instruction: string;
  starter: string;
  probe?: string;
  options?: string[];
  answer?: string;
  explanation?: string;
  tests: TestCase[];
  hints: string[];
  solution: string;
};
export type Part = {
  id: string;
  title: string;
  description: string;
  core: string;
  model: string[];
  why: string;
  example: string;
  mistake: string;
  highlights: string[];
  exercises: Exercise[];
};
export const chapter = {
  id: 'values-types-operators',
  title: 'Nilai, Tipe Data & Operator',
  number: '01',
};
export const parts: Part[] = [
  {
    id: 'values-types',
    title: 'Nilai dan tipe data',
    description:
      'Mulai dari tiga hal: mengenali nilai, mengetahui tipenya, dan memberi nama pada nilai.',
    highlights: [
      'typeof',
      'const',
      '//',
      'undefined',
      'null',
      'true',
      'false',
      '+',
    ],
    core: 'Nilai (value) adalah data yang diolah program. Angka seperti 42 bertipe number, teks seperti "halo" bertipe string, dan true (benar) atau false (salah) bertipe boolean. Operator adalah tanda atau kata yang melakukan suatu operasi. Misalnya, typeof memeriksa tipe sebuah nilai. Potongan kode yang menghasilkan nilai, seperti typeof 42 atau 2 + 3, disebut ekspresi (expression).',
    model: ['42', 'typeof 42', '"number"'],
    why: 'Variabel memberi nama pada nilai agar bisa dipakai lagi. Contoh: const age = 20; membuat variabel age dengan nilai 20. Gunakan const untuk nama yang tidak akan diberi nilai baru. Dalam contoh kode, // menandai komentar: catatan yang tidak dijalankan.',
    example:
      'const age = 20;       // age menyimpan angka 20\ntypeof age;           // hasil: "number"\ntypeof "20";          // hasil: "string"\ntypeof false;         // hasil: "boolean"\nconsole.log(age);     // tampilkan 20 di hasil kode',
    mistake:
      '20 dan "20" berbeda tipe: yang pertama angka, yang kedua teks. true dan false ditulis tanpa tanda kutip. Ada juga undefined untuk nilai yang belum tersedia dan null untuk menyatakan tidak ada nilai. typeof null menghasilkan "object" karena perilaku lama JavaScript; bukan berarti null berisi objek.',
    exercises: [
      {
        id: 'types-predict',
        stage: 'Prediksi',
        mode: 'console',
        title: 'Angka atau teks?',
        instruction:
          'console.log(...) menampilkan nilai di dalam kurung pada panel Hasil kode. Menurutmu, apa yang ditampilkan kode berikut? Pilih satu jawaban sebelum menekan Cek jawaban.',
        starter: 'console.log(typeof "204");',
        options: ['number', 'string', '204', 'undefined'],
        answer: 'string',
        explanation:
          '"204" ditulis dengan tanda kutip, jadi tipenya string, bukan number. typeof menghasilkan nama tipe tersebut, lalu console.log menampilkannya sebagai string.',
        tests: [
          { name: 'Tipe dari teks angka', inputs: {}, expected: 'string' },
        ],
        hints: [
          'Lihat tanda kutip di sekitar 204. Tanda kutip membuatnya menjadi teks.',
          'typeof mencari nama tipe data, bukan menampilkan isi datanya.',
        ],
        solution: 'console.log(typeof "204");',
      },
      {
        id: 'types-complete',
        stage: 'Lengkapi',
        mode: 'expression',
        title: 'Periksa tipe sebuah nilai',
        instruction:
          'Variabel value sudah disediakan dan isinya dapat berupa angka, teks, atau boolean, maupun undefined. Ganti undefined di editor dengan ekspresi yang menghasilkan nama tipe value. Gunakan nama value, bukan angka contoh 84.',
        starter: '// Periksa tipe dari variabel value\nundefined',
        tests: [
          {
            name: 'Nilai berupa angka',
            inputs: { value: 84 },
            expected: 'number',
          },
          {
            name: 'Nilai berupa teks',
            inputs: { value: '84' },
            expected: 'string',
          },
          {
            name: 'Nilai berupa boolean',
            inputs: { value: false },
            expected: 'boolean',
          },
          {
            name: 'Nilai belum tersedia',
            inputs: { value: undefined },
            expected: 'undefined',
          },
        ],
        hints: [
          'Tulis typeof di depan nama variabel yang ingin diperiksa.',
          'Contoh: typeof age memeriksa tipe age. Di latihan ini, nama variabelnya value.',
        ],
        solution: 'typeof value',
      },
      {
        id: 'types-build',
        stage: 'Bangun',
        mode: 'script',
        title: 'Buat tiga variabel',
        instruction:
          'Gunakan const untuk membuat tiga variabel: ticketCount berisi angka 3, eventName berisi teks "Night Market", dan isOpen berisi boolean true. Tulis satu variabel per baris dengan pola const nama = nilai;. Nama, huruf besar-kecil, dan nilainya harus sesuai.',
        starter:
          '// Contoh: const age = 20;\n// Buat ticketCount, eventName, dan isOpen di bawah ini.\n',
        probe: '[ticketCount, eventName, isOpen]',
        tests: [
          {
            name: 'Nilai dan tipe sesuai',
            inputs: {},
            expected: [3, 'Night Market', true],
          },
        ],
        hints: [
          'Angka 3 dan boolean true ditulis tanpa kutip. Teks "Night Market" memakai kutip.',
          'Mulai dengan const ticketCount = 3; lalu buat eventName dan isOpen dengan pola yang sama.',
        ],
        solution:
          'const ticketCount = 3;\nconst eventName = "Night Market";\nconst isOpen = true;',
      },
    ],
  },
  ...moreParts,
];
