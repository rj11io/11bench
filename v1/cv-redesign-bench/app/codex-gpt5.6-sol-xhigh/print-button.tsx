"use client"

import styles from "./cv.module.css"

export function PrintButton() {
  return (
    <button
      className={styles.printButton}
      type="button"
      onClick={() => window.print()}
      aria-label="Download or save this CV as a PDF"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v12" />
        <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
        <path d="M5 20h14" />
      </svg>
      Download PDF
    </button>
  )
}
