# My OpenCode Configuration

This repository is a personal opencode configuration for running AI agents like a small software engineering team. It is being built around a spec-driven SDLC, progressive skill loading, persistent task tracking, and explicit verification before completion claims.

This README is an initial orientation. Detailed reference docs will be added later as the configuration matures.

## Current Goals

- Route work to the right agent automatically based on task type and risk.
- Use `spec-planner` for unclear, cross-cutting, or feature-level work before implementation begins.
- Track accepted spec tasks in `.planning/tasks/` so active, blocked, and completed work can be queried across sessions.
- Preserve decisions, lessons, and project-specific patterns so future agents improve over time.
- Keep high-risk workflows explicit: debugging, review, boundary changes, production-sensitive changes, and verification.

## Core SDLC Flow

The active workflow is defined in `AGENTS.md`.

1. `spec-planner` writes or updates specs and creates implementation tasks.
2. `task-management` hydrates accepted `tasks.md` files into `.planning/tasks/` when execution begins.
3. `build` implements the tracked tasks.
4. `test-reviewer` reviews test quality when tests are material.
5. `code-reviewer` reviews implementation risk and merge readiness.
6. `debugger` handles failing gates, regressions, and unexpected behavior.

The main agent should choose the right path automatically. You should not need to manually choose a subagent for normal work.

## Agents

Configured SDLC agents live under `agent/`.

- `spec-planner` plans OpenSpec-style changes before code is written.
- `code-reviewer` reviews diffs, branches, and PR-ready changes without editing code.
- `debugger` investigates failures and root causes.
- `test-reviewer` reviews test design, coverage quality, brittleness, and eval scenarios.

The built-in `build` agent is used for implementation work.

## Skills

Custom workflow and reviewer skills live under `skills/`.

Important workflow skills include:

- `adaptive-routing` for choosing the lightest safe workflow path.
- `task-framing` for clarifying non-trivial or risky edits.
- `verification` for requiring evidence before completion.
- `context-handoff` for passing compact state between phases or sessions.
- `task-management` for persistent spec-task execution state.

Specialist skills cover boundaries, production readiness, MCP integrations, harness hooks, self-audits, and codebase health.

## Task Tracking

The task-management skill stores execution state in `.planning/tasks/`. It complements `spec-planner`; it does not replace planning.

Typical flow:

```bash
bash ~/.config/opencode/skills/task-management/router.sh init <feature> --from-spec openspec/changes/<change-id>/tasks.md
bash ~/.config/opencode/skills/task-management/router.sh status <feature>
bash ~/.config/opencode/skills/task-management/router.sh next <feature>
bash ~/.config/opencode/skills/task-management/router.sh start <feature> 01
bash ~/.config/opencode/skills/task-management/router.sh complete <feature> 01 "Implemented and verified the first task"
bash ~/.config/opencode/skills/task-management/router.sh validate <feature>
```

Supported commands:

- `init` hydrates a spec task list into tracked state.
- `status` shows progress.
- `next` shows dependency-ready work.
- `blocked` shows blocked tasks and blockers.
- `parallel` shows ready tasks marked parallelizable.
- `start` marks a subtask in progress.
- `complete` records completion with a useful summary.
- `deps` shows a subtask dependency tree.
- `validate` checks task integrity.

Task dependencies use sequence numbers such as `01`, `02`, and `03`. `suggested_agent` is constrained to `build`, `code-reviewer`, `debugger`, or `test-reviewer`.

## Commands

Custom commands live under `command/`. Current commands are mostly workflow routing helpers, such as:

- `route-light`
- `route-full`
- `route-debug`
- `route-review`
- `route-boundary`
- `route-policy`
- `route-explore`
- `context-handoff`
- `verify-summary`
- `tdd-cycle`

These provide explicit entry points for common workflow modes.

## MCP Servers

Configured MCP integrations are defined in `opencode.jsonc`.

- Context7 for current library and framework documentation.
- Playwright for browser automation.
- Memory for durable local memory graph operations.
- GitNexus for indexed codebase exploration and impact analysis.

## Working With This Config

- Restart opencode after changing `opencode.jsonc`, agent files, skills, plugins, or other config-time files.
- Use specs for work where build-and-see would risk rework.
- Use task tracking when executing accepted spec tasks across sessions.
- Do not skip verification before claiming completion.
- Preserve unrelated work in dirty worktrees.

## Roadmap

Near-term improvements planned for this config:

- Context system for organizing reusable project and workflow knowledge.
- Profiles for switching between lightweight, developer, architect, and full team modes.
- More operational commands for validation, cleanup, and repo health.
- Better documentation once the core concepts settle.
