import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description:
    "Ricardo Jorge is an AI Product Engineer specialising in TypeScript, data-rich products, frontend architecture, and agent systems.",
}

export default function CvLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
