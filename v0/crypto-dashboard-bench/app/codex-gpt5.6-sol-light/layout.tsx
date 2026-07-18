import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Harbor — Stablecoin treasury risk desk",
  description:
    "A seeded product demo for policy-based stablecoin treasury risk review.",
}

export default function HarborLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}

