export interface LearningPageProps {
  chapterId?: string;
}

export type ModelContextDocument = Document & {
  modelContext?: {
    registerTool: (
      tool: unknown,
      options: { signal: AbortSignal },
    ) => unknown;
  };
};
