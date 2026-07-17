"use client"

import styles from "./page.module.css"

export function PrintButton() {
  return (
    <button
      type="button"
      className={styles.printButton}
      onClick={() => window.print()}
    >
      Download PDF
    </button>
  )
}
