"use client"

import { Download } from "lucide-react"

import styles from "./cv.module.css"

export function PrintButton() {
  return (
    <button
      type="button"
      className={styles.printButton}
      onClick={() => window.print()}
    >
      <Download aria-hidden="true" size={17} strokeWidth={1.8} />
      Download PDF
    </button>
  )
}
