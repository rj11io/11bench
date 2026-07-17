import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google"

import styles from "./cv.module.css"

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--cv-sans",
})

const serif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--cv-serif",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--cv-mono",
})

export const metadata: Metadata = {
  title: "Ricardo Jorge | AI Product Engineer CV",
  description: "Two-page CV site for Ricardo Jorge, built from the reference PDFs.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`${styles.scope} ${sans.variable} ${serif.variable} ${mono.variable}`}
      data-cv-scope="true"
    >
      {children}
    </div>
  )
}
