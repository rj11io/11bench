# CV Redesign: Ricardo Jorge

A polished, research-backed CV website for an AI Product Engineer. Renders at `/claude-haiku4.5` with desktop, mobile, and print-optimized layouts.

## Deliverables

### Strategy Documents

**[research.md](./research.md)** — Research into contemporary CV design, recruiter scanning behavior, hiring expectations, typography, grid systems, print strategy, and ATS considerations. Sources decisions made in design and content.

**[content.md](./content.md)** — Canonical content model reconciling two source PDFs (`ref/RJ_CV.pdf`, `ref/RJ_CV_max.pdf`). Distinguishes extracted facts from editorial inference, flags uncertainties, records omissions and compression choices required by the two-page constraint.

**[design.md](./design.md)** — Visual design system covering color palette (light: blue #1E40AF, dark: cyan #38BDF8), typography (system sans-serif, responsive sizes), grid (max-width 720px centered), responsive breakpoints (mobile 375px, desktop 1200px+), accessibility compliance (WCAG 2.1 AA), and exact two-page print strategy with page break logic.

### Implementation

**[cv-data.ts](./cv-data.ts)** — Structured TypeScript data model derived from `content.md`. Single source of truth for all content rendered on screen and in print.

**[page.tsx](./page.tsx)** — Main CV component. Client-side React component that renders all content from `cv-data.ts` with proper semantic HTML, keyboard navigation, and a "Download PDF" button that triggers `window.print()`.

**[layout.tsx](./layout.tsx)** — Route-level layout with metadata (title, description, OpenGraph tags).

**[cv.module.css](./cv.module.css)** — Scoped CSS with:
- Layout utilities (max-width, padding, grid)
- Typography hierarchy (H1–H3, body text, labels)
- Print-safe styles (@media print with page breaks, A4 margins, black text)
- Dark mode support (prefers-color-scheme: dark)
- ATS-safe selectors (no global element rules; all classes are local)

## Design Decisions

### Content Compression for Two Pages

- **Page 1** (~350–400 words): Header, About Me, Skills, Projects
- **Page 2** (~750–850 words): Experience (recent roles only), Education
- **Omitted**: Legacy GitHub project, early-career internship details (summarized in "Earlier Roles" line)
- **Word count target**: ~1100–1250 words total (fits exactly two A4 pages at 12–13px with 0.5in margins)

### Visual Direction

**Minimalist single-column with color accent**. Not two-column (better ATS parsing, responsive), not image-heavy (ATS safety), not trendy (timeless professional tone).

- Cyan in dark mode (#38BDF8), blue in light mode (#1E40AF) for headings and links
- System fonts (instant rendering, universal familiarity)
- Generous whitespace and 1.6 line height for readability
- High contrast (4.5:1 body text) for WCAG AA compliance

### Print Strategy

**Deliberate page break after Projects section** ensures Experience (highest priority for hiring managers) dominates page 2. No orphaned headings, no blank third page, no clipped content.

- CSS rule: `.projectsSection { page-break-after: always; }`
- A4 page size, 0.5in margins, 12–13px body text
- Links remain blue (#0066CC) and underlined in print
- Download PDF button hidden in print (@media print)

## Browser Support

✓ Chrome, Safari, Firefox, Edge (modern versions)  
✓ Mobile (375px) and desktop (1200px+)  
✓ Dark and light color schemes (system preference)  
✓ Print via browser print dialog or "Download PDF" button

## Verification

All checks pass:

```bash
npm run lint
npm run typecheck
npm run build
```

✓ No console errors  
✓ Route prerendered as static (`/claude-haiku4.5`)  
✓ Semantic HTML with proper heading hierarchy  
✓ Keyboard navigable (Tab through links)  
✓ ATS-safe (no images, clean HTML, unique selectors)

## Content Sources

All facts extracted from:
- `ref/RJ_CV.pdf` (standard CV, 2 pages)
- `ref/RJ_CV_max.pdf` (extended CV, 6 pages)

No information invented. Editorial choices documented in `content.md` (compression, rewriting for clarity, reconciliation of conflicts).

## Accessibility

- **WCAG 2.1 Level AA** compliant
- **4.5:1 color contrast** (body text vs background)
- **Semantic HTML** (H1, H2, H3; ul/li; proper link text)
- **Focus indicators** visible on all interactive elements
- **Dark mode support** (not just an overlay; proper color inversion)

## Next Steps

The website is production-ready. Deploy to your hosting platform or use locally at `http://localhost:3000/claude-haiku4.5`.

To print:
1. Open the page in a browser
2. Click "Download PDF" or use Cmd+P / Ctrl+P
3. Save as PDF or print to paper
4. Result: exactly 2 A4 pages, no blank third page

---

**Built with:** Next.js 16 + React + Tailwind + CSS Modules  
**Delivered by:** Claude Haiku 4.5  
**Date:** 2026-07-16
