import { useState } from "react";

import { knowledgeCheckGroups } from "../data";
import CodeBlock from "./CodeBlock";

export default function KnowledgeCheck() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const totalQuestions = knowledgeCheckGroups.reduce(
    (total, group) => total + group.questions.length,
    0,
  );
  const answeredQuestions = Object.values(answers).filter(
    (answer) => answer.trim().length > 0,
  ).length;

  function updateAnswer(questionNumber: number, value: string) {
    setAnswers((current) => ({ ...current, [questionNumber]: value }));
  }

  return (
    <div className="session-one-knowledge-check">
      <div className="session-one-answer-progress" role="status" aria-live="polite">
        <strong>{answeredQuestions}</strong> dari {totalQuestions} pertanyaan sudah diisi.
      </div>

      {knowledgeCheckGroups.map((group) => (
        <section className="session-one-question-group" key={group.id} aria-labelledby={group.id}>
          <h3 id={group.id}>{group.title}</h3>
          {group.questions.map((question) => {
            const answerId = `session-one-answer-${question.number}`;
            return (
              <article className="session-one-question" key={question.number}>
                <span>PERTANYAAN {question.number}</span>
                <p>{question.prompt}</p>
                {question.code && <CodeBlock>{question.code}</CodeBlock>}
                {question.list && (
                  <ul className="session-one-list">
                    {question.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                <label className="session-one-answer" htmlFor={answerId}>
                  <span>Jawabanmu</span>
                  <textarea
                    id={answerId}
                    value={answers[question.number] ?? ""}
                    onChange={(event) => updateAnswer(question.number, event.target.value)}
                    rows={4}
                    placeholder="Tulis jawabanmu berdasarkan pemahaman sendiri..."
                  />
                </label>
                <details>
                  <summary>Lihat petunjuk jawaban</summary>
                  <p>{question.answer}</p>
                </details>
              </article>
            );
          })}
        </section>
      ))}
    </div>
  );
}
