import { useState } from 'react';
import { X } from 'lucide-react';
import type useSatSolver from '../useSatSolver';

type ClauseListProps = {
  sat: ReturnType<typeof useSatSolver>;
};

export default function ClauseList({ sat }: ClauseListProps) {
  const { clauses, removeClause, statementTotal, updateClause, validation } = sat;
  const [editingId, setEditingId] = useState<string | null>(null);

  if (clauses.length === 0) {
    return (
      <section aria-labelledby="sat-clauses-title">
        <div className="sat-list-head">
          <h2 id="sat-clauses-title">Klausa angka</h2>
          <span className="logic-badge">0 klausa</span>
        </div>
        <p className="sat-empty">
          Belum ada klausa. Masukkan baris seperti <code>1 -3 0</code> untuk mulai.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="sat-clauses-title">
      <div className="sat-list-head">
        <div>
          <div className="logic-section-label">03 / EDITOR DIMACS</div>
          <h2 id="sat-clauses-title">Klausa angka</h2>
        </div>
        <span className="logic-badge">{statementTotal} klausa</span>
      </div>
      <p className="logic-help sat-editor-help">
        Angka positif berarti variabel benar, angka negatif berarti negasi, dan{' '}
        <code>0</code> menandai akhir klausa. Klik baris untuk mengedit.
      </p>
      <ul className="sat-clauses">
        {clauses.map((clause, index) => {
          const isEditing = editingId === clause.id;
          return (
            <li key={clause.id} className="sat-clause">
              <span className="sat-clause-index" aria-hidden="true">
                {index + 1}
              </span>
              {isEditing ? (
                <input
                  autoFocus
                  value={clause.raw}
                  onChange={(event) => updateClause(clause.id, event.target.value)}
                  onBlur={() => setEditingId(null)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') setEditingId(null);
                  }}
                  className="sat-clause-input"
                  aria-label={`Edit klausa ${index + 1}`}
                />
              ) : (
                <button
                  type="button"
                  className="sat-clause-view"
                  onClick={() => setEditingId(clause.id)}
                  title="Klik untuk mengedit"
                >
                  {clause.raw}
                </button>
              )}
              <button
                type="button"
                className="sat-clause-remove"
                aria-label={`Hapus klausa ${index + 1}`}
                onClick={() => removeClause(clause.id)}
              >
                <X size={16} />
              </button>
            </li>
          );
        })}
      </ul>
      {validation.errors.length > 0 && (
        <div className="logic-error sat-validation" role="alert">
          {validation.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </section>
  );
}
