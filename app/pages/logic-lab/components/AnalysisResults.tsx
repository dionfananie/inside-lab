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
import { verbalize } from '~/lib/propositional-logic';
import { truth } from '../helpers';
import type useLogicLab from '../useLogicLab';

type AnalysisResultsProps = {
  logicLab: ReturnType<typeof useLogicLab>;
};

export default function AnalysisResults({ logicLab }: AnalysisResultsProps) {
  const {
    active,
    analysis,
    counterexamples,
    current,
    noPremise,
    rows,
    selectRow,
    sentences,
    values,
  } = logicLab;

  if (
    analysis.error ||
    !analysis.premise ||
    !analysis.conclusion ||
    !current
  ) {
    return null;
  }

  return (
    <>
      <div className="logic-reading">
        <h3>Rumus dibaca sebagai kalimat</h3>
        <dl>
          <dt>Premis</dt>
          <dd>
            {noPremise
              ? 'Tanpa premis.'
              : verbalize(analysis.premise, sentences) + '.'}
          </dd>
          <dt>Kesimpulan</dt>
          <dd>{verbalize(analysis.conclusion, sentences) + '.'}</dd>
        </dl>
      </div>
      <div
        className={
          'logic-outcome ' +
          (current.counterexample ? 'logic-counterexample' : '')
        }
        role="status"
        aria-live="polite"
      >
        <strong>
          {current.counterexample
            ? 'Ada contoh penyangkal pada keadaan ini'
            : !current.premise
              ? 'Premis belum terpenuhi pada keadaan ini'
              : 'Kesimpulan benar pada keadaan ini'}
        </strong>
        <p>
          {noPremise ? 'Tanpa premis' : 'Premis: ' + truth(current.premise)}{' '}
          · Kesimpulan: {truth(current.conclusion)}
        </p>
        <p>
          {current.counterexample
            ? 'Premis benar, tetapi kesimpulan salah. Satu keadaan ini cukup untuk menunjukkan argumen tidak valid.'
            : !current.premise
              ? 'Premis yang salah tidak membantah bentuk argumen. Nilai kesimpulannya bisa benar maupun salah.'
              : 'Lihat semua baris di bawah untuk memeriksa validitas, bukan hanya keadaan yang dipilih.'}
        </p>
      </div>
      <div className="logic-truth-heading">
        <h3>Tabel kebenaran</h3>
        <span>
          {rows.length} kombinasi · {active.length} pernyataan
        </span>
      </div>
      <p className="logic-help">
        B = benar, S = salah. “Penyangkal” berarti premis benar dan kesimpulan
        salah. Klik Coba untuk mengatur nilai sesuai baris tersebut.
      </p>
      <div className="logic-truth-table">
        <Table>
          <TableCaption>
            {counterexamples.length
              ? 'Tidak valid: ditemukan ' +
                counterexamples.length +
                ' contoh penyangkal.'
              : rows.every((row) => !row.premise)
                ? 'Valid secara vakum: premis tidak pernah benar. Ini bukan bukti bahwa premis dapat terjadi.'
                : noPremise
                  ? 'Tautologi: kesimpulan benar pada semua kombinasi, tanpa memerlukan premis.'
                  : 'Valid: tidak ada baris dengan premis benar dan kesimpulan salah.'}
          </TableCaption>
          <TableHeader>
            <TableRow>
              {active.map((variable) => (
                <TableHead scope="col" key={variable}>
                  {variable}
                </TableHead>
              ))}
              <TableHead scope="col">
                {noPremise ? 'Tanpa premis' : 'Premis'}
              </TableHead>
              <TableHead scope="col">Kesimpulan</TableHead>
              <TableHead scope="col">Penyangkal?</TableHead>
              <TableHead scope="col">Keadaan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => {
              const chosen = active.every(
                (variable) => row.values[variable] === values[variable],
              );
              return (
                <TableRow
                  key={index}
                  className={row.counterexample ? 'counterexample-row' : ''}
                  data-state={chosen ? 'selected' : undefined}
                >
                  {active.map((variable) => (
                    <TableCell key={variable}>
                      <span
                        className={
                          row.values[variable] ? 'truth-true' : 'truth-false'
                        }
                        aria-label={truth(row.values[variable])}
                      >
                        {row.values[variable] ? 'B' : 'S'}
                      </span>
                    </TableCell>
                  ))}
                  <TableCell>
                    {noPremise ? '—' : row.premise ? 'B' : 'S'}
                  </TableCell>
                  <TableCell>{row.conclusion ? 'B' : 'S'}</TableCell>
                  <TableCell>{row.counterexample ? 'Ya' : 'Tidak'}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-pressed={chosen}
                      aria-label={
                        'Coba baris ' +
                        (index + 1) +
                        ': ' +
                        active
                          .map(
                            (variable) =>
                              variable + ' ' + truth(row.values[variable]),
                          )
                          .join(', ')
                      }
                      onClick={() => selectRow(row)}
                    >
                      {chosen ? 'Dipilih' : 'Coba'}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
