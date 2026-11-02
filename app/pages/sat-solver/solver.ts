import { evaluateSat, usedSatVariables, type SatExpression } from '~/lib/sat';

export type SatResult =
  | { status: 'idle' }
  | {
      status: 'sat';
      assignment: Record<string, boolean>;
      variables: string[];
    }
  | { status: 'unsat'; variables: string[] }
  | { status: 'error'; message: string };

export function solveSat(
  expressions: { clause: string; expression: SatExpression }[],
): SatResult {
  if (expressions.length === 0) return { status: 'idle' };

  const variables = usedSatVariables(...expressions.map((e) => e.expression));
  if (variables.length > 12) {
    return {
      status: 'error',
      message: 'Terlalu banyak variabel untuk solver demo (maksimal 12).',
    };
  }

  const clauses = expressions.map((e) => e.expression);

  // Backtracking search + early prune.
  const total = 1 << variables.length;
  let found: Record<string, boolean> | null = null;

  for (let mask = 0; mask < total; mask++) {
    const values: Record<string, boolean> = {};
    variables.forEach((v, i) => {
      values[v] = !(mask & (1 << (variables.length - i - 1)));
    });
    const ok = clauses.every((c) => evaluateSat(c, values));
    if (ok) {
      found = values;
      break;
    }
  }

  if (found) return { status: 'sat', assignment: found, variables };
  return { status: 'unsat', variables };
}
