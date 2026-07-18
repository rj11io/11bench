import { BriefcaseBusiness, Code2, Globe2, Mail, MapPin } from "lucide-react"

import { cvData, type Experience, type LinkItem } from "./cv-data"
import styles from "./cv.module.css"
import { PrintButton } from "./print-button"

const contactIcons = {
  location: MapPin,
  email: Mail,
  website: Globe2,
  github: Code2,
  linkedin: BriefcaseBusiness,
} as const

const emailContact = cvData.contact.find((item) => item.kind === "email")

function ContactItem({ item }: { item: LinkItem }) {
  const Icon = contactIcons[item.kind]
  const content = (
    <>
      <Icon aria-hidden="true" size={13} strokeWidth={1.8} />
      <span>{item.value}</span>
    </>
  )

  if (!item.href) {
    return (
      <span className={styles.contactItem} aria-label={item.label}>
        {content}
      </span>
    )
  }

  return (
    <a
      className={styles.contactItem}
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
      aria-label={`${item.label}: ${item.value}`}
    >
      {content}
    </a>
  )
}

function PageFolio({ page }: { page: "01" | "02" }) {
  return (
    <div className={styles.folio} aria-hidden="true">
      <span>RJ / CV</span>
      <span>{page} — 02</span>
    </div>
  )
}

function PageFooter() {
  return (
    <footer className={styles.pageFooter}>
      <span>Full profile and live work</span>
      <a
        href={cvData.identity.cvSite.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {cvData.identity.cvSite.value}
      </a>
    </footer>
  )
}

function SectionHeading({
  index,
  id,
  children,
}: {
  index: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.sectionHeading}>
      <span aria-hidden="true">{index}</span>
      <h2 id={id}>{children}</h2>
    </div>
  )
}

function ExperienceItem({
  experience,
  compact = false,
}: {
  experience: Experience
  compact?: boolean
}) {
  return (
    <article
      className={`${styles.experienceItem} ${
        compact ? styles.experienceCompact : ""
      }`}
    >
      <div className={styles.experienceDate}>{experience.dates}</div>
      <div className={styles.experienceBody}>
        <h3>{experience.role}</h3>
        <p className={styles.companyLine}>
          {experience.href ? (
            <a
              href={experience.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${experience.company} website`}
            >
              {experience.company}
            </a>
          ) : (
            <span>{experience.company}</span>
          )}
          {experience.context ? (
            <>
              <span aria-hidden="true"> / </span>
              <span>{experience.context}</span>
            </>
          ) : null}
        </p>
        <ul>
          {experience.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function RepeatedHeader() {
  return (
    <header className={styles.repeatedHeader}>
      <div>
        <p className={styles.repeatedName}>{cvData.identity.name}</p>
        <p>{cvData.identity.role}</p>
      </div>
      {emailContact ? (
        <a href={emailContact.href}>{emailContact.value}</a>
      ) : null}
    </header>
  )
}

export default function CvPage() {
  const [roleFirst, roleEmphasis, ...roleRest] = cvData.identity.role.split(" ")

  return (
    <main className={styles.site}>
      <div className={styles.toolbar}>
        <p>
          <span>Two-page A4 CV</span>
          Browser print preserves links and selectable text.
        </p>
        <PrintButton />
      </div>

      <div className={styles.cv} aria-label="Ricardo Jorge CV">
        <article className={`${styles.sheet} ${styles.pageOne}`}>
          <PageFolio page="01" />

          <header className={styles.hero}>
            <p className={styles.kicker}>{cvData.identity.kicker}</p>
            <div className={styles.nameLockup}>
              <h1>{cvData.identity.name}</h1>
              <p>
                {roleFirst} <em>{roleEmphasis}</em> {roleRest.join(" ")}
              </p>
            </div>
            <address className={styles.contactList}>
              {cvData.contact.map((item) => (
                <ContactItem key={item.label} item={item} />
              ))}
            </address>
          </header>

          <section className={styles.intro} aria-labelledby="profile-heading">
            <div>
              <SectionHeading index="01" id="profile-heading">
                Profile
              </SectionHeading>
              <p className={styles.summary}>{cvData.identity.summary}</p>
            </div>
            <div className={styles.signalPanel} aria-label="Experience markers">
              {cvData.signals.map((signal) => (
                <div key={signal.value}>
                  <strong>{signal.value}</strong>
                  <span>{signal.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section
            className={styles.capabilitySection}
            aria-labelledby="capabilities-heading"
          >
            <SectionHeading index="02" id="capabilities-heading">
              Capabilities
            </SectionHeading>
            <div className={styles.capabilityGrid}>
              {cvData.capabilities.map((capability) => (
                <div className={styles.capability} key={capability.title}>
                  <h3>{capability.title}</h3>
                  <p>{capability.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="recent-experience-heading">
            <SectionHeading index="03" id="recent-experience-heading">
              Recent experience
            </SectionHeading>
            <div className={styles.experienceList}>
              {cvData.experiencePageOne.map((experience) => (
                <ExperienceItem
                  experience={experience}
                  key={`${experience.company}-${experience.dates}`}
                />
              ))}
            </div>
          </section>
          <PageFooter />
        </article>

        <article className={`${styles.sheet} ${styles.pageTwo}`}>
          <PageFolio page="02" />
          <RepeatedHeader />

          <section aria-labelledby="continued-experience-heading">
            <SectionHeading index="04" id="continued-experience-heading">
              Experience, continued
            </SectionHeading>
            <div className={styles.experienceList}>
              {cvData.experiencePageTwo.map((experience) => (
                <ExperienceItem
                  compact
                  experience={experience}
                  key={`${experience.company}-${experience.dates}`}
                />
              ))}
            </div>
          </section>

          <section
            className={styles.earlySection}
            aria-labelledby="early-experience-heading"
          >
            <SectionHeading index="05" id="early-experience-heading">
              Selected early experience
            </SectionHeading>
            <div className={styles.earlyGrid}>
              {cvData.earlyExperience.map((experience) => (
                <article
                  className={styles.earlyItem}
                  key={`${experience.company}-${experience.dates}`}
                >
                  <p className={styles.earlyDates}>{experience.dates}</p>
                  <div>
                    <h3>{experience.role}</h3>
                    <p className={styles.earlyCompany}>{experience.company}</p>
                    <p>{experience.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className={styles.closingGrid}>
            <section aria-labelledby="projects-heading">
              <SectionHeading index="06" id="projects-heading">
                Independent projects
              </SectionHeading>
              <div className={styles.projectList}>
                {cvData.projects.map((project) => (
                  <article className={styles.project} key={project.name}>
                    <div>
                      <h3>{project.name}</h3>
                      <span>{project.dates}</span>
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {project.url}
                    </a>
                    <p>{project.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className={styles.finalColumn}>
              <section aria-labelledby="education-heading">
                <SectionHeading index="07" id="education-heading">
                  Education
                </SectionHeading>
                <div className={styles.education}>
                  <h3>{cvData.education.program}</h3>
                  <p>{cvData.education.credential}</p>
                  <p>
                    {cvData.education.school} · {cvData.education.location}
                  </p>
                  <span>{cvData.education.dates}</span>
                </div>
              </section>

              <section
                className={styles.origin}
                aria-labelledby="origin-heading"
              >
                <SectionHeading index="08" id="origin-heading">
                  Origin
                </SectionHeading>
                <p>{cvData.origin}</p>
              </section>
            </div>
          </div>
          <PageFooter />
        </article>
      </div>
    </main>
  )
}
