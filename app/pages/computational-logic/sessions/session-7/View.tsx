import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";

import CodeBlock from "../session-1/components/CodeBlock";
import SessionNavigation from "../session-1/components/SessionNavigation";
import KnowledgeCheck from "../../check/KnowledgeCheck";
import { sessionSevenCheck } from "./check";
import "../session-1/session-1.css";
import {
  activityProof,
  applicationCards,
  commonMistakes,
  comparisonTable,
  conjunctionProof,
  formalProofSteps,
  implicationIntroExample,
  naturalDeductionRules,
  negationProof,
  predicateProof,
  predicateRules,
  ruleSummaryTable,
  sessionSevenObjectives,
  sessionSevenSections,
  soundnessCompleteness,
  syntacticVsSemantic,
  transitivityProof,
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

export default function SessionSevenView() {
  return (
    <main className="session-one-page">
      <header className="computational-header">
        <a className="computational-back-link" href="/computational-logic">
          <ArrowLeft size={15} /> Computational Logic
        </a>
        <span className="computational-session-progress">SESI 07 / 07</span>
      </header>

      <section className="session-one-hero" aria-labelledby="session-seven-title">
        <div className="computational-section-label">SESI 07 · FORMAL PROOF & NATURAL DEDUCTION</div>
        <h1 id="session-seven-title">Formal Proof & Natural Deduction</h1>
        <p>
          Pelajari cara menunjukkan bahwa sebuah kesimpulan benar-benar mengikuti
          premis — bukan hanya menyatakannya — melalui langkah pembuktian formal,
          aturan introduction dan elimination, serta subproof.
        </p>
        <div className="session-one-hero-meta">
          <span><BookOpen size={14} /> 9 tujuan belajar</span>
          <span><Lightbulb size={14} /> 8 aturan dasar</span>
          <span><CheckCircle2 size={14} /> 9 soal knowledge check</span>
        </div>
      </section>

      <div className="session-one-layout">
        <article className="session-one-main">
          <section className="session-one-section" aria-labelledby="tujuan">
            <SectionHeading number="01" title="Tujuan belajar" id="tujuan" />
            <ol className="session-one-objectives">
              {sessionSevenObjectives.map((objective) => (
                <li key={objective}><ArrowRight size={16} />{objective}</li>
              ))}
            </ol>
          </section>

          <section className="session-one-section" aria-labelledby="mengapa-pembuktian">
            <SectionHeading number="02" title="Mengapa pembuktian formal diperlukan?" id="mengapa-pembuktian" />
            <p>
              Misalkan <code>P</code>: Dion belajar, dan <code>Q</code>: Dion lulus
              ujian. Dari premis <code>P → Q</code> dan <code>P</code>, kita yakin
              bahwa <code>Q</code> benar. Namun keyakinan saja belum cukup untuk
              sistem formal: kita perlu menunjukkan langkah dan alasan yang membuat
              kesimpulan tersebut sah.
            </p>
            <div className="session-one-example">
              <p><strong>Premis:</strong> <code>P → Q</code> dan <code>P</code></p>
              <p><strong>Kesimpulan:</strong> <code>Q</code></p>
            </div>
            <DataTable
              caption="Contoh pembuktian formal sederhana"
              headers={["Langkah", "Formula", "Alasan"]}
              rows={formalProofSteps}
            />
            <div className="session-one-callout">
              <strong>Inti gagasan</strong>
              <p>
                Pembuktian formal membuat proses penalaran dapat diperiksa langkah
                demi langkah. Setiap baris harus memiliki formula dan justifikasi
                yang sesuai dengan aturan yang dipakai.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="formal-proof">
            <SectionHeading number="03" title="Formal proof dan notasi ⊢" id="formal-proof" />
            <p>
              Formal proof adalah urutan langkah yang menunjukkan bahwa sebuah
              formula dapat diturunkan dari premis menggunakan aturan pembuktian
              yang ditentukan. Hubungan ini ditulis:
            </p>
            <CodeBlock>{`Γ ⊢ Q

Γ = sekumpulan premis atau asumsi
⊢ = dapat dibuktikan secara sintaktis
Q = formula yang ingin dibuktikan`}</CodeBlock>
            <h3>Perbedaan ⊢ dan ⊨</h3>
            <DataTable
              caption="Perbedaan derivasi sintaktis dan konsekuensi semantik"
              headers={["Simbol", "Makna"]}
              rows={syntacticVsSemantic}
            />
            <div className="session-one-card-grid session-one-card-grid-2">
              {soundnessCompleteness.map((item) => (
                <article key={item.title}>
                  <span>SIFAT SISTEM</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
            <p>
              Dengan demikian, <code>⊢</code> berbicara tentang langkah sintaktis
              yang boleh dipakai, sedangkan <code>⊨</code> berbicara tentang
              kebenaran pada semua interpretasi. Sistem pembuktian yang baik
              menghubungkan keduanya secara konsisten.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="natural-deduction">
            <SectionHeading number="04" title="Natural Deduction" id="natural-deduction" />
            <p>
              Natural Deduction adalah sistem formal proof yang menggunakan aturan
              untuk memperkenalkan (<em>introduction</em>) dan menggunakan atau
              menghilangkan (<em>elimination</em>) operator logika.
            </p>
            <div className="session-one-card-grid session-one-card-grid-2">
              <article>
                <span>INTRODUCTION</span>
                <h4>Membentuk operator</h4>
                <p>
                  Aturan introduction dipakai ketika operator muncul pada
                  kesimpulan, misalnya dari P dan Q menyimpulkan P ∧ Q.
                </p>
              </article>
              <article>
                <span>ELIMINATION</span>
                <h4>Menggunakan operator</h4>
                <p>
                  Aturan elimination dipakai ketika operator sudah ada pada premis,
                  misalnya dari P ∧ Q mengambil P atau Q.
                </p>
              </article>
            </div>
            <p>
              Setiap aturan memiliki bentuk formal yang berbeda. Notasi dapat
              sedikit bervariasi antar buku, tetapi materi ini menggunakan aturan
              standar untuk logika klasik.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="aturan-and">
            <SectionHeading number="05" title="Conjunction — AND (∧)" id="aturan-and" />
            <h3>AND Introduction (∧I)</h3>
            <p>Dari P dan Q, simpulkan P ∧ Q.</p>
            <CodeBlock>{`P      Q
-----------  ∧I
   P ∧ Q`}</CodeBlock>
            <h3>AND Elimination (∧E)</h3>
            <p>Dari P ∧ Q, kita dapat mengambil P atau Q.</p>
            <CodeBlock>{`P ∧ Q        P ∧ Q
-----  ∧E    -----  ∧E
  P            Q`}</CodeBlock>
            <div className="session-one-callout">
              <strong>Perhatikan</strong>
              <p>
                ∧E hanya berlaku jika formula yang digunakan memang berbentuk
                konjungsi. Operator lain tidak boleh dieliminasi dengan aturan ini.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="aturan-or">
            <SectionHeading number="06" title="Disjunction — OR (∨)" id="aturan-or" />
            <h3>OR Introduction (∨I)</h3>
            <p>Dari P, simpulkan P ∨ Q. Dari Q, simpulkan P ∨ Q.</p>
            <CodeBlock>{`P            Q
-----  ∨I    -----  ∨I
P ∨ Q        P ∨ Q`}</CodeBlock>
            <p>
              ∨I melemahkan informasi: kita tidak perlu tahu mana yang benar, cukup
              salah satu proposisi sudah cukup untuk membentuk disjungsi.
            </p>
            <h3>OR Elimination (∨E)</h3>
            <p>
              Jika P ∨ Q benar, dari asumsi P dapat dibuktikan R, dan dari asumsi Q
              juga dapat dibuktikan R, maka R dapat disimpulkan.
            </p>
            <CodeBlock>{`P ∨ Q

  [P]           [Q]
   ⋮             ⋮
   R             R
-------------------  ∨E
         R`}</CodeBlock>
            <p>
              ∨E memeriksa dua kemungkinan. Karena kita tidak tahu apakah P atau Q
              yang benar, kesimpulan R harus dapat diturunkan dari keduanya.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="aturan-implikasi">
            <SectionHeading number="07" title="Implication — Implikasi (→)" id="aturan-implikasi" />
            <h3>Implication Elimination (→E) — Modus Ponens</h3>
            <p>Dari P → Q dan P, simpulkan Q.</p>
            <CodeBlock>{`P → Q      P
-----------  →E
     Q`}</CodeBlock>
            <h3>Implication Introduction (→I)</h3>
            <p>
              Jika dengan mengasumsikan P kita dapat membuktikan Q, simpulkan
              P → Q. Asumsi P ditutup setelah pembuktian selesai.
            </p>
            <CodeBlock>{`[P]
 ⋮
 Q
-------  →I (tutup asumsi P)
P → Q`}</CodeBlock>
            <h3>Contoh: membuktikan P → P</h3>
            <DataTable
              caption="Pembuktian P implies P"
              headers={["Langkah", "Formula", "Alasan"]}
              rows={implicationIntroExample}
            />
            <p>
              Langkah 1 membuka asumsi sementara. Karena P sudah tersedia dari
              asumsi itu sendiri, langkah 2 dapat langsung menutup asumsi dan
              menyimpulkan P → P dengan →I.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="aturan-negasi">
            <SectionHeading number="08" title="Negation — NOT (¬)" id="aturan-negasi" />
            <p>
              Simbol <code>⊥</code> menyatakan kontradiksi. Jika sebuah asumsi
              menghasilkan kontradiksi, asumsi tersebut tidak dapat dipertahankan.
            </p>
            <h3>Negation Introduction (¬I)</h3>
            <p>Jika asumsi P menghasilkan kontradiksi, simpulkan ¬P.</p>
            <CodeBlock>{`[P]
 ⋮
 ⊥
-------  ¬I (tutup asumsi P)
 ¬P`}</CodeBlock>
            <h3>Negation Elimination (¬E)</h3>
            <p>Dari P dan ¬P, simpulkan kontradiksi.</p>
            <CodeBlock>{`P      ¬P
---------  ¬E
    ⊥`}</CodeBlock>
            <div className="session-one-callout">
              <strong>Kontradiksi bukan kesimpulan akhir</strong>
              <p>
                ⊥ menandai bahwa asumsi yang sedang dibuka menghasilkan konflik.
                Langkah berikutnya biasanya menutup asumsi tersebut dengan ¬I, bukan
                menyajikan ⊥ sebagai hasil akhir.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="ringkasan-aturan">
            <SectionHeading number="09" title="Ringkasan aturan" id="ringkasan-aturan" />
            <DataTable
              caption="Ringkasan aturan introduction dan elimination"
              headers={["Operator", "Introduction", "Elimination"]}
              rows={ruleSummaryTable}
            />
            <div className="session-one-card-grid">
              {naturalDeductionRules.map((rule) => (
                <article key={rule.name}>
                  <span>ATURAN</span>
                  <h4>{rule.name}</h4>
                  <p><code>{rule.form}</code></p>
                  <p>{rule.explanation}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="subproof">
            <SectionHeading number="10" title="Subproof dan asumsi sementara" id="subproof" />
            <p>
              Subproof adalah bagian pembuktian yang menggunakan asumsi sementara.
              Subproof dipakai antara lain untuk implication introduction dan
              negation introduction.
            </p>
            <p>
              Diketahui <code>P → Q</code> dan <code>Q → R</code>. Buktikan{" "}
              <code>P → R</code>.
            </p>
            <DataTable
              caption="Pembuktian transitivity dengan subproof"
              headers={["Langkah", "Formula", "Alasan"]}
              rows={transitivityProof}
            />
            <p>
              Kita mengasumsikan P pada langkah 3. Dari P dan P → Q diperoleh Q,
              lalu dari Q dan Q → R diperoleh R. Karena R berhasil dibuktikan dari
              asumsi P, kita simpulkan P → R dan menutup asumsi tersebut.
            </p>
            <div className="session-one-callout">
              <strong>Aturan penting</strong>
              <p>
                Hasil di dalam subproof hanya boleh bergantung pada asumsi subproof
                selama subproof masih terbuka. Setelah asumsi ditutup, hasil tersebut
                tidak boleh dipakai seolah-olah P benar secara bebas.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="contoh-pembuktian">
            <SectionHeading number="11" title="Contoh pembuktian lain" id="contoh-pembuktian" />
            <h3>Membuktikan AND</h3>
            <p>Diketahui P dan Q. Buktikan P ∧ Q.</p>
            <DataTable
              caption="Pembuktian konjungsi"
              headers={["Langkah", "Formula", "Alasan"]}
              rows={conjunctionProof}
            />
            <h3>Membuktikan negasi</h3>
            <p>
              Diketahui <code>P → Q</code> dan <code>P → ¬Q</code>. Buktikan{" "}
              <code>¬P</code>.
            </p>
            <DataTable
              caption="Pembuktian negasi melalui kontradiksi"
              headers={["Langkah", "Formula", "Alasan"]}
              rows={negationProof}
            />
            <p>
              Asumsi P menghasilkan dua konsekuensi yang bertentangan, yaitu Q dan
              ¬Q. Kontradiksi ini menunjukkan bahwa asumsi P tidak dapat
              dipertahankan, sehingga ¬P disimpulkan.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="predicate">
            <SectionHeading number="12" title="Natural Deduction pada predicate logic" id="predicate" />
            <p>
              Aturan Natural Deduction dapat diperluas ke predicate logic melalui
              aturan untuk quantifier.
            </p>
            <DataTable
              caption="Aturan quantifier pada Natural Deduction"
              headers={["Aturan", "Bentuk", "Kapan dipakai"]}
              rows={predicateRules}
            />
            <h3>Contoh: universal elimination lalu Modus Ponens</h3>
            <p>
              Diketahui <code>∀x (Student(x) → MustTakeExam(x))</code> dan{" "}
              <code>Student(Dion)</code>. Buktikan <code>MustTakeExam(Dion)</code>.
            </p>
            <DataTable
              caption="Pembuktian predicate logic"
              headers={["Langkah", "Formula", "Alasan"]}
              rows={predicateProof}
            />
            <p>
              Universal Elimination mengganti x dengan Dion sehingga aturan umum
              berubah menjadi implikasi khusus untuk Dion. Setelah itu, Implication
              Elimination menghasilkan kesimpulan yang diminta.
            </p>
            <div className="session-one-callout">
              <strong>Hati-hati pada ∀I dan ∃E</strong>
              <p>
                Pada ∀I, objek yang dipilih harus sembarang dan tidak boleh
                bergantung pada asumsi khusus. Pada ∃E, nama sementara harus baru
                dan kesimpulan akhir tidak boleh bergantung pada identitas objek
                yang belum diketahui.
              </p>
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="perbandingan">
            <SectionHeading number="13" title="Formal proof, truth table, dan logical consequence" id="perbandingan" />
            <DataTable
              caption="Perbandingan truth table, logical consequence, formal proof, dan Natural Deduction"
              headers={["Konsep", "Pendekatan", "Fungsi"]}
              rows={comparisonTable}
            />
            <p>
              Truth table memeriksa semua kemungkinan nilai kebenaran formula
              proposisional. Natural Deduction memperlihatkan bagaimana kesimpulan
              diturunkan langkah demi langkah. Truth table proposisional biasa tidak
              cukup untuk menangani variabel dan quantifier pada predicate logic.
            </p>
          </section>

          <section className="session-one-section" aria-labelledby="penerapan">
            <SectionHeading number="14" title="Penerapan dalam computer science dan AI" id="penerapan" />
            <h3>Program verification</h3>
            <p>
              Kita ingin memastikan saldo tidak pernah negatif setelah penarikan.
            </p>
            <CodeBlock>{`function withdraw(balance, amount) {
  if (amount <= balance) {
    return balance - amount;
  }
  return balance;
}`}</CodeBlock>
            <p>
              Asumsi awal: <code>balance ≥ 0</code>. Kondisi penarikan:{" "}
              <code>amount ≤ balance</code>. Hasil penarikan:{" "}
              <code>balance − amount ≥ 0</code>. Dalam formal verification,
              spesifikasi dapat ditulis sebagai Hoare triple <code>{"{P} C {Q}"}</code>,
              dengan P sebagai precondition, C sebagai program, dan Q sebagai
              postcondition.
            </p>
            <div className="session-one-card-grid session-one-card-grid-2">
              {applicationCards.map((item) => (
                <article key={item.title}>
                  <span>PENERAPAN</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="aktivitas">
            <SectionHeading number="15" title="Aktivitas: sistem peminjaman buku" id="aktivitas" />
            <p>
              Aturan: jika pengguna terdaftar dan tidak memiliki denda, maka
              pengguna memenuhi syarat meminjam. Jika pengguna memenuhi syarat dan
              buku tersedia, maka peminjaman dapat dilakukan.
            </p>
            <CodeBlock>{`P = Pengguna terdaftar.
Q = Pengguna tidak memiliki denda.
R = Pengguna memenuhi syarat.
S = Buku tersedia.
T = Peminjaman dapat dilakukan.

Premis:
(P ∧ Q) → R
(R ∧ S) → T

Fakta: P, Q, S
Tujuan: T`}</CodeBlock>
            <p>
              Susun pembuktian T langkah demi langkah. Salah satu urutan yang sah
              adalah sebagai berikut.
            </p>
            <DataTable
              caption="Pembuktian tujuan T pada studi kasus peminjaman buku"
              headers={["Langkah", "Formula", "Alasan"]}
              rows={activityProof}
            />
            <h3>Tugas mahasiswa</h3>
            <ol className="session-one-list session-one-list-numbered">
              <li>Identifikasi premis, fakta, dan kesimpulan.</li>
              <li>Tentukan aturan Natural Deduction yang diperlukan.</li>
              <li>Susun pembuktian dalam tabel langkah, formula, dan alasan.</li>
              <li>Jelaskan kapan menggunakan AND Introduction dan Implication Elimination.</li>
              <li>Pastikan setiap langkah memiliki justifikasi yang sah.</li>
            </ol>
            <h3>Kesalahan yang perlu dihindari</h3>
            <div className="session-one-card-grid session-one-card-grid-2">
              {commonMistakes.map((item, index) => (
                <article key={item.title}>
                  <span>CATATAN {index + 1}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="session-one-section" aria-labelledby="kesimpulan">
            <SectionHeading number="16" title="Kesimpulan sesi 7" id="kesimpulan" />
            <p>
              Formal proof menunjukkan bahwa kesimpulan dapat diturunkan dari
              premis melalui aturan yang sah. Natural Deduction menyediakan aturan
              introduction dan elimination, sedangkan subproof memungkinkan kita
              bekerja dengan asumsi sementara dan menutupnya dengan benar.
            </p>
            <div className="session-one-callout">
              <strong>Pesan utama</strong>
              <p>
                Dalam logika, kita tidak cukup hanya menyatakan bahwa sebuah
                kesimpulan benar. Kita harus menunjukkan bagaimana kesimpulan
                tersebut diperoleh melalui langkah-langkah penalaran yang sah.
              </p>
            </div>
          </section>

          <section className="session-one-section session-one-knowledge" aria-labelledby="knowledge-check">
            <SectionHeading number="17" title="Knowledge check" id="knowledge-check" />
            <p>
              Uji pemahamanmu langsung di halaman ini. Kerjakan 8 soal pilihan
              ganda — setiap jawaban langsung dicek benar atau salah — lalu
              lengkapi 1 soal esai sebelum submit.
            </p>
            <KnowledgeCheck check={sessionSevenCheck} sessionId={7} />
          </section>
        </article>

        <aside className="session-one-toc" aria-label="Daftar isi sesi">
          <SessionNavigation sections={sessionSevenSections} storageKey="inside-lab:computational-logic:session-7:read-sections:v1" />
          <div className="session-one-toc-note">
            <strong>Setelah sesi ini</strong>
            <p>
              Lanjut ke transformasi bentuk normal, unification, resolution,
              knowledge representation, dan logic programming.
            </p>
            <a href="/computational-logic">Kembali ke Computational Logic <ArrowRight size={14} /></a>
          </div>
        </aside>
      </div>

      <nav className="computational-session-navigation" aria-label="Navigasi sesi">
        <a href="/computational-logic/session/6"><ArrowLeft size={15} /> Sesi sebelumnya</a>
        <a href="/computational-logic">Selesai <ArrowRight size={15} /></a>
      </nav>
    </main>
  );
}
