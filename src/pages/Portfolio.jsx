// src/pages/Portfolio.jsx
import React from 'react';
import projects from '../config/projects';
import ProjectCard from '../components/ProjectCard';

export default function Portfolio() {
  return (
    <main className="page portfolio-page">
      <header className="page-header">
        <h1>Portfolio</h1>
        <p className="page-subtitle">
          A taste of the things I’ve been building lately — from experiments that started as “what ifs” to full-blown apps. Most of my professional work hides behind NDAs, but these projects give a glimpse into how I think, build, and tinker.
        </p>
      </header>

      <section className="portfolio-grid">
  {projects.map((project, index) => (
    <ProjectCard
      key={project.id}
      project={project}
      index={index}
    />
  ))}
</section>
    </main>
  );
}