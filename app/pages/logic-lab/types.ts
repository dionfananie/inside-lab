import type {
  Expression,
  Values,
  Variable,
} from '~/lib/propositional-logic';

export type FormulaField = 'premise' | 'conclusion';

export type Operator = readonly [
  symbol: string,
  label: string,
  help: string,
];

export type Sentences = Record<Variable, string>;

export type LogicAnalysis = {
  premise?: Expression;
  conclusion?: Expression;
  active?: Variable[];
  rows?: TruthRow[];
  error: string;
};

export type TruthRow = {
  values: Values;
  premise: boolean;
  conclusion: boolean;
  counterexample: boolean;
};
