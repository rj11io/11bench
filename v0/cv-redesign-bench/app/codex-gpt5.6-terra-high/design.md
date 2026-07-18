# Design rationale — technical editorial CV

## Direction

The design is a “technical editorial” rather than a portfolio landing page: near-black type on a warm paper field, a compact high-impact nameplate, thin structural rules, and monospace metadata. It gives an AI product / frontend engineer an interface-native visual language while retaining the quiet, text-first authority of a CV. The lime accent exists only on the screen print button hover, so it is never essential to reading.

This follows the research in `research.md`: Harvard and Berkeley both emphasize rapid scanning, readable typography, white space, and conventional resume fields; W3C guidance supports semantic grouping, contrast, visible controls, responsive layouts, and not relying on color alone. The resulting hierarchy makes the role title, recent employer, dates, and relevant capabilities faster to find than any decorative element.

## Hierarchy and grid

1. **Identity / contact:** each A4 sheet repeats the name, title, location, email, site, GitHub, and LinkedIn. The first sheet establishes identity; repetition makes a separated printed page self-identifying.
2. **Profile / focus:** a single 15px screen / print-equivalent paragraph expresses the senior technical narrative. A numbered “Known for” rail is a scan aid, not a claim hierarchy.
3. **Capabilities:** four labeled groups create ATS-friendly, plain-text keywords before work history.
4. **Experience:** a consistent 25mm metadata column holds date and context, with title, employer, and evidence in the reading column. This turns the dense history into predictable repeated units.
5. **Supporting evidence:** page two uses a two-column lower grid for earlier roles, independent projects, education, and a compact origin note.

The normal screen canvas centers 210mm paper sheets on charcoal, visibly separating the work surface from the browser. At 700px and below, the page changes to a linear mobile reading view: the contact block left-aligns, multi-column regions stack, type grows, and each role’s date sits before its content. This avoids horizontal scrolling at approximately 375px while preserving DOM order and all content.

## Typography and accessibility

- Body and display use a robust system sans serif, avoiding a network-dependent font and keeping print rendering reliable. The display name uses heavy weight and tight tracking only at a large size.
- A system monospace face is reserved for short labels, dates, and utility text, giving technical rhythm without reducing long-form legibility.
- Body text is near-black on `#fbfbf7`; muted metadata is still structurally redundant through position, rules, label casing, and proximity. Links are visible words with underlines, never unlabeled glyphs.
- HTML uses `header`, `main`, `section`, `article`, headings, lists, `address`, and native anchors. External destinations have real `href`s and meaningful visible text. The print button has an explicit accessible name.
- Keyboard focus uses the browser focus or a high-contrast lime treatment on the one interactive screen control. No hover-only information is required.

## Exact two-page print strategy

The route deliberately renders two `.sheet` siblings. Print CSS sets `@page { size: A4 portrait; margin: 0 }`; each sheet has `box-sizing: border-box`, `width: 210mm`, `height: 297mm`, and explicit `break-after: page`. The second sheet cancels that break, preventing a blank third page. Fixed internal paddings reserve footer space; its content height is therefore bounded and visually checked rather than flowing to an uncontrolled third sheet.

Screen-only toolbar controls are `display:none` in print. Print forces white paper, black copy, and black-underlined links regardless of the active site theme. Role units use `break-inside: avoid` as a defensive rule; the explicit two-sheet structure is the primary pagination mechanism. For final browser export, use A4, portrait, 100% scale, background graphics optional, and disable browser-generated headers / footers. The implemented page footer is part of the layout and remains visible.

The print strategy is intentionally CSS-native and browser-based: the requested Download PDF control calls `window.print()`, which lets the user choose a local PDF destination while retaining selectable text and source links. As noted in `research.md`, tagged-PDF support is ultimately browser / print-engine dependent.
