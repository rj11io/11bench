'use client'

import type { MouseEventHandler, ReactNode } from "react"

import { cvContent } from "./content"
import styles from "./page.module.css"

function Section({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>{label}</div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

function PrintButton() {
  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    window.print()
  }

  return (
    <button className={styles.printButton} onClick={onClick} type="button">
      Download PDF
    </button>
  )
}

function Header() {
  return (
    <>
      <div className={styles.topline}>
        <div className={styles.nameBlock}>
          <h1 className={styles.name}>{cvContent.name}</h1>
          <div className={styles.role}>{cvContent.title}</div>
        </div>
        <div className={styles.siteMark}>cv.rj11.io</div>
      </div>

      <div className={styles.contactRow} aria-label="Contact links">
        <span>{cvContent.location}</span>
        <span>·</span>
        <a href={`mailto:${cvContent.email}`}>{cvContent.email}</a>
        <span>·</span>
        <a href={cvContent.website}>{new URL(cvContent.website).hostname}</a>
        <span>·</span>
        <a href={cvContent.github}>{new URL(cvContent.github).hostname}/rj11io</a>
        <span>·</span>
        <a href={cvContent.linkedin}>
          linkedin.com/in/rj11io
        </a>
      </div>
    </>
  )
}

function ExperienceCard({
  item,
  compact = false,
}: {
  item: (typeof cvContent.experience)[number]
  compact?: boolean
}) {
  if (compact) {
    return (
      <article className={styles.experienceItem}>
        <div className={styles.itemHeader}>
          <h3 className={styles.experienceTitle}>{item.role}</h3>
          <div className={styles.mono}>{item.dates}</div>
        </div>
        <div className={styles.itemMeta}>
          <span>{item.org}</span>
          {item.place ? (
            <>
              <span>·</span>
              <span>{item.place}</span>
            </>
          ) : null}
        </div>
        <p className={styles.itemSummary}>{item.summary}</p>
      </article>
    )
  }

  return (
    <article className={styles.experienceItem}>
      <div className={styles.itemHeader}>
        <h3 className={styles.experienceTitle}>{item.role}</h3>
        <div className={styles.mono}>{item.dates}</div>
      </div>
      <div className={styles.itemMeta}>
        <span>{item.org}</span>
        {item.link ? (
          <>
            <span>·</span>
            <a className={styles.inlineLink} href={item.link}>
              {new URL(item.link).hostname}
            </a>
          </>
        ) : null}
        {item.place ? (
          <>
            <span>·</span>
            <span>{item.place}</span>
          </>
        ) : null}
      </div>
      {item.summary ? <p className={styles.itemSummary}>{item.summary}</p> : null}
      <ul className={styles.bulletList}>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {item.note ? <div className={styles.note}>{item.note}</div> : null}
    </article>
  )
}

function ProjectCard({
  project,
}: {
  project: (typeof cvContent.projects)[number]
}) {
  return (
    <article className={styles.projectItem}>
      <div className={styles.itemHeader}>
        <h3 className={styles.itemTitle}>{project.name}</h3>
        <div className={styles.mono}>{project.dates}</div>
      </div>
      <div className={styles.itemMeta}>
        <a className={styles.projectLink} href={project.link}>
          {new URL(project.link).hostname}
        </a>
      </div>
      <p className={styles.itemSummary}>{project.description}</p>
      {project.note ? <div className={styles.note}>{project.note}</div> : null}
    </article>
  )
}

function PrintPage({ children }: { children: ReactNode }) {
  return <div className={styles.printPage}>{children}</div>
}

export default function Page() {
  const pageOneProjects = cvContent.projects
  const pageOneExperiences = cvContent.experience.slice(0, 2)
  const pageTwoExperiences = cvContent.experience.slice(2, 5)
  const earlierExperiences = cvContent.experience.slice(5)

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.toolbar}>
          <PrintButton />
        </div>

        <div className={styles.canvas} aria-label="CV preview">
          <div className={styles.pagePane}>
            <Header />
            <hr className={styles.divider} />
            <Section label="About Me">
              <div className={styles.summary}>
                {cvContent.summary.map((paragraph) => (
                  <p key={paragraph.text}>{paragraph.text}</p>
                ))}
              </div>
            </Section>
            <Section label="Skills">
              <div className={styles.skillGrid}>
                {cvContent.skills.map((skill) => (
                  <div className={styles.skillRow} key={skill.group}>
                    <div className={styles.skillGroup}>{skill.group}</div>
                    <div>{skill.items}</div>
                  </div>
                ))}
              </div>
            </Section>
            <Section label="Projects">
              <div className={styles.projectList}>
                {pageOneProjects.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </Section>
            <Section label="Experience">
              <div className={styles.experienceList}>
                {pageOneExperiences.map((item) => (
                  <ExperienceCard key={`${item.role}-${item.org}`} item={item} />
                ))}
              </div>
            </Section>
          </div>
        </div>

        <div className={styles.printPages} aria-hidden="true">
          <PrintPage>
            <Header />
            <hr className={styles.divider} />
            <Section label="About Me">
              <div className={styles.summary}>
                {cvContent.summary.map((paragraph) => (
                  <p key={paragraph.text}>{paragraph.text}</p>
                ))}
              </div>
            </Section>
            <Section label="Skills">
              <div className={styles.skillGrid}>
                {cvContent.skills.map((skill) => (
                  <div className={styles.skillRow} key={skill.group}>
                    <div className={styles.skillGroup}>{skill.group}</div>
                    <div>{skill.items}</div>
                  </div>
                ))}
              </div>
            </Section>
            <Section label="Projects">
              <div className={styles.projectList}>
                {pageOneProjects.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </Section>
            <Section label="Experience">
              <div className={styles.experienceList}>
                {pageOneExperiences.map((item) => (
                  <ExperienceCard key={`${item.role}-${item.org}`} item={item} />
                ))}
              </div>
            </Section>
          </PrintPage>
          <PrintPage>
            <Header />
            <hr className={styles.divider} />
            <Section label="Experience">
              <div className={styles.experienceList}>
                {pageTwoExperiences.map((item) => (
                  <ExperienceCard key={`${item.role}-${item.org}`} item={item} />
                ))}
              </div>
            </Section>
            <Section label="Earlier">
              <div className={styles.experienceList}>
                {earlierExperiences.map((item) => (
                  <ExperienceCard
                    compact
                    key={`${item.role}-${item.org}`}
                    item={item}
                  />
                ))}
              </div>
            </Section>
            <Section label="Education">
              <div className={styles.experienceList}>
                {cvContent.education.map((edu) => (
                  <article className={styles.experienceItem} key={edu.degree}>
                    <div className={styles.itemHeader}>
                      <h3 className={styles.experienceTitle}>{edu.degree}</h3>
                      <div className={styles.mono}>{edu.dates}</div>
                    </div>
                    <div className={styles.itemMeta}>
                      <span>{edu.school}</span>
                      <span>·</span>
                      <span>{edu.location}</span>
                    </div>
                    {edu.note ? <div className={styles.note}>{edu.note}</div> : null}
                  </article>
                ))}
              </div>
            </Section>
            <Section label="Omissions">
              <ul className={styles.factList}>
                {cvContent.omissions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
          </PrintPage>
        </div>
      </div>
    </main>
  )
}
