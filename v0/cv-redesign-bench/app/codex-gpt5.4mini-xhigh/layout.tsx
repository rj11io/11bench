import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google"

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--cv-sans",
})

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--cv-serif",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--cv-mono",
})

export const metadata: Metadata = {
  title: "Ricardo Jorge | AI Product Engineer CV",
  description:
    "Two-page CV website for Ricardo Jorge, an AI product and frontend engineer.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable}`}>
      {children}
    </div>
  )
}
