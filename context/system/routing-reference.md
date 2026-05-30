---
type: system-context
purpose: Quick route, skill, and agent selection reference.
triggers: choosing how to handle a task safely
---

# Routing Reference

Use the lightest safe path that proves correctness.

## Route Table

| Route | Use when | Typical tools |
| --- | --- | --- |
| Light | Typo, docs wording, comments, metadata, formatting-only | Direct edit plus minimal verification |
| Full | Features, behavior changes, refactors, tests, type/API changes | `spec-planner`, `task-management`, `build`, `verification` |
| Debugging | Failing tests, regressions, bugs, flaky or unexpected behavior | `debugger`, `debug-like-expert` when needed |
| Boundary | Imports, exports, packages, services, public entry points, dependency direction | `architecture-boundaries`, boundary reviewers |
| Review | PRs, branches, local diffs, or explicit review requests | `code-reviewer`, `test-reviewer` when tests matter |
| Exploration | Investigations, comparisons, explanations, uncertainty | `exploration-mode`, `codebase-navigation` |
| Policy | Directives, skills, workflow, contributor instructions, config conventions | `customize-opencode`, `session-decisions` |

## Agent Selection

- `spec-planner`: define specs, PRDs, implementation tasks, and spec reviews.
- `build`: implement accepted tasks and focused code changes.
- `code-reviewer`: review diffs for merge risk without editing.
- `debugger`: reproduce and fix failures with evidence.
- `test-reviewer`: review test design, coverage, brittleness, and eval scenarios.

## Skill Selection

- Load `codebase-navigation` before unfamiliar implementation or review work.
- Load `task-framing` before substantial ambiguous, risky, or cross-cutting edits.
- Load `verification` before final claims, PRs, or handoffs.
- Load `context-handoff` at phase, session, agent, PR, or review boundaries.
- Load specialist reviewers only when the touched surface matches their scope.

## Escalation Rules

- A quick user request does not downgrade safety for security, persistence, public APIs, or cross-service changes.
- If a route changes mid-task, state the new route and load the needed context.
- If a task spans phases, create a handoff instead of carrying stale chat history.
