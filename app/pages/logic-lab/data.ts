import type { Operator } from './types';

export const operators: Operator[] = [
  ['¬', 'tidak', 'Membalik nilai benar dan salah.'],
  ['∧', 'dan', 'Benar hanya jika kedua sisi benar.'],
  ['∨', 'atau', 'Benar jika setidaknya satu sisi benar; boleh keduanya.'],
  [
    '→',
    'jika … maka',
    'Salah hanya saat sisi kiri benar dan sisi kanan salah.',
  ],
  [
    '↔',
    'jika dan hanya jika',
    'Benar jika kedua sisi memiliki nilai yang sama.',
  ],
];

export const formulaSymbols = [
  'p',
  'q',
  'r',
  's',
  ...operators.map((operator) => operator[0]),
  '(',
  ')',
  '⊤',
  '⊥',
];
