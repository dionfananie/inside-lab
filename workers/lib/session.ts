const COOKIE = 'inside_lab_session';

function randomToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function cookieValue(request: Request): string | null {
  const cookie = request.headers.get('Cookie') ?? '';
  for (const part of cookie.split(';')) {
    const [name, ...value] = part.trim().split('=');
    if (name === COOKIE) return value.join('=') || null;
  }
  return null;
}

export function setSessionCookie(headers: Headers, token: string, expiresMs: number): void {
  headers.append(
    'Set-Cookie',
    `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${new Date(expiresMs).toUTCString()}`,
  );
}

export function clearSessionCookie(headers: Headers): void {
  headers.append(
    'Set-Cookie',
    `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
  );
}

export async function createSession(
  db: D1Database,
  userId: string,
): Promise<{ token: string; expiresMs: number }> {
  const token = randomToken();
  const expiresMs = Date.now() + 1000 * 60 * 60 * 24 * 30;
  await db
    .prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(token, userId, Math.floor(expiresMs / 1000))
    .run();
  return { token, expiresMs };
}

export async function getSessionUser(db: D1Database, request: Request): Promise<string | null> {
  const token = cookieValue(request);
  if (!token) return null;
  const row = await db
    .prepare('SELECT user_id, expires_at FROM sessions WHERE token = ?')
    .bind(token)
    .first<{ user_id: string; expires_at: number }>();
  if (!row) return null;
  if (row.expires_at * 1000 <= Date.now()) {
    await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    return null;
  }
  return row.user_id;
}

export async function destroySession(db: D1Database, request: Request): Promise<void> {
  const token = cookieValue(request);
  if (token) await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
}
