---
type: decision-index
purpose: Durable decision logs for repo policy, process, architecture, and cross-cutting conventions.
triggers: changing repo policy, workflow conventions, architecture boundaries, or durable agent behavior
---

# Decision Logs

Use this directory for durable decisions that future agents should not need to rediscover.

## Read Before Changing

Scan decision frontmatter before changing:

- Repo policy or contributor workflow.
- Agent, skill, command, profile, or context conventions.
- Architecture boundaries or cross-cutting process rules.
- Eval, verification, or improvement-loop behavior.

Open only matching active records by `domain`, `triggers`, and `applies_to`.

## Write When

Write a decision log when all are true:

- The task set, changed, or explicitly confirmed a durable policy or convention.
- At least two plausible alternatives were considered.
- The reasoning is not obvious from the diff alone.
- A future agent would likely re-decide or reverse the choice without context.

## File Naming

```text
docs/decisions/YYYY-MM-DD-<decision-domain>.md
```

Name the decision domain, not the selected outcome.

## Required Shape

Every decision log must include YAML frontmatter with:

- `date`
- `task`
- `domain`
- `kind`
- `scope`
- `status`
- `triggers`
- `applies_to`
- `supersedes`

Every decision body must include:

- Context
- Decision
- Rejected Alternatives
- Consequences

Use `templates/decision-log.md` as the canonical template.
