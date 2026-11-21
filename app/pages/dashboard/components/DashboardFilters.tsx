import type { DashboardSession, RoleFilter, TabId } from '../types';

type FilterPatch = {
  search?: string;
  role?: RoleFilter;
  sessionId?: string;
  type?: string;
  result?: string;
  sort?: string;
};

type DashboardFiltersProps = {
  tab: TabId;
  search: string;
  role: RoleFilter;
  sessionId: string;
  type: string;
  result: string;
  sort: string;
  sessions: DashboardSession[];
  onChange: (patch: FilterPatch) => void;
};

export default function DashboardFilters({
  tab,
  search,
  role,
  sessionId,
  type,
  result,
  sort,
  sessions,
  onChange,
}: DashboardFiltersProps) {
  return (
    <div className="dashboard-filters">
      <label className="dashboard-filter">
        <span>Cari</span>
        <input
          type="search"
          value={search}
          placeholder="Nama atau email…"
          onChange={(event) => onChange({ search: event.target.value })}
        />
      </label>

      <label className="dashboard-filter">
        <span>Tipe akun</span>
        <select
          value={role}
          onChange={(event) => onChange({ role: event.target.value as RoleFilter })}
        >
          <option value="learner">Learner</option>
          <option value="admin">Admin</option>
          <option value="all">Semua</option>
        </select>
      </label>

      {(tab === 'scores' || tab === 'answers') && (
        <label className="dashboard-filter">
          <span>Sesi</span>
          <select
            value={sessionId}
            onChange={(event) => onChange({ sessionId: event.target.value })}
          >
            <option value="">Semua sesi</option>
            {sessions.map((session) => (
              <option key={session.session} value={String(session.session)}>
                Sesi {String(session.session).padStart(2, '0')}
              </option>
            ))}
          </select>
        </label>
      )}

      {tab === 'answers' && (
        <>
          <label className="dashboard-filter">
            <span>Tipe</span>
            <select
              value={type}
              onChange={(event) => onChange({ type: event.target.value })}
            >
              <option value="">Semua</option>
              <option value="multiple_choice">Pilihan ganda</option>
              <option value="essay">Esai</option>
            </select>
          </label>
          <label className="dashboard-filter">
            <span>Hasil</span>
            <select
              value={result}
              onChange={(event) => onChange({ result: event.target.value })}
            >
              <option value="">Semua</option>
              <option value="correct">Benar</option>
              <option value="wrong">Salah</option>
              <option value="submitted">Terkirim</option>
            </select>
          </label>
        </>
      )}

      {tab === 'users' && (
        <label className="dashboard-filter">
          <span>Urutkan</span>
          <select
            value={sort}
            onChange={(event) => onChange({ sort: event.target.value })}
          >
            <option value="newest">Terbaru</option>
            <option value="active">Terakhir aktif</option>
            <option value="sessions">Sesi terbanyak</option>
          </select>
        </label>
      )}

      {tab === 'scores' && (
        <label className="dashboard-filter">
          <span>Urutkan</span>
          <select
            value={sort}
            onChange={(event) => onChange({ sort: event.target.value })}
          >
            <option value="session">Sesi</option>
            <option value="best">Skor terbaik</option>
            <option value="latest">Skor terbaru</option>
            <option value="name">Nama</option>
          </select>
        </label>
      )}
    </div>
  );
}
