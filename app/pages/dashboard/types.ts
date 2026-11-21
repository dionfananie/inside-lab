export type DashboardSession = {
  session: number;
  topic: string;
  href: string;
};

export type DashboardSummary = {
  totalUsers: number;
  totalLearners: number;
  totalAdmins: number;
  usersWithViews: number;
  totalSessionViews: number;
  usersWithSubmissions: number;
  totalSubmissions: number;
  totalAnswers: number;
  averageScore: number | null;
  bySession: Array<{
    sessionId: number;
    uniqueViewers: number;
    totalViews: number;
    submissions: number;
    answers: number;
    averageScore: number | null;
  }>;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type LeaderboardUser = {
  rank: number;
  userId: string;
  userName: string | null;
  userEmail: string;
  sessionsViewed: number;
  totalSessions: number;
  totalViews: number;
  sessionsChecked: number;
  averageScore: number | null;
  totalCorrect: number;
  totalMc: number;
  submissionCount: number;
  lastActiveAt: number | null;
};

export type DashboardUser = {
  userId: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  isAdmin: boolean;
  createdAt: number;
  updatedAt: number;
  sessionsViewed: number;
  totalViews: number;
  sessionsChecked: number;
  submissionCount: number;
  averageScore: number | null;
  totalCorrect: number;
  totalMc: number;
  lastViewedAt: number | null;
  lastSubmittedAt: number | null;
  lastActiveAt: number | null;
};

export type SessionScore = {
  userId: string;
  userName: string | null;
  userEmail: string;
  isAdmin: boolean;
  sessionId: number;
  attempts: number;
  latestScore: number | null;
  bestScore: number | null;
  bestCorrect: number;
  bestTotal: number;
  essaySubmitted: boolean;
  lastSubmittedAt: number;
};

export type AnswerDetail = {
  submissionId: string;
  submittedAt: number;
  sessionId: number;
  userId: string;
  userName: string | null;
  userEmail: string;
  isAdmin: boolean;
  questionNumber: number;
  question: string;
  answer: string;
  answerType: 'multiple_choice' | 'essay';
  isCorrect: boolean | null;
};

export type TabId = 'users' | 'scores' | 'answers';
export type RoleFilter = 'learner' | 'admin' | 'all';
export type DashboardStatus = 'loading' | 'ready' | 'error' | 'forbidden' | 'guest';
