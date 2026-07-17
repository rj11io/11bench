# Design rationale

## Direction: technical editorial dossier

The CV combines two relevant identities: a product engineer who cares about
interfaces and information, and a technical lead who builds durable systems.
The visual direction is therefore a **technical editorial dossier**—precise,
warm, structured, and recognisably authored.

It borrows the concision and asymmetric grid discipline of Swiss editorial
design, then adds a current screen-scale typographic gesture: an oversized name
and a small, high-energy identity marker. It avoids generic AI motifs such as
circuits, neon gradients, robots, chat bubbles, or generated illustrations.

This direction follows `research.md`:

- recruiter research favours obvious title/company/date patterns and low
  cognitive load;
- NN/g supports descriptive headings, chunking, grouping, and restrained
  hierarchy;
- current typography research supports expressive type used intentionally;
- ATS guidance requires real text, a simple reading order, and no dependence on
  image-based layout;
- print guidance requires explicit physical page architecture and validation.

## Information architecture

### Page one — fit and recent evidence

1. Identity, role, location, and every primary contact link.
2. Three-paragraph positioning statement.
3. Four compact career signals.
4. The three most recent roles: rj11io, Hunt, and OMEGA.

The top half answers the initial screening questions: who is this, what level
and specialism, what is current, and where is the evidence?

### Page two — depth and completeness

1. Phantasma and BinaryEdge / Coalition in full senior-role treatment.
2. A compact but complete chronology of all five earlier employers.
3. Current open-source properties.
4. Grouped technical range.
5. Education and the robotics distinction.

This gives page two a clear purpose rather than using it as overflow. Older work
is compressed proportionally, but no employer or date disappears.

## Hierarchy and typography

The root application already supplies Inter and Geist Mono. Reusing them avoids
another network request, keeps glyph rendering predictable, and gives a useful
product/engineering contrast:

- **Inter** carries the name, narrative, roles, and evidence.
- **Geist Mono** carries dates, folios, labels, URLs, and control text.

There are three primary hierarchy levels:

1. name / identity;
2. section and role headings;
3. body evidence and metadata.

Short uppercase mono labels create navigation without becoming reading text.
Body copy is flush left; no paragraphs are justified. Running profile text is
held to a readable measure, while short role bullets can span farther because
they are individually chunked.

On screen, blue is reserved for the title, section indices, and link treatment;
chartreuse appears only in the RJ marker and print control. Rules, spacing, and
weight carry most of the hierarchy. In print, colour collapses to black, grey,
and white.

## Grid

Desktop sheets use an asymmetric two-part grid:

- a narrow 148 px editorial rail for numbered section labels;
- a flexible main column for content.

The rail is a visual layer only. The DOM remains in reading order: section
heading first, then its content. Experience entries repeat one predictable
pattern:

`role + company/context + dates → evidence bullets`

The second page uses a two-up lower grid for open source and technical range.
These are supporting lists, not the primary chronology, and they collapse into
one stream on mobile.

Subtle background grid lines appear on the screen sheets as texture. They are
CSS decoration, carry no information, and disappear completely in print.

## Responsive behaviour

### Desktop (~1440 px)

- The canvas is dark and the two CV sheets are centred at a maximum width of
  1040 px.
- Paper surfaces, shadows, and generous outer space make the two-page structure
  visible without imitating a browser dashboard.
- The Download PDF control remains fixed and reachable.

### Mobile (~375 px)

- The canvas padding reduces to 12 px and each sheet becomes full width.
- Every label rail moves above its content.
- Career signals become a two-by-two grid.
- Role headings and dates stack.
- The page-two supporting grid becomes a single vertical stream.
- Contact links wrap naturally; no item has a fixed width that can create
  horizontal overflow.
- Screen sheets use auto height. Physical page dimensions apply only to print.

The layout does not hide or abbreviate content at mobile width.

## Accessibility and interaction

- One `h1` identifies the candidate; each content section has a real `h2`, and
  roles/projects use `h3`.
- Experience bullets are semantic lists; grouped skills and signals are
  description lists.
- Contact and project destinations are real anchors with visible, meaningful
  text. Underlines ensure links are not identified by colour alone.
- External links open in a new tab and use `rel="noreferrer"`; email remains a
  normal `mailto:` action.
- Download PDF is a real button whose client-only action is `window.print()`.
- The button and skip link have strong visible keyboard focus.
- Normal screen text and controls are designed for AA contrast.
- Decorative numbers, marker, and grid texture are excluded from the
  accessibility tree where appropriate.

## Exact two-page print strategy

The print layout is not a shrink-to-fit version of the responsive page. It is a
separate physical composition sharing the same content and DOM.

1. `@page { size: A4; margin: 0; }` establishes the physical sheet.
2. The two top-level sheet articles become exactly `210mm × 297mm`.
3. Each sheet owns its internal margins through millimetre padding.
4. Page one has `break-after: page`; page two explicitly has no forced break.
5. Role and compact content units use `break-inside: avoid`.
6. The fixed Download PDF control and skip link are removed from print.
7. All surfaces become white; all essential text, rules, markers, and links
   become black or dark grey.
8. Screen shadows, canvas gradients, and grid texture disappear.
9. Contact links remain visible as text and active as PDF link annotations.
10. The final browser-generated PDF is rendered to images and inspected. Page
    count is also checked programmatically, and extracted text is reviewed for
    a sensible order.

The content must genuinely fit each A4 sheet. Overflow is not used to conceal an
overfull page. A third blank sheet, a clipped role, or a role split at the fold
is a failed build, not an acceptable browser variation.

## Print-density choices

- Page one uses more white space around identity because this is the primary
  scan zone.
- Role bullets are denser than screen prose but retain visible leading and
  separation.
- Earlier roles receive one evidence sentence each.
- Skills use grouped inline terms instead of badges, bars, or logos.
- Education and the robotics distinction share one closing band.
- Page folios and footers are low-contrast metadata; contact details never rely
  on a footer alone.

## Implementation relationship

- `content.md` is the editorial source of truth.
- `content.ts` is its typed structured derivative.
- `page.tsx` maps those arrays and objects; it does not hardcode a divergent CV.
- `page.module.css` owns route-scoped screen, responsive, and print styles.
- `print-button.tsx` is the smallest possible client boundary.

