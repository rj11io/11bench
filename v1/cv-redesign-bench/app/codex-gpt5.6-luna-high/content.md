# Canonical content model

This run renders from [`content.ts`](./content.ts), which is the structured
canonical model for the website. This document records the evidence,
editorial decisions, and uncertainty behind that model.

## Evidence set

- `ref/RJ_CV.pdf` (2 pages): the candidate's intentionally compressed CV.
- `ref/RJ_CV_max.pdf` (6 pages): the candidate's expanded CV, used for the
  complete chronology and project detail.

Both PDFs were extracted with the bundled `pypdf` runtime and visually checked
after rendering. The expanded PDF is more detailed, not contradictory, for
most roles; the short PDF is treated as a prioritization signal.

## Directly extracted facts

- Name: Ricardo Jorge; preferred short name: RJ.
- Title: AI Product Engineer.
- Lisbon, Portugal; `ricardojorgexyz@gmail.com`; `rj11.io`; GitHub
  `github.com/rj11io`; LinkedIn `linkedin.com/in/rj11io`; CV site `cv.rj11.io`.
- Professional TypeScript experience is described as “a decade”; React since
  2016; Next.js since 2018.
- Roles, employers, dates, locations, company links, projects, technologies,
  education, and claims in `content.ts` are transcribed from the PDFs.
- The 2008 robotics claim is “second nationally” and “final four” at the
  robotics world cup in China with LEGO Mindstorms.
- Early experience begins with Science4you in 2015, followed by NextBitt,
  American Heart Association, Sycret.ink, Glaiveware, BinaryEdge / Coalition,
  Phantasma Chain, OMEGA Systems, Hunt Intelligence, and rj11io.

## Editorial inference and rewriting

- The opening summary is rewritten from the two “About me” sections to make
  the candidate's value legible in the first scan: AI product engineering,
  data-heavy products, first-frontend ownership, and team enablement.
- Bullets use active verbs and group adjacent technologies with the product
  or delivery outcome described by the source. No metric, client, scope, or
  achievement is added.
- “Senior Frontend Engineer → Team Lead” is rendered as “Senior Frontend
  Engineer to Team Lead” for plain-text and print robustness; the promotion
  claim is preserved.
- The “highlights” strip is a compact restatement of the source's explicit
  chronology and “decade” claim, not a new performance metric.
- “B2B” and “Remote” are retained only where the expanded PDF explicitly
  includes them.

## Reconciliation, uncertainty, and links

- The short PDF lists `11aiai.rj11.io` and `11benchbench.rj11.io` in extracted
  text; visual rendering makes those labels look shorter in places. The
  expanded PDF uses the same `11aiai.rj11.io` and `11benchbench.rj11.io`
  domains, so those are the canonical project URLs.
- `rj11.io`, `hunt.io`, `omegasys.eu`, `phantasma.info`, and
  `coalitioninc.com` are taken from the employer/project links shown in the
  PDFs. The source does not supply links for Glaiveware, Sycret.ink, American
  Heart Association, NextBitt, or Science4you, so those entries have no
  invented company links.
- “Built with AI since the first releases of Copilot, ChatGPT, and MidJourney”
  appears only in the expanded PDF. It is intentionally compressed to the
  current AI engineering capability description; no start date is inferred.
- The expanded PDF says “a team of three” for Sycret.ink; that detail is kept.
- The source does not provide formal degree level, phone number, or quantified
  product outcomes. None is invented.

## Two-page compression choices

- The long autobiographical opening is compressed to two paragraphs. The
  games, competitive gaming, and robotics stories move to a small Interests
  section so they remain humanising without competing with experience.
- The highest-signal recent roles (rj11io, Hunt, OMEGA) receive the most detail
  on page 1; Phantasma and BinaryEdge follow on page 2; earlier roles are
  retained as concise one-bullet entries. The two humanising interests bullets
  use the remaining page-1 whitespace so page 2 can finish with all project
  links.
- The skills taxonomy is kept but tightened to five scan-friendly groups.
- All five project / GitHub items are retained as compact links at the end of
  page 2; the two GitHub entries share one visual line to protect the exact
  two-page limit. The old short-PDF closing sentence about reading the long CV
  is not rendered because it is an instruction to the reader, not candidate
  evidence.
