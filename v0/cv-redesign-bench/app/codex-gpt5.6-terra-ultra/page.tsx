import { DownloadPdfButton } from "./download-pdf-button"
import { cvContent, type ExperienceRole } from "./content"
import styles from "./cv.module.css"

function ExternalLink({
  href,
  children,
  className,
  label,
}: {
  href: string
  children: React.ReactNode
  className?: string
  label?: string
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

function RoleRecord({
  role,
  compact = false,
  brief = false,
}: {
  role: ExperienceRole
  compact?: boolean
  brief?: boolean
}) {
  const organization = role.organizationUrl ? (
    <ExternalLink href={role.organizationUrl} className={styles.organization}>
      {role.organization}
    </ExternalLink>
  ) : (
    <span className={styles.organization}>{role.organization}</span>
  )

  return (
    <article className={`${styles.roleRecord} ${compact ? styles.compactRole : ""}`}>
      <div className={styles.roleHeading}>
        <h3>{role.title}</h3>
        <time dateTime={role.startDate}>{role.dateLabel}</time>
      </div>
      <p className={styles.roleMeta}>
        {organization}
        {role.context?.map((item) => (
          <span key={item} className={styles.metaItem}>
            {item}
          </span>
        ))}
      </p>
      {!brief && (
        <ul className={styles.bulletList}>
          {role.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </article>
  )
}

function PageMarker({ current }: { current: string }) {
  return <p className={styles.pageMarker}>{current} / 02</p>
}

export default function Page() {
  const {
    identity,
    milestones,
    profile,
    projects,
    sectionLabels,
    sectionNotes,
    skills,
  } = cvContent
  const [binaryEdge, ...earlierRoles] = cvContent.experience.secondPage

  return (
    <main className={styles.shell}>
      <header className={`${styles.screenHeader} ${styles.screenOnly}`}>
        <div>
          <p className={styles.screenKicker}>{cvContent.documentLabel}</p>
          <p className={styles.screenIdentity}>
            {identity.name} <span>/</span> {identity.role}
          </p>
        </div>
        <DownloadPdfButton className={styles.downloadButton} />
      </header>

      <div className={styles.pageDeck}>
        <article className={`${styles.sheet} ${styles.firstSheet}`}>
          <PageMarker current="01" />
          <header className={styles.identityBlock}>
            <p className={styles.eyebrow}>{cvContent.documentLabel}</p>
            <h1>{identity.name}</h1>
            <p className={styles.roleLine}>{identity.role}</p>
            <div className={styles.contactLine} aria-label="Contact information">
              <span>{identity.location}</span>
              <ExternalLink
                href={`mailto:${identity.email}`}
                className={styles.contactLink}
                label={`Email ${identity.email}`}
              >
                {identity.email}
              </ExternalLink>
              {identity.contacts.map((contact) => (
                <ExternalLink
                  key={contact.href}
                  href={contact.href}
                  className={styles.contactLink}
                  label={`${contact.label}: ${contact.display}`}
                >
                  {contact.display}
                </ExternalLink>
              ))}
            </div>
          </header>

          <section className={styles.profileSection} aria-labelledby="profile-title">
            <h2 id="profile-title" className={styles.sectionLabel}>
              {sectionLabels.profile}
            </h2>
            <div className={styles.profileCopy}>
              {profile.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <ul className={styles.milestoneList} aria-label="Career milestones">
            {milestones.map((milestone) => (
              <li key={milestone.value}>
                <strong>{milestone.value}</strong>
                <span>{milestone.detail}</span>
              </li>
            ))}
          </ul>

          <section className={styles.experienceSection} aria-labelledby="experience-title">
            <div className={styles.sectionHeading}>
              <h2 id="experience-title" className={styles.sectionLabel}>
                {sectionLabels.experience}
              </h2>
              <p>{sectionNotes.recentExperience}</p>
            </div>
            <div className={styles.roleStack}>
              {cvContent.experience.firstPage.map((role) => (
                <RoleRecord key={`${role.title}-${role.startDate}`} role={role} />
              ))}
            </div>
          </section>
        </article>

        <article className={`${styles.sheet} ${styles.secondSheet}`}>
          <PageMarker current="02" />
          <section className={styles.earlierSection} aria-labelledby="earlier-title">
            <h2 id="earlier-title" className={styles.sectionLabel}>
              {sectionLabels.earlierExperience}
            </h2>
            <div className={styles.roleStack}>
              <RoleRecord role={binaryEdge} />
            </div>
            <div className={styles.earlierStack}>
              {earlierRoles.map((role) => (
                <RoleRecord
                  key={`${role.title}-${role.startDate}`}
                  role={role}
                  compact
                  brief={role.displayDetail === false}
                />
              ))}
            </div>
          </section>

          <section className={styles.projectsSection} aria-labelledby="work-title">
            <h2 id="work-title" className={styles.sectionLabel}>
              {sectionLabels.selectedWork}
            </h2>
            <ul className={styles.projectList}>
              {projects.map((project) => (
                <li key={project.name}>
                  <div>
                    <ExternalLink href={project.href} className={styles.projectName}>
                      {project.name}
                    </ExternalLink>
                    <p>{project.description}</p>
                  </div>
                  <span>{project.dateLabel}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.skillsSection} aria-labelledby="skills-title">
            <h2 id="skills-title" className={styles.sectionLabel}>
              {sectionLabels.skills}
            </h2>
            <dl className={styles.skillList}>
              {skills.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.educationSection} aria-labelledby="education-title">
            <h2 id="education-title" className={styles.sectionLabel}>
              {sectionLabels.education}
            </h2>
            <div className={styles.educationBody}>
              <div>
                <h3>{cvContent.education.program}</h3>
                <p>
                  {cvContent.education.school} · {cvContent.education.location}
                </p>
                <p>{cvContent.education.qualification}</p>
              </div>
              <time dateTime="2013">{cvContent.education.dateLabel}</time>
            </div>
          </section>
        </article>
      </div>
    </main>
  )
}
