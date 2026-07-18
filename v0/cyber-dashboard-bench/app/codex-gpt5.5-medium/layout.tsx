import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Patchline Exposure Command",
  description:
    "A demo cybersecurity exposure-management dashboard for prioritizing and mobilizing remediation work.",
}

export default function RunLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
