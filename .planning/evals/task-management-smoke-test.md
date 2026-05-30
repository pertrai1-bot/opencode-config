---
type: eval-protocol
purpose: Manual smoke test for the task-management skill state machine.
triggers: changing task-management skill, router, task format guidance, or task-status command behavior
---

# Task Management Smoke Test

Use this eval to verify the task-management workflow still performs the core state transitions in an isolated task root.

## Scope

This is a markdown protocol, not an executable runner. It should not mutate the repository's real `.planning/tasks/` state.

## Setup

Create a temporary working area outside the repo or under an ignored temp location. Set `OPENCODE_TASK_ROOT` to an isolated directory before running the router.

Example command shape:

```bash
OPENCODE_TASK_ROOT=/tmp/opencode-task-smoke bash ~/.config/opencode/skills/task-management/router.sh <command>
```

Create a small `tasks.md` fixture with two tasks:

```md
- [ ] 01 - Implement first task

- Objective: Prove the first transition works.
- Suggested agent: build
- Depends on: none
- Parallel: false
- Context files:
  - PHASES.md
- Likely files:
  - README.md
- Acceptance criteria:
  - First task can complete.
- Deliverables:
  - README.md
- Validation commands:
  - true
- Review checkpoints:
  - Completion summary is useful.
- Risks or assumptions:
  - Temporary task root is isolated.

- [ ] 02 - Implement dependent task

- Objective: Prove dependency handling works.
- Suggested agent: build
- Depends on: 01
- Parallel: false
- Context files:
  - PHASES.md
- Likely files:
  - README.md
- Acceptance criteria:
  - Second task becomes ready only after task 01 completes.
- Deliverables:
  - README.md
- Validation commands:
  - true
- Review checkpoints:
  - Dependency tree reports task 01.
- Risks or assumptions:
  - Temporary task root is isolated.
```

## Procedure

Run these steps from the repository root with `OPENCODE_TASK_ROOT` set to the isolated directory:

1. `init smoke --from-spec <fixture-tasks.md>`
2. `status smoke`
3. `next smoke`
4. `blocked smoke`
5. `start smoke 01`
6. `complete smoke 01 "Verified task 01 state transition in isolated smoke test"`
7. `next smoke`
8. `deps smoke 02`
9. `start smoke 02`
10. `complete smoke 02 "Verified dependency release in isolated smoke test"`
11. `validate smoke`
12. `status smoke`

## Passing Criteria

- `init` creates one feature state file and two subtask files under the isolated task root.
- Initial `next` lists task `01` and does not list task `02` as ready.
- Initial `blocked` lists task `02` blocked by task `01`.
- Completing task `01` makes task `02` ready.
- `deps smoke 02` shows dependency on `01`.
- `validate smoke` exits successfully and reports no dependency, status, count, or schema errors.
- Final `status smoke` reports `Progress: 2/2 (100%)`.

## Failure Handling

If any step fails, preserve the isolated task root until the failure is diagnosed. Treat malformed output, incorrect ready/blocked state, or missing completion summaries as task-management regressions.
