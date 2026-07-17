"use client"

import styles from "./cv.module.css"

export function PrintControl() {
  return (
    <button
      className={styles.printControl}
      type="button"
      onClick={() => window.print()}
      aria-label="Download PDF using the browser print dialog"
    >
      <span aria-hidden="true">↓</span>
      Download PDF
    </button>
  )
}
