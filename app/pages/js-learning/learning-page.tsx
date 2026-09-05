import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  Code2,
  Lightbulb,
  Play,
  RotateCcw,
  Terminal,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  NativeSelect,
  NativeSelectOption,
} from '~/components/ui/native-select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';
import { Progress } from '~/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Switch } from '~/components/ui/switch';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '~/components/ui/alert-dialog';
import { LearningEditor } from '~/components/learning-editor';
import { InsideLabBrand } from '~/components/inside-lab-brand';
import { chapters } from '~/content/curriculum';
import { execute, type RunResult, type Result } from '~/lib/learning-runner';
import { nextLearningStep } from '~/lib/learning-flow';

const formatInput = (v: unknown) =>
  v === undefined ? 'undefined' : JSON.stringify(v);

function LessonText({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const escaped = [...highlights]
    .sort((a, b) => b.length - a.length)
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const highlighted = new Set(highlights);
  const segments = text.split(new RegExp(`(${escaped.join('|')})`, 'g'));

  return segments.map((segment, index) =>
    highlighted.has(segment) ? (
      <code className="lesson-token" key={`${segment}-${index}`}>
        {segment}
      </code>
    ) : (
      segment
    ),
  );
}

export default function Home({
  chapterId = 'values-types-operators',
}: {
  chapterId?: string;
}) {
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

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (saved && typeof saved === 'object') {
        const validStrings = (v: unknown) =>
          v && typeof v === 'object'
            ? Object.fromEntries(
                Object.entries(v).filter(
                  ([k, val]) =>
                    allExercises.some((e) => e.id === k) &&
                    typeof val === 'string' &&
                    val.length < 100000,
                ),
              )
            : {};
        setDrafts(validStrings(saved.drafts) as Record<string, string>);
        setAnswers(validStrings(saved.answers) as Record<string, string>);
        if (Array.isArray(saved.completed))
          setCompleted([
            ...new Set(
              saved.completed.filter(
                (id: unknown) =>
                  typeof id === 'string' &&
                  allExercises.some((e) => e.id === id),
              ),
            ),
          ] as string[]);
        const p =
          Number.isInteger(saved.partIndex) &&
          saved.partIndex >= 0 &&
          saved.partIndex < parts.length
            ? saved.partIndex
            : 0;
        setPartIndex(p);
        setExerciseIndex(
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
  }, []);
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
        setStorageError(true);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [drafts, answers, completed, partIndex, exerciseIndex, ready]);
  useEffect(() => {
    job.current?.abort();
    revision.current++;
    setOutput({});
    setResults([]);
    setChecked(false);
    setBusy(null);
    setHintLevel(0);
    setResultTab('console');
    return () => {
      job.current?.abort();
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
      revision.current++;
    };
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
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => unknown;
        };
      }
    ).modelContext;
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
    } catch {}
    return () => controller.abort();
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
  return (
    <main className="learning-app">
      <header className="app-header">
        <InsideLabBrand area="JS Learning" />
        <span className="header-divider" />
        <a
          className="learning-path-link"
          href="/computational-logic/proportional-logic"
        >
          Computational Logic ↗
        </a>
        <NativeSelect
          className="chapter-select"
          aria-label="Pilih bab"
          value={chapter.id}
          onChange={(event) => {
            window.location.href = `/js/${event.target.value}`;
          }}
        >
          {chapters.map((item) => (
            <NativeSelectOption value={item.id} key={item.id}>
              {item.number} · {item.title}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <div className="chapter-progress">
          <span>
            <strong>{completedParts}</strong>/{parts.length} bagian
          </span>
          <Progress
            value={progress}
            aria-label={`Kemajuan belajar Bab ${Number(chapter.number)}`}
          />
        </div>
      </header>
      <div className="part-bar">
        <div className="part-picker">
          <BookOpen size={16} />
          <NativeSelect
            aria-label="Pilih bagian"
            value={String(partIndex)}
            onChange={(e) => {
              navigate(Number(e.target.value), 0);
            }}
          >
            {parts.map((p, i) => (
              <NativeSelectOption key={p.id} value={String(i)}>
                {String(i + 1).padStart(2, '0')} · {p.title}
                {p.exercises.every((e) => completed.includes(e.id)) ? ' ✓' : ''}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="part-dots" aria-label="Urutan bagian">
          {parts.map((p, i) => (
            <Button
              key={p.id}
              variant="ghost"
              className={'part-dot ' + (i === partIndex ? 'current' : '')}
              aria-label={'Bagian ' + (i + 1) + ': ' + p.title}
              aria-current={i === partIndex ? 'step' : undefined}
              title={p.title}
              onClick={() => {
                navigate(i, 0);
              }}
            >
              {p.exercises.every((e) => completed.includes(e.id)) ? (
                <Check size={13} />
              ) : (
                i + 1
              )}
            </Button>
          ))}
        </div>
        <span className="save-status">
          {storageError
            ? 'Kemajuan belajar belum tersimpan. Jangan tutup halaman.'
            : 'Disimpan di browser ini'}
        </span>
      </div>
      <div className="learning-grid">
        <section
          key={part.id}
          className={'lesson-pane' + (arrival ? 'lesson-arrived' : '')}
          aria-labelledby="lesson-title"
        >
          <div className="lesson-number">
            BAB {chapter.number} <ChevronRight size={13} /> BAGIAN{' '}
            {String(partIndex + 1).padStart(2, '0')} / {parts.length}
          </div>
          <h1 id="lesson-title" ref={lessonTitle} tabIndex={-1}>
            {part.title}
          </h1>
          {arrival && (
            <p className="arrival-message">
              <BookOpen size={16} />
              Materi bagian {partIndex + 1} · Mulai dari inti materi, lalu
              lanjutkan latihan.
            </p>
          )}
          <p className="lesson-description">
            <LessonText text={part.description} highlights={part.highlights} />
          </p>
          <section className="core">
            <h2>Inti materi</h2>
            <p>
              <LessonText text={part.core} highlights={part.highlights} />
            </p>
          </section>
          <section className="mental-model">
            <h2>Cara kerjanya</h2>
            <div className="model-flow">
              {part.model.map((step, i) => (
                <span className="model-step" key={i}>
                  <code>{step}</code>
                  {i < part.model.length - 1 && <ArrowRight size={16} />}
                </span>
              ))}
            </div>
            <p>
              <LessonText text={part.why} highlights={part.highlights} />
            </p>
          </section>
          <section className="example">
            <h2>Contoh</h2>
            <pre>
              <code>{part.example}</code>
            </pre>
          </section>
          <details className="mistake">
            <summary>
              <Lightbulb size={15} /> Yang sering tertukar
            </summary>
            <p>
              <LessonText text={part.mistake} highlights={part.highlights} />
            </p>
          </details>
        </section>
        <section className="practice-pane" aria-label="Latihan menulis kode">
          <Tabs
            value={String(exerciseIndex)}
            onValueChange={(v) => navigate(partIndex, Number(v), false)}
            className="exercise-tabs"
          >
            <div className="practice-top">
              <TabsList variant="line">
                {part.exercises.map((e, i) => (
                  <TabsTrigger value={String(i)} key={e.id}>
                    <span className="stage-number">
                      {completed.includes(e.id) ? <Check size={12} /> : i + 1}
                    </span>
                    {e.stage === 'Bangun' ? 'Tulis sendiri' : e.stage}
                  </TabsTrigger>
                ))}
              </TabsList>
              <span className="exercise-count">
                Latihan {exerciseIndex + 1} dari {part.exercises.length}
              </span>
            </div>
            <TabsContent
              value={String(exerciseIndex)}
              className="practice-content"
            >
              <div className="exercise-heading" key={exercise.id}>
                <p className="exercise-location">
                  Bagian {partIndex + 1} · {part.title} / Latihan{' '}
                  {exerciseIndex + 1}
                </p>
                <h2 ref={exerciseTitle} tabIndex={-1}>
                  {exercise.title}
                </h2>
                <p id="exercise-instruction">
                  {exercise.instruction}
                  {exercise.mode === 'expression' &&
                    ' Tulis satu ekspresi saja, tanpa const atau console.log.'}
                </p>
              </div>
              <div className="editor-shell">
                <div className="editor-top">
                  <span>
                    <Code2 size={15} /> latihan.js
                  </span>
                  <span className="editor-mode">
                    {exercise.stage === 'Prediksi'
                      ? 'Baca & prediksi'
                      : 'JavaScript'}
                  </span>
                </div>
                {(Object.keys(exercise.tests[0].inputs).length > 0 ||
                  exercise.tests[0].args?.length) && (
                  <div className="inputs">
                    <small>
                      CONTOH DATA · SUDAH TERSEDIA, TIDAK PERLU DITULIS ULANG
                    </small>
                    <code>
                      {exercise.mode === 'function'
                        ? `${exercise.probe}(${(exercise.tests[0].args ?? [])
                            .map(formatInput)
                            .join(', ')})`
                        : Object.entries(exercise.tests[0].inputs)
                            .map(
                              ([k, v]) =>
                                'const ' + k + ' = ' + formatInput(v) + ';',
                            )
                            .join('\n')}
                    </code>
                  </div>
                )}
                <LearningEditor
                  key={exercise.id}
                  value={code}
                  onChange={edit}
                  readOnly={exercise.stage === 'Prediksi'}
                />
                <div className="editor-bottom">
                  <span>
                    {exercise.mode === 'expression'
                      ? 'Tulis ekspresi → lihat hasilnya'
                      : exercise.mode === 'console'
                        ? 'console.log → tampilkan hasil'
                      : exercise.mode === 'function'
                        ? 'Fungsi yang diuji: ' + exercise.probe
                        : 'Hasil yang dibaca: ' + exercise.probe}
                  </span>
                </div>
              </div>
              {exercise.stage === 'Prediksi' ? (
                <RadioGroup
                  aria-label="Prediksi hasil kode"
                  value={selectedAnswer}
                  onValueChange={(v) => {
                    job.current?.abort();
                    revision.current++;
                    setBusy(null);
                    setAnswers((a) => ({ ...a, [exercise.id]: String(v) }));
                    setChecked(false);
                    setResults([]);
                    setOutput({});
                  }}
                  className="prediction-options"
                >
                  {exercise.options?.map((option) => (
                    <label
                      key={option}
                      className={
                        'prediction ' +
                        (selectedAnswer === option ? 'selected' : '')
                      }
                    >
                      <RadioGroupItem value={option} />
                      <code>{option}</code>
                    </label>
                  ))}
                </RadioGroup>
              ) : (
                <div className="run-controls">
                  <label className="auto-label">
                    <Switch
                      checked={autoRun}
                      onCheckedChange={setAutoRun}
                      aria-label="Jalankan kode otomatis"
                    />
                    Jalan otomatis
                  </label>
                  <Button variant="ghost" onClick={() => setResetOpen(true)}>
                    <RotateCcw />
                    Kode awal
                  </Button>
                  <Button
                    variant="outline"
                    disabled={busy !== null}
                    onClick={() => void run('run')}
                  >
                    <Play />
                    Jalankan
                  </Button>
                </div>
              )}
              <Tabs
                value={resultTab}
                onValueChange={(v) => setResultTab(String(v))}
                className="results-panel"
              >
                <TabsList variant="line">
                  <TabsTrigger value="console">
                    <Terminal size={14} />
                    Hasil kode
                  </TabsTrigger>
                  <TabsTrigger value="tests">
                    <CircleCheck size={14} />
                    Pemeriksaan
                    {checked && (
                      <span className="test-count">
                        {results.filter((r) => r.pass).length}/{results.length}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="console">
                  <div className="console-output" aria-live="polite">
                    {busy === 'run' ? (
                      <p className="muted">Menjalankan kode…</p>
                    ) : output.error ? (
                      <p className="error-text">{output.error}</p>
                    ) : output.value !== undefined ? (
                      <>
                        {output.logs?.map((line, i) => (
                          <pre key={i}>
                            <span className="console-chevron">›</span>
                            {line}
                          </pre>
                        ))}
                        {exercise.mode !== 'console' && (
                          <pre>
                            <span className="console-chevron">↳</span>
                            {output.value}
                          </pre>
                        )}
                        {exercise.mode === 'console' &&
                          !output.logs?.length && (
                            <p className="muted">
                              Kode selesai. Tidak ada nilai yang ditampilkan
                              dengan console.log.
                            </p>
                          )}
                      </>
                    ) : (
                      <p className="muted">
                        {exercise.stage === 'Prediksi'
                          ? 'Pilih satu jawaban, lalu tekan Cek jawaban untuk melihat hasil dan penjelasannya.'
                          : 'Tekan Jalankan untuk mencoba kode dengan contoh data di atas.'}
                      </p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="tests">
                  <div className="test-results" aria-live="polite">
                    {busy === 'check' ? (
                      <p>Memeriksa jawaban…</p>
                    ) : !checked ? (
                      <p className="muted">
                        Tekan Cek jawaban untuk membandingkan hasilmu dengan
                        hasil yang diminta. Latihan selesai jika semua
                        pemeriksaan berhasil; tombol Jalankan hanya mencoba
                        kode.
                      </p>
                    ) : (
                      <>
                        <p
                          className={passed ? 'success-message' : 'error-text'}
                        >
                          {passed
                            ? 'Jawabanmu sesuai. Latihan ini selesai.'
                            : 'Belum sesuai. Bandingkan hasilmu dengan hasil yang diminta. Perbaiki jawaban, lalu periksa lagi.'}
                        </p>
                        {results.map((r, i) => (
                          <details
                            className={'test-row ' + (r.pass ? 'pass' : 'fail')}
                            key={i}
                            open={!r.pass}
                          >
                            <summary>
                              {r.pass ? <Check size={15} /> : <span>×</span>}
                              {r.name}
                            </summary>
                            <dl>
                              <dt>Data yang digunakan</dt>
                              <dd>{r.input}</dd>
                              <dt>Hasil yang diminta</dt>
                              <dd>{r.expected}</dd>
                              <dt>Hasilmu</dt>
                              <dd>{r.received}</dd>
                            </dl>
                          </details>
                        ))}
                        {exercise.stage === 'Prediksi' && (
                          <p className="prediction-explanation">
                            <LessonText
                              text={exercise.explanation ?? ''}
                              highlights={part.highlights}
                            />
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              {hintLevel > 0 && !passed && (
                <div className="hint-panel">
                  <Lightbulb size={16} />
                  <div>
                    <strong>Petunjuk {hintLevel}</strong>
                    <p>
                      <LessonText
                        text={exercise.hints[hintLevel - 1]}
                        highlights={part.highlights}
                      />
                    </p>
                  </div>
                </div>
              )}
              <div
                className={'answer-actions' + (passed ? ' answer-passed' : '')}
              >
                <div role="status" aria-live="polite" aria-atomic="true">
                  {passed && nextStep && (
                    <div className="completion-feedback">
                      <CircleCheck size={22} />
                      <div>
                        <strong>
                          {nextStep.kind === 'complete'
                            ? `Bab ${Number(chapter.number)} tuntas!`
                            : partDone
                              ? `Bagian ${partIndex + 1} selesai!`
                              : 'Jawaban benar!'}
                        </strong>
                        <p id="next-step-description">{nextStep.description}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="check-controls">
                  {passed ? (
                    <span className="completion-count">
                      {
                        part.exercises.filter((e) => completed.includes(e.id))
                          .length
                      }
                      /{part.exercises.length} latihan bagian ini selesai
                    </span>
                  ) : (
                    <Button
                      variant="ghost"
                      className="hint-action"
                      disabled={hintLevel >= exercise.hints.length}
                      onClick={() => setHintLevel((n) => n + 1)}
                    >
                      <Lightbulb />
                      {hintLevel === 0 ? 'Petunjuk' : 'Petunjuk berikutnya'}
                      <span>
                        {hintLevel}/{exercise.hints.length}
                      </span>
                    </Button>
                  )}
                  <Button
                    className={
                      'check-button' + (passed ? ' continue-button' : '')
                    }
                    aria-describedby={
                      passed ? 'next-step-description' : undefined
                    }
                    disabled={
                      !ready ||
                      busy !== null ||
                      (!passed &&
                        exercise.stage === 'Prediksi' &&
                        !selectedAnswer) ||
                      (passed && !nextStep?.target && !nextStep?.href)
                    }
                    onClick={primaryAction}
                  >
                    {busy === 'check'
                      ? 'Memeriksa…'
                      : passed
                        ? nextStep?.label
                        : 'Cek jawaban'}
                    {passed && (nextStep?.target || nextStep?.href) ? (
                      <ArrowRight />
                    ) : (
                      <Check />
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
      <nav className="lesson-navigation" aria-label="Navigasi latihan">
        <Button
          variant="ghost"
          disabled={partIndex === 0 && exerciseIndex === 0}
          onClick={() => go(-1)}
        >
          <ArrowLeft />
          Sebelumnya
        </Button>
        <span>
          {completed.length}/{allExercises.length} latihan selesai
        </span>
        {last ? (
          <Button
            variant="outline"
            onClick={() => {
              const missing = allExercises.findIndex(
                (e) => !completed.includes(e.id),
              );
              const index = missing === -1 ? 0 : missing;
              navigate(Math.floor(index / 3), index % 3);
            }}
          >
            {completed.length === allExercises.length
              ? 'Pelajari lagi dari awal'
              : 'Lanjutkan latihan tersisa'}
            <ArrowRight />
          </Button>
        ) : (
          <Button variant="outline" onClick={() => go(1)}>
            Berikutnya
            <ArrowRight />
          </Button>
        )}
      </nav>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {arrival}
      </p>
      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Kembalikan ke kode awal?</AlertDialogTitle>
          <AlertDialogDescription>
            Perubahan kodemu pada latihan ini akan dihapus dan diganti dengan
            kode awal. Status latihan yang sudah selesai tetap tersimpan.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                edit(exercise.starter);
                setResetOpen(false);
              }}
            >
              Kembalikan kode awal
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
