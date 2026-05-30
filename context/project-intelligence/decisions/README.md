---
type: project-intelligence
purpose: Decision-log workflow for this opencode config repo.
triggers: changing config structure, workflow policy, context layout, or cross-cutting conventions
---

# Config Decisions

Use this directory for durable decisions about this config repo.

## When To Write A Decision

Write a decision file when all are true:

- The choice affects future config maintenance or agent behavior.
- There were at least two plausible alternatives.
- The reasoning is not obvious from the changed files alone.
- A future agent might otherwise re-decide or reverse the choice.

## Naming

Name files after the decision domain:

```text
context-system-location.md
angular-rules-boundary.md
```

## Lightweight Format

```md
---
type: project-intelligence
decision: short-decision-domain
status: active
triggers: when to read this decision
---

# Title

## Context
## Decision
## Rejected Alternatives
## Consequences
```

## Read Before Changing

- Context layout or navigation.
- Agent, skill, command, or rule storage conventions.
- Phase tracker structure.
- Durable workflow policies in `AGENTS.md`.
