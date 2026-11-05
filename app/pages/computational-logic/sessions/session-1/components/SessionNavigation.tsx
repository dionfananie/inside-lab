import { ArrowUp, Check } from "lucide-react";
import { useEffect, useState } from "react";

type SessionSection = {
  id: string;
  label: string;
};

type SessionNavigationProps = {
  sections: SessionSection[];
};

const storageKey = "inside-lab:computational-logic:session-1:read-sections:v1";

export default function SessionNavigation({ sections }: SessionNavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const [readSections, setReadSections] = useState<string[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (id): id is string =>
              typeof id === "string" && sections.some((section) => section.id === id),
          );
          setReadSections((current) => Array.from(new Set([...current, ...valid])));
        }
      }
    } catch {
      // Progress is optional; ignore unavailable or corrupt storage.
    }
    setHasLoadedProgress(true);
  }, [sections]);

  useEffect(() => {
    if (!hasLoadedProgress) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(readSections));
    } catch {
      // Progress is optional; ignore unavailable storage.
    }
  }, [hasLoadedProgress, readSections]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleIds = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visibleIds.length === 0) return;

        setReadSections((current) => {
          const next = new Set(current);
          visibleIds.forEach((id) => next.add(id));
          return next.size === current.length ? current : Array.from(next);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.32;
      let currentIndex = 0;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= threshold) {
          currentIndex = index;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        currentIndex = sections.length - 1;
      }

      const currentId = sections[currentIndex]?.id;
      if (currentId) setActiveSection(currentId);

      setReadSections((current) => {
        const next = new Set(current);
        sections.slice(0, currentIndex + 1).forEach((section) => next.add(section.id));
        return next.size === current.length ? current : Array.from(next);
      });
      setShowBackToTop(window.scrollY > 320);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  const readCount = readSections.length;
  const progress = sections.length === 0 ? 0 : (readCount / sections.length) * 100;

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <>
      <span className="computational-section-label">DI SESI INI</span>
      <div className="session-one-read-progress">
        <div>
          <strong>{readCount}</strong>/{sections.length} bagian
        </div>
        <div
          className="session-one-read-track"
          role="progressbar"
          aria-label="Progres bagian yang sudah dibaca"
          aria-valuemin={0}
          aria-valuemax={sections.length}
          aria-valuenow={readCount}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <nav>
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const isRead = readSections.includes(section.id);

          return (
            <a
              className={`${isActive ? "is-active" : ""}${isRead ? " is-read" : ""}`}
              href={`#${section.id}`}
              key={section.id}
              aria-current={isActive ? "location" : undefined}
            >
              <span className="session-one-toc-check" aria-hidden="true">
                {isRead ? <Check size={12} /> : <span />}
              </span>
              {section.label}
            </a>
          );
        })}
      </nav>
      {showBackToTop && (
        <button
          className="session-one-back-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
        >
          <ArrowUp size={15} /> Ke atas
        </button>
      )}
    </>
  );
}
