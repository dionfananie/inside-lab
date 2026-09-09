import LogicHeader from './components/LogicHeader';
import LogicIntroduction from './components/LogicIntroduction';
import LogicPlayground from './components/LogicPlayground';
import RuleReference from './components/RuleReference';
import useLogicLab from './useLogicLab';

export default function LogicLab() {
  const logicLab = useLogicLab();

  return (
    <main className="logic-app">
      <LogicHeader />
      <LogicIntroduction />
      <div className="logic-workspace">
        <RuleReference
          chooseRule={logicLab.chooseRule}
          selected={logicLab.selected}
        />
        <LogicPlayground logicLab={logicLab} />
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {logicLab.announcement}
      </p>
    </main>
  );
}
