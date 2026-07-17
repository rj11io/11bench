import {
  about,
  contactLinks,
  earlierExperience,
  education,
  experience,
  origin,
  person,
  projects,
  skills,
  type EarlierEntry,
  type ExperienceEntry,
} from "../content"
import styles from "./print-cv.module.css"

function Label({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.label}>{children}</h2>
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className={styles.bullets}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function Role({ role }: { role: ExperienceEntry }) {
  return (
    <article className={styles.role}>
      <div className={styles.roleHead}>
        <h3 className={styles.roleTitle}>{role.title}</h3>
        <span className={styles.roleDates}>{role.period}</span>
      </div>
      <p className={styles.roleCompany}>
        {role.company}
        {role.companyLink ? (
          <>
            {" · "}
            <a className={styles.link} href={role.companyLink.href}>
              {role.companyLink.label}
            </a>
          </>
        ) : null}
        {role.meta ? ` · ${role.meta}` : ""}
      </p>
      <Bullets items={role.bullets} />
    </article>
  )
}

function EarlierRole({ role }: { role: EarlierEntry }) {
  return (
    <li className={styles.earlierRow}>
      <span>
        <span className={styles.earlierTitle}>{role.title}</span>
        <span className={styles.earlierMeta}>
          {" "}
          · {role.company} — {role.note}
        </span>
      </span>
      <span className={styles.earlierDates}>{role.period}</span>
    </li>
  )
}

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.avoidBreak}>
        <Label>Skills</Label>
        <dl className={styles.skillList}>
          {skills.map((group) => (
            <div key={group.category} className={styles.skillGroup}>
              <dt className={styles.skillCategory}>{group.category}</dt>
              <dd className={styles.skillItems}>{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.avoidBreak}>
        <Label>Projects</Label>
        <ul className={styles.projectList}>
          {projects.map((proj) => (
            <li key={proj.name}>
              <div className={styles.projectHead}>
                <span className={styles.projectName}>{proj.name}</span>
                <a className={styles.link} href={proj.link.href}>
                  {proj.link.label}
                </a>
              </div>
              <p className={styles.projectDesc}>{proj.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.avoidBreak}>
        <Label>Education</Label>
        <p className={styles.eduProgram}>{education.program}</p>
        <p className={styles.eduSchool}>
          {education.school} · {education.location}
        </p>
        <p className={styles.eduPeriod}>{education.period}</p>
      </div>
    </aside>
  )
}

export function PrintCV() {
  const [role1, role2, role3, role4, role5] = experience

  return (
    <div className={styles.printRoot} aria-hidden="true">
      {/* Page 1 */}
      <section className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headTop}>
            <div>
              <h1 className={styles.name}>
                {person.name}
                <span className={styles.nickname}> &ldquo;{person.nickname}&rdquo;</span>
              </h1>
              <p className={styles.title}>{person.title}</p>
            </div>
            <p className={styles.origin}>{origin}</p>
          </div>
          <div className={styles.contactRow}>
            <span>{person.location}</span>
            {contactLinks.map((link) => (
              <a key={link.href} className={styles.link} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </header>

        <div className={styles.grid}>
          <Sidebar />
          <div className={styles.main}>
            <div className={styles.avoidBreak}>
              <Label>About</Label>
              <p className={styles.about}>{about}</p>
            </div>
            <div className={styles.experienceBlock}>
              <Label>Experience</Label>
              <div className={styles.avoidBreak}>
                <Role role={role1} />
              </div>
              <div className={styles.avoidBreak}>
                <Role role={role2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page 2 */}
      <section className={styles.page}>
        <div className={styles.runningHead}>
          <span>{person.name}</span>
          <span>Page 2 of 2</span>
        </div>

        <div className={styles.grid}>
          <aside className={styles.sidebar}>
            <div className={styles.rule} aria-hidden="true" />
          </aside>
          <div className={styles.main}>
            <div className={styles.experienceBlock}>
              <div className={styles.avoidBreak}>
                <Role role={role3} />
              </div>
              <div className={styles.avoidBreak}>
                <Role role={role4} />
              </div>
              <div className={styles.avoidBreak}>
                <Role role={role5} />
              </div>
            </div>

            <div className={styles.avoidBreak}>
              <Label>Earlier experience</Label>
              <ul className={styles.earlierList}>
                {earlierExperience.map((role) => (
                  <EarlierRole key={`${role.title}-${role.period}`} role={role} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
