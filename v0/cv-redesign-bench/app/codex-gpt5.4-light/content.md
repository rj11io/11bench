# Canonical Content Model

Rendered source: `app/codex-gpt5.4-light/content.ts`

This file documents what was extracted directly, what was rewritten editorially, what was compressed for the two-page limit, and what remains uncertain.

## Source reconciliation

Primary evidence:

- `ref/RJ_CV.pdf` is the concise two-page CV.
- `ref/RJ_CV_max.pdf` is the six-page expanded CV with more narrative and fuller role detail.

Reconciliation approach:

- Used `RJ_CV.pdf` as the baseline for what the candidate already considers essential enough for a two-page version.
- Used `RJ_CV_max.pdf` to restore missing dates, older roles, fuller bullet detail, and clarify ambiguous summaries.
- Where both PDFs overlap, retained the shared fact pattern and rewrote only for clarity and scanability.
- Where the long version added extra narrative voice without adding factual content, compressed it rather than reproducing it.

## Directly extracted facts

- Name: Ricardo Jorge
- Current title: AI Product Engineer
- Location: Lisbon, Portugal
- Contact endpoints: `ricardojorgexyz@gmail.com`, `rj11.io`, `github.com/rj11io`, `linkedin.com/in/rj11io`
- Experience chronology:
  - AI Product Engineer, `rj11io`, Mar 2025 - Present
  - Product / Datavis Engineer, Hunt Intelligence, Apr 2024 - Mar 2025
  - Senior Frontend Engineer -> Team Lead, OMEGA Systems, Jun 2023 - Apr 2024
  - Senior Frontend Engineer, Phantasma Chain, Jan 2022 - May 2023
  - Frontend Lead, BinaryEdge / Coalition, Feb 2020 - Oct 2021
  - Earlier roles at Glaiveware, Sycret.ink, American Heart Association, NextBitt, Science4you
- Education:
  - IT Systems Management and Programming
  - Escola Profissional de Tecnologia Digital
  - 2013 - 2016
- Repeated stack claims:
  - TypeScript decade
  - React since 2016
  - Next.js since 2018
  - AI work since early Copilot / ChatGPT era

## Editorial rewrites

These improve clarity without changing the factual claim:

- "Hands-on AI product engineering for multiple early-stage startups, building projects from the ground up."
  - Derived from both PDFs' current-role summaries.
- "Focused on data visualization for a threat-intelligence product on a modern TypeScript stack."
  - Condenses Hunt role narrative and tool list.
- "Joined to build the next generation of OMEGA's iGaming platform management system and was promoted to lead the frontend team."
  - Preserves title progression while removing filler.
- "Built the frontend monorepo and shared UI foundations for a new generation of crypto tools and apps."
  - Compresses the Phantasma role into a scan-friendly one-liner.
- "Started as a solo frontend engineer and grew a team for customer-facing security apps and internal tools."
  - Preserves the BinaryEdge / Coalition leadership thread.

## Inference discipline

Allowed inferences:

- Normalized bare domains to `https://` URLs for working links.
- Grouped tools into clearer buckets such as "UI, systems, data" and "Leadership & delivery".
- Elevated the recurring pattern of "first frontend hire / zero-to-one systems owner" because both PDFs repeatedly support it.

Rejected inferences:

- No invented metrics, growth figures, revenue claims, traffic numbers, or team sizes.
- No inferred degree level beyond what the PDFs state.
- No dates added where the sources did not provide them.
- No claims that specific projects shipped to named customers unless the PDFs explicitly said so.

## Conflicts and uncertainties

- The six-page PDF mentions MidJourney in the AI timeline; the two-page version does not.
  - Resolution: omitted MidJourney and kept the overlap around Copilot and ChatGPT.
- The extracted text loses Portuguese accents in the education credential.
  - Resolution: restored the credential editorially as `Tecnico de Gestao e Programacao de Sistemas Informaticos`.
  - Uncertainty remains if accent marks should be reinstated more precisely from visual inspection.
- The six-page PDF distinguishes modern and legacy GitHub profiles.
  - Resolution: only the current `github.com/rj11io` profile is surfaced in the rendered route because it is the active professional endpoint.

## Omissions and compression choices

Omitted from the rendered route due to the exact two-page print limit:

- The longer personal narrative voice in the six-page "About Me".
- Robotics and gaming background anecdotes.
- The full project-by-project list under the current freelance role.
- Lower-priority tooling details from older roles.
- Secondary employer context like "B2B" and repeated "Remote" markers on every role.
- Legacy GitHub profile.

Compressed but preserved:

- Glaiveware, Sycret.ink, American Heart Association, NextBitt, and Science4you are retained as a compact "Earlier Experience" section rather than full role cards.
- Leadership contributions at OMEGA and BinaryEdge / Coalition are summarized into fewer bullets with stronger verbs.
- Repeated CI/CD and tooling themes are surfaced once per relevant role instead of duplicated everywhere.

## Render contract

- The site must render from `content.ts`, not from a second hardcoded copy.
- `page.tsx` imports `cv` from `content.ts` and maps over that structure for every section.
- Any future content edits should update `content.ts` first, then keep this file aligned with the reasoning.
