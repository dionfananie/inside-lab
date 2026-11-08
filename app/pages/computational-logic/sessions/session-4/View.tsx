import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";

import CodeBlock from "../session-1/components/CodeBlock";
import SessionNavigation from "../session-1/components/SessionNavigation";
import TruthTable from "../../components/TruthTable";
import "../session-1/session-1.css";
import {
  commonMistakes,
  consequenceProofTable,
  equivalenceConsequenceTable,
  equivalenceProofTable,
  knowledgeCheckGroups,
  logicalLaws,
  notEquivalentTable,
  sessionFourObjectives,
  sessionFourSections,
  validitySoundnessTable,
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

export default function SessionFourView() {
  return (
    <main className="session-one-page">
      <header className="computational-header">
        <a className="computational-back-link" href="/computational-logic">
          <ArrowLeft size={15} /> Computational Logic
        </a>
        <span className="computational-session-progress">SESI 04 / 06</span>
      </header>

      <section className="session-one-hero" aria-labelledby="session-four-title">
        <div className="computational-section-label">SESI 04 · LOGICAL EQUIVALENCE, LOGICAL CONSEQUENCE & VALIDITY</div>
        <h1 id="session-four-title">Ekuivalensi Logis & Validitas</h1>
        <p>
          Pelajari cara membuktikan kesetaraan formula, menguji apakah kesimpulan
          mengikuti premis, serta membedakan argumen yang valid dan yang sound.
        </p>
        <div className="session-one-hero-meta">
          <span><BookOpen size={14} /> 9 tujuan belajar</span>
          <span><Lightbulb size={14} /> 11 hukum ekuivalensi</span>
          <span><CheckCircle2 size={14} /> 10 soal knowledge check</span>
        </div>
      </section>

      <div className="session-one-layout">
        <article className="session-one-main">
          <section className="session-one-section" aria-labelledby="tujuan">
            <SectionHeading number="01" title="Tujuan belajar" id="tujuan" />
            <ol className="session-one-objectives">
              {sessionFourObjectives.map((objective) => (
                <li key={objective}><ArrowRight size={16} />{objective}</li>
              ))}
            </ol>
          </section>

          <section className="session-one-section" aria-labelledby="review">
            <SectionHeading number="02" title="Review sesi 3" id="review" />
            <p>
              Pada sesi 3 kita memakai truth table untuk mengevaluasi formula.
              Sekarang kita gunakan kemampuan itu untuk menjawab pertanyaan yang
              lebih dalam: apakah dua formula memiliki makna yang sama?
            </p>
            <div className="session-one-callout">
              <strong>Pertanyaan</strong>
              <p>
                Apakah <code>P → Q</code> dan <code>¬P ∨ Q</code> memiliki makna
                logis yang sama? Bagaimana membuktikannya?
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="logical-equivalence">
            <SectionHeading number="03" title="Logical equivalence" id="logical-equivalence" />
            <p>
              <strong>Logical Equivalence</strong> adalah hubungan dua formula yang
              selalu menghasilkan nilai kebenaran yang sama untuk seluruh
              interpretasi. Simbolnya <code>≡</code>.
            </p>
            <div className="session-one-example">
              <p><code>P → Q ≡ ¬P ∨ Q</code></p>
            </div>
            <p>
              Logical equivalence memungkinkan kita mengubah formula tanpa
              mengubah maknanya, berguna untuk menyederhanakan formula dan
              transformasi untuk SAT Solver.
            </p>
            <CodeBlock>{`const resultA = !p || q;
const resultB = !(p && !q);`}</CodeBlock>
          </section>

          <section className="session-one-section" aria-labelledby="pembuktian">
            <SectionHeading number="04" title="Membuktikan equivalence dengan truth table" id="pembuktian" />
            <p>Buktikan <code>P → Q ≡ ¬P ∨ Q</code> dengan membandingkan truth table.</p>
            <TruthTable caption="Pembuktian P → Q ≡ ¬P ∨ Q" headers={equivalenceProofTable.headers} rows={equivalenceProofTable.rows} description="Kolom P → Q dan ¬P ∨ Q selalu sama, sehingga kedua formula ekuivalen." />
            <p>Kolom <code>P → Q</code> dan <code>¬P ∨ Q</code> selalu sama, sehingga terbukti ekuivalen.</p>
            <h3>Jika hasilnya berbeda</h3>
            <TruthTable caption="P ∧ Q vs P ∨ Q" headers={notEquivalentTable.headers} rows={notEquivalentTable.rows} description="Ada baris yang hasilnya berbeda, sehingga kedua formula tidak ekuivalen." />
            <p>
              <code>P ∧ Q</code> dan <code>P ∨ Q</code> tidak ekuivalen karena ada
              baris yang berbeda.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="logical-laws">
            <SectionHeading number="05" title="Logical laws" id="logical-laws" />
            <p>Hukum-hukum berikut digunakan untuk transformasi formula tanpa mengubah nilai kebenarannya.</p>
            <DataTable caption="Ringkasan logical laws" headers={["Nama hukum", "Formula"]} rows={logicalLaws} />
            <h3>De Morgan's Laws</h3>
            <div className="session-one-example">
              <p><code>¬(P ∧ Q) ≡ ¬P ∨ ¬Q</code></p>
              <p><code>¬(P ∨ Q) ≡ ¬P ∧ ¬Q</code></p>
            </div>
            <h3>Implication Law</h3>
            <p><code>P → Q ≡ ¬P ∨ Q</code> adalah salah satu hukum terpenting.</p>
          </section>

          <section className="session-one-section" aria-labelledby="logical-consequence">
            <SectionHeading number="06" title="Logical consequence (entailment)" id="logical-consequence" />
            <p>
              <strong>Logical Consequence</strong> terjadi ketika kesimpulan harus
              bernilai TRUE setiap kali seluruh premis bernilai TRUE. Simbolnya{" "}
              <code>⊨</code>.
            </p>
            <div className="session-one-example">
              <p><code>{`{P → Q, P} ⊨ Q`}</code></p>
            </div>
            <TruthTable caption="Pembuktian logical consequence" headers={consequenceProofTable.headers} rows={consequenceProofTable.rows} description="Hanya baris pertama yang membuat seluruh premis TRUE, dan pada baris itu Q juga TRUE." />
            <p>
              Hanya baris pertama yang membuat seluruh premis TRUE, dan pada baris
              itu Q juga TRUE. Jadi tidak ada counterexample.
            </p>
            <div className="session-one-callout">
              <strong>Counterexample</strong>
              <p>
                Untuk <code>{`{P → Q, Q}`}</code> dengan kesimpulan <code>P</code>,
                assignment P = FALSE, Q = TRUE membuat kedua premis TRUE tetapi
                kesimpulan FALSE. Jadi <code>{`{P → Q, Q} ⊭ P`}</code>.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="perbedaan">
            <SectionHeading number="07" title="Equivalence vs consequence" id="perbedaan" />
            <DataTable caption="Perbedaan logical equivalence dan logical consequence" headers={["Aspek", "Logical equivalence", "Logical consequence"]} rows={equivalenceConsequenceTable} />
            <p>
              Dua formula P dan Q ekuivalen jika <code>P ⊨ Q</code> dan{" "}
              <code>Q ⊨ P</code>. Singkatnya, ekuivalen berarti kedua formula
              saling mengakibatkan satu sama lain.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="validity">
            <SectionHeading number="08" title="Validity" id="validity" />
            <p>
              <strong>Validity</strong> adalah sifat argumen ketika tidak mungkin
              seluruh premis TRUE sementara kesimpulan FALSE. Validity hanya
              membahas hubungan logis, bukan kebenaran faktual premis.
            </p>
            <h3>Argumen valid</h3>
            <CodeBlock>{`P → Q
P
∴ Q`}</CodeBlock>
            <h3>Argumen tidak valid</h3>
            <CodeBlock>{`P → Q
Q
∴ P`}</CodeBlock>
            <p>Ini adalah affirming the consequent, pola yang tidak valid.</p>

            <h3>Dua pola yang perlu diwaspadai</h3>

            <h4>A. Affirming the Consequent</h4>
            <p>
              Bentuk: <code>P → Q, Q ∴ P</code>.
            </p>
            <p>
              Pola ini menyimpulkan P hanya karena Q benar. Padahal Q bisa
              menjadi benar karena sebab lain, bukan hanya karena P. Jadi Q yang
              benar tidak cukup membuktikan bahwa P benar.
            </p>
            <div className="session-one-example">
              <p>Jika hujan, maka jalanan basah.</p>
              <p>Jalanan basah.</p>
              <p>Maka, hujan.</p>
            </div>
            <p>
              Jalanan bisa basah karena disiram atau sebab lain, bukan karena
              hujan. <strong>Counterexample:</strong> P = FALSE dan Q = TRUE
              membuat kedua premis TRUE, tetapi kesimpulan P = FALSE.
            </p>

            <h4>B. Denying the Antecedent</h4>
            <p>
              Bentuk: <code>P → Q, ¬P ∴ ¬Q</code>.
            </p>
            <p>
              Pola ini menyimpulkan ¬Q karena P tidak terjadi. Padahal Q tetap
              bisa terjadi akibat sebab lain, meskipun P tidak terjadi. Jadi
              P yang salah tidak cukup membuktikan bahwa Q juga salah.
            </p>
            <div className="session-one-example">
              <p>Jika hujan, maka jalanan basah.</p>
              <p>Tidak hujan.</p>
              <p>Maka, jalanan tidak basah.</p>
            </div>
            <p>
              Jalanan tetap bisa basah meskipun tidak hujan. Kedua pola ini tidak
              valid dalam logika klasik karena tidak menjamin kesimpulan
              benar-benar mengikuti premis.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="soundness">
            <SectionHeading number="09" title="Soundness" id="soundness" />
            <p>
              <strong>Soundness</strong> berarti argumen valid dan seluruh
              premisnya benar secara faktual.
            </p>
            <div className="session-one-example">
              <p><code>Sound = Valid + True Premises</code></p>
            </div>
            <DataTable caption="Perbandingan validity dan soundness" headers={["Aspek", "Validity", "Soundness"]} rows={validitySoundnessTable} />
            <p>
              Contoh valid tetapi tidak sound: semua kucing dapat terbang; Miko
              kucing; maka Miko dapat terbang. Struktur valid, tetapi premisnya salah.
            </p>
            <p>
              Dalam AI, hasil reasoning yang valid tetap bisa salah secara faktual
              jika fakta atau aturan awalnya salah.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="penerapan">
            <SectionHeading number="10" title="Penerapan di komputer" id="penerapan" />
            <h3>Boolean expression optimization</h3>
            <CodeBlock>{`const resultA = !(p && q);
const resultB = !p || !q;`}</CodeBlock>
            <p>Keduanya ekuivalen sesuai De Morgan's Law.</p>
            <h3>Software verification</h3>
            <CodeBlock>{`function canAccessA(isLoggedIn, hasPermission) {
  return isLoggedIn && hasPermission;
}

function canAccessB(isLoggedIn, hasPermission) {
  return !(!isLoggedIn || !hasPermission);
}`}</CodeBlock>
            <p>
              Logical equivalence juga digunakan pada SAT Solver, rule-based
              expert system, dan pemeriksaan kondisi di kode.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="kesalahan">
            <SectionHeading number="11" title="Kesalahan umum" id="kesalahan" />
            <div className="session-one-card-grid session-one-card-grid-2">
              {commonMistakes.map((mistake, index) => (
                <article key={mistake.title}>
                  <span>KESALAHAN {index + 1}</span>
                  <h4>{mistake.title}</h4>
                  <p>{mistake.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="kesimpulan">
            <SectionHeading number="12" title="Kesimpulan sesi 4" id="kesimpulan" />
            <p>
              Logical equivalence membandingkan dua formula, sedangkan logical
              consequence menguji hubungan premis dan kesimpulan. Validity
              memastikan kesimpulan mengikuti premis, dan soundness menambahkan
              syarat kebenaran premis.
            </p>
            <p>
              Konsep ini menjadi fondasi untuk membuktikan argumen dan
              menghubungkan logika formal dengan verifikasi perangkat lunak.
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
              <a className="computational-button computational-button-primary" href="/computational-logic/session/4/check">
                Lanjut ke knowledge check <ArrowRight size={15} />
              </a>
            </div>
          </section>
        </article>

        <aside className="session-one-toc" aria-label="Daftar isi sesi">
          <SessionNavigation sections={sessionFourSections} storageKey="inside-lab:computational-logic:session-4:read-sections:v1" />
          <div className="session-one-toc-note">
            <strong>Setelah sesi ini</strong>
            <p>Lanjut ke Rules of Inference & Logical Reasoning.</p>
            <a href="/computational-logic/session/5">Sesi berikutnya <ArrowRight size={14} /></a>
          </div>
        </aside>
      </div>

      <nav className="computational-session-navigation" aria-label="Navigasi sesi">
        <a href="/computational-logic/session/3"><ArrowLeft size={15} /> Sesi sebelumnya</a>
        <a href="/computational-logic/session/5">Sesi berikutnya <ArrowRight size={15} /></a>
      </nav>
    </main>
  );
}
