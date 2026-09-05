import type { Part } from '~/content/chapter-one';

export type LearningStep = {
  kind: 'exercise' | 'part' | 'remaining' | 'complete';
  label: string;
  description: string;
  target: { partIndex: number; exerciseIndex: number } | null;
  href?: string | null;
};

type ChapterFlow = {
  chapterNumber?: string;
  totalExercises?: number;
  nextChapter?: { number: string; title: string; href: string } | null;
};

// Only call this to continue after the current answer has passed validation.
export function nextLearningStep(
  parts: Part[],
  partIndex: number,
  exerciseIndex: number,
  completed: string[],
  chapterFlow: ChapterFlow = {},
): LearningStep {
  const done = new Set(completed);
  const part = parts[partIndex];
  if (parts.every((p) => p.exercises.every((e) => done.has(e.id)))) {
    const chapterNumber = chapterFlow.chapterNumber ?? '01';
    const totalExercises = chapterFlow.totalExercises ?? completed.length;
    const next = chapterFlow.nextChapter;
    return {
      kind: 'complete',
      label: next ? `Ke Bab ${Number(next.number)}` : 'Semua bab selesai',
      target: null,
      href: next?.href ?? null,
      description: next
        ? `Semua ${totalExercises} latihan Bab ${Number(chapterNumber)} selesai. Berikutnya: Bab ${Number(next.number)} · ${next.title}.`
        : `Semua ${totalExercises} latihan Bab ${Number(chapterNumber)} selesai. Kamu sudah menuntaskan seluruh jalur JS Learning.`,
    };
  }
  const later = part.exercises.findIndex(
    (e, i) => i > exerciseIndex && !done.has(e.id),
  );
  const missing =
    later >= 0 ? later : part.exercises.findIndex((e) => !done.has(e.id));
  if (missing >= 0) {
    return {
      kind: missing > exerciseIndex ? 'exercise' : 'remaining',
      label:
        missing > exerciseIndex
          ? 'Latihan selanjutnya'
          : 'Selesaikan latihan tersisa',
      description: `Berikutnya: latihan ${missing + 1} dari ${part.exercises.length} · ${part.exercises[missing].title}.`,
      target: { partIndex, exerciseIndex: missing },
    };
  }
  // Continue to the next unfinished section; wrap only for earlier skipped work.
  const order = [...parts.keys()]
    .filter((i) => i > partIndex)
    .concat([...parts.keys()].filter((i) => i < partIndex));
  const next = order.find((i) =>
    parts[i].exercises.some((e) => !done.has(e.id)),
  )!;
  const index = parts[next].exercises.findIndex((e) => !done.has(e.id));
  return {
    kind: next > partIndex ? 'part' : 'remaining',
    label:
      next > partIndex ? 'Bagian selanjutnya' : 'Selesaikan bagian tersisa',
    description: `Tujuan: Bagian ${next + 1} · ${parts[next].title}.`,
    target: { partIndex: next, exerciseIndex: index },
  };
}
