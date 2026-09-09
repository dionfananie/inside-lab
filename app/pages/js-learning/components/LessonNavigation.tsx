import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type { LearningPageModel } from '../useLearningPage';

interface LessonNavigationProps {
  learning: LearningPageModel;
}

export function LessonNavigation({ learning }: LessonNavigationProps) {
  const {
    allExercises,
    completed,
    exerciseIndex,
    go,
    last,
    navigate,
    partIndex,
  } = learning;
  return (
    <nav className="lesson-navigation" aria-label="Navigasi latihan">
      <Button
        variant="ghost"
        disabled={partIndex === 0 && exerciseIndex === 0}
        onClick={() => go(-1)}
      >
        <ArrowLeft />
        Sebelumnya
      </Button>
      <span>
        {completed.length}/{allExercises.length} latihan selesai
      </span>
      {last ? (
        <Button
          variant="outline"
          onClick={() => {
            const missing = allExercises.findIndex(
              (e) => !completed.includes(e.id),
            );
            const index = missing === -1 ? 0 : missing;
            navigate(Math.floor(index / 3), index % 3);
          }}
        >
          {completed.length === allExercises.length
            ? 'Pelajari lagi dari awal'
            : 'Lanjutkan latihan tersisa'}
          <ArrowRight />
        </Button>
      ) : (
        <Button variant="outline" onClick={() => go(1)}>
          Berikutnya
          <ArrowRight />
        </Button>
      )}
    </nav>
  );
}
