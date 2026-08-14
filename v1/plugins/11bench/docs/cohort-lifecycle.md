# Cohort lifecycle

## Draft

Drafting is creative and editable. Refine prompt, inputs, template, skills, and permissions. A draft may be cloned. It cannot prepare candidates.

## Freeze

Freezing is a validation and sealing transition. 11bench records hashes for the prompt, input tree, template tree, and pinned skills, plus a source revision when available. It requires enforced isolation policy.

## Append runs

After freezing, append candidate runs without modifying cohort sources. New models belong in the existing cohort when they can honor the exact contract.

## Change the experiment

Clone a new draft cohort when any frozen element changes. Never edit and rehash a cohort that already has runs. Suggested ids describe the condition, not a date or model, for example `baseline`, `accessibility-skill`, or `prompt-v2`.
