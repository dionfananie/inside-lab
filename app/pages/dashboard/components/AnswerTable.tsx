import type { AnswerDetail, DashboardSession } from '../types';
import { displayName, formatDateTime, sessionLabel } from '../data';

type AnswerTableProps = {
  answers: AnswerDetail[];
  sessions: DashboardSession[];
  onOpenDetail: (answer: AnswerDetail) => void;
};

function ResultBadge({ isCorrect }: { isCorrect: boolean | null }) {
  if (isCorrect === true) return <span className="dashboard-badge dashboard-badge-correct">Benar</span>;
  if (isCorrect === false) return <span className="dashboard-badge dashboard-badge-wrong">Salah</span>;
  return <span className="dashboard-badge dashboard-badge-neutral">Terkirim</span>;
}

export default function AnswerTable({ answers, sessions, onOpenDetail }: AnswerTableProps) {
  if (answers.length === 0) {
    return <p className="dashboard-empty">Belum ada jawaban knowledge check.</p>;
  }

  return (
    <div className="dashboard-table-wrap">
      <table className="dashboard-table">
        <caption className="sr-only">Detail jawaban knowledge check</caption>
        <thead>
          <tr>
            <th scope="col">Waktu</th>
            <th scope="col">Pengguna</th>
            <th scope="col">Tipe</th>
            <th scope="col">Sesi</th>
            <th scope="col">No.</th>
            <th scope="col">Jenis</th>
            <th scope="col">Soal</th>
            <th scope="col">Jawaban</th>
            <th scope="col">Hasil</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer) => {
            const topic = sessions.find((s) => s.session === answer.sessionId)?.topic ?? '';
            return (
              <tr key={`${answer.submissionId}-${answer.questionNumber}`}>
                <td>{formatDateTime(answer.submittedAt)}</td>
                <td>
                  <div className="dashboard-cell-user">
                    <strong>{displayName(answer.userName, answer.userEmail)}</strong>
                    <span>{answer.userEmail}</span>
                  </div>
                </td>
                <td>
                  {answer.isAdmin ? (
                    <span className="dashboard-badge dashboard-badge-admin">Admin</span>
                  ) : (
                    <span className="dashboard-badge dashboard-badge-learner">Learner</span>
                  )}
                </td>
                <td>
                  <div className="dashboard-cell-user">
                    <strong>{sessionLabel(answer.sessionId)}</strong>
                    <span>{topic}</span>
                  </div>
                </td>
                <td>{answer.questionNumber}</td>
                <td>{answer.answerType === 'multiple_choice' ? 'PG' : 'Esai'}</td>
                <td className="dashboard-clamp">{answer.question}</td>
                <td className="dashboard-clamp">{answer.answer}</td>
                <td><ResultBadge isCorrect={answer.isCorrect} /></td>
                <td>
                  <button
                    className="dashboard-link-button"
                    type="button"
                    onClick={() => onOpenDetail(answer)}
                  >
                    Detail
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
