import { Fragment } from "react"

import {
  beyond,
  contacts,
  earlier,
  education,
  email,
  footer,
  pageOneRoles,
  pageTwoRoles,
  person,
  profile,
  projects,
  projectsNote,
  skills,
  type Role,
} from "./content"
import styles from "./cv.module.css"
import { PrintButton } from "./print-button"
import { Rich } from "./rich"

const SEP = " · "

/** Section: label in the left rail, content to the right of the spine. */
function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.label}>{label}</h2>
      <div className={styles.body}>{children}</div>
    </section>
  )
}

function Entry({ role }: { role: Role }) {
  return (
    <article className={styles.entry}>
      <div className={styles.entryHead}>
        <h3 className={styles.entryTitle}>
          {role.title}
          {role.promotedTo ? (
            <Fragment>
              <span
                className={styles.arrow}
                role="img"
                aria-label="promoted to"
              >
                {" → "}
              </span>
              {role.promotedTo}
            </Fragment>
          ) : null}
        </h3>
        <span className={styles.dates}>{role.dates}</span>
      </div>

      <p className={styles.meta}>
        <span className={styles.employer}>{role.employer}</span>
        {role.employerAlt ? (
          <Fragment>
            {SEP}
            <span className={styles.employer}>{role.employerAlt}</span>
          </Fragment>
        ) : null}
        {role.site ? (
          <Fragment>
            {SEP}
            <a className={styles.link} href={role.site.href}>
              {role.site.label}
            </a>
          </Fragment>
        ) : null}
        {role.arrangement ? (
          <Fragment>
            {SEP}
            {role.arrangement}
          </Fragment>
        ) : null}
      </p>

      {role.framing ? <p className={styles.framing}>{role.framing}</p> : null}

      <ul className={styles.bullets}>
        {role.bullets.map((bullet) => (
          <li key={bullet}>
            <Rich text={bullet} />
          </li>
        ))}
      </ul>
    </article>
  )
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.title,
  description: person.standfirst,
  email: email.href,
  url: contacts[0].href,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lisbon",
    addressCountry: "PT",
  },
  sameAs: contacts.map((contact) => contact.href),
  alumniOf: {
    "@type": "EducationalOrganization",
    name: education.school,
  },
  knowsAbout: skills.flatMap((row) => row.items),
}

export default function Page() {
  return (
    <div className={styles.root}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={styles.bar}>
        <span className={styles.barName}>
          {person.name}
          <span className={styles.barRole}>
            {SEP}
            {person.title}
          </span>
        </span>
        <PrintButton />
      </div>

      <main className={styles.shell}>
        {/* ------------------------------------------------------- A4 page 1 */}
        <div className={`${styles.sheet} ${styles.sheetOne}`}>
          <header className={styles.masthead}>
            <h1 className={styles.name}>{person.name}</h1>
            <p className={styles.role}>{person.title}</p>
            <p className={styles.standfirst}>{person.standfirst}</p>
            <p className={styles.contacts}>
              {person.location}
              {SEP}
              <a className={styles.link} href={email.href}>
                {email.label}
              </a>
              {contacts.map((contact) => (
                <Fragment key={contact.href}>
                  {SEP}
                  <a className={styles.link} href={contact.href}>
                    {contact.label}
                  </a>
                </Fragment>
              ))}
            </p>
          </header>

          <Section label="Profile">
            {profile.map((paragraph) => (
              <p key={paragraph} className={styles.prose}>
                <Rich text={paragraph} />
              </p>
            ))}
          </Section>

          <Section label="Skills">
            {skills.map((row) => (
              <div key={row.label} className={styles.skillRow}>
                <span className={styles.skillLabel}>{row.label}</span>
                <p className={styles.skillItems}>{row.items.join(SEP)}</p>
              </div>
            ))}
          </Section>

          <Section label="Projects">
            {projects.map((project) => (
              <div key={project.name} className={styles.row}>
                <div className={styles.entryHead}>
                  <p className={styles.rowTitle}>
                    <span className={styles.rowName}>{project.name}</span>
                    {SEP}
                    <a className={styles.link} href={project.site.href}>
                      {project.site.label}
                    </a>
                    {" — "}
                    {project.description}
                  </p>
                  <span className={styles.dates}>{project.dates}</span>
                </div>
              </div>
            ))}
            <p className={styles.note}>
              {`${projectsNote.text} `}
              <a className={styles.link} href={projectsNote.site.href}>
                {projectsNote.site.label}
              </a>
            </p>
          </Section>

          <Section label="Experience">
            {pageOneRoles.map((role) => (
              <Entry key={role.employer} role={role} />
            ))}
          </Section>
        </div>

        {/* ------------------------------------------------------- A4 page 2 */}
        <div className={`${styles.sheet} ${styles.sheetTwo}`}>
          <div className={styles.runningHead} aria-hidden="true">
            <span>
              {person.name}
              {SEP}
              {person.title}
            </span>
            <span>Page 2 of 2</span>
          </div>

          <Section label="Experience (cont.)">
            {pageTwoRoles.map((role) => (
              <Entry key={role.employer} role={role} />
            ))}
          </Section>

          <Section label="Earlier">
            {earlier.map((item) => (
              <div key={item.employer} className={styles.row}>
                <div className={styles.entryHead}>
                  <p className={styles.rowTitle}>
                    <span className={styles.rowName}>{item.title}</span>
                    {SEP}
                    {item.employer}
                  </p>
                  <span className={styles.dates}>{item.dates}</span>
                </div>
                <p className={styles.rowNote}>{item.note}</p>
              </div>
            ))}
          </Section>

          <Section label="Education">
            <div className={styles.eduBlock}>
              <div className={styles.entryHead}>
                <h3 className={styles.entryTitle}>{education.course}</h3>
                <span className={styles.dates}>{education.dates}</span>
              </div>
              <p className={styles.meta}>
                <span className={styles.employer}>{education.school}</span>
                {SEP}
                {education.location}
              </p>
              <p className={styles.eduOriginal}>{education.original}</p>
            </div>
          </Section>

          <Section label="Beyond">
            <p className={styles.prose}>
              <Rich text={beyond} />
            </p>
          </Section>

          <footer className={styles.docFoot}>
            <span>
              {`${footer.text} `}
              <a className={styles.link} href={footer.site.href}>
                {footer.site.label}
              </a>
            </span>
            <span>{footer.updated}</span>
          </footer>
        </div>
      </main>
    </div>
  )
}
