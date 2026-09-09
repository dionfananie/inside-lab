import { ArrowRight } from "lucide-react";

import { InsideLabBrand } from "~/components/inside-lab-brand";

type HomeHeaderProps = {
  firstChapterHref: string;
};

export default function HomeHeader({ firstChapterHref }: HomeHeaderProps) {
  return (
    <header className="home-header home-reveal">
      <InsideLabBrand area="Lab Belajar" />
      <nav className="home-nav" aria-label="Navigasi utama">
        <a href="#cara-belajar">Cara belajar</a>
        <a href="#materi">Materi</a>
        <a href="#laboratorium">Laboratorium</a>
      </nav>
      <a className="home-header-cta" href={firstChapterHref}>
        Mulai belajar <ArrowRight size={15} />
      </a>
    </header>
  );
}
