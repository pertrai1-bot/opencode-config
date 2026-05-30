---
type: project-intelligence
purpose: Pattern harvesting workflow for this opencode config.
triggers: after repeated maintenance work reveals a reusable approach
---

# Patterns

Use this directory for reusable maintenance patterns discovered while evolving this config.

## What Qualifies

- A repeated approach that made config maintenance safer or faster.
- A convention that future agents should reuse across files.
- A validation technique that caught real issues.
- A workflow adaptation that is useful beyond one task.

## What Does Not Qualify

- One-off implementation details.
- Obvious Markdown or shell usage.
- Temporary session notes.
- Decisions with tradeoffs, which belong in `decisions/`.

## Suggested Pattern Format

```md
---
type: project-intelligence
pattern: short-pattern-name
status: active
triggers: when agents should read this pattern
---

# Pattern Title

## Use When
## Steps
## Example
## Watch For
```

## Review Cadence

When maintaining this config over multiple phases, review patterns for stale or duplicated guidance and compact them into the smallest useful form.
