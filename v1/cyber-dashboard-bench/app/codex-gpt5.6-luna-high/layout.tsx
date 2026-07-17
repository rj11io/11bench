import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cinder | Remediation operations",
  description: "A demo workspace for evidence-backed cybersecurity remediation.",
}

export default function CinderLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
