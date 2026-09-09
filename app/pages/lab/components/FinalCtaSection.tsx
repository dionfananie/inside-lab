import { ArrowRight, GraduationCap, Terminal } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="lab-final lab-shell" aria-labelledby="lab-final-title">
      <div className="lab-final-grid" aria-hidden="true" />
      <div className="lab-final-icon"><GraduationCap size={27} /></div>
      <div className="lab-section-label lab-section-label-light">YOUR FIRST COMMIT STARTS HERE</div>
      <h2 id="lab-final-title">Jangan tunggu sampai merasa siap.<br />Mulai, lalu bangun kesiapanmu.</h2>
      <p>
        Satu konsep. Satu latihan. Satu langkah lebih dekat menjadi software engineer.
      </p>
      <div className="lab-final-actions">
        <a className="lab-button lab-button-light" href="/js/values-types-operators">
          Mulai belajar sekarang <ArrowRight size={17} />
        </a>
        <a href="/play"><Terminal size={16} /> Coba Runtime JS</a>
      </div>
      <small>Tanpa setup · Langsung di browser · Progres tersimpan</small>
    </section>
  );
}
