import { solveDimacs, type DimacsProblem } from './dimacs';

export type SatResult =
  | { status: 'idle' }
  | {
      status: 'sat';
      assignment: Record<number, boolean>;
      variables: number[];
      model: number[];
      cpuTime: number;
    }
  | { status: 'unsat'; variables: number[]; cpuTime: number }
  | { status: 'error'; message: string };

export function solveSat(problem: DimacsProblem): SatResult {
  if (problem.clauses.length === 0) return { status: 'idle' };

  const startedAt = performance.now();
  const outcome = solveDimacs(problem);
  const cpuTime = (performance.now() - startedAt) / 1000;
  const variables = Array.from({ length: problem.variables }, (_, index) => index + 1);

  if (outcome.status === 'sat') {
    const assignment = outcome.assignment ?? {};
    const model = variables.map((variable) => (assignment[variable] ? variable : -variable));

    return {
      status: 'sat',
      assignment,
      variables,
      model,
      cpuTime,
    };
  }
  return { status: 'unsat', variables, cpuTime };
}
