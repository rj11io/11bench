import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Treasury Risk Control Room",
  description:
    "A seeded demo of a crypto treasury risk dashboard for protocol operators.",
}

export default function RunLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
