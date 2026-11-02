export type Variable = 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
export type Values = Record<string, boolean>;

export const SAT_VARIABLES: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

export type SatExpression =
  | { kind: 'atom'; value: string }
  | { kind: 'not'; child: SatExpression }
  | {
      kind: 'binary';
      op: '∧' | '∨' | '→' | '↔';
      left: SatExpression;
      right: SatExpression;
    };

export function prettySymbols(source: string): string {
  return source
    .replace(/<->/g, '↔')
    .replace(/->/g, '→')
    .replace(/&&/g, '∧')
    .replace(/&/g, '∧')
    .replace(/\|\|/g, '∨')
    .replace(/\|/g, '∨')
    .replace(/[!~]/g, '¬')
    .replace(/\bnand\b/g, '¬')
    .replace(/\bnot\b/g, '¬')
    .replace(/\band\b/g, '∧')
    .replace(/\bor\b/g, '∨')
    .replace(/\s+/g, ' ');
}

const ALLOWED = /^[a-z01⊤⊥¬∧∨→↔()\s]+$/u;

export function parseSat(source: string): SatExpression {
  if (source.length > 500)
    throw new Error('Rumus maksimal 500 karakter.');
  const clean = prettySymbols(source).replace(/\s+/g, '');
  if (!clean) throw new Error('Isi rumus terlebih dahulu.');
  if (!ALLOWED.test(clean) && /[^a-z01⊤⊥¬∧∨→↔()\s]/.test(clean))
    throw new Error('Gunakan huruf, 0, 1, tanda kurung, dan operator ¬ ∧ ∨ → ↔.');

  let i = 0;
  function atom(): SatExpression {
    const c = clean[i++] ?? '';
    if (c === '¬') return { kind: 'not', child: atom() };
    if (c === '(') {
      const e = iff();
      if (clean[i++] !== ')')
        throw new Error('Ada tanda kurung yang belum ditutup.');
      return e;
    }
    if (/[a-z]/.test(c)) return { kind: 'atom', value: c };
    if (c === '⊤' || c === '1') return { kind: 'atom', value: '⊤' };
    if (c === '⊥' || c === '0') return { kind: 'atom', value: '⊥' };
    throw new Error('Ada bagian rumus yang belum lengkap.');
  }
  function and(): SatExpression {
    let e = atom();
    while (clean[i] === '∧') {
      i++;
      e = { kind: 'binary', op: '∧', left: e, right: atom() };
    }
    return e;
  }
  function or(): SatExpression {
    let e = and();
    while (clean[i] === '∨') {
      i++;
      e = { kind: 'binary', op: '∨', left: e, right: and() };
    }
    return e;
  }
  function implies(): SatExpression {
    const e = or();
    if (clean[i] === '→') {
      i++;
      return { kind: 'binary', op: '→', left: e, right: implies() };
    }
    return e;
  }
  function iff(): SatExpression {
    let e = implies();
    while (clean[i] === '↔') {
      i++;
      e = { kind: 'binary', op: '↔', left: e, right: implies() };
    }
    return e;
  }
  const result = iff();
  if (i !== clean.length)
    throw new Error('Periksa operator atau tanda kurung yang berlebih.');
  return result;
}

export function evaluateSat(e: SatExpression, values: Values): boolean {
  if (e.kind === 'atom') {
    if (e.value === '⊤') return true;
    if (e.value === '⊥') return false;
    return values[e.value] ?? false;
  }
  if (e.kind === 'not') return !evaluateSat(e.child, values);
  const a = evaluateSat(e.left, values);
  const b = evaluateSat(e.right, values);
  if (e.op === '∧') return a && b;
  if (e.op === '∨') return a || b;
  if (e.op === '→') return !a || b;
  return a === b;
}

export function usedSatVariables(...expressions: SatExpression[]): string[] {
  const used = new Set<string>();
  function walk(e: SatExpression) {
    if (e.kind === 'atom') {
      if (e.value !== '⊤' && e.value !== '⊥') used.add(e.value);
    } else if (e.kind === 'not') walk(e.child);
    else {
      walk(e.left);
      walk(e.right);
    }
  }
  expressions.forEach(walk);
  return SAT_VARIABLES.filter((v) => used.has(v)).concat(
    [...used].filter((v) => !SAT_VARIABLES.includes(v)).sort(),
  );
}

// ── CNF conversion ────────────────────────────────────────────────────────────
type CNFLiteral = { variable: string; negated: boolean };
export type CNFClause = CNFLiteral[];
export type CNF = CNFClause[];

function lit(e: SatExpression, negate: boolean): SatExpression {
  return negate ? { kind: 'not', child: e } : e;
}

function distribute(a: CNF, b: CNF): CNF {
  const out: CNF = [];
  for (const ca of a) {
    for (const cb of b) out.push([...ca, ...cb]);
  }
  return out;
}

function toCNF(e: SatExpression, negated = false): CNF {
  if (e.kind === 'atom') return [[{ variable: e.value, negated }]];
  if (e.kind === 'not') {
    const child = e.child;
    if (child.kind === 'atom')
      return [[{ variable: child.value, negated: !negated }]];
    if (child.kind === 'not') return toCNF(child.child, negated);
    if (child.kind === 'binary') {
      if (child.op === '∧')
        return negated
          ? toCNF(lit(child, false), true)
          : toCNF({ kind: 'not', child: child.left }, false).concat(
              toCNF({ kind: 'not', child: child.right }, false),
            ).map((c) => c);
      if (child.op === '∨')
        return toCNF({ kind: 'binary', op: '∧', left: { kind: 'not', child: child.left }, right: { kind: 'not', child: child.right } }, negated);
      if (child.op === '→')
        return toCNF({ kind: 'binary', op: '∧', left: child.left, right: { kind: 'not', child: child.right } }, negated);
      if (child.op === '↔')
        return toCNF(
          {
            kind: 'binary',
            op: '∨',
            left: { kind: 'binary', op: '∧', left: child.left, right: child.right },
            right: { kind: 'binary', op: '∧', left: { kind: 'not', child: child.left }, right: { kind: 'not', child: child.right } },
          },
          negated,
        );
    }
  }
  if (e.kind === 'binary') {
    if (e.op === '∧')
      return toCNF(e.left, negated).concat(toCNF(e.right, negated));
    if (e.op === '∨')
      return distribute(toCNF(e.left, negated), toCNF(e.right, negated));
    if (e.op === '→') return toCNF({ kind: 'binary', op: '∨', left: { kind: 'not', child: e.left }, right: e.right }, negated);
    if (e.op === '↔') return toCNF(
      { kind: 'binary', op: '∧', left: { kind: 'binary', op: '→', left: e.left, right: e.right }, right: { kind: 'binary', op: '→', left: e.right, right: e.left } },
      negated,
    );
  }
  return [];
}

function simplify(cnf: CNF): CNF {
  const cleaned: CNF = [];
  for (const clause of cnf) {
    const seen = new Set<string>();
    let tautology = false;
    const literals: CNFLiteral[] = [];
    for (const l of clause) {
      if (l.variable === '⊤') {
        if (!l.negated) tautology = true;
        continue;
      }
      if (l.variable === '⊥') {
        if (l.negated) tautology = true;
        continue;
      }
      const key = l.variable + (l.negated ? '!' : '');
      if (seen.has(key)) continue;
      if (seen.has(l.variable + (!l.negated ? '!' : ''))) tautology = true;
      seen.add(key);
      literals.push(l);
    }
    if (!tautology) cleaned.push(literals);
  }
  return cleaned;
}

export function expressionToCNF(e: SatExpression): CNF {
  return simplify(toCNF(e, false));
}
