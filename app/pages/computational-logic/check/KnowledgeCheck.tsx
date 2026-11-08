import { CheckCircle2, Play } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import CodeBlock from "../sessions/session-1/components/CodeBlock";
import type {
  KnowledgeCheckGroup,
  KnowledgeCheckQuestion,
} from "../sessions/session-1/data";
import type { AnswerRubric } from "../sessions/session-1/rubrics";

type EvaluationLevel = "empty" | "short" | "needs-work" | "fair" | "good" | "excellent";

type Evaluation = {
  level: EvaluationLevel;
  label: string;
  matched: string[];
  missing: string[];
  ratio: number;
  wordCount: number;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/→/g, "->")
    .replace(/∧/g, "and")
    .replace(/∨/g, "or")
    .replace(/¬/g, "not")
    .replace(/[^\p{L}\p{N}\s>=-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesTerm(normalized: string, compact: string, term: string) {
  const normalizedTerm = normalize(term);
  if (!normalizedTerm) return false;

  return (
    normalized.includes(normalizedTerm) ||
    compact.includes(normalizedTerm.replace(/\s+/g, ""))
  );
}

function evaluateAnswer(
  question: KnowledgeCheckQuestion,
  answer: string,
  rubrics: Record<number, AnswerRubric>,
): Evaluation | null {
  const rubric = rubrics[question.number];
  if (!rubric) return null;

  const normalized = normalize(answer);
  const compact = normalized.replace(/\s+/g, "");
  const wordCount = normalized ? normalized.split(/\s+/).length : 0;

  const matched = rubric.concepts
    .filter((concept) => concept.terms.some((term) => includesTerm(normalized, compact, term)))
    .map((concept) => concept.label);
  const missing = rubric.concepts
    .filter((concept) => !concept.terms.some((term) => includesTerm(normalized, compact, term)))
    .map((concept) => concept.label);
  const ratio = rubric.concepts.length === 0 ? 0 : matched.length / rubric.concepts.length;

  let level: EvaluationLevel;
  let label: string;

  if (!normalized) {
    level = "empty";
    label = "Belum diisi";
  } else if (wordCount < rubric.minWords) {
    level = "short";
    label = "Terlalu singkat";
  } else if (ratio === 1) {
    level = "excellent";
    label = "Sangat baik";
  } else if (ratio >= 0.75) {
    level = "good";
    label = "Baik";
  } else if (ratio >= 0.5) {
    level = "fair";
    label = "Cukup";
  } else {
    level = "needs-work";
    label = "Perlu dilengkapi";
  }

  return { level, label, matched, missing, ratio, wordCount };
}

type KnowledgeCheckProps = {
  groups: KnowledgeCheckGroup[];
  rubrics: Record<number, AnswerRubric>;
  sessionHref: string;
  sessionId: number;
};

export default function KnowledgeCheck({ groups, rubrics, sessionHref, sessionId }: KnowledgeCheckProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [evaluations, setEvaluations] = useState<Record<number, Evaluation>>({});
  const [hasStarted, setHasStarted] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const totalQuestions = groups.reduce((total, group) => total + group.questions.length, 0);
  const answeredQuestions = Object.values(answers).filter(
    (answer) => answer.trim().length > 0,
  ).length;

  function updateAnswer(questionNumber: number, value: string) {
    setAnswers((current) => ({ ...current, [questionNumber]: value }));
    setEvaluations((current) => {
      if (!(questionNumber in current)) return current;
      const next = { ...current };
      delete next[questionNumber];
      return next;
    });
  }

  function checkAnswer(question: KnowledgeCheckQuestion) {
    const evaluation = evaluateAnswer(question, answers[question.number] ?? "", rubrics);
    if (!evaluation) return;
    setEvaluations((current) => ({ ...current, [question.number]: evaluation }));
  }

  async function submitAllAnswers() {
    const answered = groups
      .flatMap((group) => group.questions)
      .filter((question) => (answers[question.number] ?? "").trim().length > 0)
      .map((question) => ({
        questionNumber: question.number,
        question: question.prompt,
        answer: (answers[question.number] ?? "").trim(),
      }));

    if (answered.length === 0) {
      setSubmitState("error");
      setSubmitMessage("Isi minimal satu jawaban sebelum submit.");
      return;
    }

    setSubmitState("loading");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/check-submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, answers: answered }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setSubmitState("error");
        setSubmitMessage(
          response.status === 401
            ? "Harap login untuk menyimpan jawaban."
            : data.error ?? "Gagal menyimpan jawaban.",
        );
        return;
      }

      setSubmitState("success");
      setSubmitMessage("Jawaban berhasil disimpan.");
    } catch {
      setSubmitState("error");
      setSubmitMessage("Terjadi kesalahan jaringan. Coba lagi.");
    }
  }

  if (!hasStarted) {
    return (
      <div className="quiz-gate">
        <span className="computational-section-label">KNOWLEDGE CHECK</span>
        <h2>Siap menguji pemahamanmu?</h2>
        <p>
          Kerjakan micro-quiz berdasarkan pemahamanmu. Jawabanmu akan dinilai
          dari kelengkapan konsep kunci, dan kamu bisa kembali ke materi kapan
          saja.
        </p>
        <Button type="button" onClick={() => setHasStarted(true)}>
          <Play size={15} fill="currentColor" /> Mulai knowledge check
        </Button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-toolbar">
        <div className="quiz-progress" role="status" aria-live="polite">
          <strong>{answeredQuestions}</strong> dari {totalQuestions} pertanyaan sudah diisi.
        </div>
        <a className="quiz-back-link" href={sessionHref}>Kembali ke materi</a>
      </div>
      <p className="quiz-note">
        Pengecekan otomatis menilai <strong>kelengkapan konsep kunci</strong>,
        bukan benar-salah mutlak. Gunakan hasilnya sebagai panduan.
      </p>

      {groups.map((group) => (
        <section className="quiz-group" key={group.id} aria-labelledby={group.id}>
          <h3 id={group.id}>{group.title}</h3>
          {group.questions.map((question) => {
            const answerId = `quiz-answer-${question.number}`;
            const evaluation = evaluations[question.number];

            return (
              <article className="quiz-question" key={question.number}>
                <span>PERTANYAAN {question.number}</span>
                <p>{question.prompt}</p>
                {question.code && <CodeBlock>{question.code}</CodeBlock>}
                {question.list && (
                  <ul className="quiz-list">
                    {question.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                <label className="quiz-answer" htmlFor={answerId}>
                  <span>Jawabanmu</span>
                  <textarea
                    id={answerId}
                    value={answers[question.number] ?? ""}
                    onChange={(event) => updateAnswer(question.number, event.target.value)}
                    rows={4}
                    placeholder="Tulis jawabanmu berdasarkan pemahaman sendiri..."
                  />
                </label>
                <div className="quiz-actions">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => checkAnswer(question)}
                    disabled={!answers[question.number]?.trim()}
                  >
                    <CheckCircle2 size={14} /> Cek jawaban
                  </Button>
                  <span>Dinilai dari konsep kunci yang muncul.</span>
                </div>

                {evaluation && (
                  <div className={`quiz-result is-${evaluation.level}`}>
                    <div className="quiz-result-head">
                      <strong>{evaluation.label}</strong>
                      <span>{evaluation.matched.length}/{rubrics[question.number].concepts.length} konsep</span>
                    </div>
                    <div className="quiz-result-track" aria-hidden="true">
                      <span style={{ width: `${evaluation.ratio * 100}%` }} />
                    </div>
                    {evaluation.level === "empty" ? (
                      <p>Jawaban belum diisi.</p>
                    ) : (
                      <>
                        {evaluation.matched.length > 0 && (
                          <p className="is-matched">Sudah disebut: {evaluation.matched.join(", ")}.</p>
                        )}
                        {evaluation.missing.length > 0 && (
                          <p className="is-missing">Bisa ditambahkan: {evaluation.missing.join(", ")}.</p>
                        )}
                        {evaluation.level === "short" && (
                          <p>Jawaban masih singkat. Tambahkan penjelasan dan contoh agar lebih lengkap.</p>
                        )}
                        {evaluation.missing.length === 0 && evaluation.level !== "short" && (
                          <p>Semua konsep kunci sudah tercakup.</p>
                        )}
                      </>
                    )}
                  </div>
                )}

                <details className="quiz-details">
                  <summary>Lihat petunjuk jawaban</summary>
                  <p>{question.answer}</p>
                </details>
              </article>
            );
          })}
        </section>
      ))}

      <div className="quiz-submit">
        <Button
          type="button"
          onClick={submitAllAnswers}
          disabled={submitState === "loading"}
        >
          Submit semua jawaban
        </Button>
        <p className="quiz-submit-hint">
          Jawaban dan soal akan disimpan ke akunmu untuk referensi belajar.
        </p>
        {submitMessage && (
          <div className={`quiz-submit-message is-${submitState}`} role="status" aria-live="polite">
            {submitMessage}
            {submitState === "error" && submitMessage.includes("login") && (
              <> <a href="/login">Masuk</a></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
