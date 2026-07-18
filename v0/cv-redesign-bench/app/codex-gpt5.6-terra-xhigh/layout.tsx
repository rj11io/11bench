import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description: "CV for Ricardo Jorge, AI Product Engineer.",
}

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return children
}
