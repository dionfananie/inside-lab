import { expressionToCNF, parseSat, prettySymbols, SAT_VARIABLES } from '~/lib/sat';
import type { NumericClause } from './dimacs';

export type Clause = NumericClause;

let counter = 0;

export function nextId(): string {
  counter += 1;
  return `c${counter.toString(36)}${Date.now().toString(36)}`;
}

const CONNECTORS: Array<[RegExp, string]> = [
  [/\bjika (dan hanya jika|bila dan hanya bila)\b/gi, '↔'],
  [/\bjika\b[^,.;]*\bmaka\b/gi, '→'],
  [/\bkalau\b[^,.;]*\bmaka\b/gi, '→'],
  [/\bdan\b|\bserta\b/gi, '∧'],
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

export function sentenceToSymbolic(sentence: string, startIndex: number): string {
  const trimmed = sentence.trim();
  if (!trimmed) return '';

  let text = trimmed;
  for (const [re, symbol] of CONNECTORS) text = text.replace(re, symbol);
  text = text.replace(/[!?.]+$/g, '');

  const tokens = text
    .split(/\s*([∧∨→↔¬])\s*/)
    .map((token) => token.trim())
    .filter(Boolean);
  const variables = new Map<string, string>();
  const parts: string[] = [];

  for (const token of tokens) {
    if (/^[∧∨→↔¬]$/.test(token)) {
      parts.push(token);
      continue;
    }
    const key = token.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
    if (!key || STOP_WORDS.has(key)) continue;
    let variable = variables.get(key);
    if (!variable) {
      const index = startIndex + variables.size;
      variable = SAT_VARIABLES[index] ?? `v${index + 1}`;
      variables.set(key, variable);
    }
    parts.push(variable);
  }

  return prettySymbols(parts.join(' ').replace(/\s+/g, ' ')).trim();
}

export function symbolicToNumericClauses(symbolic: string): number[][] {
  const expression = parseSat(symbolic);
  return expressionToCNF(expression).map((clause) =>
    clause.map((literal) => {
      const variable = SAT_VARIABLES.indexOf(literal.variable) + 1;
      if (variable < 1) throw new Error(`Variabel ${literal.variable} tidak didukung.`);
      return literal.negated ? -variable : variable;
    }),
  );
}

export function splitBulkSource(source: string): string[] {
  return source
    .split(/[;\n]/)
    .map((value) => value.trim())
    .filter(Boolean);
}

export function variableCount(clauses: Clause[]): number {
  return clauses.reduce((max, clause) => {
    const literals = clause.raw.trim().split(/\s+/).slice(0, -1).map(Number);
    return Math.max(max, ...literals.map(Math.abs));
  }, 0);
}
