import { readFileSync } from "node:fs"
import path from "node:path"

import { PrintButton } from "./PrintButton"
import styles from "./page.module.css"

type LinkItem = {
  label: string
  text: string
  href: string
}

type Highlight = {
  label: string
  value: string
}

type SkillGroup = {
  label: string
  items: string[]
}

type Project = {
  name: string
  url: string
  label: string
  dates: string
  description: string
}

type Role = {
  title: string
  company: string
  url: string
  urlLabel: string
  dates: string
  meta: string
  printPage: 1 | 2
  bullets: string[]
}

type EarlierRole = {
  title: string
  company: string
  dates: string
  description: string
}

type CvContent = {
  candidate: {
    name: string
    headline: string
    location: string
    email: string
    site: string
    sourceClaim: string
  }
  links: LinkItem[]
  profile: string[]
  highlights: Highlight[]
  origins: string
  skills: SkillGroup[]
  projects: Project[]
  experience: Role[]
  earlier: EarlierRole[]
  education: {
    title: string
    school: string
    location: string
    dates: string
    credential: string
  }
}

function readCvContent(): CvContent {
  const contentPath = path.join(
    process.cwd(),
    "app/codex-gpt5.5-xhigh/content.md"
  )
  const markdown = readFileSync(contentPath, "utf8")
  const model = markdown.match(/```json cv-model\n([\s\S]*?)\n```/)

  if (!model) {
    throw new Error("Missing cv-model JSON block in content.md")
  }

  return JSON.parse(model[1]) as CvContent
}

function Section({
  title,
  children,
  compact = false,
}: {
  title: string
  children: React.ReactNode
  compact?: boolean
}) {
  return (
    <section className={`${styles.section} ${compact ? styles.compact : ""}`}>
      <h2>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  )
}

function RoleBlock({ role }: { role: Role }) {
  return (
    <article className={styles.role}>
      <header className={styles.roleHeader}>
        <div>
          <h3>{role.title}</h3>
          <p className={styles.roleMeta}>
            {role.company}
            <span aria-hidden="true"> / </span>
            <ExternalLink href={role.url}>{role.urlLabel}</ExternalLink>
            <span aria-hidden="true"> / </span>
            {role.meta}
          </p>
        </div>
        <p className={styles.roleDates}>{role.dates}</p>
      </header>
      <ul className={styles.bullets}>
        {role.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className={styles.skillsGrid}>
      {groups.map((group) => (
        <div className={styles.skillGroup} key={group.label}>
          <h3>{group.label}</h3>
          <p>{group.items.join(" / ")}</p>
        </div>
      ))}
    </div>
  )
}

function Projects({ projects }: { projects: Project[] }) {
  return (
    <div className={styles.projectsGrid}>
      {projects.map((project) => (
        <article className={styles.project} key={project.name}>
          <div>
            <h3>{project.name}</h3>
            <ExternalLink href={project.url}>{project.label}</ExternalLink>
          </div>
          <p className={styles.projectDates}>{project.dates}</p>
          <p>{project.description}</p>
        </article>
      ))}
    </div>
  )
}

export default function Page() {
  const cv = readCvContent()
  const pageOneRoles = cv.experience.filter((role) => role.printPage === 1)
  const pageTwoRoles = cv.experience.filter((role) => role.printPage === 2)

  return (
    <main className={styles.shell} id="main-content">
      <PrintButton className={styles.printButton} />

      <div className={styles.document} aria-label="Ricardo Jorge CV">
        <article className={`${styles.sheet} ${styles.firstSheet}`}>
          <header className={styles.hero}>
            <div className={styles.identity}>
              <p className={styles.kicker}>{cv.candidate.location}</p>
              <h1>{cv.candidate.name}</h1>
              <p className={styles.headline}>{cv.candidate.headline}</p>
              <p className={styles.sourceClaim}>{cv.candidate.sourceClaim}</p>
            </div>

            <address className={styles.contact} aria-label="Contact links">
              {cv.links.map((link) => (
                <p key={link.href}>
                  <span>{link.label}</span>
                  <ExternalLink href={link.href}>{link.text}</ExternalLink>
                </p>
              ))}
            </address>
          </header>

          <ul className={styles.signalGrid} aria-label="Positioning highlights">
            {cv.highlights.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>

          <Section title="Profile">
            <div className={styles.profileText}>
              {cv.profile.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Section>

          <Section title="Skills" compact>
            <Skills groups={cv.skills} />
          </Section>

          <Section title="Selected Work" compact>
            <Projects projects={cv.projects} />
          </Section>

          <Section title="Experience" compact>
            <div className={styles.roles}>
              {pageOneRoles.map((role) => (
                <RoleBlock key={`${role.company}-${role.dates}`} role={role} />
              ))}
            </div>
          </Section>
        </article>

        <article className={`${styles.sheet} ${styles.secondSheet}`}>
          <Section title="Experience" compact>
            <div className={styles.roles}>
              {pageTwoRoles.map((role) => (
                <RoleBlock key={`${role.company}-${role.dates}`} role={role} />
              ))}
            </div>
          </Section>

          <Section title="Earlier Foundation" compact>
            <div className={styles.earlierGrid}>
              {cv.earlier.map((role) => (
                <article className={styles.earlierRole} key={role.company}>
                  <header>
                    <h3>
                      {role.title}
                      <span> / {role.company}</span>
                    </h3>
                    <p>{role.dates}</p>
                  </header>
                  <p>{role.description}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section title="Origins" compact>
            <p className={styles.origins}>{cv.origins}</p>
          </Section>

          <Section title="Education" compact>
            <article className={styles.education}>
              <header>
                <h3>{cv.education.title}</h3>
                <p>{cv.education.dates}</p>
              </header>
              <p>
                {cv.education.school} / {cv.education.location}
              </p>
              <p>{cv.education.credential}</p>
            </article>
          </Section>
        </article>
      </div>
    </main>
  )
}
