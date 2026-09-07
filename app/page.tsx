import ProjectGallery from "./components/ProjectGallery";
import { projects } from "./data/projects";
import PortfolioMotion from "./components/PortfolioMotion";
import ProjectExplorer from "./components/ProjectExplorer";
import SiteMenu from "./components/SiteMenu";
import AboutGraphic from "./components/AboutGraphic";

export default function Home() {
  return (
    <main>
      <PortfolioMotion />
      {/* NAV */}
      <nav className="nav container" aria-label="Main navigation">
        <a href="#top" className="logo" aria-label="Soeun Kwon — back to top">
          Soeun Kwon<span className="nameDot" aria-hidden="true" />
        </a>

        <SiteMenu />
      </nav>

      {/* HERO */}
      <section className="hero container" id="top" aria-labelledby="hero-title">
        <p className="heroIntro">Hi, I’m Soeun.</p>
        <h1 id="hero-title" aria-label="Software Developer.">
          {["SOFTWARE", "DEVELOPER."].map((word) => <span className="heroLine" aria-hidden="true" key={word}>{[...word].map((letter, index) => <span className="heroChar" key={index}>{letter}</span>)}</span>)}
        </h1>
        <div className="heroBottom">
          <div className="heroSignature">
            <svg className="heroGraphic" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <circle cx="40" cy="40" r="36" fill="currentColor" />
              <path d="M40 18V62M18 40H62M24.5 24.5L55.5 55.5M24.5 55.5L55.5 24.5" stroke="var(--text)" strokeWidth="2" />
            </svg>
            <p className="heroLocation">In Melbourne,<br />Australia.</p>
          </div>
          <div className="heroCopy">
            <p className="heroDescription">
              I build interactive web applications with React, Next.js and TypeScript.
            </p>
            <a className="projectButton" href="#work">
              Explore projects <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="workSection container" id="work" aria-labelledby="projects-title">
        <div className="sectionTitle">
          <h2 id="projects-title">Projects</h2>
          <span>Client, team &amp; independent work</span>
        </div>

        <ProjectExplorer projects={projects.map(({number,title,role,type}) => ({number,title,role,type}))}>
          {projects.map((project) => (
            <article className="project" id={`project-${project.number}`} key={project.title} aria-labelledby={`title-${project.number}`}>
              <div className="projectHeading"><span>{project.number} / {project.type}</span><span>{project.role}</span></div>
              <h3 id={`title-${project.number}`}>{project.title}</h3>
              <p className="projectDescription">{project.description}</p>
              <ProjectGallery projectTitle={project.title} images={project.images} aspectRatio={project.aspectRatio} portrait={project.portrait} />
              <div className="detailBlock"><h4 className="detailLabel">My contribution</h4><ol className="workItems">{project.work.map((item,index) => <li className="workItem" key={item}><span aria-hidden="true">0{index+1}</span><p>{item}</p></li>)}</ol></div>
              <div className="techList">{project.tech.map(item => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </ProjectExplorer>
      </section>

      {/* ABOUT */}
      <section className="aboutSection" id="about" aria-labelledby="about-title">
        <div className="container">
          <header className="aboutIntro">
            <h2 id="about-title">A little about me<span>.</span></h2>
            <p className="aboutLead">I’m Soeun, a frontend developer studying Computing and Software Systems at the University of Melbourne.</p>
            <a href="#about-story" className="aboutScroll">SCROLL <span aria-hidden="true">↓</span></a>
          </header>
          <div className="aboutStory" id="about-story">
            <div className="aboutCopy"><h3>From figuring it out<br />to building it.</h3><p>I enjoy figuring out how an application should work, then bringing it to life through code. My projects span client-facing scheduling tools, team-built applications and independent full-stack development.</p><p>I work mainly with React, Next.js and TypeScript, with additional experience in APIs and databases.</p></div>
            <AboutGraphic />
          </div>

          <div className="skills">
            <div className="skillColumn">
              <h3 className="detailLabel">Frontend</h3>
              <span>React</span>
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>JavaScript</span>
            </div>

            <div className="skillColumn">
              <h3 className="detailLabel">Tools &amp; Collaboration</h3>
              <span>Figma</span>
              <span>Git</span>
              <span>GitHub</span>
            </div>

            <div className="skillColumn">
              <h3 className="detailLabel">Backend &amp; Data</h3>
              <span>NestJS</span>
              <span>REST APIs</span>
              <span>PostgreSQL</span>
              <span>Prisma</span>
            </div>

            <div className="skillColumn">
              <h3 className="detailLabel">Education</h3>
              <span>University of Melbourne</span>
              <span>Bachelor of Science</span>
              <span>Computing and Software Systems</span>
              <span>Expected 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contactSection container" id="contact" aria-labelledby="contact-title">
        <p className="contactLabel">GET IN TOUCH</p>

        <h2 id="contact-title">Let’s connect.</h2>

        <div className="contactLinks">
          <a className="emailLink" href="mailto:elliekw2003@gmail.com">
            <span>elliekw2003@gmail.com</span> <span aria-hidden="true">↗</span>
          </a>

          <div>
            <a
              href="https://github.com/elliekw2003-maker"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://linkedin.com/in/soeun-kwon-52771541a"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="container">
        <span>© 2026 Soeun Kwon</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
