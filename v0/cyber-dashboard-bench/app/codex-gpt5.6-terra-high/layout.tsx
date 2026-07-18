import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Relay — Exposure response demo",
  description: "A demo cybersecurity exposure response cockpit.",
}

export default function RelayLayout({ children }: { children: React.ReactNode }) {
  return children
}
