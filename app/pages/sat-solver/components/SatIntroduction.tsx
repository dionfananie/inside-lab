import { BookOpen } from 'lucide-react';

export default function SatIntroduction() {
  return (
    <div className="logic-heading">
      <span>COMPUTATIONAL LOGIC / SAT</span>
      <h1>SAT Solver</h1>
      <p>
        Pelajari SAT melalui format DIMACS CNF: setiap klausa berisi literal angka
        dan diakhiri dengan <code>0</code>.
      </p>
      <details className="logic-basics">
        <summary>
          <BookOpen size={16} /> Baru mulai? Kenali format DIMACS
        </summary>
        <div className="logic-basics-content">
          <p>
            <strong>SAT</strong> mencari assignment benar/salah yang membuat semua
            klausa benar sekaligus. Dalam CNF, literal di dalam satu klausa
            digabung dengan <code>∨</code>, sedangkan semua klausa digabung dengan{' '}
            <code>∧</code>.
          </p>
          <p>
            Angka positif berarti literal biasa, angka negatif berarti negasi, dan
            angka <code>0</code> menandai akhir klausa.
          </p>
          <pre className="sat-example" aria-label="Contoh format DIMACS">
{`p cnf 3 2
1 -3 0
2 3 -1 0`}
          </pre>
          <p>
            Contoh tersebut berarti{' '}
            <code>(x₁ ∨ ¬x₃) ∧ (x₂ ∨ x₃ ∨ ¬x₁)</code>. Header{' '}
            <code>p cnf 3 2</code> menyatakan 3 variabel dan 2 klausa.
          </p>
          <p>
            Jika ada assignment yang memenuhi semuanya, hasilnya <strong>SAT</strong>.
            Jika tidak ada, hasilnya <strong>UNSAT</strong>.
          </p>
        </div>
      </details>
    </div>
  );
}
