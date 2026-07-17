import type { ReactNode } from "react"

import { PrintButton } from "./PrintButton"
import {
  about,
  earlierRoles,
  education,
  experience,
  funFacts,
  identity,
  projects,
  skills,
} from "./content"
import "./print.module.css"

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase print:text-[8.5pt] print:text-black print:tracking-[0.1em]">
      {children}
    </h2>
  )
}

function Row({
  label,
  children,
  className = "",
}: {
  label: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[8rem_1fr] print:grid-cols-[6rem_1fr] print:gap-x-4 ${className}`}
    >
      <div className="pt-0.5">{label}</div>
      <div>{children}</div>
    </div>
  )
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-words text-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:decoration-foreground print:text-black print:decoration-black"
    >
      {children}
    </a>
  )
}

export default function Page() {
  return (
    <main className="min-h-svh bg-background px-5 py-10 text-foreground sm:px-8 sm:py-14 print:min-h-0 print:bg-white print:px-0 print:py-0 print:text-black">
      <div className="mx-auto w-full max-w-3xl print:max-w-none">
        {/* Header */}
        <header className="flex flex-col gap-4 pb-6 print:break-inside-avoid print:pb-3">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1
                className="text-[2.5rem] leading-none font-medium tracking-tight sm:text-[3.1rem] print:text-[26pt]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {identity.name}
              </h1>
              <p
                className="mt-1.5 text-lg text-muted-foreground italic sm:text-xl print:text-[12pt] print:text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {identity.title}
              </p>
            </div>
            <div className="print:hidden">
              <PrintButton />
            </div>
          </div>

          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[12.5px] text-muted-foreground print:text-[8.5pt] print:text-black">
            <span>{identity.location}</span>
            <span aria-hidden="true">·</span>
            <ExternalLink href={`mailto:${identity.email}`}>
              {identity.email}
            </ExternalLink>
            {identity.links.map((link) => (
              <span key={link.href} className="flex items-center gap-2.5">
                <span aria-hidden="true">·</span>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </span>
            ))}
          </p>
        </header>

        <hr className="border-border print:border-black/40" />

        {/* About */}
        <section className="py-6 print:break-inside-avoid print:py-3">
          <Row label={<SectionLabel>About</SectionLabel>}>
            <div className="max-w-[68ch] space-y-3 text-[14px] leading-[1.6] text-foreground/90 print:space-y-1.5 print:text-[9.5pt] print:leading-[1.4] print:text-black">
              {about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <p className="text-[13px] text-muted-foreground italic print:text-[9pt] print:text-black/70">
                {funFacts}
              </p>
            </div>
          </Row>
        </section>

        <hr className="border-border print:border-black/40" />

        {/* Skills */}
        <section className="py-6 print:break-inside-avoid print:py-3">
          <Row label={<SectionLabel>Skills</SectionLabel>}>
            <dl className="grid max-w-[68ch] grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-[9rem_1fr] print:grid-cols-[6.5rem_1fr] print:gap-y-1.5">
              {skills.map((group) => (
                <div key={group.category} className="contents">
                  <dt className="pt-px text-[13px] font-semibold text-foreground print:text-[9pt] print:text-black">
                    {group.category}
                  </dt>
                  <dd className="text-[13.5px] leading-[1.55] text-foreground/90 print:text-[9pt] print:leading-[1.35] print:text-black">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Row>
        </section>

        <hr className="border-border print:border-black/40" />

        {/* Experience */}
        <section className="py-6 print:py-3">
          <Row label={<SectionLabel>Experience</SectionLabel>}>
            <div className="space-y-6 print:space-y-3">
              {experience.map((entry) => (
                <article
                  key={`${entry.company}-${entry.dates}`}
                  className={`space-y-1.5 print:break-inside-avoid ${
                    entry.printBreakBefore ? "print:break-before-page" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <h3 className="text-[15px] font-semibold text-foreground print:text-[10pt] print:text-black">
                      {entry.role}
                    </h3>
                    <span className="font-mono text-[12px] whitespace-nowrap text-muted-foreground print:text-[8.5pt] print:text-black">
                      {entry.dates}
                    </span>
                  </div>
                  <p className="text-[13px] text-muted-foreground print:text-[9pt] print:text-black/80">
                    {entry.companyHref ? (
                      <ExternalLink href={entry.companyHref}>
                        {entry.company}
                      </ExternalLink>
                    ) : (
                      entry.company
                    )}
                  </p>
                  <ul className="max-w-[68ch] list-none space-y-1 text-[13.5px] leading-[1.55] text-foreground/90 print:space-y-0.5 print:text-[9pt] print:leading-[1.35] print:text-black">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 32)} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="text-muted-foreground print:text-black/50"
                        >
                          –
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}

              <p className="max-w-[68ch] border-t border-border pt-3 text-[12.5px] leading-[1.5] text-muted-foreground print:break-inside-avoid print:border-black/30 print:pt-1.5 print:text-[8.5pt] print:text-black/80">
                <span className="font-semibold text-foreground print:text-black">
                  Earlier —{" "}
                </span>
                {earlierRoles}
              </p>
            </div>
          </Row>
        </section>

        <hr className="border-border print:border-black/40" />

        {/* Projects */}
        <section className="py-6 print:break-inside-avoid print:py-3">
          <Row label={<SectionLabel>Projects</SectionLabel>}>
            <div className="max-w-[68ch] space-y-2.5 print:space-y-1.5">
              {projects.map((project) => (
                <div
                  key={project.href}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
                >
                  <p className="text-[13.5px] leading-[1.5] print:text-[9pt] print:text-black">
                    <span className="font-semibold text-foreground print:text-black">
                      {project.name}
                    </span>{" "}
                    <ExternalLink href={project.href}>
                      {project.href.replace("https://", "")}
                    </ExternalLink>{" "}
                    <span className="text-muted-foreground print:text-black/80">
                      · {project.description}
                    </span>
                  </p>
                  <span className="font-mono text-[12px] whitespace-nowrap text-muted-foreground print:text-[8.5pt] print:text-black">
                    {project.dates}
                  </span>
                </div>
              ))}
            </div>
          </Row>
        </section>

        <hr className="border-border print:border-black/40" />

        {/* Education */}
        <section className="py-6 print:break-inside-avoid print:pt-3 print:pb-0">
          <Row label={<SectionLabel>Education</SectionLabel>}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <div>
                <p className="text-[13.5px] font-semibold text-foreground print:text-[9pt] print:text-black">
                  {education.program}
                </p>
                <p className="text-[13px] text-muted-foreground print:text-[8.5pt] print:text-black/80">
                  {education.credential} · {education.school} ·{" "}
                  {education.location}
                </p>
              </div>
              <span className="font-mono text-[12px] whitespace-nowrap text-muted-foreground print:text-[8.5pt] print:text-black">
                {education.dates}
              </span>
            </div>
          </Row>
        </section>
      </div>
    </main>
  )
}
