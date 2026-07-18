import type { Metadata } from "next"
import { Fraunces } from "next/font/google"

// Editorial serif for the name and section markers. Scoped to this route via a
// CSS variable applied to the wrapper below. Body (Inter) and mono (Geist Mono)
// come from the root layout.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
})

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description:
    "CV of Ricardo Jorge (RJ), AI Product Engineer in Lisbon: a decade of frontend TypeScript, data-driven products, and AI agent engineering.",
}

export default function CvLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={fraunces.variable}>{children}</div>
}
