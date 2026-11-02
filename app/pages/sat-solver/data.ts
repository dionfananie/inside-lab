export type Operator = readonly [symbol: string, label: string, help: string];

export const satOperators: Operator[] = [
  ['¬', 'tidak', 'Membalik nilai benar dan salah.'],
  ['∧', 'dan', 'Benar hanya jika kedua sisi benar.'],
  ['∨', 'atau', 'Benar jika setidaknya satu sisi benar; boleh keduanya.'],
  ['→', 'jika … maka', 'Salah hanya saat sisi kiri benar dan kanan salah.'],
  ['↔', 'jika dan hanya jika', 'Benar jika kedua sisi memiliki nilai yang sama.'],
];

export const sampleSentences = [
  'Saya belajar atau saya tidak paham',
  'Kalau hujan maka jalanan basah',
  'Halaman ini terbuka dan kode berhasil dijalankan',
];
