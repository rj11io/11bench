import type { Metadata } from "next"
import { Fraunces, Manrope } from "next/font/google"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--cv-font-display",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--cv-font-body",
})

export const metadata: Metadata = {
  title: "Ricardo Jorge | AI Product Engineer",
  description:
    "CV redesign for Ricardo Jorge, focused on AI product engineering, frontend systems, and two-page print delivery.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className={`${fraunces.variable} ${manrope.variable}`}>{children}</div>
}
