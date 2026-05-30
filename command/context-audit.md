---
description: Audit context navigation, MVI size, and harvest candidates without modifying files.
---

# Context Audit Command

Audit this config repository's context system and identify maintenance opportunities. This command is lightweight and non-destructive.

Arguments: `$ARGUMENTS`

## Default Behavior

When invoked with no arguments, run a read-only context audit.

## Checks

### Navigation Integrity

- Read `context/INDEX.md`.
- Extract local file paths referenced in the index.
- Verify each referenced file exists.
- Report context files not referenced by `context/INDEX.md` as possible orphan candidates.

### MVI Size

- Count lines in `context/**/*.md`.
- Report files over 200 lines as MVI review candidates.
- Recommend splitting, compacting, or moving verbose material to a reference file only when useful.

### Usefulness Signals

- Check context frontmatter for optional `last-reviewed: YYYY-MM-DD`.
- Report context files missing `last-reviewed` as adoption candidates, not errors.
- Report context files with `last-reviewed` older than 90 days as review candidates.
- Check `context/project-intelligence/patterns/*.md` for `status: active | retired | superseded`.
- Report active patterns that are not referenced from `context/INDEX.md`, `README.md`, `AGENTS.md`, `command/*.md`, `profiles/*.md`, or `skills/*/SKILL.md` as possible usefulness-review candidates.

### Harvest Candidates

- Scan the repository root and common working folders for summary-like files:
  - `SESSION-*.md`
  - `*SUMMARY*.md`
  - `*OVERVIEW*.md`
  - `CONTEXT-*.md`
  - `.tmp/**/*.md`
- Suggest durable destinations under `context/project-intelligence/`, `context/system/`, or `rules/` when obvious.

### Staleness Signals

- Check whether `context/INDEX.md` mentions files that have moved or been deleted.
- Check whether `README.md` and `AGENTS.md` point to the same context entry points.
- Report contradictions as warnings.

## Output

```md
# Context Audit

## Summary

- Indexed context files: <count>
- Missing index references: <count>
- Possible orphans: <count>
- Files over 200 lines: <count>
- Harvest candidates: <count>
- Missing last-reviewed markers: <count>
- Stale last-reviewed markers: <count>
- Pattern usefulness candidates: <count>

## Findings

- `<path>` - <finding and recommendation>

## Suggested Next Actions

1. <manual action>
```

## Rules

- Do not create, move, compact, or delete context files.
- Keep recommendations aligned with the MVI convention in `context/system/conventions.md`.
- Treat missing or stale usefulness signals as prompts for review, not reasons to delete context.
- If deeper context restructuring is needed, recommend a separate planned change rather than doing it inside this audit.
