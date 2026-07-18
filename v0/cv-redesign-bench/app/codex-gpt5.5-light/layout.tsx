import type { Metadata } from "next"
import "./styles.module.css"

export const metadata: Metadata = {
  title: "Ricardo Jorge - AI Product Engineer CV",
  description: "A two-page CV redesign for Ricardo Jorge.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
