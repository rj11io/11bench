import { Fragment, type ReactNode } from "react"

import { DownloadButton } from "./DownloadButton"
import styles from "./cv.module.css"
import {
  contactLinks,
  earlier,
  education,
  experience,
  person,
  personality,
  projects,
  skillGroups,
  summary,
} from "./content"

function Section({
  number,
  label,
  id,
  children,
}: {
  number: string
  label: string
  id: string
  children: ReactNode
}) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className={styles.rail}>
        <span className={styles.railNum} aria-hidden>
          {number}
        </span>
        <h2 id={id} className={styles.railLabel}>
          {label}
        </h2>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  )
}

export default function Page() {
  return (
    <main className={styles.root}>
      <article className={styles.page}>
        {/* ---------- Header ---------- */}
        <header className={styles.header}>
          <div className={styles.identity}>
            <h1 className={styles.name}>
              {person.name}
              <span className={styles.nick}> ({person.nickname})</span>
            </h1>
            <p className={styles.title}>{person.title}</p>
            <p className={styles.locus}>
              {person.location} <span className={styles.dot}>·</span>{" "}
              {person.mode}
            </p>
          </div>

          <div className={styles.headerActions}>
            <DownloadButton />
          </div>

          <ul className={styles.contact}>
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.link}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  {link.display}
                </a>
              </li>
            ))}
          </ul>
        </header>

        {/* ---------- Summary ---------- */}
        <Section number="01" label="Summary" id="sec-summary">
          {summary.map((para, i) => (
            <p key={i} className={styles.para}>
              {para}
            </p>
          ))}
          <ul className={styles.personality}>
            {personality.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </Section>

        {/* ---------- Skills ---------- */}
        <Section number="02" label="Skills" id="sec-skills">
          <dl className={styles.skills}>
            {skillGroups.map((group) => (
              <div key={group.label} className={styles.skillRow}>
                <dt className={styles.skillLabel}>{group.label}</dt>
                <dd className={styles.skillItems}>
                  {group.items.map((item) => (
                    <span key={item} className={styles.tag}>
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ---------- Experience ---------- */}
        <Section number="03" label="Experience" id="sec-experience">
          <div className={styles.entries}>
            {experience.map((job, idx) => (
              <Fragment key={job.role + job.company}>
                <div className={styles.entry}>
                  <div className={styles.entryHead}>
                    <h3 className={styles.entryRole}>{job.role}</h3>
                    <span className={styles.entryPeriod}>{job.period}</span>
                  </div>
                  <p className={styles.entryOrg}>
                    {job.siteHref ? (
                      <a
                        href={job.siteHref}
                        className={styles.orgLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                    {job.meta ? (
                      <span className={styles.entryMeta}>
                        {" "}
                        <span className={styles.dot}>·</span> {job.meta}
                      </span>
                    ) : null}
                  </p>
                  <ul className={styles.bullets}>
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
                {/* Deliberate print boundary: page one ends after the two most
                    recent roles; older roles flow to page two. */}
                {idx === 1 ? (
                  <div className={styles.pageBreak} aria-hidden />
                ) : null}
              </Fragment>
            ))}

            <div className={styles.earlierBlock}>
              <p className={styles.earlierLabel}>Earlier</p>
              <ul className={styles.earlierList}>
                {earlier.map((job) => (
                  <li key={job.company} className={styles.earlierItem}>
                    <span className={styles.earlierRole}>{job.role}</span>
                    <span className={styles.earlierOrg}> — {job.company}</span>
                    <span className={styles.earlierPeriod}> · {job.period}</span>
                    <span className={styles.earlierSummary}>
                      {" "}
                      {job.summary}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ---------- Projects ---------- */}
        <Section number="04" label="Projects" id="sec-projects">
          <div className={styles.projects}>
            {projects.map((proj) => (
              <a
                key={proj.name}
                href={proj.href}
                className={styles.project}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.projectHead}>
                  <span className={styles.projectName}>{proj.name}</span>
                  <span className={styles.projectPeriod}>{proj.period}</span>
                </span>
                <span className={styles.projectDomain}>{proj.domain}</span>
                <span className={styles.projectDesc}>{proj.description}</span>
              </a>
            ))}
          </div>
        </Section>

        {/* ---------- Education ---------- */}
        <Section number="05" label="Education" id="sec-education">
          {education.map((edu) => (
            <div key={edu.program} className={styles.entry}>
              <div className={styles.entryHead}>
                <h3 className={styles.entryRole}>{edu.program}</h3>
                <span className={styles.entryPeriod}>{edu.period}</span>
              </div>
              <p className={styles.entryOrg}>
                {edu.school} <span className={styles.dot}>·</span> {edu.location}
              </p>
              {edu.note ? <p className={styles.eduNote}>{edu.note}</p> : null}
            </div>
          ))}
        </Section>

        <footer className={styles.footer}>
          <span>
            {person.name} · {person.title}
          </span>
          <span className={styles.footerLink}>cv.rj11.io</span>
        </footer>
      </article>
    </main>
  )
}
