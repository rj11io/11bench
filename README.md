# 11bench

AI benchmark experiments for comparing how coding agents solve the same
product and design tasks.

The current website is deployed at [bench.rj11.io](https://bench.rj11.io/).

## Repository layout

| Path | Purpose |
| --- | --- |
| [`www/`](www/) | Current Next.js website for 11bench |
| [`v1/cv-design-bench/`](v1/cv-design-bench/) | Completed CV design benchmark with 11 model runs and measured costs |
| [`v1/gh-readme-bench/`](v1/gh-readme-bench/) | Reference content for a GitHub README benchmark |
| [`v1/_app-boilerplate_/`](v1/_app-boilerplate_/) | Reusable Next.js and shadcn/ui starter for v1 benchmarks |

## Run an app locally

Each app has its own `package.json` and lockfile; this repository is not an
npm workspace. Change into the app you want to run, then install and start it:

```bash
cd www
npm install
npm run dev
```

Use `v1/cv-design-bench` or `v1/_app-boilerplate_` instead of `www` to run
those apps. Their available scripts are the same:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run format` | Format TypeScript and TSX files with Prettier |

No environment variables are currently required by these apps.

## Releases

The root `package.json` contains only the semantic-release tooling. Pushes to
`main` run the release workflow, which derives releases from commit messages,
updates `CHANGELOG.md`, and publishes the GitHub release.
