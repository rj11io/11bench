import { cv } from "./cv-data"
import { PrintButton } from "./PrintButton"
import styles from "./cv.module.css"

function LinkText({
  href,
  children,
}: {
  href?: string
  children: React.ReactNode
}) {
  if (!href) return <span>{children}</span>
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className={styles.section} aria-labelledby={kicker}>
      <div className={styles.sectionLabel} id={kicker}>
        {title}
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

function Role({
  item,
  compact = false,
}: {
  item: (typeof cv.experience)[number]
  compact?: boolean
}) {
  return (
    <article className={compact ? styles.roleCompact : styles.role}>
      <header className={styles.roleHeader}>
        <div>
          <h3>{item.role}</h3>
          <p>
            <LinkText href={item.href}>{item.company}</LinkText>
            {item.url ? <span> · {item.url}</span> : null}
            {item.meta ? <span> · {item.meta}</span> : null}
          </p>
        </div>
        <time>{item.dates}</time>
      </header>
      <ul>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Page() {
  const pageOneRoles = cv.experience.slice(0, 2)
  const pageTwoRoles = cv.experience.slice(2)

  return (
    <main className={styles.shell}>
      <PrintButton />

      <article className={styles.sheet} aria-label={`${cv.name} CV page 1`}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>{cv.location}</p>
            <h1>{cv.name}</h1>
            <p className={styles.title}>{cv.title}</p>
          </div>
          <address className={styles.contactList}>
            {cv.contacts.map((contact) => (
              <a key={contact.label} href={contact.href}>
                <span>{contact.label}</span>
                {contact.value}
              </a>
            ))}
          </address>
        </header>

        <section className={styles.summaryBlock}>
          <p>{cv.summary}</p>
          <p>{cv.origin}</p>
        </section>

        <Section kicker="skills" title="Skills">
          <div className={styles.skillGrid}>
            {cv.skillGroups.map((group) => (
              <div key={group.label} className={styles.skillGroup}>
                <h2>{group.label}</h2>
                <p>{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section kicker="projects" title="Projects">
          <div className={styles.projectGrid}>
            {cv.projects.map((project) => (
              <article key={project.name}>
                <div>
                  <h2>{project.name}</h2>
                  <time>{project.years}</time>
                </div>
                <a href={project.href}>{project.url}</a>
                <p>{project.detail}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section kicker="recent-experience" title="Recent Experience">
          <div className={styles.roles}>
            {pageOneRoles.map((item) => (
              <Role key={`${item.company}-${item.dates}`} item={item} />
            ))}
          </div>
        </Section>
      </article>

      <article className={styles.sheet} aria-label={`${cv.name} CV page 2`}>
        <div className={styles.continuationHeader}>
          <div>
            <p>{cv.name}</p>
            <h2>Experience Continued</h2>
          </div>
          <a href="https://cv.rj11.io">cv.rj11.io</a>
        </div>

        <Section kicker="experience" title="Experience">
          <div className={styles.roles}>
            {pageTwoRoles.map((item, index) => (
              <Role
                key={`${item.company}-${item.dates}`}
                item={item}
                compact={index > 2}
              />
            ))}
          </div>
        </Section>

        <Section kicker="education" title="Education">
          <div className={styles.education}>
            <div>
              <h2>{cv.education.program}</h2>
              <p>
                {cv.education.school} · {cv.education.location}
              </p>
              <p>{cv.education.credential}</p>
            </div>
            <time>{cv.education.dates}</time>
          </div>
        </Section>
      </article>
    </main>
  )
}
