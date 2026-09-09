import { InsideLabBrand } from '~/components/inside-lab-brand';

export default function LogicHeader() {
  return (
    <header className="logic-header">
      <InsideLabBrand area="Computational Logic" />
      <nav aria-label="Jalur belajar">
        <a href="/js/values-types-operators">JS Learning</a>
        <a href="/computational-logic/proportional-logic" aria-current="page">
          Computational Logic
        </a>
      </nav>
    </header>
  );
}
