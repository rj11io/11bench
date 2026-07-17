import type { Metadata } from "next"

import styles from "./styles.module.css"

export const metadata: Metadata = {
  title: "BreakChain Exposure Command",
  description:
    "A focused cybersecurity dashboard demo for prioritized exposure remediation with attack-path context and auditable workflow.",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`dark ${styles.shell}`}>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

