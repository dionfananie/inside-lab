import { ArrowRight, BookOpen, CheckCircle2, Cpu, FlaskConical } from "lucide-react";

import { InsideLabBrand } from "~/components/inside-lab-brand";
import { logicPrinciples, logicSessions } from "./data";

export default function ComputationalLogicPage() {
  return (
    <main className="computational-page">
      <header className="computational-header">
        <InsideLabBrand area="Computational Logic" />
        <nav aria-label="Jalur belajar">
          <a href="/">Home</a>
          <a href="/js/values-types-operators">Learning JS</a>
          <a href="/computational-logic" aria-current="page">Computational Logic</a>
        </nav>
      </header>

      <section className="computational-hero" aria-labelledby="computational-title">
        <div>
          <div className="computational-eyebrow">COMPUTATIONAL LOGIC / LEARNING PATH</div>
          <h1 id="computational-title">Buat keputusan yang bisa dijelaskan, diuji, dan dibuktikan.</h1>
          <p>
            Pelajari cara komputer merepresentasikan aturan, membaca makna,
            dan memeriksa apakah sebuah kesimpulan benar-benar mengikuti premisnya.
          </p>
          <div className="computational-actions">
            <a className="computational-button computational-button-primary" href="/computational-logic/session/1">
              Mulai sesi 1 <ArrowRight size={16} />
            </a>
            <a className="computational-button" href="/computational-logic/sat-solver">
              Buka SAT Solver <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="computational-formula" aria-label="Contoh aturan logika">
          <span>ATURAN KEPUTUSAN</span>
          <code>(login ∧ izin) → akses</code>
          <small>formal · syntactic · semantic</small>
        </div>
      </section>

      <section className="computational-section computational-principles" aria-labelledby="principles-title">
        <div className="computational-section-heading">
          <div className="computational-section-label">01 / FONDASI</div>
          <h2 id="principles-title">Empat cara membaca sebuah aturan.</h2>
          <p>Mulai dari bentuknya, pahami maknanya, lalu uji kesimpulannya.</p>
        </div>
        <div className="computational-principle-grid">
          {logicPrinciples.map(([title, description]) => (
            <article key={title}><span>{title}</span><p>{description}</p></article>
          ))}
        </div>
      </section>

      <section className="computational-section computational-tools" aria-labelledby="tools-title">
        <div className="computational-section-heading">
          <div className="computational-section-label">02 / LABORATORIUM</div>
          <h2 id="tools-title">Belajar konsep dengan alat yang bisa langsung dicoba.</h2>
        </div>
        <div className="computational-tool-grid">
          <a href="/computational-logic/proportional-logic" className="computational-tool-card">
            <BookOpen size={22} /><span>LOGIC LAB</span><h3>Uji argumen dengan tabel kebenaran.</h3><p>Bandingkan premis dan kesimpulan melalui 22 bentuk argumen interaktif.</p><strong>Buka Logic Lab <ArrowRight size={15} /></strong>
          </a>
          <a href="/computational-logic/sat-solver" className="computational-tool-card computational-tool-card-dark">
            <Cpu size={22} /><span>SAT SOLVER</span><h3>Cari assignment yang memenuhi semua klausa.</h3><p>Masukkan DIMACS CNF, jalankan solver, dan baca model literal bertanda.</p><strong>Buka SAT Solver <ArrowRight size={15} /></strong>
          </a>
          <div className="computational-tool-card computational-tool-card-muted">
            <FlaskConical size={22} /><span>AKTIVITAS KELAS</span><h3>Eksperimen dan debat menjadi bagian dari proses.</h3><p>Setiap sesi memiliki aktivitas aktif yang menghubungkan simbol formal dengan masalah nyata.</p>
          </div>
        </div>
      </section>

      <section className="computational-section computational-roadmap" aria-labelledby="roadmap-title">
        <div className="computational-section-heading">
          <div className="computational-section-label">03 / ROADMAP</div>
          <h2 id="roadmap-title">Enam sesi untuk membangun cara berpikir logis.</h2>
        </div>
        <div className="computational-session-list">
          {logicSessions.map((session) => (
            <a href={session.href} className="computational-session" key={session.session}>
              <span className="computational-session-number">0{session.session}</span>
              <span><strong>{session.topic}</strong><small>{session.target}</small><em>{session.activity}</em></span>
              <span className="computational-session-state"><CheckCircle2 size={14} /> Tersedia</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="computational-footer">
        <InsideLabBrand area="Computational Logic" />
        <nav aria-label="Navigasi footer"><a href="/">Home</a><a href="/js/values-types-operators">Learning JS</a><a href="/play">Runtime JS</a></nav>
      </footer>
    </main>
  );
}
