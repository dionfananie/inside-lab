import { useMemo, useRef, useState } from 'react';
import {
  parse,
  truthRows,
  usedVariables,
  type Values,
  type Variable,
} from '~/lib/propositional-logic';
import { rules, scenarios } from './rules';
import type { FormulaField, LogicAnalysis, Sentences, TruthRow } from './types';

export default function useLogicLab() {
  const [selected, setSelected] = useState(0);
  const [premiseText, setPremiseText] = useState(rules[0].premise);
  const [conclusionText, setConclusionText] = useState(rules[0].conclusion);
  const [values, setValues] = useState<Values>({
    p: true,
    q: true,
    r: false,
    s: false,
  });
  const [sentences, setSentences] = useState<Sentences>({
    ...scenarios[0].sentences,
  });
  const [scenario, setScenario] = useState('0');
  const [announcement, setAnnouncement] = useState('');
  const field = useRef<FormulaField>('conclusion');
  const premiseInput = useRef<HTMLInputElement>(null);
  const conclusionInput = useRef<HTMLInputElement>(null);
  const playgroundTitle = useRef<HTMLHeadingElement>(null);
  const rule = rules[selected];
  const modified =
    premiseText !== rule.premise || conclusionText !== rule.conclusion;
  const analysis = useMemo<LogicAnalysis>(() => {
    try {
      const premise = parse(premiseText.trim() || '⊤');
      const conclusion = parse(conclusionText);
      const active = usedVariables(premise, conclusion);
      const rows = truthRows(premise, conclusion);
      return { premise, conclusion, active, rows, error: '' };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : 'Rumus belum dapat dibaca.',
      };
    }
  }, [premiseText, conclusionText]);
  const active =
    analysis.active ??
    usedVariables(parse(rule.premise || '⊤'), parse(rule.conclusion));
  const rows = analysis.rows ?? [];
  const counterexamples = rows.filter((row) => row.counterexample);
  const current = rows.find((row) =>
    active.every((variable) => row.values[variable] === values[variable]),
  );
  const noPremise = !premiseText.trim();

  function chooseRule(index: number) {
    setSelected(index);
    setPremiseText(rules[index].premise);
    setConclusionText(rules[index].conclusion);
    setAnnouncement(
      'Contoh ' +
        (index + 1) +
        ': ' +
        rules[index].name +
        ' dibuka. Kalimat dan nilai pernyataanmu tetap dipertahankan.',
    );
    requestAnimationFrame(() => {
      playgroundTitle.current?.focus({ preventScroll: true });
      playgroundTitle.current?.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      });
    });
  }

  function insertSymbol(symbol: string) {
    const input =
      field.current === 'premise'
        ? premiseInput.current
        : conclusionInput.current;
    const text = field.current === 'premise' ? premiseText : conclusionText;
    const start = input?.selectionStart ?? text.length;
    const end = input?.selectionEnd ?? start;
    const next = text.slice(0, start) + symbol + text.slice(end);
    if (next.length > 240) return;
    if (field.current === 'premise') setPremiseText(next);
    else setConclusionText(next);
    requestAnimationFrame(() => {
      input?.focus();
      input?.setSelectionRange(start + symbol.length, start + symbol.length);
    });
  }

  function selectScenario(value: string) {
    const index = Number(value);
    setScenario(value);
    setSentences({ ...scenarios[index].sentences });
  }

  function updateSentence(variable: Variable, text: string) {
    setSentences({ ...sentences, [variable]: text });
    setScenario('custom');
  }

  function updateValue(variable: Variable, value: boolean) {
    setValues({ ...values, [variable]: value });
  }

  function resetFormula() {
    setPremiseText(rule.premise);
    setConclusionText(rule.conclusion);
  }

  function selectRow(row: TruthRow) {
    setValues({
      ...values,
      ...Object.fromEntries(
        active.map((variable) => [variable, row.values[variable]]),
      ),
    });
  }

  return {
    active,
    analysis,
    announcement,
    conclusionInput,
    conclusionText,
    counterexamples,
    current,
    field,
    insertSymbol,
    modified,
    noPremise,
    playgroundTitle,
    premiseInput,
    premiseText,
    resetFormula,
    rows,
    rule,
    scenario,
    selectRow,
    selectScenario,
    selected,
    sentences,
    setConclusionText,
    setPremiseText,
    updateSentence,
    updateValue,
    values,
    chooseRule,
  };
}
