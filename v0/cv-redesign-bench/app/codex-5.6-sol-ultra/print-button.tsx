"use client"

import styles from "./page.module.css"

export function PrintButton() {
  return (
    <button
      className={styles.printButton}
      type="button"
      onClick={() => window.print()}
      aria-label="Download or print Ricardo Jorge’s CV as a PDF"
    >
      <span className={styles.printButtonDot} aria-hidden="true" />
      Download PDF
      <span className={styles.printButtonKey} aria-hidden="true">
        ↗
      </span>
    </button>
  )
}

