"use client"

import styles from "./cv.module.css"
import { resume, type ResumeRole } from "./content"

function LinkList({
  links,
  className = "",
}: {
  links: { label: string; href: string; display: string }[]
  className?: string
}) {
  return (
    <ul className={`${styles.linkList} ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} target="_blank" rel="noreferrer">
            <span className={styles.srOnly}>{link.label}: </span>
            {link.display}
          </a>
        </li>
      ))}
    </ul>
  )
}

function Section({
  index,
  title,
  children,
  className = "",
}: {
  index: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`${styles.section} ${className}`}>
      <div className={styles.sectionRule} aria-hidden="true" />
      <div className={styles.sectionHeading}>
        <span className={styles.sectionIndex}>{index}</span>
        <h2>{title}</h2>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

function Role({ role, compact = false }: { role: ResumeRole; compact?: boolean }) {
  return (
    <article className={`${styles.role} ${compact ? styles.roleCompact : ""}`}>
      <div className={styles.roleHeader}>
        <div>
          <h3>{role.title}</h3>
          <p className={styles.roleMeta}>
            {role.companyUrl ? (
              <a href={role.companyUrl} target="_blank" rel="noreferrer">
                {role.company}
              </a>
            ) : (
              role.company
            )}
            {role.location ? <span> · {role.location}</span> : null}
          </p>
        </div>
        <time dateTime={role.dates}>{role.dates}</time>
      </div>
      <ul className={styles.bullets}>
        {role.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

function Masthead({ continuation = false }: { continuation?: boolean }) {
  if (continuation) {
    return (
      <div className={styles.continuation}>
        <span>RJ / CV</span>
        <span>AI Product Engineer</span>
        <span>02 / 02</span>
      </div>
    )
  }

  return (
    <header className={styles.masthead}>
      <div className={styles.mastheadTop}>
        <div>
          <p className={styles.eyebrow}>RJ / portfolio of practice</p>
          <h1>{resume.name}</h1>
        </div>
        <div className={styles.roleMark}>
          <span>AI</span>
          <span>Product Engineer</span>
        </div>
        <span className={styles.documentMark}>CV / 2026</span>
      </div>
      <div className={styles.contactRow}>
        <span>{resume.location}</span>
        <a href={`mailto:${resume.email}`}>{resume.email}</a>
        <LinkList links={resume.links} />
      </div>
    </header>
  )
}

function Highlights() {
  return (
    <div className={styles.highlights} aria-label="Career highlights">
      {resume.highlights.map((highlight) => (
        <div className={styles.highlight} key={highlight.label}>
          <strong>{highlight.value}</strong>
          <span>{highlight.label}</span>
        </div>
      ))}
    </div>
  )
}

function Skills() {
  return (
    <div className={styles.skillGrid}>
      {resume.skills.map((group) => (
        <div className={styles.skillGroup} key={group.label}>
          <h3>{group.label}</h3>
          <p>{group.items.join(" · ")}</p>
        </div>
      ))}
    </div>
  )
}

function Projects() {
  const primaryProjects = resume.projects.slice(0, 3)
  const modernGithub = resume.projects[3]
  const legacyGithub = resume.projects[4]

  return (
    <ul className={styles.projectList}>
      {primaryProjects.map((project) => (
        <li key={project.name}>
          <div>
            <a href={project.href} target="_blank" rel="noreferrer">
              {project.name}
            </a>
            <span>{project.note}</span>
          </div>
          <time>{project.dates}</time>
        </li>
      ))}
      <li>
        <div>
          <a href={modernGithub.href} target="_blank" rel="noreferrer">
            {modernGithub.name}
          </a>
          <span>{modernGithub.note}</span>
          <span aria-hidden="true"> / </span>
          <a href={legacyGithub.href} target="_blank" rel="noreferrer">
            {legacyGithub.name}
          </a>
          <span>{legacyGithub.note}</span>
        </div>
        <time>
          {modernGithub.dates} / {legacyGithub.dates}
        </time>
      </li>
    </ul>
  )
}

export default function Page() {
  return (
    <main className={styles.screenShell}>
      <div className={styles.screenToolbar}>
        <p>
          <span className={styles.toolbarDot} aria-hidden="true" />
          cv.rj11.io / profile
        </p>
        <button type="button" onClick={() => window.print()}>
          Download PDF <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className={styles.cvDocument}>
        <div className={styles.printPage}>
          <Masthead />

          <Section index="01" title="Summary" className={styles.summarySection}>
            <div className={styles.summaryCopy}>
              {resume.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Highlights />
          </Section>

          <Section index="02" title="Skills" className={styles.skillsSection}>
            <Skills />
          </Section>

          <Section index="03" title="Experience">
            <div className={styles.roleList}>
              {resume.roles.slice(0, 3).map((role) => (
                <Role key={`${role.company}-${role.dates}`} role={role} />
              ))}
            </div>
          </Section>

          <Section index="06" title="Outside the build" className={styles.interestsSection}>
            <ul className={styles.interestList}>
              {resume.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div className={styles.printPage}>
          <Masthead continuation />

          <Section index="03" title="Experience" className={styles.continuedSection}>
            <div className={styles.roleList}>
              {resume.roles.slice(3, 5).map((role) => (
                <Role key={`${role.company}-${role.dates}`} role={role} />
              ))}
              <div className={styles.earlierLabel}>Earlier experience</div>
              {resume.roles.slice(5).map((role) => (
                <Role key={`${role.company}-${role.dates}`} role={role} compact />
              ))}
            </div>
          </Section>

          <div className={styles.bottomGrid}>
            <Section index="04" title="Education" className={styles.bottomSection}>
              <div className={styles.education}>
                <div>
                  <h3>{resume.education.title}</h3>
                  <p>{resume.education.institution}</p>
                  <p>{resume.education.detail}</p>
                  <p>{resume.education.location}</p>
                </div>
                <time>{resume.education.dates}</time>
              </div>
            </Section>

            <Section index="05" title="Projects" className={styles.bottomSection}>
              <Projects />
            </Section>
          </div>

        </div>
      </div>
    </main>
  )
}
