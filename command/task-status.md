---
description: Inspect and update tracked SDLC task state through the task-management router.
---

# Task Status Command

Use this command for day-to-day task-management operations after `spec-planner` tasks have been hydrated into `.planning/tasks/`.

Arguments: `$ARGUMENTS`

## Router

Delegate to the existing task-management router. Do not duplicate task parsing or state mutation logic.

```bash
bash ~/.config/opencode/skills/task-management/router.sh <command>
```

## Supported Operations

| Invocation | Router command | Purpose |
| --- | --- | --- |
| `/task-status` | `status` then `next` | Show all tracked progress and ready work |
| `/task-status <feature>` | `status <feature>` then `next <feature>` | Show focused feature progress and ready work |
| `/task-status next [feature]` | `next [feature]` | Show pending tasks whose dependencies are complete |
| `/task-status blocked [feature]` | `blocked [feature]` | Show blocked tasks and blockers |
| `/task-status parallel [feature]` | `parallel [feature]` | Show ready tasks marked parallelizable |
| `/task-status start <feature> <seq>` | `start <feature> <seq>` | Mark a task in progress |
| `/task-status complete <feature> <seq> "summary"` | `complete <feature> <seq> "summary"` | Mark a task complete with a useful summary |
| `/task-status deps <feature> <seq>` | `deps <feature> <seq>` | Show a task dependency tree |
| `/task-status validate [feature]` | `validate [feature]` | Validate task state integrity |
| `/task-status help` | `help` | Show raw router help |

Do not support `init` here. Hydration is a deliberate setup step; use the full router path from `task-management` for `init`.

## Workflow

1. Parse `$ARGUMENTS` into one of the supported operations.
2. Run the mapped router command from the current project root.
3. For default and focused status, run `status` first, then `next` so the user sees both progress and executable work.
4. For `complete`, require a non-empty completion summary that explains what changed and what was verified.
5. If a command fails, report the exact router output and suggest `/task-status validate [feature]` when state integrity may be the cause.

## Output

```md
Task command: <router command>
Result: <router output summary>
Next: <ready work, validation suggestion, or no action needed>
```
