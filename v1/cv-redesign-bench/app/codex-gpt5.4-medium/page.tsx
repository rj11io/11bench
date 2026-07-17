import { PrintButton } from "./PrintButton"
import { cvContent } from "./cv-content"
import styles from "./cv.module.css"

function ContactLinks() {
  return (
    <ul className={styles.linkList} aria-label="Professional links">
      {cvContent.links.map((link) => (
        <li key={link.href}>
          <a href={link.href} className={styles.link}>
            {link.printLabel}
          </a>
        </li>
      ))}
    </ul>
  )
}

function RoleCard({
  role,
  compact = false,
}: {
  role: (typeof cvContent.experiencePrimary)[number] | (typeof cvContent.experienceSecondary)[number]
  compact?: boolean
}) {
  return (
    <article className={compact ? styles.roleCompact : styles.roleCard}>
      <div className={styles.roleHeader}>
        <div>
          <h3 className={styles.roleTitle}>{role.role}</h3>
          <p className={styles.roleMeta}>
            {role.companyUrl ? (
              <a href={role.companyUrl} className={styles.link}>
                {role.company}
              </a>
            ) : (
              role.company
            )}
            {role.context ? <span> · {role.context}</span> : null}
          </p>
        </div>
        <p className={styles.rolePeriod}>{role.period}</p>
      </div>
      {role.summary ? <p className={styles.roleSummary}>{role.summary}</p> : null}
      <ul className={styles.bulletList}>
        {role.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Page() {
  return (
    <main className={styles.stage}>
      <header className={styles.toolbar}>
        <div>
          <p className={styles.kicker}>One-route CV</p>
          <h1 className={styles.toolbarTitle}>Ricardo Jorge</h1>
          <p className={styles.toolbarNote}>
            Screen-first editorial layout with an exact two-page A4 print target.
          </p>
        </div>
        <PrintButton />
      </header>

      <div className={styles.sheetStack}>
        <article className={styles.sheet}>
          <div className={styles.sheetTopbar}>
            <span>{cvContent.profile.location}</span>
            <a href={`mailto:${cvContent.profile.email}`} className={styles.link}>
              {cvContent.profile.email}
            </a>
            <a href={cvContent.profile.cvUrl} className={styles.link}>
              {cvContent.profile.cvUrl.replace("https://", "")}
            </a>
          </div>

          <section className={styles.hero}>
            <div>
              <p className={styles.kicker}>AI Product Engineer</p>
              <h2 className={styles.name}>{cvContent.profile.name}</h2>
            </div>
            <ContactLinks />
          </section>

          <section className={styles.leadGrid}>
            <div className={styles.leadCopy}>
              <p className={styles.summary}>{cvContent.profile.summary}</p>
              <div className={styles.evidenceStrip}>
                {cvContent.profile.evidenceStrip.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <aside className={styles.sidePanel}>
              <p className={styles.sectionLabel}>How I add value</p>
              <ul className={styles.miniList}>
                {cvContent.profile.differentiators.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </section>

          <section className={styles.dualSection}>
            <div>
              <p className={styles.sectionLabel}>Selected projects</p>
              <div className={styles.projectGrid}>
                {cvContent.selectedProjects.map((project) => (
                  <article key={project.name} className={styles.projectCard}>
                    <div className={styles.projectHeader}>
                      <a href={project.href} className={styles.projectName}>
                        {project.name}
                      </a>
                      {project.period ? (
                        <span className={styles.projectPeriod}>{project.period}</span>
                      ) : null}
                    </div>
                    <p className={styles.projectBody}>{project.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <p className={styles.sectionLabel}>Current focus</p>
              <ul className={styles.tagList}>
                {cvContent.currentThemes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeadingRow}>
              <p className={styles.sectionLabel}>Experience</p>
              <p className={styles.sectionCaption}>Recent roles, in detail</p>
            </div>
            <div className={styles.roleStack}>
              {cvContent.experiencePrimary.map((role) => (
                <RoleCard key={`${role.company}-${role.period}`} role={role} />
              ))}
            </div>
          </section>
        </article>

        <article className={styles.sheet}>
          <section className={styles.secondaryIntro}>
            <div>
              <p className={styles.sectionLabel}>Earlier platform work</p>
              <h2 className={styles.pageHeading}>Leadership, systems, and product depth before the current AI cycle.</h2>
            </div>
            <p className={styles.secondaryCopy}>{cvContent.profile.rootsNote}</p>
          </section>

          <section className={styles.sectionBlock}>
            <div className={styles.roleStackCompact}>
              {cvContent.experienceSecondary.map((role) => (
                <RoleCard
                  key={`${role.company}-${role.period}`}
                  role={role}
                  compact
                />
              ))}
            </div>
          </section>

          <section className={styles.bottomGrid}>
            <div>
              <p className={styles.sectionLabel}>Capabilities</p>
              <div className={styles.skillGrid}>
                {cvContent.skillGroups.map((group) => (
                  <article key={group.label} className={styles.skillCard}>
                    <h3 className={styles.skillTitle}>{group.label}</h3>
                    <p className={styles.skillBody}>{group.items.join(" · ")}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.educationBlock}>
              <p className={styles.sectionLabel}>Education</p>
              <h3 className={styles.educationTitle}>{cvContent.education.degree}</h3>
              <p className={styles.educationMeta}>
                {cvContent.education.school} · {cvContent.education.location}
              </p>
              <p className={styles.educationMeta}>{cvContent.education.period}</p>
              <p className={styles.educationDetail}>{cvContent.education.detail}</p>
            </div>
          </section>
        </article>
      </div>
    </main>
  )
}
