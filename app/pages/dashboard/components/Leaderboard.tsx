import type { LeaderboardUser } from '../types';
import { displayName, formatScore } from '../data';

type LeaderboardProps = {
  users: LeaderboardUser[];
};

export default function Leaderboard({ users }: LeaderboardProps) {
  return (
    <section className="dashboard-leaderboard" aria-labelledby="leaderboard-title">
      <div className="dashboard-section-head">
        <h2 id="leaderboard-title">Sesi terbanyak</h2>
        <p>Dihitung dari halaman sesi yang pernah dibuka learner.</p>
      </div>

      {users.length === 0 ? (
        <p className="dashboard-empty">Belum ada learner yang membuka halaman sesi.</p>
      ) : (
        <ol className="dashboard-leaderboard-list">
          {users.map((user) => (
            <li className="dashboard-leaderboard-item" key={user.userId}>
              <span className="dashboard-leaderboard-rank">{user.rank}</span>
              <span className="dashboard-leaderboard-name" title={user.userEmail}>
                <strong>{displayName(user.userName, user.userEmail)}</strong>
                <small>{user.userEmail}</small>
              </span>
              <span className="dashboard-leaderboard-stat">
                <strong>{user.sessionsViewed}/{user.totalSessions}</strong>
                <small>sesi dilihat</small>
              </span>
              <span className="dashboard-leaderboard-stat">
                <strong>{formatScore(user.averageScore)}</strong>
                <small>rata-rata skor</small>
              </span>
              <span className="dashboard-leaderboard-stat">
                <strong>{user.totalViews}</strong>
                <small>total views</small>
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
