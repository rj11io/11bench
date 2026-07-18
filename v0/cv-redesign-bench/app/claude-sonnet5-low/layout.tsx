import type { Metadata } from "next"
import { Source_Serif_4 } from "next/font/google"

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Ricardo Jorge | AI Product Engineer",
  description:
    "CV redesign for Ricardo Jorge, AI Product Engineer — two-column editorial layout with an exact two-page A4 print output.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className={serif.variable}>{children}</div>
}
