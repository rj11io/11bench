import type { Metadata } from "next"
import { Source_Serif_4 } from "next/font/google"

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description:
    "CV of Ricardo Jorge, AI Product Engineer. A decade of TypeScript, React, and Next.js, with recent focus on AI product engineering and agent automation.",
}

export default function RunLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={serif.variable}>{children}</div>
}
