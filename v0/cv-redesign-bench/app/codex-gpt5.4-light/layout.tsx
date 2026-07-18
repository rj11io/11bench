import type { Metadata } from "next"
import { Fraunces } from "next/font/google"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Ricardo Jorge | AI Product Engineer",
  description:
    "CV redesign for Ricardo Jorge, focused on senior AI product engineering, frontend leadership, and data-rich interfaces.",
}

export default function Layout({
  children,
}: LayoutProps<"/codex-gpt5.4-light">) {
  return <div className={fraunces.variable}>{children}</div>
}
