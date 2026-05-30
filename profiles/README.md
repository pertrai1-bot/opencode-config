---
type: profile-index
purpose: Registry and selection guide for opencode operating profiles.
triggers: choosing or switching the active operating profile
---

# Profiles

Profiles keep the default agent context small, then escalate only when the request needs more SDLC machinery.

## Selection Rules

- Default to `essential` when no persisted profile exists.
- Treat `profiles/active-profile` as the persisted local override when it exists.
- Escalate from `essential` to `developer` for feature work, behavior changes, substantial refactors, or tracked implementation.
- Escalate to `architect` for architecture review, ADRs, boundaries, policy, design critique, and reviewer-led planning.
- Use `full` only when explicitly requested or when a task genuinely needs every configured agent, skill, command, and context surface.

## Profile Table

| Profile | Use when | Agents | Skill scope | Implementation |
| --- | --- | --- | --- | --- |
| `essential` | Quick fixes, light docs, simple routing, small verified edits | `plan`, `build` for trivial edits | Minimal routing, framing, verification, task tracking reference | Trivial only |
| `developer` | Normal feature work, behavior changes, tests, refactors | `spec-planner`, `build`, `code-reviewer`, `debugger`, `test-reviewer` | Full SDLC workflow skills plus task management | Yes |
| `architect` | Architecture, boundaries, ADRs, review-led planning | `spec-planner`, `code-reviewer`, `test-reviewer`, `debugger` for investigation | Reviewer, boundary, health, decision, exploration, and verification skills | No direct build work |
| `full` | Explicit all-tools mode or unusual cross-cutting work | All available agents | All configured skills, commands, and context | Yes |

## Manual Selection

Use `/profile` to inspect or change the active profile.

Examples:

```text
/profile
/profile essential
/profile developer
/profile architect
/profile full
```

When a profile is changed, `/profile` persists the selected name to `profiles/active-profile`. That file is local machine state and is ignored by git.

## Profile Files

- `profiles/essential.md` - Smallest safe default.
- `profiles/developer.md` - Full SDLC feature work.
- `profiles/architect.md` - Reviewer-led architecture and decision work.
- `profiles/full.md` - Everything available.
