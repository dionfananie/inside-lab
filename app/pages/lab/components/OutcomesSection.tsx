import { Check } from "lucide-react";

import { outcomes } from "../data";

export function OutcomesSection() {
  return (
    <section className="lab-outcomes" aria-labelledby="outcomes-title">
      <div className="lab-shell lab-outcomes-grid">
        <div className="lab-outcomes-copy">
          <div className="lab-section-label lab-section-label-light">WHAT YOU ARE BUILDING</div>
          <h2 id="outcomes-title">Bukan sekadar selesai belajar. Siap melangkah lebih jauh.</h2>
          <p>
            Tujuan akhirnya adalah kemandirian: kemampuan untuk masuk ke codebase,
            memahami masalah, dan mengirim perbaikan dengan percaya diri.
          </p>
        </div>
        <div className="lab-outcome-list">
          {outcomes.map((outcome, index) => (
            <div key={outcome}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{outcome}</p>
              <Check size={17} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
