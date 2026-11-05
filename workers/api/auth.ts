import {
  clearSessionCookie,
  createSession,
  destroySession,
  getSessionUser,
  setSessionCookie,
} from '../lib/session';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
const GOOGLE_SCOPE = 'openid email profile';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

function safeReturnTo(value: string | null): string {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/';
}

function oauthState(returnTo: string): string {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  const nonce = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `r=${encodeURIComponent(returnTo)}.${nonce}`;
}

type GoogleTokenResponse = { access_token?: string; error?: string };
type GoogleProfile = { id?: string; email?: string; name?: string; picture?: string };

export async function authApi(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';
  const db = env.inside_lab_db;

  if (pathname === '/api/auth/google' && request.method === 'GET') {
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_REDIRECT_URI) {
      return json({ error: 'Google sign-in belum dikonfigurasi.' }, 500);
    }
    const state = oauthState(safeReturnTo(url.searchParams.get('returnTo')));
    const params = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: GOOGLE_SCOPE,
      access_type: 'online',
      state,
    });
    return Response.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`, 302);
  }

  if (pathname === '/api/auth/google/callback' && request.method === 'GET') {
    const code = url.searchParams.get('code');
    if (url.searchParams.get('error')) return json({ error: 'Google sign-in dibatalkan.' }, 400);
    if (!code || !env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.GOOGLE_REDIRECT_URI) {
      return json({ error: 'Callback Google tidak lengkap atau belum dikonfigurasi.' }, 400);
    }

    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });
    const token = (await tokenResponse.json().catch(() => ({}))) as GoogleTokenResponse;
    if (!token.access_token) return json({ error: 'Token Google tidak berhasil diperoleh.' }, 400);

    const profileResponse = await fetch(GOOGLE_USERINFO_URL, {
      headers: { authorization: `Bearer ${token.access_token}` },
    });
    if (!profileResponse.ok) return json({ error: 'Profil Google tidak berhasil dibaca.' }, 400);
    const profile = (await profileResponse.json()) as GoogleProfile;
    if (!profile.id || !profile.email) return json({ error: 'Google tidak mengembalikan identitas lengkap.' }, 400);

    const userId = `google:${profile.id}`;
    const now = Date.now();
    await db
      .prepare(
        `INSERT INTO users (user_id, email, name, avatar_url, google_sub, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(user_id) DO UPDATE SET email = excluded.email, name = excluded.name,
         avatar_url = excluded.avatar_url, updated_at = excluded.updated_at`,
      )
      .bind(userId, profile.email.toLowerCase(), profile.name ?? null, profile.picture ?? null, profile.id, now, now)
      .run();

    const session = await createSession(db, userId);
    const returnTo = safeReturnTo(url.searchParams.get('returnTo'));
    const response = Response.redirect(new URL(returnTo, url.origin).toString(), 302);
    setSessionCookie(response.headers, session.token, session.expiresMs);
    return response;
  }

  if (pathname === '/api/auth/me' && request.method === 'GET') {
    const userId = await getSessionUser(db, request);
    if (!userId) return json({ user: null });
    const user = await db
      .prepare('SELECT user_id, email, name, avatar_url FROM users WHERE user_id = ?')
      .bind(userId)
      .first();
    return json({ user: user ?? null });
  }

  if (pathname === '/api/auth/logout' && request.method === 'POST') {
    await destroySession(db, request);
    const response = json({ ok: true });
    clearSessionCookie(response.headers);
    return response;
  }

  return json({ error: 'Auth endpoint not found.' }, 404);
}
