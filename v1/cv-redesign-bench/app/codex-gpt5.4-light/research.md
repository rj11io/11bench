# Research

Access date for all sources: 2026-07-16.

## Resume structure and scanning

### Nielsen Norman Group, "How Users Read on the Web"
URL: https://www.nngroup.com/articles/how-users-read-on-the-web/

Finding: people scan heavily, favor headings, short blocks, and visually distinct entry points over dense prose.

Decision changed: reduced the opening summary to short bullets, added strong section labels, and avoided paragraph-heavy storytelling in the rendered CV.

### Indeed Career Guide, "How To Write a Software Engineer Resume"
URL: https://www.indeed.com/career-advice/resumes-cover-letters/software-engineer-resume

Finding: employers expect clear technical stacks, recent experience first, concise accomplishment framing, and easily found contact information.

Decision changed: ordered the route around recent roles, kept contact links visible in the header, and grouped skills into recruiter-friendly buckets instead of one long list.

### LinkedIn Talent Blog / LinkedIn hiring guidance on resume review behavior
URL: https://business.linkedin.com/talent-solutions/resources/talent-acquisition

Finding: hiring teams make fast first-pass decisions and need immediate role fit, seniority, and domain relevance.

Decision changed: the hero states "AI Product Engineer" and the headline emphasizes senior AI product/frontend positioning rather than a generic frontend title.

## Senior engineer content strategy

### Novoresume, "Software Engineer Resume Examples"
URL: https://novoresume.com/career-blog/software-engineer-resume

Finding: senior technical resumes work best when they prioritize specialization, architecture ownership, leadership scope, and high-signal tools rather than exhaustive task lists.

Decision changed: compressed older roles, kept the zero-to-one/frontend-leadership thread, and selected bullets that show system ownership rather than low-level implementation detail.

### Vercel docs and ecosystem guidance for modern frontend delivery
URL: https://vercel.com/resources

Finding: for modern product/frontend roles, delivery quality is part of the signal: testing, deployment, shared UI systems, and developer experience matter.

Decision changed: kept Playwright, CI/CD, Storybook, and component-system work in both content and design hierarchy because they strengthen seniority and product-engineering credibility.

## Editorial and typographic direction

### Practical Typography, "Key Rules of Typography"
URL: https://practicaltypography.com/

Finding: readable editorial documents benefit from clear hierarchy, restrained type palettes, consistent spacing, and high contrast instead of decorative complexity.

Decision changed: used one expressive serif for display hierarchy and the app's sans for body copy; relied on spacing, rules, and panels rather than visual noise.

### The Pudding / contemporary editorial web design patterns
URL: https://pudding.cool/

Finding: current editorial interfaces often combine strong narrative mastheads with modular data panels, which suits candidates who work at the intersection of product and visualization.

Decision changed: the route uses a magazine-like masthead plus panelized information blocks, avoiding generic SaaS-card layouts while staying structured enough for print.

## ATS, accessibility, links, and PDF

### W3C WAI, "Links"
URL: https://www.w3.org/WAI/tutorials/links/

Finding: links should be meaningful in isolation and remain understandable when extracted from surrounding context.

Decision changed: rendered explicit destination text such as `github.com/rj11io` and `linkedin.com/in/rj11io` instead of vague "GitHub" or "LinkedIn" labels.

### W3C WAI, "Color Contrast"
URL: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Finding: contrast must remain strong for readability; decorative color should never carry essential meaning.

Decision changed: print styles force black-on-white, links lose low-contrast accent styling in print, and hierarchy does not rely on color alone.

### Adobe Acrobat accessibility guidance for PDFs
URL: https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html

Finding: PDF output should preserve readable text, working links where possible, and clean page structure; visually dense backgrounds can degrade printed clarity.

Decision changed: print layout removes gradients and shadows, keeps text live, and uses deliberate page sections sized for A4 rather than letting the browser paginate arbitrarily.

## Limits

- Web research was available, but this benchmark environment does not expose browser-side citation export or full-text capture for every result. Findings above are concise and conservative.
- I favored authoritative accessibility sources and well-known expert guidance over trend pieces.
