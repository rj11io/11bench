"use client"

export function PrintButton() {
  return (
    <button className="printButton" type="button" onClick={() => window.print()}>
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M7 14h10v7H7z" />
      </svg>
      Download PDF
    </button>
  )
}

