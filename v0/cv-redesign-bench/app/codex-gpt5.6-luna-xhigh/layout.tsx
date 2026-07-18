import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge - AI Product Engineer",
  description:
    "CV for Ricardo Jorge, an AI Product Engineer specialising in TypeScript, React, Next.js, data visualisation, and AI product engineering.",
}

export default function CvLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
