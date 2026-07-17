"use client"

import styles from "./cv.module.css"

export function PrintButton() {
  return (
    <button
      className={styles.printButton}
      onClick={() => window.print()}
      type="button"
      aria-label="Download Ricardo Jorge’s CV as a PDF using the print dialog"
    >
      <span className={styles.printButtonDot} aria-hidden="true" />
      Download PDF
      <span className={styles.printShortcut} aria-hidden="true">
        A4 · 2 pages
      </span>
    </button>
  )
}
