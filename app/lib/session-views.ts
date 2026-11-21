import { useEffect } from 'react';

const KEY_PREFIX = 'inside-lab:viewed:computational-logic:session-';

export function useTrackSessionView(sessionId: number): void {
  useEffect(() => {
    const key = `${KEY_PREFIX}${sessionId}`;

    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, '1');
    } catch {
      // sessionStorage may be unavailable; still try to record the view.
    }

    void fetch('/api/session-views', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
      keepalive: true,
      body: JSON.stringify({ sessionId }),
    }).catch(() => {
      // Guest requests get 401; silently ignore tracking failures.
    });
  }, [sessionId]);
}
