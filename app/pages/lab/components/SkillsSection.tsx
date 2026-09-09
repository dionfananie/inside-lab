import { Code2 } from "lucide-react";

import { engineeringSkills } from "../data";

export function SkillsSection() {
  return (
    <section className="lab-skills" id="skills" aria-labelledby="skills-title">
      <div className="lab-shell">
        <div className="lab-section-heading">
          <div>
            <div className="lab-section-label">BEYOND THE LANGUAGE</div>
            <h2 id="skills-title">Kode hanyalah satu bagian dari engineering.</h2>
          </div>
          <p>
            Engineer yang siap bekerja tahu cara menemukan masalah, menjaga
            kualitas, dan bekerja di dalam sistem bersama orang lain.
          </p>
        </div>
        <div className="lab-skills-grid">
          {engineeringSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <article className={skill.className} key={skill.label}>
                <div><Icon size={22} /><small>{skill.label}</small></div>
                <h3>{skill.title}</h3>
                <p>{skill.copy}</p>
              </article>
            );
          })}
          <article className="lab-skill-core" aria-label="Software engineering skill map">
            <div className="lab-core-ring lab-core-ring-one" />
            <div className="lab-core-ring lab-core-ring-two" />
            <span><Code2 size={23} /></span>
            <strong>ENGINEER<br />MINDSET</strong>
            <small>THINK · BUILD · VERIFY</small>
          </article>
        </div>
      </div>
    </section>
  );
}
