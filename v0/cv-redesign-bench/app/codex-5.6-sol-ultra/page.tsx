import { cvContent } from "./content"
import styles from "./page.module.css"
import { PrintButton } from "./print-button"

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const isMail = href.startsWith("mailto:")

  return (
    <a
      className={className}
      href={href}
      {...(!isMail && {
        target: "_blank",
        rel: "noreferrer",
      })}
    >
      {children}
    </a>
  )
}

function SectionLabel({
  index,
  children,
}: {
  index: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.sectionLabel}>
      <span aria-hidden="true">{index}</span>
      <h2>{children}</h2>
    </div>
  )
}

function ExperienceList({
  items,
}: {
  items: typeof cvContent.experience.recent | typeof cvContent.experience.continued
}) {
  return (
    <div className={styles.experienceList}>
      {items.map((item) => (
        <article className={styles.role} key={`${item.company}-${item.period}`}>
          <div className={styles.roleHeading}>
            <div>
              <h3>{item.role}</h3>
              <p className={styles.companyLine}>
                {item.companyUrl ? (
                  <ExternalLink href={item.companyUrl}>
                    {item.company}
                  </ExternalLink>
                ) : (
                  item.company
                )}
                {item.context && (
                  <>
                    <span aria-hidden="true"> / </span>
                    <span>{item.context}</span>
                  </>
                )}
              </p>
            </div>
            <time className={styles.period}>{item.period}</time>
          </div>
          <ul className={styles.bullets}>
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

export default function CvPage() {
  return (
    <main className={styles.canvas}>
      <a className={styles.skipLink} href="#experience">
        Skip to experience
      </a>
      <PrintButton />

      <article className={`${styles.sheet} ${styles.sheetOne}`}>
        <header className={styles.hero}>
          <div className={styles.kickerRow}>
            <p>Curriculum vitae / selected record</p>
            <p className={styles.folio}>01 / 02</p>
          </div>

          <div className={styles.nameLockup}>
            <div className={styles.brandMark} aria-hidden="true">
              {cvContent.identity.shortName}
            </div>
            <div>
              <h1>{cvContent.identity.name}</h1>
              <p className={styles.title}>{cvContent.identity.title}</p>
            </div>
          </div>

          <div className={styles.contactRow}>
            <p>{cvContent.identity.location}</p>
            <nav aria-label="Contact and professional links">
              {cvContent.identity.contacts.map((contact) => (
                <ExternalLink href={contact.href} key={contact.href}>
                  {contact.label}
                </ExternalLink>
              ))}
            </nav>
          </div>
        </header>

        <section className={styles.section}>
          <SectionLabel index="00">Profile</SectionLabel>
          <div className={styles.profile}>
            {cvContent.profile.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.signalSection}`}
          aria-label="Career signals"
        >
          <SectionLabel index="01">Signals</SectionLabel>
          <dl className={styles.signalGrid}>
            {cvContent.signals.map((signal) => (
              <div key={signal.label}>
                <dt>{signal.label}</dt>
                <dd>{signal.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.section} id="experience">
          <SectionLabel index="02">Experience</SectionLabel>
          <ExperienceList items={cvContent.experience.recent} />
        </section>

        <footer className={styles.pageFooter}>
          <p>{cvContent.identity.name}</p>
          <p>Recent work / leadership / product systems</p>
        </footer>
      </article>

      <article className={`${styles.sheet} ${styles.sheetTwo}`}>
        <header className={styles.continuationHeader}>
          <div>
            <p className={styles.continuationName}>
              {cvContent.identity.name}
            </p>
            <p>{cvContent.identity.title}</p>
          </div>
          <p className={styles.folio}>02 / 02</p>
        </header>

        <section className={styles.section}>
          <SectionLabel index="02A">Experience / continued</SectionLabel>
          <ExperienceList items={cvContent.experience.continued} />
        </section>

        <section className={`${styles.section} ${styles.earlierSection}`}>
          <SectionLabel index="02B">Earlier path</SectionLabel>
          <div className={styles.earlierList}>
            {cvContent.experience.earlier.map((item) => (
              <article
                className={styles.earlierRole}
                key={`${item.company}-${item.period}`}
              >
                <div className={styles.earlierHeading}>
                  <h3>
                    {item.role}
                    <span> / {item.company}</span>
                  </h3>
                  <time className={styles.period}>{item.period}</time>
                </div>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.bottomGrid}>
          <section className={`${styles.section} ${styles.compactSection}`}>
            <SectionLabel index="03">Open source</SectionLabel>
            <div className={styles.projectList}>
              {cvContent.projects.map((project) => (
                <article className={styles.project} key={project.name}>
                  <div className={styles.projectHeading}>
                    <h3>{project.name}</h3>
                    <time className={styles.period}>{project.period}</time>
                  </div>
                  <ExternalLink
                    className={styles.projectLink}
                    href={project.url}
                  >
                    {project.urlLabel}
                  </ExternalLink>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.compactSection}`}>
            <SectionLabel index="04">Technical range</SectionLabel>
            <dl className={styles.skillList}>
              {cvContent.skills.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <section className={`${styles.section} ${styles.educationSection}`}>
          <SectionLabel index="05">Education / distinction</SectionLabel>
          <div className={styles.educationGrid}>
            <div>
              <div className={styles.educationHeading}>
                <h3>{cvContent.education.programme}</h3>
                <time className={styles.period}>
                  {cvContent.education.period}
                </time>
              </div>
              <p>
                {cvContent.education.school} / {cvContent.education.location}
              </p>
              <p className={styles.credential}>
                {cvContent.education.credential}
              </p>
            </div>
            <p className={styles.distinction}>
              <span>Earlier signal</span>
              {cvContent.distinction}
            </p>
          </div>
        </section>

        <footer className={styles.pageFooter}>
          <p>
            <ExternalLink href="mailto:ricardojorgexyz@gmail.com">
              ricardojorgexyz@gmail.com
            </ExternalLink>
          </p>
          <p>
            <ExternalLink href="https://cv.rj11.io/">
              cv.rj11.io
            </ExternalLink>
          </p>
        </footer>
      </article>
    </main>
  )
}
