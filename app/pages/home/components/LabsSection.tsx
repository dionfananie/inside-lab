import { ArrowRight, BookOpen, Lightbulb, Terminal } from "lucide-react";

type LabsSectionProps = {
  firstChapterHref: string;
  totalExercises: number;
};

export default function LabsSection({
  firstChapterHref,
  totalExercises,
}: LabsSectionProps) {
  return (
    <section
      className="home-section home-labs"
      id="laboratorium"
      aria-labelledby="labs-title"
    >
      <div className="home-section-heading home-labs-heading">
        <div>
          <div className="home-section-number">03 · PILIH RUANGMU</div>
          <h2 id="labs-title">Belajar, membuktikan, atau bereksperimen.</h2>
        </div>
        <p>
          Tiga ruang kerja dengan satu prinsip: lakukan sendiri, lalu lihat
          apa yang benar-benar terjadi.
        </p>
      </div>

      <div className="home-lab-grid">
        <a className="home-lab-card home-lab-learning" href={firstChapterHref}>
          <div className="home-lab-card-top">
            <span className="home-lab-icon">
              <BookOpen size={21} />
            </span>
            <span>01 / JS LEARNING</span>
          </div>
          <div>
            <h3>Belajar terarah, tetap aktif.</h3>
            <p>
              Materi ringkas, model mental, contoh, editor, petunjuk, dan kasus
              uji berada dalam satu alur.
            </p>
          </div>
          <div className="home-lab-footer">
            <span>{totalExercises} latihan</span>
            <strong>
              Mulai Bab 01 <ArrowRight size={16} />
            </strong>
          </div>
        </a>

        <a
          className="home-lab-card home-lab-logic"
          href="/computational-logic/proportional-logic"
        >
          <div className="home-lab-card-top">
            <span className="home-lab-icon">
              <Lightbulb size={21} />
            </span>
            <span>02 / LOGIC LAB</span>
          </div>
          <div>
            <h3>Jangan hanya percaya kesimpulannya. Buktikan.</h3>
            <p>
              Ubah kalimat dan simbol, atur nilai benar atau salah, lalu cari
              penyangkal melalui tabel kebenaran.
            </p>
          </div>
          <div className="home-truth-preview" aria-hidden="true">
            <div>
              <code>(p → q) ∧ p ⊢ q</code>
              <span>VALID</span>
            </div>
            <div className="home-truth-row home-truth-head">
              <span>p</span><span>q</span><span>premis</span><span>hasil</span>
            </div>
            <div className="home-truth-row is-selected">
              <span>B</span><span>B</span><span>B</span><span>✓</span>
            </div>
            <div className="home-truth-row">
              <span>B</span><span>S</span><span>S</span><span>—</span>
            </div>
          </div>
          <strong className="home-lab-link">
            Buka 22 bentuk argumen <ArrowRight size={16} />
          </strong>
        </a>

        <a className="home-lab-card home-lab-runtime" href="/play">
          <div className="home-lab-card-top">
            <span className="home-lab-icon">
              <Terminal size={21} />
            </span>
            <span>03 / RUNTIME JS</span>
          </div>
          <div>
            <h3>Ubah kode. Lihat hasilnya seketika.</h3>
            <p>
              Scratchpad JavaScript dengan output live, async/await, tema
              editor, dan mode layar penuh.
            </p>
          </div>
          <div className="home-runtime-preview" aria-hidden="true">
            <div>
              <span>JS</span> playground.js
              <i><span /> LIVE</i>
            </div>
            <pre><code><b>const</b> ideas = [1, 2, 3]{"\n"}ideas.map(n ={">"} n * 2)</code></pre>
            <div className="home-runtime-output">
              <span>↳ line 2</span>
              <code>[2, 4, 6]</code>
            </div>
          </div>
          <strong className="home-lab-link">
            Buka Runtime JS <ArrowRight size={16} />
          </strong>
        </a>
      </div>
    </section>
  );
}
