import type { Metadata } from "next"
import { Bodoni_Moda, IBM_Plex_Mono, Manrope } from "next/font/google"

import styles from "./cv.module.css"

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
})

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-local",
})

export const metadata: Metadata = {
  title: "Ricardo Jorge | AI Product Engineer",
  description:
    "Editorial CV redesign for Ricardo Jorge with responsive screen layout and exact two-page A4 print output.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={[
        styles.route,
        display.variable,
        body.variable,
        mono.variable,
      ].join(" ")}
    >
      {children}
    </div>
  )
}
