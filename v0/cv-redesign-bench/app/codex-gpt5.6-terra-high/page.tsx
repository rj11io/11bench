"use client"

import { cv } from "./content"
import styles from "./page.module.css"

function ExternalLink({ href, children, label }: { href: string; children: React.ReactNode; label?: string }) {
  return <a href={href} target="_blank" rel="noreferrer" aria-label={label}>{children}</a>
}

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Curriculum vitae · 2026</p>
        <h1>{cv.identity.name}</h1>
        <p className={styles.role}>{cv.identity.title}</p>
      </div>
      <address className={styles.contact}>
        <span>{cv.identity.location}</span>
        <a href={`mailto:${cv.identity.email}`}>{cv.identity.email}</a>
        <ExternalLink href={`https://${cv.identity.website}`}>{cv.identity.website}</ExternalLink>
        <ExternalLink href={`https://${cv.identity.github}`}>GitHub</ExternalLink>
        <ExternalLink href={`https://${cv.identity.linkedin}`}>LinkedIn</ExternalLink>
      </address>
    </header>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>
}

function Role({ role }: { role: (typeof cv.roles)[number] }) {
  return (
    <article className={styles.roleItem}>
      <div className={styles.roleMeta}>
        <span>{role.date}</span>
        <span>{role.context}</span>
      </div>
      <div>
        <h3>{role.title}</h3>
        <p className={styles.company}><ExternalLink href={`https://${role.url}`}>{role.company}</ExternalLink></p>
        <ul>{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      </div>
    </article>
  )
}

export default function Page() {
  return (
    <main className={styles.canvas}>
      <div className={styles.toolbar}>
        <span>Web CV / print-ready A4</span>
        <button type="button" onClick={() => window.print()} aria-label="Download CV as PDF">Download PDF <span aria-hidden="true">↗</span></button>
      </div>

      <section className={`${styles.sheet} ${styles.sheetOne}`} aria-label="CV page one">
        <Header />
        <div className={styles.ledeGrid}>
          <div>
            <SectionTitle>Profile</SectionTitle>
            <p className={styles.intro}>{cv.intro}</p>
          </div>
          <aside className={styles.focus} aria-label="Professional focus">
            <p className={styles.miniLabel}>Known for</p>
            {cv.focus.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}
          </aside>
        </div>
        <section className={styles.skills} aria-labelledby="skills-heading">
          <SectionTitle><span id="skills-heading">Capabilities</span></SectionTitle>
          <div className={styles.skillGrid}>
            {cv.skills.map((skill) => <div key={skill.label}><h3>{skill.label}</h3><p>{skill.items}</p></div>)}
          </div>
        </section>
        <section className={styles.experience} aria-labelledby="experience-heading">
          <SectionTitle><span id="experience-heading">Selected experience</span></SectionTitle>
          <Role role={cv.roles[0]} />
          <Role role={cv.roles[1]} />
        </section>
        <footer className={styles.pageFooter}><span>RJ / 01</span><span>AI product engineering · data-rich interfaces</span></footer>
      </section>

      <section className={`${styles.sheet} ${styles.sheetTwo}`} aria-label="CV page two">
        <Header />
        <section className={styles.experience} aria-labelledby="continued-heading">
          <SectionTitle><span id="continued-heading">Selected experience <em>continued</em></span></SectionTitle>
          {cv.roles.slice(2).map((role) => <Role key={`${role.company}-${role.date}`} role={role} />)}
        </section>
        <div className={styles.lowerGrid}>
          <section aria-labelledby="earlier-heading">
            <SectionTitle><span id="earlier-heading">Earlier experience</span></SectionTitle>
            <div className={styles.earlierList}>
              {cv.earlier.map((item) => <article key={`${item.company}-${item.date}`}><p>{item.date}</p><div><h3>{item.role} · {item.company}</h3><p>{item.note}</p></div></article>)}
            </div>
          </section>
          <div className={styles.sideStack}>
            <section aria-labelledby="projects-heading">
              <SectionTitle><span id="projects-heading">Independent work</span></SectionTitle>
              {cv.projects.map((project) => <div className={styles.project} key={project.name}><ExternalLink href={project.url}>{project.name}</ExternalLink><p>{project.detail}</p></div>)}
            </section>
            <section className={styles.education} aria-labelledby="education-heading">
              <SectionTitle><span id="education-heading">Education</span></SectionTitle>
              <h3>{cv.education.title}</h3><p>{cv.education.school} · {cv.education.date}</p><p>{cv.education.detail}</p>
            </section>
          </div>
        </div>
        <aside className={styles.note}><span>Origin story</span><p>{cv.note}</p></aside>
        <footer className={styles.pageFooter}><span>RJ / 02</span><span><ExternalLink href={`https://${cv.identity.cv}`}>{cv.identity.cv}</ExternalLink></span></footer>
      </section>
    </main>
  )
}
