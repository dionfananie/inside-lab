import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";

import {
  aiApproaches,
  componentSummary,
  everydayVsFormal,
  implicationTruthTable,
  sessionOneObjectives,
  sessionOneSections,
} from "./data";
import CodeBlock from "./components/CodeBlock";
import SessionNavigation from "./components/SessionNavigation";
import TruthTable from "../../components/TruthTable";
import "./session-1.css";

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

export default function SessionOneView() {
  return (
    <main className="computational-page session-one-page">
      <header className="computational-header">
        <a className="computational-back-link" href="/computational-logic">
          <ArrowLeft size={15} /> Computational Logic
        </a>
        <span className="computational-session-progress">SESI 01 / 06</span>
      </header>

      <section className="session-one-hero" aria-labelledby="session-one-title">
        <div className="computational-section-label">SESI 01 · INTRODUCTION TO FORMAL LOGIC</div>
        <h1 id="session-one-title">Pengantar Logika Formal</h1>
        <p>
          Logika membantu kita menentukan apakah suatu kesimpulan benar-benar
          mengikuti informasi yang diberikan. Pada sesi ini, kita mempelajari
          mengapa logika formal dibutuhkan oleh komputer dan AI, serta tiga
          komponen utamanya: syntax, semantics, dan inference rules.
        </p>
        <div className="session-one-hero-meta">
          <span><BookOpen size={14} /> 6 tujuan belajar</span>
          <span><Lightbulb size={14} /> 3 komponen inti</span>
          <span><CheckCircle2 size={14} /> Knowledge check</span>
        </div>
      </section>

      <div className="session-one-layout">
        <article className="session-one-main">
          <section className="session-one-section" aria-labelledby="tujuan">
            <SectionHeading number="01" title="Tujuan belajar" id="tujuan" />
            <p>Setelah menyelesaikan sesi ini, mahasiswa diharapkan mampu:</p>
            <ol className="session-one-objectives">
              {sessionOneObjectives.map((objective) => (
                <li key={objective}><ArrowRight size={16} />{objective}</li>
              ))}
            </ol>
          </section>

          <section className="session-one-section" aria-labelledby="apa-itu-logika">
            <SectionHeading number="02" title="Apa itu logika?" id="apa-itu-logika" />
            <p>
              Logika adalah ilmu yang mempelajari prinsip dan aturan penalaran
              untuk menentukan apakah suatu kesimpulan dapat ditarik secara benar
              dari sejumlah informasi atau pernyataan yang diberikan.
            </p>
            <p>Manusia menggunakan logika dalam kehidupan sehari-hari untuk:</p>
            <ul className="session-one-list">
              <li>Mengambil keputusan.</li>
              <li>Memecahkan masalah.</li>
              <li>Menganalisis informasi.</li>
              <li>Menilai suatu argumen.</li>
              <li>Menarik kesimpulan berdasarkan fakta.</li>
            </ul>

            <h3>Contoh dalam kehidupan sehari-hari</h3>
            <div className="session-one-example">
              <ol>
                <li>Jika hujan, maka jalanan basah.</li>
                <li>Hari ini hujan.</li>
                <li>Maka, jalanan basah.</li>
              </ol>
            </div>
            <p>
              Kesimpulan pada pernyataan ketiga muncul karena terdapat hubungan
              logis antara pernyataan pertama dan kedua. Hujan adalah kondisi
              yang membuat aturan pertama berlaku, dan kondisi itu benar-benar
              terjadi. Proses menarik kesimpulan berdasarkan informasi dan aturan
              inilah yang disebut <strong>penalaran</strong> atau <strong>reasoning</strong>.
            </p>

            <div className="session-one-callout">
              <strong>Hal yang perlu dipahami</strong>
              <p>
                Logika <b>
                  tidak selalu membuktikan
                </b>{` `}
                bahwa suatu pernyataan benar
                secara faktual. Logika membantu memastikan bahwa proses
                penarikan kesimpulan konsisten dengan premis dan aturan yang
                digunakan.
              </p>
            </div>
            <div className="session-one-example">
              <ol>
                <li>Semua kucing dapat terbang.</li>
                <li>Miko adalah kucing.</li>
                <li>Maka, Miko dapat terbang.</li>
              </ol>
            </div>
            <p>
              Kesimpulan tersebut valid secara logis jika kedua premis diterima
              sebagai benar. Namun, premis pertama tidak benar dalam kenyataan.
              Contoh ini menunjukkan bahwa kebenaran proses penalaran dan
              kebenaran fakta merupakan dua hal yang berbeda.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="logika-formal">
            <SectionHeading number="03" title="Apa itu logika formal?" id="logika-formal" />
            <p>
              <strong>Logika Formal</strong> adalah sistem penalaran yang
              menggunakan bahasa formal, simbol, aturan pembentukan formula, dan
              aturan interpretasi untuk merepresentasikan serta mengevaluasi
              pernyataan dan argumen secara sistematis.
            </p>
            <p>
              Logika formal memungkinkan kita mengubah kalimat bahasa sehari-hari
              menjadi representasi yang lebih terstruktur dan tidak ambigu.
            </p>

            <h3>Contoh: bahasa sehari-hari</h3>
            <p>“Jika seseorang belajar, maka dia memahami materi.”</p>
            <CodeBlock>{`P → Q

P = Seseorang belajar.
Q = Seseorang memahami materi.
→ = Jika ... maka ...`}</CodeBlock>
            <p>
              Formula <code>P → Q</code> berarti: “Jika P benar, maka Q harus
              benar.” Representasi ini membuat pernyataan dapat dianalisis
              menggunakan aturan formal.
            </p>

            <h3>Mengapa menggunakan simbol?</h3>
            <div className="session-one-card-grid">
              <article><span>A / AMBIGUITAS</span><h4>Satu kalimat, banyak makna.</h4><p>“Saya akan membeli kopi atau teh” bisa berarti salah satu saja atau keduanya. Logika formal membedakan inclusive OR dan exclusive OR.</p></article>
              <article><span>B / KONSISTENSI</span><h4>Satu istilah, satu makna.</h4><p>Bahasa manusia tidak selalu konsisten. Simbol formal memberi aturan makna yang lebih jelas.</p></article>
              <article><span>C / OTOMATISASI</span><h4>Dapat dievaluasi komputer.</h4><p>Komputer membutuhkan representasi terstruktur agar dapat mengevaluasi pernyataan dengan algoritma.</p></article>
            </div>

            <h3>Perbedaan logika sehari-hari dan logika formal</h3>
            <DataTable caption="Perbedaan logika sehari-hari dan logika formal" headers={["Aspek", "Logika sehari-hari", "Logika formal"]} rows={everydayVsFormal} />
            <p>
              Logika formal bukan berarti bahasa sehari-hari tidak dapat
              digunakan untuk bernalar. Logika formal memberikan cara untuk
              merepresentasikan dan mengevaluasi penalaran secara lebih presisi.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="pentingnya-logika-formal">
            <SectionHeading number="04" title="Mengapa logika formal penting dalam komputer dan AI?" id="pentingnya-logika-formal" />
            <h3>Komputer membutuhkan representasi yang terstruktur</h3>
            <p>Komputer memproses informasi melalui representasi data dan instruksi. Misalnya:</p>
            <CodeBlock>{`const temperature = 39;
const hasCough = true;

if (temperature > 38 && hasCough) {
  console.log("High risk");
}`}</CodeBlock>
            <p>
              Komputer tidak perlu memahami arti demam atau batuk seperti
              manusia. Komputer hanya mengevaluasi apakah <code>temperature &gt; 38</code>{" "}
              bernilai TRUE, apakah <code>hasCough</code> bernilai TRUE, dan
              apakah kedua kondisi memenuhi operator AND. Jika keduanya benar,
              instruksi di dalam IF dijalankan.
            </p>

            <h3>Logika formal membantu komputer melakukan reasoning</h3>
            <p>Bayangkan komputer diberikan fakta dan aturan berikut:</p>
            <CodeBlock>{`FAKTA:
Hujan = TRUE

ATURAN:
Jika Hujan = TRUE
Maka JalanBasah = TRUE

KESIMPULAN:
JalanBasah = TRUE`}</CodeBlock>
            <p>
              Komputer dapat menghasilkan kesimpulan yang tidak diberikan secara
              langsung karena memiliki aturan untuk menghubungkan fakta dengan
              kesimpulan. Inilah yang disebut <strong>automated reasoning</strong>.
            </p>

            <h3>Penerapan logika formal dalam Artificial Intelligence</h3>
            <div className="session-one-card-grid session-one-card-grid-2">
              <article><span>A / EXPERT SYSTEM</span><h4>Aturan untuk rekomendasi.</h4><p>Sistem troubleshooting komputer memakai aturan seperti: IF computer_does_not_turn_on AND power_indicator_is_off THEN check_power_cable.</p></article>
              <article><span>B / SAT SOLVER</span><h4>Mencari nilai yang memenuhi formula.</h4><p>SAT Solver menentukan apakah formula seperti (P OR Q) AND (NOT P OR R) dapat dibuat TRUE. Teknologi ini dipakai untuk verifikasi software dan hardware, scheduling, serta constraint solving.</p></article>
              <article><span>C / AUTOMATED THEOREM PROVING</span><h4>Membuktikan kesimpulan dari premis.</h4><p>Komputer dapat menurunkan Q dari premis P → Q dan P menggunakan aturan inferensi yang telah didefinisikan.</p></article>
              <article><span>D / KNOWLEDGE REPRESENTATION</span><h4>Menyimpan pengetahuan sebagai fakta dan aturan.</h4><p>Fakta “Teddy adalah mahasiswa” dan aturan “semua mahasiswa wajib mengikuti ujian” menghasilkan kesimpulan “Teddy wajib mengikuti ujian”.</p></article>
            </div>

            <h3>Apakah semua AI menggunakan logika formal?</h3>
            <p>Tidak. Logika formal adalah salah satu pendekatan dalam AI, bukan satu-satunya.</p>
            <DataTable caption="Pendekatan-pendekatan dalam AI" headers={["Pendekatan", "Cara kerja"]} rows={aiApproaches} />
            <p>
              Expert System menggunakan aturan eksplisit. Machine Learning dapat
              mempelajari pola dari data tanpa aturan yang ditulis satu per satu.
              LLM menghasilkan respons berdasarkan model yang telah dilatih.
              Walaupun pendekatannya berbeda, logika formal tetap penting untuk
              memahami dasar penalaran, konsistensi, pembuktian, dan representasi
              pengetahuan.
            </p>

            <div className="session-one-activity">
              <span>AKTIVITAS AKTIF</span>
              <h3>AI Decision Challenge</h3>
              <p>
                Kelompok memeriksa contoh keputusan sistem AI, mengidentifikasi
                aturan logis yang digunakan, dan berdebat apakah keputusan
                tersebut valid.
              </p>
              <a href="/computational-logic/sat-solver">Lihat SAT Solver <ArrowRight size={15} /></a>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="tiga-komponen">
            <SectionHeading number="05" title="Tiga komponen utama logika formal" id="tiga-komponen" />
            <p>Logika formal memiliki tiga komponen penting yang saling melengkapi:</p>
            <ol className="session-one-list session-one-list-numbered">
              <li><strong>Syntax</strong> — bagaimana simbol disusun menjadi formula yang valid.</li>
              <li><strong>Semantics</strong> — apa makna formula dan bagaimana nilai kebenarannya ditentukan.</li>
              <li><strong>Inference Rules</strong> — bagaimana kesimpulan dihasilkan dari premis.</li>
            </ol>

            <h3>5.1 Syntax (Sintaksis)</h3>
            <p>
              Syntax adalah aturan yang menentukan bagaimana simbol-simbol logika
              boleh disusun menjadi formula yang valid. Syntax hanya memeriksa
              struktur dan susunan simbol, bukan benar atau salahnya pernyataan.
            </p>
            <div className="session-one-split">
              <div><span>VALID</span><CodeBlock>{`P AND Q
P → Q`}</CodeBlock></div>
              <div><span>TIDAK VALID</span><CodeBlock>{`AND P →`}</CodeBlock></div>
            </div>
            <p>
              Dalam programming, <code>const age = 20;</code> memiliki syntax yang
              valid, sedangkan <code>const = age 20;</code> memiliki kesalahan
              syntax. Compiler atau parser dapat mendeteksi kesalahan tersebut
              sebelum program dijalankan. Hal serupa berlaku pada logika formal.
            </p>
            <div className="session-one-question-prompt">
              <strong>Pertanyaan utama Syntax</strong>
              <p>“Apakah formula ini disusun dengan benar berdasarkan aturan logika?”</p>
            </div>

            <h3>5.2 Semantics (Semantik)</h3>
            <p>
              Semantics adalah aturan yang menentukan makna suatu formula dan
              bagaimana nilai kebenarannya ditentukan berdasarkan interpretasi
              tertentu. Jika syntax memastikan formula disusun dengan benar,
              semantics menentukan apa arti formula tersebut dan apakah formula
              bernilai TRUE atau FALSE.
            </p>
            <p>Diberikan formula <code>P → Q</code> dengan interpretasi berikut:</p>
            <CodeBlock>{`P = Saya makan durian.
Q = Saya mengalami sakit kepala.`}</CodeBlock>
            <p>Formula tersebut bermakna: “Jika saya makan durian, maka saya mengalami sakit kepala.”</p>
            <TruthTable caption="Tabel kebenaran implikasi P → Q" headers={["P", "Q", "P → Q"]} rows={implicationTruthTable} description="Implikasi hanya bernilai FALSE ketika P benar dan Q salah." />
            <p>
              Formula hanya bernilai FALSE ketika P benar dan Q salah. Implikasi
              menyatakan bahwa setiap kali P terjadi, Q harus benar. Jika P tidak
              terjadi, aturan tersebut tidak dilanggar.
            </p>
            <div className="session-one-callout">
              <strong>Syntax valid belum tentu bernilai TRUE</strong>
              <p>
                <code>P AND Q</code> valid secara syntax, tetapi jika P = TRUE dan
                Q = FALSE, hasilnya FALSE. Syntax menentukan validitas struktur;
                semantics menentukan nilai kebenaran.
              </p>
            </div>
            <div className="session-one-question-prompt">
              <strong>Pertanyaan utama Semantics</strong>
              <p>“Apa makna formula ini dan kapan formula tersebut bernilai TRUE atau FALSE?”</p>
            </div>

            <h3>5.3 Inference Rules (Aturan Inferensi)</h3>
            <p>
              Inference Rules adalah aturan formal yang digunakan untuk
              menghasilkan kesimpulan berdasarkan satu atau lebih premis. Jika
              syntax membentuk formula dan semantics mengevaluasi formula,
              inference rules mengatur bagaimana kita menarik kesimpulan dari
              informasi yang tersedia.
            </p>
            <h4>Contoh: Modus Ponens</h4>
            <CodeBlock>{`Premis 1: P → Q
Premis 2: P
Kesimpulan: Q`}</CodeBlock>
            <p>Dalam kehidupan sehari-hari:</p>
            <CodeBlock>{`Premis 1: Jika hujan, maka jalanan basah.
Premis 2: Hari ini hujan.
Kesimpulan: Jalanan basah.`}</CodeBlock>
            <p>Dalam Expert System, aturan dapat berbentuk:</p>
            <CodeBlock>{`FAKTA:
temperature_high = TRUE

ATURAN:
IF temperature_high = TRUE
THEN possible_fever = TRUE

KESIMPULAN:
possible_fever = TRUE`}</CodeBlock>
            <div className="session-one-question-prompt">
              <strong>Pertanyaan utama Inference Rules</strong>
              <p>“Bagaimana kita dapat menghasilkan kesimpulan berdasarkan premis yang tersedia?”</p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="hubungan-komponen">
            <SectionHeading number="06" title="Hubungan antara syntax, semantics, dan inference rules" id="hubungan-komponen" />
            <p>Ketiga komponen ini saling melengkapi. Perhatikan contoh berikut:</p>
            <CodeBlock>{`P = Hari ini hujan.
Q = Jalanan basah.

Formula: P → Q`}</CodeBlock>
            <div className="session-one-stages">
              <article><span>TAHAP 1</span><h4>Syntax</h4><p>Memastikan bahwa <code>P → Q</code> merupakan formula yang valid.</p></article>
              <article><span>TAHAP 2</span><h4>Semantics</h4><p>Menentukan makna “Jika hari ini hujan, maka jalanan basah” dan mengevaluasi nilai kebenarannya.</p></article>
              <article>
                <span>TAHAP 3</span>
                <h4>Inference Rules</h4>
                <p>Diberikan <code>P → Q</code> dan <code>P</code>, gunakan Modus Ponens untuk mendapatkan <code>Q</code>.</p>
                <small className="session-one-stage-note">Modus Ponens akan dipelajari lebih dalam pada sesi berikutnya.</small>
              </article>
            </div>
            <DataTable caption="Ringkasan tiga komponen logika formal" headers={["Komponen", "Peran", "Analogi"]} rows={componentSummary} />
            <div className="session-one-callout">
              <strong>Konsep utama</strong>
              <p>
                Komputer membutuhkan representasi yang benar secara struktur,
                interpretasi yang jelas, dan aturan penalaran untuk menghasilkan
                kesimpulan yang konsisten.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="ringkasan">
            <SectionHeading number="07" title="Ringkasan sesi 1" id="ringkasan" />
            <p>
              Logika adalah ilmu yang mempelajari prinsip penalaran untuk menarik
              kesimpulan secara benar. Logika formal merupakan sistem penalaran
              yang menggunakan simbol, struktur, dan aturan formal untuk
              merepresentasikan serta mengevaluasi pernyataan.
            </p>
            <p>
              Logika formal penting dalam komputer dan AI karena memungkinkan
              informasi direpresentasikan secara terstruktur, dievaluasi, dan
              digunakan untuk melakukan automated reasoning.
            </p>
            <ol className="session-one-list session-one-list-numbered">
              <li><strong>Syntax:</strong> bagaimana simbol disusun menjadi formula yang valid.</li>
              <li><strong>Semantics:</strong> apa makna formula dan bagaimana menentukan nilai kebenarannya.</li>
              <li><strong>Inference Rules:</strong> bagaimana kesimpulan dihasilkan dari premis.</li>
            </ol>
            <p>
              Ketiganya merupakan fondasi untuk mempelajari Propositional Logic,
              Predicate Logic, SAT Solver, dan Rule-Based AI pada sesi berikutnya.
            </p>
          </section>

          <section className="session-one-section session-one-knowledge" aria-labelledby="knowledge-check">
            <SectionHeading number="08" title="Knowledge check" id="knowledge-check" />
            <p>
              Uji pemahamanmu dengan micro-quiz dari materi sesi ini. Knowledge
              check dibuka di halaman terpisah agar kamu fokus mengerjakan tanpa
              melihat materi.
            </p>
            <div className="session-one-check-cta">
              <h3>Siap menguji pemahamanmu?</h3>
              <p>
                Kerjakan soal berdasarkan pemahaman sendiri, lalu lihat hasil
                penilaian kelengkapan konsep.
              </p>
              <a className="computational-button computational-button-primary" href="/computational-logic/session/1/check">
                Lanjut ke knowledge check <ArrowRight size={15} />
              </a>
            </div>
          </section>
        </article>

        <aside className="session-one-toc" aria-label="Daftar isi sesi">
          <SessionNavigation sections={sessionOneSections} />
          <div className="session-one-toc-note">
            <strong>Setelah sesi ini</strong>
            <p>Lanjut ke logika proposisional dan tabel kebenaran pada sesi 2.</p>
            <a href="/computational-logic/session/2">Sesi berikutnya <ArrowRight size={14} /></a>
          </div>
        </aside>
      </div>

      <nav className="computational-session-navigation" aria-label="Navigasi sesi">
        <a href="/computational-logic"><ArrowLeft size={15} /> Kembali ke Computational Logic</a>
        <a href="/computational-logic/session/2">Sesi berikutnya <ArrowRight size={15} /></a>
      </nav>
    </main>
  );
}
