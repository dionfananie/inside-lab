import { CheckCircle2, Play, XCircle } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type useSatSolver from '../useSatSolver';

type SatResultProps = {
  sat: ReturnType<typeof useSatSolver>;
};

export default function SatResult({ sat }: SatResultProps) {
  const { parsing, result, run, statementTotal } = sat;

  return (
    <section className="sat-panel" aria-labelledby="sat-result-title">
      <div className="logic-section-label">03 / PERIKSA & PAHAMI</div>
      <h2 id="sat-result-title">Hasil pemeriksaan</h2>

      <Button onClick={run} disabled={statementTotal === 0 || !!parsing.error}>
        <Play size={16} />
        Periksa kepuasan
      </Button>

      {parsing.error && (
        <p className="logic-error" role="alert">
          {parsing.error}
        </p>
      )}

      {result.status === 'sat' && (
        <div className="sat-result sat-result-sat" role="status" aria-live="polite">
          <span className="sat-result-title">
            <CheckCircle2 size={18} /> SAT — dapat dipenuhi
          </span>
          <p>
            Ada penugasan yang membuat semua klausa benar sekaligus. Salah satu
            contohnya:
          </p>
          <div className="sat-assignment">
            {result.variables.map((v) => (
              <span key={v} className="sat-assignment-item">
                {v} = {result.assignment[v] ? 'benar' : 'salah'}
              </span>
            ))}
          </div>
          <p className="sat-note">
            Berarti tidak ada kontradiksi antar pernyataan. Kamu masih bisa
            menambahkan kalimat lain dan memeriksa ulang — hasilnya bisa berubah.
          </p>
        </div>
      )}

      {result.status === 'unsat' && (
        <div className="sat-result sat-result-unsat" role="status" aria-live="polite">
          <span className="sat-result-title">
            <XCircle size={18} /> UNSAT — tidak dapat dipenuhi
          </span>
          <p>
            Tidak ada satu pun penugasan yang membuat semua klausa benar
            sekaligus. Pernyataan-pernyataan ini saling bertentangan; contoh
            paling sederhana adalah <code className="sat-code">p</code> dan{' '}
            <code className="sat-code">¬p</code> yang tidak mungkin sama-sama
            benar.
          </p>
        </div>
      )}

      {result.status === 'error' && (
        <p className="logic-error" role="alert">
          {result.message}
        </p>
      )}
    </section>
  );
}
