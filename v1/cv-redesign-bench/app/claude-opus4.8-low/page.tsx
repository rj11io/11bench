"use client"

import { Fragment } from "react"

import styles from "./cv.module.css"
import {
  about,
  earlier,
  education,
  experience,
  funFacts,
  profile,
  projects,
  skills,
} from "./content"

function Section({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.content}>{children}</div>
    </section>
  )
}

export default function Page() {
  return (
    <main className={styles.page}>
      <div className={styles.sheet}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.print}
            onClick={() => window.print()}
          >
            Download PDF
          </button>
        </div>

        <header className={styles.header}>
          <div className={styles.nameRow}>
            <div className={styles.nameGroup}>
              <h1 className={styles.name}>{profile.name}</h1>
              <span className={styles.role}>{profile.title}</span>
            </div>
            <span className={styles.cvmark}>cv.rj11.io</span>
          </div>
          <div className={styles.contactLine}>
            <span>{profile.location}</span>
            <span className={styles.dot}>·</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {profile.contacts.map((c) => (
              <Fragment key={c.href}>
                <span className={styles.dot}>·</span>
                <a href={c.href} target="_blank" rel="noreferrer">
                  {c.label}
                </a>
              </Fragment>
            ))}
          </div>
        </header>

        <Section label="About">
          <div className={styles.about}>
            {about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        <Section label="Fun Facts">
          <ul className={styles.facts}>
            {funFacts.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </Section>

        <Section label="Skills">
          {skills.map((group) => (
            <div key={group.label} className={styles.skillRow}>
              <div className={styles.skillName}>{group.label}</div>
              <div className={styles.skillItems}>
                {group.items.map((item, i) => (
                  <Fragment key={item}>
                    {i > 0 && <span className={styles.sep}>·</span>}
                    {item}
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </Section>

        <Section label="Projects">
          {projects.map((p) => (
            <div key={p.name} className={styles.project}>
              <span className={styles.projName}>{p.name}</span>
              <a
                className={styles.projLink}
                href={p.href}
                target="_blank"
                rel="noreferrer"
              >
                {p.label}
              </a>
              <span className={styles.projBlurb}>{p.blurb}</span>
              <span className={styles.projPeriod}>{p.period}</span>
            </div>
          ))}
        </Section>

        <Section label="Experience" className={styles.pageBreak}>
          {experience.map((role) => (
            <article key={role.title + role.period} className={styles.role}>
              <div className={styles.roleHead}>
                <span className={styles.roleTitle}>{role.title}</span>
                <span className={styles.rolePeriod}>{role.period}</span>
              </div>
              <div className={styles.roleOrg}>
                {role.org}
                {role.link && (
                  <>
                    {" · "}
                    <a href={role.link.href} target="_blank" rel="noreferrer">
                      {role.link.label}
                    </a>
                  </>
                )}
                {role.meta ? ` · ${role.meta}` : ""}
              </div>
              <ul className={styles.bullets}>
                {role.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
          <p className={styles.earlier}>
            <b>Earlier — </b>
            {earlier}
          </p>
        </Section>

        <Section label="Education">
          <div className={styles.roleHead}>
            <span className={styles.eduTitle}>{education.title}</span>
            <span className={styles.eduPeriod}>{education.period}</span>
          </div>
          <div className={styles.eduMeta}>{education.school}</div>
          <div className={styles.eduNote}>{education.note}</div>
        </Section>
      </div>
    </main>
  )
}
