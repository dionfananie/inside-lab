import { BookOpen, Route, Terminal } from "lucide-react";

export function BridgeSection() {
  return (
    <section className="lab-bridge lab-shell" aria-labelledby="bridge-title">
      <div className="lab-section-label">PROGRAMMING ≠ HAFAL SINTAKS</div>
      <div className="lab-bridge-heading">
        <h2 id="bridge-title">Karier tidak dibangun dari tutorial yang selesai ditonton.</h2>
        <p>
          Karier dibangun saat kamu bisa menghadapi masalah yang belum pernah
          kamu lihat, memecahnya, mencoba solusi, dan menjelaskan keputusanmu.
        </p>
      </div>
      <div className="lab-bridge-grid">
        <article>
          <span className="lab-bridge-icon"><BookOpen size={21} /></span>
          <small>01 / UNDERSTAND</small>
          <h3>Bangun model mental.</h3>
          <p>Pahami apa yang dilakukan komputer dan mengapa kode menghasilkan sesuatu.</p>
        </article>
        <article>
          <span className="lab-bridge-icon"><Terminal size={21} /></span>
          <small>02 / PRACTICE</small>
          <h3>Tulis, jalankan, perbaiki.</h3>
          <p>Ubah pengetahuan pasif menjadi kemampuan lewat feedback yang cepat.</p>
        </article>
        <article>
          <span className="lab-bridge-icon"><Route size={21} /></span>
          <small>03 / ENGINEER</small>
          <h3>Hubungkan jadi sistem.</h3>
          <p>Rangkai konsep menjadi fitur yang teruji, terstruktur, dan berguna.</p>
        </article>
      </div>
    </section>
  );
}
