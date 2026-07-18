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
} from "../content"
import styles from "../screen.module.css"
import { PrintButton } from "./print-button"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-serif-display)] text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
      {children}
    </h2>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[0.925rem] leading-relaxed text-foreground/90">
          <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ScreenCV() {
  return (
    <div className="print:hidden mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 lg:px-10">
      <header className="border-b border-border pb-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="font-[family-name:var(--font-serif-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
              {person.name}
              <span className="ml-3 align-middle font-mono text-base font-normal text-muted-foreground">
                &ldquo;{person.nickname}&rdquo;
              </span>
            </h1>
            <p className="mt-2 font-[family-name:var(--font-serif-display)] text-lg italic text-muted-foreground">
              {person.title}
            </p>
          </div>
          <PrintButton />
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {origin}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm">
          <span className="text-muted-foreground">{person.location}</span>
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <div className={`${styles.layout} mt-10 gap-y-10`}>
        <div className={`${styles.about} text-[0.975rem] leading-relaxed text-foreground/90`}>
          <SectionLabel>About</SectionLabel>
          <p className="mt-3 max-w-[62ch]">{about}</p>
        </div>

        <aside className={`${styles.sidebar} mt-10 flex flex-col gap-9 lg:mt-0`}>
          <div>
            <SectionLabel>Skills</SectionLabel>
            <dl className="mt-3 space-y-4">
              {skills.map((group) => (
                <div key={group.category}>
                  <dt className="text-xs font-semibold text-foreground/80">
                    {group.category}
                  </dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionLabel>Projects</SectionLabel>
            <ul className="mt-3 space-y-3">
              {projects.map((proj) => (
                <li key={proj.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <a
                      href={proj.link.href}
                      className="text-sm font-medium underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                    >
                      {proj.name}
                    </a>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {proj.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {proj.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel>Education</SectionLabel>
            <div className="mt-3">
              <p className="text-sm font-medium">{education.program}</p>
              <p className="text-xs text-muted-foreground">
                {education.school} · {education.location}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                {education.period}
              </p>
            </div>
          </div>
        </aside>

        <div className={`${styles.experience} mt-10 lg:mt-14`}>
          <SectionLabel>Experience</SectionLabel>
          <ol className="mt-3 space-y-9">
            {experience.map((role) => (
              <li key={`${role.title}-${role.period}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-[family-name:var(--font-serif-display)] text-lg font-semibold">
                    {role.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {role.period}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {role.companyLink ? (
                    <a
                      href={role.companyLink.href}
                      className="underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                    >
                      {role.company}
                    </a>
                  ) : (
                    role.company
                  )}
                  {role.meta ? ` · ${role.meta}` : null}
                </p>
                <Bullets items={role.bullets} />
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <SectionLabel>Earlier experience</SectionLabel>
            <ul className="mt-3 divide-y divide-border">
              {earlierExperience.map((role) => (
                <li
                  key={`${role.title}-${role.period}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2 text-sm"
                >
                  <span>
                    <span className="font-medium">{role.title}</span>
                    <span className="text-muted-foreground"> · {role.company}</span>
                    <span className="text-muted-foreground"> — {role.note}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {role.period}
                  </span>
                  <span className="sr-only">{role.location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <footer className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
        <p>
          {person.name} · {person.title} · updated for this run of{" "}
          cv-redesign-bench.
        </p>
      </footer>
    </div>
  )
}
