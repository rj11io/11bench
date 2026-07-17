# Design Rationale

## Direction

The visual direction is an editorial technical brief: warm paper, dark ink, a single teal accent, strong typographic hierarchy, and dense but readable information blocks. The goal is to feel senior and product-minded without becoming a decorative portfolio page.

This follows the research findings from Nielsen Norman Group and The Ladders: recruiters scan names, titles, dates, current roles, and section anchors first. It also follows the GOV.UK and Carbon guidance toward concise writing, predictable hierarchy, and clear interface-like structure.

## Hierarchy

- Page one starts with identity, current title, location, and all important links.
- The summary is two short paragraphs: professional positioning first, origin signal second.
- Skills are grouped by hiring signal: Product AI, Frontend Platform, Data UI, Delivery.
- Projects appear before experience because the current positioning depends on the 11io/11ai/11bench ecosystem and GitHub presence.
- Experience remains reverse chronological. The two newest roles get more space on page one; the rest continue on page two.
- Education is last because it is factual and useful, but less decisive for this senior profile.

## Typography

The route inherits the repository fonts from the root layout: Inter for body text and Geist Mono for labels, dates, and metadata. The design uses a restrained type scale:

- Large name for instant recognition.
- Medium section and role headings for scanning.
- Compact body copy for two-page print density.
- Monospaced labels only for metadata, never for long reading.

Letter spacing is kept at zero. Section labels are uppercase through casing rather than negative tracking.

## Grid And Responsive Behavior

Desktop and print use an A4-inspired sheet with a two-column internal logic:

- Header: identity on the left, contact links on the right.
- Sections: fixed left rail for section labels, flexible right column for content.
- Skills/projects: two-column grids.
- Role headers: title/company left, dates right.

At mobile widths around 375 px, every grid collapses to one column. Contact rows keep labels and values but allow wrapping. `minmax(0, 1fr)` and `overflow-wrap` prevent link overflow.

## Accessibility

- Semantic sections, headings, addresses, anchors, and time elements are used.
- The print/download control is a real button with an accessible label and visible text.
- Links display real destinations and remain meaningful without color.
- Screen colors use high contrast; print is forced to black text on white.
- No important text is embedded in images or generated decoration.

## Exact Two-Page Print Strategy

The print output uses two explicit `.sheet` articles, each sized to A4:

- `@page { size: A4; margin: 0; }`
- each sheet is `210mm x 297mm`;
- print padding is fixed in millimeters;
- the first sheet has `break-after: page`;
- the second sheet disables the final break to avoid a blank third page;
- the print button is hidden;
- screen shadows/backgrounds are removed;
- overflow is hidden only after content has been compressed and tested against the fixed sheet.

Content allocation:

- Page 1: identity, contact, summary, skills, projects, current rj11io role, Hunt role.
- Page 2: OMEGA, Phantasma, BinaryEdge/Coalition, compressed earlier roles, education.

This page split keeps the current AI and data-visualization positioning visible immediately while retaining the decade-long progression that supports seniority.

## Content Constraints

The two-page limit required cutting autobiographical detail, old technology inventories, and low-relevance early work. No achievements were invented to replace them. When metrics were absent from the PDFs, the design used specificity of shipped systems instead: AttackCapture(TM), HuntSQL(TM), CORE5, Phantasma Explorer, Coalition Explorer, ASM, and AI extraction/agent work.
