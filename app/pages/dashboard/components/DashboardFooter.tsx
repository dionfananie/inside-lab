import { InsideLabBrand } from '~/components/inside-lab-brand';

export default function DashboardFooter() {
  return (
    <footer className="dashboard-footer">
      <InsideLabBrand area="Dashboard" />
      <p>Dashboard internal insideLab — data pengguna dan aktivitas belajar.</p>
      <nav aria-label="Navigasi footer">
        <a href="/">Home</a>
        <a href="/computational-logic">Computational Logic</a>
      </nav>
    </footer>
  );
}
