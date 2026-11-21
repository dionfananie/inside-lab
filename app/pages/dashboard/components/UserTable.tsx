import type { DashboardUser } from '../types';
import { displayName, formatDate, formatDateTime, formatScore } from '../data';

type UserTableProps = {
  users: DashboardUser[];
  onViewScores: (email: string) => void;
  onViewAnswers: (email: string) => void;
};

function AccountBadge({ isAdmin }: { isAdmin: boolean }) {
  return isAdmin ? (
    <span className="dashboard-badge dashboard-badge-admin">Admin</span>
  ) : (
    <span className="dashboard-badge dashboard-badge-learner">Learner</span>
  );
}

export default function UserTable({ users, onViewScores, onViewAnswers }: UserTableProps) {
  if (users.length === 0) {
    return <p className="dashboard-empty">Tidak ada pengguna yang cocok.</p>;
  }

  return (
    <div className="dashboard-table-wrap">
      <table className="dashboard-table">
        <caption className="sr-only">Daftar pengguna insideLab</caption>
        <thead>
          <tr>
            <th scope="col">Pengguna</th>
            <th scope="col">Tipe</th>
            <th scope="col">Terdaftar</th>
            <th scope="col">Sesi dilihat</th>
            <th scope="col">Sesi check</th>
            <th scope="col">Submission</th>
            <th scope="col">Rata-rata skor</th>
            <th scope="col">Terakhir aktif</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>
                <div className="dashboard-cell-user">
                  <strong>{displayName(user.name, user.email)}</strong>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
              </td>
              <td><AccountBadge isAdmin={user.isAdmin} /></td>
              <td>{formatDate(user.createdAt)}</td>
              <td>
                {user.sessionsViewed}/7
                {user.sessionsViewed === 7 && <span className="dashboard-badge dashboard-badge-done">Semua</span>}
              </td>
              <td>{user.sessionsChecked}/7</td>
              <td>{user.submissionCount}</td>
              <td>{formatScore(user.averageScore)}</td>
              <td>{formatDateTime(user.lastActiveAt)}</td>
              <td>
                <div className="dashboard-actions">
                  <button type="button" onClick={() => onViewScores(user.email)}>Skor</button>
                  <button type="button" onClick={() => onViewAnswers(user.email)}>Jawaban</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
