import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description:
    "AI Product Engineer specialising in TypeScript product platforms, data-rich interfaces, AI systems, and engineering team enablement.",
}

export default function CvLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
