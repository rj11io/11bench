import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Breakline — Exposure Mission Control",
  description:
    "A seeded cybersecurity product demo for explainable breach-path remediation decisions.",
}

export default function BreaklineLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
