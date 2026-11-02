import { CheckCircle2, Play, XCircle } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type useSatSolver from '../useSatSolver';

type SatResultProps = {
  sat: ReturnType<typeof useSatSolver>;
};

export default function SatResult({ sat }: SatResultProps) {
  const { dimacsText, problem, result, run, statementTotal, validation } = sat;

  return (
    <section className="sat-panel" aria-labelledby="sat-result-title">
      <div className="logic-section-label">04 / PERIKSA & PAHAMI</div>
      <h2 id="sat-result-title">DIMACS dan hasil</h2>
      <pre className="sat-dimacs-output" aria-label="Formula DIMACS otomatis">
        {dimacsText || 'p cnf 0 0'}
      </pre>
      <p className="logic-help">
        Header diperbarui otomatis: <code>p cnf {problem?.variables ?? 0} {statementTotal}</code>.
      </p>

      <Button onClick={run} disabled={statementTotal === 0 || validation.errors.length > 0}>
        <Play size={16} />
        Jalankan solver
      </Button>

      {validation.errors.length > 0 && (
        <p className="logic-error" role="alert">
          Perbaiki format klausa sebelum menjalankan solver.
        </p>
      )}

      {result.status === 'sat' && (
        <div className="sat-result sat-result-sat" role="status" aria-live="polite">
          <span className="sat-result-title">
            <CheckCircle2 size={18} /> SAT — dapat dipenuhi
          </span>
          <p>Salah satu assignment yang memenuhi semua klausa:</p>
          <div className="sat-assignment">
            {result.variables.map((variable) => (
              <span key={variable} className="sat-assignment-item">
                x{variable} = {result.assignment[variable] ? 'true' : 'false'}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.status === 'unsat' && (
        <div className="sat-result sat-result-unsat" role="status" aria-live="polite">
          <span className="sat-result-title">
            <XCircle size={18} /> UNSAT — tidak dapat dipenuhi
          </span>
          <p>
            Tidak ada assignment untuk x1 sampai x{result.variables.length} yang
            membuat seluruh klausa benar sekaligus.
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
