type MetricsSectionProps = {
  chapterCount: number;
  totalParts: number;
  totalExercises: number;
  logicSessionCount: number;
};

export default function MetricsSection({
  chapterCount,
  totalParts,
  totalExercises,
  logicSessionCount,
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
        <strong>{logicSessionCount}</strong>
        <span>Sesi computational logic</span>
      </div>
    </section>
  );
}
