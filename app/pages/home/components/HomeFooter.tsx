import { InsideLabBrand } from "~/components/inside-lab-brand";
import { useAuth } from "~/lib/auth";

type HomeFooterProps = {
  firstChapterHref: string;
};

export default function HomeFooter({ firstChapterHref }: HomeFooterProps) {
  const { user } = useAuth();

  return (
    <footer className="home-footer">
      <InsideLabBrand area="Lab Belajar" />
      <p>Ruang belajar interaktif untuk JavaScript dan computational logic.</p>
      <nav aria-label="Navigasi footer">
        <a href={firstChapterHref}>JavaScript</a>
        <a href="/computational-logic">Computational Logic</a>
        <a href="/computational-logic/sat-solver">SAT Solver</a>
        <a href="/play">Runtime JS</a>
        {user?.isAdmin && <a href="/dashboard">Dashboard</a>}
      </nav>
    </footer>
  );
}
