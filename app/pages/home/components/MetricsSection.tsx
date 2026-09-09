type MetricsSectionProps = {
  chapterCount: number;
  totalParts: number;
  totalExercises: number;
  ruleCount: number;
};

export default function MetricsSection({
  chapterCount,
  totalParts,
  totalExercises,
  ruleCount,
}: MetricsSectionProps) {
  return (
    <section className="home-metrics" aria-label="Cakupan materi insideLab">
      <div>
        <strong>{chapterCount}</strong>
        <span>Bab JavaScript</span>
      </div>
      <div>
        <strong>{totalParts}</strong>
        <span>Bagian materi</span>
      </div>
      <div>
        <strong>{totalExercises}</strong>
        <span>Latihan bertahap</span>
      </div>
      <div>
        <strong>{ruleCount}</strong>
        <span>Bentuk argumen</span>
      </div>
    </section>
  );
}
