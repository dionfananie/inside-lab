import { getSessionUser } from './session';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export function getAdminEmailSet(env: Env): Set<string> {
  const raw = (env.ADMIN_EMAILS ?? '').trim();
  const set = new Set<string>();
  for (const entry of raw.split(',')) {
    const email = entry.trim().toLowerCase();
    if (email) set.add(email);
  }
  return set;
}

export type AdminAuth =
  | { ok: true; userId: string; email: string }
  | { ok: false; response: Response };

export async function requireAdmin(
  db: D1Database,
  request: Request,
  env: Env,
): Promise<AdminAuth> {
  const userId = await getSessionUser(db, request);
  if (!userId) {
    return {
      ok: false,
      response: json({ error: 'Harap login untuk membuka dashboard.' }, 401),
    };
  }

  const row = await db
    .prepare('SELECT email FROM users WHERE user_id = ?')
    .bind(userId)
    .first<{ email: string }>();

  if (!row?.email) {
    return {
      ok: false,
      response: json({ error: 'Harap login untuk membuka dashboard.' }, 401),
    };
  }

  const admins = getAdminEmailSet(env);
  if (admins.size === 0 || !admins.has(row.email.toLowerCase())) {
    return {
      ok: false,
      response: json(
        { error: 'Akun ini tidak memiliki akses dashboard.' },
        403,
      ),
    };
  }

  return { ok: true, userId, email: row.email };
}
