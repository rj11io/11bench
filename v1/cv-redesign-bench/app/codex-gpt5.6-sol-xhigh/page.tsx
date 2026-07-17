import { cv, type Experience } from "./content"
import styles from "./cv.module.css"
import { PrintButton } from "./print-button"

function Section({
  number,
  title,
  children,
  id,
  className = "",
}: {
  number: string
  title: string
  children: React.ReactNode
  id?: string
  className?: string
}) {
  return (
    <section
      className={`${styles.section} ${className}`}
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className={styles.sectionMarker} aria-hidden="true">
        <span>{number}</span>
        <span className={styles.markerRule} />
      </div>
      <div className={styles.sectionBody}>
        <h2 className={styles.sectionTitle} id={id ? `${id}-title` : undefined}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

function ExperienceRole({
  item,
  compact = false,
}: {
  item: Experience
  compact?: boolean
}) {
  return (
    <article className={`${styles.role} ${compact ? styles.roleCompact : ""}`}>
      <div className={styles.roleHeading}>
        <div>
          <h3 className={styles.roleTitle}>{item.role}</h3>
          <p className={styles.organisationLine}>
            {item.organisationHref ? (
              <a href={item.organisationHref}>{item.organisation}</a>
            ) : (
              item.organisation
            )}
            <span aria-hidden="true"> · </span>
            <span>{item.context}</span>
          </p>
        </div>
        <p className={styles.period}>{item.period}</p>
      </div>
      <ul className={styles.bullets}>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

function PageFooter({ page }: { page: number }) {
  return (
    <footer className={styles.pageFooter}>
      <span>Ricardo Jorge · AI Product Engineer</span>
      <span>{String(page).padStart(2, "0")} / 02</span>
    </footer>
  )
}

export default function CvPage() {
  const [currentRole, huntRole, omegaRole, phantasmaRole, binaryEdgeRole] =
    cv.experience

  return (
    <main className={styles.route}>
      <a className={styles.skipLink} href="#experience">
        Skip to experience
      </a>

      <div className={styles.screenToolbar}>
        <p>
          <span className={styles.statusDot} aria-hidden="true" />
          CV / 2026
        </p>
        <PrintButton />
      </div>

      <article className={`${styles.sheet} ${styles.firstSheet}`}>
        <header className={styles.hero}>
          <div className={styles.heroMeta}>
            <p>Portfolio / Curriculum Vitae</p>
            <p>{cv.identity.location}</p>
          </div>

          <div className={styles.heroGrid}>
            <div>
              <h1 className={styles.name}>{cv.identity.name}</h1>
              <p className={styles.jobTitle}>{cv.identity.role}</p>
            </div>
            <p className={styles.heroAside}>
              Product engineering
              <br />
              AI systems
              <br />
              Data-rich interfaces
            </p>
          </div>

          <address className={styles.contacts}>
            {cv.contacts.map((contact) => (
              <a href={contact.href} key={contact.href}>
                {contact.label}
              </a>
            ))}
          </address>
        </header>

        <Section number="01" title="Profile">
          <p className={styles.summary}>{cv.summary}</p>
          <dl className={styles.signals}>
            {cv.signals.map((signal) => (
              <div key={signal.value}>
                <dt>{signal.value}</dt>
                <dd>{signal.label}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          number="02"
          title="What I build"
          className={styles.focusSection}
        >
          <div className={styles.focusGrid}>
            {cv.focus.map((item) => (
              <article className={styles.focusCard} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section number="03" title="Capabilities">
          <div className={styles.skillsGrid}>
            {cv.skills.map((group) => (
              <div className={styles.skillGroup} key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section number="04" title="Open source & practice">
          <div className={styles.projects}>
            {cv.projects.map((project) => (
              <article className={styles.project} key={project.name}>
                <div>
                  <h3>
                    <a href={project.href}>{project.name}</a>
                  </h3>
                  <p className={styles.projectPeriod}>{project.period}</p>
                </div>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section number="05" title="Experience" id="experience">
          <div className={styles.roleStack}>
            <ExperienceRole item={currentRole} compact />
            <ExperienceRole item={huntRole} compact />
          </div>
        </Section>

        <PageFooter page={1} />
      </article>

      <article className={`${styles.sheet} ${styles.secondSheet}`}>
        <header className={styles.continuationHeader}>
          <div>
            <p className={styles.continuationEyebrow}>Ricardo Jorge / CV</p>
            <h2>Experience, continued</h2>
          </div>
          <p className={styles.continuationRole}>AI Product Engineer</p>
        </header>

        <Section number="06" title="Product & frontend leadership">
          <div className={styles.roleStack}>
            <ExperienceRole item={omegaRole} compact />
            <ExperienceRole item={phantasmaRole} compact />
            <ExperienceRole item={binaryEdgeRole} compact />
          </div>
        </Section>

        <Section number="07" title="Career foundation">
          <div className={styles.earlierGrid}>
            {cv.earlierExperience.map((item) => (
              <article className={styles.earlierRole} key={item.organisation}>
                <div className={styles.earlierHeading}>
                  <h3>{item.role}</h3>
                  <p>{item.period}</p>
                </div>
                <p className={styles.earlierOrganisation}>
                  {item.organisation}
                  <span aria-hidden="true"> · </span>
                  {item.context}
                </p>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section number="08" title="Education & origins">
          <div className={styles.closingGrid}>
            <article className={styles.education}>
              <p className={styles.miniLabel}>Education</p>
              <h3>{cv.education.qualification}</h3>
              <p>
                {cv.education.school} · {cv.education.location}
              </p>
              <p className={styles.period}>{cv.education.period}</p>
            </article>
            <article className={styles.origins}>
              <p className={styles.miniLabel}>Before the job titles</p>
              <ul className={styles.bullets}>
                {cv.origins.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </Section>

        <aside className={styles.contactCta}>
          <p>
            Building an AI product, data-heavy interface, or frontend platform?
          </p>
          <a href="mailto:ricardojorgexyz@gmail.com">
            ricardojorgexyz@gmail.com
          </a>
        </aside>

        <PageFooter page={2} />
      </article>
    </main>
  )
}
