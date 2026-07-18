import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "StableOps Treasury Console",
  description:
    "Seeded demo of a stablecoin treasury dashboard for finance teams.",
}

export default function RunLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
