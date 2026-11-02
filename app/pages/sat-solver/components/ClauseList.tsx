import { useState } from 'react';
import { X } from 'lucide-react';
import type useSatSolver from '../useSatSolver';

type ClauseListProps = {
  sat: ReturnType<typeof useSatSolver>;
};

export default function ClauseList({ sat }: ClauseListProps) {
  const { clauses, removeClause, statementTotal, updateClause } = sat;
  const [editingId, setEditingId] = useState<string | null>(null);

  if (clauses.length === 0) {
    return (
      <p className="sat-empty">
        Belum ada pernyataan. Tambahkan kalimat di kolom di samping.
      </p>
    );
  }

  return (
    <section aria-labelledby="sat-clauses-title">
      <div className="sat-list-head">
        <h2 id="sat-clauses-title">Klausa SAT</h2>
        <span className="logic-badge">{statementTotal} pernyataan</span>
      </div>
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
                  aria-label={'Edit klausa ' + (index + 1)}
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
                aria-label={'Hapus klausa ' + (index + 1)}
                onClick={() => removeClause(clause.id)}
              >
                <X size={16} />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
