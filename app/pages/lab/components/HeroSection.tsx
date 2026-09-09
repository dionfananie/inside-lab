import {
  ArrowRight,
  Boxes,
  Check,
  CirclePlay,
  Layers3,
  Sparkles,
} from "lucide-react";

export function HeroSection() {
  return (
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
  );
}
