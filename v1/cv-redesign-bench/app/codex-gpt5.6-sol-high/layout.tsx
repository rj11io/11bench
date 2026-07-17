import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ricardo Jorge — AI Product Engineer",
  description:
    "Ricardo Jorge is an AI Product Engineer specialising in TypeScript product systems, data-rich interfaces, and agent workflows.",
}

export default function CvLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
