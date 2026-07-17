import { PrintButton } from './PrintButton'
import { cv } from './content'
import styles from './cv.module.css'

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) { return <a href={href} target="_blank" rel="noreferrer">{children}</a> }

export default function Page() {
  return <main className={styles.shell}>
    <div className={styles.utility}><span>Curriculum vitae · 2026</span><PrintButton /></div>
    <article className={styles.cv}>
      <section className={styles.sheet} aria-label="Page one">
        <header className={styles.header}>
          <p className={styles.kicker}>CV / 01 — LISBON, PORTUGAL</p>
          <div className={styles.nameRow}><h1>{cv.identity.name}</h1><p className={styles.role}>{cv.identity.role}</p></div>
          <div className={styles.contact}><a href={`mailto:${cv.identity.email}`}>{cv.identity.email}</a><span>{cv.identity.location}</span>{cv.identity.links.map((link) => <ExternalLink href={link.href} key={link.href}>{link.label}</ExternalLink>)}</div>
        </header>
        <div className={styles.rule} />
        <section className={styles.intro}><p className={styles.label}>Profile</p><p className={styles.summary}>{cv.summary}</p></section>
        <section className={styles.section}><div className={styles.sectionHead}><p className={styles.label}>Selected work</p><p>Independent & open source</p></div><div className={styles.projects}>{cv.projects.map((p) => <article key={p.name}><div><ExternalLink href={p.href}>{p.name}</ExternalLink><span>{p.dates}</span></div><p>{p.description}</p></article>)}</div></section>
        <section className={styles.section}><p className={styles.label}>Capabilities</p><dl className={styles.capabilities}>{cv.capabilities.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl></section>
        <section className={styles.section}><p className={styles.label}>Experience / now</p><Experience item={cv.experience[0]} /></section>
        <footer className={styles.footer}><span>Ricardo Jorge</span><span>Page 01 / 02</span></footer>
      </section>
      <section className={`${styles.sheet} ${styles.pageTwo}`} aria-label="Page two">
        <header className={styles.continued}><p className={styles.kicker}>CV / 02 — EXPERIENCE</p><p>Product engineering, data visualisation & team leadership</p></header>
        <section className={styles.experience}>{cv.experience.slice(1).map((item) => <Experience key={item.company} item={item} />)}</section>
        <section className={styles.earlier}><p className={styles.label}>Earlier experience</p>{cv.earlier.map(([role, company, dates, detail]) => <div key={company}><p><strong>{role}</strong> · {company}</p><time>{dates}</time><span>{detail}</span></div>)}</section>
        <div className={styles.closing}><section><p className={styles.label}>Education</p><p>{cv.education}</p></section><section><p className={styles.label}>Outside the brief</p><p>{cv.note}</p></section></div>
        <footer className={styles.footer}><span>ricardojorgexyz@gmail.com · rj11.io</span><span>Page 02 / 02</span></footer>
      </section>
    </article>
  </main>
}

function Experience({ item }: { item: (typeof cv.experience)[number] }) { return <article className={styles.job}><div className={styles.jobTop}><h2>{item.role}</h2><time>{item.dates}</time></div><div className={styles.company}><ExternalLink href={item.href}>{item.company}</ExternalLink><span>{item.meta}</span></div><p className={styles.lead}>{item.lead}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></article> }
