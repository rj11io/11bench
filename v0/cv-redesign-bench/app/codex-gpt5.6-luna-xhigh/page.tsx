import styles from "./styles.module.css"
import { cvContent } from "./content"
import { PrintButton } from "./print-button"

type LinkItemProps = {
  href: string
  label: string
  className?: string
}

function LinkItem({ href, label, className }: LinkItemProps) {
  return (
    <a
      className={className}
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
    >
      {label}
    </a>
  )
}

function Section({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section className={styles.section} id={id} aria-labelledby={`${id}-title`}>
      <h2 className={styles.sectionLabel} id={`${id}-title`}>
        {label}
      </h2>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  )
}

function Job({
  job,
}: {
  job: (typeof cvContent.experience)[number]
}) {
  return (
    <article className={styles.job}>
      <div className={styles.jobHeader}>
        <h3 className={styles.jobRole}>{job.role}</h3>
        <p className={styles.jobDates}>{job.dates}</p>
      </div>
      <p className={styles.jobMeta}>
        <LinkItem href={job.employerHref} label={job.employer} />
        <span aria-hidden="true"> / </span>
        <span>{job.context}</span>
      </p>
      <p className={styles.jobIntro}>{job.intro}</p>
      <ul className={styles.bullets}>
        {job.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

function EarlierRole({
  role,
}: {
  role: (typeof cvContent.earlier)[number]
}) {
  return (
    <article className={styles.earlierRole}>
      <div className={styles.earlierHeader}>
        <h3>{role.role}</h3>
        <p>{role.dates}</p>
      </div>
      <p className={styles.earlierMeta}>
        {role.employer} <span aria-hidden="true"> / </span> {role.place}
      </p>
      <p className={styles.earlierNote}>{role.note}</p>
    </article>
  )
}

export default function Page() {
  const { identity, profile, capabilities, projects, experience, earlier, education, beyondWork } = cvContent

  return (
    <div className={styles.screenBackground}>
      <a className={styles.skipLink} href="#cv-content">
        Skip to CV content
      </a>

      <div className={styles.toolbar} aria-label="Document actions">
        <p>
          <span className={styles.toolbarMark} aria-hidden="true" />
          <span>RJ / CV 2026</span>
        </p>
        <PrintButton />
      </div>

      <main className={styles.document} id="cv-content">
        <section className={`${styles.printPage} ${styles.pageOne}`} aria-label="CV page 1">
          <header className={styles.masthead}>
            <div>
              <p className={styles.pageIndex}>01 / CV</p>
              <div className={styles.nameLine}>
                <h1>{identity.name}</h1>
                <p>{identity.title}</p>
              </div>
            </div>
            <LinkItem
              href={identity.cv.href}
              label={identity.cv.label}
              className={styles.cvStamp}
            />
          </header>

          <div className={styles.contactLine} aria-label="Contact details">
            <span>{identity.location}</span>
            <LinkItem
              href={`mailto:${identity.email}`}
              label={identity.email}
            />
            <LinkItem href={identity.website.href} label={identity.website.label} />
            <LinkItem href={identity.github.href} label={identity.github.label} />
            <LinkItem
              href={identity.linkedin.href}
              label={identity.linkedin.label}
            />
          </div>

          <div className={styles.mastheadRule} />

          <Section id="profile" label="Profile">
            <div className={styles.profileCopy}>
              <p>{profile.summary}</p>
              <p>{profile.detail}</p>
            </div>
          </Section>

          <Section id="capabilities" label="Capabilities">
            <div className={styles.capabilityList}>
              {capabilities.map((group) => (
                <div className={styles.capabilityRow} key={group.label}>
                  <h3>{group.label}</h3>
                  <p>{group.items.join(" / ")}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="selected-work" label="Selected work">
            <div className={styles.projectList}>
              {projects.map((project) => (
                <article
                  className={`${styles.projectRow} ${project.compact ? styles.compactProject : ""}`}
                  key={project.name}
                >
                  <h3>{project.name}</h3>
                  <LinkItem href={project.href} label={project.urlLabel} />
                  <p className={styles.projectDates}>{project.dates}</p>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section id="experience" label="Experience">
            {experience.slice(0, 2).map((job) => (
              <Job key={job.id} job={job} />
            ))}
          </Section>

          <footer className={styles.pageFooter}>
            <span>Ricardo Jorge / AI Product Engineer</span>
            <span>01 / 02</span>
          </footer>
        </section>

        <section className={`${styles.printPage} ${styles.pageTwo}`} aria-label="CV page 2">
          <div className={styles.continuationMark}>
            <span className={styles.toolbarMark} aria-hidden="true" />
            <span>02 / CONTINUED</span>
          </div>

          <Section id="experience-continued" label="Experience continued">
            {experience.slice(2).map((job) => (
              <Job key={job.id} job={job} />
            ))}
          </Section>

          <Section id="earlier-experience" label="Earlier experience">
            <div className={styles.earlierList}>
              {earlier.map((role) => (
                <EarlierRole key={`${role.employer}-${role.dates}`} role={role} />
              ))}
            </div>
          </Section>

          <div className={styles.bottomGrid}>
            <Section id="education" label="Education">
              <article className={styles.educationBlock}>
                <div className={styles.educationHeader}>
                  <h3>{education.title}</h3>
                  <p>{education.dates}</p>
                </div>
                <p>{education.school} / {education.place}</p>
                <p className={styles.secondaryLine}>{education.localTitle}</p>
              </article>
            </Section>

            <Section id="beyond-work" label="Beyond work">
              <ul className={styles.beyondList}>
                {beyondWork.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </Section>
          </div>

          <footer className={styles.pageFooter}>
            <span>rj11.io / open to exceptional opportunities</span>
            <span>02 / 02</span>
          </footer>
        </section>
      </main>
    </div>
  )
}
