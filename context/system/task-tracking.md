---
type: system-context
purpose: Quick reference for task-management in the SDLC flow.
triggers: executing or resuming spec-planner tasks
---

# Task Tracking

`task-management` converts accepted `tasks.md` files into persistent execution state under `.planning/tasks/`.

## Role In The Flow

- `spec-planner` designs tasks.
- `task-management` tracks execution state.
- `build`, `code-reviewer`, `debugger`, and `test-reviewer` execute or inspect tracked tasks.

## Storage

```text
.planning/tasks/
└── <feature-slug>/
    ├── task.json
    ├── subtask_01.json
    └── ...
```

Set `OPENCODE_TASK_ROOT` only for tests or specialized workflows.

## Core Commands

Run from the project root:

```bash
bash ~/.config/opencode/skills/task-management/router.sh init <feature> --from-spec .planning/changes/<change-id>/tasks.md
bash ~/.config/opencode/skills/task-management/router.sh status <feature>
bash ~/.config/opencode/skills/task-management/router.sh next <feature>
bash ~/.config/opencode/skills/task-management/router.sh start <feature> 01
bash ~/.config/opencode/skills/task-management/router.sh complete <feature> 01 "Implemented and verified the task"
bash ~/.config/opencode/skills/task-management/router.sh validate <feature>
```

## Required Task Shape

- Use two-digit sequence numbers such as `01` and `02`.
- Use dependency references such as `Depends on: 01, 03`.
- Set `Suggested agent` to `build`, `code-reviewer`, `debugger`, or `test-reviewer`.
- Include acceptance criteria, deliverables, and validation commands.

## Common Mistakes

- Do not replace spec planning with task-management.
- Do not mark a task complete without a useful completion summary.
- Do not use decimal task labels such as `1.1` for hydratable tasks.
- Do not skip `validate` before handoff or completion.
