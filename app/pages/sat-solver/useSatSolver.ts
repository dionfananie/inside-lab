import { useCallback, useMemo, useRef, useState } from 'react';
import { parseSat } from '~/lib/sat';
import type { SatResult } from './solver';
import { solveSat } from './solver';
import {
  nextId,
  sentenceToClause,
  splitBulkSource,
  variableCount,
  type Clause,
} from './helpers';

export default function useSatSolver() {
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [source, setSource] = useState('');
  const [result, setResult] = useState<SatResult>({ status: 'idle' });
  const [announcement, setAnnouncement] = useState('');
  const sourceInput = useRef<HTMLTextAreaElement>(null);

  const parsing = useMemo(() => {
    let error = '';
    const parsed = clauses.map((c) => {
      try {
        return { ...c, expression: parseSat(c.raw) };
      } catch (e) {
        if (!error)
          error = e instanceof Error ? e.message : 'Rumus belum dapat dibaca.';
        return { ...c, expression: null };
      }
    });
    return {
      error,
      valid: parsed.filter((p) => p.expression !== null) as {
        id: string;
        raw: string;
        expression: ReturnType<typeof parseSat>;
      }[],
    };
  }, [clauses]);

  const variableTotal = variableCount(clauses);
  const statementTotal = clauses.length;

  function addFromSource() {
    const sentences = splitBulkSource(source);
    if (sentences.length === 0) return;
    const startIndex = variableCount(clauses);
    const newClauses: Clause[] = sentences.map((sentence, index) => {
      const symbol = sentenceToClause(sentence, startIndex + index);
      return { id: nextId(), raw: symbol };
    });
    setClauses((prev) => [...prev, ...newClauses]);
    setSource('');
    setResult({ status: 'idle' });
    setAnnouncement(`${newClauses.length} pernyataan ditambahkan.`);
    requestAnimationFrame(() => sourceInput.current?.focus());
  }

  const addClause = useCallback(() => addFromSource(), [source, clauses]);

  function updateClause(id: string, raw: string) {
    setClauses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, raw } : c)),
    );
    setResult({ status: 'idle' });
  }

  function removeClause(id: string) {
    setClauses((prev) => prev.filter((c) => c.id !== id));
    setResult({ status: 'idle' });
  }

  function run() {
    if (parsing.error) {
      setResult({ status: 'error', message: parsing.error });
      setAnnouncement('Periksa kembali rumus yang ditandai.');
      return;
    }
    if (parsing.valid.length === 0) {
      setResult({ status: 'idle' });
      return;
    }
    const outcome = solveSat(
      parsing.valid.map((c) => ({ clause: c.raw, expression: c.expression })),
    );
    setResult(outcome);
    setAnnouncement(
      outcome.status === 'sat'
        ? 'Rumus dapat dipenuhi.'
        : outcome.status === 'unsat'
          ? 'Rumus tidak dapat dipenuhi.'
          : 'Pemeriksaan selesai.',
    );
  }

  return {
    addClause,
    announcement,
    clauses,
    parsing,
    removeClause,
    result,
    run,
    setSource,
    source,
    sourceInput,
    statementTotal,
    updateClause,
    variableTotal,
  };
}
