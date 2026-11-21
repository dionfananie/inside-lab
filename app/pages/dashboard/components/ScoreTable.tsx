import type { DashboardSession, SessionScore } from '../types';
import { displayName, formatDateTime, formatScore, sessionLabel } from '../data';

type ScoreTableProps = {
  scores: SessionScore[];
  sessions: DashboardSession[];
  onViewAnswers: (email: string, sessionId: number) => void;
};

export default function ScoreTable({ scores, sessions, onViewAnswers }: ScoreTableProps) {
  if (scores.length === 0) {
    return <p className="dashboard-empty">Belum ada skor knowledge check.</p>;
  }

  return (
    <div className="dashboard-table-wrap">
      <table className="dashboard-table">
        <caption className="sr-only">Skor per sesi</caption>
        <thead>
          <tr>
            <th scope="col">Pengguna</th>
            <th scope="col">Tipe</th>
            <th scope="col">Sesi</th>
            <th scope="col">Percobaan</th>
            <th scope="col">Skor terbaru</th>
            <th scope="col">Skor terbaik</th>
            <th scope="col">Benar / Total</th>
            <th scope="col">Esai</th>
            <th scope="col">Terakhir</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => {
            const topic = sessions.find((s) => s.session === score.sessionId)?.topic ?? '';
            return (
              <tr key={`${score.userId}-${score.sessionId}`}>
                <td>
                  <div className="dashboard-cell-user">
                    <strong>{displayName(score.userName, score.userEmail)}</strong>
                    <span>{score.userEmail}</span>
                  </div>
                </td>
                <td>
                  {score.isAdmin ? (
                    <span className="dashboard-badge dashboard-badge-admin">Admin</span>
                  ) : (
                    <span className="dashboard-badge dashboard-badge-learner">Learner</span>
                  )}
                </td>
                <td>
                  <div className="dashboard-cell-user">
                    <strong>{sessionLabel(score.sessionId)}</strong>
                    <span>{topic}</span>
                  </div>
                </td>
                <td>{score.attempts}</td>
                <td>{formatScore(score.latestScore)}</td>
                <td>{formatScore(score.bestScore)}</td>
                <td>
                  {score.bestTotal > 0 ? `${score.bestCorrect} / ${score.bestTotal}` : '—'}
                </td>
                <td>
                  {score.essaySubmitted ? (
                    <span className="dashboard-badge dashboard-badge-neutral">Terkirim</span>
                  ) : (
                    '—'
                  )}
                </td>
                <td>{formatDateTime(score.lastSubmittedAt)}</td>
                <td>
                  <button
                    className="dashboard-link-button"
                    type="button"
                    onClick={() => onViewAnswers(score.userEmail, score.sessionId)}
                  >
                    Jawaban
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
