import { CheckCircle2, ChevronLeft, ChevronRight, Send, XCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import CodeBlock from "../sessions/session-1/components/CodeBlock";
import type {
  MultipleChoiceQuestion,
  SessionKnowledgeCheck,
} from "./types";

type McAnswer = {
  selectedOptionId: string;
  isCorrect: boolean;
};

type KnowledgeCheckProps = {
  check: SessionKnowledgeCheck;
  sessionId: number;
};

export default function KnowledgeCheck({ check, sessionId }: KnowledgeCheckProps) {
  const [mcAnswers, setMcAnswers] = useState<Record<number, McAnswer>>({});
  const [essayAnswer, setEssayAnswer] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const { multipleChoice, essay } = check;
  const total = multipleChoice.length;
  const answered = Object.keys(mcAnswers).length;
  const correct = Object.values(mcAnswers).filter((item) => item.isCorrect).length;
  const allMcAnswered = answered === total;
  const canSubmit = allMcAnswered && essayAnswer.trim().length > 0 && submitState !== "loading";

  const isEssaySlide = currentIndex >= total;
  const currentQuestion = isEssaySlide ? null : multipleChoice[currentIndex];

  function selectOption(question: MultipleChoiceQuestion, optionId: string) {
    setMcAnswers((current) => {
      if (current[question.number]) return current;
      return {
        ...current,
        [question.number]: {
          selectedOptionId: optionId,
          isCorrect: optionId === question.correctOptionId,
        },
      };
    });
  }

  function goTo(index: number) {
    setCurrentIndex(Math.max(0, Math.min(total, index)));
  }

  function goNext() {
    if (currentIndex < total) setCurrentIndex(currentIndex + 1);
  }

  function goPrev() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  async function submitAllAnswers() {
    const mcPayload = multipleChoice
      .filter((question) => mcAnswers[question.number])
      .map((question) => {
        const answer = mcAnswers[question.number];
        const option = question.options.find((item) => item.id === answer.selectedOptionId);
        return {
          questionNumber: question.number,
          question: question.prompt,
          answer: option?.text ?? "",
          answerType: "multiple_choice",
          selectedOptionId: answer.selectedOptionId,
          isCorrect: answer.isCorrect,
        };
      });

    const answers = [
      ...mcPayload,
      ...(essayAnswer.trim().length > 0
        ? [
            {
              questionNumber: essay.number,
              question: essay.prompt,
              answer: essayAnswer.trim(),
              answerType: "essay",
            },
          ]
        : []),
    ];

    setSubmitState("loading");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/check-submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, answers }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };

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
      setSubmitMessage(
        `Jawaban berhasil disimpan. Skor pilihan ganda kamu ${correct} dari ${total}.`,
      );
    } catch {
      setSubmitState("error");
      setSubmitMessage("Terjadi kesalahan jaringan. Coba lagi.");
    }
  }

  return (
    <div className="check-inline">
      <div className="mc-progress">
        <div className="mc-progress-head">
          <span className="mc-progress-title">Progres pilihan ganda</span>
          <span className="mc-progress-count">
            {answered} dari {total} dijawab · {correct} benar
          </span>
        </div>
        <div className="mc-progress-track" role="list">
          {multipleChoice.map((question, index) => {
            const answer = mcAnswers[question.number];
            const state = !answer ? "empty" : answer.isCorrect ? "correct" : "wrong";
            const isActive = index === currentIndex;
            return (
              <button
                type="button"
                key={question.number}
                className={`mc-progress-segment is-${state}${isActive ? " is-active" : ""}`}
                onClick={() => goTo(index)}
                aria-label={`Soal ${question.number}: ${state === "empty" ? "belum dijawab" : state === "correct" ? "benar" : "salah"}`}
                aria-current={isActive ? "step" : undefined}
              />
            );
          })}
        </div>
      </div>

      <div className="mc-slide" key={isEssaySlide ? "essay" : `mc-${currentIndex}`}>
        {isEssaySlide ? (
          <article className="mc-question mc-essay">
            <span className="mc-question-number">SOAL {essay.number} · ESSAY</span>
            <p className="mc-question-prompt">{essay.prompt}</p>
            {essay.code && <CodeBlock>{essay.code}</CodeBlock>}
            {essay.list && (
              <ul className="quiz-list">
                {essay.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            <label className="quiz-answer">
              <span>Jawabanmu</span>
              <textarea
                value={essayAnswer}
                onChange={(event) => setEssayAnswer(event.target.value)}
                rows={6}
                placeholder="Tulis jawaban esai berdasarkan pemahamanmu..."
              />
            </label>

            <div className="quiz-submit">
              <Button type="button" onClick={submitAllAnswers} disabled={!canSubmit}>
                <Send size={15} /> Submit jawaban
              </Button>
              <p className="quiz-submit-hint">
                {allMcAnswered
                  ? essayAnswer.trim().length > 0
                    ? "Jawaban pilihan ganda dan esai akan disimpan ke akunmu."
                    : "Isi jawaban esai untuk dapat submit."
                  : `Selesaikan ${total - answered} pilihan ganda lagi untuk dapat submit.`}
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
          </article>
        ) : (
          <article className="mc-question">
            <span className="mc-question-number">
              SOAL {currentQuestion!.number} DARI {total}
            </span>
            <p className="mc-question-prompt">{currentQuestion!.prompt}</p>
            {currentQuestion!.code && <CodeBlock>{currentQuestion!.code}</CodeBlock>}
            {currentQuestion!.list && (
              <ul className="quiz-list">
                {currentQuestion!.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}

            <div className="mc-options">
              {currentQuestion!.options.map((option) => {
                const answer = mcAnswers[currentQuestion!.number];
                const isSelected = answer?.selectedOptionId === option.id;
                const isCorrectOption = option.id === currentQuestion!.correctOptionId;
                let stateClass = "";
                if (answer) {
                  if (isCorrectOption) stateClass = " is-correct";
                  else if (isSelected) stateClass = " is-wrong";
                }
                return (
                  <button
                    type="button"
                    key={option.id}
                    className={`mc-option${stateClass}`}
                    onClick={() => selectOption(currentQuestion!, option.id)}
                    disabled={Boolean(answer)}
                    aria-pressed={isSelected}
                  >
                    <span className="mc-option-id">{option.id.toUpperCase()}</span>
                    <span className="mc-option-text">{option.text}</span>
                    {answer && isCorrectOption && (
                      <CheckCircle2 className="mc-option-icon" size={16} aria-hidden="true" />
                    )}
                    {answer && isSelected && !isCorrectOption && (
                      <XCircle className="mc-option-icon" size={16} aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>

            {mcAnswers[currentQuestion!.number] && (
              <div className={`mc-feedback is-${mcAnswers[currentQuestion!.number].isCorrect ? "correct" : "wrong"}`}>
                <strong>{mcAnswers[currentQuestion!.number].isCorrect ? "Benar" : "Salah"}</strong>
                <p>{currentQuestion!.explanation}</p>
              </div>
            )}
          </article>
        )}

        <div className="mc-nav">
          <Button type="button" variant="outline" onClick={goPrev} disabled={currentIndex === 0}>
            <ChevronLeft size={15} /> Sebelumnya
          </Button>
          <span className="mc-nav-indicator">
            {isEssaySlide ? "Esai" : `Soal ${currentIndex + 1} / ${total}`}
          </span>
          {isEssaySlide ? (
            <span className="mc-nav-spacer" />
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={goNext}
              disabled={!mcAnswers[currentQuestion!.number]}
            >
              Selanjutnya <ChevronRight size={15} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
