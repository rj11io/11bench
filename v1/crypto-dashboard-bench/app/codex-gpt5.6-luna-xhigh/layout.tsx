import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cairn · Treasury Control Room",
  description:
    "A seeded, read-only crypto treasury intelligence workspace demo.",
}

export default function CairnLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

