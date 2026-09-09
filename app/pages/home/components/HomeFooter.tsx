import { InsideLabBrand } from "~/components/inside-lab-brand";

type HomeFooterProps = {
  firstChapterHref: string;
};

export default function HomeFooter({ firstChapterHref }: HomeFooterProps) {
  return (
    <footer className="home-footer">
      <InsideLabBrand area="Lab Belajar" />
      <p>Ruang belajar interaktif untuk JavaScript dan computational logic.</p>
      <nav aria-label="Navigasi footer">
        <a href={firstChapterHref}>JavaScript</a>
        <a href="/computational-logic/proportional-logic">Logic Lab</a>
        <a href="/play">Runtime JS</a>
      </nav>
    </footer>
  );
}
