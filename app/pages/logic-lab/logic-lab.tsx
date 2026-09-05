import { useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Check, RotateCcw } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Switch } from '~/components/ui/switch';
import {
  NativeSelect,
  NativeSelectOption,
} from '~/components/ui/native-select';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '~/components/ui/table';
import {
  parse,
  usedVariables,
  truthRows,
  verbalize,
  type Values,
  type Variable,
} from '~/lib/propositional-logic';
import { rules, scenarios, sequent } from './rules';
import { InsideLabBrand } from '~/components/inside-lab-brand';

const operators = [
  ['¬', 'tidak', 'Membalik nilai benar dan salah.'],
  ['∧', 'dan', 'Benar hanya jika kedua sisi benar.'],
  ['∨', 'atau', 'Benar jika setidaknya satu sisi benar; boleh keduanya.'],
  [
    '→',
    'jika … maka',
    'Salah hanya saat sisi kiri benar dan sisi kanan salah.',
  ],
  [
    '↔',
    'jika dan hanya jika',
    'Benar jika kedua sisi memiliki nilai yang sama.',
  ],
];
const truth = (b: boolean) => (b ? 'Benar' : 'Salah');
export default function LogicLab() {
  const [selected, setSelected] = useState(0);
  const [premiseText, setPremiseText] = useState(rules[0].premise);
  const [conclusionText, setConclusionText] = useState(rules[0].conclusion);
  const [values, setValues] = useState<Values>({
    p: true,
    q: true,
    r: false,
    s: false,
  });
  const [sentences, setSentences] = useState<Record<Variable, string>>({
    ...scenarios[0].sentences,
  });
  const [scenario, setScenario] = useState('0');
  const [announcement, setAnnouncement] = useState('');
  const field = useRef<'premise' | 'conclusion'>('conclusion');
  const premiseInput = useRef<HTMLInputElement>(null),
    conclusionInput = useRef<HTMLInputElement>(null);
  const playgroundTitle = useRef<HTMLHeadingElement>(null);
  const rule = rules[selected];
  const modified =
    premiseText !== rule.premise || conclusionText !== rule.conclusion;
  const analysis = useMemo(() => {
    try {
      const premise = parse(premiseText.trim() || '⊤');
      const conclusion = parse(conclusionText);
      const active = usedVariables(premise, conclusion);
      const rows = truthRows(premise, conclusion);
      return { premise, conclusion, active, rows, error: '' };
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : 'Rumus belum dapat dibaca.',
      };
    }
  }, [premiseText, conclusionText]);
  const active =
    analysis.active ??
    usedVariables(parse(rule.premise || '⊤'), parse(rule.conclusion));
  const rows = analysis.rows ?? [];
  const counterexamples = rows.filter((r) => r.counterexample);
  const current = rows.find((row) =>
    active.every((v) => row.values[v] === values[v]),
  );
  const noPremise = !premiseText.trim();
  function chooseRule(index: number) {
    setSelected(index);
    setPremiseText(rules[index].premise);
    setConclusionText(rules[index].conclusion);
    setAnnouncement(
      'Contoh ' +
        (index + 1) +
        ': ' +
        rules[index].name +
        ' dibuka. Kalimat dan nilai pernyataanmu tetap dipertahankan.',
    );
    requestAnimationFrame(() => {
      playgroundTitle.current?.focus({ preventScroll: true });
      playgroundTitle.current?.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      });
    });
  }
  function insertSymbol(symbol: string) {
    const input =
      field.current === 'premise'
        ? premiseInput.current
        : conclusionInput.current;
    const text = field.current === 'premise' ? premiseText : conclusionText;
    const start = input?.selectionStart ?? text.length,
      end = input?.selectionEnd ?? start;
    const next = text.slice(0, start) + symbol + text.slice(end);
    if (next.length > 240) return;
    if (field.current === 'premise') setPremiseText(next);
    else setConclusionText(next);
    requestAnimationFrame(() => {
      input?.focus();
      input?.setSelectionRange(start + symbol.length, start + symbol.length);
    });
  }
  return (
    <main className="logic-app">
      <header className="logic-header">
        <InsideLabBrand area="Computational Logic" />
        <nav aria-label="Jalur belajar">
          <a href="/js/values-types-operators">JS Learning</a>
          <a href="/computational-logic/proportional-logic" aria-current="page">
            Computational Logic
          </a>
        </nav>
      </header>
      <div className="logic-heading">
        <span>COMPUTATIONAL LOGIC / 01</span>
        <h1>Logika proposisional</h1>
        <p>
          Ubah kalimat menjadi simbol, lalu periksa apakah kesimpulannya
          mengikuti premis.
        </p>
        <details className="logic-basics">
          <summary>
            <BookOpen size={16} /> Baru mulai? Kenali cara membacanya
          </summary>
          <div className="logic-basics-content">
            <p>
              <strong>Proposisi</strong> adalah pernyataan yang dapat dinilai
              benar atau salah. Huruf p, q, r, dan s mewakili pernyataan.
              Pertanyaan atau perintah bukan proposisi.
            </p>
            <p>
              <strong>Premis</strong> adalah dasar argumen.{' '}
              <strong>Kesimpulan</strong> adalah pernyataan yang ditarik dari
              premis. Tanda <code>⊢</code> dibaca “dapat diturunkan”; bukan
              operator yang sama dengan <code>→</code> atau <code>↔</code>. Kita
              menguji apakah penurunan itu sah melalui semua kombinasi
              benar/salah.
            </p>
            <div className="logic-legend">
              {operators.map(([symbol, label, help]) => (
                <p key={symbol}>
                  <code>{symbol}</code>
                  <strong>{label}</strong>
                  <span>{help}</span>
                </p>
              ))}
            </div>
            <p>
              Argumen <strong>valid</strong> tidak memiliki keadaan ketika semua
              premis benar tetapi kesimpulan salah. Ini tidak berarti premisnya
              pasti benar di dunia nyata. Implikasi di sini adalah implikasi
              material, bukan bukti hubungan sebab-akibat.
            </p>
          </div>
        </details>
      </div>
      <div className="logic-workspace">
        <section className="logic-reference" aria-labelledby="rules-title">
          <div className="logic-section-label">01 / REFERENSI</div>
          <h2 id="rules-title">22 bentuk argumen</h2>
          <p className="logic-help">
            Pilih nama untuk mencoba bentuknya. Huruf yang sama selalu mewakili
            pernyataan yang sama.
          </p>
          <div className="logic-catalog">
            <Table>
              <TableCaption>
                Daftar bentuk argumen mengikuti{' '}
                <a
                  href="https://id.wikipedia.org/wiki/Logika_proposisional"
                  target="_blank"
                  rel="noreferrer"
                >
                  Wikipedia: Logika proposisional
                </a>
                . Penjelasan dan contoh ditulis untuk latihan ini.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">No.</TableHead>
                  <TableHead scope="col">Bentuk argumen & simbol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((r, i) => (
                  <TableRow
                    key={r.name}
                    data-state={selected === i ? 'selected' : undefined}
                  >
                    <TableCell>{String(i + 1).padStart(2, '0')}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        className="logic-rule-button"
                        aria-pressed={selected === i}
                        onClick={() => chooseRule(i)}
                      >
                        {r.name}
                        {selected === i ? (
                          <Check size={15} />
                        ) : (
                          <ArrowRight size={15} />
                        )}
                      </Button>
                      <code className="logic-rule-formula">{sequent(r)}</code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="logic-help logic-reference-note">
            <code>p, q ⊢ p ∧ q</code> memakai dua premis terpisah. Untuk
            menghitung tabel, keduanya digabung sebagai <code>p ∧ q</code>.
            Bentuk tanpa premis diuji sebagai pernyataan yang selalu benar.
          </p>
        </section>
        <section
          className="logic-playground"
          aria-labelledby="playground-title"
        >
          <div className="logic-section-label">02 / COBA & AMATI</div>
          <div className="logic-playground-heading">
            <h2 id="playground-title" tabIndex={-1} ref={playgroundTitle}>
              {String(selected + 1).padStart(2, '0')} · {rule.name}
            </h2>
            <span className="logic-badge">
              {modified ? 'Rumus diubah' : 'Bentuk acuan'}
            </span>
          </div>
          <p className="logic-help">
            {modified
              ? 'Rumusmu berbeda dari acuan. Baca hasil pemeriksaan di bawah; perubahan satu simbol dapat mengubah validitas argumen.'
              : rule.explanation}
          </p>
          <div className="logic-scenario">
            <label htmlFor="scenario">Contoh kalimat</label>
            <NativeSelect
              id="scenario"
              value={scenario}
              onChange={(e) => {
                const index = Number(e.target.value);
                setScenario(e.target.value);
                setSentences({ ...scenarios[index].sentences });
              }}
            >
              {scenario === 'custom' && (
                <NativeSelectOption value="custom" disabled>
                  Kalimat sendiri
                </NativeSelectOption>
              )}
              {scenarios.map((s, i) => (
                <NativeSelectOption key={s.name} value={String(i)}>
                  {s.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <p className="logic-help">
            Edit kalimat dan tentukan nilainya untuk simulasi. Aplikasi tidak
            menilai kebenaran kalimat secara otomatis.
          </p>
          {active.length === 0 && (
            <p className="logic-help">
              Rumus ini hanya memakai konstanta; tidak ada pernyataan yang perlu
              diatur.
            </p>
          )}
          {active.map((v) => (
            <div className="logic-atom" key={v}>
              <label htmlFor={'atom-' + v}>{v}</label>
              <Input
                id={'atom-' + v}
                aria-label={'Kalimat untuk ' + v}
                value={sentences[v]}
                maxLength={120}
                onChange={(e) => {
                  setSentences({ ...sentences, [v]: e.target.value });
                  setScenario('custom');
                }}
              />
              <label className="logic-toggle">
                <Switch
                  checked={values[v]}
                  onCheckedChange={(b) => setValues({ ...values, [v]: b })}
                  aria-label={'Nilai kebenaran ' + v}
                />
                {truth(values[v])}
              </label>
            </div>
          ))}
          <div className="logic-formula">
            <div className="logic-formula-head">
              <span>RUMUS YANG BISA DIUBAH</span>
              <Button
                variant="ghost"
                disabled={!modified}
                onClick={() => {
                  setPremiseText(rule.premise);
                  setConclusionText(rule.conclusion);
                }}
              >
                <RotateCcw size={14} />
                Pulihkan rumus
              </Button>
            </div>
            <label htmlFor="premise-formula">
              Premis — gabungkan dengan ∧ jika lebih dari satu
            </label>
            <Input
              ref={premiseInput}
              id="premise-formula"
              value={premiseText}
              maxLength={240}
              onFocus={() => {
                field.current = 'premise';
              }}
              onChange={(e) => setPremiseText(e.target.value)}
              aria-invalid={!!analysis.error}
              aria-describedby="formula-help formula-error"
              placeholder="Kosongkan untuk bentuk tanpa premis"
            />
            <div className="logic-turnstile">
              ⊢ <span>dapat diturunkan</span>
            </div>
            <label htmlFor="conclusion-formula">Kesimpulan</label>
            <Input
              ref={conclusionInput}
              id="conclusion-formula"
              value={conclusionText}
              maxLength={240}
              onFocus={() => {
                field.current = 'conclusion';
              }}
              onChange={(e) => setConclusionText(e.target.value)}
              aria-invalid={!!analysis.error}
              aria-describedby="formula-help formula-error"
            />
            <div
              className="logic-symbols"
              aria-label="Sisipkan simbol pada kolom rumus terakhir"
            >
              {[
                'p',
                'q',
                'r',
                's',
                ...operators.map((o) => o[0]),
                '(',
                ')',
                '⊤',
                '⊥',
              ].map((symbol) => (
                <Button
                  key={symbol}
                  variant="outline"
                  aria-label={'Sisipkan ' + symbol}
                  title={operators.find((o) => o[0] === symbol)?.[1] ?? symbol}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => insertSymbol(symbol)}
                >
                  {symbol}
                </Button>
              ))}
            </div>
            <p id="formula-help">
              Klik kolom rumus, lalu ketik atau sisipkan simbol. Bisa juga
              memakai !, &amp;&amp;, ||, -&gt;, &lt;-&gt;. ⊤ selalu benar; ⊥
              selalu salah. Urutan: ¬, ∧, ∨, →, ↔. Tanda kurung didahulukan; p →
              q → r dibaca p → (q → r).
            </p>
          </div>
          <div id="formula-error" role="status">
            {analysis.error && <p className="logic-error">{analysis.error}</p>}
          </div>
          {!analysis.error &&
            analysis.premise &&
            analysis.conclusion &&
            current && (
              <>
                <div className="logic-reading">
                  <h3>Rumus dibaca sebagai kalimat</h3>
                  <dl>
                    <dt>Premis</dt>
                    <dd>
                      {noPremise
                        ? 'Tanpa premis.'
                        : verbalize(analysis.premise, sentences) + '.'}
                    </dd>
                    <dt>Kesimpulan</dt>
                    <dd>{verbalize(analysis.conclusion, sentences) + '.'}</dd>
                  </dl>
                </div>
                <div
                  className={
                    'logic-outcome ' +
                    (current.counterexample ? 'logic-counterexample' : '')
                  }
                  role="status"
                  aria-live="polite"
                >
                  <strong>
                    {current.counterexample
                      ? 'Ada contoh penyangkal pada keadaan ini'
                      : !current.premise
                        ? 'Premis belum terpenuhi pada keadaan ini'
                        : 'Kesimpulan benar pada keadaan ini'}
                  </strong>
                  <p>
                    {noPremise
                      ? 'Tanpa premis'
                      : 'Premis: ' + truth(current.premise)}{' '}
                    · Kesimpulan: {truth(current.conclusion)}
                  </p>
                  <p>
                    {current.counterexample
                      ? 'Premis benar, tetapi kesimpulan salah. Satu keadaan ini cukup untuk menunjukkan argumen tidak valid.'
                      : !current.premise
                        ? 'Premis yang salah tidak membantah bentuk argumen. Nilai kesimpulannya bisa benar maupun salah.'
                        : 'Lihat semua baris di bawah untuk memeriksa validitas, bukan hanya keadaan yang dipilih.'}
                  </p>
                </div>
                <div className="logic-truth-heading">
                  <h3>Tabel kebenaran</h3>
                  <span>
                    {rows.length} kombinasi · {active.length} pernyataan
                  </span>
                </div>
                <p className="logic-help">
                  B = benar, S = salah. “Penyangkal” berarti premis benar dan
                  kesimpulan salah. Klik Coba untuk mengatur nilai sesuai baris
                  tersebut.
                </p>
                <div className="logic-truth-table">
                  <Table>
                    <TableCaption>
                      {counterexamples.length
                        ? 'Tidak valid: ditemukan ' +
                          counterexamples.length +
                          ' contoh penyangkal.'
                        : rows.every((r) => !r.premise)
                          ? 'Valid secara vakum: premis tidak pernah benar. Ini bukan bukti bahwa premis dapat terjadi.'
                          : noPremise
                            ? 'Tautologi: kesimpulan benar pada semua kombinasi, tanpa memerlukan premis.'
                            : 'Valid: tidak ada baris dengan premis benar dan kesimpulan salah.'}
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        {active.map((v) => (
                          <TableHead scope="col" key={v}>
                            {v}
                          </TableHead>
                        ))}
                        <TableHead scope="col">
                          {noPremise ? 'Tanpa premis' : 'Premis'}
                        </TableHead>
                        <TableHead scope="col">Kesimpulan</TableHead>
                        <TableHead scope="col">Penyangkal?</TableHead>
                        <TableHead scope="col">Keadaan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((row, i) => {
                        const chosen = active.every(
                          (v) => row.values[v] === values[v],
                        );
                        return (
                          <TableRow
                            key={i}
                            className={
                              row.counterexample ? 'counterexample-row' : ''
                            }
                            data-state={chosen ? 'selected' : undefined}
                          >
                            {active.map((v) => (
                              <TableCell key={v}>
                                <span
                                  className={
                                    row.values[v] ? 'truth-true' : 'truth-false'
                                  }
                                  aria-label={truth(row.values[v])}
                                >
                                  {row.values[v] ? 'B' : 'S'}
                                </span>
                              </TableCell>
                            ))}
                            <TableCell>
                              {noPremise ? '—' : row.premise ? 'B' : 'S'}
                            </TableCell>
                            <TableCell>{row.conclusion ? 'B' : 'S'}</TableCell>
                            <TableCell>
                              {row.counterexample ? 'Ya' : 'Tidak'}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                aria-pressed={chosen}
                                aria-label={
                                  'Coba baris ' +
                                  (i + 1) +
                                  ': ' +
                                  active
                                    .map((v) => v + ' ' + truth(row.values[v]))
                                    .join(', ')
                                }
                                onClick={() =>
                                  setValues({
                                    ...values,
                                    ...Object.fromEntries(
                                      active.map((v) => [v, row.values[v]]),
                                    ),
                                  })
                                }
                              >
                                {chosen ? 'Dipilih' : 'Coba'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          <div className="logic-next">
            <span>
              {selected + 1} dari {rules.length} bentuk argumen
            </span>
            <Button
              variant="outline"
              onClick={() => chooseRule((selected + 1) % rules.length)}
            >
              {selected === rules.length - 1
                ? 'Kembali ke bentuk pertama'
                : 'Contoh berikutnya'}
              <ArrowRight size={16} />
            </Button>
          </div>
        </section>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </main>
  );
}
