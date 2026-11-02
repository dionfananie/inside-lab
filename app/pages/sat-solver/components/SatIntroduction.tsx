import { BookOpen } from 'lucide-react';
import { satOperators } from '../data';

export default function SatIntroduction() {
  return (
    <div className="logic-heading">
      <span>COMPUTATIONAL LOGIC / SAT</span>
      <h1>SAT Solver</h1>
      <p>
        Ubah kalimat sehari-hari menjadi pernyataan logika, lalu periksa apakah
        semua bisa benar sekaligus.
      </p>
      <details className="logic-basics">
        <summary>
          <BookOpen size={16} /> Baru mulai? Kenali konsep SAT
        </summary>
        <div className="logic-basics-content">
          <p>
            <strong>Satisfiability (SAT)</strong> adalah pertanyaan: dapatkah kita
            memberi nilai benar atau salah pada setiap variabel sehingga seluruh
            kumpulan pernyataan menjadi benar?
          </p>
          <p>
            <strong>Klausa</strong> adalah satu pernyataan yang bisa bernilai benar
            atau salah. <strong>Literal</strong> adalah variabel atau negasinya,
            misalnya <code>p</code> atau <code>¬p</code>.
          </p>
          <p>
            <strong>CNF</strong> (bentuk normal konjungtif) adalah bentuk di mana
            banyak klausa digabung dengan <code>∧</code>. Solver mencari satu{' '}
            <strong>assignment</strong>, yaitu pemetaan setiap variabel ke benar
            atau salah, yang membuat semua klausa benar sekaligus.
          </p>
          <div className="logic-legend">
            {satOperators.map(([symbol, label, help]) => (
              <p key={symbol}>
                <code>{symbol}</code>
                <strong>{label}</strong>
                <span>{help}</span>
              </p>
            ))}
          </div>
          <p>
            Jika ada satu penugasan yang membuat semua klausa benar, hasilnya{' '}
            <strong>SAT</strong>. Jika tidak ada sama sekali, hasilnya{' '}
            <strong>UNSAT</strong>, artinya pernyataan-pernyataan itu saling
            bertentangan.
          </p>
        </div>
      </details>
    </div>
  );
}
