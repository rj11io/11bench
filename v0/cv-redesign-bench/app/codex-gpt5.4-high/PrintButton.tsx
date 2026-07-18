"use client"

import styles from "./cv.module.css"

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
