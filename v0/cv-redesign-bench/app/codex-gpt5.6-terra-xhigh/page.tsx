import { cv, type Experience, type Link } from "./content"
import styles from "./cv.module.css"
import { PrintControl } from "./print-control"

function ExternalLink({ link }: { link: Link }) {
  return (
    <a href={link.href} target="_blank" rel="noreferrer">
      {link.label}
    </a>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionHeading}>{children}</h2>
}

function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <article className={styles.experienceItem}>
      <div className={styles.experienceTopline}>
        <h3>{experience.role}</h3>
        <p>{experience.dates}</p>
      </div>
      <p className={styles.employerLine}>
        {experience.href ? (
          <a href={experience.href} target="_blank" rel="noreferrer">
            {experience.employer}
          </a>
        ) : (
          experience.employer
        )}
        {experience.location ? <span> · {experience.location}</span> : null}
      </p>
      <ul>
        {experience.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Page() {
  const { identity } = cv

  return (
    <main className={styles.shell}>
      <div className={styles.utilityBar}>
        <p>CV / {cv.displayMeta.documentYear}</p>
        <PrintControl />
      </div>

      <article className={styles.document} aria-label="Ricardo Jorge curriculum vitae">
        <section className={`${styles.printPage} ${styles.firstPage}`}>
          <header className={styles.hero}>
            <div className={styles.heroEyebrow}>
              <span>01 / PROFILE</span>
              <a href={identity.cv.href} target="_blank" rel="noreferrer">
                {identity.cv.label}
              </a>
            </div>
            <h1>{identity.name}</h1>
            <div className={styles.roleLine}>
              <p>{identity.role}</p>
              <span aria-hidden="true" />
              <p>{identity.location}</p>
            </div>
            <address className={styles.contactLine}>
              <a href={identity.emailHref}>{identity.email}</a>
              <ExternalLink link={identity.website} />
              <ExternalLink link={identity.github} />
              <ExternalLink link={identity.linkedin} />
            </address>
          </header>

          <div className={styles.pageGrid}>
            <aside className={styles.leftRail}>
              <p className={styles.railNumber}>A</p>
              <p>PRODUCT<br />SYSTEMS</p>
              <p className={styles.railRule}>TYPE / DATA / AI</p>
            </aside>

            <div className={styles.pageContent}>
              <section className={styles.intro} aria-labelledby="profile-title">
                <SectionHeading>Profile</SectionHeading>
                <p className={styles.lede} id="profile-title">
                  {cv.summary}
                </p>
                <p>{cv.focus}</p>
              </section>

              <section className={styles.capabilitySection} aria-labelledby="capabilities-title">
                <SectionHeading>Capabilities</SectionHeading>
                <dl id="capabilities-title" className={styles.capabilities}>
                  {cv.capabilities.map((capability) => (
                    <div key={capability.label}>
                      <dt>{capability.label}</dt>
                      <dd>{capability.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section aria-labelledby="recent-experience-title">
                <div className={styles.sectionHeaderRow}>
                  <SectionHeading>Selected experience</SectionHeading>
                  <span id="recent-experience-title">
                    {cv.displayMeta.recentExperienceRange}
                  </span>
                </div>
                <div className={styles.experienceList}>
                  {cv.recentExperience.map((experience) => (
                    <ExperienceItem key={`${experience.role}-${experience.employer}`} experience={experience} />
                  ))}
                </div>
              </section>
            </div>
          </div>

          <footer className={styles.pageFooter}>
            <p>RICARDO JORGE / AI PRODUCT ENGINEER</p>
            <p>01</p>
          </footer>
        </section>

        <section className={`${styles.printPage} ${styles.secondPage}`}>
          <header className={styles.continuedHeader}>
            <p>RICARDO JORGE</p>
            <p>SELECTED WORK / 02</p>
          </header>

          <div className={styles.pageGrid}>
            <aside className={styles.leftRail}>
              <p className={styles.railNumber}>B</p>
              <p>BUILD / LEAD<br />SHIP / SHIP</p>
              <p className={styles.railRule}>{cv.displayMeta.foundationRange}</p>
            </aside>

            <div className={styles.pageContent}>
              <section aria-labelledby="earlier-experience-title">
                <div className={styles.sectionHeaderRow}>
                  <SectionHeading>Earlier experience</SectionHeading>
                  <span id="earlier-experience-title">
                    {cv.displayMeta.earlierExperienceRange}
                  </span>
                </div>
                <div className={styles.experienceList}>
                  {cv.earlierExperience.map((experience) => (
                    <ExperienceItem key={`${experience.role}-${experience.employer}`} experience={experience} />
                  ))}
                </div>
              </section>

              <section className={styles.foundation} aria-labelledby="foundation-title">
                <SectionHeading>Foundation</SectionHeading>
                <div id="foundation-title" className={styles.foundationGrid}>
                  {cv.foundation.map((role) => (
                    <article key={`${role.employer}-${role.dates}`}>
                      <div>
                        <h3>{role.role}</h3>
                        <p>{role.employer}</p>
                      </div>
                      <time>{role.dates}</time>
                      <p className={styles.foundationDetail}>{role.detail}</p>
                    </article>
                  ))}
                </div>
              </section>

              <div className={styles.bottomGrid}>
                <section aria-labelledby="projects-title">
                  <SectionHeading>Independent work</SectionHeading>
                  <ul id="projects-title" className={styles.projects}>
                    {cv.projects.map((project) => (
                      <li key={project.name}>
                        <strong>{project.name}</strong>
                        <ExternalLink link={project.link} />
                        <span>{project.detail}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="education-title">
                  <SectionHeading>Education</SectionHeading>
                  <div id="education-title" className={styles.education}>
                    <h3>{cv.education.credential}</h3>
                    <p>{cv.education.institution}</p>
                    <p>{cv.education.detail}</p>
                    <p>{cv.education.dates} · {cv.education.location}</p>
                  </div>
                </section>
              </div>

              <aside className={styles.fieldNote}>
                <p>FIELD NOTE</p>
                <p>{cv.fieldNote}</p>
              </aside>
            </div>
          </div>

          <footer className={styles.pageFooter}>
            <p>CONTACT / {identity.email} / {identity.website.label}</p>
            <p>02</p>
          </footer>
        </section>
      </article>
    </main>
  )
}
