import { ArrowRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '~/components/ui/native-select';
import { Switch } from '~/components/ui/switch';
import { scenarios, rules } from '../rules';
import { truth } from '../helpers';
import type useLogicLab from '../useLogicLab';
import AnalysisResults from './AnalysisResults';
import FormulaEditor from './FormulaEditor';

type LogicPlaygroundProps = {
  logicLab: ReturnType<typeof useLogicLab>;
};

export default function LogicPlayground({
  logicLab,
}: LogicPlaygroundProps) {
  const {
    active,
    chooseRule,
    modified,
    playgroundTitle,
    rule,
    scenario,
    selectScenario,
    selected,
    sentences,
    updateSentence,
    updateValue,
    values,
  } = logicLab;

  return (
    <section
      className="logic-playground"
      aria-labelledby="playground-title"
    >
      <div className="logic-section-label">02 / COBA & AMATI</div>
      <div className="logic-playground-heading">
        <h2 id="playground-title" tabIndex={-1} ref={playgroundTitle}>
          {String(selected + 1).padStart(2, '0')} · {rule.name}
        </h2>
        <span className="logic-badge">
          {modified ? 'Rumus diubah' : 'Bentuk acuan'}
        </span>
      </div>
      <p className="logic-help">
        {modified
          ? 'Rumusmu berbeda dari acuan. Baca hasil pemeriksaan di bawah; perubahan satu simbol dapat mengubah validitas argumen.'
          : rule.explanation}
      </p>
      <div className="logic-scenario">
        <label htmlFor="scenario">Contoh kalimat</label>
        <NativeSelect
          id="scenario"
          value={scenario}
          onChange={(event) => selectScenario(event.target.value)}
        >
          {scenario === 'custom' && (
            <NativeSelectOption value="custom" disabled>
              Kalimat sendiri
            </NativeSelectOption>
          )}
          {scenarios.map((currentScenario, index) => (
            <NativeSelectOption
              key={currentScenario.name}
              value={String(index)}
            >
              {currentScenario.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <p className="logic-help">
        Edit kalimat dan tentukan nilainya untuk simulasi. Aplikasi tidak menilai
        kebenaran kalimat secara otomatis.
      </p>
      {active.length === 0 && (
        <p className="logic-help">
          Rumus ini hanya memakai konstanta; tidak ada pernyataan yang perlu
          diatur.
        </p>
      )}
      {active.map((variable) => (
        <div className="logic-atom" key={variable}>
          <label htmlFor={'atom-' + variable}>{variable}</label>
          <Input
            id={'atom-' + variable}
            aria-label={'Kalimat untuk ' + variable}
            value={sentences[variable]}
            maxLength={120}
            onChange={(event) =>
              updateSentence(variable, event.target.value)
            }
          />
          <label className="logic-toggle">
            <Switch
              checked={values[variable]}
              onCheckedChange={(value) => updateValue(variable, value)}
              aria-label={'Nilai kebenaran ' + variable}
            />
            {truth(values[variable])}
          </label>
        </div>
      ))}
      <FormulaEditor logicLab={logicLab} />
      <AnalysisResults logicLab={logicLab} />
      <div className="logic-next">
        <span>
          {selected + 1} dari {rules.length} bentuk argumen
        </span>
        <Button
          variant="outline"
          onClick={() => chooseRule((selected + 1) % rules.length)}
        >
          {selected === rules.length - 1
            ? 'Kembali ke bentuk pertama'
            : 'Contoh berikutnya'}
          <ArrowRight size={16} />
        </Button>
      </div>
    </section>
  );
}
