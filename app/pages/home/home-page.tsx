import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Lightbulb,
  Play,
  Terminal,
} from "lucide-react";

import { InsideLabBrand } from "~/components/inside-lab-brand";

export type HomeChapter = {
  id: string;
  title: string;
  number: string;
  partCount: number;
  exerciseCount: number;
};

export type HomeExercise = {
  id: string;
  stage: "Prediksi" | "Lengkapi" | "Bangun";
  mode: "expression" | "script" | "console" | "function";
  title: string;
  instruction: string;
  starter: string;
  options?: string[];
};

type HomePageProps = {
  chapters: HomeChapter[];
  firstExercises: HomeExercise[];
  totalParts: number;
  totalExercises: number;
  ruleCount: number;
  origin?: string;
};

const siteName = "insideLab";

const chapterDescriptions: Record<string, string> = {
  "values-types-operators":
    "Kenali nilai, tipe data, operator, perbandingan, dan cara mengubah data.",
  "program-structure":
    "Susun ekspresi, percabangan, dan perulangan menjadi alur program yang jelas.",
  functions:
    "Pelajari parameter, return, scope, closure, rekursi, dan desain fungsi.",
  "objects-arrays":
    "Olah kumpulan data melalui array, objek, destructuring, spread, dan JSON.",
  "higher-order-functions":
    "Gunakan fungsi sebagai nilai dan olah data dengan filter, map, reduce, serta komposisi.",
  "object-oriented-programming":
    "Pahami method, prototype, class, enkapsulasi, iterator, dan pewarisan di JavaScript.",
  "bugs-errors":
    "Temukan bug lebih cepat dengan validasi, testing, debugging, exception, dan assertion.",
  "regular-expressions":
    "Kenali, ekstrak, validasi, dan ubah pola teks menggunakan regular expression.",
  modules:
    "Susun program menjadi modul dengan interface, dependensi, package, dan desain API yang jelas.",
  "asynchronous-programming":
    "Kelola pekerjaan yang menunggu dengan callback, Promise, async/await, dan event loop.",
};

const stageDescriptions = {
  Prediksi: "Baca kode dan bentuk model mental sebelum menjalankannya.",
  Lengkapi: "Isi bagian penting sambil mempertahankan struktur yang tersedia.",
  Bangun: "Rangkai solusi sendiri, lalu uji dengan beberapa kasus.",
} as const;

export default function HomePage({
  chapters,
  firstExercises,
  totalParts,
  totalExercises,
  ruleCount,
  origin,
}: HomePageProps) {
  const [selectedStage, setSelectedStage] = useState(0);
  const selectedExercise = firstExercises[selectedStage];
  const firstChapterHref = `/js/${chapters[0].id}`;
  const websiteSchema = origin
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        inLanguage: "id-ID",
        url: origin,
      }
    : null;

  return (
    <main className="home-page">
      {websiteSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      )}
      <header className="home-header home-reveal">
        <InsideLabBrand area="Lab Belajar" />
        <nav className="home-nav" aria-label="Navigasi utama">
          <a href="#cara-belajar">Cara belajar</a>
          <a href="#materi">Materi</a>
          <a href="#laboratorium">Laboratorium</a>
        </nav>
        <a className="home-header-cta" href={firstChapterHref}>
          Mulai belajar <ArrowRight size={15} />
        </a>
      </header>

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

      <section className="home-metrics" aria-label="Cakupan materi insideLab">
        <div>
          <strong>{chapters.length}</strong>
          <span>Bab JavaScript</span>
        </div>
        <div>
          <strong>{totalParts}</strong>
          <span>Bagian materi</span>
        </div>
        <div>
          <strong>{totalExercises}</strong>
          <span>Latihan bertahap</span>
        </div>
        <div>
          <strong>{ruleCount}</strong>
          <span>Bentuk argumen</span>
        </div>
      </section>

      <section
        className="home-section home-method"
        id="cara-belajar"
        aria-labelledby="method-title"
      >
        <div className="home-section-copy">
          <div className="home-section-number">01 · CARA BELAJAR</div>
          <h2 id="method-title">
            Baca modelnya. Uji prediksimu. Bangun sendiri.
          </h2>
          <p>
            Setiap bagian mengubah konsep menjadi tindakan. Kamu tidak diminta
            menghafal sintaks sebelum melihat cara kerjanya.
          </p>
          <ol className="home-method-list">
            {firstExercises.map((exercise, index) => (
              <li className={selectedStage === index ? "is-active" : ""} key={exercise.id}>
                <button
                  type="button"
                  aria-pressed={selectedStage === index}
                  onClick={() => setSelectedStage(index)}
                >
                  <span>0{index + 1}</span>
                  <span>
                    <strong>{exercise.stage}</strong>
                    <small>{stageDescriptions[exercise.stage]}</small>
                  </span>
                  <ChevronRight size={17} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="home-method-demo">
          <div className="home-demo-tabs" aria-label="Tahap latihan">
            {firstExercises.map((exercise, index) => (
              <button
                type="button"
                aria-pressed={selectedStage === index}
                onClick={() => setSelectedStage(index)}
                key={exercise.id}
              >
                {exercise.stage}
              </button>
            ))}
          </div>
          <div
            className="home-demo-panel"
            aria-live="polite"
            key={selectedExercise.id}
          >
            <div className="home-demo-heading">
              <span>
                <Braces size={15} /> LATIHAN 0{selectedStage + 1}
              </span>
              <span>{selectedExercise.mode}</span>
            </div>
            <h3>{selectedExercise.title}</h3>
            <p>{selectedExercise.instruction}</p>
            <pre>
              <code>{selectedExercise.starter}</code>
            </pre>
            {selectedExercise.options ? (
              <div className="home-demo-options" aria-label="Contoh pilihan jawaban">
                {selectedExercise.options.map((option) => (
                  <span key={option}>{option}</span>
                ))}
              </div>
            ) : (
              <div className="home-demo-status">
                <span>
                  <i aria-hidden="true" /> EDITOR SIAP
                </span>
                <span>Jalankan · Periksa</span>
              </div>
            )}
          </div>
        </div>
      </section>

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

      <section className="home-final" aria-labelledby="final-title">
        <div className="home-final-mark" aria-hidden="true">
          <span>01</span>
          <code>const nextStep = "mulai";</code>
        </div>
        <div>
          <div className="home-section-number">LANGKAH PERTAMA</div>
          <h2 id="final-title">
            Mulai dari satu nilai. Bangun cara berpikir yang lebih kuat.
          </h2>
          <p>
            Bab pertama mengenalkan nilai, tipe data, dan operator melalui delapan
            bagian yang langsung bisa kamu coba.
          </p>
        </div>
        <a className="home-button home-button-light" href={firstChapterHref}>
          Mulai Bab 01 <ArrowRight size={17} />
        </a>
      </section>

      <footer className="home-footer">
        <InsideLabBrand area="Lab Belajar" />
        <p>Ruang belajar interaktif untuk JavaScript dan computational logic.</p>
        <nav aria-label="Navigasi footer">
          <a href={firstChapterHref}>JavaScript</a>
          <a href="/computational-logic/proportional-logic">Logic Lab</a>
          <a href="/play">Runtime JS</a>
        </nav>
      </footer>
    </main>
  );
}
