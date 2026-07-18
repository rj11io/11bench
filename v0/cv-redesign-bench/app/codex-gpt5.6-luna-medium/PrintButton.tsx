"use client"

export function PrintButton() {
  return <button className="printButton" type="button" onClick={() => window.print()}>Download PDF <span aria-hidden="true">↗</span></button>
}
