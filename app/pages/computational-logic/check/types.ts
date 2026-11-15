export type MultipleChoiceOption = {
  id: string;
  text: string;
};

export type MultipleChoiceQuestion = {
  number: number;
  prompt: string;
  code?: string;
  list?: string[];
  options: MultipleChoiceOption[];
  correctOptionId: string;
  explanation: string;
};

export type EssayQuestion = {
  number: number;
  prompt: string;
  code?: string;
  list?: string[];
  referenceAnswer: string;
};

export type SessionKnowledgeCheck = {
  multipleChoice: MultipleChoiceQuestion[];
  essay: EssayQuestion;
};
