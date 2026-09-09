import { ArrowRight } from "lucide-react";

import { practiceLoop } from "../data";

export function PracticeLoopSection() {
  return (
    <section className="lab-loop lab-shell" aria-labelledby="loop-title">
      <div className="lab-loop-copy">
        <div className="lab-section-label">THE PRACTICE LOOP</div>
        <h2 id="loop-title">Feedback cepat. Kemampuan yang terus naik.</h2>
        <p>
          Setiap sesi dirancang sebagai siklus kecil. Kamu selalu tahu apa yang
          sedang dilatih dan apa langkah berikutnya.
        </p>
        <a href="/js/values-types-operators">Coba satu latihan <ArrowRight size={16} /></a>
      </div>
      <div className="lab-loop-visual">
        <div className="lab-loop-line" aria-hidden="true" />
        {practiceLoop.map(([number, title, copy]) => (
          <article key={number}>
            <span>{number}</span>
            <div><strong>{title}</strong><p>{copy}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
