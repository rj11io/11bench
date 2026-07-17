# Research: GitHub profile README

Access date for web sources: 2026-07-16.

## Sources and Findings

### GitHub Docs: "Managing your profile README"
URL: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme

Findings:
- A profile README appears when a public repository matches the username and has a root `README.md`.
- GitHub frames the profile README as a personalized section on the profile, not as a complete CV.

Decision changed:
- The final README is written as the top-of-profile experience: immediate identity, current focus, project paths, and contact routes. It does not duplicate the full CV.

### GitHub Docs: "Using your GitHub profile to enhance your resume"
URL: https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume

Findings:
- GitHub recommends a concise bio, selected best projects, professional background, skills, and a path to share results.
- It specifically suggests showcasing 3-5 projects instead of presenting everything.

Decision changed:
- The README highlights 11io, 11ai, 11bench, selected current client work categories, and a compact work history. Earlier jobs are summarized instead of listed like a resume.

### GitHub Docs: "About README files"
URL: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes

Findings:
- README content should tell visitors what something does, why it is useful, how to get started, where to get help, and who maintains it.
- GitHub truncates README files beyond 500 KiB.
- Relative links and image paths are recommended because they work better in clones and across branches.

Decision changed:
- The README uses relative asset paths, stays lightweight, and treats each project entry as "what it is / why it matters / where to go".

### GitHub Docs: "Basic writing and formatting syntax"
URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

Findings:
- GitHub supports headings, code blocks, images, tables, footnotes, alerts, and the `<picture>` element.
- GitHub recommends relative links for repository images.
- Alt text is expected for images.

Decision changed:
- The README uses standard Markdown first, a single local SVG with meaningful alt text, and avoids complex HTML layout that could fail under GitHub sanitization.

### GitHub Docs: "Quickstart for writing on GitHub"
URL: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github

Findings:
- GitHub describes Markdown as easy-to-read plain text and allows some extra HTML tags.
- Advanced features like tables and collapsed sections are available, but should support the content.

Decision changed:
- I avoided collapsible sections because hiding key identity/project information is harmful on a profile. I also changed the project summary from a table to bullets after a narrow-screen pass.

### GitHub community discussion: "GitHub Flavored Markdown doesn't render CSS styles inside a HTML block"
URL: https://github.com/orgs/community/discussions/22728

Findings:
- GitHub sanitizes rendered Markdown and removes risky constructs such as scripts, many inline styles, classes, and IDs.
- CSS-heavy layouts are unreliable in READMEs.

Decision changed:
- No custom CSS, no `<style>`, no script, no iframe, and no layout that depends on classes or CSS. The custom visual is a static SVG image instead.

### GitHub repo: `abhisheknaiidu/awesome-github-profile-readme`
URL: https://github.com/abhisheknaiidu/awesome-github-profile-readme

Findings:
- Curated examples include categories such as GitHub Actions, game mode, code mode, dynamic realtime, descriptive, minimalistic, badges, icons, GIFs, and retro.
- The tools list includes visitor counters, GitHub Readme Stats, WakaTime cards, trophy cards, dynamic blog feeds, typing SVGs, and other external widgets.

Decision changed:
- The final README borrows the idea of a memorable "mode" but avoids a badge wall, visitor counters, activity games, and fragile dynamic widgets. It uses one narrative-specific local SVG instead.

### GitHub repo: `simonw/simonw`
URL: https://github.com/simonw/simonw

Findings:
- Simon Willison's profile README is dense, current, and proof-oriented: current work first, then recent releases, blog posts, and TILs.
- It demonstrates the value of self-updating content when the owner has reliable automation.

Decision changed:
- Current work appears first in the final README. I did not add self-updating feeds because the source PDFs do not provide a maintained feed or automation contract for this profile repository.

### GitHub repo: `swyxio/swyxio`
URL: https://github.com/swyxio/swyxio

Findings:
- The README is highly personal, includes a banner and many links, and uses playful GitHub-native presentation.
- It is memorable, but parts of the page depend on images and dense dynamic visual material.

Decision changed:
- The final README keeps a personal, distinctive hook ("first frontend hire" and "agent systems") but uses fewer links and more fallback text.

### GitHub repo: `addyosmani/addyosmani`
URL: https://github.com/addyosmani/addyosmani

Findings:
- A very short profile can work when the person's public reputation and pinned repositories carry the proof.
- It answers current work, collaboration interest, help wanted, questions, and contact in a few bullets.

Decision changed:
- The final README keeps the first screen compact and makes contact obvious, but adds more proof because Ricardo's profile story needs context from the PDFs.

### GitHub repo: `anuraghazra/github-readme-stats`
URL: https://github.com/anuraghazra/github-readme-stats

Findings:
- GitHub Readme Stats is widely used, but the project page warns the original repository is no longer maintained and that the public Vercel instance is best-effort and can be unreliable due to rate limits and traffic spikes.
- Private stats require a self-hosted instance with a token.

Decision changed:
- No GitHub stats cards, streak cards, trophies, or language cards. The README should remain coherent when external image services fail and should not imply private activity.

### GitHub repo: `coderjojo/creative-profile-readme`
URL: https://github.com/coderjojo/creative-profile-readme

Findings:
- The repository is archived as of 2023 but still documents older creative README patterns.
- It shows that novelty patterns age quickly.

Decision changed:
- Creative execution should be tied to the person's current AI/product story, not a generic retro/game/anime template.

## Synthesis

Strong GitHub profile READMEs communicate:
- who this person is now;
- what kind of work they ship;
- proof through projects, repos, writing, or work artifacts;
- a compact technical center of gravity;
- how to contact or continue exploring.

How visitors scan:
- First 5-10 seconds: name, role, current focus, credibility signal.
- Next pass: project links and stack.
- Final pass: career context and contact.

Useful contemporary patterns:
- A short opening line instead of a long biography.
- 3-5 curated project cards or bullets.
- GitHub-native tables for compact comparison when the cells are short enough for narrow screens.
- One distinctive visual or code block when it reinforces the person's identity.
- Links to working projects instead of unsupported claims.

Tasteful visual choices:
- A static local SVG can add personality without relying on third-party services.
- Badges are useful for status or links, but walls of badges are noisy and often inaccessible.
- Code blocks can be memorable when they encode real information, not generic "Hello World" filler.
- Animation should be rare. Excessive GIFs and typing animations distract and can fail or annoy.

Compatibility and reliability constraints:
- GitHub supports Markdown and a limited/sanitized subset of HTML.
- Avoid custom CSS, scripts, iframes, tracking pixels, and credentials.
- Use relative asset paths for local images.
- Keep the README useful without images.
- Keep tables narrow enough for mobile, or make them simple.

Failure modes to avoid:
- Badge walls with no narrative.
- Vanity metrics without context.
- Broken dynamic services or token-dependent cards.
- Unsupported CSS/HTML layouts.
- Generic AI-generated voice.
- Overclaiming achievements not supported by sources.
- Long resume sections that bury current work.
- Color-only meaning or images without alt text.

## Final Design Decisions

- Opening identity: "AI Product Engineer in Lisbon building agent systems, data-heavy product UIs, and the open-source tools around them."
- Main proof: 11io, 11ai, 11bench, plus selected work categories from current B2B freelancing.
- Visual: one local SVG map of inputs -> engineering system -> outputs.
- No external stats cards or visitor counters.
- No unsupported CSS or JavaScript.
- Contact paths: website, email, LinkedIn, CV, GitHub.
- Career history: compressed into a "through-line" so it supports credibility without becoming a CV paste.
