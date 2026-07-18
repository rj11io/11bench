'use client';

import styles from './cv.module.css';
import { cvData } from './cv-data';

export default function CV() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className={styles.cvContainer}>
        {/* Download PDF Button */}
        <button
          onClick={handlePrint}
          className={`${styles.downloadButton} bg-blue-900 dark:bg-sky-400 dark:text-slate-950 text-white`}
        >
          Download PDF
        </button>

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.nameTitle}>
            <h1 className={`${styles.name} text-slate-900 dark:text-slate-100`}>{cvData.contact.name}</h1>
            <p className={`${styles.title} text-slate-600 dark:text-slate-400`}>{cvData.contact.title}</p>
          </div>

          <div className={`${styles.contact} text-slate-700 dark:text-slate-300`}>
            <div className={styles.contactItem}>{cvData.contact.location}</div>
            <div className={styles.contactSeparator}>·</div>
            <div className={styles.contactItem}>
              <a
                href={`mailto:${cvData.contact.email}`}
                className={`${styles.contactLink} text-blue-900 dark:text-sky-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:focus-visible:outline-sky-400`}
              >
                {cvData.contact.email}
              </a>
            </div>
            <div className={styles.contactSeparator}>·</div>
            <div className={styles.contactItem}>
              <a
                href={cvData.contact.websiteUrl}
                className={`${styles.contactLink} text-blue-900 dark:text-sky-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:focus-visible:outline-sky-400`}
              >
                {cvData.contact.website}
              </a>
            </div>
            <div className={styles.contactSeparator}>·</div>
            <div className={styles.contactItem}>
              <a
                href={cvData.contact.githubUrl}
                className={`${styles.contactLink} text-blue-900 dark:text-sky-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:focus-visible:outline-sky-400`}
              >
                {cvData.contact.github}
              </a>
            </div>
            <div className={styles.contactSeparator}>·</div>
            <div className={styles.contactItem}>
              <a
                href={cvData.contact.linkedinUrl}
                className={`${styles.contactLink} text-blue-900 dark:text-sky-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:focus-visible:outline-sky-400`}
              >
                {cvData.contact.linkedin}
              </a>
            </div>
          </div>
        </header>

        {/* About Me */}
        <section id="about" className={styles.section}>
          <h2 className={`${styles.sectionHeading} text-blue-900 dark:text-sky-400 border-slate-300 dark:border-slate-700`}>
            About Me
          </h2>
          <div className={`${styles.aboutText} text-slate-900 dark:text-slate-100`}>
            {cvData.about.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className={styles.section}>
          <h2 className={`${styles.sectionHeading} text-blue-900 dark:text-sky-400 border-slate-300 dark:border-slate-700`}>
            Skills
          </h2>
          <div className={styles.skillsGrid}>
            {cvData.skills.map((skillGroup, idx) => (
              <div key={idx} className={styles.skillCategory}>
                <span className={`${styles.skillCategoryLabel} text-blue-900 dark:text-sky-400`}>
                  {skillGroup.category}
                </span>
                <div className={`${styles.skillItems} text-slate-900 dark:text-slate-100`}>
                  {skillGroup.items.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className={`${styles.section} ${styles.projectsSection}`}>
          <h2 className={`${styles.sectionHeading} text-blue-900 dark:text-sky-400 border-slate-300 dark:border-slate-700`}>
            Projects
          </h2>
          <div className={styles.projectsList}>
            {cvData.projects.map((project, idx) => (
              <div key={idx} className={styles.projectItem}>
                <h3 className={`${styles.projectName} text-slate-900 dark:text-slate-100`}>
                  {project.name}
                  <a
                    href={project.url}
                    className={`${styles.projectLink} text-blue-900 dark:text-sky-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:focus-visible:outline-sky-400`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.displayUrl}
                  </a>
                </h3>
                <p className={`${styles.projectMeta} text-slate-600 dark:text-slate-400`}>{project.dateRange}</p>
                <p className={`${styles.projectDescription} text-slate-900 dark:text-slate-100`}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className={styles.section}>
          <h2 className={`${styles.sectionHeading} text-blue-900 dark:text-sky-400 border-slate-300 dark:border-slate-700`}>
            Experience
          </h2>
          {cvData.experience.map((role, idx) => (
            <div key={idx} className={styles.roleItem}>
              <div className={styles.roleHeader}>
                <h3 className={`${styles.roleTitle} text-blue-900 dark:text-sky-400`}>{role.role}</h3>
                <p className={`${styles.roleDate} text-slate-600 dark:text-slate-400`}>{role.dateRange}</p>
              </div>
              <p className={`${styles.roleMeta} text-slate-600 dark:text-slate-400`}>
                {role.companyUrl ? (
                  <a
                    href={role.companyUrl}
                    className={`${styles.roleLink} text-blue-900 dark:text-sky-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:focus-visible:outline-sky-400`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {role.company}
                  </a>
                ) : (
                  role.company
                )}
                {role.location && ` · ${role.location}`}
                {role.workMode && ` · ${role.workMode}`}
              </p>
              {role.description && (
                <p className={`${styles.roleDescription} text-slate-900 dark:text-slate-100`}>{role.description}</p>
              )}
              {role.bullets.length > 0 && (
                <ul className={`${styles.roleBullets} text-slate-900 dark:text-slate-100`}>
                  {role.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        {/* Education */}
        <section id="education" className={styles.section}>
          <h2 className={`${styles.sectionHeading} text-blue-900 dark:text-sky-400 border-slate-300 dark:border-slate-700`}>
            Education
          </h2>
          <div className={styles.educationContainer}>
            <p className={`${styles.educationDegree} text-slate-900 dark:text-slate-100`}>
              {cvData.education.degree}
            </p>
            <p className={`${styles.educationSchool} text-slate-900 dark:text-slate-100`}>
              {cvData.education.school}
            </p>
            <p className={`${styles.educationMeta} text-slate-600 dark:text-slate-400`}>
              {cvData.education.location} · {cvData.education.dateRange}
            </p>
            {cvData.education.localName && (
              <p className={`${styles.educationMeta} text-slate-600 dark:text-slate-400`}>
                {cvData.education.localName}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
