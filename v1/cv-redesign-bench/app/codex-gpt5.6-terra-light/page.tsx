"use client";

import { cv } from "./content";
import styles from "./cv.module.css";

function Section({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return <section className={styles.section}><h2>{title}</h2>{children}</section>;
}

export default function Page() {
  return <main className={styles.shell}>
    <button className={styles.printButton} onClick={() => window.print()} type="button">Download PDF <span aria-hidden="true">↗</span></button>
    <article className={styles.resume}>
      <div className={styles.pageOne}>
        <header className={styles.header}>
          <div><p className={styles.kicker}>Curriculum Vitae / 2026</p><h1>{cv.name}</h1><p className={styles.role}>{cv.role}</p></div>
          <address><span>{cv.location}</span><a href={`mailto:${cv.email}`}>{cv.email}</a>{cv.links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</address>
        </header>
        <div className={styles.introGrid}>
          <Section title="Profile"><p className={styles.summary}>{cv.summary}</p><p className={styles.note}>A first frontend hire on many projects: architecture, tooling, component libraries, delivery pipelines, and the teams that sustain them.</p></Section>
          <Section title="Core practice"><ul className={styles.strengths}>{cv.strengths.map((item) => <li key={item}>{item}</li>)}</ul></Section>
        </div>
        <Section title="Selected experience"><div className={styles.jobs}>{cv.experience.slice(0, 3).map((job) => <Job key={job.company} {...job} />)}</div></Section>
      </div>
      <div className={styles.pageTwo}>
        <Section title="Selected experience / continued"><div className={styles.jobs}>{cv.experience.slice(3).map((job) => <Job key={job.company} {...job} />)}</div></Section>
        <Section title="Earlier foundations"><p className={styles.earlier}>{cv.earlier}</p></Section>
        <div className={styles.bottomGrid}>
          <Section title="Independent work"><div className={styles.projects}>{cv.projects.map(([name, href, description]) => <p key={name}><a href={href}>{name}</a><span>{description}</span></p>)}</div></Section>
          <Section title="Education"><p className={styles.education}>{cv.education}</p><p className={styles.fun}>Outside work: placed second nationally and reached the final four at the 2008 robotics world cup in China with LEGO Mindstorms.</p></Section>
        </div>
        <footer><span>ricardojorge · {cv.role}</span><span>cv.rj11.io</span></footer>
      </div>
    </article>
  </main>;
}

function Job({ role, company, url, dates, bullets }: (typeof cv.experience)[number]) {
  return <article className={styles.job}><div className={styles.jobHead}><div><h3>{role}</h3><a href={url}>{company}</a></div><time>{dates}</time></div><ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>;
}
