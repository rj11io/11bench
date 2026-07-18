import type { Role } from "./content"

import {
  availability,
  beyondWork,
  contacts,
  earlierRoles,
  education,
  identity,
  profile,
  projects,
  roles,
  skills,
} from "./content"
import styles from "./cv.module.css"
import { PrintButton } from "./print-button"

function Entry({ role }: { role: Role }) {
  return (
    <article className={styles.entry}>
      <div className={styles.entryHead}>
        <div>
          <h3 className={styles.entryTitle}>{role.title}</h3>
          <p className={styles.entryCompany}>
            {role.company}
            {role.companyUrl && role.companyHref ? (
              <>
                {" · "}
                <a
                  className={styles.link}
                  href={role.companyHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {role.companyUrl}
                </a>
              </>
            ) : null}
          </p>
        </div>
        <span className={styles.dates}>{role.dates}</span>
      </div>
      {role.lead ? <p className={styles.lead}>{role.lead}</p> : null}
      <ul className={styles.bullets}>
        {role.bullets.map((bullet) => (
          <li key={bullet.slice(0, 32)}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

export default function CVPage() {
  return (
    <div className={styles.root}>
      <div className={styles.sheet}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.name}>
              Ricardo Jorge<em>.</em>
            </h1>
            <p className={styles.role}>{identity.title}</p>
          </div>
          <div className={styles.contactBlock}>
            <span className={styles.location}>{identity.location}</span>
            <div className={styles.contactLinks}>
              {contacts.map((contact) => (
                <a
                  key={contact.href}
                  className={styles.link}
                  href={contact.href}
                  target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  {contact.label}
                </a>
              ))}
            </div>
            <a
              className={styles.link}
              href={identity.cvHref}
              target="_blank"
              rel="noreferrer"
            >
              {identity.cvUrl}
            </a>
            <PrintButton className={styles.printButton} />
          </div>
        </header>

        <main>
          <section className={styles.section} aria-labelledby="profile-h">
            <h2 id="profile-h" className={styles.sectionLabel}>
              Profile
            </h2>
            <div className={styles.sectionBody}>
              <div className={styles.profileText}>
                {profile.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
              <p className={styles.availability}>{availability}</p>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="skills-h">
            <h2 id="skills-h" className={styles.sectionLabel}>
              Skills
            </h2>
            <div className={styles.sectionBody}>
              {skills.map((group) => (
                <div key={group.name} className={styles.skillRow}>
                  <span className={styles.skillName}>{group.name}</span>
                  <span className={styles.skillItems}>
                    {group.items.join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="experience-h">
            <div className={`${styles.section} ${styles.sectionFlush} ${styles.pageBreakAfter}`}>
              <h2 id="experience-h" className={styles.sectionLabel}>
                Experience
              </h2>
              <div className={styles.sectionBody}>
                {roles.slice(0, 2).map((role) => (
                  <Entry key={role.company} role={role} />
                ))}
              </div>
            </div>
            <div className={`${styles.section} ${styles.sectionCont}`}>
              <span aria-hidden="true" className={styles.contLabel}>
                Experience — cont.
              </span>
              <div className={styles.sectionBody}>
                {roles.slice(2).map((role) => (
                  <Entry key={role.company} role={role} />
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="earlier-h">
            <h2 id="earlier-h" className={styles.sectionLabel}>
              Earlier
            </h2>
            <div className={styles.sectionBody}>
              {earlierRoles.map((item) => (
                <div key={item.company} className={styles.earlierItem}>
                  <div className={styles.earlierHead}>
                    <h3 className={styles.earlierTitle}>{item.title}</h3>
                    <span className={styles.earlierCompany}>{item.company}</span>
                    <span className={styles.dates}>{item.dates}</span>
                  </div>
                  <p className={styles.earlierNote}>{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="projects-h">
            <h2 id="projects-h" className={styles.sectionLabel}>
              Projects
            </h2>
            <div className={styles.sectionBody}>
              {projects.map((project) => (
                <div key={project.name} className={styles.projectItem}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <a
                    className={`${styles.link} ${styles.projectUrl}`}
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.url}
                  </a>
                  <span className={styles.projectDesc}>
                    {project.description}
                  </span>
                  <span className={styles.dates}>{project.dates}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="education-h">
            <h2 id="education-h" className={styles.sectionLabel}>
              Education
            </h2>
            <div className={styles.sectionBody}>
              <div className={styles.earlierHead}>
                <h3 className={styles.earlierTitle}>{education.program}</h3>
                <span className={styles.earlierCompany}>
                  {education.school}
                </span>
                <span className={styles.dates}>{education.dates}</span>
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="beyond-h">
            <h2 id="beyond-h" className={styles.sectionLabel}>
              Beyond work
            </h2>
            <div className={styles.sectionBody}>
              <p className={styles.earlierNote}>{beyondWork}</p>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <span>
            {identity.name} · {identity.title} · {identity.location}
          </span>
          <a
            className={styles.link}
            href={identity.cvHref}
            target="_blank"
            rel="noreferrer"
          >
            {identity.cvUrl}
          </a>
        </footer>
      </div>
    </div>
  )
}
