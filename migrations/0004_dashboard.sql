CREATE TABLE IF NOT EXISTS session_views (
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  session_id INTEGER NOT NULL,
  first_viewed_at INTEGER NOT NULL,
  last_viewed_at INTEGER NOT NULL,
  view_count INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (user_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_session_views_user_id
ON session_views(user_id);

CREATE INDEX IF NOT EXISTS idx_session_views_session_id
ON session_views(session_id);

CREATE INDEX IF NOT EXISTS idx_session_views_last_viewed
ON session_views(last_viewed_at DESC);

CREATE INDEX IF NOT EXISTS idx_check_submissions_user_session_submitted
ON check_submissions(user_id, session_id, submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_check_submissions_session_submitted
ON check_submissions(session_id, submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_users_created_at
ON users(created_at DESC);
