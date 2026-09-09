import { ArrowRight } from "lucide-react";

import { chapterDescriptions } from "../data";
import type { HomeChapter } from "../types";

type CurriculumSectionProps = {
  chapters: HomeChapter[];
};

export default function CurriculumSection({ chapters }: CurriculumSectionProps) {
  return (
    <section
      className="home-section home-curriculum"
      id="materi"
      aria-labelledby="curriculum-title"
    >
      <div className="home-section-heading">
        <div>
          <div className="home-section-number">02 · JALUR JAVASCRIPT</div>
          <h2 id="curriculum-title">Dari nilai dasar sampai pemrograman asinkron.</h2>
        </div>
        <p>
          {chapters.length} bab yang saling membangun, dengan tiga jenis latihan
          di setiap bagian.
        </p>
      </div>

      <div className="home-roadmap">
        {chapters.map((chapter, index) => {
          return (
            <a
              className="home-chapter-card"
              href={`/js/${chapter.id}`}
              key={chapter.id}
            >
              <div className="home-chapter-index">
                <span>{chapter.number}</span>
                {index < chapters.length - 1 && <i aria-hidden="true" />}
              </div>
              <div className="home-chapter-content">
                <small>BAB {chapter.number}</small>
                <h3>{chapter.title}</h3>
                <p>{chapterDescriptions[chapter.id]}</p>
                <span className="home-chapter-meta">
                  {chapter.partCount} bagian · {chapter.exerciseCount} latihan
                </span>
              </div>
              <span className="home-card-arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
