# 11bench website

The current Next.js website for 11bench, deployed at
[bench.rj11.io](https://bench.rj11.io/).

The home page is still the starter screen, with the shared theme provider and
shadcn/ui component set ready for the benchmark interface.

## Local development

This app requires Node.js and npm. It does not currently use environment
variables.

```bash
npm install
npm run dev
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run format` | Format TypeScript and TSX files with Prettier |

## Add UI components

The shadcn/ui configuration writes components to `components/ui/` and uses
aliases such as `@/components` and `@/lib`.

```bash
npx shadcn@latest add <component>
```
