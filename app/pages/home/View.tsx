import CurriculumSection from "./components/CurriculumSection";
import FinalSection from "./components/FinalSection";
import HeroSection from "./components/HeroSection";
import HomeFooter from "./components/HomeFooter";
import HomeHeader from "./components/HomeHeader";
import LabsSection from "./components/LabsSection";
import MethodSection from "./components/MethodSection";
import MetricsSection from "./components/MetricsSection";
import type { HomePageProps } from "./types";
import useHome from "./useHome";

export default function HomePage(props: HomePageProps) {
  const {
    chapters,
    firstExercises,
    totalParts,
    totalExercises,
    ruleCount,
  } = props;
  const {
    firstChapterHref,
    selectedExercise,
    selectedStage,
    setSelectedStage,
    websiteSchema,
  } = useHome(props);

  return (
    <main className="home-page">
      {websiteSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      )}
      <HomeHeader firstChapterHref={firstChapterHref} />
      <HeroSection firstChapterHref={firstChapterHref} />
      <MetricsSection
        chapterCount={chapters.length}
        totalParts={totalParts}
        totalExercises={totalExercises}
        ruleCount={ruleCount}
      />
      <MethodSection
        firstExercises={firstExercises}
        selectedExercise={selectedExercise}
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
      />
      <CurriculumSection chapters={chapters} />
      <LabsSection
        firstChapterHref={firstChapterHref}
        totalExercises={totalExercises}
      />
      <FinalSection firstChapterHref={firstChapterHref} />
      <HomeFooter firstChapterHref={firstChapterHref} />
    </main>
  );
}
