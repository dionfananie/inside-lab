import { CircleCheck } from "lucide-react";

export default function RuntimePageFooter() {
  return (
    <footer className="runtime-page-footer">
      <span>
        <CircleCheck size={14} /> Runs in your browser
      </span>
      <span>
        Auto-runs after 400 ms <span className="runtime-footer-dot">·</span>
        Tab to indent <span className="runtime-footer-dot">·</span>
        Async / await supported
      </span>
      <span className="runtime-footer-end">Make something click.</span>
    </footer>
  );
}
