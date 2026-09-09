import { Braces, ChevronRight } from "lucide-react";

import { stageDescriptions } from "../data";
import type { HomeExercise } from "../types";

type MethodSectionProps = {
  firstExercises: HomeExercise[];
  selectedExercise: HomeExercise;
  selectedStage: number;
  setSelectedStage: (index: number) => void;
};

export default function MethodSection({
  firstExercises,
  selectedExercise,
  selectedStage,
  setSelectedStage,
}: MethodSectionProps) {
  return (
    <section
      className="home-section home-method"
      id="cara-belajar"
      aria-labelledby="method-title"
    >
      <div className="home-section-copy">
        <div className="home-section-number">01 · CARA BELAJAR</div>
        <h2 id="method-title">
          Baca modelnya. Uji prediksimu. Bangun sendiri.
        </h2>
        <p>
          Setiap bagian mengubah konsep menjadi tindakan. Kamu tidak diminta
          menghafal sintaks sebelum melihat cara kerjanya.
        </p>
        <ol className="home-method-list">
          {firstExercises.map((exercise, index) => (
            <li className={selectedStage === index ? "is-active" : ""} key={exercise.id}>
              <button
                type="button"
                aria-pressed={selectedStage === index}
                onClick={() => setSelectedStage(index)}
              >
                <span>0{index + 1}</span>
                <span>
                  <strong>{exercise.stage}</strong>
                  <small>{stageDescriptions[exercise.stage]}</small>
                </span>
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="home-method-demo">
        <div className="home-demo-tabs" aria-label="Tahap latihan">
          {firstExercises.map((exercise, index) => (
            <button
              type="button"
              aria-pressed={selectedStage === index}
              onClick={() => setSelectedStage(index)}
              key={exercise.id}
            >
              {exercise.stage}
            </button>
          ))}
        </div>
        <div
          className="home-demo-panel"
          aria-live="polite"
          key={selectedExercise.id}
        >
          <div className="home-demo-heading">
            <span>
              <Braces size={15} /> LATIHAN 0{selectedStage + 1}
            </span>
            <span>{selectedExercise.mode}</span>
          </div>
          <h3>{selectedExercise.title}</h3>
          <p>{selectedExercise.instruction}</p>
          <pre>
            <code>{selectedExercise.starter}</code>
          </pre>
          {selectedExercise.options ? (
            <div className="home-demo-options" aria-label="Contoh pilihan jawaban">
              {selectedExercise.options.map((option) => (
                <span key={option}>{option}</span>
              ))}
            </div>
          ) : (
            <div className="home-demo-status">
              <span>
                <i aria-hidden="true" /> EDITOR SIAP
              </span>
              <span>Jalankan · Periksa</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
