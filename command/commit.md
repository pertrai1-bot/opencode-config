---
description: Prepare cautious, config-aware commit guidance without staging or committing changes.
---

# Commit Command

Prepare a cautious commit summary for this opencode config repository. This command does not stage files, create commits, amend commits, or push.

Arguments: `$ARGUMENTS`

## Workflow

1. Inspect working tree state with `git status --short`.
2. Inspect relevant diffs with `git diff` and staged diffs with `git diff --cached` when staged files exist.
3. Categorize changes by surface:
   - `command/` - operational command behavior.
   - `skills/` - reusable workflow or review behavior.
   - `agent/` or `agents/` - SDLC agent behavior.
   - `profiles/` - operating profile behavior.
   - `context/` - reusable knowledge and navigation.
   - `rules/` - domain-specific project rules.
   - root docs such as `README.md`, `AGENTS.md`, and `PHASES.md`.
4. Identify whether changes are staged. If staged files exist, draft the commit for staged files only unless the user explicitly asks otherwise.
5. Suggest one conventional commit message. Keep it under 72 characters when possible.
6. Report missing documentation updates when surfaces imply docs should change.
7. Stop after guidance. Ask for explicit confirmation before any future staging or committing.

## Commit Type Guidance

| Change | Type |
| --- | --- |
| New command, skill, agent, profile capability | `feat` |
| Broken command/skill/profile behavior fixed | `fix` |
| README, context, guidance, or phase docs only | `docs` |
| Config organization, ignored files, metadata | `chore` |
| Internal restructuring without behavior change | `refactor` |

## Required Reminders

Use `[x]`, `[ ]`, or `n/a`.

- [ ] `README.md` updated when command, skill, agent, or profile lists changed.
- [ ] `AGENTS.md` updated when routing, profile behavior, or SDLC guidance changed.
- [ ] `PHASES.md` updated when phase status changed.
- [ ] `profiles/*.md` updated when available commands changed.
- [ ] Restart note included when opencode config-time files changed.

## Output

```md
## Commit Prep

Status: <clean / unstaged / staged / mixed>
Scope: <surfaces changed>
Staged only: <yes/no>

Suggested message:
`<type>: <description>`

Docs checklist:
- [ ] ...

Recommended commands:
1. `git add <intended files>`
2. `git commit -m "<message>"`

Risks:
- <uncommitted unrelated files, missing validation, or none>
```
