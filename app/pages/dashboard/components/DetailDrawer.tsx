import { useEffect } from 'react';
import { X } from 'lucide-react';

import type { AnswerDetail, DashboardSession } from '../types';
import { displayName, formatDateTime, sessionLabel } from '../data';

type DetailDrawerProps = {
  answer: AnswerDetail | null;
  sessions: DashboardSession[];
  onClose: () => void;
};

export default function DetailDrawer({ answer, sessions, onClose }: DetailDrawerProps) {
  useEffect(() => {
    if (!answer) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [answer, onClose]);

  if (!answer) return null;

  const topic = sessions.find((s) => s.session === answer.sessionId)?.topic ?? '';

  return (
    <div className="dashboard-drawer-backdrop">
      <div
        className="dashboard-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="dashboard-drawer-head">
          <div>
            <span className="dashboard-drawer-label">DETAIL JAWABAN</span>
            <h2 id="drawer-title">
              {sessionLabel(answer.sessionId)} · Soal {answer.questionNumber}
            </h2>
          </div>
          <button
            className="dashboard-drawer-close"
            type="button"
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <dl className="dashboard-drawer-meta">
          <div>
            <dt>Pengguna</dt>
            <dd>{displayName(answer.userName, answer.userEmail)} ({answer.userEmail})</dd>
          </div>
          <div>
            <dt>Sesi</dt>
            <dd>{sessionLabel(answer.sessionId)} — {topic}</dd>
          </div>
          <div>
            <dt>Tipe</dt>
            <dd>{answer.answerType === 'multiple_choice' ? 'Pilihan ganda' : 'Esai'}</dd>
          </div>
          <div>
            <dt>Hasil</dt>
            <dd>
              {answer.answerType === 'essay'
                ? 'Belum dinilai'
                : answer.isCorrect === true
                  ? 'Benar'
                  : answer.isCorrect === false
                    ? 'Salah'
                    : 'Belum dinilai'}
            </dd>
          </div>
          <div>
            <dt>Waktu submit</dt>
            <dd>{formatDateTime(answer.submittedAt)}</dd>
          </div>
          <div>
            <dt>Submission ID</dt>
            <dd>{answer.submissionId}</dd>
          </div>
        </dl>

        <div className="dashboard-drawer-body">
          <h3>Soal</h3>
          <p>{answer.question}</p>
          <h3>Jawaban</h3>
          <p>{answer.answer}</p>
        </div>
      </div>
    </div>
  );
}
