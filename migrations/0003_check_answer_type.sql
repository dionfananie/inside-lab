ALTER TABLE check_submission_answers ADD COLUMN answer_type TEXT NOT NULL DEFAULT 'essay';
ALTER TABLE check_submission_answers ADD COLUMN is_correct INTEGER;
