# opencode Config Phase Tracker

This document tracks the remaining work for turning this opencode config into a fully operational AI software engineering team. It is intentionally lightweight so a fresh session can resume quickly.

## Current State

Phase 1 is implemented. At the time this tracker was created, `git status --short` showed only `PHASES.md` as untracked.

Files produced or updated during this work:

- `AGENTS.md` — SDLC flow now includes task-management between spec planning and build execution.
- `agent/spec-planner.md` — spec tasks now include machine-readable output guidance for task-management hydration.
- `skills/task-management/` — new skill, router, and CLI for persistent task tracking in `.planning/tasks/`.
- `README.md` — initial root orientation for this config.
- `PHASES.md` — this tracker.

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

Status: Next

Goal: Organize reusable knowledge so agents can discover, harvest, compact, and improve project context over time.

Proposed atomic tasks:

1. Create `.opencode/context/` or equivalent global context structure for this config.
2. Add core context-system guidance based on Minimal Viable Information (MVI): concise concepts, bullets, examples, and links.
3. Add navigation files that let agents find context without loading everything.
4. Create `project-intelligence/` docs for business domain, technical domain, decisions, and living notes.
5. Decide whether existing `rules/angular/` content should move into the new context structure or remain where it is for now.
6. Add a lightweight context-manager skill only after the static context structure is useful.

Open decisions:

- Whether context should live under `.opencode/context/`, `context/`, or another root-local directory in this global config repo.
- Whether Angular rules should be migrated during Phase 2 or deferred.

## Phase 3 — Profiles

Status: Planned

Goal: Support different operating modes without loading the same full context for every task.

Candidate profiles:

- `essential` — light routing, framing, verification, and basic task tracking.
- `developer` — current full SDLC setup for feature work.
- `architect` — deeper planning, architecture, ADR, and boundary review context.
- `full` — all available agents, skills, commands, and context.

Open decisions:

- Confirm profile mechanism and file layout compatible with opencode config loading.
- Decide whether profiles are documentation-only first or actively loaded by config/plugin support.

## Phase 4 — Operational Commands

Status: Planned

Goal: Add practical commands that make the config easier to operate day to day.

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
4. If continuing implementation, start Phase 2 with the Context System.

Recommended next action:

- Review Phase 1 diff for any naming or workflow concerns, then begin Phase 2 by creating the minimal context-system structure and navigation docs.

Do not:

- Do not replace spec-planner task planning with task-management; task-management is only the runtime tracking layer.
- Do not move Angular rules until the Phase 2 context layout decision is made.
- Do not add profile-loading behavior until opencode-compatible profile mechanics are confirmed.
