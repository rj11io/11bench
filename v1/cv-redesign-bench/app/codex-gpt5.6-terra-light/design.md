# Design rationale

## Direction and hierarchy

This is an editorial CV: warm off-white paper, deep green ink, a restrained vermilion marker, a literary display name, and compact technical sans-serif body copy. It is deliberately calmer than a product dashboard. Research in `research.md` supports scanning with descriptive sections, short bullets, and obvious hierarchy; the name/role/contact block establishes identity before the profile and evidence.

## Grid and responsive behaviour

Desktop uses a broad editorial sheet with a 1.5:1 profile/skills split and a two-column conclusion. Jobs remain one readable column. At 640px and below, the grid becomes one column, contact information aligns left, job dates move below the title, and page padding tightens; no fixed width or horizontal positioning is used.

## Accessibility

The structure is semantic: main, article, header, address, sections, headings, time elements, lists, and meaningful anchors. The dark ink/warm-paper body contrast is intentionally high; colour is decorative only. Links use underlines on screen and visible black text in print. The print control is a native button with an explicit text label.

## Exact print strategy

The print stylesheet sets `@page { size: A4; margin: 0 }`. The resume has two explicit 210 mm × 297 mm containers: page one contains identity, profile, practice, and three jobs; page two contains the remaining jobs, compressed history, projects, education, and footer. Page one has `break-after: page`; page two has `break-after: auto`; both hide overflow to prevent a third page. Print styles use small but legible point sizes, black text on white, remove the fixed Download PDF control, and preserve only content justified by the canonical model.
