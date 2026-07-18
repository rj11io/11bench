import type { Metadata } from "next"
import { Manrope, Space_Grotesk } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-helm-sans",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-helm-display",
})

export const metadata: Metadata = {
  title: "Helm Treasury",
  description:
    "Scenario-aware crypto treasury risk control for stablecoin-heavy finance teams.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className={`${manrope.variable} ${spaceGrotesk.variable}`}>{children}</div>
}
