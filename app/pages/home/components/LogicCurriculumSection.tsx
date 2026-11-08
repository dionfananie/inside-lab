import { Clock3 } from "lucide-react";

import { logicSessions } from "../data";

export default function LogicCurriculumSection() {
  return (
    <section className="home-section home-logic-curriculum" id="computational-logic" aria-labelledby="logic-curriculum-title">
      <div className="home-section-heading">
        <div>
          <div className="home-section-number">04 · JALUR COMPUTATIONAL LOGIC</div>
          <h2 id="logic-curriculum-title">Dari logika formal sampai keputusan yang bisa dibuktikan.</h2>
        </div>
        <p>Enam sesi yang menghubungkan cara membaca simbol, membangun argumen, dan menguji keputusan sistem.</p>
      </div>
      <div className="home-logic-session-list">
        {logicSessions.map((session) => (
          <a className="home-logic-session" href={session.href} key={session.session}>
            <div className="home-logic-session-number">0{session.session}</div>
            <div><h3>{session.topic}</h3><p>{session.activity}</p></div>
            <span className="home-logic-session-status">
              {session.status === "ready" ? "Buka sesi" : <><Clock3 size={13} /> Segera hadir</>}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
