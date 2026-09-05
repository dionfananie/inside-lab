export type Variable = 'p' | 'q' | 'r' | 's';
export type Values = Record<Variable, boolean>;
export type Expression =
  | { kind: 'atom'; value: Variable | '⊤' | '⊥' }
  | { kind: 'not'; child: Expression }
  | {
      kind: 'binary';
      op: '∧' | '∨' | '→' | '↔';
      left: Expression;
      right: Expression;
    };
export const variables: Variable[] = ['p', 'q', 'r', 's'];
export function parse(source: string): Expression {
  if (source.length > 240)
    throw new Error(
      'Rumus maksimal 240 karakter. Coba pecah menjadi bentuk yang lebih pendek.',
    );
  const clean = source
    .replace(/<->/g, '↔')
    .replace(/->/g, '→')
    .replace(/&&/g, '∧')
    .replace(/\|\|/g, '∨')
    .replace(/[!~]/g, '¬')
    .replace(/&/g, '∧')
    .replace(/\|/g, '∨')
    .replace(/\s/g, '');
  if (!clean) throw new Error('Isi rumus terlebih dahulu. Contoh: p → q.');
  if (/[^pqrs⊤⊥¬∧∨→↔()]/u.test(clean))
    throw new Error(
      'Gunakan p, q, r, s, tanda kurung, dan simbol yang tersedia. Tulis kalimat pada kolom pernyataan.',
    );
  let i = 0;
  function atom(): Expression {
    const c = clean[i++];
    if (c === '¬') return { kind: 'not', child: atom() };
    if (c === '(') {
      const e = iff();
      if (clean[i++] !== ')')
        throw new Error('Ada tanda kurung yang belum ditutup.');
      return e;
    }
    if (c && 'pqrs⊤⊥'.includes(c))
      return { kind: 'atom', value: c as Variable | '⊤' | '⊥' };
    throw new Error(
      'Ada bagian rumus yang belum lengkap. Letakkan pernyataan setelah operator.',
    );
  }
  function and(): Expression {
    let e = atom();
    while (clean[i] === '∧') {
      i++;
      e = { kind: 'binary', op: '∧', left: e, right: atom() };
    }
    return e;
  }
  function or(): Expression {
    let e = and();
    while (clean[i] === '∨') {
      i++;
      e = { kind: 'binary', op: '∨', left: e, right: and() };
    }
    return e;
  }
  function implies(): Expression {
    const e = or();
    if (clean[i] === '→') {
      i++;
      return { kind: 'binary', op: '→', left: e, right: implies() };
    }
    return e;
  }
  function iff(): Expression {
    let e = implies();
    while (clean[i] === '↔') {
      i++;
      e = { kind: 'binary', op: '↔', left: e, right: implies() };
    }
    return e;
  }
  const result = iff();
  if (i !== clean.length)
    throw new Error(
      'Periksa operator di antara pernyataan atau tanda kurung yang berlebih.',
    );
  return result;
}
export function evaluate(e: Expression, values: Values): boolean {
  if (e.kind === 'atom')
    return e.value === '⊤' ? true : e.value === '⊥' ? false : values[e.value];
  if (e.kind === 'not') return !evaluate(e.child, values);
  const a = evaluate(e.left, values),
    b = evaluate(e.right, values);
  return e.op === '∧'
    ? a && b
    : e.op === '∨'
      ? a || b
      : e.op === '→'
        ? !a || b
        : a === b;
}
export function usedVariables(...expressions: Expression[]): Variable[] {
  const used = new Set<Variable>();
  function walk(e: Expression) {
    if (e.kind === 'atom') {
      if (variables.includes(e.value as Variable))
        used.add(e.value as Variable);
    } else if (e.kind === 'not') walk(e.child);
    else {
      walk(e.left);
      walk(e.right);
    }
  }
  expressions.forEach(walk);
  return variables.filter((v) => used.has(v));
}
export function verbalize(
  e: Expression,
  text: Record<Variable, string>,
): string {
  if (e.kind === 'atom')
    return e.value === '⊤'
      ? 'benar'
      : e.value === '⊥'
        ? 'salah'
        : `“${text[e.value].trim() || e.value}”`;
  if (e.kind === 'not')
    return `tidak benar bahwa (${verbalize(e.child, text)})`;
  const a = verbalize(e.left, text),
    b = verbalize(e.right, text);
  if (e.op === '→') return `jika (${a}), maka (${b})`;
  return `(${a}) ${e.op === '∧' ? 'dan' : e.op === '∨' ? 'atau' : 'jika dan hanya jika'} (${b})`;
}
export function truthRows(premise: Expression, conclusion: Expression) {
  const active = usedVariables(premise, conclusion);
  return Array.from({ length: 2 ** active.length }, (_, index) => {
    const values: Values = { p: false, q: false, r: false, s: false };
    active.forEach((v, i) => {
      values[v] = !(index & (1 << (active.length - i - 1)));
    });
    const left = evaluate(premise, values),
      right = evaluate(conclusion, values);
    return {
      values,
      premise: left,
      conclusion: right,
      counterexample: left && !right,
    };
  });
}
