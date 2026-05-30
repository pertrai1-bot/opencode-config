# My OpenCode Configuration

This repository is a personal opencode configuration for running AI agents like a small software engineering team. It is being built around a spec-driven SDLC, progressive skill loading, persistent task tracking, and explicit verification before completion claims.

This README is an initial orientation. Detailed reference docs will be added later as the configuration matures.

## Current Goals

- Route work to the right agent automatically based on task type and risk.
- Start from the lightweight `essential` profile, then escalate to stronger profiles when the request requires them.
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

## Context

Reusable context for this config lives under `context/`.

- Start with `context/INDEX.md` to find the smallest relevant context module.
- Use `context/system/` for SDLC, routing, conventions, and task-tracking summaries.
- Use `context/project-intelligence/` for durable config decisions and reusable maintenance patterns.
- Domain-specific technical rules remain under `rules/`, including `rules/angular/`.

Context files summarize and route to canonical sources; they do not replace `AGENTS.md`, skills, agents, commands, or rules.

## Profiles

Operating profiles live under `profiles/` and keep context loading proportional to the task.

- `essential` is the default for quick fixes, light docs, and focused verified edits.
- `developer` is the full SDLC profile for feature work, behavior changes, tests, and refactors.
- `architect` is reviewer-led for architecture, ADRs, boundaries, policy, and implementation contracts; it does not perform direct build work.
- `full` makes every configured agent, skill, command, and context surface available when explicitly needed.

Use `/profile` to inspect or change the active profile. The selected profile persists locally in `profiles/active-profile` until changed.

## Task Tracking

The task-management skill stores execution state in `.planning/tasks/`. It complements `spec-planner`; it does not replace planning.

Typical flow:

```bash
bash ~/.config/opencode/skills/task-management/router.sh init <feature> --from-spec .planning/changes/<change-id>/tasks.md
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

Custom commands live under `command/`. Current commands include workflow routing and operational helpers, such as:

- `clean`
- `commit`
- `context-audit`
- `context-handoff`
- `profile`
- `route-light`
- `route-full`
- `route-debug`
- `route-review`
- `route-boundary`
- `route-policy`
- `route-explore`
- `task-status`
- `tdd-cycle`
- `validate-repo`
- `verify-summary`

These provide explicit entry points for common workflow modes, task tracking, repository validation, commit preparation, cleanup scans, and context audits.

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

- Deeper validation and optional fixes for operational commands once read-only reports prove useful.
- Better documentation once the core concepts settle.
