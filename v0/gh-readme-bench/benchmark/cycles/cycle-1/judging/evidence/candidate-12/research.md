# Research notes

Access date for all web sources: 2026-07-16 (Europe/Lisbon).

## What a strong profile README needs to do

The profile README is displayed at the top of a GitHub profile, so it is a high-context first impression rather than a full CV. GitHub's own guidance recommends a concise professional bio, an introduction, skills, experience, selected projects, and achievements; it separately recommends pinning 3-5 relevant repositories. The same guide warns that hiring managers may only spend a couple of minutes exploring projects, and says project material should be easy to understand and explore.

- [Using your GitHub profile to enhance your resume - GitHub Docs](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume) - supports the content hierarchy above and the need for short project overviews, demos, setup, and tests in project repositories. Decision: put the current work and three owned projects before the long career history; describe projects by purpose, not by an undifferentiated tool list.
- [Quickstart for writing on GitHub - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-and-formatting-on-github/quickstart-for-writing-on-github?apiVersion=2022-11-28) - says the profile README is shown at the top of the profile and demonstrates a profile-specific README with images, tables, collapsed sections, quotes, and comments. Decision: use a clear hierarchy and a small amount of HTML, but keep the meaning in text so the page still works without visual extras.

Editorial inference: visitors generally scan the name/title, opening two lines, project names, and contact links before deciding whether to read more. This is a design assumption about the medium, not a measured claim about all GitHub users; it changed the README to put those signals first and keep headings short.

## Current examples and conventions

I inspected real public profiles critically rather than treating templates as evidence of quality:

- [Anurag Hazra / anuraghazra](https://github.com/anuraghazra) - combines a one-line identity, a compact “About me”, a small technology row, stats cards, and pinned repositories. The README makes open-source work and a named project legible before the widgets. Decision: copy the emphasis on a named body of work and pinned-project-style descriptions; omit dynamic stats because this task has no need for vanity metrics and the profile must remain coherent if remote images fail.
- [rUv / ruvnet](https://github.com/ruvnet) - presents “Open-source AI systems” as a clear identity, then groups a large project ecosystem by capability and explains how the systems connect. Decision: use a systems-oriented “build loop” and capability groupings for RJ's AI work, while staying much smaller and avoiding unsupported ecosystem claims.
- [rj11io](https://github.com/rj11io) - the current public account exposes a compact stack-oriented bio, links to the personal site and LinkedIn, and pins 11ai plus TypeScript projects. This corroborates the PDFs' current public direction, but the README below treats the PDFs as the authoritative biographical source and does not add unlisted facts or metrics.

Observed contemporary patterns include: a short identity hook; project-first navigation; grouped skills; a compact code/terminal motif; occasional theme-aware images; and selective use of stats/cards. The examples also show the main failure mode of the genre: a profile can become a dashboard of widgets instead of an explanation of what the person builds. I chose the narrative and text-first end of that spectrum.

## Creative patterns and technical trade-offs

- [Basic writing and formatting syntax - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) - GitHub supports relative links and image paths, the `<picture>` element, HTML anchor tags, and accessible image alt text. Decision: use standard Markdown links, a `<div align="center">` for restrained layout, and no local images because the concept is stronger as text and has no asset dependency.
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/) - the rendering target is GitHub Flavored Markdown, not arbitrary browser HTML. Decision: use headings, paragraphs, lists, blockquotes, and fenced code; avoid CSS, scripts, forms, iframes, and browser-dependent interactions.
- [GitHub Docs: image accessibility guidance](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github?apiVersion=2022-11-28#adding-an-image-to-suit-your-visitors) - the GitHub example uses `<picture>` with a meaningful `alt` attribute and light/dark sources. Decision: no decorative image is necessary; if a future version adds one, it must have descriptive alt text and a default source.

Tasteful uses worth considering: a single static banner or diagram when it carries meaning; a small number of badges when they communicate build/license/package state; a code block when it is genuinely a visual metaphor; and stats/cards only when their absence would hide useful evidence. For this profile, the code block is the only creative device: `signal -> interface -> system -> agent` is an editorial diagram of the progression from data products to AI product engineering.

## Reliability, accessibility, and maintenance

- Text must carry the claims; external images are optional decoration. The README therefore contains no dynamic cards, contribution snakes, visitor counters, tracking pixels, or services requiring credentials.
- Color cannot be the only signal. The project list uses names, descriptions, and links; the code motif is labeled in plain text.
- Narrow/mobile rendering is a first-class constraint. Avoided multi-column tables, long unbroken badge rows, huge headings, and fixed-width images. Project items stack naturally as paragraphs and lists.
- GitHub's Markdown renderer supports the HTML used here, but not arbitrary CSS or JavaScript. Keeping the markup minimal makes future edits safer.
- Public contact is limited to links already present in the PDFs. Email is shown as a direct mailto path because it is an explicit CV contact, not scraped from a new source.

## Failure modes avoided

Badge walls obscure the work; vanity metrics age quickly and can be misread as impact; dynamic services break or rate-limit; excessive animation harms motion-sensitive readers and narrow screens; generic AI copy says little; and visual noise competes with project names. The implementation uses a distinctive voice, one restrained code motif, short sections, and explicit calls to action instead.

