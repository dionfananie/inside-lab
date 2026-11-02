import { Braces, Plus, Sparkles } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type useSatSolver from '../useSatSolver';

type SentenceInputProps = {
  sat: ReturnType<typeof useSatSolver>;
};

export default function SentenceInput({ sat }: SentenceInputProps) {
  const {
    addClause,
    addNumericClause,
    numericSource,
    numericSourceInput,
    setNumericSource,
    setSource,
    source,
    sourceInput,
    variableTotal,
  } = sat;

  return (
    <section className="sat-panel" aria-labelledby="sat-input-title">
      <div className="logic-section-label">02 / MASUKKAN KLAUSA</div>
      <h2 id="sat-input-title">Klausa DIMACS CNF</h2>
      <p className="logic-help">
        Satu klausa berisi literal angka dan selalu diakhiri <code>0</code>.
        Pisahkan beberapa klausa dengan baris baru atau titik koma.
      </p>
      <textarea
        ref={numericSourceInput}
        value={numericSource}
        onChange={(event) => setNumericSource(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey && !numericSource.includes('\n')) {
            event.preventDefault();
            addNumericClause();
          }
        }}
        rows={3}
        placeholder={'Contoh:\n1 -3 0\n2 3 -1 0'}
        className="sat-textarea sat-numeric-textarea"
        aria-label="Klausa DIMACS angka"
      />
      <div className="sat-input-actions">
        <Button onClick={addNumericClause} disabled={!numericSource.trim()}>
          <Plus size={16} />
          Tambah klausa angka
        </Button>
        <span className="sat-hint">
          <Braces size={14} />
          {variableTotal} variabel · {sat.statementTotal} klausa
        </span>
      </div>

      <details className="sat-natural-input">
        <summary>
          <Sparkles size={15} /> Konversi dari kalimat biasa (POC)
        </summary>
        <p className="logic-help">
          Tulis kalimat sederhana. Hasilnya akan dikonversi ke klausa angka dan
          tetap bisa kamu edit setelah ditambahkan.
        </p>
        <textarea
          ref={sourceInput}
          value={source}
          onChange={(event) => setSource(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              addClause();
            }
          }}
          rows={3}
          placeholder="Contoh: belajar atau tidak paham; hujan dan jalan basah"
          className="sat-textarea"
          aria-label="Kalimat biasa yang akan diubah menjadi klausa DIMACS"
        />
        <div className="sat-input-actions">
          <Button onClick={addClause} disabled={!source.trim()} variant="outline">
            <Plus size={16} />
            Konversi & tambah
          </Button>
        </div>
      </details>
    </section>
  );
}
