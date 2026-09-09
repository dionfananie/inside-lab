import { ArrowRight, BookOpen, ChevronRight, Lightbulb } from 'lucide-react';
import { LessonText } from './LessonText';
import type { LearningPageModel } from '../useLearningPage';

interface LessonPaneProps {
  learning: LearningPageModel;
}

export function LessonPane({ learning }: LessonPaneProps) {
  const { arrival, chapter, lessonTitle, part, partIndex, parts } = learning;
  return (
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
  );
}
