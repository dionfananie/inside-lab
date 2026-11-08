import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";

import CodeBlock from "../session-1/components/CodeBlock";
import SessionNavigation from "../session-1/components/SessionNavigation";
import "../session-1/session-1.css";
import {
  componentsTable,
  knowledgeCheckGroups,
  quantifierComparisonTable,
  quantifierLaws,
  sessionSixObjectives,
  sessionSixSections,
  translationExamples,
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

export default function SessionSixView() {
  return (
    <main className="session-one-page">
      <header className="computational-header">
        <a className="computational-back-link" href="/computational-logic">
          <ArrowLeft size={15} /> Computational Logic
        </a>
        <span className="computational-session-progress">SESI 06 / 06</span>
      </header>

      <section className="session-one-hero" aria-labelledby="session-six-title">
        <div className="computational-section-label">SESI 06 · PREDICATE LOGIC & FIRST-ORDER LOGIC</div>
        <h1 id="session-six-title">Predicate Logic & First-Order Logic</h1>
        <p>
          Pelajari cara merepresentasikan pengetahuan yang lebih kompleks
          menggunakan predicate, variable, constant, function, dan quantifier.
        </p>
        <div className="session-one-hero-meta">
          <span><BookOpen size={14} /> 8 tujuan belajar</span>
          <span><Lightbulb size={14} /> 2 quantifier</span>
          <span><CheckCircle2 size={14} /> 10 soal knowledge check</span>
        </div>
      </section>

      <div className="session-one-layout">
        <article className="session-one-main">
          <section className="session-one-section" aria-labelledby="tujuan">
            <SectionHeading number="01" title="Tujuan belajar" id="tujuan" />
            <ol className="session-one-objectives">
              {sessionSixObjectives.map((objective) => (
                <li key={objective}><ArrowRight size={16} />{objective}</li>
              ))}
            </ol>
          </section>

          <section className="session-one-section" aria-labelledby="keterbatasan">
            <SectionHeading number="02" title="Keterbatasan propositional logic" id="keterbatasan" />
            <p>
              Propositional logic merepresentasikan pernyataan sebagai simbol
              tunggal (P, Q). Aturan “Semua mahasiswa wajib ikut ujian” harus
              ditulis per mahasiswa: P₁ → Q₁, P₂ → Q₂, dan seterusnya.
            </p>
            <p>
              Predicate logic mengatasinya dengan variabel: <code>Student(x) → MustTakeExam(x)</code>.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="apa-itu-predicate-logic">
            <SectionHeading number="03" title="Apa itu predicate logic?" id="apa-itu-predicate-logic" />
            <p>
              Predicate logic merepresentasikan objek, properti, dan hubungan
              antarobjek. Kalimat “Teddy adalah mahasiswa” menjadi{" "}
              <code>Student(Teddy)</code>, sedangkan “Teddy menyukai matematika”
              menjadi <code>Likes(Teddy, Mathematics)</code>.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="komponen">
            <SectionHeading number="04" title="Komponen predicate logic" id="komponen" />
            <DataTable caption="Komponen predicate logic" headers={["Komponen", "Fungsi", "Contoh"]} rows={componentsTable} />
            <h3>Predicate vs function</h3>
            <p>
              Predicate menghasilkan nilai kebenaran (<code>Student(Teddy)</code>),
              sedangkan function menghasilkan objek/term (<code>FatherOf(Teddy)</code>).
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="quantifier">
            <SectionHeading number="05" title="Quantifier" id="quantifier" />
            <h3>Universal quantifier (∀)</h3>
            <p><code>∀x (Student(x) → MustTakeExam(x))</code> — berlaku untuk semua objek.</p>
            <h3>Existential quantifier (∃)</h3>
            <p><code>∃x (Student(x) ∧ Likes(x, Mathematics))</code> — minimal satu objek.</p>
            <DataTable caption="Perbedaan universal dan existential" headers={["Universal (∀)", "Existential (∃)"]} rows={quantifierComparisonTable} />
          </section>

          <section className="session-one-section" aria-labelledby="scope">
            <SectionHeading number="06" title="Scope quantifier & bound variable" id="scope" />
            <p>
              Variabel yang berada dalam cakupan quantifier disebut{" "}
              <strong>bound variable</strong>. Variabel di luar cakupan quantifier
              disebut <strong>free variable</strong>.
            </p>
            <CodeBlock>{`∀x (Student(x) → Smart(x))   // x = bound variable
Student(x) ∧ ∃y Likes(y, Mathematics)
// y = bound, x = free`}</CodeBlock>
          </section>

          <section className="session-one-section" aria-labelledby="negasi-quantifier">
            <SectionHeading number="07" title="Negasi pada quantifier" id="negasi-quantifier" />
            <DataTable caption="Hukum negasi quantifier" headers={["Formula", "Ekuivalen"]} rows={quantifierLaws} />
            <p>
              Mirip De Morgan, tetapi diterapkan pada quantifier. Contoh:
              “Tidak semua mahasiswa lulus” ≡ “Ada mahasiswa yang tidak lulus”.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="translasi">
            <SectionHeading number="08" title="Mengubah bahasa alami menjadi predicate logic" id="translasi" />
            {translationExamples.map((example) => (
              <div className="session-one-translation" key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.statement}</p>
                <p>Representasi: <code>{example.formula}</code></p>
              </div>
            ))}
          </section>

          <section className="session-one-section" aria-labelledby="consequence">
            <SectionHeading number="09" title="Predicate logic & logical consequence" id="consequence" />
            <CodeBlock>{`Fakta: Student(Teddy)
Aturan: ∀x (Student(x) → MustTakeExam(x))
Kesimpulan: MustTakeExam(Teddy)`}</CodeBlock>
            <p>
              Sistem mengganti x dengan Teddy (universal instantiation), lalu
              memakai Modus Ponens untuk menyimpulkan <code>MustTakeExam(Teddy)</code>.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="prolog">
            <SectionHeading number="10" title="Implementasi dengan Prolog" id="prolog" />
            <CodeBlock>{`student(teddy).
student(budi).

takes(teddy, ai).
takes(budi, ai).

takes_ai(X) :-
    student(X),
    takes(X, ai).`}</CodeBlock>
            <CodeBlock>{`?- takes_ai(X).
% X = teddy ;
% X = budi.`}</CodeBlock>
          </section>

          <section className="session-one-section" aria-labelledby="penerapan">
            <SectionHeading number="11" title="Penerapan predicate logic dalam AI" id="penerapan" />
            <h3>Expert system</h3>
            <p><code>∀x (Student(x) ∧ LowGrade(x) → NeedsTutoring(x))</code></p>
            <h3>Knowledge representation</h3>
            <p><code>Parent(x,y) ∧ Parent(y,z) → Grandparent(x,z)</code></p>
            <h3>Natural language processing</h3>
            <p>“John memberikan buku kepada Mary” → <code>Gives(John, Book, Mary)</code></p>
          </section>

          <section className="session-one-section" aria-labelledby="aktivitas">
            <SectionHeading number="12" title="Aktivitas: knowledge base universitas" id="aktivitas" />
            <p>
              Fakta: Teddy dan Budi mahasiswa; Andi dosen; Andi mengajar AI; Teddy
              mengambil AI; Budi mengambil Database.
            </p>
            <CodeBlock>{`Student(Teddy)   Student(Budi)
Lecturer(Andi)  Teaches(Andi, AI)
Takes(Teddy, AI) Takes(Budi, Database)`}</CodeBlock>
            <p>
              Dari aturan “semua mahasiswa yang mengambil AI wajib ikut ujian AI”,
              kita dapat menyimpulkan bahwa Teddy wajib mengikuti ujian AI.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="kesimpulan">
            <SectionHeading number="13" title="Kesimpulan sesi 6" id="kesimpulan" />
            <p>
              Predicate logic memperluas propositional logic dengan objek,
              properti, hubungan, dan quantifier. Ini memungkinkan komputer
              merepresentasikan pengetahuan yang lebih terstruktur.
            </p>
          </section>

          <section className="session-one-section session-one-knowledge" aria-labelledby="knowledge-check">
            <SectionHeading number="14" title="Knowledge check" id="knowledge-check" />
            <p>
              Uji pemahamanmu dengan {knowledgeCheckGroups.reduce((total, group) => total + group.questions.length, 0)} soal
              micro-quiz dari materi sesi ini.
            </p>
            <div className="session-one-check-cta">
              <h3>Siap menguji pemahamanmu?</h3>
              <p>Kerjakan soal berdasarkan pemahaman sendiri, lalu lihat penilaian kelengkapan konsep.</p>
              <a className="computational-button computational-button-primary" href="/computational-logic/session/6/check">
                Lanjut ke knowledge check <ArrowRight size={15} />
              </a>
            </div>
          </section>
        </article>

        <aside className="session-one-toc" aria-label="Daftar isi sesi">
          <SessionNavigation sections={sessionSixSections} storageKey="inside-lab:computational-logic:session-6:read-sections:v1" />
          <div className="session-one-toc-note">
            <strong>Setelah sesi ini</strong>
            <p>Lanjut ke First-Order Logic Inference & Resolution.</p>
            <a href="/computational-logic">Kembali ke Computational Logic <ArrowRight size={14} /></a>
          </div>
        </aside>
      </div>

      <nav className="computational-session-navigation" aria-label="Navigasi sesi">
        <a href="/computational-logic/session/5"><ArrowLeft size={15} /> Sesi sebelumnya</a>
        <a href="/computational-logic">Selesai <ArrowRight size={15} /></a>
      </nav>
    </main>
  );
}
