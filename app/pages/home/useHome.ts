import { useState } from "react";

import { createWebsiteSchema } from "./data";
import type { HomePageProps } from "./types";

export default function useHome({ chapters, firstExercises, origin }: HomePageProps) {
  const [selectedStage, setSelectedStage] = useState(0);

  return {
    firstChapterHref: `/js/${chapters[0].id}`,
    selectedExercise: firstExercises[selectedStage],
    selectedStage,
    setSelectedStage,
    websiteSchema: createWebsiteSchema(origin),
  };
}
