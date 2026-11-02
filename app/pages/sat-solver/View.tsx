import SatHeader from './components/SatHeader';
import SatIntroduction from './components/SatIntroduction';
import SentenceInput from './components/SentenceInput';
import ClauseList from './components/ClauseList';
import SatResult from './components/SatResult';
import useSatSolver from './useSatSolver';

export default function SatSolverPage() {
  const sat = useSatSolver();

  return (
    <main className="logic-app sat-app">
      <SatHeader />
      <SatIntroduction />
      <div className="logic-workspace sat-layout">
        <div className="logic-reference sat-input-area">
          <SentenceInput sat={sat} />
          <SatResult sat={sat} />
        </div>
        <div className="logic-playground sat-clause-area">
          <ClauseList sat={sat} />
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {sat.announcement}
      </p>
    </main>
  );
}
