import Image from "next/image";

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
    image: "/projects/ace-main.png",
    portrait: false,
    visualLabel: "Competition Management",
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
    image: "/projects/lunchie-main.png",
    portrait: true,
    visualLabel: "Character Customisation",
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
    image: "/projects/shiftpilot-main.png",
    portrait: false,
    visualLabel: "Weekly Roster",
  },
];

export default function Home() {
  return (
    <main>
      {/* NAV */}
      <nav className="nav">
        <a href="#top" className="logo">
          SK
        </a>

        <div className="navLinks">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="heroEyebrow">
          FRONTEND DEVELOPER · MELBOURNE, AUSTRALIA
        </div>

        <div className="heroMain">
          <h1>
            Hi, I&apos;m <span>Soeun.</span>
            <br />
            I design &amp; build
            <br />
            digital interfaces.
          </h1>
        </div>

        <div className="heroBottom">
          <p>
            Computing and Software Systems student at the University of
            Melbourne, focused on frontend development and turning project
            requirements into working interfaces.
          </p>

          <a className="scrollButton" href="#work" aria-label="View work">
            ↓
          </a>
        </div>
      </section>

      {/* SKILLS STRIP */}
      <div className="skillStrip">
        <span>React</span>
        <span>TypeScript</span>
        <span>Next.js</span>
        <span>Figma</span>
        <span>Frontend Development</span>
      </div>

      {/* WORK */}
      <section className="workSection" id="work">
        <div className="sectionTitle">
          <span>Selected Work</span>
          <span>2026</span>
        </div>

        <div className="projectList">
          {projects.map((project) => (
            <article className="project" key={project.title}>
              <div className="projectHeading">
                <span className="projectNumber">{project.number}</span>

                <div className="projectType">
                  <span>{project.type}</span>
                  <span>{project.role}</span>
                </div>
              </div>

              <h2>{project.title}</h2>

              <div
                className={`projectContent ${
                  project.portrait ? "portraitProject" : ""
                }`}
              >
                {/* IMAGE */}
                <div
                  className={`projectVisual ${
                    project.portrait
                      ? "portraitVisual"
                      : "landscapeVisual"
                  }`}
                >
                  <div className="visualLabel">{project.visualLabel}</div>

                  <div
                    className={
                      project.portrait
                        ? "portraitImageWrap"
                        : "landscapeImageWrap"
                    }
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} interface`}
                      width={project.portrait ? 680 : 1600}
                      height={project.portrait ? 1474 : 950}
                      className={
                        project.portrait
                          ? "portraitImage"
                          : "landscapeImage"
                      }
                      priority={project.number === "01"}
                    />
                  </div>
                </div>

                {/* TEXT */}
                <div className="projectDetails">
                  <p className="projectDescription">
                    {project.description}
                  </p>

                  <div className="detailBlock">
                    <p className="detailLabel">What I worked on</p>

                    <div className="workItems">
                      {project.work.map((item, index) => (
                        <div className="workItem" key={item}>
                          <span>0{index + 1}</span>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detailBlock">
                    <p className="detailLabel">Stack</p>

                    <div className="techList">
                      {project.tech.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="aboutSection" id="about">
        <div className="sectionTitle aboutTitle">
          <span>About</span>
          <span>04</span>
        </div>

        <div className="aboutIntro">
          <h2>
            I like working between
            <br />
            <span>design and development.</span>
          </h2>

          <div className="aboutCopy">
            <p>
              I&apos;m a Computing and Software Systems student at the
              University of Melbourne, with a focus on frontend development.
            </p>

            <p>
              Through client, team, and independent projects, I&apos;ve worked
              across UI design, frontend implementation, APIs and
              database-backed applications.
            </p>
          </div>
        </div>

        <div className="skills">
          <div className="skillColumn">
            <p className="detailLabel darkLabel">Frontend</p>
            <span>React</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>JavaScript</span>
          </div>

          <div className="skillColumn">
            <p className="detailLabel darkLabel">Design & Collaboration</p>
            <span>Figma</span>
            <span>Git</span>
            <span>GitHub</span>
          </div>

          <div className="skillColumn">
            <p className="detailLabel darkLabel">Backend & Data</p>
            <span>NestJS</span>
            <span>REST APIs</span>
            <span>PostgreSQL</span>
            <span>Prisma</span>
          </div>

          <div className="skillColumn">
            <p className="detailLabel darkLabel">Education</p>
            <span>University of Melbourne</span>
            <span>Bachelor of Science</span>
            <span>Computing and Software Systems</span>
            <span>Expected Jan 2027</span>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contactSection" id="contact">
        <p className="contactLabel">GET IN TOUCH</p>

        <h2>
          Let&apos;s build
          <br />
          something good.
        </h2>

        <div className="contactLinks">
          <a href="mailto:elliekw2003@gmail.com">
            elliekw2003@gmail.com ↗
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

      <footer>
        <span>© 2026 Soeun Kwon</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}