# Content — the editorial source for the README

Run: `runs/claude-opus5-high`

This is the single source the `README.md` is written from. Everything in the README
traces back to a numbered fact here, or to a line I have explicitly labelled as
editorial voice.

## Where the material came from

Two PDFs in `ref/`, and nothing else:

- **`RJ_CV.pdf`** — two pages. Its own last line calls it "the minified version of my
  CV" and points at the long one. Referred to below as **[C]** for concise.
- **`RJ_CV_max.pdf`** — six pages. Referred to below as **[X]** for extended.

I extracted the text with `pypdf`, and separately extracted every embedded hyperlink
annotation so that URLs come from the documents themselves rather than from my
guessing at them. Both PDFs are pure text and vector — no embedded images — so nothing
visual was lost in extraction.

**Deliberate exclusion.** These reference files sit inside a wider repository that
happens to be one of RJ's own projects, and his live sites are reachable. I did not
read the surrounding repository or fetch any of his sites for biographical material.
The reference note in `ref/README.md` says the two PDFs are the only shared
biographical inputs, so using anything else would put facts in the README that cannot
be checked against the sources every run was given.

---

## 1. Identity — established fact

| # | Fact | Source |
| :--- | :--- | :--- |
| 1.1 | Name: **Ricardo Jorge**. Goes by **RJ** — "Hi, I'm Ricardo Jorge, but you can call me RJ." | [X] p1 |
| 1.2 | Current title: **AI Product Engineer** | [C] p1 header, [X] p1 header |
| 1.3 | Based in **Lisbon, Portugal** | both, page footers |
| 1.4 | Email **ricardojorgexyz@gmail.com** | both footers, as a `mailto:` link |
| 1.5 | Site **https://www.rj11.io/** | both footers |
| 1.6 | GitHub **https://github.com/rj11io** | both footers |
| 1.7 | LinkedIn **https://www.linkedin.com/in/rj11io** | both footers |
| 1.8 | CV **https://cv.rj11.io/** ; long version **https://cv.rj11.io/v1/max** | [C] p1 footer and p2 closing line |

Every URL above is the exact target of a link annotation inside the PDFs. I have not
invented, shortened or normalised any of them.

**Uncertain — flagged, not guessed.** The "11" in `rj11.io`, `11io`, `11ai` and
`11bench` is clearly a personal mark; in [X] it is even typeset larger than the
project names it prefixes. **Neither PDF says what it stands for.** I use it as his
mark, which is a fact, and I never explain it.

**Not stated anywhere:** pronouns. The README is written in first person, in his own
voice, so the question does not arise in the output. In this file I use "RJ".

---

## 2. Career shape — established fact

| # | Fact | Source |
| :--- | :--- | :--- |
| 2.1 | Went professional in **2015** | [X] p1 |
| 2.2 | Specialised in frontend TypeScript applications | [X] p1 |
| 2.3 | Building on **React since 2016**, **Next.js since 2018** | both |
| 2.4 | Calls this "an early bet on the stack that became the standard for both the web and AI products" | [X] p1 |
| 2.5 | On **most** projects he was the **first frontend hire** | both |
| 2.6 | That meant owning architecture, tooling, component library, infrastructure and pipelines from day one | [X] p1; [C] p1 without "infrastructure" |
| 2.7 | And then growing the team: hiring, onboarding, writing the playbooks "that let new engineers integrate seamlessly". [C] also lists **interviewing** | [X] p1, [C] p1 |
| 2.8 | Most experience is dashboards, product platforms and proprietary data explorers for **cybersecurity, crypto and gaming** companies | both |
| 2.9 | That is where he "found a passion for data-driven products and visualisations" | both |
| 2.10 | [X] adds: "and where I learned what separates a polished product from a prototype" | [X] p1 |
| 2.11 | Has worked with companies across many industries | [X] p1 |
| 2.12 | For the past few years, a hands-on **B2B freelancer** across multiple teams | [X] p2 |
| 2.13 | Self-description: "I operate as a self-guided missile: point me at a target and I'll figure out how to hit it on my own, using everything I've learned to avoid the pitfalls and drive straight to the solution." | [X] p1 |
| 2.14 | Has worn "every hat a startup has (officially and unofficially)", but defaults to product engineering, "where I have the biggest and most immediate impact" | [X] p1 |

### Conflict 2.A — "a decade of professional TypeScript"

[C] opens with "AI Product Engineer with a decade of professional TypeScript
experience". [X] says he went professional in 2015 and "quickly specialized in
frontend TypeScript applications". But the 2015 role at NextBitt (§5) lists
jQuery, Angular.js and .NET — not TypeScript — and the 2016 American Heart
Association project was React and Node.

**Resolution:** the README uses [X]'s more precise framing — professional since 2015,
React from 2016, Next.js from 2018 — and does not put a round number on the TypeScript
years. Dated milestones are checkable; "a decade of X" is the kind of rounding that
invites a reader to do arithmetic and find it slightly off. Nothing is lost: 2015 to
2026 speaks for itself.

### Conflict 2.B — education overlaps employment

Education runs 2013–2016 (§7) while the first job starts January 2015. The
Science4you role is labelled an internship and lasted three months, which is
consistent with a vocational-school placement. **I note the pattern here and assert
nothing about it in the README** — neither PDF explains the overlap.

---

## 3. AI work — established fact

| # | Fact | Source |
| :--- | :--- | :--- |
| 3.1 | Has built with AI "since the first releases of Copilot, ChatGPT, and MidJourney" | [X] p2; [C] p1 names Copilot and ChatGPT only |
| 3.2 | Progression: **autocomplete → prompt and context engineering → full agent harnesses** | [X] p2 |
| 3.3 | [C] words the same progression differently, adding a step: prompt and context engineering → "creating suite of open-source skills" → "designing full agent harnesses and automations" | [C] p1 |
| 3.4 | "Today I run an automated fleet of AI agents that maintain my personal projects." | [X] p2 |

**Reconciliation of 3.2 and 3.3:** [C] inserts the open-source skills step, which is
consistent with the `11ai` project (§4). The README uses the longer [X] chain for the
narrative sentence, and covers the skills separately under projects, so both are
represented without stacking two near-identical lists.

**Fact 3.4 carries a consequence.** Because agents maintain his personal projects, any
commit-activity statistic on his profile would partly be measuring his automation. The
README therefore shows none. This is recorded in `research.md` §4 as a reliability and
honesty decision; here it is the *factual* reason it would be wrong.

---

## 4. Projects — established fact

From [X] pp2–3, which dates them. [C] p1 lists the first three without dates and omits
the two GitHub entries.

| # | Name | URL | Dates | Description, as written |
| :--- | :--- | :--- | :--- | :--- |
| 4.1 | **11io** | https://www.rj11.io/ | 2025 – Present | "Personal brand for B2B freelancing" |
| 4.2 | **11ai** | https://ai.rj11.io/ | 2026 – Present | "Open source AI skills, plugins, and workflows" ([C]: "Open source AI skills and plugins") |
| 4.3 | **11bench** | https://bench.rj11.io/ | 2026 – Present | "Open source AI benchmarks" |
| 4.4 | **Modern Github** | https://github.com/rj11io | 2023 – Present | "Modern Github for AI open source projects" |
| 4.5 | **Legacy Github** | https://github.com/ricardojrmcom | 2020 – 2023 | "Legacy Github with the open source code I produced 2020-2023" |

Notes on handling:

- 4.2's description differs slightly between the two CVs; [X] is the superset
  ("workflows" added), so the README follows [X].
- 4.5's link annotation in the PDF is `https://github.com/ricardojrmcom?tab=repositories`.
  The README links the bare profile URL, which is the same destination minus a UI tab
  parameter, and reads better as link text.
- 4.2 and 4.3 both started in 2026, and today is 25 July 2026. The README says they
  started "this year" — true at the time of writing and a fact a reader can date from
  the page. It is the one phrase in the README that will need a touch-up next year, and
  it is flagged in §10.
- **No repository counts, star counts, download figures or contributor numbers appear
  anywhere.** Neither PDF contains any, and I did not go looking for any.

---

## 5. Employment history — established fact

Names, employers, titles and dates below are transcribed exactly. Where [C] and [X]
differ, [X] is the superset and I say what [C] left out.

**5.1 · AI Product Engineer · rj11io · https://www.rj11.io/ · Mar 2025 – Present · B2B, remote**
"Hands-on AI product engineering for multiple early-stage startups, building projects
from the ground up." [X] lists nine items: AI data extraction from PDFs; AI SEO
analytics; GenAI dermatopathology portal; real estate platform; multiple cybersecurity
dashboards; multiple proprietary data explorers; multiple AI chats / GPT experiences;
AI smart scraping agents and n8n workflows; AI agent harnesses, skills and automations.
[C] compresses this and omits the real estate platform and the scraping/n8n line.
*The README uses the full [X] list.* ([X] p3, [C] p1)

**5.2 · Product / Datavis Engineer · Hunt Intelligence, Inc. · https://hunt.io/ · Apr 2024 – Mar 2025 · B2B, remote**
"Left OMEGA to go deep on my specialty, data visualisation for a threat-intelligence
product." Built: a modern TypeScript codebase with the latest Next.js and shadcn/ui;
production and staging environments on Vercel; end-to-end tests with Playwright; CI/CD
on GitHub Actions; automated release changelogs hooked up to Slack; custom data
visualisation components "like the IP History Widget"; core product modules "like
**AttackCapture™** and **HuntSQL™**"; and a new API documentation platform built on
OpenAPI — enriching the raw `openapi.json` with metadata and shipping a UI "friendlier
and more intuitive than Swagger". ([X] p3, [C] p2)

Trademark symbols on AttackCapture™ and HuntSQL™ are in the source and are preserved.

**5.3 · Senior Frontend Engineer → Team Lead · OMEGA Systems · https://www.omegasys.eu/ · Jun 2023 – Apr 2024 · remote**
Joined to build the next generation of OMEGA's iGaming platform management system,
**CORE5**, with TypeScript and React. Promoted to lead the frontend team. Work:
data visualisation for the Main and Social dashboards plus report and configuration
views (Cashback, Refer-a-Friend, Pending Withdrawals, Challenges / Leaderboards); the
localisation / internationalisation module; an internal "Tab System" UI. As lead: the
"New Developer" onboarding experience; standards for tickets, documentation and
remote/async workflows "with strong emphasis on the 'Definition of Done'"; weekly
"TED" talks to bring the team up to speed on technology and product; and "kept
shipping: product-engineered new features from scratch, end to end". ([X] p4, [C] p2)

**5.4 · Senior Frontend Engineer · Phantasma Chain · https://phantasma.info/ · Jan 2022 – May 2023 · remote**
Built a frontend monorepo for all the new tools and apps; designed and developed the
**Phantasma UI Storybook**; built **Phantasma Explorer**; tests with Playwright, CI
with GitHub Actions, CD with Vercel; contributed improvements to the **Phantasma
TypeScript SDK**; built in-house tools — a custom React hook for the Phantasma SDK,
localisation, white-label theming, environment configs, and a custom API / scripts /
hooks module. ([X] p4, [C] p2)

**5.5 · Frontend Lead · BinaryEdge · Coalition, Inc. · https://www.coalitioninc.com/ · Feb 2020 – Oct 2021 · remote**
Frontend Engineer and Tech Lead for BinaryEdge and Coalition's Customer Security team.
Started as a solo frontend engineer and grew a team focused on customer-facing security
apps and internal tools. Introduced React, TypeScript, Material-UI, Nivo and Next.js
to the frontend stack, "plus the concept of micro frontends". Work: **Attack Surface
Monitoring (ASM)** on the BinaryEdge Portal as a micro frontend, later integrated into
**Coalition Explorer** and **Coalition Control**; Tech Lead for Coalition Explorer and
"the more ambitious Coalition Explorer 2.0, housing critical internal tools for the
whole company"; claims management, report generation, security review and Executive
Risks platforms inside Coalition Explorer; Tech Lead for the **Coalition Storybook**,
the Customer Security Web UI component library, and the data visualisations; Tech Lead
for the RSA and Security Week marketing pages; migrated frontend CI/CD from Drone to
GitHub Actions. ([X] p5, [C] p2)

Note the two company names: BinaryEdge was the team, Coalition, Inc. the parent; [C]
writes it "BinaryEdge · Coalition, Inc." and the link goes to coalitioninc.com. The
README keeps both names and the same link.

**5.6 · Fullstack Engineer, Co-Founder · Glaiveware · Lisbon, Portugal · Mar 2018 – Dec 2019 · remote**
"A great learning experience that taught me how to manage projects and run a business
creating bespoke web apps above market standards." JavaScript and TypeScript: React,
Redux, Redux-Saga, Next.js, Node.js, Express. Material-UI, HTML5 + CSS3 (Bootstrap 4,
SASS). Databases: MongoDB, Firebase, MySQL, SQLite. Infrastructure: AWS (EC2, S3, SES,
API Gateway, Lambda), Ubuntu, nginx. "Beyond code: SEO & SEM, branding & design,
marketing & advertising, copywriting & content management." ([X] p5)

[C] compresses this to "co-founder at Glaiveware, building bespoke web apps (2018 -
2019)". **Date conflict:** [X] says Mar 2018 – Dec 2019; [C]'s "2018 - 2019" is
consistent. No conflict, just less precision. The README uses [X]'s months.

**5.7 · React Native Developer · Sycret.ink · Neuchâtel, Switzerland · Jan 2017 – Dec 2017 · remote**
"Mobile chat app with end-to-end encryption in a serverless environment, developed
under contract with a team of three. Learned a lot about encryption protocols and
mobile app deployment." React Native, libsignal-protocol, Android Studio; AWS (API
Gateway, Lambda), SQLite. ([X] p6; [C] p2 as "React Native chat app with end-to-end
encryption at Sycret.ink (2017)")

**5.8 · Full Stack JavaScript Developer · American Heart Association · Sep 2016 – Nov 2016 · remote**
Built an admin dashboard for the AHA's Kinect integration: "interfaced users with the
collected data, connected doctors and their patients, printed reports, and let
superusers manage the whole system." Acquired through a **university scholarship with
free choice of technology**, so it became his first web app as a full-stack JavaScript
developer, using React and Node. ([X] p6; [C] p2 as "full-stack dashboard for the
American Heart Association (2016)")

**5.9 · Frontend Developer · NextBitt · Lisbon, Portugal · Oct 2015 – Jul 2016**
"Created analytics dashboards and reporting, auditing, and management tools for
NextBitt's asset & facilities management software." JavaScript (jQuery, Angular.js),
.NET (C#, MVC), HTML5 + CSS3. "Heavy date/time logic (Moment.js, date pickers) and
data visualisation (Google Charts, dygraphs, Chart.js, d3.js, C3.js, and more)."
([X] p6; [C] p2 as "analytics dashboards at NextBitt (2015 - 2016)")

**5.10 · Java Developer · Science4you · Lisbon, Portugal · Jan 2015 – Mar 2015**
Internship. "Built a management system for the online store using Java and MySQL. What
started as a simple display-and-print tool for the back office evolved into a full
application managing orders, printing detailed reports, and sending automated emails
to customers. Which all were previously done by hand." ([X] p6)

**Difference worth naming: [C] omits Science4you entirely.** Its "Earlier:" line starts
at Glaiveware in 2018 and reaches back only to "analytics dashboards at NextBitt (2015
- 2016)". So the concise CV's earliest job is NextBitt, while the extended CV's is
Science4you, three months earlier. The README includes Science4you inside the collapsed
history, because [X] is the fuller record and the two do not contradict each other —
one is simply shorter.

---

## 6. Skills — established fact

[X] p2 has six groups; [C] p1 has four. [X] is the superset in every case. **Additions
that exist only in [X]:** Material-UI and "Refactoring UI" under UI & Design; Web
Scraping and Data Enrichment under Data & Visualisation; and the whole "Foundations"
group. **[C] merges** UI and Data into one "UI & Data" group.

The README follows [X] and keeps his own grouping, because the grouping is itself
information — it shows how he sees his own work.

| Group ([X] wording) | Items |
| :--- | :--- |
| Core Stack | TypeScript · React.js · Next.js · AI SDK · Convex · Playwright · Vercel |
| AI Engineering | Agent Automations · Custom Agent Skills · Harness Engineering · Codex · Claude Code · n8n |
| UI & Design | Tailwind CSS · shadcn/ui · Material-UI · Design Systems · Storybook · Refactoring UI |
| Data & Visualisation | Dashboards · Data Visualisation (d3 · Recharts · Nivo) · Web Scraping · Data Enrichment |
| Leadership & Delivery | Team & Project Management · End-to-End Product Engineering · Product Design · Agile Methodologies |
| Foundations | JavaScript · Node.js · HTML5 · CSS · Git · GitHub Actions · REST APIs · CI/CD · Testing |

He spells it "visualisation" (British English) throughout both PDFs. The README keeps
his spelling.

---

## 7. Education — established fact

**IT Systems Management and Programming**, Escola Profissional de Tecnologia Digital,
Lisbon, Portugal, **2013 – 2016**. Portuguese title: *Técnico de Gestão e Programação
de Sistemas Informáticos*. ([X] p6; [C] p2 without the city or the Portuguese title)

---

## 8. Origin story — established fact

All from [X] p1, with the same material condensed under "FUN FACTS" in [C] p1.

| # | Fact |
| :--- | :--- |
| 8.1 | Started coding young, "purely for fun" |
| 8.2 | Modding and reverse-engineering games and consoles |
| 8.3 | Built his own fighting game on the **MUGEN engine** |
| 8.4 | Ran dedicated servers for **Counter-Strike**, **Minecraft**, "and half the titles I grew up on" |
| 8.5 | At **14**, programming **LEGO Mindstorms** robots in science class |
| 8.6 | Team took **second place nationally** and reached the **final four of the 2008 robotics world cup in China** |
| 8.7 | Competitive gaming: led teams, guilds and clans "to the top of online ladders and to LAN tournament wins" |
| 8.8 | He calls this "management training in disguise: recruiting, coaching, and keeping a roster of hyperactive remote teenagers aligned on one strategy" |

Care with 8.5 and 8.6: [X] gives his age as 14 and the world cup year as 2008, and says
the team placed second nationally *and* reached the final four in China. [C] states the
same two results without the age or the school context. I have not merged these into a
tidier claim — for example I never say he "won" anything, because neither PDF does.

---

## 9. What the README says, and why

### 9.1 Voice

RJ's own writing is direct, concrete and unpretentious, with dry humour ("half the
titles I grew up on", "hyperactive remote teenagers", "Which all were previously done
by hand", and the sign-off "Have a nice day!"). It uses first person, short sentences,
and almost no adjectives about himself — the one exception being the self-guided
missile line, which is a metaphor rather than a boast.

The README is written in that register: **first person, plain words, active voice, no
adjective padding, no emoji, one joke allowed per section at most.** Where his phrasing
is already better than anything I would write, I keep his phrasing. His British
spelling and his own capitalisation of product names are preserved.

Two things I consciously avoided, because they would read as generated rather than
written: strings of superlatives ("passionate", "results-driven", "cutting-edge"), and
the three-word-fragment rhythm that plagues AI copy.

### 9.2 Opening hook

The banner carries name, role and city. The first line of text then does the work:

> **I've been taking systems apart since long before anyone paid me to.** Games and
> consoles, dedicated servers, LEGO robots. The habit stuck — I just build them now
> instead.

*This is editorial voice, not a quote.* It compresses 8.1–8.5 — a teenager
reverse-engineering games and consoles, running dedicated servers, programming LEGO
Mindstorms — and it sets up the through-line that holds the whole profile together: the
same instinct now goes into agent harnesses. It is the one passage in the README written
to be memorable, and it is honest, because each of the three things it names is a fact
in §8, and the turn at the end ("I just build them now") is a characterisation of §2 and
§3 rather than a new claim.

An earlier draft said "taking *things* apart" and followed with "then dashboards and the
products around them". I changed it: he did not take dashboards apart, he built them, so
the sentence was quietly stretching. Naming the three things he really did take apart is
both truer and more specific.

The self-guided missile line (2.13) follows as a pull quote, close to verbatim. It is
the strongest sentence RJ wrote about himself and it belongs near the top.

### 9.3 Section order, and the reasoning

A visitor arrives with questions in a predictable order. The sections answer them in
that order.

1. **Banner + intro** — who is this, and what do they do now? (§1, §2, §3)
2. **What I'm building now** — is there something here I can look at today? Current
   AI and open-source work first, because the brief asks for it and because it is the
   most GitHub-relevant thing about him. (§4)
3. **What companies hire me for** — the first-frontend-hire pattern (2.5–2.7), stated
   in one sentence and then drawn once as a diagram.
4. **Selected work** — is he credible? Five roles from 2020 on, visible; 2015–2019 and
   education collapsed. (§5, §7)
5. **Stack** — what does he actually know? (§6)
6. **Before this was a job** — is he interesting? The origin story, which is the most
   memorable material he has. (§8)
7. **Where to find me** — how do I reach him? (§1)

The 2020 cut in step 4 is not arbitrary: it matches RJ's own division of his work into
a "Legacy Github" (2020–2023) and a "Modern Github" (2023–present) in 4.4–4.5. His
public code starts in 2020, so that is where a GitHub visitor's interest starts.

### 9.4 Calls to action

Two, kept separate, following the pattern in `research.md` §3:

- **Look at the work** — the three project sites and the two GitHub accounts, in the
  projects section, near the top where a curious visitor is still reading.
- **Get in touch** — the last section: site, both CV lengths, LinkedIn, email.

The closing lines are his own (2.12 context, [X] p2): "I'm always open to exploring
exceptional opportunities. Reach out if you're keen on working together." followed by
his sign-off, "Have a nice day!" I kept the sign-off because it is disarming, it is
genuinely his, and it is the opposite of generated copy.

### 9.5 Terms defined in plain words on first use

- **agent harness** — "the scaffolding that lets an AI agent run a real job on its
  own." This is my plain-language gloss, not a quote. Both PDFs use the term without
  defining it.
- **micro frontend** — "independently deployable slices of one web app." Also my
  gloss; [X] 5.5 uses the term bare.
- **data explorer** — left in his words ("proprietary data explorers") but placed
  beside "dashboards" so context carries it.

### 9.6 The one diagram

A three-node Mermaid flowchart of the pattern in 2.5–2.7: day-one foundations → a
shipped product → growing the team, with a labelled arrow ("keeps shipping") looping
back. It is drawn because that loop is the most distinctive repeated fact in his career
and it is hard to feel as a list. The sentence above it states the same thing in words,
so if Mermaid does not render, no fact is lost. Nothing in the diagram is invented —
every node label maps to 2.6 and 2.7, and the edge label maps to "kept shipping:
product-engineered new features from scratch, end to end" in 5.3.

It is laid out top-down rather than left-to-right purely for narrow screens; the
measurements behind that are in `research.md` §5.

---

## 10. Omitted material, and why

Nothing below was cut for being unflattering. It was cut for length, or because a
GitHub visitor would not act on it.

| Omitted | Source | Why |
| :--- | :--- | :--- |
| Full sub-feature lists at OMEGA — Cashback, Refer-a-Friend, Pending Withdrawals, Challenges / Leaderboards | 5.3 | Feature names inside one employer's product. Summarised as "report and configuration views". Kept in this file. |
| Coalition Explorer sub-platforms — claims management, report generation, security review, Executive Risks | 5.5 | Same reason; "critical internal tools" carries the point in less space. |
| Phantasma in-house tools — custom SDK hook, white-label theming, environment configs, API/scripts/hooks module | 5.4 | Too granular for a profile; the monorepo, Storybook, Explorer and SDK contributions are the headline. |
| The full Glaiveware technology list, and the AWS and database inventories from 5.6–5.7 | 5.6, 5.7 | 2018-era stack detail. Listing MongoDB and Bootstrap 4 today would misrepresent what he works in now. |
| RSA and Security Week marketing pages | 5.5 | Real, but marketing pages undersell a tech-lead role next to Explorer 2.0. |
| "Refactoring UI" as a listed skill | §6 | It is a book, and reads oddly in a skills line without explanation. |
| "Definition of Done" and the weekly "TED" talks — *partly kept* | 5.3 | The TED talks stayed: they are specific, unusual and show how he leads. "Definition of Done" was cut as process vocabulary a visitor will not act on. |
| Portuguese job title *Técnico de Gestão e Programação de Sistemas Informáticos* | §7 | Kept, but inside the collapsed history where it costs nothing. |
| "Wearing every hat a startup has" (2.14) | 2.14 | Cut. It is true, but it dilutes the sharper claim that he defaults to product engineering. |
| The phrase "a decade of professional TypeScript experience" | 2.A | Cut on accuracy grounds. See Conflict 2.A. |
| Age at the robotics world cup — *kept* | 8.5 | Kept. "At 14" is what makes 8.6 land. |

### Material I could have added and did not

- **No repository, star, follower or commit statistics.** Not in the PDFs, so not in
  the README. See §3 for the additional reason this would be actively misleading here.
- **No claim about what `11` means.** See §1.
- **No technology I could not source.** For instance, I did not add "Python" or
  "Docker" because they seem plausible for the role. Neither appears in either PDF.
- **No links beyond the ten in the PDFs.** No X/Twitter, no blog, no Bluesky, no
  sponsor button — none of them appear in the sources, so none of them appear in the
  README.

---

## 11. Maintenance notes for whoever edits this next

- **Zero external dependencies.** The README makes no third-party network requests.
  The only assets are `assets/banner-light.svg` and `assets/banner-dark.svg`, both
  local, both hand-written, both under 2 KB.
- **Two phrases will age:** "Started this year" on `11ai` and "Also started this year"
  on `11bench` (§4). Written 25 July 2026. Change both to "Since 2026" at the turn of
  the year.
- **Nothing else in the file rots.** No "last updated" line, no counts, no dated claims
  beyond employment ranges, which are historical and stay true.
- **To add freshness properly**, use the pattern in `research.md` §3: a GitHub Actions
  workflow that rewrites content between HTML comment markers and commits it, so the
  rendered page still needs no third-party service at request time. I did not build
  this, because I cannot invent activity and the evaluator cannot run a workflow on
  RJ's account.
- **If a section has to go**, cut §6 Stack first — it is the most replaceable, since
  the work described in the roles already demonstrates most of it.
- **The banner SVGs use presentation attributes only** — no `<style>` blocks, no
  gradients, no `dominant-baseline`. That is intentional; see `research.md` §6 before
  editing them.
