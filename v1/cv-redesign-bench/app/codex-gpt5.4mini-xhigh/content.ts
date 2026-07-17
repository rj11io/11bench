import fs from "node:fs"
import path from "node:path"

import { cache } from "react"

export type IdentityLink = {
  label: string
  href: string
}

export type Identity = {
  name: string
  headline: string
  location: string
  email: IdentityLink
  links: IdentityLink[]
  portfolio: IdentityLink
}

export type SummarySection = {
  kind: "summary"
  label: string
  paragraphs: string[]
}

export type SkillGroup = {
  label: string
  items: string[]
}

export type SkillsSection = {
  kind: "skills"
  label: string
  groups: SkillGroup[]
}

export type ProjectItem = {
  name: string
  url: string
  meta: string
  description: string
}

export type ProjectsSection = {
  kind: "projects"
  label: string
  items: ProjectItem[]
}

export type RoleItem = {
  title: string
  company: string
  site?: string
  siteUrl?: string
  dates: string
  meta: string[]
  summary: string
  highlights?: string[]
}

export type RolesSection = {
  kind: "roles"
  label: string
  items: RoleItem[]
}

export type CompactRolesSection = {
  kind: "compactRoles"
  label: string
  items: RoleItem[]
}

export type EducationItem = {
  title: string
  school: string
  location: string
  dates: string
  detail: string
}

export type EducationSection = {
  kind: "education"
  label: string
  items: EducationItem[]
}

export type Section =
  | SummarySection
  | SkillsSection
  | ProjectsSection
  | RolesSection
  | CompactRolesSection
  | EducationSection

export type PageContent = {
  id: string
  sections: Section[]
}

export type CvContent = {
  identity: Identity
  pages: PageContent[]
  notes: {
    omissions: string[]
    uncertainties: string[]
  }
}

const contentPath = path.join(
  process.cwd(),
  "app",
  "codex-gpt5.4mini-xhigh",
  "content.md"
)

function parseContentMarkdown(): CvContent {
  const markdown = fs.readFileSync(contentPath, "utf8")
  const match = markdown.match(/```json\s*([\s\S]*?)\s*```/)

  if (!match) {
    throw new Error("Canonical JSON block not found in content.md")
  }

  return JSON.parse(match[1]) as CvContent
}

export const getCvContent = cache(parseContentMarkdown)
