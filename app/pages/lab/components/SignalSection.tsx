import { ChevronRight } from "lucide-react";

export function SignalSection() {
  return (
    <section className="lab-signal" aria-label="Prinsip pembelajaran insideLab">
      <span>LEARN THE CONCEPT</span><ChevronRight size={16} />
      <span>WRITE THE CODE</span><ChevronRight size={16} />
      <span>DEBUG THE RESULT</span><ChevronRight size={16} />
      <strong>SHIP THE PROJECT</strong>
    </section>
  );
}
