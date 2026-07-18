import type { ReactNode } from "react"

import styles from "./page.module.css"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.shellInner}>{children}</div>
    </div>
  )
}
