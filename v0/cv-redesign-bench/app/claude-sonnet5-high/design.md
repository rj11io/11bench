# Design

## Direction in one sentence

An editorial masthead (a big serif name, like a magazine's cover line) sitting over a quiet, label-led information grid — because [research.md](research.md) shows recruiters fixate on six spots (name, title, company, dates, previous role, education) in the first six-to-eight seconds, and a masthead gives those spots one unmissable anchor while the label grid keeps everything below it scannable in the F-pattern recruiters actually use.

## Typography

- **Display / name:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (variable, loaded via `next/font/google` inside this route's `layout.tsx` only — it does not touch the shared root layout or `globals.css`). Fraunces is an expressive, current-generation editorial serif with real optical-size behavior at large sizes, which matches [research.md](research.md)'s finding that 2026 CV design is returning to serif display faces for personality without sacrificing professionalism. Both source PDFs already set "Ricardo Jorge" in a serif — this direction is a continuation of the candidate's own choice, not an invented flourish.
- **Body / meta:** the root layout's existing Inter (`--font-sans`) and Geist Mono (`--font-mono`) — no new sans or mono font is introduced. Geist Mono is used only for dates and the tiny "01/2" style page markers, which gives the tabular, technical dates a quiet, distinct texture from the prose without adding a third typeface.
- **Scale (screen, desktop):** name 40px/1.05, role title 18px italic serif, section labels 11px uppercase tracked +0.08em, role/company 15px semibold, body/bullets 14px/1.55, meta (dates, location) 12.5px mono. Scale steps down about 10% at the 375px breakpoint and about 15% in print (see below) — Butterick's guidance is 10-12pt for print body text and 45-90 characters per line, which the print column width (see Grid) satisfies directly.
- **Line length:** the body column is capped at ~68ch on desktop so bullets never run edge-to-edge, per the same line-length guidance.

## Hierarchy and reading order

DOM order = visual order = print order: header → about (+ fun-facts caption) → skills → experience (five roles + one compressed "earlier" line) → projects → education. This is deliberate for three reasons documented in [research.md](research.md): it matches the F-pattern (top-heavy, left-anchored), it's the safest structure for ATS text extraction (single column, standard section labels, no reordering tricks), and it means a screen reader or copy-pasted plain-text version of the page reads in the same sequence a human would scan it.

Within each row, the label (section name, or role meta) sits at the fixed left edge and the content sits to its right, in a two-column CSS grid (`grid-template-columns: 8rem 1fr` on screen ≥640px). This is not a layout table — it's one linear document; the grid only changes where things sit visually, not the order they appear in the DOM. Below 640px the grid collapses to a single stacked column (label above content), so mobile reading order and desktop reading order are identical, just re-flowed.

## Color and theme

The route uses the existing semantic tokens from the shared `app/globals.css` (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`) so it inherits the app's light/dark theme automatically — no new palette is defined for screen use, and no route-level global CSS is imported (a small CSS module handles only the two things Tailwind utilities can't: the `@page` at-rule and one page-break marker). One muted accent (`--color-chart-3`, an existing token, already in the shared palette) marks the Download PDF button and the thin section rules, so screen chrome has a single point of color instead of scattering accents through the content.

Print ignores theme entirely and forces black text on white regardless of whether the visitor's OS/browser is in dark mode: every text/background/border utility in the print styles is a literal `print:bg-white print:text-black print:border-black` override, per the task's explicit requirement and per [research.md](research.md)'s WCAG contrast finding (black on white clears 4.5:1 by a wide margin, which a photo of a dark-mode screen would not).

## Links and accessibility

- Every link (email, site, GitHub, LinkedIn, company domains, project URLs) renders its visible domain text (e.g. `github.com/rj11io`), never an icon-only or "click here" link — carried over from both source PDFs' own convention and matches the ATS finding in [research.md](research.md).
- Links are underlined by default (not only on hover/focus), which per WebAIM's guidance means they already clear the "3:1 + distinct visual cue" bar without needing a separate focus-only treatment; hover/focus additionally darkens the underline and shifts to the accent color for sighted screen users.
- Section labels use real heading elements (`h2`/`h3`) in document order, not styled `div`s, so assistive tech gets the same structure a sighted scanner sees.
- The Download PDF button is a real `<button>` with visible text (not an icon button), calls `window.print()`, and is marked `aria-label` redundant-safe since its visible text already says what it does.
- Body/link contrast was checked against both the light and dark token pairs in `globals.css` (`foreground`/`background` and their dark equivalents) — both combinations exceed 4.5:1, since the tokens are already nn-, close-to-black/white grayscale pairs.

## Grid and responsive behavior

- **Mobile (~375px):** single column, 20px side padding, header stacks (name / title / location / links each on their own line), the two-column label grid collapses to stacked rows, skills categories stack vertically.
- **Desktop (~1440px):** content column caps at `max-w-3xl` (48rem / ~768px) and centers with generous side margins — deliberately narrower than the viewport, because a 1440px-wide line of 14px body text would blow past the 90-character line-length ceiling from [research.md](research.md). The label/content grid is active at this width, giving the page its editorial, magazine-like left rail.
- No horizontal scroll at either width: the two-column grid only activates at `sm:` (640px) and up, tables aren't used anywhere, and long URLs use `break-words` so a long link can't force overflow on narrow phones.

## Print strategy — exactly two A4 pages

1. **Page geometry:** a route-local CSS module sets `@page { size: A4; margin: 14mm 16mm; }`. Usable content height per page is ≈269mm, usable width ≈178mm — the two figures the whole print type scale is budgeted against.
2. **Deliberate break, not accidental overflow:** one explicit break sits between the Hunt Intelligence entry (end of page one, per the accounting in [content.md](content.md)) and the OMEGA entry (start of page two): `print:break-before-page` on the OMEGA `<article>`. This is the only forced break — everything before it must fit on page one, everything after must fit on page two, by construction of the content plan, not by hoping the browser's natural flow lands there.
3. **No mid-entry splits:** every experience `<article>`, every skills category block, and the header block get `print:break-inside-avoid`, so a browser that's short on room pushes a whole entry to the next page rather than orphaning its last bullet.
4. **Compact print type scale:** print styles drop one step below the desktop screen scale (name 26pt, section labels 8.5pt tracked, body 9.5pt/1.4, meta 8pt) — smaller than screen but still inside Butterick's 10-12pt print recommendation is a soft target we deliberately go slightly under, matching the source PDFs' own dense two-page print sizing (~9-9.5pt body observed in `RJ_CV.pdf`), and validated by the height accounting below.
5. **Screen-only chrome removed:** the Download PDF button, any hover-only states, and the mobile stacked-grid breakpoint helper are all wrapped in `print:hidden` / excluded via `@media print`, so the printed sheet never shows an interactive control.
6. **Fit verification:** rather than trusting eyeballed spacing, the two page-content groups were measured directly — the browser viewport was set to the print content width (178mm ≈ 673px) with the print type scale active, and each group's rendered height was read via the DOM and checked against the ≈1017px (269mm) page budget before considering the layout done. This is recorded as done in the implementation notes below; if a future edit changes copy length, the same check must be re-run.

## Why not a literal fixed-height "page" div

An alternative approach — rendering two hard-clipped `210mm × 297mm` boxes even on screen — was considered and rejected. It would guarantee page count by construction, but it fails the "no clipped content" requirement the moment any future copy edit makes an entry one line too long (it would silently clip instead of visibly overflowing), and it forces the screen experience into a fixed-page metaphor that fights the fluid, responsive requirement at 375px and 1440px. Explicit break points plus `break-inside: avoid` plus a measured, budgeted type scale gets the same two-page guarantee without that fragility.
