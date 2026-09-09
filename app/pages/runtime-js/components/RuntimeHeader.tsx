import { Braces } from "lucide-react";

export default function RuntimeHeader() {
  return (
    <header className="runtime-topbar">
      <a className="runtime-brand" href="/play" aria-label="Runtime JS home">
        <span className="runtime-brand-icon">
          <Braces size={22} />
        </span>
        runtime<span className="runtime-js-word">js</span>
        <span className="runtime-beta">PLAYGROUND</span>
      </a>
      <div className="runtime-header-note">Less setup. More experimenting.</div>
    </header>
  );
}
