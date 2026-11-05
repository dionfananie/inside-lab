import {
  knowledgeCheckGroups,
  type KnowledgeCheckGroup,
} from "../sessions/session-1/data";

export { answerRubrics } from "../sessions/session-1/rubrics";
export type {
  KnowledgeCheckGroup,
  KnowledgeCheckQuestion,
} from "../sessions/session-1/data";

export const checkBySession: Record<number, KnowledgeCheckGroup[]> = {
  1: knowledgeCheckGroups,
};

export function getCheck(sessionId: number) {
  return checkBySession[sessionId];
}
