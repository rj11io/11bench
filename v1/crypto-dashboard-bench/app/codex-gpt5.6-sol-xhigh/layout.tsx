import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Holdfast — Treasury readiness",
  description:
    "A seeded demo of stress-tested payment readiness for crypto-native finance teams.",
}

export default function HoldfastLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
