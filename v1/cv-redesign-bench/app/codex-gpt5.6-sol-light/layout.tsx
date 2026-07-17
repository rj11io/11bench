import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description:
    "Ricardo Jorge is an AI Product Engineer building data-rich products, frontend foundations, and agent systems.",
}

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return children
}

