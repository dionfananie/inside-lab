import type { DashboardSummary } from '../types';
import { formatScore } from '../data';

type SummaryCardsProps = {
  summary: DashboardSummary | null;
};

export default function SummaryCards({ summary }: SummaryCardsProps) {
  if (!summary) return null;

  const cards = [
    { label: 'Total learner', value: String(summary.totalLearners) },
    { label: 'Total admin', value: String(summary.totalAdmins) },
    { label: 'Learner dengan kunjungan sesi', value: String(summary.usersWithViews) },
    { label: 'Total sesi dilihat', value: String(summary.totalSessionViews) },
    { label: 'Total submission', value: String(summary.totalSubmissions) },
    { label: 'Total jawaban', value: String(summary.totalAnswers) },
    { label: 'Rata-rata skor PG learner', value: formatScore(summary.averageScore) },
  ];

  return (
    <div className="dashboard-summary" aria-label="Ringkasan">
      {cards.map((card) => (
        <article className="dashboard-summary-card" key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </article>
      ))}
    </div>
  );
}
