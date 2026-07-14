# Reference CV content

These Markdown files are the shared input for the parent
[GitHub README benchmark](../../README.md). They mirror the CV content used by
`v1/cv-design-bench` so candidates can start from the same profile,
experience, education, project, and skill data.

Treat this folder as read-only during a benchmark run. Change it only when
intentionally updating the reference dataset for every candidate.

## Format

The files follow the same small set of conventions:

- **Frontmatter** (`---` block at the top) stores `key: value` fields in
  `profile.md`, including the name, title, and contact links.
- **`# Heading`** labels the file, while **`## Heading`** starts an entry such
  as a job, degree, project, or skill group.
- **`key: value` lines** directly below an entry heading provide metadata such
  as company, period, location, URL, or school.
- **Plain lines** hold descriptive paragraphs, and **`- ` lines** hold
  highlight bullets. Indented lines continue long bullets.

## Files

| File | What it holds |
| --- | --- |
| `profile.md` | Name, title, contact links (frontmatter) + summary paragraphs |
| `experience.md` | One `##` entry per role |
| `education.md` | One `##` entry per degree |
| `projects.md` | One `##` entry per project |
| `skills.md` | One `##` group per category; items as a comma-separated line or bullets |

This directory defines data only; it does not contain a parser or benchmark
runner. A runner must either consume this format directly or document any
transformation it applies.
