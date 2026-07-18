import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BreachPath Command | Demo",
  description:
    "A demo exposure-remediation dashboard for explainable cybersecurity fix prioritization.",
}

export default function RunLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

