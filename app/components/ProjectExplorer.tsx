"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Summary = { number: string; title: string; role: string; type: string };

export default function ProjectExplorer({ projects, children }: { projects: Summary[]; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const articles = root.current?.querySelectorAll<HTMLElement>(".project");
    if (!articles) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(Array.from(articles).indexOf(entry.target as HTMLElement));
    }, { rootMargin: "-20% 0px -45% 0px" });
    articles.forEach(article => observer.observe(article));
    return () => observer.disconnect();
  }, []);
  return <div className="projectExplorer" ref={root}>
    <aside className="projectIndex">
      <p className="indexLabel">SELECTED PROJECTS <span aria-hidden="true">{"✳\uFE0E"}</span>
      <p className="projectCount"><span key={active}>{projects[active].number}</span><small> / 03</small></p>
      <nav aria-label="Project selection">{projects.map((project, index) => <a href={`#project-${project.number}`} key={project.number} className={active === index ? "isActive" : ""} aria-current={active === index ? "location" : undefined} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
        <small>{project.number} — {project.type}</small><strong>{project.title}<span aria-hidden="true">{"↗\uFE0E"}</span></strong><span>{project.role}</span>
      </a>)}</nav>
      <div className="projectProgress" aria-hidden="true"><span style={{ width: `${(active + 1) / projects.length * 100}%` }} /></div>
    </aside>
    <div className="projectList">{children}</div>
  </div>;
}
