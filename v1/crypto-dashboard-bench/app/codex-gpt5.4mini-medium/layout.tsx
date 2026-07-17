import type { Metadata } from "next"
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google"
import type { ReactNode } from "react"

import styles from "./styles.module.css"

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-technical",
})

export const metadata: Metadata = {
  title: "Treasury Sentinel",
  description:
    "A stablecoin treasury risk cockpit for finance teams deciding whether funds are safe to move.",
}

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className={`${styles.frame} ${display.variable} ${mono.variable}`}>
      <div className={styles.shell}>{children}</div>
    </div>
  )
}
