import { parseSat, prettySymbols, SAT_VARIABLES } from '~/lib/sat';

export type Clause = {
  id: string;
  raw: string; // tampilan simbol cantik
};

let counter = 0;
export function nextId(): string {
  counter += 1;
  return 'c' + counter.toString(36) + Date.now().toString(36);
}

const CONNECTORS: Array<[RegExp, string]> = [
  [/\bjika (dan hanya jika|bila dan hanya bila)\b/gi, '↔'],
  [/\bjika\b[^,.;]*\bmaka\b/gi, '→'],
  [/\bkalau\b[^,.;]*\bmaka\b/gi, '→'],
  [/\bdan\b|\bserta\b|\bdengan\b/gi, '∧'],
  [/\batau\b|\bataupun\b/gi, '∨'],
  [/\btidak\b|\bbukan\b|\bbelum\b/gi, '¬'],
];

const STOP_WORDS = new Set([
  'saya',
  'aku',
  'kamu',
  'dia',
  'kami',
  'kita',
  'mereka',
  'ini',
  'itu',
  'adalah',
  'akan',
]);

const ATOM_HEURISTIC = 1.2;

/**
 * Konversi kalimat biasa menjadi klausa SAT simbolik.
 * Heuristik sederhana: ganti kata konektor jadi operator, sisanya jadi
 * proposisi atomik yang dinomori p, q, r, ...
 */
export function sentenceToClause(sentence: string, startIndex: number): string {
  const trimmed = sentence.trim();
  if (!trimmed) return '';

  let text = trimmed;
  for (const [re, symbol] of CONNECTORS) {
    text = text.replace(re, symbol);
  }

  // Buang tanda baca akhir
  text = text.replace(/[!?.]+$/g, '');

  // Token utama setelah konektor disederhanakan
  const tokens = text
    .split(/\s*([∧∨→↔¬])\s*/)
    .map((t) => t.trim())
    .filter(Boolean);

  const variables = new Map<string, string>();
  const parts: string[] = [];

  for (const token of tokens) {
    if (/^[∧∨→↔¬]$/.test(token)) {
      parts.push(token);
      continue;
    }
    // normalisasi token non-operator → variabel
    const key = token
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]/gu, '');
    if (!key || STOP_WORDS.has(key)) continue;
    let variable = variables.get(key);
    if (!variable) {
      const index = startIndex + variables.size;
      variable = SAT_VARIABLES[index] ?? 'x' + index;
      variables.set(key, variable);
    }
    parts.push(variable);
  }

  // heuristik: jika tidak ada operator dan hanya satu token, hasilkan var tunggal
  const joined = parts.join(' ');
  return prettySymbols(joined.replace(/\s+/g, ' ')).trim();
}

export function splitBulkSource(source: string): string[] {
  return source
    .split(/[;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function variableCount(clauses: Clause[]): number {
  const used = new Set<string>();
  for (const clause of clauses) {
    try {
      const expr = parseSat(clause.raw);
      for (const v of usedVariableNames(expr)) used.add(v);
    } catch {
      // abaikan baris yang tidak valid saat menghitung
    }
  }
  return used.size;
}

function usedVariableNames(expr: ReturnType<typeof parseSat>): string[] {
  const used = new Set<string>();
  function walk(e: ReturnType<typeof parseSat>) {
    if (e.kind === 'atom') {
      if (e.value !== '⊤' && e.value !== '⊥') used.add(e.value);
    } else if (e.kind === 'not') walk(e.child);
    else {
      walk(e.left);
      walk(e.right);
    }
  }
  walk(expr);
  return SAT_VARIABLES.filter((v) => used.has(v)).concat(
    [...used].filter((v) => !SAT_VARIABLES.includes(v)).sort(),
  );
}
