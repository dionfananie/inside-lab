import { ArrowRight, Check } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { rules, sequent } from '../rules';

type RuleReferenceProps = {
  chooseRule: (index: number) => void;
  selected: number;
};

export default function RuleReference({
  chooseRule,
  selected,
}: RuleReferenceProps) {
  return (
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
            {rules.map((rule, index) => (
              <TableRow
                key={rule.name}
                data-state={selected === index ? 'selected' : undefined}
              >
                <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="logic-rule-button"
                    aria-pressed={selected === index}
                    onClick={() => chooseRule(index)}
                  >
                    {rule.name}
                    {selected === index ? (
                      <Check size={15} />
                    ) : (
                      <ArrowRight size={15} />
                    )}
                  </Button>
                  <code className="logic-rule-formula">{sequent(rule)}</code>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="logic-help logic-reference-note">
        <code>p, q ⊢ p ∧ q</code> memakai dua premis terpisah. Untuk menghitung
        tabel, keduanya digabung sebagai <code>p ∧ q</code>. Bentuk tanpa premis
        diuji sebagai pernyataan yang selalu benar.
      </p>
    </section>
  );
}
