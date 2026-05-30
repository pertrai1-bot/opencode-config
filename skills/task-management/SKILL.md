---
name: task-management
description: Use when executing spec-planner tasks, resuming work, checking what is in progress, or tracking dependencies in .planning/tasks.
metadata:
  source: OpenAgentsControl-adapted
  version: "1.0.0"
---

# Task Management

Use this skill after `spec-planner` has created implementation tasks and before execution begins. It converts the planned task list into persistent execution state under `.planning/tasks/` so agents can resume, inspect progress, and coordinate work without rereading the whole spec.

This skill does not replace `spec-planner`. `spec-planner` owns task design. This skill owns runtime tracking.

## Storage

Tracked tasks live in the current project at:

```text
.planning/tasks/
└── <feature-slug>/
    ├── task.json
    ├── subtask_01.json
    ├── subtask_02.json
    └── ...
```

Set `OPENCODE_TASK_ROOT` to override the task root for testing or specialized workflows.

## Allowed Agents

`suggested_agent` is intentionally constrained to the SDLC execution set:

- `build`
- `code-reviewer`
- `debugger`
- `test-reviewer`

Use `build` for implementation tasks by default. Use the review, debug, and test agents only when the task is primarily their responsibility.

## Commands

Run commands from the project root:

```bash
bash ~/.config/opencode/skills/task-management/router.sh <command>
```

If this skill is copied into a project-local `.opencode/skills/` directory, run the project-local router path instead.

| Command | Purpose |
| --- | --- |
| `init <feature> --from-spec <path>` | Hydrate spec-planner `tasks.md` into `.planning/tasks/<feature>/` |
| `status [feature]` | Show progress across all tracked work or one feature |
| `next [feature]` | Show pending tasks whose dependencies are complete |
| `blocked [feature]` | Show tasks blocked by incomplete dependencies or explicit blocked state |
| `parallel [feature]` | Show ready tasks marked as parallelizable |
| `start <feature> <seq>` | Mark a subtask as `in_progress` |
| `complete <feature> <seq> "summary"` | Mark a subtask complete with a useful summary |
| `deps <feature> <seq>` | Show dependency tree for a subtask |
| `validate [feature]` | Validate task shape, dependencies, counts, and cycles |

## Hydration Format

The `init` command expects executable task cards in `tasks.md`. Task cards may use markdown headings or checkbox labels. Prefer checkbox labels when the spec-planner produced a human-trackable checklist:

```md
- [ ] 01 - Implement authentication middleware

- Objective: Replace session middleware with JWT validation.
- Suggested agent: build
- Depends on: none
- Parallel: false
- Context files:
  - .planning/changes/auth-refactor/prd.md
- Likely files:
  - src/middleware/auth.ts
- Acceptance criteria:
  - Invalid tokens return 401
  - Valid tokens attach user identity
- Deliverables:
  - src/middleware/auth.ts
  - src/middleware/auth.test.ts
- Validation commands:
  - npm test -- auth
- Review checkpoints:
  - Auth behavior matches the spec scenarios
- Risks or assumptions:
  - Existing session behavior is intentionally replaced
```

Dependency references must use task sequence numbers, such as `Depends on: 01, 03`. Use stable integer sequence numbers such as `00`, `01`, and `02`; do not use decimal checklist labels like `1.1` in hydratable task files.

## Workflow

1. Let `spec-planner` create the spec and `tasks.md`.
2. Initialize tracking:

   ```bash
   bash ~/.config/opencode/skills/task-management/router.sh init auth-refactor --from-spec .planning/changes/auth-refactor/tasks.md
   ```

3. Find the next executable work:

   ```bash
   bash ~/.config/opencode/skills/task-management/router.sh next auth-refactor
   ```

4. Mark the selected task in progress:

   ```bash
   bash ~/.config/opencode/skills/task-management/router.sh start auth-refactor 01
   ```

5. Delegate to the suggested agent automatically based on `suggested_agent`.
6. When the task finishes, record what changed:

   ```bash
   bash ~/.config/opencode/skills/task-management/router.sh complete auth-refactor 01 "JWT middleware implemented and auth tests pass"
   ```

7. Validate before handoff or completion:

   ```bash
   bash ~/.config/opencode/skills/task-management/router.sh validate auth-refactor
   ```

## State Schemas

### task.json

```json
{
  "id": "auth-refactor",
  "name": "Auth Refactor",
  "status": "active",
  "objective": "Execute tracked spec tasks.",
  "context_files": [],
  "reference_files": [],
  "exit_criteria": ["All subtasks complete", "Required verification captured"],
  "subtask_count": 3,
  "completed_count": 0,
  "created_at": "2026-05-29T00:00:00.000Z",
  "completed_at": null,
  "spec_source": ".planning/changes/auth-refactor/tasks.md"
}
```

### subtask_XX.json

```json
{
  "id": "auth-refactor-01",
  "seq": "01",
  "title": "Implement authentication middleware",
  "objective": "Replace session middleware with JWT validation.",
  "status": "pending",
  "depends_on": [],
  "parallel": false,
  "suggested_agent": "build",
  "context_files": [],
  "reference_files": ["src/middleware/auth.ts"],
  "acceptance_criteria": ["Invalid tokens return 401"],
  "deliverables": ["src/middleware/auth.ts"],
  "validation_commands": ["npm test -- auth"],
  "review_checkpoints": [],
  "risks_or_assumptions": [],
  "started_at": null,
  "completed_at": null,
  "completion_summary": null
}
```

## Validation Rules

`validate` checks:

- Feature `task.json` exists and matches the feature slug.
- Subtask count matches actual `subtask_XX.json` files.
- Subtask IDs use `<feature>-<seq>`.
- Status values are valid.
- `suggested_agent` is one of the allowed agents.
- Dependencies reference existing task sequence numbers.
- No task depends on itself.
- No circular dependencies exist.
- Each subtask has acceptance criteria and deliverables.

## Completion Summaries

Completion summaries should be useful to the next agent. Prefer:

```text
Implemented JWT middleware, added auth.test.ts coverage, and verified npm test -- auth passes.
```

Avoid:

```text
Done.
```

## When To Load

Load this skill when:

- Starting implementation from a spec-planner `tasks.md`.
- Resuming work and needing to know what is active, pending, blocked, or complete.
- Coordinating multiple subagents across a feature.
- Checking which work can run in parallel.
- Preparing a handoff that must state exact task progress.
