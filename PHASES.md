# opencode Config Phase Tracker

This document tracks the remaining work for turning this opencode config into a fully operational AI software engineering team. It is intentionally lightweight so a fresh session can resume quickly.

## Current State

Phase 1, Phase 2, and Phase 3 are implemented. Phase 3 added operating profiles under `profiles/` and a persistent `/profile` command.

Files produced or updated during this work:

- `AGENTS.md` — SDLC flow now includes task-management between spec planning and build execution.
- `agent/spec-planner.md` — spec tasks now include machine-readable output guidance for task-management hydration.
- `skills/task-management/` — new skill, router, and CLI for persistent task tracking in `.planning/tasks/`.
- `README.md` — initial root orientation for this config.
- `PHASES.md` — this tracker.
- `context/` — reusable context navigation, system summaries, and project-intelligence docs.
- `profiles/` — operating profile definitions for essential, developer, architect, and full modes.
- `command/profile.md` — persistent profile inspection and switching command.

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

Status: Next

Goal: Add practical commands that make the config easier to operate day to day.

Review for consideration: https://github.com/darrenhinde/OpenAgentsControl/tree/main/.opencode/command

Candidate commands:

- `task-status` or similar wrapper for task-management status.
- `validate-repo` for repo health checks.
- `clean` for stale temp files and completed task cleanup.
- `commit` for structured pre-commit validation and message guidance.
- `worktrees` for parallel feature work.
- `context` for context discovery and harvest operations.

Open decisions:

- Prioritize commands after seeing which manual actions repeat most often.
- Avoid adding broad commands before the context system and profiles settle.

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
4. If continuing implementation, start Phase 4 with Operational Commands.

Recommended next action:

- Begin Phase 4 by prioritizing operational commands that fit the now-defined profile system.

Do not:

- Do not replace spec-planner task planning with task-management; task-management is only the runtime tracking layer.
- Do not move Angular rules unless a later phase explicitly revisits the `rules/` boundary.
- Do not replace the documentation-driven profile model with config/plugin loading unless opencode-compatible mechanics are confirmed and the tradeoff is explicit.
