---
type: system-context
purpose: Distilled SDLC flow for this opencode config.
triggers: planning, implementing, reviewing, debugging, or handing off non-trivial work
---

# SDLC Overview

`AGENTS.md` is canonical. This file is the quick map.

## Flow

1. `spec-planner` turns ambiguous or feature-level intent into specs and tasks.
2. `task-management` hydrates accepted tasks into `.planning/tasks/` for persistent execution state.
3. `build` implements accepted tracked tasks.
4. `test-reviewer` reviews test quality when tests or evals are material.
5. `code-reviewer` reviews implementation risk and merge readiness.
6. `debugger` handles failing gates, regressions, and unexpected behavior.

## Handoff Points

- Planning to implementation: include spec artifacts, tracked tasks, required context, risks, and verification expectations.
- Implementation to review: include changed surfaces, evidence, known risks, and skipped checks.
- Debugging to implementation: include reproduction, root cause, fix target, and regression proof.
- Long sessions or agent switches: use `context-handoff`.

## When Specs Are Required

- New features.
- API additions or public interface changes.
- Cross-cutting or unclear requirements.
- Changes where build-and-see would risk rework.

## When Specs Are Optional

- Typo, formatting, comments, or docs wording.
- Small single-file fixes with obvious behavior.
- Mechanical updates where tests already define the contract.

## Verification Rule

Do not claim completion until current-session evidence exists. Use the narrowest meaningful checks first, then broaden when risk requires it.
