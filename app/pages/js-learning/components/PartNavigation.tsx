import { BookOpen, Check } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { NativeSelect, NativeSelectOption } from '~/components/ui/native-select';
import type { LearningPageModel } from '../useLearningPage';

interface PartNavigationProps {
  learning: LearningPageModel;
}

export function PartNavigation({ learning }: PartNavigationProps) {
  const { completed, navigate, partIndex, parts, storageError } = learning;
  return (
    <div className="part-bar">
      <div className="part-picker">
        <BookOpen size={16} />
        <NativeSelect
          aria-label="Pilih bagian"
          value={String(partIndex)}
          onChange={(e) => {
            navigate(Number(e.target.value), 0);
          }}
        >
          {parts.map((p, i) => (
            <NativeSelectOption key={p.id} value={String(i)}>
              {String(i + 1).padStart(2, '0')} · {p.title}
              {p.exercises.every((e) => completed.includes(e.id)) ? ' ✓' : ''}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <div className="part-dots" aria-label="Urutan bagian">
        {parts.map((p, i) => (
          <Button
            key={p.id}
            variant="ghost"
            className={'part-dot ' + (i === partIndex ? 'current' : '')}
            aria-label={'Bagian ' + (i + 1) + ': ' + p.title}
            aria-current={i === partIndex ? 'step' : undefined}
            title={p.title}
            onClick={() => {
              navigate(i, 0);
            }}
          >
            {p.exercises.every((e) => completed.includes(e.id)) ? (
              <Check size={13} />
            ) : (
              i + 1
            )}
          </Button>
        ))}
      </div>
      <span className="save-status">
        {storageError
          ? 'Kemajuan belajar belum tersimpan. Jangan tutup halaman.'
          : 'Disimpan di browser ini'}
      </span>
    </div>
  );
}
