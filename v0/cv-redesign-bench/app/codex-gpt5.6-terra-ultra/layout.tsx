import type { Metadata } from "next"

import { cvContent } from "./content"

export const metadata: Metadata = {
  title: `${cvContent.identity.name} | ${cvContent.identity.role}`,
  description:
    "Professional profile for Ricardo Jorge, an AI Product Engineer working across product engineering, frontend systems, data visualization, and AI automation.",
}

export default function CvLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
