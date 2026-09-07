import { useState } from "react";
import {
  ArrowRight,
  Binary,
  BookOpen,
  Boxes,
  Braces,
  Bug,
  Check,
  ChevronRight,
  CirclePlay,
  Code2,
  GitBranch,
  GraduationCap,
  Layers3,
  MessageSquareCode,
  Network,
  Play,
  Route,
  Sparkles,
  Terminal,
  TestTube2,
  Wrench,
} from "lucide-react";

import { InsideLabBrand } from "~/components/inside-lab-brand";

const languages = [
  {
    id: "javascript",
    short: "JS",
    name: "JavaScript",
    role: "Bangun sesuatu yang langsung terlihat.",
    description:
      "Mulai dari logika dasar, lalu hidupkan antarmuka web dan pahami bagaimana aplikasi bekerja di browser.",
    accent: "#d9f56a",
    uses: ["Fondasi programming", "Web interaktif", "Frontend & backend"],
    code: [
      ["const", " goals = [\"learn\", \"build\", \"ship\"];"],
      ["", ""],
      ["goals.map", "(step => step.toUpperCase());"],
    ],
  },
  {
    id: "python",
    short: "PY",
    name: "Python",
    role: "Ubah ide menjadi solusi dengan cepat.",
    description:
      "Pelajari sintaks yang ringkas untuk otomasi, pengolahan data, backend, dan eksplorasi machine learning.",
    accent: "#7fd7ff",
    uses: ["Problem solving", "Automation & data", "Backend & AI"],
    code: [
      ["goals", " = [\"learn\", \"build\", \"ship\"]"],
      ["", ""],
      ["result", " = [step.upper() for step in goals]"],
    ],
  },
  {
    id: "java",
    short: "JV",
    name: "Java",
    role: "Rancang program besar dengan struktur kuat.",
    description:
      "Latih object-oriented programming, tipe data yang tegas, dan pola yang banyak dipakai pada sistem enterprise.",
    accent: "#ff9e78",
    uses: ["OOP yang terstruktur", "Backend services", "Enterprise systems"],
    code: [
      ["var", " goals = List.of(\"learn\", \"build\", \"ship\");"],
      ["", ""],
      ["goals.stream", "().map(String::toUpperCase).toList();"],
    ],
  },
  {
    id: "cpp",
    short: "C++",
    name: "C++",
    role: "Pahami performa sampai ke lapisan bawah.",
    description:
      "Bangun pemahaman tentang memori, algoritma, dan efisiensi untuk software yang dekat dengan sistem.",
    accent: "#c5a7ff",
    uses: ["Memory & performance", "Algorithms", "Systems & games"],
    code: [
      ["vector<string>", " goals = {\"learn\", \"build\", \"ship\"};"],
      ["", ""],
      ["transform", "(goals.begin(), goals.end(), /* ... */);"],
    ],
  },
] as const;

const roadmap = [
  {
    number: "01",
    kicker: "FOUNDATION",
    title: "Belajar cara program berpikir",
    copy: "Nilai, kondisi, loop, fungsi, dan struktur data—bukan untuk dihafal, tetapi untuk dipakai memecahkan masalah.",
    tag: "JavaScript",
    icon: Binary,
  },
  {
    number: "02",
    kicker: "FLUENCY",
    title: "Lihat pola yang sama di bahasa berbeda",
    copy: "Pindahkan konsep ke Python, Java, dan C++. Kamu belajar memilih alat, bukan bergantung pada satu sintaks.",
    tag: "Multi-language",
    icon: Braces,
  },
  {
    number: "03",
    kicker: "ENGINEERING",
    title: "Bangun seperti software engineer",
    copy: "Pecah fitur, baca error, tulis test, gunakan Git, dan perbaiki kode sampai siap dipakai orang lain.",
    tag: "Real workflow",
    icon: Wrench,
  },
  {
    number: "04",
    kicker: "PORTFOLIO",
    title: "Kirim proyek yang bisa kamu jelaskan",
    copy: "Selesaikan proyek utuh, dokumentasikan keputusan, lalu tunjukkan bukan hanya hasil—tetapi cara berpikirmu.",
    tag: "Proof of skill",
    icon: GraduationCap,
  },
];

const engineeringSkills = [
  {
    icon: Bug,
    label: "DEBUGGING",
    title: "Jangan takut error.",
    copy: "Baca gejala, buat hipotesis, uji satu hal, dan temukan penyebab sebenarnya.",
    className: "lab-skill-debug",
  },
  {
    icon: GitBranch,
    label: "GIT & COLLABORATION",
    title: "Kerja rapi bersama tim.",
    copy: "Catat perubahan, gunakan branch, review kode, dan komunikasikan konteks dengan jelas.",
    className: "lab-skill-git",
  },
  {
    icon: TestTube2,
    label: "TESTING",
    title: "Buktikan kode tetap benar.",
    copy: "Ubah requirement menjadi kasus uji dan cegah bug lama muncul kembali.",
    className: "lab-skill-test",
  },
  {
    icon: Network,
    label: "SYSTEM THINKING",
    title: "Lihat hubungan antarlapisan.",
    copy: "Pahami aliran data dari antarmuka, API, server, hingga database.",
    className: "lab-skill-system",
  },
  {
    icon: MessageSquareCode,
    label: "COMMUNICATION",
    title: "Jelaskan keputusan teknis.",
    copy: "Tuliskan trade-off dan bantu orang lain memahami solusi tanpa jargon berlebihan.",
    className: "lab-skill-communication",
  },
];

export default function LabPage() {
  const [languageId, setLanguageId] = useState<(typeof languages)[number]["id"]>(
    "javascript",
  );
  const activeLanguage =
    languages.find((language) => language.id === languageId) ?? languages[0];

  return (
    <main className="lab-page">
      <header className="lab-header lab-enter lab-enter-1">
        <InsideLabBrand area="Software Engineer Lab" />
        <nav aria-label="Navigasi utama Lab">
          <a href="#path">Learning path</a>
          <a href="#languages">Languages</a>
          <a href="#skills">Engineer skills</a>
        </nav>
        <a className="lab-header-cta" href="/js/values-types-operators">
          Mulai belajar <ArrowRight size={15} />
        </a>
      </header>

      <section className="lab-hero" aria-labelledby="lab-title">
        <div className="lab-hero-copy lab-enter lab-enter-2">
          <div className="lab-eyebrow">
            <span aria-hidden="true" /> FROM FIRST LINE TO FIRST ROLE
          </div>
          <h1 id="lab-title">
            Belajar menulis kode.
            <span>Berlatih berpikir seperti engineer.</span>
          </h1>
          <p>
            Satu learning lab untuk memahami programming, menjelajahi JavaScript,
            Python, Java, dan C++, lalu membangun kebiasaan yang dibutuhkan untuk
            menjadi software engineer.
          </p>
          <div className="lab-hero-actions">
            <a className="lab-button lab-button-primary" href="/js/values-types-operators">
              Mulai fondasi gratis <ArrowRight size={17} />
            </a>
            <a className="lab-button lab-button-ghost" href="#path">
              <CirclePlay size={17} /> Lihat learning path
            </a>
          </div>
          <div className="lab-hero-proof" aria-label="Keunggulan pembelajaran">
            <span><Check size={14} /> Praktik langsung</span>
            <span><Check size={14} /> Jalur terstruktur</span>
            <span><Check size={14} /> Siap proyek nyata</span>
          </div>
        </div>

        <div className="lab-hero-visual lab-enter lab-enter-3" aria-label="Visual perjalanan dari kode ke software siap dikirim">
          <div className="lab-orbit lab-orbit-one" aria-hidden="true" />
          <div className="lab-orbit lab-orbit-two" aria-hidden="true" />
          <div className="lab-code-window">
            <div className="lab-window-top">
              <span><i /><i /><i /></span>
              <small>first-project.js</small>
              <em>● LIVE</em>
            </div>
            <div className="lab-code-body">
              <span className="lab-line-no">01</span>
              <code><b>const</b> learner = {"{"}</code>
              <span className="lab-line-no">02</span>
              <code>  curiosity: <i>true</i>,</code>
              <span className="lab-line-no">03</span>
              <code>  practice: <i>0</i>,</code>
              <span className="lab-line-no">04</span>
              <code>{"}"};</code>
              <span className="lab-line-no">05</span>
              <code />
              <span className="lab-line-no">06</span>
              <code><b>while</b> (learner.curiosity) {"{"}</code>
              <span className="lab-line-no">07</span>
              <code>  learner.practice++;</code>
              <span className="lab-line-no">08</span>
              <code>{"}"}</code>
            </div>
            <div className="lab-window-output">
              <span>BUILD STATUS</span>
              <strong><Check size={14} /> Ready to grow</strong>
            </div>
          </div>
          <div className="lab-floating-card lab-card-concept">
            <span><Layers3 size={16} /> CONCEPT</span>
            <strong>Understand</strong>
            <i>01</i>
          </div>
          <div className="lab-floating-card lab-card-project">
            <span><Boxes size={16} /> PROJECT</span>
            <strong>Build & ship</strong>
            <i>03</i>
          </div>
          <div className="lab-ship-badge">
            <Sparkles size={16} />
            <span><small>NEXT MILESTONE</small>Software Engineer</span>
          </div>
        </div>
      </section>

      <section className="lab-signal" aria-label="Prinsip pembelajaran insideLab">
        <span>LEARN THE CONCEPT</span><ChevronRight size={16} />
        <span>WRITE THE CODE</span><ChevronRight size={16} />
        <span>DEBUG THE RESULT</span><ChevronRight size={16} />
        <strong>SHIP THE PROJECT</strong>
      </section>

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

      <section className="lab-languages lab-shell" id="languages" aria-labelledby="languages-title">
        <div className="lab-section-heading lab-section-heading-dark">
          <div>
            <div className="lab-section-label">ONE MINDSET, FOUR LANGUAGES</div>
            <h2 id="languages-title">Bahasa berbeda. Konsep yang saling terhubung.</h2>
          </div>
          <p>
            Jangan bertanya bahasa mana yang paling hebat. Pelajari peran setiap
            bahasa dan pilih berdasarkan masalah yang ingin kamu selesaikan.
          </p>
        </div>

        <div className="lab-language-tabs" role="tablist" aria-label="Pilih bahasa pemrograman">
          {languages.map((language) => (
            <button
              type="button"
              role="tab"
              aria-selected={language.id === activeLanguage.id}
              aria-controls="language-panel"
              id={`language-tab-${language.id}`}
              className={language.id === activeLanguage.id ? "is-active" : ""}
              onClick={() => setLanguageId(language.id)}
              key={language.id}
            >
              <span style={{ "--language-accent": language.accent } as React.CSSProperties}>
                {language.short}
              </span>
              {language.name}
            </button>
          ))}
        </div>

        <div
          className="lab-language-panel"
          id="language-panel"
          role="tabpanel"
          aria-labelledby={`language-tab-${activeLanguage.id}`}
          key={activeLanguage.id}
          style={{ "--language-accent": activeLanguage.accent } as React.CSSProperties}
        >
          <div className="lab-language-copy">
            <small>WHY {activeLanguage.name.toUpperCase()}?</small>
            <h3>{activeLanguage.role}</h3>
            <p>{activeLanguage.description}</p>
            <ul>
              {activeLanguage.uses.map((use) => (
                <li key={use}><Check size={14} /> {use}</li>
              ))}
            </ul>
            {activeLanguage.id === "javascript" ? (
              <a href="/js/values-types-operators">
                Buka jalur JavaScript <ArrowRight size={16} />
              </a>
            ) : (
              <span className="lab-coming-soon">ROADMAP DISIAPKAN · MULAI DARI FONDASI JS</span>
            )}
          </div>
          <div className="lab-language-code">
            <div>
              <span><Code2 size={14} /> concept.{activeLanguage.id === "python" ? "py" : activeLanguage.id === "cpp" ? "cpp" : activeLanguage.id === "java" ? "java" : "js"}</span>
              <small>same idea / new syntax</small>
            </div>
            <pre>
              {activeLanguage.code.map(([token, rest], index) => (
                <code key={index}>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  <b>{token}</b>{rest}{"\n"}
                </code>
              ))}
            </pre>
            <footer>
              <span><i /> CONCEPT TRANSFER</span>
              <strong>Array → Transform → Result</strong>
            </footer>
          </div>
        </div>
      </section>

      <section className="lab-skills" id="skills" aria-labelledby="skills-title">
        <div className="lab-shell">
          <div className="lab-section-heading">
            <div>
              <div className="lab-section-label">BEYOND THE LANGUAGE</div>
              <h2 id="skills-title">Kode hanyalah satu bagian dari engineering.</h2>
            </div>
            <p>
              Engineer yang siap bekerja tahu cara menemukan masalah, menjaga
              kualitas, dan bekerja di dalam sistem bersama orang lain.
            </p>
          </div>
          <div className="lab-skills-grid">
            {engineeringSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <article className={skill.className} key={skill.label}>
                  <div><Icon size={22} /><small>{skill.label}</small></div>
                  <h3>{skill.title}</h3>
                  <p>{skill.copy}</p>
                </article>
              );
            })}
            <article className="lab-skill-core" aria-label="Software engineering skill map">
              <div className="lab-core-ring lab-core-ring-one" />
              <div className="lab-core-ring lab-core-ring-two" />
              <span><Code2 size={23} /></span>
              <strong>ENGINEER<br />MINDSET</strong>
              <small>THINK · BUILD · VERIFY</small>
            </article>
          </div>
        </div>
      </section>

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
          {[
            ["01", "PREDICT", "Bentuk dugaan sebelum menekan run."],
            ["02", "CODE", "Tulis solusi dengan tanganmu sendiri."],
            ["03", "RUN", "Lihat perilaku kode secara langsung."],
            ["04", "REFLECT", "Pahami mengapa hasilnya benar atau salah."],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <div><strong>{title}</strong><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

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
            {[
              "Memecah masalah menjadi langkah yang dapat diprogram",
              "Membaca dokumentasi dan codebase yang belum dikenal",
              "Menguji, men-debug, dan memperbaiki solusi secara sistematis",
              "Membangun proyek yang layak masuk portfolio",
              "Menjelaskan keputusan teknis saat review atau interview",
            ].map((outcome, index) => (
              <div key={outcome}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{outcome}</p>
                <Check size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <footer className="lab-footer lab-shell">
        <InsideLabBrand area="Software Engineer Lab" />
        <p>Learn deeply. Build deliberately. Ship confidently.</p>
        <nav aria-label="Navigasi footer Lab">
          <a href="/">Home</a>
          <a href="/js/values-types-operators">JavaScript</a>
          <a href="/play">Runtime</a>
          <a href="/computational-logic/proportional-logic">Logic Lab</a>
        </nav>
      </footer>
    </main>
  );
}
