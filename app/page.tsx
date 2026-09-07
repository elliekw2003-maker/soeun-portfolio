import ProjectGallery from "./components/ProjectGallery";
import ProjectReveal from "./components/ProjectReveal";

const projects = [
  {
    number: "01",
    title: "ACE Tennis Scheduler",
    type: "Client Project",
    role: "Frontend Developer",
    description:
      "A tennis fixture scheduling system developed for the Waverley Tennis Association.",
    work: [
      "Refined the Competition Management workflow from regular client feedback",
      "Implemented Section and Club filtering in the existing frontend",
      "Designed constraint review and scheduling feedback states",
    ],
    tech: ["Next.js", "TypeScript", "Ant Design", "Figma", "Git"],
    images: [
      {
        src: "/projects/ace-1.png",
        alt: "ACE Tennis Scheduler competition overview with section and club filters above the teams table.",
        caption: "Competition Management",
      },
      {
        src: "/projects/ace-2.png",
        alt: "ACE Tennis Scheduler teams table with section OSD-A 2 selected and two teams displayed.",
        caption: "Section Filter",
      },
      {
        src: "/projects/ace-3.png",
        alt: "ACE Tennis Scheduler constraints table listing related teams and outcomes marked not evaluated.",
        caption: "Constraint Review",
      },
      {
        src: "/projects/ace-4.png",
        alt: "ACE Tennis Scheduler scheduling failed message showing a court availability constraint and affected teams.",
        caption: "Scheduling Error",
      },
      {
        src: "/projects/ace-5.png",
        alt: "ACE Tennis Scheduler scheduling completed message with View Results and Export Fixtures controls.",
        caption: "Fixture Ready",
      },
    ],
    aspectRatio: 3274 / 2048,
    portrait: false,
  },
  {
    number: "02",
    title: "Lunchie Munchie",
    type: "Team Project",
    role: "Software Developer",
    description:
      "A food discovery app with restaurant course planning, social features, and a customisable Lunchicken character.",
    work: [
      "Built feed and profile features including likes, saves, comments and follows",
      "Developed character customisation for outfits, accessories and expressions",
      "Implemented persistent character progression and equipped-item state",
    ],
    tech: ["React", "TypeScript", "Git"],
    images: [
      {
        src: "/projects/lunchie-1.png",
        alt: "Lunchie Munchie character room with a Lunchicken preview, clothing categories and outfit choices.",
        caption: "Character Wardrobe",
      },
      {
        src: "/projects/lunchie-2.png",
        alt: "Lunchie Munchie feed with category filters and a food photo post with reaction and comment controls.",
        caption: "Munchie Feed",
      },
      {
        src: "/projects/lunchie-3.png",
        alt: "Lunchie Munchie profile with a character display, follower counts and a grid of food posts.",
        caption: "Profile & Posts",
      },
      {
        src: "/projects/lunchie-4.png",
        alt: "Lunchie Munchie home screen with Coffee, Foodie and Dessert cards, a Quick Match button and Munchie posts.",
        caption: "Home & Quick Match",
      },
    ],
    aspectRatio: 678 / 1474,
    portrait: true,
  },
  {
    number: "03",
    title: "ShiftPilot",
    type: "Independent Project",
    role: "Full-Stack Developer",
    description:
      "A workforce scheduling app for creating weekly rosters and checking staff coverage.",
    work: [
      "Built weekly roster management with role-specific staffing requirements",
      "Added coverage checks for understaffed and unassigned shifts",
      "Built the full-stack application with a REST API and PostgreSQL database",
    ],
    tech: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "REST APIs"],
    images: [
      {
        src: "/projects/shiftpilot-1.png",
        alt: "ShiftPilot weekly roster with role-based shift cards marked fully staffed, understaffed or empty.",
        caption: "Weekly Roster",
      },
      {
        src: "/projects/shiftpilot-2.png",
        alt: "ShiftPilot dashboard with staffing summary cards, shifts needing attention and an upcoming shifts table.",
        caption: "Staffing Dashboard",
      },
    ],
    aspectRatio: 1510 / 875,
    portrait: false,
  },
] as const;

export default function Home() {
  return (
    <main>
      {/* NAV */}
      <nav className="nav container" aria-label="Main navigation">
        <a href="#top" className="logo" aria-label="Soeun Kwon — back to top">
          Soeun Kwon<span className="nameDot" aria-hidden="true" />
        </a>

        <div className="navLinks">
          <a href="#work">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero container" id="top" aria-labelledby="hero-title">
        <p className="heroIntro">Hi, I’m Soeun.</p>
        <h1 id="hero-title">
          <span className="heroLine">FRONTEND</span>{" "}
          <span className="heroLine">DEVELOPER.</span>
        </h1>
        <div className="heroBottom">
          <div className="heroSignature">
            <svg className="heroGraphic" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <circle cx="40" cy="40" r="36" fill="currentColor" />
              <path d="M40 18V62M18 40H62M24.5 24.5L55.5 55.5M24.5 55.5L55.5 24.5" stroke="var(--text)" strokeWidth="2" />
            </svg>
            <p className="heroLocation">Based in Melbourne,<br />Australia.</p>
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

        <div className="projectList">
          {projects.map((project) => (
            <ProjectReveal key={project.title}>
              <div className="projectContent">
                <div className="projectDetails">
                  <div className="projectHeading">
                    <span className="projectNumber">{project.number}</span>
                    <span className="projectType">{project.type}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="projectRole">{project.role}</p>
                  <p className="projectDescription">{project.description}</p>
                  <div className="detailBlock">
                    <h4 className="detailLabel">My contribution</h4>
                    <ol className="workItems">
                      {project.work.map((item, index) => (
                        <li className="workItem" key={item}>
                          <span aria-hidden="true">0{index + 1}</span>
                          <p>{item}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="detailBlock">
                    <h4 className="detailLabel">Stack</h4>
                    <div className="techList">
                      {project.tech.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                </div>
                <ProjectGallery
                  projectTitle={project.title}
                  images={project.images}
                  aspectRatio={project.aspectRatio}
                  portrait={project.portrait}
                />
              </div>
            </ProjectReveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="aboutSection" id="about" aria-labelledby="about-title">
        <div className="container">
          <div className="aboutIntro">
            <h2 id="about-title">A little<br />about me.</h2>

            <div className="aboutCopy">
              <p className="aboutLead">
                I’m Soeun, a frontend developer studying Computing and Software Systems
                at the University of Melbourne.
              </p>
              <p>
                I enjoy figuring out how an application should work, then bringing it
                to life through code. My projects span client-facing scheduling tools,
                team-built applications and independent full-stack development.
              </p>
              <p>
                I work mainly with React, Next.js and TypeScript, with additional
                experience in APIs and databases.
              </p>
            </div>
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
