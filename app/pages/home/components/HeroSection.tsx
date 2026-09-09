import { ArrowRight, Check, Code2, Play } from "lucide-react";

type HeroSectionProps = {
  firstChapterHref: string;
};

export default function HeroSection({ firstChapterHref }: HeroSectionProps) {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-copy home-reveal home-reveal-copy">
        <div className="home-eyebrow">
          <span aria-hidden="true" /> LAB BELAJAR INTERAKTIF
        </div>
        <h1 id="home-title">
          Belajar dengan <em>mencoba,</em> bukan sekadar membaca.
        </h1>
        <p>
          Pahami konsep JavaScript dan logika, ubah contoh, jalankan, lalu
          buktikan hasilnya sendiri.
        </p>
        <div className="home-hero-actions">
          <a className="home-button home-button-primary" href={firstChapterHref}>
            Mulai belajar JavaScript <ArrowRight size={17} />
          </a>
          <a className="home-button home-button-secondary" href="/play">
            <Play size={16} fill="currentColor" /> Buka Runtime JS
          </a>
        </div>
        <div className="home-proof">
          <Check size={15} aria-hidden="true" />
          Langsung di browser
          <span aria-hidden="true" />
          Progres tersimpan per bab
        </div>
      </div>

      <div
        className="home-scene home-reveal home-reveal-scene"
        aria-label="Materi, editor kode, dan hasil berada dalam satu ruang belajar"
      >
        <div className="home-scene-grid" aria-hidden="true" />
        <div className="home-scene-label home-scene-label-top" aria-hidden="true">
          READ
        </div>
        <div className="home-scene-label home-scene-label-bottom" aria-hidden="true">
          RUN
        </div>

        <article className="home-scene-lesson">
          <div className="home-window-bar">
            <span />
            <span />
            <span />
            <small>01 / NILAI</small>
          </div>
          <p>INTI MATERI</p>
          <h2>Nilai dan tipe data</h2>
          <div className="home-scene-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </article>

        <article className="home-scene-editor">
          <div className="home-editor-heading">
            <span>
              <Code2 size={14} /> latihan.js
            </span>
            <span>JavaScript</span>
          </div>
          <pre aria-label="Contoh kode JavaScript">
            <code>
              <span className="code-line-number">1</span>
              <span className="code-keyword">const</span>{" "}
              <span className="code-name">age</span> ={" "}
              <span className="code-number">20</span>;
              {"\n"}
              <span className="code-line-number">2</span>
              <span className="code-keyword">typeof</span>{" "}
              <span className="code-name">age</span>;
            </code>
          </pre>
          <div className="home-editor-result">
            <span>HASIL</span>
            <code>"number"</code>
            <i>12 ms</i>
          </div>
        </article>

        <div className="home-scene-logic">
          <small>LOGIC LAB</small>
          <code>(p → q) ∧ p ⊢ q</code>
          <span>
            <i aria-hidden="true" /> VALID
          </span>
        </div>
      </div>
    </section>
  );
}
