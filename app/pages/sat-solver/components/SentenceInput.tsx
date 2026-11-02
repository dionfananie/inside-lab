import { Plus, Sparkles } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type useSatSolver from '../useSatSolver';

type SentenceInputProps = {
  sat: ReturnType<typeof useSatSolver>;
};

export default function SentenceInput({ sat }: SentenceInputProps) {
  const { addClause, setSource, source, sourceInput, variableTotal } = sat;

  return (
    <section className="sat-panel" aria-labelledby="sat-input-title">
      <div className="logic-section-label">02 / TULIS KALIMAT</div>
      <h2 id="sat-input-title">Kalimat biasa</h2>
      <p className="logic-help">
        Tulis satu atau beberapa kalimat (pisahkan dengan titik koma atau baris
        baru), lalu tekan <kbd>Enter</kbd> atau klik Tambah. Setiap kalimat
        menjadi satu klausa SAT.
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
        placeholder="Contoh: Saya belajar atau saya tidak paham; Kalau hujan maka jalanan basah"
        className="sat-textarea"
        aria-label="Kalimat biasa yang akan diubah menjadi klausa SAT"
      />
      <div className="sat-input-actions">
        <Button onClick={addClause} disabled={!source.trim()}>
          <Plus size={16} />
          Tambah pernyataan
        </Button>
        <span className="sat-hint">
          <Sparkles size={14} />
          {variableTotal} variabel terdeteksi
        </span>
      </div>
    </section>
  );
}
