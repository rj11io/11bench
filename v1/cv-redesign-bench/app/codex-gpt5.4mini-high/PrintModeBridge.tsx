"use client"

import { useEffect } from "react"

export function PrintModeBridge() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-cv-scope]")
    const media = window.matchMedia("print")

    const sync = () => {
      if (root) {
        root.dataset.cvPrint = media.matches ? "true" : "false"
      }
    }

    const onBeforePrint = () => {
      if (root) {
        root.dataset.cvPrint = "true"
      }
    }

    const onAfterPrint = () => {
      if (root) {
        root.dataset.cvPrint = "false"
      }
    }

    sync()
    media.addEventListener("change", sync)
    window.addEventListener("beforeprint", onBeforePrint)
    window.addEventListener("afterprint", onAfterPrint)

    return () => {
      media.removeEventListener("change", sync)
      window.removeEventListener("beforeprint", onBeforePrint)
      window.removeEventListener("afterprint", onAfterPrint)
      if (root) {
        delete root.dataset.cvPrint
      }
    }
  }, [])

  return null
}
