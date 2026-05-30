---
description: Run a read-only consistency check for this opencode configuration repository.
---

# Validate Repo Command

Validate this opencode config repository for reference drift between commands, skills, agents, profiles, context, and documentation.

Arguments: `$ARGUMENTS`

This command is read-only. Do not edit files, stage changes, delete files, or auto-fix issues.

## Checks

### Command Files

- List `command/*.md`.
- Verify each command has YAML frontmatter.
- Verify each command frontmatter includes `description`.
- Check whether every command appears in `README.md` or is intentionally omitted with an explanation.

### Skills

- List `skills/*/SKILL.md`.
- Verify each skill directory contains `SKILL.md`.
- Extract local skill references from `AGENTS.md`, `profiles/*.md`, and `context/INDEX.md`.
- Report references to local skills that do not exist under `skills/`.
- Distinguish external skills under `~/.agents/skills/` or `~/.claude/skills/` when visible in the current session; do not require them to exist in this repository.

### Agents

- List `agent/*.md` and `agents/*.md` if either directory exists.
- Verify configured SDLC agent references in `AGENTS.md` exist locally or are known built-ins.
- Known built-ins: `build`, `plan`, `general`, `explore`.
- Report missing local agent files for non-built-in references.

### Profiles

- Verify `profiles/essential.md`, `profiles/developer.md`, `profiles/architect.md`, and `profiles/full.md` exist.
- Verify profile command lists only reference existing `command/*.md` files or broad statements like `all configured commands`.
- Verify `profiles/README.md` lists all profile files.
- Verify `profiles/active-profile` is ignored by git if it exists or is referenced.

### Context

- Verify links and paths in `context/INDEX.md` point to existing files where paths are local repository paths.
- Report context files over 200 lines as MVI review candidates.
- Report context files not mentioned in `context/INDEX.md` as possible orphan candidates, not errors.

### Documentation

- Verify `README.md` command list matches actual command files.
- Verify `PHASES.md` current state does not contradict completed files.
- Report stale roadmap entries as warnings, not errors.

## Report Format

```md
# Config Validation Report

## Summary

- Status: PASS / WARN / FAIL
- Errors: <count>
- Warnings: <count>
- Commands: <count>
- Skills: <count>
- Agents: <count>
- Profiles: <count>

## Validated

- <checks that passed>

## Warnings

- `<path>` - <warning and recommendation>

## Errors

- `<path>` - <error and required fix>

## Recommended Next Actions

1. <highest priority action>
```

## Rules

- Keep validation non-destructive.
- Prefer actionable file paths over broad advice.
- Separate repository-local missing references from external installed skills.
- Do not claim the config is valid unless all errors are cleared.
