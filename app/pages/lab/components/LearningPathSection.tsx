import { ArrowRight, Play } from "lucide-react";

import { roadmap } from "../data";

export function LearningPathSection() {
  return (
    <section className="lab-path" id="path" aria-labelledby="path-title">
      <div className="lab-shell">
        <div className="lab-section-heading">
          <div>
            <div className="lab-section-label lab-section-label-light">YOUR LEARNING PATH</div>
            <h2 id="path-title">Jalur yang mengubah “aku tahu” menjadi “aku bisa”.</h2>
          </div>
          <p>
            Mulai dari cara berpikir paling dasar. Naikkan kompleksitas hanya
            ketika fondasimu siap.
          </p>
        </div>
        <div className="lab-roadmap">
          {roadmap.map((step, index) => {
            const Icon = step.icon;
            return (
              <article className="lab-roadmap-card" key={step.number}>
                <div className="lab-roadmap-rail" aria-hidden="true">
                  <span>{step.number}</span>
                  {index < roadmap.length - 1 && <i />}
                </div>
                <div className="lab-roadmap-content">
                  <div className="lab-roadmap-top">
                    <span><Icon size={17} /> {step.kicker}</span>
                    <small>{step.tag}</small>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
        <a className="lab-path-cta" href="/js/values-types-operators">
          <span><Play size={16} fill="currentColor" /></span>
          <span>
            <small>START HERE</small>
            <strong>Mulai dari fondasi JavaScript</strong>
          </span>
          <ArrowRight size={19} />
        </a>
      </div>
    </section>
  );
}
