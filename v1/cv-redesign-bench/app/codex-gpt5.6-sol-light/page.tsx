import { cv, type Role } from "./content"
import { PrintButton } from "./PrintButton"
import styles from "./styles.module.css"

function Section({
  label,
  children,
  className = "",
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`${styles.section} ${className}`}>
      <h2 className={styles.sectionLabel}>{label}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

function Experience({ roles }: { roles: Role[] }) {
  return (
    <div className={styles.roles}>
      {roles.map((role) => (
        <article className={styles.role} key={`${role.company}-${role.dates}`}>
          <header className={styles.roleHeader}>
            <div>
              <h3>{role.title}</h3>
              <p className={styles.company}>
                {role.companyUrl ? <a href={role.companyUrl}>{role.company}</a> : role.company}
                <span> / {role.context}</span>
              </p>
            </div>
            <time>{role.dates}</time>
          </header>
          <ul>
            {role.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

function Folio({ page }: { page: number }) {
  return (
    <div className={styles.folio} aria-hidden="true">
      <span>RJ / CV</span>
      <span>0{page}</span>
    </div>
  )
}

export default function Page() {
  return (
    <main className={styles.canvas}>
      <div className={styles.actions}>
        <span>Two-page curriculum vitae</span>
        <PrintButton />
      </div>

      <article className={`${styles.sheet} ${styles.firstSheet}`}>
        <header className={styles.hero}>
          <div className={styles.eyebrow}>
            <span>{cv.location}</span>
            <span>Available for exceptional opportunities</span>
          </div>
          <div className={styles.identity}>
            <div>
              <p className={styles.kicker}>{cv.title}</p>
              <h1>{cv.name}</h1>
            </div>
            <p className={styles.headline}>{cv.headline}</p>
          </div>
          <address className={styles.contact}>
            {cv.contact.map((link) => (
              <a href={link.href} key={link.href}>{link.label}</a>
            ))}
          </address>
        </header>

        <Section label="Profile" className={styles.profileSection}>
          <p className={styles.profile}>{cv.profile}</p>
        </Section>

        <Section label="Capabilities">
          <dl className={styles.capabilities}>
            {cv.capabilities.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section label="Experience">
          <Experience roles={cv.pageOneRoles} />
        </Section>
        <Folio page={1} />
      </article>

      <article className={`${styles.sheet} ${styles.secondSheet}`}>
        <header className={styles.continuation}>
          <div>
            <p>Ricardo Jorge</p>
            <span>AI Product Engineer</span>
          </div>
          <a href="https://cv.rj11.io">cv.rj11.io</a>
        </header>

        <Section label="Experience">
          <Experience roles={cv.pageTwoRoles} />
        </Section>

        <Section label="Earlier">
          <div className={styles.earlier}>
            {cv.earlier.map(([date, company, description]) => (
              <div key={company}>
                <time>{date}</time>
                <p><strong>{company}</strong> · {description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Selected work">
          <div className={styles.projects}>
            {cv.projects.map((project) => (
              <article key={project.name}>
                <div>
                  <h3>{project.name}</h3>
                  <time>{project.dates}</time>
                </div>
                <p>{project.description}</p>
                <a href={project.url}>{project.label}</a>
              </article>
            ))}
          </div>
        </Section>

        <Section label="Education">
          <div className={styles.education}>
            <div>
              <h3>{cv.education.course}</h3>
              <p>{cv.education.school} · {cv.education.location}</p>
            </div>
            <time>{cv.education.dates}</time>
          </div>
        </Section>

        <aside className={styles.signal}>
          <span aria-hidden="true">↳</span>
          <p><strong>Before the job titles:</strong> {cv.personalSignal}</p>
        </aside>
        <Folio page={2} />
      </article>
    </main>
  )
}

