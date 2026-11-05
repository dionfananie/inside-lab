import { useEffect, useState } from 'react';

export type AuthUser = {
  user_id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
};

const AUTH_EVENT = 'inside-lab:auth';

export async function fetchMe(): Promise<AuthUser | null> {
  try {
    const response = await fetch('/api/auth/me', { credentials: 'same-origin' });
    if (!response.ok) return null;
    const data = (await response.json()) as { user?: AuthUser | null };
    return data.user ?? null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setUser(await fetchMe());
    setLoading(false);
  }

  useEffect(() => {
    void refresh();
    const listener = () => void refresh();
    window.addEventListener(AUTH_EVENT, listener);
    return () => window.removeEventListener(AUTH_EVENT, listener);
  }, []);

  return { user, loading, refresh };
}

export function googleLoginUrl(returnTo = window.location.pathname): string {
  return `/api/auth/google?returnTo=${encodeURIComponent(returnTo)}`;
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
  window.dispatchEvent(new Event(AUTH_EVENT));
}
