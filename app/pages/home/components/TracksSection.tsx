import { ArrowRight, BookOpen, Lightbulb, Terminal } from "lucide-react";

type TracksSectionProps = { firstChapterHref: string; totalExercises: number };

export default function TracksSection({ firstChapterHref, totalExercises }: TracksSectionProps) {
  return (
    <section className="home-section home-labs" id="jalur" aria-labelledby="tracks-title">
      <div className="home-section-heading home-labs-heading">
        <div>
          <div className="home-section-number">03 · PILIH JALUR</div>
          <h2 id="tracks-title">Dua jalur. Satu kebiasaan: buktikan sendiri.</h2>
        </div>
        <p>Pilih fondasi pemrograman atau cara berpikir logis, lalu gunakan alat interaktif untuk menguji pemahamanmu.</p>
      </div>
      <div className="home-lab-grid home-track-grid">
        <article className="home-lab-card home-lab-learning">
          <div className="home-lab-card-top"><span className="home-lab-icon"><BookOpen size={21} /></span><span>01 / LEARNING JS</span></div>
          <div><h3>Bangun fondasi JavaScript secara bertahap.</h3><p>Materi ringkas, editor, petunjuk, dan latihan bertingkat dari nilai dasar sampai asynchronous programming.</p></div>
          <div className="home-track-links"><a href={firstChapterHref}>Mulai Bab 01 <ArrowRight size={15} /></a><a href="/play"><Terminal size={15} /> Buka Runtime JS</a></div>
          <div className="home-lab-footer"><span>{totalExercises} latihan bertahap</span><strong>Learning JS <ArrowRight size={16} /></strong></div>
        </article>
        <article className="home-lab-card home-lab-logic">
          <div className="home-lab-card-top"><span className="home-lab-icon"><Lightbulb size={21} /></span><span>02 / COMPUTATIONAL LOGIC</span></div>
          <div><h3>Ubah intuisi menjadi argumen yang dapat diuji.</h3><p>Pelajari logika formal, sintaks, semantik, tabel kebenaran, dan SAT melalui aktivitas yang membuat alasanmu terlihat.</p></div>
          <div className="home-logic-links"><a href="/computational-logic">Jelajahi jalur <ArrowRight size={15} /></a><a href="/computational-logic/sat-solver">SAT Solver <ArrowRight size={15} /></a><a href="/computational-logic/proportional-logic">Logic Lab <ArrowRight size={15} /></a></div>
          <div className="home-lab-footer"><span>6 sesi · bertahap</span><strong>Computational Logic <ArrowRight size={16} /></strong></div>
        </article>
      </div>
    </section>
  );
}
