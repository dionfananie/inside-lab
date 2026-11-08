import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";

import CodeBlock from "../session-1/components/CodeBlock";
import SessionNavigation from "../session-1/components/SessionNavigation";
import "../session-1/session-1.css";
import {
  chainingComparisonTable,
  consequenceVsRulesTable,
  inferenceRules,
  knowledgeCheckGroups,
  misconceptionList,
  sessionFiveObjectives,
  sessionFiveSections,
} from "./data";

function SectionHeading({ number, title, id }: { number: string; title: string; id: string }) {
  return (
    <div className="session-one-heading">
      <span>{number}</span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function DataTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) {
  return (
    <div className="session-one-table-wrap">
      <table className="session-one-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={`${cell}-${cellIndex}`}>{cell}</td>,
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SessionFiveView() {
  return (
    <main className="session-one-page">
      <header className="computational-header">
        <a className="computational-back-link" href="/computational-logic">
          <ArrowLeft size={15} /> Computational Logic
        </a>
        <span className="computational-session-progress">SESI 05 / 06</span>
      </header>

      <section className="session-one-hero" aria-labelledby="session-five-title">
        <div className="computational-section-label">SESI 05 · LOGICAL CONSEQUENCE & INFERENCE RULES</div>
        <h1 id="session-five-title">Logical Consequence & Inference Rules</h1>
        <p>
          Pelajari bagaimana sistem komputer menarik kesimpulan baru dari fakta
          dan aturan menggunakan prinsip logika formal, tanpa harus diberi tahu
          kesimpulannya secara eksplisit.
        </p>
        <div className="session-one-hero-meta">
          <span><BookOpen size={14} /> 6 tujuan belajar</span>
          <span><Lightbulb size={14} /> 4 inference rules</span>
          <span><CheckCircle2 size={14} /> 10 soal knowledge check</span>
        </div>
      </section>

      <div className="session-one-layout">
        <article className="session-one-main">
          <section className="session-one-section" aria-labelledby="tujuan">
            <SectionHeading number="01" title="Tujuan belajar" id="tujuan" />
            <ol className="session-one-objectives">
              {sessionFiveObjectives.map((objective) => (
                <li key={objective}><ArrowRight size={16} />{objective}</li>
              ))}
            </ol>
          </section>

          <section className="session-one-section" aria-labelledby="review">
            <SectionHeading number="02" title="Review: apa itu logical consequence?" id="review" />
            <p>
              Logical consequence adalah hubungan antara sekumpulan premis dan
              sebuah kesimpulan: <code>KB ⊨ Q</code>, artinya jika seluruh premis
              di Knowledge Base benar, maka Q harus benar.
            </p>
            <div className="session-one-example">
              <p>P = Hari hujan. · Q = Jalan basah. · Aturan: P → Q. · Fakta: P. · Kesimpulan: Q.</p>
            </div>
            <div className="session-one-callout">
              <strong>Pertanyaan penting</strong>
              <p>
                Bagaimana komputer mengetahui bahwa Q dapat disimpulkan dari P
                dan P → Q? Di sinilah Inference Rules dibutuhkan.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="inference-rules">
            <SectionHeading number="03" title="Inference rules" id="inference-rules" />
            <p>
              Inference rules adalah aturan formal untuk menurunkan kesimpulan
              dari satu atau lebih premis.
            </p>
            {inferenceRules.map((rule) => (
              <div className="session-one-connective" key={rule.name}>
                <h3>{rule.name}</h3>
                <p>Bentuk: <code>{rule.form}</code></p>
                <CodeBlock>{rule.example.join("\n")}</CodeBlock>
              </div>
            ))}
            <h3>Ringkasan</h3>
            <DataTable caption="Ringkasan inference rules" headers={["Inference rule", "Bentuk formal"]} rows={inferenceRules.map((rule) => [rule.name, rule.form])} />
          </section>

          <section className="session-one-section" aria-labelledby="consequence-vs-rules">
            <SectionHeading number="04" title="Logical consequence vs inference rules" id="consequence-vs-rules" />
            <p>
              Logical consequence menyatakan bahwa kesimpulan mengikuti premis,
              sedangkan inference rules menyediakan cara formal untuk menurunkannya.
            </p>
            <DataTable caption="Perbedaan logical consequence dan inference rules" headers={["Logical consequence", "Inference rules"]} rows={consequenceVsRulesTable} />
          </section>

          <section className="session-one-section" aria-labelledby="automated-reasoning">
            <SectionHeading number="05" title="Automated reasoning" id="automated-reasoning" />
            <p>
              Automated reasoning adalah proses ketika komputer menalar secara
              otomatis dari fakta dan aturan yang direpresentasikan secara formal.
            </p>
            <CodeBlock>{`Fakta:
  Registered(Teddy)
  NoFine(Teddy)

Aturan:
  Registered(x) AND NoFine(x)
  -> EligibleToBorrow(x)

Kesimpulan:
  EligibleToBorrow(Teddy)`}</CodeBlock>
            <h3>Knowledge Base</h3>
            <CodeBlock>{`Facts:
- registered(teddy)
- no_fine(teddy)

Rules:
- registered(X) AND no_fine(X)
  -> eligible_to_borrow(X)`}</CodeBlock>
          </section>

          <section className="session-one-section" aria-labelledby="inference-engine">
            <SectionHeading number="06" title="Inference engine sederhana (JavaScript)" id="inference-engine" />
            <CodeBlock>{`const facts = { registered: true, noFine: true };

const rules = [
  {
    conditions: ["registered", "noFine"],
    conclusion: "eligibleToBorrow",
  },
];`}</CodeBlock>
            <CodeBlock>{`function infer(facts, rules) {
  const conclusions = [];

  for (const rule of rules) {
    const satisfied = rule.conditions.every(
      (condition) => facts[condition] === true
    );
    if (satisfied) conclusions.push(rule.conclusion);
  }

  return conclusions;
}

infer(facts, rules); // ["eligibleToBorrow"]`}</CodeBlock>
            <p>
              Sistem membaca aturan, memeriksa seluruh kondisi, lalu menurunkan
              kesimpulan jika kondisi terpenuhi. Kesimpulan tidak diberikan
              secara eksplisit — inilah salah satu bentuk automated reasoning.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="chaining">
            <SectionHeading number="07" title="Forward & backward chaining" id="chaining" />
            <p>
              Forward chaining berangkat dari fakta untuk mencari semua kesimpulan.
              Backward chaining berangkat dari tujuan dan mencari buktinya.
            </p>
            <DataTable caption="Perbandingan forward dan backward chaining" headers={["Forward chaining", "Backward chaining"]} rows={chainingComparisonTable} />
            <div className="session-one-example">
              <p>Forward: P → Q → R (dari fakta). Backward: buktikan tujuan R dengan mencari P dan Q.</p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="prolog">
            <SectionHeading number="08" title="Hubungan dengan Prolog" id="prolog" />
            <p>Prolog adalah bahasa logic programming yang memakai fakta, aturan, dan query.</p>
            <CodeBlock>{`registered(teddy).
no_fine(teddy).

eligible_to_borrow(X) :-
    registered(X),
    no_fine(X).`}</CodeBlock>
            <CodeBlock>{`?- eligible_to_borrow(teddy).
% true.`}</CodeBlock>
          </section>

          <section className="session-one-section" aria-labelledby="software-engineering">
            <SectionHeading number="09" title="Logical reasoning dalam software engineering" id="software-engineering" />
            <h3>Access control</h3>
            <p><code>AdminRole(x) ∧ Authenticated(x) → CanAccessDashboard(x)</code></p>
            <h3>Business rules</h3>
            <p><code>Paid(order) ∧ StockAvailable(order) → CanProcessOrder(order)</code></p>
            <h3>Program verification</h3>
            <CodeBlock>{`function withdraw(balance, amount) {
  if (amount <= balance) return balance - amount;
  return balance;
}`}</CodeBlock>
            <p>Dengan asumsi saldo awal tidak negatif, aturan `amount ≤ balance` menjamin saldo tetap tidak negatif.</p>
          </section>

          <section className="session-one-section" aria-labelledby="kesalahpahaman">
            <SectionHeading number="10" title="Kesalahpahaman yang perlu dihindari" id="kesalahpahaman" />
            <div className="session-one-card-grid session-one-card-grid-2">
              {misconceptionList.map((item, index) => (
                <article key={item.title}>
                  <span>CATATAN {index + 1}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="aktivitas">
            <SectionHeading number="11" title="Aktivitas: rule-based expert system" id="aktivitas" />
            <p>
              Studi kasus kelayakan peminjaman buku: pengguna boleh meminjam jika
              terdaftar, tidak punya denda, dan tidak diblokir.
            </p>
            <CodeBlock>{`P = Terdaftar. Q = Tidak ada denda.
R = Tidak diblokir. S = Boleh meminjam.

Aturan: (P ∧ Q ∧ R) → S`}</CodeBlock>
            <DataTable caption="Skenario pengujian kelayakan peminjaman" headers={["Skenario", "P", "Q", "R", "Hasil"]} rows={[
              ["A", "True", "True", "True", "Boleh meminjam"],
              ["B", "True", "False", "True", "Tidak boleh"],
              ["C", "True", "True", "False", "Tidak boleh"],
              ["D", "False", "True", "True", "Tidak boleh"],
            ]} />
          </section>

          <section className="session-one-section" aria-labelledby="kesimpulan">
            <SectionHeading number="12" title="Kesimpulan sesi 5" id="kesimpulan" />
            <p>
              Komputer dapat menghasilkan kesimpulan baru bukan karena memiliki
              pemahaman seperti manusia, tetapi karena pengetahuan direpresentasikan
              dalam bentuk yang dapat diproses dan aturan penalaran diterapkan
              secara sistematis.
            </p>
          </section>

          <section className="session-one-section session-one-knowledge" aria-labelledby="knowledge-check">
            <SectionHeading number="13" title="Knowledge check" id="knowledge-check" />
            <p>
              Uji pemahamanmu dengan {knowledgeCheckGroups.reduce((total, group) => total + group.questions.length, 0)} soal
              micro-quiz dari materi sesi ini.
            </p>
            <div className="session-one-check-cta">
              <h3>Siap menguji pemahamanmu?</h3>
              <p>Kerjakan soal berdasarkan pemahaman sendiri, lalu lihat penilaian kelengkapan konsep.</p>
              <a className="computational-button computational-button-primary" href="/computational-logic/session/5/check">
                Lanjut ke knowledge check <ArrowRight size={15} />
              </a>
            </div>
          </section>
        </article>

        <aside className="session-one-toc" aria-label="Daftar isi sesi">
          <SessionNavigation sections={sessionFiveSections} storageKey="inside-lab:computational-logic:session-5:read-sections:v1" />
          <div className="session-one-toc-note">
            <strong>Setelah sesi ini</strong>
            <p>Lanjut ke Predicate Logic & First-Order Logic.</p>
            <a href="/computational-logic/session/6">Sesi berikutnya <ArrowRight size={14} /></a>
          </div>
        </aside>
      </div>

      <nav className="computational-session-navigation" aria-label="Navigasi sesi">
        <a href="/computational-logic/session/4"><ArrowLeft size={15} /> Sesi sebelumnya</a>
        <a href="/computational-logic/session/6">Sesi berikutnya <ArrowRight size={15} /></a>
      </nav>
    </main>
  );
}
