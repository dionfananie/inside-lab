CREATE TABLE IF NOT EXISTS check_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  session_id INTEGER NOT NULL,
  submitted_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS check_submission_answers (
  submission_id TEXT NOT NULL REFERENCES check_submissions(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  PRIMARY KEY (submission_id, question_number)
);

CREATE INDEX IF NOT EXISTS idx_check_submissions_user_id ON check_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_check_submissions_session_id ON check_submissions(session_id);
