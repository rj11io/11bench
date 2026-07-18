import type { Metadata } from "next"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import styles from "./dashboard.module.css"

export const metadata: Metadata = {
  title: "ReserveScope | Treasury risk cockpit",
  description:
    "Treasury and liquidity risk cockpit for stablecoin-heavy crypto teams.",
}

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className={cn(styles.shell, "dark")} style={{ colorScheme: "dark" }}>
      <div className={styles.orbMint} aria-hidden="true" />
      <div className={styles.orbAmber} aria-hidden="true" />
      <div className={styles.orbCyan} aria-hidden="true" />
      <div className={styles.frame}>{children}</div>
    </div>
  )
}
