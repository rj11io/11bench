import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Breachline Exposure Command",
  description:
    "Demo dashboard for exploit-aware vulnerability exposure triage.",
}

export default function RunLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
