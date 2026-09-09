import { ArrowRight } from "lucide-react";

type FinalSectionProps = {
  firstChapterHref: string;
};

export default function FinalSection({ firstChapterHref }: FinalSectionProps) {
  return (
    <section className="home-final" aria-labelledby="final-title">
      <div className="home-final-mark" aria-hidden="true">
        <span>01</span>
        <code>const nextStep = "mulai";</code>
      </div>
      <div>
        <div className="home-section-number">LANGKAH PERTAMA</div>
        <h2 id="final-title">
          Mulai dari satu nilai. Bangun cara berpikir yang lebih kuat.
        </h2>
        <p>
          Bab pertama mengenalkan nilai, tipe data, dan operator melalui delapan
          bagian yang langsung bisa kamu coba.
        </p>
      </div>
      <a className="home-button home-button-light" href={firstChapterHref}>
        Mulai Bab 01 <ArrowRight size={17} />
      </a>
    </section>
  );
}
