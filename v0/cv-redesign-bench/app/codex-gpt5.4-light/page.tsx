import { cv } from "./content"
import { PrintButton } from "./PrintButton"
import styles from "./page.module.css"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className={styles.panelTitle}>{children}</div>
}

export default function Page() {
  const recentRoles = cv.experience.slice(0, 4)
  const earlierLeadRole = cv.experience[4]

  return (
    <main className={styles.route}>
      <div className={styles.shell}>
        <div className={styles.toolbar}>
          <div>
            <div className={styles.eyebrow}>CV redesign benchmark route</div>
            <div className={styles.muted}>Responsive screen version with exact two-page print layout</div>
          </div>
          <PrintButton />
        </div>

        <div className={styles.deck}>
          <section className={`${styles.page} ${styles.pageOne}`}>
            <header className={styles.hero}>
              <div className={styles.heroTop}>
                <div className={styles.nameBlock}>
                  <div className={styles.eyebrow}>{cv.basics.title.value}</div>
                  <h1 className={styles.name}>{cv.basics.name}</h1>
                  <p className={styles.headline}>{cv.profile.headline.value}</p>
                </div>

                <div className={styles.contactList}>
                  <span className={styles.contactItem}>{cv.basics.location.value}</span>
                  <a className={styles.linkItem} href={`mailto:${cv.basics.email.value}`}>
                    {cv.basics.email.value}
                  </a>
                  <a className={styles.linkItem} href={cv.basics.website.value}>
                    {cv.basics.website.value.replace("https://", "")}
                  </a>
                  <a className={styles.linkItem} href={cv.basics.github.value}>
                    {cv.basics.github.value.replace("https://", "")}
                  </a>
                  <a className={styles.linkItem} href={cv.basics.linkedin.value}>
                    {cv.basics.linkedin.value.replace("https://", "")}
                  </a>
                </div>
              </div>

              <div className={styles.facts}>
                <span className={styles.factPill}>10+ years in TypeScript</span>
                <span className={styles.factPill}>React since 2016</span>
                <span className={styles.factPill}>Next.js since 2018</span>
                <span className={styles.factPill}>Zero-to-one frontend leadership</span>
              </div>
            </header>

            <div className={styles.heroGrid}>
              <aside className={styles.rail}>
                <section className={styles.panel}>
                  <SectionTitle>Profile</SectionTitle>
                  <ul className={styles.summaryList}>
                    {cv.profile.summary.value.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className={styles.accentBand}>
                  <SectionTitle>Where he adds leverage</SectionTitle>
                  <ul className={styles.compactList}>
                    {cv.profile.differentiators.value.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </aside>

              <section className={styles.main}>
                <section className={styles.panel}>
                  <SectionTitle>Selected Experience</SectionTitle>
                  <div className={styles.experienceList}>
                    {recentRoles.map((role) => (
                      <article className={styles.role} key={`${role.company}-${role.dates}`}>
                        <div className={styles.roleHead}>
                          <div>
                            <div className={styles.roleTitle}>{role.title}</div>
                            <div className={styles.roleMeta}>
                              {role.company}
                              {role.website ? ` · ${role.website.replace("https://", "")}` : ""}
                            </div>
                          </div>
                          <div className={styles.roleDates}>{role.dates}</div>
                        </div>
                        <div className={styles.roleMeta}>{role.summary.value}</div>
                        <ul className={styles.bulletList}>
                          {role.bullets.map((bullet) => (
                            <li key={bullet.value}>{bullet.value}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>
              </section>
            </div>
          </section>

          <section className={styles.page}>
            <div className={styles.pageGrid}>
              <aside className={styles.rail}>
                <section className={styles.panel}>
                  <SectionTitle>Core Skills</SectionTitle>
                  <div className={styles.skillList}>
                    {cv.skills.map((group) => (
                      <div className={styles.skillRow} key={group.label}>
                        <div className={styles.skillLabel}>{group.label}</div>
                        <div className={styles.skillItems}>{group.items.join(" · ")}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className={styles.panel}>
                  <SectionTitle>Projects</SectionTitle>
                  <div className={styles.projectList}>
                    {cv.projects.map((project) => (
                      <div className={styles.projectItem} key={project.url}>
                        <a className={styles.projectLink} href={project.url}>
                          {project.name}
                        </a>
                        <div className={styles.muted}>
                          {project.label}
                          {project.dates ? ` · ${project.dates}` : ""}
                        </div>
                        <div>{project.note.value}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className={styles.panel}>
                  <SectionTitle>Education</SectionTitle>
                  <div className={styles.projectItem}>
                    <strong>{cv.education.program.value}</strong>
                    <div>{cv.education.school.value}</div>
                    <div className={styles.muted}>{cv.education.dates.value}</div>
                    <div>{cv.education.credential.value}</div>
                  </div>
                </section>
              </aside>

              <section className={styles.main}>
                <section className={styles.panel}>
                  <SectionTitle>Earlier Leadership</SectionTitle>
                  <article className={styles.role}>
                    <div className={styles.roleHead}>
                      <div>
                        <div className={styles.roleTitle}>{earlierLeadRole.title}</div>
                        <div className={styles.roleMeta}>
                          {earlierLeadRole.company} ·{" "}
                          {earlierLeadRole.website?.replace("https://", "")}
                        </div>
                      </div>
                      <div className={styles.roleDates}>{earlierLeadRole.dates}</div>
                    </div>
                    <div className={styles.roleMeta}>{earlierLeadRole.summary.value}</div>
                    <ul className={styles.bulletList}>
                      {earlierLeadRole.bullets.map((bullet) => (
                        <li key={bullet.value}>{bullet.value}</li>
                      ))}
                    </ul>
                  </article>
                </section>

                <section className={styles.panel}>
                  <SectionTitle>Earlier Experience</SectionTitle>
                  <ul className={styles.compactList}>
                    {cv.earlierExperience.value.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className={styles.accentBand}>
                  <SectionTitle>Career Pattern</SectionTitle>
                  <div className={styles.skillItems}>
                    Repeatedly trusted with greenfield product work, shared frontend foundations,
                    data-heavy UX, and the delivery systems around them: testing, CI/CD, onboarding,
                    and product-engineering handoff quality.
                  </div>
                </section>

                <div className={styles.footerNote}>
                  This route renders from the canonical content artifact in{" "}
                  <code>app/codex-gpt5.4-light/content.ts</code>. Use the button above to print the
                  exact two-page PDF version.
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
