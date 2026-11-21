import { useEffect, useRef, useState } from 'react';

import type {
  AnswerDetail,
  DashboardStatus,
  DashboardSummary,
  DashboardUser,
  LeaderboardUser,
  Pagination,
  RoleFilter,
  SessionScore,
  TabId,
} from './types';

type HttpError = Error & { status?: number };

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { credentials: 'same-origin', signal });
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    const error = new Error(data.error ?? 'Terjadi kesalahan.') as HttpError;
    error.status = response.status;
    throw error;
  }
  return data;
}

const EMPTY_PAGINATION: Pagination = {
  page: 1,
  limit: 25,
  total: 0,
  totalPages: 1,
};

export function useDashboard() {
  const [status, setStatus] = useState<DashboardStatus>('loading');
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  const [tab, setTab] = useState<TabId>('users');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<RoleFilter>('all');
  const [sessionId, setSessionId] = useState('');
  const [type, setType] = useState('');
  const [result, setResult] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [usersPagination, setUsersPagination] = useState<Pagination>(EMPTY_PAGINATION);

  const [scores, setScores] = useState<SessionScore[]>([]);
  const [scoresPagination, setScoresPagination] = useState<Pagination>(EMPTY_PAGINATION);

  const [answers, setAnswers] = useState<AnswerDetail[]>([]);
  const [answersPagination, setAnswersPagination] = useState<Pagination>(EMPTY_PAGINATION);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);

  const controllerRef = useRef<AbortController | null>(null);

  async function loadBootstrap(): Promise<void> {
    setStatus('loading');
    setError('');
    try {
      const [summaryData, leaderboardData] = await Promise.all([
        fetchJson<DashboardSummary>('/api/dashboard/summary'),
        fetchJson<{ users: LeaderboardUser[] }>('/api/dashboard/leaderboard'),
      ]);
      setSummary(summaryData);
      setLeaderboard(leaderboardData.users);
      setStatus('ready');
    } catch (err) {
      const e = err as HttpError;
      if (e.status === 401) {
        setStatus('guest');
      } else if (e.status === 403) {
        setStatus('forbidden');
      } else {
        setStatus('error');
        setError(e.message);
      }
    }
  }

  useEffect(() => {
    // Bootstrap runs once on mount and again on retry.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset status before async load
    void loadBootstrap();
  }, [revision]);

  useEffect(() => {
    if (status !== 'ready') return;

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- reflect in-flight fetch
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    const set = (key: string, value: string) => {
      if (value) params.set(key, value);
    };

    set('search', search);
    set('role', role);
    set('page', String(page));
    set('limit', String(limit));

    let endpoint = '/api/dashboard/users';
    if (tab === 'scores') {
      endpoint = '/api/dashboard/scores';
      set('sessionId', sessionId);
      set('sort', sort);
    } else if (tab === 'answers') {
      endpoint = '/api/dashboard/answers';
      set('sessionId', sessionId);
      set('type', type);
      set('result', result);
    } else {
      set('sort', sort);
    }

    const url = `${endpoint}?${params.toString()}`;

    void fetchJson<{ users?: DashboardUser[]; scores?: SessionScore[]; answers?: AnswerDetail[]; pagination: Pagination }>(url, controller.signal)
      .then((data) => {
        if (tab === 'users') {
          setUsers(data.users ?? []);
          setUsersPagination(data.pagination);
        } else if (tab === 'scores') {
          setScores(data.scores ?? []);
          setScoresPagination(data.pagination);
        } else {
          setAnswers(data.answers ?? []);
          setAnswersPagination(data.pagination);
        }
        setLoading(false);
      })
      .catch((err: HttpError) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [status, tab, search, role, sessionId, type, result, sort, page, limit]);

  function changeTab(next: TabId): void {
    setTab(next);
    setPage(1);
    setSort(next === 'scores' ? 'session' : 'newest');
  }

  function updateFilter(
    patch: Partial<{
      search: string;
      role: RoleFilter;
      sessionId: string;
      type: string;
      result: string;
      sort: string;
    }>,
  ): void {
    if ('search' in patch) setSearch(patch.search ?? '');
    if ('role' in patch) setRole(patch.role ?? 'learner');
    if ('sessionId' in patch) setSessionId(patch.sessionId ?? '');
    if ('type' in patch) setType(patch.type ?? '');
    if ('result' in patch) setResult(patch.result ?? '');
    if ('sort' in patch) setSort(patch.sort ?? 'newest');
    setPage(1);
  }

  function changePage(next: number): void {
    setPage(next);
  }

  function changeLimit(next: number): void {
    setLimit(next);
    setPage(1);
  }

  function retry(): void {
    setRevision((current) => current + 1);
  }

  return {
    status,
    summary,
    leaderboard,
    tab,
    changeTab,
    search,
    role,
    sessionId,
    type,
    result,
    sort,
    page,
    limit,
    updateFilter,
    changePage,
    changeLimit,
    users,
    usersPagination,
    scores,
    scoresPagination,
    answers,
    answersPagination,
    loading,
    error,
    retry,
  };
}

export type DashboardModel = ReturnType<typeof useDashboard>;
