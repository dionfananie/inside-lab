import { ArrowLeft } from "lucide-react";

import type { LogicSession } from "../types";
import type { KnowledgeCheckGroup } from "../sessions/session-1/data";
import KnowledgeCheck from "./KnowledgeCheck";

type CheckPageProps = {
  session: LogicSession;
  groups?: KnowledgeCheckGroup[];
};

export default function CheckPage({ session, groups }: CheckPageProps) {
  const sessionHref = `/computational-logic/session/${session.session}`;

  return (
    <main className="check-page">
      <header className="check-header">
        <a className="check-back-link" href={sessionHref}>
          <ArrowLeft size={15} /> Kembali ke materi
        </a>
        <span className="check-header-progress">SESI 0{session.session} · KNOWLEDGE CHECK</span>
      </header>

      <section className="check-hero" aria-labelledby="check-title">
        <div className="computational-section-label">KNOWLEDGE CHECK · SESI 0{session.session}</div>
        <h1 id="check-title">{session.topic}</h1>
        <p>
          Uji pemahamanmu terhadap materi sesi ini. Jawab berdasarkan pemahaman
          sendiri, lalu gunakan hasil penilaian untuk memperbaiki jawaban.
        </p>
      </section>

      <div className="check-body">
        {groups ? (
          <KnowledgeCheck groups={groups} sessionHref={sessionHref} sessionId={session.session} />
        ) : (
          <div className="check-placeholder">
            <h2>Knowledge check sedang disiapkan</h2>
            <p>
              Micro-quiz untuk sesi ini belum tersedia. Silakan kembali ke
              materi atau lanjut ke sesi berikutnya.
            </p>
            <a className="check-back-link" href={sessionHref}>Kembali ke materi</a>
          </div>
        )}
      </div>
    </main>
  );
}
