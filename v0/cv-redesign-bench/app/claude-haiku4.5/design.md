# Design System: Ricardo Jorge's CV Website

**Design direction:** Minimalist single-column with color accent. Modern, scannable, print-first.

---

## Color Palette

**Strategy:** Neutral base with a single accent color for hierarchy and interactive elements. Must work in both light and dark modes; must be readable in grayscale print.

| Role | Color | Light | Dark | Grayscale | Purpose |
|------|-------|-------|------|-----------|---------|
| Background | White / Near-black | #FFFFFF | #0F0F0F | N/A | Canvas |
| Text (body) | Near-black / White | #1A1A1A | #EEEEEE | Black | Primary reading |
| Text (secondary) | Gray | #666666 | #AAAAAA | #808080 | Dates, metadata |
| Accent | Slate/Teal | #1E40AF | #38BDF8 | N/A | Headings, links, highlights |
| Border/Divider | Light gray | #E5E5E5 | #2A2A2A | #D0D0D0 | Section breaks |

**Rationale:**
- **High contrast:** Body text at 4.5:1 (AA compliant).
- **Accent in light:** Deep blue (#1E40AF / `blue-900`) for headings; links in the same blue.
- **Accent in dark:** Cyan (#38BDF8 / `sky-400`) for contrast against dark background.
- **Grayscale-safe:** Links remain blue/underlined in print; all text remains black.

---

## Typography

**System font stack:** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (or Tailwind's `inter`)

**Hierarchy:**

| Element | Size (px) | Weight | Line Height | Role |
|---------|----------|--------|-------------|------|
| H1 (Name) | 32–36 | 700 | 1.2 | Header, print title |
| H2 (Section) | 18–20 | 600 | 1.3 | Section headings (About, Skills, Experience) |
| H3 (Role/Project) | 14–16 | 600 | 1.4 | Job title, company, project name |
| Body | 13–14 | 400 | 1.6 | Main text, bullets |
| Small (dates, meta) | 12 | 400 | 1.5 | Dates, location, links |
| Label | 11 | 500 | 1.4 | Skill categories (Core Stack, AI Engineering) |

**Responsive adjustments:**
- Mobile (375px): H1 28px, H2 16px, H3 13px, Body 12px
- Desktop (1200+px): H1 36px, H2 20px, H3 16px, Body 14px

**Rationale:**
- Sans-serif for modern clarity; system fonts for instant rendering.
- 1.6 line height on body for readability; tighter line height on headings for impact.
- Sizes chosen to survive print shrinkage (browsers print at ~96dpi; scaling preserves hierarchy).

---

## Layout & Grid

**Approach:** Single-column with max-width constraint for readability; flexible left/right padding for mobile.

**Screen layout:**
- Max-width: 720px (optimal for reading; ~65 characters per line).
- Padding: 16px mobile, 24px desktop.
- Margins: None (layout fills available width up to max-width).

**Responsive behavior:**
- **Mobile (< 640px):** Single column, 16px padding, full-width sections.
- **Tablet (640–1024px):** Single column, 24px padding.
- **Desktop (> 1024px):** Single column, centered on page, max-width 720px.

**Vertical rhythm:**
- Section spacing: 2rem (32px) between major sections.
- Role spacing: 1.5rem (24px) between roles.
- Bullet spacing: 0.75rem (12px) between bullets.

**Print layout:**
- A4 page: 210mm × 297mm (8.27in × 11.69in).
- Margins: 0.5in (12.7mm) on all sides (leaves 7.27in × 10.69in usable).
- Font size: 12–13px body (fits ~50–55 characters per line at A4 width).
- Line height: 1.5–1.6 for readability; preserves vertical space.

---

## Section Structure & Page Breaks

**Strategic page breaks (deliberate CSS):**

```
Page 1:
  - Header (name, title, contact info) [~3 lines]
  - About Me [~8 lines]
  - Skills [~10 lines]
  - Projects [~6 lines]
  [PAGE BREAK]

Page 2:
  - Experience [~30 lines]
  - Education [~2 lines]
```

**Why this break:** Skills/Projects fit naturally on page 1 and are lower-priority than recent experience. Experience dominates page 2, which is where hiring managers focus for seniority signal.

**Implementation:**
- After `<section id="projects">`, add `page-break-after: always` in print styles.
- Ensure no section headings orphan (no H2 at bottom of page 1 without content).
- Test in Chrome DevTools print preview to verify exact page count.

**Target metrics:**
- Page 1: ~350–400 words
- Page 2: ~750–850 words
- Total: ~1100–1250 words (fits exactly 2 pages at 12–13px with standard margins)

---

## Visual Accents & Emphasis

**Heading treatment:**
- Section headings in accent color (#1E40AF light, #38BDF8 dark).
- All caps or title case depending on hierarchy level.
- Thin bottom border (1px) in a lighter shade, to separate from body.

**Role headers:**
- Job title in semibold (600) accent color.
- Company name and dates on the next line, in gray (secondary text color).
- Links to company websites in accent color, underlined.

**Skills presentation:**
- Category label in bold (600), accent color.
- Skill items separated by dots (`·`) or commas; not bullet lists (saves vertical space, aids scanning).

**Bullet lists:**
- For role accomplishments and project descriptions.
- Clean single-level bullets (no nesting); each bullet ~1 line at body text size.
- Subtle gray bullet character (not black).

**Links:**
- All `<a>` tags in accent color, underlined.
- No hover effects on print (not interactive).
- Dark mode: link color switches to cyan (#38BDF8) for contrast.

---

## Dark Mode Support

**Implementation:** CSS media query `@media (prefers-color-scheme: dark)`.

**Automatic changes:**
- Background: White → #0F0F0F (near-black, not pure black for OLED comfort).
- Text: #1A1A1A → #EEEEEE.
- Secondary text: #666666 → #AAAAAA.
- Accent: #1E40AF (blue) → #38BDF8 (cyan).
- Borders: #E5E5E5 → #2A2A2A.

**No manual override required:** Dark mode follows system preference (`prefers-color-scheme`).

---

## Print Styles

**Goals:** Produce clean, readable black-and-white output that looks intentional (not like a screen dump).

**Specific rules:**
```css
@media print {
  body {
    background: white;
    color: black;
  }
  a {
    color: #0066CC; /* Standard print blue */
    text-decoration: underline;
  }
  h1, h2, h3 {
    color: black;
    page-break-after: avoid;
  }
  section {
    page-break-inside: avoid; /* Soft constraint; may be broken if content is large */
  }
  .no-print {
    display: none;
  }
  @page {
    margin: 0.5in; /* Safe margin for most printers */
    size: A4;
  }
}
```

**Practical notes:**
- Accent color becomes black in print (all text is black or blue for links).
- Remove any "Download PDF" button and non-content controls (`.no-print` class).
- Links remain visible and blue; they're not actionable in print but signal external reference.
- Margins are set to 0.5in to avoid printer bleed and maximize content space.

---

## Accessibility Compliance

**WCAG 2.1 Level AA:**

1. **Contrast:** All text meets 4.5:1 ratio (body vs background; links vs background).
2. **Font size:** Minimum 12px body; 18px minimum for interactive elements where applicable.
3. **Keyboard navigation:** All links are focusable; focus outline is visible (Tailwind's `focus:ring`).
4. **Semantic structure:**
   - `<h1>` for name/title.
   - `<h2>` for section headings (About, Skills, Experience, Education).
   - `<h3>` for role/project titles.
   - `<ul>` for bullet lists.
   - `<a>` with meaningful link text (not "click here").
5. **Color alone:** Accent color is used for hierarchy, but text and underlines convey meaning independently (e.g., links are underlined, not just colored).

**Implementation:** Tailwind utilities (`sr-only` for screen-reader text, `focus:ring` for focus outlines, semantic HTML structure).

---

## Responsive Behavior Details

**Mobile (375px viewport):**
- Single column, full width.
- Padding: 16px (leaves ~343px content width).
- Header: Name is 28px, title is 12px.
- Skills: Category labels are bold, skills are dot-separated for scannability.
- Bullets: Single-level, no indentation.
- Links: Full-width tap target (min 48px height); blue underlined.

**Tablet (640px viewport):**
- Single column, centered with 24px padding.
- Content width: ~592px.
- No layout changes; scales smoothly from mobile.

**Desktop (1200px viewport):**
- Single column, centered, max-width 720px.
- Padding: 24px sides (content is 720px, surrounded by space).
- Full-page background color visible on sides (white in light mode, dark in dark mode).

**Print (A4, 8.27" × 11.69"):**
- 0.5" margins on all sides.
- Max content width: ~7.27".
- Font size: 12–13px (matches desktop, slightly tightened for page fit).
- No media queries required; CSS is print-aware.
- Two pages exactly (verified via print preview in browser).

---

## Implementation Notes

**CSS modules:** Use `cv.module.css` (scoped to avoid conflicts with global styles).

**Tailwind usage:**
- Utility-first for layout, spacing, and typography.
- Custom CSS module for:
  - Print-specific styles (`@media print`).
  - Page break logic.
  - Subtle animations (fade-in on load, optional).

**Build considerations:**
- No external fonts required (system fonts are loaded instantly).
- No images (text-only for ATS safety and fast rendering).
- SVG icons optional (e.g., for contact/link icons); must have `role="img"` and alt text.

**Testing checklist:**
- [ ] Light mode: text readable, links visible, accent color correct.
- [ ] Dark mode: background is not pure black, text is not pure white, accent is cyan.
- [ ] Mobile (375px): no horizontal overflow, readable font size, buttons/links are tapable.
- [ ] Tablet (640px): layout is centered, padding is even.
- [ ] Desktop (1200px): content is constrained to 720px, centered on page.
- [ ] Print preview (Chrome): exactly 2 A4 pages, no orphaned headings, no blank third page, links are blue and underlined, text is readable in grayscale.
- [ ] Keyboard navigation: Tab through all links, focus outline is visible.
- [ ] Screen reader: Section structure is semantic, headings are in order, link text is meaningful.

---

## Visual Direction Justification

**Why single-column over two-column?**
- Single column survives ATS parsing better (no column detection required).
- Scales perfectly to mobile without redesign.
- Print is simpler (no column balancing, no orphans).

**Why minimal color?**
- Modern, timeless, professional tone.
- Survives print in grayscale without looking broken.
- Accent color provides visual rhythm without distraction.

**Why strong typography?**
- Hierarchy is clear at a glance (6–15 second recruiter scan).
- Font sizes are deliberate, not default.
- Line heights aid readability (critical for print).

**Why this font stack?**
- System fonts load instantly (no network requests).
- Consistent rendering across all browsers and devices.
- Familiar to all readers (no unusual fonts to bias interpretation).

---

## Design Lock

This document describes the final visual direction for the CV website. All implementation must adhere to these specifications. Changes to design require updates to this file, then implementation.
