export type LogicRule = {
  name: string;
  premise: string;
  conclusion: string;
  explanation: string;
};
export const rules: LogicRule[] = [
  {
    name: 'Modus Ponens',
    premise: '(p → q) ∧ p',
    conclusion: 'q',
    explanation:
      'Jika hubungan p → q berlaku dan p benar, q harus benar. Yang digunakan adalah kondisi p, bukan hanya hasil q.',
  },
  {
    name: 'Modus Tollens',
    premise: '(p → q) ∧ ¬q',
    conclusion: '¬p',
    explanation:
      'Jika p selalu diikuti q, tetapi q salah, maka p juga harus salah.',
  },
  {
    name: 'Silogisme Hipotesis',
    premise: '(p → q) ∧ (q → r)',
    conclusion: 'p → r',
    explanation:
      'Rangkai dua hubungan: jika p mengarah ke q dan q mengarah ke r, p mengarah ke r.',
  },
  {
    name: 'Silogisme Disjungtif',
    premise: '(p ∨ q) ∧ ¬p',
    conclusion: 'q',
    explanation:
      'Setidaknya p atau q benar. Jika p ternyata salah, pilihan yang tersisa adalah q.',
  },
  {
    name: 'Dilema Konstruktif',
    premise: '(p → q) ∧ (r → s) ∧ (p ∨ r)',
    conclusion: 'q ∨ s',
    explanation:
      'Salah satu dari dua kondisi terpenuhi. Maka setidaknya salah satu hasil dari kedua hubungan itu harus benar.',
  },
  {
    name: 'Dilema Destruktif',
    premise: '(p → q) ∧ (r → s) ∧ (¬q ∨ ¬s)',
    conclusion: '¬p ∨ ¬r',
    explanation:
      'Setidaknya satu hasil tidak terjadi. Kondisi yang mengharuskan hasil tersebut juga tidak dapat benar.',
  },
  {
    name: 'Dilema Bidireksi',
    premise: '(p → q) ∧ (r → s) ∧ (p ∨ ¬s)',
    conclusion: 'q ∨ ¬r',
    explanation:
      'Jika p benar, q mengikuti. Jika s salah, r harus salah. Kedua jalur memberi pilihan q atau bukan r.',
  },
  {
    name: 'Simplifikasi',
    premise: 'p ∧ q',
    conclusion: 'p',
    explanation:
      'Jika dua pernyataan sama-sama benar, masing-masing pernyataan itu juga benar.',
  },
  {
    name: 'Konjungsi',
    premise: 'p ∧ q',
    conclusion: 'p ∧ q',
    explanation:
      'Dari premis p dan premis q yang keduanya benar, bentuk pernyataan gabungan p ∧ q. Dalam tabel, semua premis digabung dengan ∧.',
  },
  {
    name: 'Penambahan',
    premise: 'p',
    conclusion: 'p ∨ q',
    explanation:
      'Jika p sudah benar, p atau q pasti benar, tanpa perlu mengetahui nilai q.',
  },
  {
    name: 'Komposisi',
    premise: '(p → q) ∧ (p → r)',
    conclusion: 'p → (q ∧ r)',
    explanation:
      'Ketika satu kondisi menjamin dua hasil, kondisi itu juga menjamin kedua hasil sekaligus.',
  },
  {
    name: 'Teorema De Morgan',
    premise: '¬(p ∧ q)',
    conclusion: '¬p ∨ ¬q',
    explanation:
      'Tidak benar bahwa keduanya benar berarti setidaknya salah satu salah. Ini berbeda dari mengatakan bahwa keduanya salah.',
  },
  {
    name: 'Komutasi',
    premise: 'p ∨ q',
    conclusion: 'q ∨ p',
    explanation:
      'Menukar urutan dua pilihan pada operator atau tidak mengubah hasilnya.',
  },
  {
    name: 'Asosiasi',
    premise: 'p ∨ (q ∨ r)',
    conclusion: '(p ∨ q) ∨ r',
    explanation:
      'Untuk rangkaian atau, memindahkan kelompok tanda kurung tidak mengubah hasil.',
  },
  {
    name: 'Distribusi',
    premise: 'p ∧ (q ∨ r)',
    conclusion: '(p ∧ q) ∨ (p ∧ r)',
    explanation:
      'Syarat p berlaku pada kedua kemungkinan. Sebarkan p ke kelompok q dan kelompok r.',
  },
  {
    name: 'Dobel Negasi',
    premise: 'p',
    conclusion: '¬¬p',
    explanation:
      'Dalam logika klasik, membalik nilai benar/salah dua kali menghasilkan nilai awal.',
  },
  {
    name: 'Transposisi',
    premise: 'p → q',
    conclusion: '¬q → ¬p',
    explanation:
      'Jika p mengharuskan q, tidak adanya q meniadakan p. Ini bukan sekadar membalik menjadi q → p.',
  },
  {
    name: 'Implikasi',
    premise: 'p → q',
    conclusion: '¬p ∨ q',
    explanation:
      'Implikasi material hanya salah saat p benar dan q salah. Bentuk bukan p atau q memiliki hasil yang sama.',
  },
  {
    name: 'Ekuivalensi',
    premise: 'p ↔ q',
    conclusion: '(p → q) ∧ (q → p)',
    explanation:
      'Jika dan hanya jika memerlukan hubungan dua arah, bukan hanya dari p menuju q.',
  },
  {
    name: 'Tautologi',
    premise: 'p',
    conclusion: 'p ∨ p',
    explanation:
      'Pada baris ini, p diulang dengan atau sehingga nilainya tetap p. Jangan keliru: p ∨ p tidak selalu benar; yang selalu benar adalah hubungan p → (p ∨ p).',
  },
  {
    name: 'Tertium non datur',
    premise: '',
    conclusion: 'p ∨ ¬p',
    explanation:
      'Dalam logika klasik dua nilai, p atau negasinya selalu benar. Pernyataan ini tidak membutuhkan premis.',
  },
  {
    name: 'Non-Kontradiksi',
    premise: '',
    conclusion: '¬(p ∧ ¬p)',
    explanation:
      'Dalam penilaian yang sama, p dan bukan p tidak dapat sama-sama benar. Negasi gabungan keduanya selalu benar.',
  },
];
export function sequent(rule: LogicRule) {
  return `${rule.name === 'Konjungsi' ? 'p, q' : rule.premise} ⊢ ${rule.conclusion}`.trim();
}
export const scenarios = [
  {
    name: 'Belajar di kampus',
    sentences: {
      p: 'Saya belajar',
      q: 'Saya memahami materi',
      r: 'Saya mengerjakan latihan',
      s: 'Saya siap ujian',
    },
  },
  {
    name: 'Cuaca dan perjalanan',
    sentences: {
      p: 'Hujan turun',
      q: 'Jalanan basah',
      r: 'Saya membawa payung',
      s: 'Saya terlindung dari hujan',
    },
  },
  {
    name: 'Akses laboratorium',
    sentences: {
      p: 'Kartu saya aktif',
      q: 'Saya dapat masuk lab',
      r: 'Saya sudah memesan komputer',
      s: 'Komputer tersedia untuk saya',
    },
  },
];
