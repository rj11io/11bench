---
name: 11bench-update-pricing
description: Verify and update 11bench's standalone temporal model pricing catalog from official provider sources. Use before preparing an unpriced model or when pricing is stale or historically incomplete.
---

# Update pricing

Read `references/provider-sources.md` and `../../docs/pricing.md`.

1. Identify unmatched or stale provider/model entries.
2. Verify current and historical rates using official provider sources only.
3. Preserve effective dates, detection dates, source URLs, and change types.
4. Edit `references/pricing.json`.
5. Validate and synchronize the run analyzer copy:

```sh
node scripts/sync-pricing-catalog.mjs --write
```

Never guess a price. Keep unknown rates null and report them as unavailable. This skill owns its catalog and has no dependency on another plugin.
