---
type: profile
name: developer
purpose: Full SDLC profile for feature work and substantial implementation.
triggers: features, behavior changes, refactors, tests, type or API changes
---

# Developer Profile

Use `developer` when the task needs the normal spec-driven implementation flow.

## Includes

- Agents: `spec-planner`, `build`, `code-reviewer`, `debugger`, and `test-reviewer`.
- Skills: workflow skills, task-management, context-handoff, test-driven-development, type-driven-development, workspace-isolation, and verification.
- Commands: `/route-full`, `/route-debug`, `/route-review`, `/tdd-cycle`, `/verify-summary`, `/context-handoff`, `/profile`, `/task-status`, `/validate-repo`, `/commit`, `/clean`, and `/context-audit`.
- Context: `context/system/sdlc-overview.md`, `context/system/routing-reference.md`, `context/system/task-tracking.md`, and relevant project-intelligence files.

## Behavior

- Use `spec-planner` before implementation when requirements are unclear, cross-cutting, or likely to cause rework.
- Hydrate accepted implementation tasks with `task-management` before tracked execution.
- Use `build` for implementation after the plan or task contract is clear.
- Use `test-reviewer` when tests or eval scenarios are material.
- Use `code-reviewer` for merge-risk review on substantial diffs.
- Use `debugger` for failing gates, regressions, and unexpected behavior.

## Escalate To

- `architect` when implementation questions are really architecture, boundary, ADR, or reviewer-led decision problems.
- `full` when explicitly requested or when the task needs all configured skills, commands, and context.

## De-escalate To

- `essential` for simple docs, typo, metadata, or formatting-only work.
