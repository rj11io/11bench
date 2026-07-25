"use client"

import styles from "./cv.module.css"

/**
 * The only interactive element on the page. Hidden in print via `.bar`.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      className={styles.print}
      onClick={() => window.print()}
    >
      <svg
        className={styles.printIcon}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 1.5v8.5" />
        <path d="M4.5 7 8 10.5 11.5 7" />
        <path d="M2 12.5v1.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-1.5" />
      </svg>
      Download PDF
    </button>
  )
}
