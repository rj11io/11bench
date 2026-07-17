import type { Metadata } from "next"
import type { ReactNode } from "react"
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google"

import styles from "./cv.module.css"

const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Ricardo Jorge | AI Product Engineer",
  description: "Two-page CV site for Ricardo Jorge, rebuilt from the provided PDF references.",
}

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <section className={`${styles.shell} ${display.variable} ${body.variable} ${mono.variable}`}>
      {children}
    </section>
  )
}
