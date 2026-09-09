import { RotateCcw } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { formulaSymbols, operators } from '../data';
import type useLogicLab from '../useLogicLab';

type FormulaEditorProps = {
  logicLab: ReturnType<typeof useLogicLab>;
};

export default function FormulaEditor({ logicLab }: FormulaEditorProps) {
  const {
    analysis,
    conclusionInput,
    conclusionText,
    field,
    insertSymbol,
    modified,
    premiseInput,
    premiseText,
    resetFormula,
    setConclusionText,
    setPremiseText,
  } = logicLab;

  return (
    <>
      <div className="logic-formula">
        <div className="logic-formula-head">
          <span>RUMUS YANG BISA DIUBAH</span>
          <Button variant="ghost" disabled={!modified} onClick={resetFormula}>
            <RotateCcw size={14} />
            Pulihkan rumus
          </Button>
        </div>
        <label htmlFor="premise-formula">
          Premis — gabungkan dengan ∧ jika lebih dari satu
        </label>
        <Input
          ref={premiseInput}
          id="premise-formula"
          value={premiseText}
          maxLength={240}
          onFocus={() => {
            field.current = 'premise';
          }}
          onChange={(event) => setPremiseText(event.target.value)}
          aria-invalid={!!analysis.error}
          aria-describedby="formula-help formula-error"
          placeholder="Kosongkan untuk bentuk tanpa premis"
        />
        <div className="logic-turnstile">
          ⊢ <span>dapat diturunkan</span>
        </div>
        <label htmlFor="conclusion-formula">Kesimpulan</label>
        <Input
          ref={conclusionInput}
          id="conclusion-formula"
          value={conclusionText}
          maxLength={240}
          onFocus={() => {
            field.current = 'conclusion';
          }}
          onChange={(event) => setConclusionText(event.target.value)}
          aria-invalid={!!analysis.error}
          aria-describedby="formula-help formula-error"
        />
        <div
          className="logic-symbols"
          aria-label="Sisipkan simbol pada kolom rumus terakhir"
        >
          {formulaSymbols.map((symbol) => (
            <Button
              key={symbol}
              variant="outline"
              aria-label={'Sisipkan ' + symbol}
              title={
                operators.find((operator) => operator[0] === symbol)?.[1] ??
                symbol
              }
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => insertSymbol(symbol)}
            >
              {symbol}
            </Button>
          ))}
        </div>
        <p id="formula-help">
          Klik kolom rumus, lalu ketik atau sisipkan simbol. Bisa juga memakai !,
          &amp;&amp;, ||, -&gt;, &lt;-&gt;. ⊤ selalu benar; ⊥ selalu salah. Urutan: ¬,
          ∧, ∨, →, ↔. Tanda kurung didahulukan; p → q → r dibaca p → (q → r).
        </p>
      </div>
      <div id="formula-error" role="status">
        {analysis.error && <p className="logic-error">{analysis.error}</p>}
      </div>
    </>
  );
}
