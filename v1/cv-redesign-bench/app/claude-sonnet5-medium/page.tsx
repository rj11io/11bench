import { cn } from "@/lib/utils"

import { DownloadButton } from "./DownloadButton"
import {
  about,
  earlierRoles,
  education,
  experience,
  identity,
  projects,
  skillGroups,
} from "./content"
import styles from "./page.module.css"

function SectionRow({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "grid grid-cols-1 gap-x-5 gap-y-1 py-1 sm:grid-cols-[7rem_1fr]",
        className
      )}
    >
      <h2 className={cn(styles.eyebrow, "text-sm sm:pt-0.5")}>{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

function Rule() {
  return <div className="border-t" style={{ borderColor: "var(--rule)" }} />
}

export default function Page() {
  const PAGE_TWO_INDEX = 2 // OMEGA Systems — see content.md pagination note

  return (
    <main
      className={cn(
        styles.sheet,
        "mx-auto max-w-[880px] px-5 py-8 leading-snug sm:px-10 sm:py-10 print:max-w-none print:px-0 print:py-0"
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <h1
            className={cn(
              styles.serif,
              "text-3xl font-semibold tracking-tight sm:text-4xl"
            )}
          >
            {identity.name}
          </h1>
          <p
            className={cn(
              styles.serif,
              "mt-1 text-lg text-muted-foreground italic"
            )}
          >
            {identity.role}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            {identity.cvUrl}
          </span>
          <DownloadButton
            className={cn(
              styles.noPrint,
              "items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
            )}
          />
        </div>
      </header>

      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span>{identity.location}</span>
        <span aria-hidden>·</span>
        <a className="underline underline-offset-4" href={`mailto:${identity.email}`}>
          {identity.email}
        </a>
        <span aria-hidden>·</span>
        <a className="underline underline-offset-4" href={identity.site.href}>
          {identity.site.label}
        </a>
        <span aria-hidden>·</span>
        <a className="underline underline-offset-4" href={identity.github.href}>
          {identity.github.label}
        </a>
        <span aria-hidden>·</span>
        <a className="underline underline-offset-4" href={identity.linkedin.href}>
          {identity.linkedin.label}
        </a>
      </p>

      <div className="mt-4">
        <Rule />
      </div>

      <SectionRow label="About" className="border-b">
        <div className="space-y-1.5 text-[0.87rem] leading-snug">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </SectionRow>

      <SectionRow label="Skills" className="border-b">
        <dl className="space-y-1.5 text-[0.87rem]">
          {skillGroups.map((group) => (
            <div key={group.label} className="flex flex-wrap gap-x-2">
              <dt className="font-medium">{group.label}</dt>
              <dd className="text-muted-foreground">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </SectionRow>

      <SectionRow label="Projects" className="border-b">
        <ul className="space-y-1.5 text-[0.87rem]">
          {projects.map((project) => (
            <li key={project.name} className="flex flex-wrap gap-x-2">
              <span className="font-medium">{project.name}</span>
              <a
                className="underline underline-offset-4"
                href={project.href}
              >
                {project.label}
              </a>
              <span className="text-muted-foreground">
                · {project.description}
              </span>
            </li>
          ))}
        </ul>
      </SectionRow>

      <SectionRow label="Experience" className="border-b">
        <div className="space-y-3">
          {experience.map((entry, index) => (
            <article
              key={entry.role + entry.company}
              className={cn(
                styles.entry,
                index === PAGE_TWO_INDEX && styles.pageTwoStart
              )}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <h3 className={cn(styles.serif, "text-base font-semibold")}>
                  {entry.role}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {entry.dates}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {entry.companyUrl ? (
                  <a
                    className="underline underline-offset-4"
                    href={entry.companyUrl}
                  >
                    {entry.company}
                  </a>
                ) : (
                  entry.company
                )}
              </p>
              <ul className="mt-1 space-y-0.5 text-[0.88rem] leading-snug">
                {entry.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 32)} className="flex gap-1.5">
                    <span aria-hidden className="text-muted-foreground">
                      –
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <p className={cn(styles.entry, "text-sm text-muted-foreground")}>
            {earlierRoles}
          </p>
        </div>
      </SectionRow>

      <SectionRow label="Education">
        <div className={styles.entry}>
          <h3 className={cn(styles.serif, "text-base font-semibold")}>
            {education.program}
          </h3>
          <p className={cn(styles.serif, "text-sm italic text-muted-foreground")}>
            {education.localName}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {education.school} · {education.location} · {education.dates}
          </p>
        </div>
      </SectionRow>
    </main>
  )
}
