import { useState } from 'react';

import type { AnswerDetail, DashboardSession } from './types';
import { useDashboard } from './useDashboard';
import AccessState from './components/AccessState';
import AnswerTable from './components/AnswerTable';
import DashboardFilters from './components/DashboardFilters';
import DashboardFooter from './components/DashboardFooter';
import DashboardHeader from './components/DashboardHeader';
import DetailDrawer from './components/DetailDrawer';
import Leaderboard from './components/Leaderboard';
import Pagination from './components/Pagination';
import ScoreTable from './components/ScoreTable';
import SummaryCards from './components/SummaryCards';
import UserTable from './components/UserTable';

type DashboardPageProps = {
  sessions: DashboardSession[];
};

const TABS = [
  { id: 'users' as const, label: 'Pengguna' },
  { id: 'scores' as const, label: 'Skor per Sesi' },
  { id: 'answers' as const, label: 'Jawaban per Sesi' },
];

export default function DashboardPage({ sessions }: DashboardPageProps) {
  const model = useDashboard();
  const [detailAnswer, setDetailAnswer] = useState<AnswerDetail | null>(null);

  function openUserScores(email: string) {
    model.changeTab('scores');
    model.updateFilter({ search: email, sessionId: '', role: 'all' });
  }

  function openUserAnswers(email: string) {
    model.changeTab('answers');
    model.updateFilter({ search: email, sessionId: '', role: 'all' });
  }

  function openSessionAnswers(email: string, sessionId: number) {
    model.changeTab('answers');
    model.updateFilter({ search: email, sessionId: String(sessionId), role: 'all' });
  }

  return (
    <main className="dashboard-page">
      <DashboardHeader />

      {model.status !== 'ready' ? (
        <AccessState status={model.status} error={model.error} onRetry={model.retry} />
      ) : (
        <>
          <section className="dashboard-hero">
            <div className="dashboard-section-label">INSIDELAB / DASHBOARD</div>
            <h1>Dashboard insideLab</h1>
            <p>Data pengguna, kunjungan sesi, skor, dan jawaban knowledge check.</p>
          </section>

          <div className="dashboard-container">
            <SummaryCards summary={model.summary} />

            <Leaderboard users={model.leaderboard} />

            <section className="dashboard-section" aria-label="Data pengguna">
              <div className="dashboard-tabs" role="tablist" aria-label="Jenis data">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={model.tab === tab.id}
                    className={model.tab === tab.id ? 'is-active' : ''}
                    onClick={() => model.changeTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <DashboardFilters
                tab={model.tab}
                search={model.search}
                role={model.role}
                sessionId={model.sessionId}
                type={model.type}
                result={model.result}
                sort={model.sort}
                sessions={sessions}
                onChange={model.updateFilter}
              />

              <div className={model.loading ? 'dashboard-data is-loading' : 'dashboard-data'}>
                {model.tab === 'users' && (
                  <>
                    <UserTable
                      users={model.users}
                      onViewScores={openUserScores}
                      onViewAnswers={openUserAnswers}
                    />
                    <Pagination
                      pagination={model.usersPagination}
                      limit={model.limit}
                      onPageChange={model.changePage}
                      onLimitChange={model.changeLimit}
                    />
                  </>
                )}

                {model.tab === 'scores' && (
                  <>
                    <ScoreTable
                      scores={model.scores}
                      sessions={sessions}
                      onViewAnswers={openSessionAnswers}
                    />
                    <Pagination
                      pagination={model.scoresPagination}
                      limit={model.limit}
                      onPageChange={model.changePage}
                      onLimitChange={model.changeLimit}
                    />
                  </>
                )}

                {model.tab === 'answers' && (
                  <>
                    <AnswerTable
                      answers={model.answers}
                      sessions={sessions}
                      onOpenDetail={setDetailAnswer}
                    />
                    <Pagination
                      pagination={model.answersPagination}
                      limit={model.limit}
                      onPageChange={model.changePage}
                      onLimitChange={model.changeLimit}
                    />
                  </>
                )}

                {model.error && <p className="dashboard-inline-error">{model.error}</p>}
              </div>
            </section>
          </div>
        </>
      )}

      <DetailDrawer
        answer={detailAnswer}
        sessions={sessions}
        onClose={() => setDetailAnswer(null)}
      />

      <DashboardFooter />
    </main>
  );
}
