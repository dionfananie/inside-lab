import AuthControl from '~/components/AuthControl';
import { InsideLabBrand } from '~/components/inside-lab-brand';

export default function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <InsideLabBrand area="Dashboard" />
      <nav className="dashboard-nav" aria-label="Navigasi utama">
        <a href="/">Home</a>
        <a href="/js/values-types-operators">Learning JS</a>
        <a href="/computational-logic">Computational Logic</a>
      </nav>
      <div className="dashboard-header-actions">
        <AuthControl showUserName />
      </div>
    </header>
  );
}
