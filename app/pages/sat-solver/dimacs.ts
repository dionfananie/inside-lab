export type NumericClause = {
  id: string;
  raw: string;
};

export type DimacsProblem = {
  variables: number;
  clauses: number[][];
};

export type DimacsValidation = {
  problem: DimacsProblem | null;
  errors: string[];
};

export function parseDimacsClauses(
  rows: NumericClause[],
  variableLimit = 26,
  declaredVariables = 0,
): DimacsValidation {
  const errors: string[] = [];
  const clauses: number[][] = [];
  let maxVariable = 0;

  rows.forEach((row, index) => {
    const line = row.raw.trim();
    const label = `Klausa ${index + 1}`;
    if (!line) {
      errors.push(`${label} masih kosong.`);
      return;
    }

    const tokens = line.split(/\s+/);
    const values = tokens.map(Number);
    if (values.some((value) => !Number.isInteger(value))) {
      errors.push(`${label} hanya boleh berisi angka yang dipisahkan spasi.`);
      return;
    }
    if (values.at(-1) !== 0) {
      errors.push(`${label} harus diakhiri angka 0.`);
      return;
    }

    const literals = values.slice(0, -1);
    if (literals.some((literal) => literal === 0)) {
      errors.push(`${label} tidak boleh memiliki 0 sebelum akhir.`);
      return;
    }
    if (literals.some((literal) => Math.abs(literal) > variableLimit)) {
      errors.push(
        `${label} memakai variabel di luar batas 1–${variableLimit}.`,
      );
      return;
    }

    literals.forEach((literal) => {
      maxVariable = Math.max(maxVariable, Math.abs(literal));
    });
    clauses.push(literals);
  });

  if (errors.length > 0) return { problem: null, errors };
  return {
    problem: {
      variables: Math.max(maxVariable, declaredVariables),
      clauses,
    },
    errors,
  };
}

export type ParsedDimacsInput = {
  clauses: number[][];
  declaredVariables: number;
};

export function parseDimacsInput(text: string): ParsedDimacsInput {
  const tokens: string[] = [];
  let declaredVariables = 0;
  let hasHeader = false;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith('c')) continue;

    if (/^p\s+cnf\b/i.test(line)) {
      if (hasHeader) {
        throw new Error('Hanya boleh ada satu header DIMACS.');
      }
      const match = /^p\s+cnf\s+(\d+)\s+(\d+)\s*$/i.exec(line);
      if (!match) {
        throw new Error(
          'Header DIMACS harus berformat "p cnf <jumlah variabel> <jumlah klausa>".',
        );
      }
      hasHeader = true;
      declaredVariables = Number(match[1]);
      continue;
    }

    tokens.push(...line.split(/[\s;]+/).filter(Boolean));
  }

  const clauses: number[][] = [];
  let current: number[] = [];

  tokens.forEach((token) => {
    const value = Number(token);
    if (!Number.isInteger(value)) {
      throw new Error('Klausa DIMACS hanya boleh berisi angka dan 0.');
    }
    if (value === 0) {
      clauses.push(current);
      current = [];
      return;
    }
    current.push(value);
  });

  if (current.length > 0) {
    throw new Error('Setiap klausa DIMACS harus diakhiri angka 0.');
  }

  return { clauses, declaredVariables };
}

export function formatDimacs(problem: DimacsProblem): string {
  return [
    `p cnf ${problem.variables} ${problem.clauses.length}`,
    ...problem.clauses.map((clause) => `${clause.join(' ')} 0`),
  ].join('\n');
}

export function numericClauseFromLiterals(literals: number[]): string {
  return `${literals.join(' ')} 0`;
}

export function solveDimacs(problem: DimacsProblem): {
  status: 'sat' | 'unsat';
  assignment?: Record<number, boolean>;
} {
  const assignment: Record<number, boolean> = {};

  function clauseState(clause: number[]): 'satisfied' | 'open' | 'failed' {
    let open = false;
    for (const literal of clause) {
      const variable = Math.abs(literal);
      const value = assignment[variable];
      if (value === undefined) {
        open = true;
        continue;
      }
      if (value === (literal > 0)) return 'satisfied';
    }
    return open ? 'open' : 'failed';
  }

  function search(variable: number): boolean {
    let allSatisfied = true;
    for (const clause of problem.clauses) {
      const state = clauseState(clause);
      if (state === 'failed') return false;
      if (state === 'open') allSatisfied = false;
    }
    if (allSatisfied) return true;
    if (variable > problem.variables) return false;

    assignment[variable] = true;
    if (search(variable + 1)) return true;
    assignment[variable] = false;
    if (search(variable + 1)) return true;
    delete assignment[variable];
    return false;
  }

  if (search(1)) return { status: 'sat', assignment: { ...assignment } };
  return { status: 'unsat' };
}
