import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";

import CodeBlock from "../session-1/components/CodeBlock";
import SessionNavigation from "../session-1/components/SessionNavigation";
import TruthTable from "../../components/TruthTable";
import "../session-1/session-1.css";
import {
  classificationTable,
  combinationTable,
  commonMistakes,
  complexTruthTable,
  connectiveTruthTables,
  knowledgeCheckGroups,
  notWffExamples,
  operatorReviewTable,
  precedenceTable,
  registrasiTruthTable,
  satisfiableTable,
  sessionThreeObjectives,
  sessionThreeSections,
  wffExamples,
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

export default function SessionThreeView() {
  return (
    <main className="session-one-page">
      <header className="computational-header">
        <a className="computational-back-link" href="/computational-logic">
          <ArrowLeft size={15} /> Computational Logic
        </a>
        <span className="computational-session-progress">SESI 03 / 06</span>
      </header>

      <section className="session-one-hero" aria-labelledby="session-three-title">
        <div className="computational-section-label">SESI 03 · TRUTH TABLES, LOGICAL EVALUATION & WELL-FORMED FORMULA</div>
        <h1 id="session-three-title">Truth Table & Evaluasi Logika</h1>
        <p>
          Pelajari cara mengevaluasi formula secara sistematis melalui seluruh
          kombinasi nilai kebenaran, mengenali formula yang valid secara
          sintaksis, dan mengklasifikasikan formula berdasarkan hasilnya.
        </p>
        <div className="session-one-hero-meta">
          <span><BookOpen size={14} /> 10 tujuan belajar</span>
          <span><Lightbulb size={14} /> 2ⁿ kombinasi</span>
          <span><CheckCircle2 size={14} /> 10 soal knowledge check</span>
        </div>
      </section>

      <div className="session-one-layout">
        <article className="session-one-main">
          <section className="session-one-section" aria-labelledby="tujuan">
            <SectionHeading number="01" title="Tujuan belajar" id="tujuan" />
            <ol className="session-one-objectives">
              {sessionThreeObjectives.map((objective) => (
                <li key={objective}><ArrowRight size={16} />{objective}</li>
              ))}
            </ol>
          </section>

          <section className="session-one-section" aria-labelledby="review">
            <SectionHeading number="02" title="Review sesi sebelumnya" id="review" />
            <p>Pada Sesi 2 kita mempelajari lima operator logika utama:</p>
            <DataTable caption="Lima operator logika utama" headers={["Simbol", "Nama", "Makna"]} rows={operatorReviewTable} />
            <div className="session-one-callout">
              <strong>Pertanyaan</strong>
              <p>
                Jika P dan Q memiliki nilai kebenaran yang berbeda-beda, bagaimana
                kita menentukan hasil formula? Bagaimana jika terdapat tiga
                proposisi? Jawabannya adalah Truth Table.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="apa-itu-truth-table">
            <SectionHeading number="03" title="Apa itu truth table?" id="apa-itu-truth-table" />
            <p>
              <strong>Truth Table</strong> adalah metode untuk menunjukkan seluruh
              kemungkinan kombinasi nilai kebenaran proposisi dan hasil evaluasi
              formula. Dengan truth table kita dapat memeriksa setiap kemungkinan
              secara terstruktur, tanpa menebak.
            </p>
            <h3>Mengapa penting?</h3>
            <p>Dengan formula <code>(P ∧ Q) → R</code>, truth table membantu menjawab:</p>
            <ul className="session-one-list">
              <li>Kapan formula bernilai TRUE?</li>
              <li>Kapan formula bernilai FALSE?</li>
              <li>Apakah formula selalu TRUE atau selalu FALSE?</li>
              <li>Apakah ada kombinasi yang membuat formula TRUE?</li>
            </ul>
          </section>

          <section className="session-one-section" aria-labelledby="kombinasi">
            <SectionHeading number="04" title="Cara menentukan jumlah kombinasi" id="kombinasi" />
            <p>
              Jika terdapat n proposisi atomik, jumlah kombinasi nilai kebenaran
              adalah <code>2ⁿ</code>.
            </p>
            <DataTable caption="Jumlah kombinasi berdasarkan jumlah proposisi" headers={["Jumlah proposisi", "Perhitungan", "Kombinasi"]} rows={combinationTable} />
            <p>
              Setiap proposisi memiliki dua nilai (TRUE/FALSE), sehingga kombinasi
              dikali dua untuk setiap proposisi tambahan.
            </p>
            <div className="session-one-example">
              <p>Tiga proposisi P, Q, R menghasilkan 8 kombinasi. Pola kolom: P berubah tiap 4 baris, Q tiap 2 baris, R tiap 1 baris.</p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="truth-table-connectives">
            <SectionHeading number="05" title="Truth table untuk logical connectives" id="truth-table-connectives" />
            {connectiveTruthTables.map((table) => (
              <div className="session-one-connective" key={table.name}>
                <h3>{table.name}</h3>
                <p><code>{table.symbol}</code></p>
                <TruthTable caption={`Truth table ${table.name}`} headers={table.headers} rows={table.rows} description={table.description} />
              </div>
            ))}
          </section>

          <section className="session-one-section" aria-labelledby="formula-kompleks">
            <SectionHeading number="06" title="Mengevaluasi formula kompleks" id="formula-kompleks" />
            <p>
              Formula kompleks seperti <code>(P ∧ Q) → R</code> dievaluasi dengan
              memecahnya menjadi bagian dalam kurung terlebih dahulu, lalu hasil
              implikasi.
            </p>
            <TruthTable caption="Truth table (P ∧ Q) → R" headers={complexTruthTable.headers} rows={complexTruthTable.rows} description={complexTruthTable.description} />
            <div className="session-one-example">
              <p>Baris kedua (P=T, Q=T, R=F): P ∧ Q = TRUE, lalu TRUE → FALSE = FALSE.</p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="precedence">
            <SectionHeading number="07" title="Operator precedence & parentheses" id="precedence" />
            <p>
              Operator precedence menentukan operator mana yang dievaluasi lebih
              dahulu ketika tidak ada tanda kurung yang cukup.
            </p>
            <DataTable caption="Urutan operator precedence" headers={["Prioritas", "Operator", "Simbol"]} rows={precedenceTable} />
            <p>
              Dengan precedence di atas, <code>P ∨ Q ∧ R</code> diinterpretasikan
              sebagai <code>P ∨ (Q ∧ R)</code>, bukan <code>(P ∨ Q) ∧ R</code>.
            </p>
            <CodeBlock>{`const resultA = p || (q && r);
const resultB = (p || q) && r;`}</CodeBlock>
            <p>
              Parentheses membantu memastikan maksud programmer direpresentasikan
              dengan benar.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="wff">
            <SectionHeading number="08" title="Well-formed formula (WFF)" id="wff" />
            <p>
              <strong>WFF</strong> adalah formula yang dibentuk sesuai aturan
              syntax. Aturan pembentukannya bersifat rekursif.
            </p>
            <ol className="session-one-list session-one-list-numbered">
              <li>Setiap proposisi atomik (P, Q, R) adalah WFF.</li>
              <li>Jika P adalah WFF, maka ¬P adalah WFF.</li>
              <li>Jika P dan Q adalah WFF, maka (P ∧ Q), (P ∨ Q), (P → Q), dan (P ↔ Q) adalah WFF.</li>
            </ol>
            <h3>Contoh WFF</h3>
            <CodeBlock>{wffExamples.join("\n")}</CodeBlock>
            <h3>Contoh bukan WFF</h3>
            <CodeBlock>{notWffExamples.join("\n")}</CodeBlock>
            <div className="session-one-callout">
              <strong>WFF tidak menentukan kebenaran</strong>
              <p>
                Formula yang syntax-nya valid belum tentu bernilai TRUE. WFF
                menjawab struktur, sedangkan truth table menjawab nilai kebenaran.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="klasifikasi">
            <SectionHeading number="09" title="Tautology, contradiction, dan contingency" id="klasifikasi" />
            <p>Truth table dapat mengklasifikasikan formula menjadi tiga kategori.</p>
            <h3>Tautology</h3>
            <p>Formula yang selalu bernilai TRUE, contoh <code>P ∨ ¬P</code>.</p>
            <h3>Contradiction</h3>
            <p>Formula yang selalu bernilai FALSE, contoh <code>P ∧ ¬P</code>.</p>
            <h3>Contingency</h3>
            <p>Formula yang kadang TRUE dan kadang FALSE, contoh <code>P ∧ Q</code>.</p>
            <DataTable caption="Perbandingan klasifikasi formula" headers={["Kategori", "Karakteristik", "Contoh"]} rows={classificationTable} />
            <p>
              Klasifikasi ini berguna untuk memeriksa konsistensi aturan,
              menemukan kondisi mustahil, dan menganalisis constraint SAT Solver.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="satisfiable">
            <SectionHeading number="10" title="Satisfiable & unsatisfiable" id="satisfiable" />
            <p>
              Formula <strong>satisfiable</strong> jika ada minimal satu
              interpretasi yang membuatnya TRUE. Formula{" "}
              <strong>unsatisfiable</strong> jika tidak ada assignment yang
              membuatnya TRUE.
            </p>
            <DataTable caption="Hubungan satisfiable dengan klasifikasi" headers={["Kategori", "Satisfiable?"]} rows={satisfiableTable} />
            <p>
              Satisfiable tidak berarti selalu benar; konsep ini menjadi fondasi
              untuk mempelajari SAT Solver.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="komputer">
            <SectionHeading number="11" title="Dari truth table ke komputer" id="komputer" />
            <p>
              Komputer membuat truth table secara otomatis lewat tiga langkah.
              Berikut ini versi pseudocode yang mudah dibaca tanpa perlu paham
              bahasa pemrograman.
            </p>

            <h3>Langkah 1 — Menghasilkan semua kombinasi</h3>
            <CodeBlock>{`Untuk setiap proposisi (misalnya P, Q, R):

  1. Hitung jumlah kombinasi:
     jumlah = 2 pangkat (banyaknya proposisi)

  2. Untuk angka 0 sampai (jumlah - 1):
     - Ubah angka tersebut menjadi deretan bit (0/1).
     - 0 berarti FALSE, 1 berarti TRUE.
     - Petakan setiap proposisi ke bit yang sesuai.
     - Simpan sebagai satu baris kombinasi.

Contoh:
  P, Q → 4 kombinasi (00, 01, 10, 11)`}</CodeBlock>

            <h3>Langkah 2 — Mengevaluasi formula</h3>
            <CodeBlock>{`Untuk setiap baris kombinasi, evaluasi formula
(P ∧ Q) → R dengan urutan:

  1. Hitung bagian dalam kurung dahulu:
     P ∧ Q = TRUE hanya jika P DAN Q sama-sama TRUE.

  2. Hitung implikasi:
     (P ∧ Q) → R bernilai FALSE HANYA JIKA
     (P ∧ Q) = TRUE dan R = FALSE.
     Selain itu hasilnya TRUE.

  3. Simpan hasil evaluasi pada baris tersebut.`}</CodeBlock>

            <h3>Langkah 3 — Mengklasifikasikan formula</h3>
            <CodeBlock>{`Setelah semua baris selesai dievaluasi:

  Jika SEMUA hasil = TRUE  → TAUTOLOGY
  Jika SEMUA hasil = FALSE → CONTRADICTION
  Jika hasilnya campuran   → CONTINGENCY
     (ada yang TRUE dan ada yang FALSE)`}</CodeBlock>

            <p>
              Jumlah baris truth table bertambah secara eksponensial (2ⁿ).
              Untuk formula kecil ini efisien, tetapi formula besar lebih baik
              memakai SAT Solver.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="case-study">
            <SectionHeading number="12" title="Mini case study: validasi sistem registrasi" id="case-study" />
            <p>
              Aturan: “Pengguna dapat registrasi jika memiliki email atau nomor
              telepon, dan belum terdaftar.” Formula: <code>(P ∨ Q) ∧ ¬R</code>.
            </p>
            <TruthTable caption="Truth table sistem registrasi" headers={registrasiTruthTable.headers} rows={registrasiTruthTable.rows} description={registrasiTruthTable.description} />
            <CodeBlock>{`function canRegister({ hasEmail, hasPhone, isRegistered }) {
  return (hasEmail || hasPhone) && !isRegistered;
}`}</CodeBlock>
          </section>

          <section className="session-one-section" aria-labelledby="kesalahan">
            <SectionHeading number="13" title="Kesalahan umum" id="kesalahan" />
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
            <SectionHeading number="14" title="Kesimpulan sesi 3" id="kesimpulan" />
            <p>
              Truth table mengevaluasi formula dari seluruh kombinasi nilai
              kebenaran. Dengan n proposisi, ada 2ⁿ kombinasi. WFF adalah formula
              yang valid secara syntax, tetapi tidak selalu bernilai TRUE.
            </p>
            <p>
              Formula diklasifikasikan menjadi tautology, contradiction, atau
              contingency. Konsep satisfiable menjadi dasar SAT Solver, dan
              komputer dapat membangun truth table secara otomatis.
            </p>
          </section>

          <section className="session-one-section session-one-knowledge" aria-labelledby="knowledge-check">
            <SectionHeading number="15" title="Knowledge check" id="knowledge-check" />
            <p>
              Uji pemahamanmu dengan {knowledgeCheckGroups.reduce((total, group) => total + group.questions.length, 0)} soal
              micro-quiz dari materi sesi ini.
            </p>
            <div className="session-one-check-cta">
              <h3>Siap menguji pemahamanmu?</h3>
              <p>Kerjakan soal berdasarkan pemahaman sendiri, lalu lihat penilaian kelengkapan konsep.</p>
              <a className="computational-button computational-button-primary" href="/computational-logic/session/3/check">
                Lanjut ke knowledge check <ArrowRight size={15} />
              </a>
            </div>
          </section>
        </article>

        <aside className="session-one-toc" aria-label="Daftar isi sesi">
          <SessionNavigation sections={sessionThreeSections} storageKey="inside-lab:computational-logic:session-3:read-sections:v1" />
          <div className="session-one-toc-note">
            <strong>Setelah sesi ini</strong>
            <p>Lanjut ke Logical Equivalence, Logical Consequence & Validity.</p>
            <a href="/computational-logic/session/4">Sesi berikutnya <ArrowRight size={14} /></a>
          </div>
        </aside>
      </div>

      <nav className="computational-session-navigation" aria-label="Navigasi sesi">
        <a href="/computational-logic/session/2"><ArrowLeft size={15} /> Sesi sebelumnya</a>
        <a href="/computational-logic/session/4">Sesi berikutnya <ArrowRight size={15} /></a>
      </nav>
    </main>
  );
}
