import { chapter as chapterOne, parts as chapterOneParts } from './chapter-one';
import { chapter as chapterTwo, parts as chapterTwoParts } from './chapter-two';
import { chapter as chapterThree, parts as chapterThreeParts } from './chapter-three';
import { chapter as chapterFour, parts as chapterFourParts } from './chapter-four';
import { chapter as chapterFive, parts as chapterFiveParts } from './chapter-five';
import { chapter as chapterSix, parts as chapterSixParts } from './chapter-six';
import { chapter as chapterEight, parts as chapterEightParts } from './chapter-eight';
import { chapter as chapterNine, parts as chapterNineParts } from './chapter-nine';
import { chapter as chapterTen, parts as chapterTenParts } from './chapter-ten';
import { chapter as chapterEleven, parts as chapterElevenParts } from './chapter-eleven';
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
  { ...chapterSix, parts: chapterSixParts },
  { ...chapterEight, parts: chapterEightParts },
  { ...chapterNine, parts: chapterNineParts },
  { ...chapterTen, parts: chapterTenParts },
  { ...chapterEleven, parts: chapterElevenParts },
];
