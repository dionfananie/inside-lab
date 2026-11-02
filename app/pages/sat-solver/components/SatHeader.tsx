import { InsideLabBrand } from '~/components/inside-lab-brand';

export default function SatHeader() {
  return (
    <header className="logic-header">
      <InsideLabBrand area="Computational Logic" />
      <nav aria-label="Jalur belajar">
        <a href="/js/values-types-operators">JS Learning</a>
        <a href="/computational-logic/proportional-logic">
          Computational Logic
        </a>
        <a href="/computational-logic/sat-solver" aria-current="page">
          SAT Solver
        </a>
      </nav>
    </header>
  );
}
