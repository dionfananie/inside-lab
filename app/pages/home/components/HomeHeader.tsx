import { ArrowRight } from "lucide-react";

import AuthControl from "~/components/AuthControl";
import { InsideLabBrand } from "~/components/inside-lab-brand";
import { useAuth } from "~/lib/auth";

type HomeHeaderProps = {
  firstChapterHref: string;
};

export default function HomeHeader({ firstChapterHref }: HomeHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="home-header home-reveal">
      <InsideLabBrand area="Lab Belajar" />
      <nav className="home-nav" aria-label="Navigasi utama">
        <a href="#cara-belajar">Cara belajar</a>
        <a href="#materi">Materi</a>
        <a href="#jalur">Jalur belajar</a>
        <a href="#computational-logic">Computational Logic</a>
      </nav>
      <div className="home-header-actions">
        {user && (
          <span className="home-header-user-name" title={user.email}>
            {user.name || user.email}
          </span>
        )}
        {user?.isAdmin && (
          <a className="auth-control" href="/dashboard">
            Dashboard
          </a>
        )}
        <a className="home-header-cta" href={firstChapterHref}>
          Mulai belajar <ArrowRight size={15} />
        </a>
        <AuthControl showUserName={false} />
      </div>
    </header>
  );
}
