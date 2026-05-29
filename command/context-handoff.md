---
description: Create a compact current-state handoff for phase, session, agent, PR, or review transitions.
---

Create or update a handoff capsule when switching major workflow phases, handing work to another agent/session, pausing long work, preparing a PR/review handoff, or retiring stale assumptions after a change in direction.

## Storage

Use the first available location:

1. `.agents/handoff.md` when local file access is available.
2. Final assistant response when file access is unavailable.
3. PR body or PR comment when handing review context to humans or review agents.

Do not commit `.agents/handoff.md` or `.agents/handoff-log.md` unless the user explicitly requests committed agent-state artifacts.

## Handoff Capsule Template

```md
# Agent Handoff

Last updated: <date/time if available>
Storage: <path, response, or PR comment>
Current workflow route: <Light | Full | Debugging | Boundary | Review | Exploration | Policy | combined>
Current phase: <phase completing now>
Next recommended phase: <phase to load next>

## User Intent

<The user's current request in 1-3 sentences.>

## Current Task State

<What is true now. Include branch/PR, changed files, relevant commands, and current implementation/review status.>

## Decisions That Still Matter

- <Decision and why it remains relevant.>

## Evidence Collected

- <Command/tool/check>: <result and why it matters>

## Files and Surfaces Involved

- `<path>` - <changed/read/relevant and why>

## Open Risks / Unknowns

- <Risk, missing evidence, or uncertainty that the next phase must handle>

## Rejected or Superseded Context

- <Old approach, stale failure output, or assumption the next phase should ignore>

## Next Phase Input

The next phase should:
1. <specific next action>
2. <specific verification or question>

The next phase should not rely on:
- <unstated prior chat, obsolete plan, or old tool output>
```

## Phase Boundary Checklist

1. Identify whether a handoff is required by the route.
2. Rewrite the active handoff with only current relevant state.
3. Mark stale plans, old failures, and rejected approaches as superseded.
4. Name the next phase and the exact inputs it needs.
5. If file storage is unavailable, print the capsule in the response.

Keep bullets concise. Prefer current facts over narrative history.
