import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description:
    "CV of Ricardo Jorge, AI Product Engineer in Lisbon. A decade of TypeScript, React, and Next.js building data-driven products and AI agent systems.",
}

export default function CvLayout({ children }: { children: ReactNode }) {
  return children
}
