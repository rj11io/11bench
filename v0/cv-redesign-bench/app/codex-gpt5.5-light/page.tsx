import { PrintButton } from "./PrintButton"
import { cv } from "./content"

function Section({
  title,
  children,
  dense = false,
}: {
  title: string
  children: React.ReactNode
  dense?: boolean
}) {
  return (
    <section className={`cv-section ${dense ? "dense" : ""}`}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  )
}

export default function Page() {
  return (
    <main className="min-h-svh bg-[#ebe8df] text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 print:bg-white print:text-black">
      <div className="mx-auto flex w-full max-w-6xl justify-end px-5 pt-5 sm:px-8 print:hidden">
        <PrintButton />
      </div>

      <article className="cv-shell mx-auto my-5 w-full max-w-6xl bg-[#fbfaf6] shadow-2xl shadow-neutral-950/10 dark:bg-neutral-900 print:my-0 print:max-w-none print:bg-white print:shadow-none">
        <div className="cv-page first">
          <header className="cv-hero">
            <div>
              <p className="eyebrow">CV · {cv.location}</p>
              <h1>{cv.name}</h1>
              <p className="role">{cv.role}</p>
            </div>
            <address>
              {cv.contacts.map((contact) => (
                <a key={contact.href} href={contact.href}>
                  {contact.label}
                </a>
              ))}
            </address>
          </header>

          <Section title="Profile">
            <div className="summary">
              {cv.summary.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <ul className="strengths" aria-label="Core strengths">
              {cv.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="Skills" dense>
            <div className="skill-grid">
              {cv.skills.map((group) => (
                <p key={group.label}>
                  <strong>{group.label}</strong>
                  <span>{group.items.join(" · ")}</span>
                </p>
              ))}
            </div>
          </Section>

          <Section title="Projects" dense>
            <div className="projects">
              {cv.projects.map((project) => (
                <p key={project.name}>
                  <strong>{project.name}</strong>
                  <a href={project.url}>{project.label}</a>
                  <span>{project.description}</span>
                </p>
              ))}
            </div>
          </Section>

          <Section title="Experience">
            <div className="experience">
              {cv.experience.slice(0, 3).map((job) => (
                <article key={`${job.company}-${job.dates}`} className="job">
                  <div className="job-head">
                    <div>
                      <h3>{job.title}</h3>
                      <p>
                        <a href={job.url}>{job.company}</a> · {job.meta}
                      </p>
                    </div>
                    <time>{job.dates}</time>
                  </div>
                  <ul>
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>
        </div>

        <div className="cv-page second">
          <Section title="Experience">
            <div className="experience">
              {cv.experience.slice(3).map((job) => (
                <article key={`${job.company}-${job.dates}`} className="job">
                  <div className="job-head">
                    <div>
                      <h3>{job.title}</h3>
                      <p>
                        <a href={job.url}>{job.company}</a> · {job.meta}
                      </p>
                    </div>
                    <time>{job.dates}</time>
                  </div>
                  <ul>
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>

          <Section title="Earlier">
            <ul className="compact-list">
              {cv.earlier.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="Education" dense>
            <div className="education">
              <h3>{cv.education.title}</h3>
              <p>
                {cv.education.school} · {cv.education.location} · {cv.education.dates}
              </p>
              <p>{cv.education.credential}</p>
            </div>
          </Section>

          <Section title="Context" dense>
            <ul className="compact-list">
              {cv.additional.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        </div>
      </article>
    </main>
  )
}
