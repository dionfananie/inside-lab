import { BridgeSection } from "./components/BridgeSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { HeroSection } from "./components/HeroSection";
import { LabFooter } from "./components/LabFooter";
import { LabHeader } from "./components/LabHeader";
import { LanguagesSection } from "./components/LanguagesSection";
import { LearningPathSection } from "./components/LearningPathSection";
import { OutcomesSection } from "./components/OutcomesSection";
import { PracticeLoopSection } from "./components/PracticeLoopSection";
import { SignalSection } from "./components/SignalSection";
import { SkillsSection } from "./components/SkillsSection";
import { useLabPage } from "./useLabPage";

export default function LabPage() {
  const { activeLanguage, setLanguageId } = useLabPage();

  return (
    <main className="lab-page">
      <LabHeader />
      <HeroSection />
      <SignalSection />
      <BridgeSection />
      <LearningPathSection />
      <LanguagesSection
        activeLanguage={activeLanguage}
        setLanguageId={setLanguageId}
      />
      <SkillsSection />
      <PracticeLoopSection />
      <OutcomesSection />
      <FinalCtaSection />
      <LabFooter />
    </main>
  );
}
