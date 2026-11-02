import { solveDimacs, type DimacsProblem } from './dimacs';

export type SatResult =
  | { status: 'idle' }
  | {
      status: 'sat';
      assignment: Record<number, boolean>;
      variables: number[];
    }
  | { status: 'unsat'; variables: number[] }
  | { status: 'error'; message: string };

export function solveSat(problem: DimacsProblem): SatResult {
  if (problem.clauses.length === 0) return { status: 'idle' };
  const outcome = solveDimacs(problem);
  const variables = Array.from({ length: problem.variables }, (_, index) => index + 1);

  if (outcome.status === 'sat') {
    return {
      status: 'sat',
      assignment: outcome.assignment ?? {},
      variables,
    };
  }
  return { status: 'unsat', variables };
}
