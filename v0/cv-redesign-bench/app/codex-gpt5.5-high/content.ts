import { readFileSync } from "node:fs"
import { join } from "node:path"

export type Link = {
  label: string
  href: string
}

export type SkillGroup = {
  group: string
  items: string[]
}

export type Project = {
  name: string
  href: string
  dates: string
  description: string
}

export type Role = {
  title: string
  company: string
  href: string
  context: string
  dates: string
  bullets: string[]
}

export type CVContent = {
  person: {
    name: string
    preferredName: string
    title: string
    location: string
    email: string
    links: Link[]
  }
  summary: string[]
  focus: string[]
  technicalOrigins: string
  skills: SkillGroup[]
  projects: Project[]
  experience: Role[]
  earlier: {
    title: string
    items: string[]
  }
  education: {
    program: string
    school: string
    location: string
    dates: string
    credential: string
  }
}

const contentPath = join(process.cwd(), "app/codex-gpt5.5-high/content.md")
const contentMarkdown = readFileSync(contentPath, "utf8")
const match = contentMarkdown.match(
  /<!-- CANONICAL_CONTENT_START -->\s*```json\s*([\s\S]*?)\s*```\s*<!-- CANONICAL_CONTENT_END -->/
)

if (!match) {
  throw new Error("Canonical content JSON block is missing from content.md")
}

export const cv = JSON.parse(match[1]) as CVContent
