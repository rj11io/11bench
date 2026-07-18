import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luna Exposure Triage",
  description: "Demo workspace for explainable exposure triage.",
}

export default function LunaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
