import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "dashboard.tsx",
    "page.tsx",
    "app/codex-gpt5.4-high/**",
    "app/codex-gpt5.4-light/**",
    "app/codex-gpt5.4-medium/**",
    "app/codex-gpt5.4-xhigh/**",
    "app/codex-gpt5.4mini-high/**",
    "app/codex-gpt5.4mini-light/**",
    "app/codex-gpt5.4mini-medium/**",
    "app/codex-gpt5.5-high/**",
    "app/codex-gpt5.5-light/**",
    "app/codex-gpt5.5-medium/**",
    "app/codex-gpt5.5-xhigh/**",
    "app/codex-gpt5.6-luna-high/**",
    "app/codex-gpt5.6-luna-light/**",
    "app/codex-gpt5.6-luna-medium/**",
    "app/codex-gpt5.6-luna-xhigh/**",
    "app/codex-gpt5.6-terra-high/**",
    "app/codex-gpt5.6-terra-light/**",
    "app/codex-gpt5.6-terra-medium/**",
  ]),
]);

export default eslintConfig;
