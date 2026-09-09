import {
  ArrowRight,
  Check,
  CircleCheck,
  Code2,
  Lightbulb,
  Play,
  RotateCcw,
  Terminal,
} from 'lucide-react';
import { LearningEditor } from '~/components/learning-editor';
import { Button } from '~/components/ui/button';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Switch } from '~/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { formatInput } from '../helpers';
import type { LearningPageModel } from '../useLearningPage';
import { LessonText } from './LessonText';

interface PracticePaneProps {
  learning: LearningPageModel;
}

export function PracticePane({ learning }: PracticePaneProps) {
  const {
    autoRun,
    busy,
    chapter,
    checked,
    code,
    completed,
    edit,
    exercise,
    exerciseIndex,
    exerciseTitle,
    hintLevel,
    job,
    navigate,
    nextStep,
    output,
    part,
    partDone,
    partIndex,
    passed,
    primaryAction,
    ready,
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
  } = learning;
  return (
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
                    {exercise.mode !== 'console' &&
                      !(
                        output.value === 'undefined' &&
                        output.logs?.length
                      ) && (
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
  );
}
