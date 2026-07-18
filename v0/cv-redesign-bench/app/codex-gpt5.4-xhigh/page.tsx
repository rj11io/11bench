import { IBM_Plex_Sans, Spectral } from "next/font/google"

import {
  cvContent,
  pageOneExperienceIds,
  pageTwoExperienceIds,
  type ExperienceItem,
} from "./content"
import { PrintButton } from "./PrintButton"
import styles from "./page.module.css"

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
})

const displayFont = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

function Section({
  label,
  children,
}: Readonly<{
  label: string
  children: React.ReactNode
}>) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>{label}</div>
      <div>{children}</div>
    </section>
  )
}

function ExperienceBlock({
  item,
}: Readonly<{
  item: ExperienceItem
}>) {
  return (
    <article className={styles.entry}>
      <header className={styles.entryHeader}>
        <div>
          <h3 className={styles.entryTitle}>{item.role}</h3>
          <p className={styles.companyLine}>
            {item.companyUrl ? (
              <a href={item.companyUrl}>{item.company}</a>
            ) : (
              <span>{item.company}</span>
            )}
            {item.context?.length ? (
              <span className={styles.contextLine}>
                {item.context.join(" | ")}
              </span>
            ) : null}
          </p>
        </div>
        <p className={styles.dateLine}>{item.dates}</p>
      </header>
      <ul className={styles.bulletList}>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

const pageOneExperience = cvContent.experience.filter((item) =>
  pageOneExperienceIds.includes(item.id as (typeof pageOneExperienceIds)[number])
)

const pageTwoExperience = cvContent.experience.filter((item) =>
  pageTwoExperienceIds.includes(item.id as (typeof pageTwoExperienceIds)[number])
)

const featuredProjects = cvContent.projects.slice(0, 3)

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: cvContent.identity.name,
  jobTitle: cvContent.identity.title,
  email: "mailto:ricardojorgexyz@gmail.com",
  url: "https://www.rj11.io/",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lisbon",
    addressCountry: "Portugal",
  },
  sameAs: [
    "https://www.rj11.io/",
    "https://github.com/rj11io",
    "https://www.linkedin.com/in/rj11io",
    "https://ai.rj11.io/",
    "https://bench.rj11.io/",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: cvContent.education.school,
  },
}

export default function Page() {
  return (
    <main
      className={`${styles.route} ${bodyFont.variable} ${displayFont.variable}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className={styles.toolbar}>
        <PrintButton />
      </div>

      <div className={styles.stack}>
        <article className={styles.sheet}>
          <header className={styles.masthead}>
            <div>
              <p className={styles.kicker}>Ricardo Jorge</p>
              <h1 className={styles.name}>{cvContent.identity.name}</h1>
              <p className={styles.title}>{cvContent.identity.title}</p>
            </div>
            <div className={styles.metaBlock}>
              <p>{cvContent.identity.location}</p>
              <p>{cvContent.identity.strapline}</p>
            </div>
          </header>

          <div className={styles.contactRow}>
            {cvContent.contacts.map((contact) => (
              <a key={contact.href} href={contact.href} className={styles.contactLink}>
                {contact.label}
              </a>
            ))}
          </div>

          <Section label="Profile">
            <div className={styles.copyStack}>
              {cvContent.summary.map((paragraph) => (
                <p key={paragraph} className={styles.summaryText}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className={styles.signalGrid}>
              {cvContent.signals.map((signal) => (
                <div key={signal.value} className={styles.signalCard}>
                  <p className={styles.signalValue}>{signal.value}</p>
                  <p className={styles.signalLabel}>{signal.label}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Focus">
            <div className={styles.focusGrid}>
              {cvContent.focusAreas.map((area) => (
                <article key={area.title} className={styles.focusCard}>
                  <h2 className={styles.focusTitle}>{area.title}</h2>
                  <p className={styles.focusBody}>{area.body}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section label="Selected Work">
            <div className={styles.entryList}>
              {pageOneExperience.map((item) => (
                <ExperienceBlock key={item.id} item={item} />
              ))}
            </div>
          </Section>
        </article>

        <article className={`${styles.sheet} ${styles.sheetDense}`}>
          <Section label="Career Record">
            <div className={styles.entryList}>
              {pageTwoExperience.map((item) => (
                <ExperienceBlock key={item.id} item={item} />
              ))}
            </div>
          </Section>

          <Section label="Open Source">
            <div className={styles.projectList}>
              {featuredProjects.map((project) => (
                <article key={project.href} className={styles.projectRow}>
                  <div>
                    <h2 className={styles.projectTitle}>{project.name}</h2>
                    <a href={project.href} className={styles.projectLink}>
                      {project.href.replace("https://", "")}
                    </a>
                  </div>
                  <p className={styles.projectDates}>{project.dates}</p>
                  <p className={styles.projectDescription}>{project.description}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section label="Capabilities">
            <div className={styles.skillStack}>
              {cvContent.skillGroups.map((group) => (
                <article key={group.label} className={styles.skillRow}>
                  <h2 className={styles.skillLabel}>{group.label}</h2>
                  <p className={styles.skillItems}>{group.items.join(" | ")}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section label="Earlier Roles">
            <div className={styles.earlierList}>
              {cvContent.earlierExperience.map((role) => (
                <article key={`${role.company}-${role.dates}`} className={styles.earlierRow}>
                  <header className={styles.earlierHeader}>
                    <h2 className={styles.earlierTitle}>
                      {role.role}, {role.company}
                    </h2>
                    <p className={styles.dateLine}>{role.dates}</p>
                  </header>
                  <p className={styles.earlierSummary}>{role.summary}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section label="Education">
            <article className={styles.educationCard}>
              <div>
                <h2 className={styles.educationTitle}>{cvContent.education.program}</h2>
                <p className={styles.educationSchool}>{cvContent.education.school}</p>
                <p className={styles.educationCredential}>
                  {cvContent.education.credential}
                </p>
              </div>
              <p className={styles.dateLine}>{cvContent.education.dates}</p>
            </article>
          </Section>
        </article>
      </div>
    </main>
  )
}
