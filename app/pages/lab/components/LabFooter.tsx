import { InsideLabBrand } from "~/components/inside-lab-brand";

export function LabFooter() {
  return (
    <footer className="lab-footer lab-shell">
      <InsideLabBrand area="Software Engineer Lab" />
      <p>Learn deeply. Build deliberately. Ship confidently.</p>
      <nav aria-label="Navigasi footer Lab">
        <a href="/">Home</a>
        <a href="/js/values-types-operators">JavaScript</a>
        <a href="/play">Runtime</a>
        <a href="/computational-logic/proportional-logic">Logic Lab</a>
      </nav>
    </footer>
  );
}
