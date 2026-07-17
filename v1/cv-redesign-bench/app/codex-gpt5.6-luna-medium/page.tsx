import styles from "./styles.module.css"
import { PrintButton } from "./PrintButton"
import { cv } from "./content"

function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className={styles.section}><h2>{title}</h2>{children}</section> }
function Job({ job }: { job: (typeof cv.experience)[number] }) { return <article className={styles.job}><div className={styles.jobHead}><div><h3>{job.title}</h3><p className={styles.company}>{job.url ? <a href={job.url}>{job.company}</a> : job.company}<span> · {job.meta}</span></p></div><time>{job.dates}</time></div><ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article> }

export default function Page() {
  return <main className={styles.canvas}>
    <div className={styles.toolbar}><span>CV / {cv.shortName}</span><PrintButton /></div>
    <div className={styles.cv}>
      <div className={styles.sheet}>
        <header className={styles.header}><div><p className={styles.kicker}>PRODUCT ENGINEERING / AI SYSTEMS</p><h1>{cv.name}</h1><p className={styles.role}>{cv.role}</p></div><div className={styles.contact}><p>{cv.location}</p><a href={`mailto:${cv.email}`}>{cv.email}</a>{cv.contacts.map((contact) => <a key={contact.label} href={contact.href}>{contact.label}</a>)}</div></header>
        <div className={styles.rule} />
        <div className={styles.introGrid}><Section title="Profile"><p className={styles.lede}>{cv.summary}</p></Section><Section title="Focus"><ul className={styles.focus}>{cv.focus.map((item) => <li key={item}>{item}</li>)}</ul></Section></div>
        <Section title="Selected work"><div className={styles.projectGrid}>{cv.projects.map((project) => <a className={styles.project} href={project.href} key={project.name}><strong>{project.name}</strong><span>{project.detail}</span><em>↗</em></a>)}</div></Section>
        <Section title="Experience"><div className={styles.jobs}>{cv.experience.slice(0, 3).map((job) => <Job job={job} key={job.company} />)}</div></Section>
        <footer className={styles.footer}><span>01 / 02</span><span>Ricardo Jorge · AI Product Engineer</span></footer>
      </div>
      <div className={`${styles.sheet} ${styles.secondSheet}`}>
        <div className={styles.pageLead}><p className={styles.kicker}>EXPERIENCE / CONTINUED</p><p className={styles.pageNote}>Building the systems around the product: interfaces, data, delivery, and the team that keeps them moving.</p></div>
        <Section title="Experience"><div className={styles.jobs}>{cv.experience.slice(3).map((job) => <Job job={job} key={job.company} />)}</div></Section>
        <Section title="Earlier experience"><div className={styles.earlier}>{cv.earlier.map((job) => <article key={job.company}><div><h3>{job.title}</h3><p className={styles.company}>{job.company}</p></div><time>{job.dates}</time><p>{job.detail}</p></article>)}</div></Section>
        <div className={styles.twoCol}><Section title="Skills"><div className={styles.skillList}>{cv.skills.map((skill) => <div key={skill.label}><h3>{skill.label}</h3><p>{skill.items}</p></div>)}</div></Section><Section title="Education"><article className={styles.edu}><h3>{cv.education.title}</h3><p>{cv.education.school}</p><p>{cv.education.credential}</p><time>{cv.education.dates}</time></article><div className={styles.facts}><h3>Beyond the screen</h3>{cv.facts.map((fact) => <p key={fact}>{fact}</p>)}</div></Section></div>
        <footer className={styles.footer}><span>02 / 02</span><span>cv.rj11.io</span></footer>
      </div>
    </div>
  </main>
}
