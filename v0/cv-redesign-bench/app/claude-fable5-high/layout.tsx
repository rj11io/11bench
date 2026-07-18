import type { Metadata } from "next"
import { Newsreader } from "next/font/google"

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif-cv",
})

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description:
    "CV of Ricardo Jorge, AI Product Engineer in Lisbon, Portugal. TypeScript, React, Next.js, data visualisation, and AI agent engineering since 2015.",
}

export default function CVLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={newsreader.variable}>{children}</div>
}
