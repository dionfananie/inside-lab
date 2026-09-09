import { LearningHeader } from './components/LearningHeader';
import { LessonNavigation } from './components/LessonNavigation';
import { LessonPane } from './components/LessonPane';
import { PartNavigation } from './components/PartNavigation';
import { PracticePane } from './components/PracticePane';
import { ResetCodeDialog } from './components/ResetCodeDialog';
import useLearningPage from './useLearningPage';
import type { LearningPageProps } from './types';

export default function View(props: LearningPageProps) {
  const learning = useLearningPage(props);

  return (
    <main className="learning-app">
      <LearningHeader learning={learning} />
      <PartNavigation learning={learning} />
      <div className="learning-grid">
        <LessonPane learning={learning} />
        <PracticePane learning={learning} />
      </div>
      <LessonNavigation learning={learning} />
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {learning.arrival}
      </p>
      <ResetCodeDialog learning={learning} />
    </main>
  );
}
