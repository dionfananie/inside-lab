import { getSessionUser } from '../lib/session';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const MAX_SESSION_ID = 7;

export async function sessionViewsApi(
  request: Request,
  env: Env,
): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';
  const db = env.inside_lab_db;

  if (pathname === '/api/session-views' && request.method === 'POST') {
    const userId = await getSessionUser(db, request);
    if (!userId) return json({ error: 'Harap login.' }, 401);

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Body JSON tidak valid.' }, 400);
    }

    const payload = body as { sessionId?: unknown } | null;
    const sessionId = payload?.sessionId;
    if (
      typeof sessionId !== 'number' ||
      !Number.isInteger(sessionId) ||
      sessionId < 1 ||
      sessionId > MAX_SESSION_ID
    ) {
      return json({ error: 'sessionId tidak valid.' }, 400);
    }

    const now = Date.now();
    await db
      .prepare(
        `INSERT INTO session_views (user_id, session_id, first_viewed_at, last_viewed_at, view_count)
         VALUES (?, ?, ?, ?, 1)
         ON CONFLICT(user_id, session_id) DO UPDATE SET
           last_viewed_at = excluded.last_viewed_at,
           view_count = session_views.view_count + 1`,
      )
      .bind(userId, sessionId, now, now)
      .run();

    return json({ ok: true });
  }

  return json({ error: 'Session views endpoint not found.' }, 404);
}
