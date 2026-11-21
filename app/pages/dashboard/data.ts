import type { DashboardSession } from './types';

const dateTimeFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const dateFormatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' });

export function formatDateTime(timestamp: number | null | undefined): string {
  if (!timestamp) return '—';
  return dateTimeFormatter.format(new Date(timestamp));
}

export function formatDate(timestamp: number | null | undefined): string {
  if (!timestamp) return '—';
  return dateFormatter.format(new Date(timestamp));
}

export function formatScore(score: number | null | undefined): string {
  if (score === null || score === undefined) return '—';
  return `${Math.round(score)}%`;
}

export function displayName(name: string | null | undefined, email: string): string {
  return name?.trim() ? name : email;
}

export function sessionLabel(sessionId: number): string {
  return `Sesi ${String(sessionId).padStart(2, '0')}`;
}

export function sessionTopic(
  sessions: DashboardSession[],
  sessionId: number,
): string {
  return sessions.find((s) => s.session === sessionId)?.topic ?? '';
}

export const TOTAL_SESSIONS = 7;
