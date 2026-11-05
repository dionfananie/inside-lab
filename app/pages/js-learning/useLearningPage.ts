import { useEffect, useRef, useState } from 'react';
import { chapters } from '~/content/curriculum';
import { execute, type RunResult, type Result } from '~/lib/learning-runner';
import { nextLearningStep } from '~/lib/learning-flow';
import type { LearningPageProps, ModelContextDocument } from './types';

type StoredLearningState = {
  drafts?: unknown;
  answers?: unknown;
  completed?: unknown;
  partIndex?: number;
  exerciseIndex?: number;
};

export default function useLearningPage({
  chapterId = 'values-types-operators',
}: LearningPageProps) {
  const chapterIndex = Math.max(
    0,
    chapters.findIndex((item) => item.id === chapterId),
  );
  const chapter = chapters[chapterIndex];
  const parts = chapter.parts;
  const allExercises = parts.flatMap((part) => part.exercises);
  const storageKey = `inside-lab:js:${chapter.id}:v1`;
  const [partIndex, setPartIndex] = useState(0),
    [exerciseIndex, setExerciseIndex] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, string>>({}),
    [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<string[]>([]),
    [ready, setReady] = useState(false),
    [storageError, setStorageError] = useState(false);
  const [autoRun, setAutoRun] = useState(true),
    [output, setOutput] = useState<RunResult>({}),
    [results, setResults] = useState<Result[]>([]);
  const [busy, setBusy] = useState<'run' | 'check' | null>(null),
    [resultTab, setResultTab] = useState('console'),
    [hintLevel, setHintLevel] = useState(0);
  const [resetOpen, setResetOpen] = useState(false),
    [checked, setChecked] = useState(false);
  const [arrival, setArrival] = useState('');
  const lessonTitle = useRef<HTMLHeadingElement>(null);
  const exerciseTitle = useRef<HTMLHeadingElement>(null);
  const focusDestination = useRef<'lesson' | 'exercise' | null>(null);
  const part = parts[partIndex],
    exercise = part.exercises[exerciseIndex],
    code = drafts[exercise.id] ?? exercise.starter;
  const selectedAnswer = answers[exercise.id] ?? '';
  const job = useRef<AbortController | null>(null),
    revision = useRef(0),
    autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completedParts = parts.filter((p) =>
    p.exercises.every((e) => completed.includes(e.id)),
  ).length;
  const progress = Math.round((completed.length / allExercises.length) * 100);
  const passed = checked && results.length > 0 && results.every((r) => r.pass);
  const nextChapter = chapters[chapterIndex + 1];
  const nextStep = passed
    ? nextLearningStep(parts, partIndex, exerciseIndex, completed, {
        chapterNumber: chapter.number,
        totalExercises: allExercises.length,
        nextChapter: nextChapter
          ? {
              number: nextChapter.number,
              title: nextChapter.title,
              href: `/js/${nextChapter.id}`,
            }
          : null,
      })
    : null;
  const partDone = part.exercises.every((e) => completed.includes(e.id));
  const navigationPosition = useRef({ partIndex, exerciseIndex });
  navigationPosition.current = { partIndex, exerciseIndex };

  /* eslint-disable react-hooks/set-state-in-effect -- Hydrate saved progress after mount; reading localStorage during render would break SSR. */
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(storageKey) || 'null',
      ) as StoredLearningState | null;
      if (saved && typeof saved === 'object') {
        const validStrings = (value: unknown): Record<string, string> => {
          if (!value || typeof value !== 'object') return {};
          const result: Record<string, string> = {};
          for (const [key, entry] of Object.entries(
            value as Record<string, unknown>,
          )) {
            if (
              typeof entry === 'string' &&
              entry.length < 100000 &&
              allExercises.some((e) => e.id === key)
            ) {
              result[key] = entry;
            }
          }
          return result;
        };
        setDrafts(validStrings(saved.drafts));
        setAnswers(validStrings(saved.answers));
        if (Array.isArray(saved.completed)) {
          const completedIds = (saved.completed as unknown[]).filter(
            (id): id is string =>
              typeof id === 'string' &&
              allExercises.some((e) => e.id === id),
          );
          setCompleted([...new Set(completedIds)]);
        }
        const p =
          typeof saved.partIndex === 'number' &&
          Number.isInteger(saved.partIndex) &&
          saved.partIndex >= 0 &&
          saved.partIndex < parts.length
            ? saved.partIndex
            : 0;
        setPartIndex(p);
        setExerciseIndex(
          typeof saved.exerciseIndex === 'number' &&
            Number.isInteger(saved.exerciseIndex) &&
            saved.exerciseIndex >= 0 &&
            saved.exerciseIndex < parts[p].exercises.length
            ? saved.exerciseIndex
            : 0,
        );
      }
    } catch {
      setStorageError(true);
    }
    setReady(true);
    // Hydration runs once per mounted chapter page; chapter data is static.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            drafts,
            answers,
            completed,
            partIndex,
            exerciseIndex,
          }),
        );
        setStorageError(false);
      } catch {
        // Storage may be unavailable (private mode or quota); keep working in memory.
        setStorageError(true);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [drafts, answers, completed, partIndex, exerciseIndex, ready, storageKey]);
  useEffect(() => {
    job.current?.abort();
    revision.current++;
    // Reset per-exercise runtime state when the selected exercise changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOutput({});
    setResults([]);
    setChecked(false);
    setBusy(null);
    setHintLevel(0);
    setResultTab('console');
    return () => {
      job.current?.abort();
      // Invalidate the latest revision so in-flight results are ignored.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      revision.current++;
    };
  }, [exercise.id]);
  useEffect(() => {
    if (!focusDestination.current) return;
    const heading =
      focusDestination.current === 'lesson'
        ? lessonTitle.current
        : exerciseTitle.current;
    focusDestination.current = null;
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
  }, [exercise.id]);
  async function run(action: 'run' | 'check') {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    job.current?.abort();
    const controller = new AbortController();
    job.current = controller;
    const current = ++revision.current;
    setBusy(action);
    if (action === 'check') setResultTab('tests');
    else setResultTab('console');
    if (exercise.stage === 'Prediksi' && action === 'check') {
      const result: Result = {
        name: 'Prediksi hasil kode',
        pass: selectedAnswer === exercise.answer,
        input: 'Kode pada editor',
        expected: exercise.answer ?? '',
        received: selectedAnswer,
      };
      setResults([result]);
      setChecked(true);
      if (result.pass)
        setCompleted((list) =>
          list.includes(exercise.id) ? list : [...list, exercise.id],
        );
      const runResult = await execute(code, exercise, 'run', controller.signal);
      if (current !== revision.current) return;
      setOutput(runResult);
      setBusy(null);
      return;
    }
    const result = await execute(code, exercise, action, controller.signal);
    if (current !== revision.current) return;
    if (action === 'run') setOutput(result);
    else {
      const checks = result.results ?? [
        {
          name: 'Menjalankan kode',
          pass: false,
          input: '—',
          expected: 'Kode selesai dijalankan',
          received:
            result.error ?? 'Hasil belum tersedia. Coba jalankan kode lagi.',
        },
      ];
      setResults(checks);
      setChecked(true);
      if (checks.length && checks.every((r) => r.pass))
        setCompleted((list) =>
          list.includes(exercise.id) ? list : [...list, exercise.id],
        );
    }
    setBusy(null);
  }
  useEffect(() => {
    if (!ready || !autoRun || exercise.stage === 'Prediksi') return;
    autoTimer.current = setTimeout(() => {
      void run('run');
    }, 400);
    return () => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
      job.current?.abort();
      // Invalidate the latest revision so in-flight results are ignored.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      revision.current++;
    };
    // run() is intentionally omitted: it is redefined every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, exercise.id, autoRun, ready]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!e.repeat) primaryAction();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });
  useEffect(() => {
    const context = (document as ModelContextDocument).modelContext;
    if (!context?.registerTool) return;
    const controller = new AbortController();
    try {
      Promise.resolve(
        context.registerTool(
          {
            name: 'open_learning_part',
            description: `Buka salah satu bagian Bab ${Number(chapter.number)} di ruang belajar.`,
            inputSchema: {
              type: 'object',
              properties: {
                partId: { type: 'string', enum: parts.map((p) => p.id) },
              },
              required: ['partId'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false },
            execute: async (input: { partId: string }) => {
              const i = parts.findIndex((p) => p.id === input.partId);
              if (i < 0) throw new Error('Bagian tidak ditemukan.');
              navigate(i, 0);
              await new Promise((r) =>
                requestAnimationFrame(() => requestAnimationFrame(r)),
              );
              return { partId: parts[i].id, title: parts[i].title };
            },
          },
          { signal: controller.signal },
        ),
      ).catch(() => {});
    } catch {
      // Model context is optional; ignore pages that do not expose it.
    }
    return () => controller.abort();
    // Register the tool once; chapter and navigation data are static for this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function edit(value: string) {
    job.current?.abort();
    revision.current++;
    setBusy(null);
    setResults([]);
    setChecked(false);
    setOutput({});
    setDrafts((current) => ({ ...current, [exercise.id]: value }));
  }
  function chooseAnswer(value: string) {
    job.current?.abort();
    revision.current++;
    setBusy(null);
    setAnswers((current) => ({ ...current, [exercise.id]: value }));
    setChecked(false);
    setResults([]);
    setOutput({});
  }
  function navigate(nextPart: number, nextExercise: number, moveFocus = true) {
    const previous = navigationPosition.current;
    if (
      !parts[nextPart]?.exercises[nextExercise] ||
      (previous.partIndex === nextPart &&
        previous.exerciseIndex === nextExercise)
    )
      return;
    if (autoTimer.current) clearTimeout(autoTimer.current);
    job.current?.abort();
    revision.current++;
    setBusy(null);
    setChecked(false);
    setResults([]);
    setOutput({});
    setHintLevel(0);
    const changedPart = nextPart !== previous.partIndex;
    focusDestination.current = moveFocus
      ? changedPart
        ? 'lesson'
        : 'exercise'
      : null;
    setArrival(
      changedPart
        ? `Kamu sekarang di Bagian ${nextPart + 1} dari ${parts.length} · ${parts[nextPart].title}.`
        : '',
    );
    setPartIndex(nextPart);
    setExerciseIndex(nextExercise);
  }
  function primaryAction() {
    if (!ready || busy !== null || resetOpen) return;
    if (passed) {
      if (nextStep?.target)
        navigate(nextStep.target.partIndex, nextStep.target.exerciseIndex);
      else if (nextStep?.href) window.location.href = nextStep.href;
      return;
    }
    if (exercise.stage !== 'Prediksi' || selectedAnswer) void run('check');
  }
  function go(direction: number) {
    const currentIndex = allExercises.findIndex((e) => e.id === exercise.id);
    const flatIndex = currentIndex + direction;
    if (flatIndex < 0 || flatIndex >= allExercises.length) return;
    const nextId = allExercises[flatIndex].id;
    const nextPart = parts.findIndex((p) =>
      p.exercises.some((e) => e.id === nextId),
    );
    const nextExercise = parts[nextPart].exercises.findIndex(
      (e) => e.id === nextId,
    );
    navigate(nextPart, nextExercise);
  }
  const last = exercise.id === allExercises.at(-1)?.id;
  return {
    allExercises,
    arrival,
    autoRun,
    busy,
    chapter,
    chapters,
    checked,
    chooseAnswer,
    code,
    completed,
    completedParts,
    edit,
    exercise,
    exerciseIndex,
    exerciseTitle,
    go,
    hintLevel,
    job,
    last,
    lessonTitle,
    navigate,
    nextStep,
    output,
    part,
    partDone,
    partIndex,
    parts,
    passed,
    primaryAction,
    progress,
    ready,
    resetOpen,
    resultTab,
    results,
    revision,
    run,
    selectedAnswer,
    setAnswers,
    setAutoRun,
    setBusy,
    setChecked,
    setHintLevel,
    setOutput,
    setResetOpen,
    setResultTab,
    setResults,
    storageError,
  };
}

export type LearningPageModel = ReturnType<typeof useLearningPage>;
