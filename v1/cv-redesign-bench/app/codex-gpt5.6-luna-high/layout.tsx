import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge - AI Product Engineer",
  description:
    "CV of Ricardo Jorge, an AI Product Engineer focused on TypeScript, React, data visualisation, and AI product systems.",
}

export default function CvLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

