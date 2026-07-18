import styles from "./cv.module.css"
import { cv, type Role } from "./content"
import { PrintButton } from "./PrintButton"

function ExternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function Section({
  label,
  children,
  compact = false,
}: {
  label: string
  children: React.ReactNode
  compact?: boolean
}) {
  return (
    <section className={`${styles.section} ${compact ? styles.compact : ""}`}>
      <h2>{label}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

function RoleBlock({ role, dense = false }: { role: Role; dense?: boolean }) {
  return (
    <article className={`${styles.role} ${dense ? styles.denseRole : ""}`}>
      <div className={styles.roleHead}>
        <div>
          <h3>{role.title}</h3>
          <p>
            <ExternalLink href={role.href}>{role.company}</ExternalLink>
            <span> · {role.context}</span>
          </p>
        </div>
        <time>{role.dates}</time>
      </div>
      <ul>
        {role.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Page() {
  const firstPageRoles = cv.experience.slice(0, 3)
  const secondPageRoles = cv.experience.slice(3)

  return (
    <main className={styles.route}>
      <div className={styles.toolbar} aria-label="CV actions">
        <div>
          <strong>{cv.person.name}</strong>
          <span>{cv.person.title}</span>
        </div>
        <PrintButton className={styles.printButton} />
      </div>

      <div className={styles.document}>
        <article className={styles.page} aria-label="CV page 1">
          <header className={styles.hero}>
            <div>
              <p className={styles.kicker}>Curriculum vitae</p>
              <h1>{cv.person.name}</h1>
              <p className={styles.title}>{cv.person.title}</p>
            </div>
            <address>
              <span>{cv.person.location}</span>
              <a href={`mailto:${cv.person.email}`}>{cv.person.email}</a>
              {cv.person.links.map((link) => (
                <ExternalLink key={link.href} href={link.href}>
                  {link.label}
                </ExternalLink>
              ))}
            </address>
          </header>

          <Section label="Profile">
            <div className={styles.summary}>
              {cv.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Section>

          <Section label="Focus" compact>
            <ul className={styles.signalGrid}>
              {cv.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.origins}>{cv.technicalOrigins}</p>
          </Section>

          <Section label="Skills" compact>
            <div className={styles.skills}>
              {cv.skills.slice(0, 4).map((group) => (
                <div key={group.group} className={styles.skillRow}>
                  <strong>{group.group}</strong>
                  <span>{group.items.join(" · ")}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Projects" compact>
            <div className={styles.projects}>
              {cv.projects.slice(0, 3).map((project) => (
                <p key={project.name}>
                  <strong>{project.name}</strong>{" "}
                  <ExternalLink href={project.href}>
                    {project.href.replace("https://", "")}
                  </ExternalLink>
                  <span> · {project.dates} · {project.description}</span>
                </p>
              ))}
            </div>
          </Section>

          <Section label="Experience">
            <div className={styles.roles}>
              {firstPageRoles.map((role, index) => (
                <RoleBlock key={role.company} role={role} dense={index > 0} />
              ))}
            </div>
          </Section>
        </article>

        <article className={styles.page} aria-label="CV page 2">
          <header className={styles.pageHeader}>
            <p>{cv.person.name}</p>
            <span>{cv.person.title}</span>
          </header>

          <Section label="Experience">
            <div className={styles.roles}>
              {secondPageRoles.map((role) => (
                <RoleBlock key={role.company} role={role} />
              ))}
            </div>
          </Section>

          <Section label={cv.earlier.title} compact>
            <ul className={styles.earlier}>
              {cv.earlier.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section label="Foundations" compact>
            <div className={styles.skills}>
              {cv.skills.slice(4).map((group) => (
                <div key={group.group} className={styles.skillRow}>
                  <strong>{group.group}</strong>
                  <span>{group.items.join(" · ")}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Education" compact>
            <div className={styles.education}>
              <div>
                <h3>{cv.education.program}</h3>
                <p>
                  {cv.education.school} · {cv.education.location}
                </p>
                <p>{cv.education.credential}</p>
              </div>
              <time>{cv.education.dates}</time>
            </div>
          </Section>

          <Section label="Public code" compact>
            <div className={styles.projects}>
              {cv.projects.slice(3).map((project) => (
                <p key={project.name}>
                  <strong>{project.name}</strong>{" "}
                  <ExternalLink href={project.href}>
                    {project.href.replace("https://", "")}
                  </ExternalLink>
                  <span> · {project.dates} · {project.description}</span>
                </p>
              ))}
            </div>
          </Section>
        </article>
      </div>
    </main>
  )
}
