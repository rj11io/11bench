import { cv, type Experience } from "./content"
import { PrintButton } from "./PrintButton"
import styles from "./cv.module.css"

function SectionLabel({
  index,
  id,
  children,
}: {
  index: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.sectionLabel}>
      <span>{index}</span>
      <h2 id={id}>{children}</h2>
    </div>
  )
}

function ExperienceEntry({ item }: { item: Experience }) {
  return (
    <article className={styles.experienceEntry}>
      <div className={styles.experienceHead}>
        <div>
          <h3>{item.role}</h3>
          <p>
            {item.employer}
            <span aria-hidden="true"> ↗ </span>
            <a
              href={item.url}
              aria-label={`${item.employer} website, ${item.displayUrl}`}
            >
              {item.displayUrl}
            </a>
          </p>
        </div>
        <time>{item.period}</time>
      </div>
      <ul>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

function SheetFrame({
  page,
  children,
  continuation = false,
}: {
  page: "01" | "02"
  children: React.ReactNode
  continuation?: boolean
}) {
  return (
    <article className={styles.sheet} aria-label={`CV page ${page} of 02`}>
      <div className={styles.topRule}>
        <span>RJ / CURRICULUM VITAE</span>
        <span>{continuation ? "EXPERIENCE / CONTINUED" : "AI PRODUCT ENGINEER"}</span>
      </div>
      {children}
      <footer className={styles.folio}>
        <span>Lisbon · Remote</span>
        <span>{page} / 02</span>
      </footer>
    </article>
  )
}

export default function Page() {
  const [rj11io, hunt, omega, phantasma, coalition] = cv.experience

  return (
    <main className={styles.workspace}>
      <PrintButton />

      <div className={styles.document}>
        <SheetFrame page="01">
          <header className={styles.hero}>
            <div className={styles.nameBlock}>
              <p className={styles.eyebrow}>
                <span aria-hidden="true" />
                Available for exceptional work
              </p>
              <h1>{cv.identity.name}</h1>
              <p className={styles.title}>{cv.identity.title}</p>
            </div>

            <address className={styles.contact}>
              <span>{cv.identity.location}</span>
              <a href={`mailto:${cv.identity.email}`}>{cv.identity.email}</a>
              <a href={cv.identity.site.url}>{cv.identity.site.label}</a>
              <a href={cv.identity.github.url}>{cv.identity.github.label}</a>
              <a href={cv.identity.linkedin.url}>{cv.identity.linkedin.label}</a>
            </address>
          </header>

          <div className={styles.introGrid}>
            <aside className={styles.positioning}>
              <p>Positioning / 2026</p>
              <strong>{cv.positioning}</strong>
            </aside>
            <section className={styles.profile} aria-labelledby="profile-title">
              <SectionLabel index="01" id="profile-title">
                Profile
              </SectionLabel>
              <div className={styles.profileCopy}>
                {cv.profile.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          </div>

          <section className={styles.capabilities} aria-labelledby="capabilities-title">
            <SectionLabel index="02" id="capabilities-title">
              Capabilities
            </SectionLabel>
            <div className={styles.capabilityGrid}>
              {cv.capabilities.map((group) => (
                <div key={group.label}>
                  <h3>{group.label}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.experience} aria-labelledby="experience-title">
            <SectionLabel index="03" id="experience-title">
              Experience
            </SectionLabel>
            <div className={styles.experienceList}>
              {[rj11io, hunt, omega].map((item) => (
                <ExperienceEntry item={item} key={item.employer} />
              ))}
            </div>
          </section>
        </SheetFrame>

        <SheetFrame page="02" continuation>
          <header className={styles.continuationHeader}>
            <div>
              <p>{cv.identity.name}</p>
              <h2>Building the interface<br />between systems and people.</h2>
            </div>
            <p className={styles.continuationNote}>
              TypeScript since the start.<br />
              React since 2016.<br />
              Next.js since 2018.
            </p>
          </header>

          <section
            className={`${styles.experience} ${styles.experienceContinued}`}
            aria-label="Experience continued"
          >
            <div className={styles.experienceList}>
              {[phantasma, coalition].map((item) => (
                <ExperienceEntry item={item} key={item.employer} />
              ))}
            </div>
          </section>

          <section className={styles.earlier} aria-labelledby="earlier-title">
            <SectionLabel index="04" id="earlier-title">
              Earlier foundation
            </SectionLabel>
            <div className={styles.timeline}>
              {cv.earlier.map((item) => (
                <article key={`${item.employer}-${item.period}`}>
                  <time>{item.period}</time>
                  <div>
                    <h3>
                      {item.role} <span>· {item.employer}</span>
                    </h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className={styles.bottomGrid}>
            <section className={styles.projects} aria-labelledby="projects-title">
              <SectionLabel index="05" id="projects-title">
                Selected projects
              </SectionLabel>
              <div>
                {cv.projects.map((project) => (
                  <article key={project.name}>
                    <h3>
                      <a href={project.url}>{project.name}</a>
                    </h3>
                    <time>{project.period}</time>
                    <p>{project.description}</p>
                    <a
                      className={styles.projectUrl}
                      href={project.url}
                      aria-label={`${project.name}, ${project.displayUrl}`}
                    >
                      {project.displayUrl} ↗
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <div className={styles.sideStack}>
              <section className={styles.education} aria-labelledby="education-title">
                <SectionLabel index="06" id="education-title">
                  Education
                </SectionLabel>
                <h3>{cv.education.programme}</h3>
                <p>{cv.education.school}</p>
                <p>
                  {cv.education.location} · {cv.education.period}
                </p>
              </section>

              <aside className={styles.signal}>
                <p>Early signal</p>
                <blockquote>{cv.personalSignal}</blockquote>
              </aside>
            </div>
          </div>

          <div className={styles.closing}>
            <span>Let’s build something exacting.</span>
            <a href={`mailto:${cv.identity.email}`}>{cv.identity.email}</a>
          </div>
        </SheetFrame>
      </div>
    </main>
  )
}
