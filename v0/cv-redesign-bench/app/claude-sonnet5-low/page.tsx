import {
  about,
  earlier,
  education,
  experience,
  funFacts,
  identity,
  projects,
  skills,
} from "./data"
import { PrintButton } from "./PrintButton"
import styles from "./print.module.css"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={`${styles.sectionHeading} mb-2 font-serif text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400`}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </h2>
  )
}

export default function Page() {
  return (
    <main
      className={`${styles.page} mx-auto min-h-screen w-full max-w-[900px] px-5 py-10 sm:px-8 md:px-10`}
    >
      <PrintButton />

      {/* Identity header */}
      <header className="mb-8 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <h1
          className={`${styles.name} break-words text-3xl font-bold tracking-tight sm:text-4xl`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {identity.name}
        </h1>
        <p className="mt-1 text-base text-neutral-600 dark:text-neutral-300">
          {identity.title}
        </p>
        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-neutral-500 dark:text-neutral-400">
          <span>{identity.location}</span>
          <span aria-hidden="true">·</span>
          <a className="hover:underline" href={`mailto:${identity.email}`}>
            {identity.email}
          </a>
          <span aria-hidden="true">·</span>
          <a
            className="hover:underline"
            href={`https://${identity.site}`}
            target="_blank"
            rel="noreferrer"
          >
            {identity.site}
          </a>
          <span aria-hidden="true">·</span>
          <a
            className="hover:underline"
            href={`https://${identity.github}`}
            target="_blank"
            rel="noreferrer"
          >
            {identity.github}
          </a>
          <span aria-hidden="true">·</span>
          <a
            className="hover:underline"
            href={`https://${identity.linkedin}`}
            target="_blank"
            rel="noreferrer"
          >
            {identity.linkedin}
          </a>
        </p>
      </header>

      {/* Two-column layout on screen, single column in print */}
      <div className={`${styles.printGrid} grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]`}>
        {/* Left rail */}
        <aside className={`${styles.rail} space-y-7`}>
          <section className={styles.entry}>
            <SectionLabel>Skills</SectionLabel>
            <ul className="space-y-2 text-[13.5px] leading-snug">
              {skills.map((row) => (
                <li key={row.label}>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {row.label}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {" "}
                    — {row.items}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.entry}>
            <SectionLabel>Projects</SectionLabel>
            <ul className="space-y-2 text-[13.5px] leading-snug">
              {projects.map((p) => (
                <li key={p.name}>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {p.name}
                  </span>{" "}
                  <span className="text-neutral-500 dark:text-neutral-400">
                    ({p.years})
                  </span>
                  <br />
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {p.desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.entry}>
            <SectionLabel>Education</SectionLabel>
            <p className="text-[13.5px] leading-snug text-neutral-700 dark:text-neutral-300">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {education.program}
              </span>
              <br />
              {education.school}
              <br />
              <span className="text-neutral-500 dark:text-neutral-400">
                {education.years}
              </span>
            </p>
          </section>

          <section className={`${styles.entry} print:hidden`}>
            <SectionLabel>Fun facts</SectionLabel>
            <ul className="list-disc space-y-2 pl-4 text-[13.5px] leading-snug text-neutral-600 dark:text-neutral-400">
              {funFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Main column */}
        <div className="space-y-8">
          <section className={styles.entry}>
            <SectionLabel>About</SectionLabel>
            <p className="text-[14.5px] leading-relaxed text-neutral-700 dark:text-neutral-300">
              {about}
            </p>
          </section>

          <section>
            <SectionLabel>Experience</SectionLabel>
            <div className="space-y-5">
              {experience.map((job) => (
                <div key={`${job.title}-${job.org}`} className={styles.entry}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-[14.5px] font-semibold text-neutral-900 dark:text-neutral-100">
                      {job.title}
                    </h3>
                    <span className="text-[12px] text-neutral-500 dark:text-neutral-400">
                      {job.years}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-neutral-500 dark:text-neutral-400">
                    {job.org}
                  </p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[13.5px] leading-snug text-neutral-700 dark:text-neutral-300">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className={styles.entry}>
                <p className="text-[13px] leading-snug text-neutral-600 dark:text-neutral-400">
                  {earlier}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
