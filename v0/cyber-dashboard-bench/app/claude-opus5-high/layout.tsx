import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Assay — detection assurance (demo)",
  description:
    "A demo detection-assurance console: every coverage claim carries an evidence date, an owner and an expiry. Unverified is not covered. All data is fictional.",
}

export default function AssayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={display.variable}>{children}</div>
}
