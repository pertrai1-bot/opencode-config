---
description: Scan for stale operational files and cleanup candidates without deleting anything.
---

# Clean Command

Scan this workspace for stale operational files, completed task state, and temporary summaries. This command is non-destructive.

Arguments: `$ARGUMENTS`

## Scan Targets

### Task State

- Check `.planning/tasks/` for completed features.
- Report completed features that may be archived after their work has shipped.
- Report invalid task state by suggesting `/task-status validate [feature]`; do not mutate task JSON.

### Handoffs

- Check `.agents/handoff.md` and `.agents/handoff-log.md` if present.
- Report age, size, and whether the handoff appears stale.
- Suggest `/context-handoff` when the file should be refreshed before reuse.

### Temporary And Summary Files

- Scan the repository root and common temp folders for:
  - `SESSION-*.md`
  - `*SUMMARY*.md`
  - `*OVERVIEW*.md`
  - `*.tmp`
  - `.tmp/`
- Recommend whether each item should be harvested into context, archived, or deleted manually.

### Context Size Candidates

- Report `context/**/*.md` files over 200 lines as MVI review candidates.
- Do not compact files automatically.

### Improvement Memory

- Check `docs/ERRORS.md` when present.
- Report active error entries with 1-2 occurrences and no recurrence for 30+ days as retirement candidates.
- Report active error entries with 5+ occurrences as automation candidates when Prevention does not mention an automated check.
- Report a stale `Last Review` date as a prompt to run the monthly error-memory review.

### Decision And Pattern Hygiene

- Check `docs/decisions/*.md` for decisions whose `status` is not `active`, `superseded`, or `retired`.
- Report decision logs missing `Rejected Alternatives` or `Consequences` as completion candidates.
- Check `context/project-intelligence/patterns/*.md` for missing `status` frontmatter.
- Report patterns that appear stale, duplicated, or never referenced by `context/INDEX.md`, `README.md`, `AGENTS.md`, commands, profiles, or skills.

## Output

```md
# Cleanup Scan

## Summary

- Completed task features: <count>
- Stale handoff candidates: <count>
- Temporary/summary files: <count>
- Context MVI candidates: <count>
- Error-memory review candidates: <count>
- Decision/pattern hygiene candidates: <count>

## Findings

- `<path>` - <why it is a cleanup candidate>

## Suggested Manual Actions

1. <action and command if safe>
```

## Rules

- Never delete, archive, move, or rewrite files during this command.
- Treat cleanup recommendations as suggestions requiring explicit user approval.
- Preserve other-agent and user work in dirty worktrees.
- Do not rewrite, retire, or automate error entries or decisions without explicit user approval.
