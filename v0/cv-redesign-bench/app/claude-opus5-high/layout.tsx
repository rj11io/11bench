import type { Metadata } from "next"
import { Newsreader } from "next/font/google"

import { person } from "./content"

/**
 * One extra typeface on top of the two the root layout already loads (Inter for
 * body, Geist Mono for micro type). Newsreader is a variable serif that holds
 * up both at 25pt in the masthead and at 11pt in a job title. design.md §2.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: `${person.name} — ${person.title}`,
  description: person.standfirst,
}

export default function CvLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={newsreader.variable}>{children}</div>
}
