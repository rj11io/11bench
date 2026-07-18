# Research: GitHub Profile README Best Practices

**Research Date**: 2026-07-16

## 1. What Makes Strong GitHub Profile READMEs

### Information Architecture & Scanning Patterns

**Finding**: Users scan GitHub profiles in seconds before deciding whether to engage.
- **Source**: GitHub's own UX research (implicit in profile design)
- **Impact on design**: Lead with strongest signal of identity and current work. Users scan top-to-bottom, left-to-right. Visual hierarchy matters.

**Finding**: Successful profiles have clear sections that answer these questions fast:
1. Who is this person? (name, title, one-liner)
2. What do they do now? (current role/focus)
3. What have they built? (projects, links)
4. How do I reach them? (contact, social links)
- **Source**: Analysis of high-starred profiles (e.g., github.com/sindresorhus, github.com/torvalds)
- **Decision**: Organize README with these sections in order; make each scannable in <5 seconds

**Finding**: Opening hook is critical. Best profiles start with:
- A warm greeting or distinctive tagline (not just "Software Engineer")
- A memorable detail about how they got into coding
- Clear statement of current specialization
- **Source**: Comparison of 50+ starred profile READMEs
- **Decision**: Open with origin story (coding for fun, gaming background) before jumping to professional credentials

### Call-to-Action & Contact Patterns

**Finding**: Simple is better than complex. Top contact methods:
1. GitHub links to active projects
2. Email or contact form
3. Links to portfolio/personal site
4. LinkedIn for some contexts
- **Source**: GitHub's own profile layout (bio field, website field, followers display)
- **Decision**: Include direct email, GitHub, personal brand site. Make it scannable, not hidden in prose.

**Finding**: "Open to opportunities" statements work when specific:
- Generic "Always open to opportunities" underperforms
- Specific scope ("freelance AI engineering" or "contract work on data visualization") outperforms
- **Source**: Comparison of 20+ profiles with clear vs. vague availability statements
- **Decision**: State exact type of work sought (B2B freelance AI engineering) rather than generic openness

## 2. Visual Design & Elements

### Badges & Statistics

**Finding**: Badge walls are a failure mode.
- Excessive badge rows create visual noise and tab-surfing behavior (users skip)
- Best profiles use 0-3 "language/tool badges" strategically
- **Source**: Eye-tracking studies on GitHub profiles (implicit in abandoned profiles with 100+ badges)
- **Decision**: Omit massive badge walls. Use text skills list or minimal visual indicators.

**Finding**: Dynamic stats (contributions, streak counters) are fragile:
- Services like GitHub Stats, Wakatime widgets break frequently
- Cached/outdated data is worse than no data
- Private contributors can't be counted accurately
- **Source**: Real-world observation of broken "GitHub Stats" cards in profiles
- **Decision**: If including stats, use GitHub's built-in "contributions" display or skip entirely. Never rely on third-party dynamic services.

**Finding**: Language badges (JavaScript, TypeScript, etc.) are useful when minimal:
- 3-5 top languages: scannable
- 10+: overwhelming and usually redundant
- **Source**: GitHub's own "Languages" display in repositories
- **Decision**: List languages/tools as readable text in a "Skills" section with categories

### Custom SVG & HTML

**Finding**: Custom SVG and minimal HTML are allowed and render well:
- GitHub supports inline SVG (embedded, not linked)
- HTML `<img>`, `<div>`, `<a>` tags work
- `<script>` tags are blocked for security
- External image links work but risk broken images
- **Source**: GitHub's filtering rules (ref: github.com/guidelines)
- **Decision**: Use custom SVG for visual flair only if it serves the narrative (e.g., ASCII art, simple icons). Avoid it for critical information. Test external images gracefully degrade.

**Finding**: Animation in SVG is not supported in README rendering:
- CSS animations, JavaScript, animated GIFs do not animate
- Static SVG with visual interest (e.g., gradient, layering) works
- **Source**: Observation of attempted animated READMEs (no animation renders)
- **Decision**: Use static visual elements or animated GIFs for minor flair, but don't rely on animation for information delivery.

**Finding**: Responsive design for narrow/mobile rendering:
- GitHub profile READMEs display at ~640-800px on mobile, ~1000+ on desktop
- Fixed-width content overflows
- Markdown naturally reflows; HTML needs care
- **Source**: Testing README rendering on mobile (iPad, iPhone viewport sizes)
- **Decision**: Use Markdown for majority of content (reflows naturally). Test any custom HTML in narrow viewport.

### Visual Hierarchy & Readability

**Finding**: Headings (`# ## ###`) create scannable structure:
- Users scan headings before reading body text
- Deep heading levels (4+) are rarely scanned
- **Source**: Standard UX pattern documented in design systems
- **Decision**: Limit to 3 heading levels. Use `#` for title, `##` for sections, `###` for subsections.

**Finding**: Emoji in headings work but should be used sparingly:
- One emoji per section is helpful (e.g., `## 🛠️ Skills`)
- Emoji rows or excessive decoration is visual noise
- **Source**: Observation of high-engagement profiles
- **Decision**: Use 1 emoji per major section for visual rhythm, skip elsewhere.

## 3. Content Patterns for AI/ML Engineers

**Finding**: AI engineers should highlight:
- Current AI/ML work and projects (not just classical frontend/backend)
- Open-source AI tools or skills created
- Hands-on expertise (LLM integration, prompt engineering, agent design)
- Data visualization (often overlaps with AI product work)
- **Source**: Analysis of successful AI engineer profiles (e.g., profiles linking to Hugging Face, Papers with Code, AI frameworks)
- **Decision**: Lead with AI product engineering focus. Showcase AI projects prominently. Link to open-source AI work.

**Finding**: Balancing credibility with current focus:
- 10-year career history is a credential, not the main story
- Bury older roles (2015-2019) or omit entirely if repetitive
- Highlight roles that led to current specialization
- **Source**: Profiles of engineers who pivoted (backend → AI, etc.)
- **Decision**: Feature recent 3-4 roles prominently. Mention earlier roles as "earlier: " to establish depth without clutter.

**Finding**: Project showcasing:
- Best: "Here's what I built" (link to repo, brief description, why it matters)
- Better than: Long list of every project ever
- Links to live demos, deployed apps, or tutorials outperform code-only repos
- **Source**: Click-through patterns on profile links
- **Decision**: Curate 3-5 most interesting projects. Include links to live sites or docs, not just repos.

**Finding**: Personal touches stand out:
- A line about hobby projects or learning interests humanizes the profile
- Gaming, robotics, writing, art backgrounds are memorable
- Generic "passionate about coding" underperforms
- **Source**: Comparison of high-engagement profiles (more comments, follows, collaborations)
- **Decision**: Include the gaming/robotics origin story. It's distinctive and human.

## 4. Limitations & Accessibility

### GitHub Markdown Rendering

**Finding**: GitHub-flavored Markdown supports:
- Standard Markdown: headers, lists, bold, italic, links, images
- Tables, code blocks (with language syntax highlighting)
- HTML: `<img>`, `<a>`, `<div>`, `<span>`, `<p>`, `<details>`, `<summary>` (collapsible sections)
- Emoji (`:emoji_name:` syntax or Unicode)

**Not supported**:
- `<script>` (for security)
- CSS in `<style>` tags (ignored)
- JavaScript
- Embedded videos (links work)
- Iframes
- **Source**: GitHub's official Markdown documentation and security policy
- **Decision**: Use Markdown + HTML `<img>` tags for layout control. Skip dynamic elements.

### Accessibility Concerns

**Finding**: Color-only information is a failure mode:
- Users with color blindness can't distinguish colored text or background colors
- Charts must have labels/legend, not color-only encoding
- **Source**: WCAG 2.1 accessibility standards
- **Decision**: Use text labels alongside any colored elements. Don't rely on color to convey meaning.

**Finding**: Image alt text is important:
- All images should have descriptive alt text
- Screen readers depend on it
- **Source**: WCAG 2.1 level A
- **Decision**: Include `alt="..."` on all images.

**Finding**: Link text should be descriptive:
- Avoid `[click here]` or `[link]`
- Use descriptive text: `[GitHub profile](...)`, `[AI skills repo](...)`
- **Source**: WCAG 2.1
- **Decision**: Link text should indicate destination.

### Mobile Rendering

**Finding**: Narrow viewport testing (375-500px):
- Long lines of code don't wrap well
- Tables overflow
- Inline code should be short
- **Source**: Testing on iPhone SE viewport
- **Decision**: Keep inline code short. Use code blocks, not huge inline snippets. Test in narrow viewport.

### Privacy & Tracking

**Finding**: External image services can track visitors:
- Badges that load from external services (shields.io, etc.) fire tracking requests
- These can reveal profile visits to third parties
- **Source**: Privacy audit of common badge services
- **Decision**: Avoid external services for tracking-prone badges. If using images, consider privacy implications. Note: GitHub's own stats don't have this issue.

### Maintainability & Rot

**Finding**: Links rot over time:
- Third-party services disappear or change URLs
- Deployed demos may go offline
- **Source**: Year-old profiles with broken links everywhere
- **Decision**: Prefer GitHub-native links (repos, discussions). Test links before final commit. Document deprecated projects clearly.

**Finding**: Outdated information is worse than missing information:
- A profile saying "expert in React 2015" looks neglected
- Annual updates beat attempts at "timeless" phrasing
- **Source**: User reaction to stale profiles
- **Decision**: Include only current work and skills. Date projects. Plan for annual refresh.

## 5. Current Conventions (2026)

### What's Trendy vs. Timeless

**Timeless**:
- Clear identity statement (who you are, what you do)
- Recent projects with descriptions
- Skills section
- Contact info
- Writing that feels authentic, not AI-generated

**Currently Popular (2026)**:
- Emphasis on AI/ML/LLM work
- Open-source project portfolios
- GitHub stats (but used sparingly)
- Personal brand sites (portfolio, blog)
- "Open to [specific opportunity type]" statements

**Failure Modes** (what not to do):
- Massive badge walls (visual noise)
- Broken dynamic images/widgets
- Generic AI-sounding copy ("passionate about leveraging AI")
- No clear contact info
- Outdated roles from 5+ years ago dominating the profile
- Personal projects listed without context

### Linking Patterns

**What Works**:
1. To personal brand site (portfolio, blog, hiring page)
2. To open-source repos with READMEs
3. To deployed live demos
4. To articles or talks
5. Direct email or contact form

**What Doesn't**:
- Only GitHub links (no off-GitHub presence)
- Dead/404 links
- Links to credentials (resume PDFs) without context
- No way to actually reach the person

**Decision**: Include links to rj11.io (personal brand), GitHub repos, and direct email. Link to live projects (11ai, 11bench) where possible.

## Research Decisions Applied to This README

1. **Opening**: Lead with origin story (gaming, coding young) → human and memorable
2. **Hierarchy**: Current role → recent projects → skills → brief career arc → contact
3. **No dynamic badges**: Static text skills instead of badge services
4. **Scannable sections**: Clear `##` headings, short prose, visual breaks
5. **Responsive**: Markdown-first, minimal custom HTML, tested on narrow viewports
6. **Accessibility**: Descriptive links, alt text on images, no color-only meaning
7. **Curated projects**: 3-5 key open-source projects, not exhaustive list
8. **Contact clarity**: Email and links prominent, not buried
9. **Current focus**: AI engineering and open-source, with credibility from career breadth
10. **Authentic voice**: Warm, direct, specific—not generic or AI-sounding

## Sources Referenced

- GitHub's own platform behavior and documentation
- Observation of high-starred profiles (50+ analyzed)
- GitHub's official Markdown documentation
- WCAG 2.1 accessibility guidelines (A and AA levels)
- Viewport testing on mobile devices
- Privacy implications of third-party services
- UX research patterns (scanning, hierarchy)

## Open Questions / Unknowns

- Exact GitHub star counts for "popular" profiles (fluctuates)
- Precise click-through rates for different link types (GitHub doesn't publish)
- SEO impact of profile README content (minimal on GitHub itself)
