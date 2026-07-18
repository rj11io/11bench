import type { ReactNode } from "react"

import { resume, type PageSection } from "./content"
import { PrintButton } from "./PrintButton"
import { PrintModeBridge } from "./PrintModeBridge"
import styles from "./cv.module.css"

function SectionFrame({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionLabel}>{label}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

function renderSection(section: PageSection) {
  if (section.kind === "summary") {
    return (
      <SectionFrame label={section.title}>
        <div className={styles.summary}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionFrame>
    )
  }

  if (section.kind === "skills") {
    return (
      <SectionFrame label={section.title}>
        <div className={styles.skillGroups}>
          {section.groups.map((group) => (
            <div key={group.name} className={styles.skillGroup}>
              <h3>{group.name}</h3>
              <div className={styles.chips}>
                {group.items.map((item) => (
                  <span key={item} className={styles.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>
    )
  }

  if (section.kind === "projects") {
    return (
      <SectionFrame label={section.title}>
        <div className={styles.projectList}>
          {section.items.map((item) => (
            <div key={item.name} className={styles.projectItem}>
              <div className={styles.projectMain}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.projectName}
                >
                  {item.name}
                </a>
                <span className={styles.projectDescription}>
                  {item.description}
                </span>
              </div>
              <span className={styles.projectDates}>{item.dates}</span>
            </div>
          ))}
        </div>
      </SectionFrame>
    )
  }

  if (section.kind === "experience") {
    return (
      <SectionFrame label={section.title}>
        <div className={styles.experienceList}>
          {section.items.map((item) => (
            <article key={`${item.role}-${item.company}`} className={styles.experienceItem}>
              <div className={styles.experienceHead}>
                <div>
                  <h3 className={styles.experienceTitle}>{item.role}</h3>
                  <p className={styles.experienceCompany}>
                    {item.company}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                </div>
                <span className={styles.experienceDates}>{item.dates}</span>
              </div>
              <ul className={styles.experienceBullets}>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionFrame>
    )
  }

  if (section.kind === "education") {
    return (
      <SectionFrame label={section.title}>
        <div className={styles.educationList}>
          {section.items.map((item) => (
            <div key={item.school} className={styles.educationItem}>
              <div>
                <h3 className={styles.educationSchool}>{item.school}</h3>
                <p className={styles.educationDetail}>
                  {item.degree}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
              </div>
              <span className={styles.educationDates}>{item.dates}</span>
            </div>
          ))}
        </div>
      </SectionFrame>
    )
  }

  return null
}

function PageHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageName}>{resume.identity.name}</h1>
        <p className={styles.pageRole}>{resume.identity.title}</p>
      </div>
      <div className={styles.pageMeta}>
        <p className={styles.pageMetaNote}>
          {compact ? "CV" : "Portfolio / CV"}
        </p>
        <nav className={styles.pageContact} aria-label="Contact links">
          <span>{resume.identity.location}</span>
          <a href={`mailto:${resume.identity.email}`}>{resume.identity.email}</a>
          <a href={`https://${resume.identity.website}`} target="_blank" rel="noreferrer">
            {resume.identity.website}
          </a>
          <a href={`https://${resume.identity.github}`} target="_blank" rel="noreferrer">
            {resume.identity.github}
          </a>
          <a
            href={`https://${resume.identity.linkedin}`}
            target="_blank"
            rel="noreferrer"
          >
            {resume.identity.linkedin}
          </a>
          <a href={`https://${resume.identity.archive}`} target="_blank" rel="noreferrer">
            {resume.identity.archive}
          </a>
        </nav>
      </div>
    </header>
  )
}

export default function Page() {
  return (
    <main className={styles.shell}>
      <PrintModeBridge />
      <div className={styles.toolbar}>
        <div className={styles.brand}>
          <p className={styles.kicker}>11bench / run codex-gpt5.4mini-high</p>
          <h1 className={styles.title}>Ricardo Jorge</h1>
          <div className={styles.subtitleRow}>
            <span>{resume.identity.title}</span>
            <span>{resume.identity.location}</span>
            <a href={`mailto:${resume.identity.email}`}>{resume.identity.email}</a>
            <a href={`https://${resume.identity.website}`} target="_blank" rel="noreferrer">
              {resume.identity.website}
            </a>
          </div>
        </div>
        <div className={styles.toolbarActions}>
          <a
            href={`https://${resume.identity.archive}`}
            target="_blank"
            rel="noreferrer"
            className={styles.archive}
          >
            Full version: {resume.identity.archive}
          </a>
          <PrintButton />
        </div>
      </div>

      <div className={styles.pages}>
        {resume.pages.map((page, index) => (
          <article key={page.id} className={styles.page}>
            <div className={styles.pageInner}>
              <PageHeader compact={index > 0} />
              {page.sections.map((section) => renderSection(section))}
              {index === 0 ? (
                <p className={styles.notes}>
                  <strong>Source note:</strong> this route is written from the two
                  reference PDFs in <code>ref/</code> and the content model in
                  this folder. The final print version intentionally omits the
                  long personal narrative and fun-facts section so the two-page
                  limit can prioritize work history and skills.
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
