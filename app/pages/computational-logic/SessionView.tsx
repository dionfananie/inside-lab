import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { logicSessions, sessionLessons } from "./data";
import SessionOneView from "./sessions/session-1";

type SessionViewProps = { sessionId: number };

export default function ComputationalLogicSession({ sessionId }: SessionViewProps) {
  if (sessionId === 1) return <SessionOneView />;

  const session = logicSessions.find((item) => item.session === sessionId);
  const lesson = sessionLessons[sessionId];
  if (!session || !lesson) return null;

  const previous = logicSessions.find((item) => item.session === sessionId - 1);
  const next = logicSessions.find((item) => item.session === sessionId + 1);

  return (
    <main className="computational-page computational-session-page">
      <header className="computational-header">
        <a className="computational-back-link" href="/computational-logic"><ArrowLeft size={15} /> Computational Logic</a>
        <span className="computational-session-progress">SESI 0{session.session} / 06</span>
      </header>
      <section className="computational-lesson-hero">
        <div className="computational-section-label">SESI 0{session.session} · MATERI</div>
        <h1>{session.topic}</h1>
        <p>{session.target}</p>
      </section>
      <section className="computational-lesson-grid">
        <article className="computational-lesson-main">
          <div className="computational-section-label">PERTANYAAN PEMBUKA</div>
          <h2>{lesson.question}</h2>
          <p>{session.activity}</p>
          <div className="computational-lesson-example"><span>CONTOH FORMAL</span><code>{lesson.example}</code></div>
          <h2>Konsep inti</h2>
          <ul className="computational-concept-list">
            {lesson.concepts.map((concept) => <li key={concept}><CheckCircle2 size={16} />{concept}</li>)}
          </ul>
          <div className="computational-takeaway"><strong>Inti sesi</strong><p>{lesson.takeaway}</p></div>
          {lesson.practice && <div className="computational-practice"><h2>Valid atau invalid?</h2><div>{lesson.practice.map((item) => <article key={item.label}><strong>{item.label}</strong><code>{item.formula}</code><p>{item.verdict}</p></article>)}</div></div>}
        </article>
        <aside className="computational-lesson-aside">
          <span className="computational-section-label">AKTIVITAS AKTIF</span>
          <h3>{session.activity.split(":")[0]}</h3>
          <p>Gunakan konsep sesi ini untuk memeriksa contoh, menyampaikan alasan, dan mencari counterexample.</p>
          {session.tool && <a className="computational-button computational-button-primary" href={session.tool.href}>{session.tool.label} <ArrowRight size={15} /></a>}
        </aside>
      </section>
      <section className="computational-lesson-cta">
        <div>
          <div className="computational-section-label">KNOWLEDGE CHECK</div>
          <h2>Siap menguji pemahamanmu?</h2>
          <p>Kerjakan micro-quiz dari materi sesi ini di halaman terpisah.</p>
        </div>
        <a className="computational-button computational-button-primary" href={`/computational-logic/session/${session.session}/check`}>
          Lanjut ke knowledge check <ArrowRight size={15} />
        </a>
      </section>
      <nav className="computational-session-navigation" aria-label="Navigasi sesi">
        {previous ? <a href={previous.href}><ArrowLeft size={15} /> Sesi sebelumnya</a> : <span />}
        {next ? <a href={next.href}>Sesi berikutnya <ArrowRight size={15} /></a> : <a href="/computational-logic">Selesai <ArrowRight size={15} /></a>}
      </nav>
    </main>
  );
}
