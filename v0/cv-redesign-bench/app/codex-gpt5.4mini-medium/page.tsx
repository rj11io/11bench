import { cvContent, type PageSection, type Role } from "./content"
import styles from "./cv.module.css"
import { PrintButton } from "./print-button"

function ContactLine() {
  const { identity } = cvContent

  const contacts = [
    { text: identity.location },
    { text: identity.email, href: `mailto:${identity.email}` },
    { text: identity.website, href: `https://${identity.website}` },
    { text: identity.github, href: `https://${identity.github}` },
    { text: identity.linkedin, href: `https://${identity.linkedin}` },
  ]

  return (
    <div className={styles.contactRow}>
      {contacts.map((item, index) => {
        return (
          <span key={item.text} className="contents">
            {item.href ? (
              <a href={item.href} className={styles.contactItem}>
                {item.text}
              </a>
            ) : (
              <span className={styles.contactItem}>{item.text}</span>
            )}
            {index < contacts.length - 1 ? (
              <span className={styles.contactDot}>·</span>
            ) : null}
          </span>
        )
      })}
    </div>
  )
}

function RoleView({ role }: { role: Role }) {
  return (
    <article className={styles.role}>
      <div className={styles.roleHead}>
        <div className={styles.roleTitleWrap}>
          <h3 className={styles.roleTitle}>{role.title}</h3>
          <p className={styles.roleCompany}>
            {role.companyUrl ? (
              <a
                href={role.companyUrl}
                className="underline decoration-neutral-300 underline-offset-4"
              >
                {role.company}
              </a>
            ) : (
              role.company
            )}
            {role.location ? ` · ${role.location}` : ""}
          </p>
        </div>
        <p className={styles.roleDates}>{role.dates}</p>
      </div>
      <ul className={styles.bullets}>
        {role.bullets.map((bullet) => (
          <li key={bullet.text}>{bullet.text}</li>
        ))}
      </ul>
    </article>
  )
}

function SectionView({ section }: { section: PageSection }) {
  switch (section.type) {
    case "intro":
      return (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>{section.label}</h2>
          <div className={styles.sectionBody}>
            <div className={styles.intro}>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.text} className={styles.paragraph}>
                  {paragraph.text}
                </p>
              ))}
            </div>
          </div>
        </section>
      )
    case "skills":
      return (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>{section.label}</h2>
          <div className={styles.sectionBody}>
            <div className={styles.skillsGrid}>
              {section.groups.map((group) => (
                <div key={group.label} className={styles.skillGroup}>
                  <p className={styles.skillName}>{group.label}</p>
                  <p className={styles.skillItems}>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    case "projects":
      return (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>{section.label}</h2>
          <div className={styles.sectionBody}>
            <div className={styles.projectList}>
              {section.items.map((project) => (
                <article key={project.name} className={styles.projectItem}>
                  <p className={styles.projectLine}>
                    <span className={styles.projectName}>{project.name}</span>{" "}
                    <a href={project.url} className={styles.projectLink}>
                      {project.url.replace("https://", "")}
                    </a>{" "}
                    <span className={styles.projectDesc}>{project.description}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )
    case "experience":
      return (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>{section.label}</h2>
          <div className={styles.sectionBody}>
            <div className={styles.roleList}>
              {section.roles.map((role) => (
                <RoleView key={`${role.title}-${role.dates}`} role={role} />
              ))}
            </div>
          </div>
        </section>
      )
    case "education":
      return (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>{section.label}</h2>
          <div className={styles.sectionBody}>
            <div className={styles.educationList}>
              {section.entries.map((entry) => (
                <article key={`${entry.title}-${entry.school}`} className={styles.educationItem}>
                  <p className={styles.educationTitle}>{entry.title}</p>
                  <p className={styles.educationMeta}>
                    {entry.school} · {entry.dates}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )
    default:
      return null
  }
}

export default function Page() {
  return (
    <main className={styles.stack}>
      <div className={styles.toolbar}>
        <PrintButton />
      </div>

      {cvContent.pages.map((page) => (
        <article key={page.index} className={styles.page} aria-label={`CV page ${page.index}`}>
          <header className={styles.pageHeader}>
            <div className={styles.identityRow}>
              <div className={styles.nameBlock}>
                <h1 className={styles.name}>{cvContent.identity.name}</h1>
                <p className={styles.title}>{cvContent.identity.title}</p>
              </div>
              <p className={styles.siteMark}>{cvContent.identity.cvUrl}</p>
            </div>
            <ContactLine />
          </header>

          {page.sections.map((section) => (
            <SectionView key={section.label} section={section} />
          ))}
        </article>
      ))}
    </main>
  )
}
