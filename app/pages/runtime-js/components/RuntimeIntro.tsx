import { Zap } from "lucide-react";

export default function RuntimeIntro() {
  return (
    <section className="runtime-intro">
      <div>
        <div className="runtime-eyebrow">
          <span /> YOUR JAVASCRIPT SCRATCHPAD
        </div>
        <h1>Think it. Type it. See it.</h1>
        <p>A place for quick ideas, curious experiments, and instant answers.</p>
      </div>
      <div className="runtime-live-badge">
        <Zap size={15} fill="currentColor" /> No run button needed
      </div>
    </section>
  );
}
