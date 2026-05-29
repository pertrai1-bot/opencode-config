---
name: context-handoff
description: Compresses current task state at phase, agent, session, PR, or review boundaries so later work continues from a compact handoff instead of accumulated chat history.
metadata:
  source: agent-directives
  version: "1.0.0"
---

# Context Handoff

Use this skill before switching major workflow phases, handing work to another agent/session, pausing long work, preparing a PR/review handoff, or starting a new phase that should not inherit stale context.

A handoff capsule is current-state summary, not a transcript. It preserves the facts, decisions, evidence, and open risks that still matter while retiring obsolete plans and rejected paths.

## Important Limitation

Markdown instructions cannot erase a model's active context. This skill is a discipline mechanism for reducing context drift.

When a true fresh session is available, start the next session with only the current request, the latest handoff capsule, required project instructions, and newly inspected repository evidence.

## Command

Run `/context-handoff` when a handoff capsule is required. The command contains the full storage guidance, capsule template, and phase-boundary checklist.

Auto-suggestion:

```md
Handoff required at this boundary. Run `/context-handoff` for the compact capsule template.
```

## When To Use

Create or update a handoff capsule when:

- The route switches between major phases on Full, Debugging, Boundary, Review, Exploration, or Policy paths.
- Work spans enough steps that accumulated chat context may become noisy.
- Work is paused and may resume later.
- Another agent/session will continue the work.
- A review, PR, or human handoff needs compact current state.
- The agent changed direction and must retire stale assumptions or rejected approaches.

For Light Path work, a handoff is optional unless requested or work will continue elsewhere.

## Update Semantics

`.agents/handoff.md` is the active handoff document when file storage is used. Rewrite it at handoff boundaries so it represents latest current state. Do not append indefinitely.

If an audit trail is needed, append historical entries to `.agents/handoff-log.md`, but treat that log as historical only.

## PR And Review Handoffs

For PR workflows, put final handoff content in the PR body or a PR comment only when it helps reviewers. Keep it focused on route, changed surfaces, verification evidence, known risks, skipped checks, and review focus.

Do not post repeated per-phase handoff comments unless the user requests a detailed audit trail.

## Forbidden Patterns

| Pattern | Why Forbidden |
| --- | --- |
| Appending forever to the active handoff | Recreates context drift and makes stale state look relevant |
| Treating the handoff as proof without evidence | The capsule summarizes evidence; it does not replace checks |
| Carrying forward assumptions not written in the capsule | Defeats compaction |
| Committing session-state handoff files by default | Pollutes project history with local agent state |
| Using handoff ceremony for tiny one-step Light Path work | Adds boilerplate without reducing risk |
| Hiding unresolved risks to make the handoff look clean | The next phase needs accurate open questions |
