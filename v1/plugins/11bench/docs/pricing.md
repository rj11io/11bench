# Pricing

11bench keeps a standalone temporal catalog under `11bench-update-pricing/references/pricing.json`. Run preparation checks whether provider and model match the catalog. Operators may explicitly allow an unpriced model, but analytics must expose unknown cost.

Use official provider sources only. Record price periods, verification date, effective date when official, detection time otherwise, change type, notes, and source URL. Never infer subscription value, credits, or quota as API cost.

After editing the canonical catalog, run `sync-pricing-catalog.mjs --write`. This validates entries and synchronizes the exact-task analyzer's bundled copy. Regenerate affected analytics after a pricing correction.
