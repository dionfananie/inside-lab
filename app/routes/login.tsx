import { LogIn } from 'lucide-react';
import type { Route } from './+types/login';
import '~/pages/auth.css';
import { googleLoginUrl } from '~/lib/auth';
import { InsideLabBrand } from '~/components/inside-lab-brand';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Masuk — insideLab' }];
}

export default function Login() {
  const returnTo = typeof window !== 'undefined'
    ? `${window.location.pathname}${window.location.search}`
    : '/';

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <InsideLabBrand area="Akun belajar" />
        <div className="auth-copy">
          <span className="logic-section-label">INSIDELAB / AKUN</span>
          <h1 id="login-title">Simpan perjalanan belajar</h1>
          <p>
            Masuk dengan Google untuk menyimpan progress dan melanjutkan latihan
            dari perangkat lain.
          </p>
        </div>
        <a className="auth-google-button" href={googleLoginUrl(returnTo)}>
          <LogIn size={18} />
          Lanjutkan dengan Google
        </a>
        <p className="auth-note">
          Kamu tetap bisa menjelajahi materi sebagai guest tanpa login.
        </p>
        <a className="auth-back-link" href="/">Kembali ke insideLab</a>
      </section>
    </main>
  );
}
