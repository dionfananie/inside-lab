import { getAdminEmailSet, requireAdmin } from '../lib/admin';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const MAX_SESSION_ID = 7;

const SCORE_CTES = `
  submission_scores AS (
    SELECT
      cs.id,
      cs.user_id,
      cs.session_id,
      cs.submitted_at,
      SUM(CASE WHEN csa.answer_type = 'multiple_choice' THEN 1 ELSE 0 END) AS mc_total,
      SUM(CASE WHEN csa.answer_type = 'multiple_choice' AND csa.is_correct = 1 THEN 1 ELSE 0 END) AS mc_correct,
      SUM(CASE WHEN csa.answer_type = 'essay' THEN 1 ELSE 0 END) AS essay_total
    FROM check_submissions cs
    JOIN check_submission_answers csa ON csa.submission_id = cs.id
    GROUP BY cs.id, cs.user_id, cs.session_id, cs.submitted_at
  ),
  ranked AS (
    SELECT
      s.*,
      ROW_NUMBER() OVER (
        PARTITION BY s.user_id, s.session_id
        ORDER BY s.submitted_at DESC
      ) AS rn_latest,
      ROW_NUMBER() OVER (
        PARTITION BY s.user_id, s.session_id
        ORDER BY (s.mc_correct * 1.0 / NULLIF(s.mc_total, 0)) DESC, s.submitted_at DESC
      ) AS rn_best
    FROM submission_scores s
  ),
  session_scores AS (
    SELECT
      r.user_id,
      r.session_id,
      COUNT(*) AS attempts,
      MAX(CASE WHEN r.rn_latest = 1 THEN r.mc_correct END) AS latest_correct,
      MAX(CASE WHEN r.rn_latest = 1 THEN r.mc_total END) AS latest_total,
      MAX(CASE WHEN r.rn_best = 1 THEN r.mc_correct END) AS best_correct,
      MAX(CASE WHEN r.rn_best = 1 THEN r.mc_total END) AS best_total,
      MAX(CASE WHEN r.rn_latest = 1 THEN r.submitted_at END) AS last_submitted_at,
      MAX(r.essay_total) AS essay_total
    FROM ranked r
    GROUP BY r.user_id, r.session_id
  )
`;

type AdminFilter = { clause: string; params: string[] };

function roleFilter(admins: Set<string>, role: string): AdminFilter {
  if (role === 'admin') {
    if (admins.size === 0) return { clause: '1 = 0', params: [] };
    const ph = Array.from(admins).map(() => '?').join(', ');
    return { clause: `u.email IN (${ph})`, params: Array.from(admins) };
  }
  if (role === 'learner') {
    if (admins.size === 0) return { clause: '1 = 1', params: [] };
    const ph = Array.from(admins).map(() => '?').join(', ');
    return { clause: `u.email NOT IN (${ph})`, params: Array.from(admins) };
  }
  return { clause: '1 = 1', params: [] };
}

function excludeAdmins(admins: Set<string>): AdminFilter {
  if (admins.size === 0) return { clause: '1 = 1', params: [] };
  const ph = Array.from(admins).map(() => '?').join(', ');
  return { clause: `u.email NOT IN (${ph})`, params: Array.from(admins) };
}

function searchFilter(term: string): AdminFilter {
  if (!term) return { clause: '1 = 1', params: [] };
  const like = `%${term}%`;
  return {
    clause: '(u.name LIKE ? COLLATE NOCASE OR u.email LIKE ? COLLATE NOCASE)',
    params: [like, like],
  };
}

function parseSearch(value: string | null): string {
  const trimmed = (value ?? '').trim();
  return trimmed.slice(0, 100);
}

function parseSession(value: string | null): number | null | 'invalid' {
  if (!value || value.trim() === '') return null;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > MAX_SESSION_ID) return 'invalid';
  return n;
}

function parseRole(value: string | null): string {
  if (value === 'admin' || value === 'learner' || value === 'all') return value;
  return 'learner';
}

function parseLimit(value: string | null): number {
  const n = Number(value ?? '25');
  if (!Number.isInteger(n) || n < 1) return 25;
  return Math.min(n, 100);
}

function parsePage(value: string | null): number {
  const n = Number(value ?? '1');
  if (!Number.isInteger(n) || n < 1) return 1;
  return n;
}

function paginationOf(page: number, limit: number, total: number) {
  return { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

const isAdminOf = (admins: Set<string>) => (email: string) =>
  admins.has(email.toLowerCase());

export async function dashboardApi(
  request: Request,
  env: Env,
): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';
  const db = env.inside_lab_db;
  const auth = await requireAdmin(db, request, env);
  if (!auth.ok) return auth.response;

  const admins = getAdminEmailSet(env);

  if (pathname === '/api/dashboard/summary' && request.method === 'GET') {
    return summaryHandler(db, admins);
  }

  if (pathname === '/api/dashboard/leaderboard' && request.method === 'GET') {
    return leaderboardHandler(db, url, admins);
  }

  if (pathname === '/api/dashboard/users' && request.method === 'GET') {
    return usersHandler(db, url, admins);
  }

  if (pathname === '/api/dashboard/scores' && request.method === 'GET') {
    return scoresHandler(db, url, admins);
  }

  if (pathname === '/api/dashboard/answers' && request.method === 'GET') {
    return answersHandler(db, url, admins);
  }

  return json({ error: 'Dashboard endpoint not found.' }, 404);
}

async function summaryHandler(
  db: D1Database,
  admins: Set<string>,
): Promise<Response> {
  const learner = roleFilter(admins, 'learner');

  const totalUsersRow = await db
    .prepare('SELECT COUNT(*) AS total FROM users')
    .first<{ total: number }>();

  const totalLearnersRow = await db
    .prepare(`SELECT COUNT(*) AS total FROM users u WHERE ${learner.clause}`)
    .bind(...learner.params)
    .first<{ total: number }>();

  const totalAdminsRow = await db
    .prepare(`SELECT COUNT(*) AS total FROM users u WHERE ${roleFilter(admins, 'admin').clause}`)
    .bind(...roleFilter(admins, 'admin').params)
    .first<{ total: number }>();

  const usersWithViewsRow = await db
    .prepare('SELECT COUNT(DISTINCT user_id) AS total FROM session_views')
    .first<{ total: number }>();

  const totalSessionViewsRow = await db
    .prepare('SELECT COUNT(*) AS total FROM session_views')
    .first<{ total: number }>();

  const usersWithSubmissionsRow = await db
    .prepare('SELECT COUNT(DISTINCT user_id) AS total FROM check_submissions')
    .first<{ total: number }>();

  const totalSubmissionsRow = await db
    .prepare('SELECT COUNT(*) AS total FROM check_submissions')
    .first<{ total: number }>();

  const totalAnswersRow = await db
    .prepare('SELECT COUNT(*) AS total FROM check_submission_answers')
    .first<{ total: number }>();

  const avgScoreRow = await db
    .prepare(
      `WITH ${SCORE_CTES}
       SELECT AVG(
         CASE WHEN ss.best_total > 0 THEN ss.best_correct * 100.0 / ss.best_total END
       ) AS average_score
       FROM session_scores ss
       JOIN users u ON u.user_id = ss.user_id
       WHERE ${learner.clause}`,
    )
    .bind(...learner.params)
    .first<{ average_score: number | null }>();

  const viewsBySession = await db
    .prepare(
      `SELECT session_id, COUNT(*) AS unique_viewers, SUM(view_count) AS total_views
       FROM session_views GROUP BY session_id`,
    )
    .all<{ session_id: number; unique_viewers: number; total_views: number }>();

  const submissionsBySession = await db
    .prepare(
      `SELECT cs.session_id,
         COUNT(DISTINCT cs.id) AS submissions,
         COUNT(csa.question_number) AS answers
       FROM check_submissions cs
       JOIN check_submission_answers csa ON csa.submission_id = cs.id
       GROUP BY cs.session_id`,
    )
    .all<{ session_id: number; submissions: number; answers: number }>();

  const scoreBySession = await db
    .prepare(
      `WITH ${SCORE_CTES}
       SELECT ss.session_id,
         AVG(CASE WHEN ss.best_total > 0 THEN ss.best_correct * 100.0 / ss.best_total END) AS average_score
       FROM session_scores ss
       JOIN users u ON u.user_id = ss.user_id
       WHERE ${learner.clause}
       GROUP BY ss.session_id`,
    )
    .bind(...learner.params)
    .all<{ session_id: number; average_score: number | null }>();

  const viewsMap = new Map(viewsBySession.results.map((r) => [r.session_id, r]));
  const submissionsMap = new Map(
    submissionsBySession.results.map((r) => [r.session_id, r]),
  );
  const scoreMap = new Map(scoreBySession.results.map((r) => [r.session_id, r]));

  const bySession = Array.from({ length: MAX_SESSION_ID }, (_, i) => {
    const id = i + 1;
    return {
      sessionId: id,
      uniqueViewers: viewsMap.get(id)?.unique_viewers ?? 0,
      totalViews: viewsMap.get(id)?.total_views ?? 0,
      submissions: submissionsMap.get(id)?.submissions ?? 0,
      answers: submissionsMap.get(id)?.answers ?? 0,
      averageScore: scoreMap.get(id)?.average_score ?? null,
    };
  });

  return json({
    totalUsers: totalUsersRow?.total ?? 0,
    totalLearners: totalLearnersRow?.total ?? 0,
    totalAdmins: totalAdminsRow?.total ?? 0,
    usersWithViews: usersWithViewsRow?.total ?? 0,
    totalSessionViews: totalSessionViewsRow?.total ?? 0,
    usersWithSubmissions: usersWithSubmissionsRow?.total ?? 0,
    totalSubmissions: totalSubmissionsRow?.total ?? 0,
    totalAnswers: totalAnswersRow?.total ?? 0,
    averageScore: avgScoreRow?.average_score ?? null,
    bySession,
  });
}

async function leaderboardHandler(
  db: D1Database,
  url: URL,
  admins: Set<string>,
): Promise<Response> {
  const limit = Math.min(parseLimit(url.searchParams.get('limit') === null ? '10' : url.searchParams.get('limit')), 50);
  const learner = excludeAdmins(admins);

  const rows = await db
    .prepare(
      `WITH ${SCORE_CTES},
       view_stats AS (
         SELECT user_id, COUNT(*) AS sessions_viewed, SUM(view_count) AS total_views,
           MAX(last_viewed_at) AS last_viewed_at
         FROM session_views GROUP BY user_id
       ),
       check_stats AS (
         SELECT user_id, COUNT(DISTINCT session_id) AS sessions_checked,
           COUNT(*) AS submission_count, MAX(submitted_at) AS last_submitted_at
         FROM check_submissions GROUP BY user_id
       ),
       score_stats AS (
         SELECT user_id,
           COUNT(*) AS sessions_scored,
           AVG(CASE WHEN best_total > 0 THEN best_correct * 100.0 / best_total END) AS average_score,
           COALESCE(SUM(best_correct), 0) AS total_correct,
           COALESCE(SUM(best_total), 0) AS total_mc
         FROM session_scores GROUP BY user_id
       )
       SELECT
         u.user_id, u.name, u.email,
         COALESCE(v.sessions_viewed, 0) AS sessions_viewed,
         COALESCE(v.total_views, 0) AS total_views,
         COALESCE(c.sessions_checked, 0) AS sessions_checked,
         s.average_score,
         COALESCE(s.total_correct, 0) AS total_correct,
         COALESCE(s.total_mc, 0) AS total_mc,
         COALESCE(c.submission_count, 0) AS submission_count,
         CASE
           WHEN v.last_viewed_at IS NULL AND c.last_submitted_at IS NULL THEN NULL
           ELSE MAX(COALESCE(v.last_viewed_at, 0), COALESCE(c.last_submitted_at, 0))
         END AS last_active_at
       FROM users u
       JOIN view_stats v ON v.user_id = u.user_id
       LEFT JOIN check_stats c ON c.user_id = u.user_id
       LEFT JOIN score_stats s ON s.user_id = u.user_id
       WHERE ${learner.clause}
       GROUP BY u.user_id
       ORDER BY sessions_viewed DESC, average_score DESC, last_active_at DESC, total_views DESC
       LIMIT ?`,
    )
    .bind(...learner.params, limit)
    .all<{
      user_id: string;
      name: string | null;
      email: string;
      sessions_viewed: number;
      total_views: number;
      sessions_checked: number;
      average_score: number | null;
      total_correct: number;
      total_mc: number;
      submission_count: number;
      last_active_at: number | null;
    }>();

  const users = rows.results.map((row, index) => ({
    rank: index + 1,
    userId: row.user_id,
    userName: row.name,
    userEmail: row.email,
    sessionsViewed: row.sessions_viewed,
    totalSessions: MAX_SESSION_ID,
    totalViews: row.total_views,
    sessionsChecked: row.sessions_checked,
    averageScore: row.average_score,
    totalCorrect: row.total_correct,
    totalMc: row.total_mc,
    submissionCount: row.submission_count,
    lastActiveAt: row.last_active_at,
  }));

  return json({ users });
}

type UserRow = {
  user_id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: number;
  updated_at: number;
  sessions_viewed: number;
  total_views: number;
  last_viewed_at: number | null;
  sessions_checked: number;
  submission_count: number;
  last_submitted_at: number | null;
  average_score: number | null;
  total_correct: number;
  total_mc: number;
};

async function usersHandler(
  db: D1Database,
  url: URL,
  admins: Set<string>,
): Promise<Response> {
  const searchTerm = parseSearch(url.searchParams.get('search'));
  const roleValue = parseRole(url.searchParams.get('role'));
  const page = parsePage(url.searchParams.get('page'));
  const limit = parseLimit(url.searchParams.get('limit'));
  const sort = url.searchParams.get('sort');

  const search = searchFilter(searchTerm);
  const role = roleFilter(admins, roleValue);

  const countRow = await db
    .prepare(
      `SELECT COUNT(*) AS total FROM users u WHERE ${search.clause} AND ${role.clause}`,
    )
    .bind(...search.params, ...role.params)
    .first<{ total: number }>();

  const orderBy =
    sort === 'active'
      ? 'last_active_at IS NULL ASC, last_active_at DESC, u.created_at DESC'
      : sort === 'sessions'
        ? 'sessions_viewed DESC, average_score DESC, last_active_at DESC'
        : 'u.created_at DESC';

  const offset = (page - 1) * limit;

  const rows = await db
    .prepare(
      `WITH ${SCORE_CTES},
       view_stats AS (
         SELECT user_id, COUNT(*) AS sessions_viewed, SUM(view_count) AS total_views,
           MAX(last_viewed_at) AS last_viewed_at
         FROM session_views GROUP BY user_id
       ),
       check_stats AS (
         SELECT user_id, COUNT(DISTINCT session_id) AS sessions_checked,
           COUNT(*) AS submission_count, MAX(submitted_at) AS last_submitted_at
         FROM check_submissions GROUP BY user_id
       ),
       score_stats AS (
         SELECT user_id,
           COUNT(*) AS sessions_scored,
           AVG(CASE WHEN best_total > 0 THEN best_correct * 100.0 / best_total END) AS average_score,
           COALESCE(SUM(best_correct), 0) AS total_correct,
           COALESCE(SUM(best_total), 0) AS total_mc
         FROM session_scores GROUP BY user_id
       )
       SELECT
         u.user_id, u.email, u.name, u.avatar_url, u.created_at, u.updated_at,
         COALESCE(v.sessions_viewed, 0) AS sessions_viewed,
         COALESCE(v.total_views, 0) AS total_views,
         v.last_viewed_at,
         COALESCE(c.sessions_checked, 0) AS sessions_checked,
         COALESCE(c.submission_count, 0) AS submission_count,
         c.last_submitted_at,
         s.average_score,
         COALESCE(s.total_correct, 0) AS total_correct,
         COALESCE(s.total_mc, 0) AS total_mc,
         CASE
           WHEN v.last_viewed_at IS NULL AND c.last_submitted_at IS NULL THEN NULL
           ELSE MAX(COALESCE(v.last_viewed_at, 0), COALESCE(c.last_submitted_at, 0))
         END AS last_active_at
       FROM users u
       LEFT JOIN view_stats v ON v.user_id = u.user_id
       LEFT JOIN check_stats c ON c.user_id = u.user_id
       LEFT JOIN score_stats s ON s.user_id = u.user_id
       WHERE ${search.clause} AND ${role.clause}
       GROUP BY u.user_id
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`,
    )
    .bind(...search.params, ...role.params, limit, offset)
    .all<UserRow & { last_active_at: number | null }>();

  const isAdmin = isAdminOf(admins);
  const users = rows.results.map((row) => ({
    userId: row.user_id,
    email: row.email,
    name: row.name,
    avatarUrl: row.avatar_url,
    isAdmin: isAdmin(row.email),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    sessionsViewed: row.sessions_viewed,
    totalViews: row.total_views,
    sessionsChecked: row.sessions_checked,
    submissionCount: row.submission_count,
    averageScore: row.average_score,
    totalCorrect: row.total_correct,
    totalMc: row.total_mc,
    lastViewedAt: row.last_viewed_at,
    lastSubmittedAt: row.last_submitted_at,
    lastActiveAt: row.last_active_at,
  }));

  return json({
    users,
    pagination: paginationOf(page, limit, countRow?.total ?? 0),
  });
}

type ScoreRow = {
  user_id: string;
  name: string | null;
  email: string;
  session_id: number;
  attempts: number;
  latest_correct: number | null;
  latest_total: number | null;
  best_correct: number | null;
  best_total: number | null;
  essay_total: number | null;
  last_submitted_at: number;
  latest_score: number | null;
  best_score: number | null;
};

async function scoresHandler(
  db: D1Database,
  url: URL,
  admins: Set<string>,
): Promise<Response> {
  const sessionId = parseSession(url.searchParams.get('sessionId'));
  if (sessionId === 'invalid') return json({ error: 'sessionId tidak valid.' }, 400);

  const search = parseSearch(url.searchParams.get('search'));
  const role = parseRole(url.searchParams.get('role'));
  const page = parsePage(url.searchParams.get('page'));
  const limit = parseLimit(url.searchParams.get('limit'));
  const sort = url.searchParams.get('sort');

  const searchF = searchFilter(search);
  const roleF = roleFilter(admins, role);
  const sessionClause = sessionId === null ? '1 = 1' : 'ss.session_id = ?';
  const sessionParams: number[] = sessionId === null ? [] : [sessionId];

  const countRow = await db
    .prepare(
      `WITH ${SCORE_CTES}
       SELECT COUNT(*) AS total
       FROM session_scores ss
       JOIN users u ON u.user_id = ss.user_id
       WHERE ${sessionClause} AND ${searchF.clause} AND ${roleF.clause}`,
    )
    .bind(...sessionParams, ...searchF.params, ...roleF.params)
    .first<{ total: number }>();

  const orderBy =
    sort === 'best'
      ? 'best_score DESC, ss.session_id ASC'
      : sort === 'latest'
        ? 'ss.last_submitted_at DESC'
        : sort === 'name'
          ? 'u.name COLLATE NOCASE ASC, u.email ASC'
          : 'ss.session_id ASC, best_score DESC';

  const offset = (page - 1) * limit;

  const rows = await db
    .prepare(
      `WITH ${SCORE_CTES}
       SELECT
         ss.user_id, u.name, u.email, ss.session_id, ss.attempts,
         ss.latest_correct, ss.latest_total, ss.best_correct, ss.best_total,
         ss.essay_total, ss.last_submitted_at,
         CASE WHEN ss.best_total > 0 THEN ss.best_correct * 100.0 / ss.best_total END AS best_score,
         CASE WHEN ss.latest_total > 0 THEN ss.latest_correct * 100.0 / ss.latest_total END AS latest_score
       FROM session_scores ss
       JOIN users u ON u.user_id = ss.user_id
       WHERE ${sessionClause} AND ${searchF.clause} AND ${roleF.clause}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`,
    )
    .bind(...sessionParams, ...searchF.params, ...roleF.params, limit, offset)
    .all<ScoreRow>();

  const isAdmin = isAdminOf(admins);
  const scores = rows.results.map((row) => ({
    userId: row.user_id,
    userName: row.name,
    userEmail: row.email,
    isAdmin: isAdmin(row.email),
    sessionId: row.session_id,
    attempts: row.attempts,
    latestScore: row.latest_score,
    bestScore: row.best_score,
    bestCorrect: row.best_correct ?? 0,
    bestTotal: row.best_total ?? 0,
    essaySubmitted: (row.essay_total ?? 0) > 0,
    lastSubmittedAt: row.last_submitted_at,
  }));

  return json({
    scores,
    pagination: paginationOf(page, limit, countRow?.total ?? 0),
  });
}

type AnswerRow = {
  submission_id: string;
  submitted_at: number;
  session_id: number;
  user_id: string;
  name: string | null;
  email: string;
  question_number: number;
  question: string;
  answer: string;
  answer_type: 'multiple_choice' | 'essay';
  is_correct: number | null;
};

async function answersHandler(
  db: D1Database,
  url: URL,
  admins: Set<string>,
): Promise<Response> {
  const sessionId = parseSession(url.searchParams.get('sessionId'));
  if (sessionId === 'invalid') return json({ error: 'sessionId tidak valid.' }, 400);

  const search = parseSearch(url.searchParams.get('search'));
  const role = parseRole(url.searchParams.get('role'));
  const type = url.searchParams.get('type');
  const result = url.searchParams.get('result');
  const page = parsePage(url.searchParams.get('page'));
  const limit = parseLimit(url.searchParams.get('limit'));

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (sessionId !== null) {
    conditions.push('cs.session_id = ?');
    params.push(sessionId);
  }

  const searchF = searchFilter(search);
  conditions.push(searchF.clause);
  params.push(...searchF.params);

  const roleF = roleFilter(admins, role);
  conditions.push(roleF.clause);
  params.push(...roleF.params);

  if (type === 'multiple_choice' || type === 'essay') {
    conditions.push('csa.answer_type = ?');
    params.push(type);
  }

  if (result === 'correct') {
    conditions.push('csa.is_correct = 1');
  } else if (result === 'wrong') {
    conditions.push('csa.is_correct = 0');
  } else if (result === 'submitted') {
    conditions.push('csa.is_correct IS NULL');
  }

  const where = conditions.join(' AND ');

  const countRow = await db
    .prepare(
      `SELECT COUNT(*) AS total
       FROM check_submissions cs
       JOIN users u ON u.user_id = cs.user_id
       JOIN check_submission_answers csa ON csa.submission_id = cs.id
       WHERE ${where}`,
    )
    .bind(...params)
    .first<{ total: number }>();

  const offset = (page - 1) * limit;

  const rows = await db
    .prepare(
      `SELECT
         cs.id AS submission_id,
         cs.submitted_at,
         cs.session_id,
         u.user_id,
         u.name,
         u.email,
         csa.question_number,
         csa.question,
         csa.answer,
         csa.answer_type,
         csa.is_correct
       FROM check_submissions cs
       JOIN users u ON u.user_id = cs.user_id
       JOIN check_submission_answers csa ON csa.submission_id = cs.id
       WHERE ${where}
       ORDER BY cs.submitted_at DESC, csa.question_number ASC
       LIMIT ? OFFSET ?`,
    )
    .bind(...params, limit, offset)
    .all<AnswerRow>();

  const isAdmin = isAdminOf(admins);
  const answers = rows.results.map((row) => ({
    submissionId: row.submission_id,
    submittedAt: row.submitted_at,
    sessionId: row.session_id,
    userId: row.user_id,
    userName: row.name,
    userEmail: row.email,
    isAdmin: isAdmin(row.email),
    questionNumber: row.question_number,
    question: row.question,
    answer: row.answer,
    answerType: row.answer_type,
    isCorrect: row.is_correct === null ? null : row.is_correct === 1,
  }));

  return json({
    answers,
    pagination: paginationOf(page, limit, countRow?.total ?? 0),
  });
}
