import { BookOpen } from 'lucide-react';
import { operators } from '../data';

export default function LogicIntroduction() {
  return (
    <div className="logic-heading">
      <span>COMPUTATIONAL LOGIC / 01</span>
      <h1>Logika proposisional</h1>
      <p>
        Ubah kalimat menjadi simbol, lalu periksa apakah kesimpulannya mengikuti
        premis.
      </p>
      <details className="logic-basics">
        <summary>
          <BookOpen size={16} /> Baru mulai? Kenali cara membacanya
        </summary>
        <div className="logic-basics-content">
          <p>
            <strong>Proposisi</strong> adalah pernyataan yang dapat dinilai benar
            atau salah. Huruf p, q, r, dan s mewakili pernyataan. Pertanyaan atau
            perintah bukan proposisi.
          </p>
          <p>
            <strong>Premis</strong> adalah dasar argumen.{' '}
            <strong>Kesimpulan</strong> adalah pernyataan yang ditarik dari
            premis. Tanda <code>⊢</code> dibaca “dapat diturunkan”; bukan operator
            yang sama dengan <code>→</code> atau <code>↔</code>. Kita menguji apakah
            penurunan itu sah melalui semua kombinasi benar/salah.
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
  );
}
