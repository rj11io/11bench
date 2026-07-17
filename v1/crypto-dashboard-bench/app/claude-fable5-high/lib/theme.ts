"use client"

import * as React from "react"
import { useTheme } from "next-themes"

/**
 * Data-viz palette (validated reference set from the dataviz method):
 * categorical slots in fixed CVD-safe order, reserved status colors, and
 * chart chrome. Dark values are selected steps, not automatic flips.
 */
export interface VizPalette {
  s1: string // categorical slot 1 — blue (stablecoins / primary series)
  s2: string // slot 2 — aqua (majors)
  s3: string // slot 3 — yellow (staked)
  s4: string // slot 4 — green (own token)
  gray1: string // de-emphasis line 1
  gray2: string // de-emphasis line 2
  grid: string
  baseline: string
  mutedInk: string
  ink: string
  good: string
  warning: string
  critical: string
  up: string
  down: string
  tooltipBg: string
  tooltipBorder: string
  cardBg: string
}

export const LIGHT_PALETTE: VizPalette = {
  s1: "#2a78d6",
  s2: "#1baf7a",
  s3: "#eda100",
  s4: "#008300",
  gray1: "#898781",
  gray2: "#b3b1aa",
  grid: "#e1e0d9",
  baseline: "#c3c2b7",
  mutedInk: "#898781",
  ink: "#0b0b0b",
  good: "#0ca30c",
  warning: "#fab219",
  critical: "#d03b3b",
  up: "#006300",
  down: "#d03b3b",
  tooltipBg: "#ffffff",
  tooltipBorder: "rgba(11,11,11,0.12)",
  cardBg: "#ffffff",
}

export const DARK_PALETTE: VizPalette = {
  s1: "#3987e5",
  s2: "#199e70",
  s3: "#c98500",
  s4: "#008300",
  gray1: "#898781",
  gray2: "#6e6d68",
  grid: "#2c2c2a",
  baseline: "#383835",
  mutedInk: "#898781",
  ink: "#ffffff",
  good: "#0ca30c",
  warning: "#fab219",
  critical: "#d03b3b",
  up: "#0ca30c",
  down: "#e66767",
  tooltipBg: "#242423",
  tooltipBorder: "rgba(255,255,255,0.14)",
  cardBg: "#171717",
}

const emptySubscribe = () => () => {}

/** True after hydration, false during SSR — without setState-in-effect. */
export function useMounted(): boolean {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

/** Resolved palette for the active theme. Light until mounted (SSR-safe). */
export function useVizPalette(): { palette: VizPalette; mounted: boolean } {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const palette = mounted && resolvedTheme === "dark" ? DARK_PALETTE : LIGHT_PALETTE
  return { palette, mounted }
}
