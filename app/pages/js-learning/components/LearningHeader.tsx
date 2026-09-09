import { InsideLabBrand } from '~/components/inside-lab-brand';
import { Progress } from '~/components/ui/progress';
import { NativeSelect, NativeSelectOption } from '~/components/ui/native-select';
import type { LearningPageModel } from '../useLearningPage';

interface LearningHeaderProps {
  learning: LearningPageModel;
}

export function LearningHeader({ learning }: LearningHeaderProps) {
  const { chapter, chapters, completedParts, parts, progress } = learning;
  return (
    <header className="app-header">
      <InsideLabBrand area="JS Learning" />
      <span className="header-divider" />
      <a
        className="learning-path-link"
        href="/computational-logic/proportional-logic"
      >
        Computational Logic ↗
      </a>
      <NativeSelect
        className="chapter-select"
        aria-label="Pilih bab"
        value={chapter.id}
        onChange={(event) => {
          window.location.href = `/js/${event.target.value}`;
        }}
      >
        {chapters.map((item) => (
          <NativeSelectOption value={item.id} key={item.id}>
            {item.number} · {item.title}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <div className="chapter-progress">
        <span>
          <strong>{completedParts}</strong>/{parts.length} bagian
        </span>
        <Progress
          value={progress}
          aria-label={`Kemajuan belajar Bab ${Number(chapter.number)}`}
        />
      </div>
    </header>
  );
}
