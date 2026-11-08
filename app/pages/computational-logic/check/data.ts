import {
  knowledgeCheckGroups as sessionOneGroups,
  type KnowledgeCheckGroup,
} from "../sessions/session-1/data";
import { answerRubrics as sessionOneRubrics } from "../sessions/session-1/rubrics";
import { knowledgeCheckGroups as sessionTwoGroups } from "../sessions/session-2/data";
import { answerRubrics as sessionTwoRubrics } from "../sessions/session-2/rubrics";
import { knowledgeCheckGroups as sessionThreeGroups } from "../sessions/session-3/data";
import { answerRubrics as sessionThreeRubrics } from "../sessions/session-3/rubrics";
import { knowledgeCheckGroups as sessionFourGroups } from "../sessions/session-4/data";
import { answerRubrics as sessionFourRubrics } from "../sessions/session-4/rubrics";
import type { AnswerRubric } from "../sessions/session-1/rubrics";

export type { KnowledgeCheckGroup, KnowledgeCheckQuestion } from "../sessions/session-1/data";
export type { AnswerRubric } from "../sessions/session-1/rubrics";

export type SessionCheck = {
  groups: KnowledgeCheckGroup[];
  rubrics: Record<number, AnswerRubric>;
};

export const checkBySession: Record<number, SessionCheck> = {
  1: { groups: sessionOneGroups, rubrics: sessionOneRubrics },
  2: { groups: sessionTwoGroups, rubrics: sessionTwoRubrics },
  3: { groups: sessionThreeGroups, rubrics: sessionThreeRubrics },
  4: { groups: sessionFourGroups, rubrics: sessionFourRubrics },
};

export function getCheck(sessionId: number) {
  return checkBySession[sessionId];
}
