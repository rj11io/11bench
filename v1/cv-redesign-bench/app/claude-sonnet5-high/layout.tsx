import type { Metadata } from "next"
import { Fraunces } from "next/font/google"

import { cn } from "@/lib/utils"

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description:
    "CV of Ricardo Jorge, AI Product Engineer specializing in TypeScript, React/Next.js dashboards, and AI product engineering.",
}

export default function RunLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className={cn(fraunces.variable)}>{children}</div>
}
