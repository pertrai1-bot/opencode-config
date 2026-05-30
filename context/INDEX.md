---
type: index
purpose: Inventory and lookup map for reusable context modules.
triggers: deciding which context file to read next
---

# Context Index

Use this file as the navigation hub. Start with the task trigger, then read only the matching files.

## Quick Lookup

| Need | Read |
| --- | --- |
| Understand this config repo | `context/system/README.md` |
| Follow the SDLC flow | `context/system/sdlc-overview.md` |
| Choose a workflow route, skill, or agent | `context/system/routing-reference.md` |
| Add or edit context, skills, agents, commands, or rules | `context/system/conventions.md` |
| Execute spec-planner tasks | `context/system/task-tracking.md` |
| Choose or switch operating profile | `profiles/README.md` |
| Understand durable config decisions | `context/project-intelligence/decisions/README.md` |
| Record reusable patterns | `context/project-intelligence/patterns/README.md` |
| Work on Angular projects | `rules/angular/` |

## Context Modules

| Path | Type | Purpose | Read when |
| --- | --- | --- | --- |
| `context/README.md` | index | Explains the context system | Starting or maintaining context work |
| `context/system/README.md` | system-context | Maps the config repo's operating surfaces | Orienting in this config |
| `context/system/sdlc-overview.md` | system-context | Distills the SDLC workflow | Planning, executing, reviewing, or debugging work |
| `context/system/routing-reference.md` | system-context | Maps task types to routes, skills, and agents | Choosing the safest workflow path |
| `context/system/conventions.md` | system-context | Defines authoring conventions | Adding or editing config artifacts |
| `context/system/task-tracking.md` | system-context | Summarizes task-management usage | Running tracked implementation tasks |
| `profiles/README.md` | profile-index | Maps operating profiles to agents, skills, commands, and context | Choosing or switching profiles |
| `profiles/essential.md` | profile | Smallest safe default profile | Quick fixes, light docs, and focused edits |
| `profiles/developer.md` | profile | Full SDLC implementation profile | Features, behavior changes, tests, and refactors |
| `profiles/architect.md` | profile | Reviewer-led architecture and decision profile | Architecture, boundaries, ADRs, and policy |
| `profiles/full.md` | profile | All configured surfaces available | Explicit full-mode work |
| `context/project-intelligence/README.md` | project-intelligence | Explains durable config knowledge | Looking for decisions or patterns |
| `context/project-intelligence/decisions/README.md` | project-intelligence | Decision log workflow | Changing config structure or policy |
| `context/project-intelligence/patterns/README.md` | project-intelligence | Pattern harvesting workflow | Capturing reusable lessons |

## Canonical Sources

- `AGENTS.md` is the active global workflow instruction file.
- `profiles/` defines operating modes and escalation guidance.
- `agent/*.md` defines custom SDLC subagents.
- `skills/*/SKILL.md` defines loadable workflow and reviewer skills.
- `command/*.md` defines explicit route and workflow commands.
- `rules/*/*.md` defines domain-specific technical rule packs.
- `PHASES.md` tracks implementation phases for this config repo.
