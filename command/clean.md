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

## Output

```md
# Cleanup Scan

## Summary

- Completed task features: <count>
- Stale handoff candidates: <count>
- Temporary/summary files: <count>
- Context MVI candidates: <count>

## Findings

- `<path>` - <why it is a cleanup candidate>

## Suggested Manual Actions

1. <action and command if safe>
```

## Rules

- Never delete, archive, move, or rewrite files during this command.
- Treat cleanup recommendations as suggestions requiring explicit user approval.
- Preserve other-agent and user work in dirty worktrees.
