import type { ReactNode } from "react"

import {
  getCvContent,
  type CvContent,
  type RoleItem,
  type Section,
} from "./content"
import { PrintButton } from "./print-button"
import styles from "./resume.module.css"

function isHttpUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://")
}

function linkProps(href: string) {
  return isHttpUrl(href) ? { target: "_blank", rel: "noreferrer noopener" } : {}
}

function hostFromUrl(url: string) {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

function Trail({
  items,
}: {
  items: Array<{ label: string; href?: string }>
}) {
  return (
    <div className={styles.trail}>
      {items.map((item) =>
        item.href ? (
          <a
            key={`${item.label}-${item.href}`}
            className={`${styles.trailItem} ${styles.trailLink}`}
            href={item.href}
            {...linkProps(item.href)}
          >
            {item.label}
          </a>
        ) : (
          <span key={item.label} className={styles.trailItem}>
            {item.label}
          </span>
        )
      )}
    </div>
  )
}

function Hero({ content }: { content: CvContent }) {
  return (
    <header className={styles.hero}>
      <div className={styles.identity}>
        <h1 className={styles.name}>{content.identity.name}</h1>
        <p className={styles.headline}>{content.identity.headline}</p>
      </div>

      <a
        className={styles.portfolio}
        href={content.identity.portfolio.href}
        {...linkProps(content.identity.portfolio.href)}
      >
        {content.identity.portfolio.label}
      </a>

      <div className={styles.contactRow} aria-label="Contact details">
        <Trail
          items={[
            { label: content.identity.location },
            { label: content.identity.email.label, href: content.identity.email.href },
            ...content.identity.links,
          ]}
        />
      </div>
    </header>
  )
}

function SectionShell({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>{label}</div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

function getSheetColumns(page: CvContent["pages"][number]) {
  if (page.id === "page-1") {
    return [
      page.sections.filter((section) => section.kind !== "roles"),
      page.sections.filter((section) => section.kind === "roles"),
    ] as const
  }

  return [
    page.sections.slice(0, 1),
    page.sections.slice(1),
  ] as const
}

function renderSection(section: Section) {
  switch (section.kind) {
    case "summary":
      return (
        <SectionShell key={section.label} label={section.label}>
          <div className={styles.summaryBody}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </SectionShell>
      )
    case "skills":
      return (
        <SectionShell key={section.label} label={section.label}>
          <div className={styles.skillsList}>
            {section.groups.map((group) => (
              <div key={group.label} className={styles.skillGroup}>
                <div className={styles.skillLabel}>{group.label}</div>
                <p className={styles.skillItems}>{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      )
    case "projects":
      return (
        <SectionShell key={section.label} label={section.label}>
          <div className={styles.projectList}>
            {section.items.map((project) => (
              <article key={project.name} className={styles.project}>
                <div className={styles.projectCopy}>
                  <div className={styles.projectTop}>
                    <span className={styles.projectName}>
                      <a
                        href={project.url}
                        {...linkProps(project.url)}
                      >
                        {project.name}
                      </a>
                    </span>
                    <a
                      className={styles.projectUrl}
                      href={project.url}
                      {...linkProps(project.url)}
                    >
                      {hostFromUrl(project.url)}
                    </a>
                  </div>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
                <div className={styles.projectDate}>{project.meta}</div>
              </article>
            ))}
          </div>
        </SectionShell>
      )
    case "roles":
      return (
        <SectionShell key={section.label} label={section.label}>
          <div className={styles.rolesList}>
            {section.items.map((role) => (
              <RoleCard key={`${role.title}-${role.company}-${role.dates}`} role={role} />
            ))}
          </div>
        </SectionShell>
      )
    case "compactRoles":
      return (
        <SectionShell key={section.label} label={section.label}>
          <div className={styles.compactList}>
            {section.items.map((role) => (
              <CompactRoleCard
                key={`${role.title}-${role.company}-${role.dates}`}
                role={role}
              />
            ))}
          </div>
        </SectionShell>
      )
    case "education":
      return (
        <SectionShell key={section.label} label={section.label}>
          <div className={styles.educationList}>
            {section.items.map((item) => (
              <article
                key={`${item.title}-${item.school}-${item.dates}`}
                className={styles.educationItem}
              >
                <div className={styles.educationTop}>
                  <h3 className={styles.educationTitle}>{item.title}</h3>
                  <div className={styles.educationDates}>{item.dates}</div>
                </div>
                <div className={styles.educationMeta}>
                  <span>{item.school}</span>
                  <span>{item.location}</span>
                </div>
                <div className={styles.educationDetail}>{item.detail}</div>
              </article>
            ))}
          </div>
        </SectionShell>
      )
  }
}

function RoleCard({ role }: { role: RoleItem }) {
  return (
    <article className={styles.role}>
      <div className={styles.roleTop}>
        <h3 className={styles.roleTitle}>{role.title}</h3>
        <div className={styles.roleDates}>{role.dates}</div>
      </div>
      <Trail
        items={[
          { label: role.company },
          ...(role.site && role.siteUrl ? [{ label: role.site, href: role.siteUrl }] : []),
          ...role.meta.map((item) => ({ label: item })),
        ]}
      />
      <p className={styles.roleSummary}>{role.summary}</p>
      {role.highlights?.length ? (
        <ul className={styles.bullets}>
          {role.highlights.map((highlight) => (
            <li key={highlight} className={styles.bulletItem}>
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

function CompactRoleCard({ role }: { role: RoleItem }) {
  return (
    <article className={styles.compactRole}>
      <div className={styles.compactTop}>
        <h3 className={styles.compactTitle}>{role.title}</h3>
        <div className={styles.roleDates}>{role.dates}</div>
      </div>
      <Trail
        items={[
          { label: role.company },
          ...(role.site && role.siteUrl ? [{ label: role.site, href: role.siteUrl }] : []),
          ...role.meta.map((item) => ({ label: item })),
        ]}
      />
      <p className={styles.compactSummary}>{role.summary}</p>
    </article>
  )
}

export default function Page() {
  const content = getCvContent()

  return (
    <main className={styles.shell}>
      <div className={styles.topbar}>
        <PrintButton />
      </div>

      <div className={styles.decor} aria-hidden="true">
        <div className={styles.decorOrbA} />
        <div className={styles.decorOrbB} />
      </div>

      <div className={styles.pages}>
        {content.pages.map((page, index) => (
          <article
            key={page.id}
            className={[
              styles.sheet,
              index === 1 ? styles.sheetDense : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {index === 0 ? <Hero content={content} /> : null}
            <div className={styles.pageLayout}>
              {getSheetColumns(page).map((columnSections, columnIndex) => (
                <div key={`${page.id}-column-${columnIndex}`} className={styles.pageColumn}>
                  {columnSections.map((section) => renderSection(section))}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
