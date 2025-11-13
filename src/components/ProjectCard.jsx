// src/components/ProjectCard.jsx
import React from 'react';

export default function ProjectCard({ project, index = 0 }) {
  if (!project) return null;

  const {
    name,
    role,
    period,
    summary,
    highlights = [],
    tech = [],
    tags = [],
    links = {},
    status
  } = project;

  return (
    <article className={`project-card ${index % 2 === 0 ? 'left' : 'right'}`}>
      <header className="project-card__header">
        <div>
          <h3 className="project-card__title">{name}</h3>
          {role && <p className="project-card__role">{role}</p>}
        </div>
        {status && <span className="project-card__status">{status}</span>}
      </header>

      {period && <p className="project-card__period">{period}</p>}

      {summary && <p className="project-card__summary">{summary}</p>}

      {highlights.length > 0 && (
        <ul className="project-card__highlights">
          {highlights.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}

      {(tech.length > 0 || tags.length > 0) && (
        <div className="project-card__meta">
          {tech.length > 0 && (
            <div className="project-card__chips project-card__chips--tech">
              {tech.map((t) => (
                <span key={t} className="chip chip--tech">
                  {t}
                </span>
              ))}
            </div>
          )}
          {tags.length > 0 && (
            <div className="project-card__chips project-card__chips--tags">
              {tags.map((tag) => (
                <span key={tag} className="chip chip--tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {(links.github || links.live) && (
        <footer className="project-card__footer">
          {links.live && (
            <a
              className="project-card__link"
              href={links.live}
              target="_blank"
              rel="noreferrer"
            >
              View site
            </a>
          )}
          {links.github && (
            <a
              className="project-card__link project-card__link--secondary"
              href={links.github}
              target="_blank"
              rel="noreferrer"
            >
              View code
            </a>
          )}
        </footer>
      )}
    </article>
  );
}