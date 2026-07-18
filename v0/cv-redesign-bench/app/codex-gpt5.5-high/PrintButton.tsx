"use client"

type PrintButtonProps = {
  className?: string
}

export function PrintButton({ className }: PrintButtonProps) {
  return (
    <button className={className} type="button" onClick={() => window.print()}>
      Download PDF
    </button>
  )
}
