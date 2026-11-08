import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";

import CodeBlock from "../session-1/components/CodeBlock";
import SessionNavigation from "../session-1/components/SessionNavigation";
import TruthTable from "../../components/TruthTable";
import "../session-1/session-1.css";
import {
  atomicCompoundTable,
  connectives,
  knowledgeCheckGroups,
  nonPropositionExamples,
  programOperators,
  propositionExamples,
  sessionTwoObjectives,
  sessionTwoSections,
  summaryConnectives,
  translationExamples,
  xorTable,
} from "./data";

function SectionHeading({ number, title, id }: { number: string; title: string; id: string }) {
  return (
    <div className="session-one-heading">
      <span>{number}</span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function HighlightedMeaning({ meaning }: { meaning: string }) {
  const terms = ["antecedent", "consequent"];
  const regex = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = meaning.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        terms.some((term) => term.toLowerCase() === part.toLowerCase()) ? (
          <mark key={index}>{part}</mark>
        ) : (
          part
        ),
      )}
    </>
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

export default function SessionTwoView() {
  return (
    <main className="session-one-page">
      <header className="computational-header">
        <a className="computational-back-link" href="/computational-logic">
          <ArrowLeft size={15} /> Computational Logic
        </a>
        <span className="computational-session-progress">SESI 02 / 06</span>
      </header>

      <section className="session-one-hero" aria-labelledby="session-two-title">
        <div className="computational-section-label">SESI 02 · PROPOSITIONAL LOGIC & LOGICAL SYMBOLS</div>
        <h1 id="session-two-title">Logika Proposisional & Simbol Logika</h1>
        <p>
          Pelajari bagaimana komputer merepresentasikan pernyataan sebagai
          proposisi, lalu menggabungkannya dengan operator logika untuk membentuk
          formula yang dapat dievaluasi menjadi TRUE atau FALSE.
        </p>
        <div className="session-one-hero-meta">
          <span><BookOpen size={14} /> 9 tujuan belajar</span>
          <span><Lightbulb size={14} /> 6 operator logika</span>
          <span><CheckCircle2 size={14} /> 10 soal knowledge check</span>
        </div>
      </section>

      <div className="session-one-layout">
        <article className="session-one-main">
          <section className="session-one-section" aria-labelledby="tujuan">
            <SectionHeading number="01" title="Tujuan belajar" id="tujuan" />
            <p>Setelah menyelesaikan sesi ini, mahasiswa diharapkan mampu:</p>
            <ol className="session-one-objectives">
              {sessionTwoObjectives.map((objective) => (
                <li key={objective}><ArrowRight size={16} />{objective}</li>
              ))}
            </ol>
          </section>

          <section className="session-one-section" aria-labelledby="review">
            <SectionHeading number="02" title="Review sesi sebelumnya" id="review" />
            <p>Pada Sesi 1 kita mempelajari tiga komponen logika formal:</p>
            <ol className="session-one-list session-one-list-numbered">
              <li><strong>Syntax:</strong> aturan pembentukan formula.</li>
              <li><strong>Semantics:</strong> aturan interpretasi dan penentuan nilai kebenaran.</li>
              <li><strong>Inference Rules:</strong> aturan untuk menghasilkan kesimpulan berdasarkan premis.</li>
            </ol>
            <p>
              Komputer membutuhkan representasi yang terstruktur agar dapat
              melakukan evaluasi dan reasoning. Pada sesi ini kita mempelajari
              bentuk representasi paling dasar: <strong>Propositional Logic</strong>.
            </p>
            <div className="session-one-callout">
              <strong>Pertanyaan pengantar</strong>
              <p>
                Bagaimana komputer dapat memproses kalimat seperti “Hari ini
                hujan dan jalanan basah” menggunakan simbol dan nilai TRUE atau
                FALSE?
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="apa-itu-propositional-logic">
            <SectionHeading number="03" title="Apa itu propositional logic?" id="apa-itu-propositional-logic" />
            <p>
              <strong>Propositional Logic</strong> atau Logika Proposisional adalah
              cabang logika formal yang mempelajari hubungan antara proposisi
              menggunakan operator logika.
            </p>
            <p>
              <strong>Proposisi</strong> adalah pernyataan deklaratif yang memiliki
              tepat satu nilai kebenaran: TRUE atau FALSE. Setiap proposisi
              direpresentasikan dengan simbol seperti P, Q, R.
            </p>
            <div className="session-one-example">
              <p><code>P</code> = Hari ini hujan. · <code>Q</code> = Jalanan basah. · <code>R</code> = Saya membawa payung.</p>
            </div>

            <h3>Contoh proposisi</h3>
            <DataTable caption="Contoh proposisi" headers={["Kalimat", "Proposisi?", "Alasan"]} rows={propositionExamples} />

            <h3>Contoh bukan proposisi</h3>
            <DataTable caption="Contoh bukan proposisi" headers={["Kalimat", "Proposisi?", "Alasan"]} rows={nonPropositionExamples} />

            <div className="session-one-callout">
              <strong>Catatan</strong>
              <p>
                Pernyataan dengan variabel bebas seperti <code>x + 2 = 5</code>{" "}
                belum merupakan proposisi karena nilai kebenarannya bergantung
                pada nilai x. Jika diberikan x = 3, pernyataan menjadi proposisi
                bernilai TRUE.
              </p>
            </div>

            <h3>Mengapa proposisi penting?</h3>
            <CodeBlock>{`const isRaining = true;
const isRoadWet = false;`}</CodeBlock>
            <p>
              Komputer membutuhkan representasi yang dapat dievaluasi secara
              konsisten. Proposisi menyediakan nilai TRUE/FALSE yang menjadi
              dasar operasi logika.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="atomic-compound">
            <SectionHeading number="04" title="Atomic & compound proposition" id="atomic-compound" />
            <h3>Atomic proposition</h3>
            <p>
              Proposisi sederhana yang tidak dibangun dari proposisi lain
              menggunakan operator logika, misalnya <code>P</code>, <code>Q</code>,
              dan <code>R</code>.
            </p>
            <h3>Compound proposition</h3>
            <p>
              Proposisi yang dibentuk dengan menggabungkan proposisi menggunakan
              logical connectives, misalnya <code>P ∧ Q</code>, <code>P ∨ Q</code>,
              <code>¬P</code>, dan <code>(P ∧ Q) → R</code>.
            </p>
            <h3>Perbandingan</h3>
            <DataTable caption="Perbandingan atomic dan compound proposition" headers={["Atomic proposition", "Compound proposition"]} rows={atomicCompoundTable} />
            <p>
              Proposisi atomik merupakan blok dasar untuk membangun formula yang
              lebih kompleks.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="logical-connectives">
            <SectionHeading number="05" title="Logical symbols dan logical connectives" id="logical-connectives" />
            <p>
              Logical connectives adalah operator yang digunakan untuk
              menggabungkan atau memodifikasi proposisi.
            </p>

            {connectives.map((connective) => (
              <div className="session-one-connective" key={connective.id}>
                <h3>{connective.name}</h3>
                <p><code>{connective.symbol}</code> — <HighlightedMeaning meaning={connective.meaning} /></p>
                <TruthTable caption={`Truth table ${connective.name}`} headers={connective.truthTable.headers} rows={connective.truthTable.rows} />
                {connective.code && <CodeBlock>{connective.code}</CodeBlock>}
                {connective.note && <p>{connective.note}</p>}
              </div>
            ))}

            <h3>Inclusive OR vs Exclusive OR</h3>
            <p>
              OR klasik bersifat inclusive. XOR (<code>P ⊕ Q</code>) bernilai TRUE
              hanya jika tepat satu proposisi bernilai TRUE.
            </p>
            <TruthTable caption="Perbandingan OR dan XOR" headers={xorTable.headers} rows={xorTable.rows} description="XOR bernilai TRUE hanya jika tepat satu proposisi bernilai TRUE." />
            <div className="session-one-callout">
              <strong>Contoh</strong>
              <p>
                “Untuk mengikuti ujian, mahasiswa boleh memilih tepat satu dari
                dua jadwal.” Jika memilih pagi dan sore sekaligus tidak
                diperbolehkan, kondisi ini lebih sesuai dengan XOR.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="ringkasan-connectives">
            <SectionHeading number="06" title="Ringkasan logical connectives" id="ringkasan-connectives" />
            <DataTable caption="Ringkasan logical connectives" headers={["Simbol", "Nama", "Makna", "TRUE ketika"]} rows={summaryConnectives} />
          </section>

          <section className="session-one-section" aria-labelledby="terjemahan">
            <SectionHeading number="07" title="Mengubah bahasa alami menjadi simbol logika" id="terjemahan" />
            <p>
              Proses ini disebut logical translation atau symbolic representation.
            </p>
            {translationExamples.map((example) => (
              <div className="session-one-translation" key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.statement}</p>
                <CodeBlock>{example.mapping.join("\n")}</CodeBlock>
                <p>Representasi: <code>{example.formula}</code></p>
                {example.note && <p>{example.note}</p>}
              </div>
            ))}
          </section>

          <section className="session-one-section" aria-labelledby="parentheses">
            <SectionHeading number="08" title="Mengapa tanda kurung penting?" id="parentheses" />
            <p>
              Tanda kurung menentukan struktur formula dan menghindari ambiguitas.
              <code> (P ∧ Q) ∨ R</code> berbeda struktur dengan{" "}
              <code>P ∧ (Q ∨ R)</code> dan <code>(P ∨ Q) ∧ R</code>.
            </p>
            <div className="session-one-example">
              <p>P = TRUE, Q = FALSE, R = FALSE</p>
              <p><code>P ∨ (Q ∧ R)</code> = TRUE</p>
              <p><code>(P ∨ Q) ∧ R</code> = FALSE</p>
            </div>
            <p>
              Mahasiswa sebaiknya fokus pada struktur pohon dan urutan evaluasi,
              bukan menebak struktur dari satu assignment.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="operator-program">
            <SectionHeading number="09" title="Operator logika dalam bahasa pemrograman" id="operator-program" />
            <DataTable caption="Operator logika di JavaScript dan Go" headers={["Logika formal", "JavaScript", "Go"]} rows={programOperators} />
            <CodeBlock>{`const isLoggedIn = true;
const hasPermission = true;
const isBlocked = false;

const canAccess =
  isLoggedIn && hasPermission && !isBlocked;

console.log(canAccess); // true`}</CodeBlock>
            <p>
              Formula yang setara: <code>P ∧ Q ∧ ¬R</code>, dengan P = login,
              Q = permission, R = diblokir. Hasilnya TRUE karena ketiganya TRUE.
            </p>
            <div className="session-one-callout">
              <strong>Catatan</strong>
              <p>
                Dalam pemrograman, operator boolean dapat memiliki short-circuit
                evaluation. Ini adalah mekanisme evaluasi bahasa pemrograman dan
                perlu dibedakan dari semantik operator dalam logika klasik.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="case-study">
            <SectionHeading number="10" title="Mini case study: sistem akses pengguna" id="case-study" />
            <p>
              Aturan: “Pengguna dapat mengakses dashboard jika sudah login,
              memiliki permission, dan tidak diblokir.”
            </p>
            <CodeBlock>{`P = Pengguna sudah login.
Q = Pengguna memiliki permission.
R = Pengguna diblokir.
S = Pengguna dapat mengakses dashboard.

Formula: (P ∧ Q ∧ ¬R) → S`}</CodeBlock>
            <div className="session-one-activity">
              <span>AKTIVITAS AKTIF</span>
              <h3>Diskusikan</h3>
              <p>
                Bagaimana jika pengguna sudah login tetapi tidak memiliki
                permission dan tidak diblokir? Bagaimana jika sudah login,
                memiliki permission, tetapi diblokir? Bagaimana operator AND dan
                NOT memengaruhi keputusan sistem?
              </p>
            </div>
            <p>
              Formula implikasi adalah representasi aturan. Formula ini tidak
              otomatis menentukan nilai S jika antecedent tidak terpenuhi. Sistem
              nyata biasanya memakai kebijakan tambahan seperti default deny.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="kesimpulan">
            <SectionHeading number="11" title="Kesimpulan sesi 2" id="kesimpulan" />
            <p>
              Propositional Logic menggunakan proposisi dan operator logika untuk
              membentuk formula. Proposisi memiliki nilai TRUE atau FALSE, dan
              dapat berupa atomic atau compound.
            </p>
            <ol className="session-one-list session-one-list-numbered">
              <li><strong>Negation (¬):</strong> membalik nilai kebenaran.</li>
              <li><strong>Conjunction (∧):</strong> TRUE jika semua proposisi TRUE.</li>
              <li><strong>Disjunction (∨):</strong> TRUE jika minimal satu proposisi TRUE.</li>
              <li><strong>Implication (→):</strong> FALSE hanya saat antecedent TRUE dan consequent FALSE.</li>
              <li><strong>Biconditional (↔):</strong> TRUE saat kedua nilai sama.</li>
            </ol>
            <p>
              Simbol-simbol ini diterjemahkan menjadi operator boolean dalam
              bahasa pemrograman, menjadi fondasi evaluasi kondisi dan aturan.
            </p>
          </section>

          <section className="session-one-section session-one-knowledge" aria-labelledby="knowledge-check">
            <SectionHeading number="12" title="Knowledge check" id="knowledge-check" />
            <p>
              Uji pemahamanmu dengan {knowledgeCheckGroups.reduce((total, group) => total + group.questions.length, 0)} soal
              micro-quiz dari materi sesi ini.
            </p>
            <div className="session-one-check-cta">
              <h3>Siap menguji pemahamanmu?</h3>
              <p>
                Kerjakan soal berdasarkan pemahaman sendiri, lalu lihat hasil
                penilaian kelengkapan konsep.
              </p>
              <a className="computational-button computational-button-primary" href="/computational-logic/session/2/check">
                Lanjut ke knowledge check <ArrowRight size={15} />
              </a>
            </div>
          </section>
        </article>

        <aside className="session-one-toc" aria-label="Daftar isi sesi">
          <SessionNavigation sections={sessionTwoSections} storageKey="inside-lab:computational-logic:session-2:read-sections:v1" />
          <div className="session-one-toc-note">
            <strong>Setelah sesi ini</strong>
            <p>Lanjut ke Truth Tables, Logical Evaluation & Well-Formed Formula.</p>
            <a href="/computational-logic/session/3">Sesi berikutnya <ArrowRight size={14} /></a>
          </div>
        </aside>
      </div>

      <nav className="computational-session-navigation" aria-label="Navigasi sesi">
        <a href="/computational-logic/session/1"><ArrowLeft size={15} /> Sesi sebelumnya</a>
        <a href="/computational-logic/session/3">Sesi berikutnya <ArrowRight size={15} /></a>
      </nav>
    </main>
  );
}
