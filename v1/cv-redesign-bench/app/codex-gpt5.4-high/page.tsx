import fs from "node:fs"
import path from "node:path"

import styles from "./cv.module.css"
import { PrintButton } from "./PrintButton"

type Basics = {
  name: string
  headline: string
  location: string
  email: string
  website: string
  linkedin: string
  github: string
  legacyGithub: string
  portfolioCv: string
}

type Summary = {
  kicker: string
  paragraphs: string[]
  proofPoints: string[]
}

type SkillBand = {
  label: string
  items: string[]
}

type Project = {
  name: string
  url: string
  dates: string
  description: string
}

type Experience = {
  role: string
  company: string
  companyUrl: string
  dates: string
  meta: string
  summary: string
  bullets: string[]
}

type EarlierExperience = {
  role: string
  company: string
  dates: string
  detail: string
}

type Education = {
  degree: string
  institution: string
  dates: string
  detail: string
}

type CvContent = {
  basics: Basics
  summary: Summary
  signals: string[]
  skills: SkillBand[]
  projects: Project[]
  experience: Experience[]
  earlierExperience: EarlierExperience[]
  education: Education[]
}

function loadContent() {
  const contentPath = path.join(
    process.cwd(),
    "app",
    "codex-gpt5.4-high",
    "content.md"
  )

  const raw = fs.readFileSync(contentPath, "utf8")
  const match = raw.match(
    /<!-- CANONICAL_CONTENT_START -->\s*([\s\S]*?)\s*<!-- CANONICAL_CONTENT_END -->/
  )

  if (!match) {
    throw new Error("Canonical content block not found in content.md")
  }

  return JSON.parse(match[1]) as CvContent
}

function prettyHost(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

function LinkLine({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <a href={href} className={styles.inlineLink}>
      {label}
    </a>
  )
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <article className={styles.roleCard}>
      <div className={styles.roleTopline}>
        <div>
          <h3 className={styles.roleTitle}>{item.role}</h3>
          <p className={styles.roleMeta}>
            {item.companyUrl ? (
              <>
                {item.company} ·{" "}
                <a href={item.companyUrl} className={styles.inlineLink}>
                  {prettyHost(item.companyUrl)}
                </a>
              </>
            ) : (
              item.company
            )}
          </p>
          <p className={styles.roleContext}>{item.meta}</p>
        </div>
        <p className={styles.roleDates}>{item.dates}</p>
      </div>

      <p className={styles.roleSummary}>{item.summary}</p>

      <ul className={styles.roleBullets}>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Page() {
  const content = loadContent()
  const currentExperience = content.experience.slice(0, 2)
  const remainingExperience = content.experience.slice(2)

  return (
    <main className={styles.canvas}>
      <div className={styles.controls}>
        <p className={styles.controlNote}>
          Responsive screen layout, authored to print as exactly two A4 pages.
        </p>
        <PrintButton />
      </div>

      <div className={styles.sheets}>
        <article className={styles.sheet}>
          <header className={styles.hero}>
            <div className={styles.identityBlock}>
              <p className={styles.eyebrow}>cv.rj11.io / redesigned benchmark run</p>
              <h1 className={styles.name}>{content.basics.name}</h1>
              <p className={styles.headline}>{content.basics.headline}</p>
            </div>

            <div className={styles.heroSide}>
              <div className={styles.contactStrip}>
                <span>{content.basics.location}</span>
                <LinkLine
                  href={`mailto:${content.basics.email}`}
                  label={content.basics.email}
                />
                <LinkLine
                  href={content.basics.website}
                  label={prettyHost(content.basics.website)}
                />
                <LinkLine
                  href={content.basics.github}
                  label={prettyHost(content.basics.github)}
                />
                <LinkLine
                  href={content.basics.linkedin}
                  label={prettyHost(content.basics.linkedin)}
                />
              </div>

              <div className={styles.summaryPanel}>
                <p className={styles.summaryKicker}>{content.summary.kicker}</p>
                {content.summary.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={styles.summaryParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </header>

          <section className={styles.introSection}>
            <div className={styles.proofPanel}>
              <p className={styles.sectionLabel}>Why This CV Starts Here</p>
              <ul className={styles.signalList}>
                {content.summary.proofPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className={styles.projectPanel}>
              <p className={styles.sectionLabel}>Selected Public Work</p>
              <div className={styles.projectList}>
                {content.projects.map((project) => (
                  <article key={project.name} className={styles.projectCard}>
                    <div className={styles.projectTopline}>
                      <h2>{project.name}</h2>
                      <span>{project.dates}</span>
                    </div>
                    <p className={styles.projectLinkRow}>
                      <a href={project.url} className={styles.inlineLink}>
                        {prettyHost(project.url)}
                      </a>
                    </p>
                    <p>{project.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.flowSection}>
            <div className={styles.columnHeader}>
              <p className={styles.sectionLabel}>Recent Experience</p>
              <p className={styles.columnNote}>
                Reverse chronological, with detail weighted toward the last five
                years.
              </p>
            </div>

            <div className={styles.roleStack}>
              {currentExperience.map((item) => (
                <ExperienceCard key={`${item.company}-${item.dates}`} item={item} />
              ))}
            </div>
          </section>

          <footer className={styles.pageFooter}>Page 1 / 2</footer>
        </article>

        <article className={styles.sheet}>
          <section className={styles.flowSection}>
            <div className={styles.columnHeader}>
              <p className={styles.sectionLabel}>Experience Continued</p>
              <p className={styles.columnNote}>
                Older roles are retained, but their space reflects present hiring
                relevance.
              </p>
            </div>

            <div className={styles.roleStack}>
              {remainingExperience.map((item, index) => (
                <ExperienceCard
                  key={`${item.company}-${item.dates}`}
                  item={{
                    ...item,
                    bullets: index >= 2 ? item.bullets.slice(0, 2) : item.bullets,
                  }}
                />
              ))}
            </div>
          </section>

          <section className={styles.compactGrid}>
            <section className={styles.compactSection}>
              <p className={styles.sectionLabel}>Skills</p>
              <div className={styles.skillBands}>
                {content.skills.map((band) => (
                  <div key={band.label} className={styles.skillBand}>
                    <h2>{band.label}</h2>
                    <p>{band.items.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.compactSection}>
              <p className={styles.sectionLabel}>Earlier Experience</p>
              <div className={styles.earlierList}>
                {content.earlierExperience.map((item) => (
                  <article key={`${item.company}-${item.dates}`}>
                    <div className={styles.earlierTopline}>
                      <h2>{item.role}</h2>
                      <span>{item.dates}</span>
                    </div>
                    <p className={styles.earlierCompany}>{item.company}</p>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.compactSection}>
              <p className={styles.sectionLabel}>Education And Signals</p>
              {content.education.map((item) => (
                <article key={item.institution} className={styles.educationCard}>
                  <h2>{item.degree}</h2>
                  <p>{item.institution}</p>
                  <p className={styles.educationDates}>{item.dates}</p>
                  <p>{item.detail}</p>
                </article>
              ))}

              <ul className={styles.signalList}>
                {content.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </section>

            <section className={styles.compactSection}>
              <p className={styles.sectionLabel}>Primary Links</p>
              <div className={styles.bottomLinks}>
                <LinkLine
                  href={content.basics.website}
                  label={prettyHost(content.basics.website)}
                />
                <LinkLine
                  href={content.basics.github}
                  label={prettyHost(content.basics.github)}
                />
                <LinkLine
                  href={content.basics.legacyGithub}
                  label={prettyHost(content.basics.legacyGithub)}
                />
                <LinkLine
                  href={content.basics.portfolioCv}
                  label={prettyHost(content.basics.portfolioCv)}
                />
              </div>
            </section>
          </section>

          <footer className={styles.pageFooter}>Page 2 / 2</footer>
        </article>
      </div>
    </main>
  )
}
