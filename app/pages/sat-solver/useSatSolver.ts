import { useCallback, useMemo, useRef, useState } from 'react';
import { formatDimacs, parseDimacsClauses } from './dimacs';
import type { SatResult } from './solver';
import { solveSat } from './solver';
import {
  nextId,
  sentenceToSymbolic,
  splitBulkSource,
  symbolicToNumericClauses,
  variableCount,
  type Clause,
} from './helpers';

export default function useSatSolver() {
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [source, setSource] = useState('');
  const [numericSource, setNumericSource] = useState('');
  const [result, setResult] = useState<SatResult>({ status: 'idle' });
  const [announcement, setAnnouncement] = useState('');
  const sourceInput = useRef<HTMLTextAreaElement>(null);
  const numericSourceInput = useRef<HTMLTextAreaElement>(null);

  const validation = useMemo(() => parseDimacsClauses(clauses), [clauses]);
  const problem = validation.problem;
  const variableTotal = problem?.variables ?? variableCount(clauses);
  const statementTotal = clauses.length;
  const dimacsText = problem ? formatDimacs(problem) : '';

  const resetResult = () => setResult({ status: 'idle' });

  function appendRows(rows: Clause[]) {
    if (rows.length === 0) return;
    setClauses((prev) => [...prev, ...rows]);
    resetResult();
    setAnnouncement(`${rows.length} klausa ditambahkan.`);
  }

  function addFromSource() {
    const sentences = splitBulkSource(source);
    if (sentences.length === 0) return;

    const rows: Clause[] = [];
    try {
      sentences.forEach((sentence, sentenceIndex) => {
        const symbolic = sentenceToSymbolic(sentence, variableCount(clauses) + sentenceIndex);
        const numericClauses = symbolicToNumericClauses(symbolic);
        numericClauses.forEach((literals) => {
          rows.push({ id: nextId(), raw: `${literals.join(' ')} 0` });
        });
      });
      appendRows(rows);
      setSource('');
      requestAnimationFrame(() => sourceInput.current?.focus());
    } catch (error) {
      setAnnouncement(error instanceof Error ? error.message : 'Kalimat belum dapat diubah.');
    }
  }

  function addFromNumericSource() {
    const values = numericSource
      .split(/[\n;]/)
      .map((value) => value.trim())
      .filter(Boolean);
    if (values.length === 0) return;
    appendRows(values.map((raw) => ({ id: nextId(), raw })));
    setNumericSource('');
    requestAnimationFrame(() => numericSourceInput.current?.focus());
  }

  const addClause = useCallback(() => addFromSource(), [source, clauses]);
  const addNumericClause = useCallback(
    () => addFromNumericSource(),
    [numericSource],
  );

  function updateClause(id: string, raw: string) {
    setClauses((prev) => prev.map((c) => (c.id === id ? { ...c, raw } : c)));
    resetResult();
  }

  function removeClause(id: string) {
    setClauses((prev) => prev.filter((c) => c.id !== id));
    resetResult();
  }

  function run() {
    if (validation.errors.length > 0 || !problem) {
      setResult({ status: 'error', message: validation.errors[0] ?? 'Masukkan klausa terlebih dahulu.' });
      setAnnouncement('Periksa format DIMACS pada daftar klausa.');
      return;
    }
    const outcome = solveSat(problem);
    setResult(outcome);
    setAnnouncement(
      outcome.status === 'sat'
        ? 'Formula SAT dapat dipenuhi.'
        : outcome.status === 'unsat'
          ? 'Formula UNSAT tidak dapat dipenuhi.'
          : 'Pemeriksaan selesai.',
    );
  }

  return {
    addClause,
    addNumericClause,
    announcement,
    clauses,
    dimacsText,
    numericSource,
    numericSourceInput,
    problem,
    removeClause,
    result,
    run,
    setNumericSource,
    setSource,
    source,
    sourceInput,
    statementTotal,
    updateClause,
    validation,
    variableTotal,
  };
}
