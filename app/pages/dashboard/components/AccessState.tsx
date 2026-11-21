import { ArrowRight, LogIn, ShieldAlert } from 'lucide-react';

import { googleLoginUrl } from '~/lib/auth';

import type { DashboardStatus } from '../types';

type AccessStateProps = {
  status: DashboardStatus;
  error?: string;
  onRetry: () => void;
};

export default function AccessState({ status, error, onRetry }: AccessStateProps) {
  if (status === 'loading') {
    return (
      <section className="dashboard-access" aria-busy="true">
        <ShieldAlert size={28} aria-hidden="true" />
        <h1>Memuat dashboard…</h1>
      </section>
    );
  }

  if (status === 'guest') {
    return (
      <section className="dashboard-access" aria-labelledby="access-guest">
        <ShieldAlert size={28} aria-hidden="true" />
        <h1 id="access-guest">Masuk untuk membuka dashboard</h1>
        <p>Dashboard hanya untuk akun admin insideLab.</p>
        <a className="dashboard-access-button" href={googleLoginUrl('/dashboard')}>
          <LogIn size={16} /> Lanjutkan dengan Google
        </a>
      </section>
    );
  }

  if (status === 'forbidden') {
    return (
      <section className="dashboard-access" aria-labelledby="access-forbidden">
        <ShieldAlert size={28} aria-hidden="true" />
        <h1 id="access-forbidden">Akun ini tidak memiliki akses dashboard</h1>
        <p>Hubungi admin insideLab jika kamu seharusnya memiliki akses.</p>
        <a className="dashboard-access-button" href="/">
          Kembali ke Home <ArrowRight size={16} />
        </a>
      </section>
    );
  }

  return (
    <section className="dashboard-access" aria-labelledby="access-error">
      <ShieldAlert size={28} aria-hidden="true" />
      <h1 id="access-error">Gagal memuat dashboard</h1>
      <p>{error || 'Terjadi kesalahan yang tidak diketahui.'}</p>
      <button className="dashboard-access-button" type="button" onClick={onRetry}>
        Coba lagi
      </button>
    </section>
  );
}
