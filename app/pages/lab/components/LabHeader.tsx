import { ArrowRight } from "lucide-react";

import { InsideLabBrand } from "~/components/inside-lab-brand";

export function LabHeader() {
  return (
    <header className="lab-header lab-enter lab-enter-1">
      <InsideLabBrand area="Software Engineer Lab" />
      <nav aria-label="Navigasi utama Lab">
        <a href="#path">Learning path</a>
        <a href="#languages">Languages</a>
        <a href="#skills">Engineer skills</a>
      </nav>
      <a className="lab-header-cta" href="/js/values-types-operators">
        Mulai belajar <ArrowRight size={15} />
      </a>
    </header>
  );
}
