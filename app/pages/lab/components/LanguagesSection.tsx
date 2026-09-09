import type { CSSProperties } from "react";
import { ArrowRight, Check, Code2 } from "lucide-react";

import { languages } from "../data";
import type { LabPageInteractions } from "../useLabPage";

type LanguagesSectionProps = Pick<
  LabPageInteractions,
  "activeLanguage" | "setLanguageId"
>;

export function LanguagesSection({
  activeLanguage,
  setLanguageId,
}: LanguagesSectionProps) {
  return (
    <section className="lab-languages lab-shell" id="languages" aria-labelledby="languages-title">
      <div className="lab-section-heading lab-section-heading-dark">
        <div>
          <div className="lab-section-label">ONE MINDSET, FOUR LANGUAGES</div>
          <h2 id="languages-title">Bahasa berbeda. Konsep yang saling terhubung.</h2>
        </div>
        <p>
          Jangan bertanya bahasa mana yang paling hebat. Pelajari peran setiap
          bahasa dan pilih berdasarkan masalah yang ingin kamu selesaikan.
        </p>
      </div>

      <div className="lab-language-tabs" role="tablist" aria-label="Pilih bahasa pemrograman">
        {languages.map((language) => (
          <button
            type="button"
            role="tab"
            aria-selected={language.id === activeLanguage.id}
            aria-controls="language-panel"
            id={`language-tab-${language.id}`}
            className={language.id === activeLanguage.id ? "is-active" : ""}
            onClick={() => setLanguageId(language.id)}
            key={language.id}
          >
            <span style={{ "--language-accent": language.accent } as CSSProperties}>
              {language.short}
            </span>
            {language.name}
          </button>
        ))}
      </div>

      <div
        className="lab-language-panel"
        id="language-panel"
        role="tabpanel"
        aria-labelledby={`language-tab-${activeLanguage.id}`}
        key={activeLanguage.id}
        style={{ "--language-accent": activeLanguage.accent } as CSSProperties}
      >
        <div className="lab-language-copy">
          <small>WHY {activeLanguage.name.toUpperCase()}?</small>
          <h3>{activeLanguage.role}</h3>
          <p>{activeLanguage.description}</p>
          <ul>
            {activeLanguage.uses.map((use) => (
              <li key={use}><Check size={14} /> {use}</li>
            ))}
          </ul>
          {activeLanguage.id === "javascript" ? (
            <a href="/js/values-types-operators">
              Buka jalur JavaScript <ArrowRight size={16} />
            </a>
          ) : (
            <span className="lab-coming-soon">ROADMAP DISIAPKAN · MULAI DARI FONDASI JS</span>
          )}
        </div>
        <div className="lab-language-code">
          <div>
            <span><Code2 size={14} /> concept.{activeLanguage.id === "python" ? "py" : activeLanguage.id === "cpp" ? "cpp" : activeLanguage.id === "java" ? "java" : "js"}</span>
            <small>same idea / new syntax</small>
          </div>
          <pre>
            {activeLanguage.code.map(([token, rest], index) => (
              <code key={index}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                <b>{token}</b>{rest}{"\n"}
              </code>
            ))}
          </pre>
          <footer>
            <span><i /> CONCEPT TRANSFER</span>
            <strong>Array → Transform → Result</strong>
          </footer>
        </div>
      </div>
    </section>
  );
}
