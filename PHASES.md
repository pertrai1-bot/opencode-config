# opencode Config Phase Tracker

This document tracks the remaining work for turning this opencode config into a fully operational AI software engineering team. It is intentionally lightweight so a fresh session can resume quickly.

## Current State

Phase 1, Phase 2, Phase 3, and Phase 4 are implemented. Phase 4 added operational commands for task status, repo validation, commit preparation, cleanup scans, and context audits.

Files produced or updated during this work:

- `AGENTS.md` — SDLC flow now includes task-management between spec planning and build execution.
- `agent/spec-planner.md` — spec tasks now include machine-readable output guidance for task-management hydration.
- `skills/task-management/` — new skill, router, and CLI for persistent task tracking in `.planning/tasks/`.
- `README.md` — initial root orientation for this config.
- `PHASES.md` — this tracker.
- `context/` — reusable context navigation, system summaries, and project-intelligence docs.
- `profiles/` — operating profile definitions for essential, developer, architect, and full modes.
- `command/profile.md` — persistent profile inspection and switching command.
- `command/task-status.md` — day-to-day wrapper for task-management status, next, blocked, parallel, start, complete, deps, and validate operations.
- `command/validate-repo.md` — read-only config consistency report across commands, skills, agents, profiles, context, and docs.
- `command/commit.md` — cautious config-aware commit preparation without staging or committing.
- `command/clean.md` — non-destructive cleanup scan for completed tasks, stale handoffs, summaries, temp files, and context size candidates.
- `command/context-audit.md` — non-destructive context navigation, MVI, and harvest-candidate audit.

Verification already performed for Phase 1:

- `skills/task-management/router.sh help` runs successfully.
- Smoke test used isolated `OPENCODE_TASK_ROOT` temp storage.
- Smoke test verified `init`, `status`, `next`, `blocked`, `start`, `complete`, `parallel`, `deps`, and `validate`.
- Smoke test reached `Progress: 2/2 (100%)`.

Important restart note:

- Restart opencode after this session so new skills and updated agent guidance are loaded.

## Phase 1 — Task Management Skill

Status: Done

Goal: Persist spec-planner task execution state so active, blocked, ready, and completed work can be queried across sessions.

Completed:

- Added task-management skill documentation.
- Added CLI router.
- Added task CLI state machine.
- Stores tasks under `.planning/tasks/` by default.
- Uses task sequence dependencies such as `Depends on: 01, 03`.
- Constrains `suggested_agent` to `build`, `code-reviewer`, `debugger`, or `test-reviewer`.
- Integrated task-management into `AGENTS.md` SDLC flow.
- Updated `spec-planner` with task format guidance.

Follow-up ideas:

- Add a convenience command alias so users do not need to type the full router path.
- Consider richer parsing once real `tasks.md` examples accumulate.
- Add tests for malformed specs, invalid agents, missing dependencies, and circular dependencies.

## Phase 2 — Context System

Status: Done

Goal: Organize reusable knowledge so agents can discover, harvest, compact, and improve project context over time.

Completed:

1. Created `context/` as the root context structure for this config.
2. Added MVI-based context guidance with concise concepts, bullets, examples, and links.
3. Added `context/INDEX.md` and system navigation files so agents can find context without loading everything.
4. Created `context/project-intelligence/` for durable decisions and reusable patterns.
5. Decided existing `rules/angular/` content remains in `rules/` for now.
6. Deferred a lightweight context-manager skill until the static context structure proves useful.

Open decisions:

- Context lives under `context/` because this repository is itself the opencode config.
- Angular rules remain under `rules/angular/` for now.

## Phase 3 — Profiles

Status: Done

Goal: Support different operating modes without loading the same full context for every task.

Candidate profiles:

- `essential` — light routing, framing, verification, and basic task tracking.
- `developer` — current full SDLC setup for feature work.
- `architect` — deeper planning, architecture, ADR, and boundary review context.
- `full` — all available agents, skills, commands, and context.

Open decisions:

- Profiles are documentation-driven because opencode does not provide a native `profiles` config key.
- Default profile is `essential`; `/profile` persists explicit selection in `profiles/active-profile`.
- `architect` is reviewer-led and does not use `build` for implementation.

Completed:

1. Added `profiles/README.md` as the profile registry and selection guide.
2. Added `profiles/essential.md`, `profiles/developer.md`, `profiles/architect.md`, and `profiles/full.md`.
3. Updated `AGENTS.md` with default profile, persisted active-profile behavior, and escalation rules.
4. Updated context navigation and routing reference with profile-aware guidance.
5. Added `/profile` command for inspection and persistent switching.
6. Ignored `profiles/active-profile` as local machine state.

## Phase 4 — Operational Commands

Status: Done

Goal: Add practical commands that make the config easier to operate day to day.

Review for consideration: https://github.com/darrenhinde/OpenAgentsControl/tree/main/.opencode/command

Completed commands:

- `task-status` wrapper for daily task-management inspection and subcommands, excluding `init`.
- `validate-repo` for read-only repo health and reference-drift checks.
- `clean` for non-destructive stale file, handoff, completed task, and MVI cleanup scans.
- `commit` for cautious pre-commit validation, documentation reminders, and commit message guidance.
- `context-audit` for non-destructive context discovery, MVI checks, and harvest candidate reporting.

Open decisions:

- `task-status` supports common daily task subcommands but intentionally excludes `init`; hydration remains a deliberate task-management setup step.
- `validate-repo`, `clean`, and `context-audit` start as read-only report commands; auto-fixes are deferred until their reports prove useful.
- `commit` is cautious and does not stage, commit, amend, or push.

Follow-up ideas:

- Add optional auto-fix modes to `validate-repo` only after repeated report findings establish safe fixes.
- Add a dedicated worktree command later if parallel branch operations become frequent.
- Consider executable validation scripts if markdown command reports become too repetitive to perform manually.

## Phase 5 — Agent Improvement Loop

Status: Planned

Goal: Build durable feedback loops so agent behavior improves from use.

Candidate work:

- Capture recurring mistakes into `error-memory` and permanent context.
- Capture architecture/process decisions into structured decision docs.
- Add evaluation or smoke-test patterns for key agent workflows.
- Track which context is useful and compact or remove stale context.

Open decisions:

- Whether to implement prompt variants and eval-runner infrastructure now or defer until the core SDLC flow stabilizes.

## Next Session Starting Point

Start here:

1. Read `README.md`, `AGENTS.md`, and this file.
2. Check `git status --short` to see the current uncommitted state.
3. If reviewing Phase 1, inspect `skills/task-management/`, `AGENTS.md`, and `agent/spec-planner.md`.
4. If continuing implementation, start Phase 5 with the Agent Improvement Loop.

Recommended next action:

- Begin Phase 5 by choosing the smallest useful feedback loop, likely durable error-memory capture or a lightweight validation/evaluation pattern for common agent workflows.

Do not:

- Do not replace spec-planner task planning with task-management; task-management is only the runtime tracking layer.
- Do not move Angular rules unless a later phase explicitly revisits the `rules/` boundary.
- Do not replace the documentation-driven profile model with config/plugin loading unless opencode-compatible mechanics are confirmed and the tradeoff is explicit.
