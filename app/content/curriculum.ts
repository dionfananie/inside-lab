import { chapter as chapterOne, parts as chapterOneParts } from './chapter-one';
import { chapter as chapterTwo, parts as chapterTwoParts } from './chapter-two';
import { chapter as chapterThree, parts as chapterThreeParts } from './chapter-three';
import { chapter as chapterFour, parts as chapterFourParts } from './chapter-four';
import { chapter as chapterFive, parts as chapterFiveParts } from './chapter-five';
import type { Part } from './chapter-one';

export type Chapter = {
  id: string;
  title: string;
  number: string;
  parts: Part[];
};

export const chapters: Chapter[] = [
  { ...chapterOne, parts: chapterOneParts },
  { ...chapterTwo, parts: chapterTwoParts },
  { ...chapterThree, parts: chapterThreeParts },
  { ...chapterFour, parts: chapterFourParts },
  { ...chapterFive, parts: chapterFiveParts },
];
