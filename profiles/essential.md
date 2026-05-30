---
type: profile
name: essential
purpose: Smallest safe default profile for light routing and focused edits.
triggers: default mode, quick fixes, low-risk documentation or metadata edits
---

# Essential Profile

Use `essential` as the default operating mode. It keeps context small and escalates when the task stops being simple.

## Includes

- Agents: `plan` for routing and `build` for trivial focused edits.
- Skills: `adaptive-routing`, `task-framing` when risk appears, `verification`, and lightweight `task-management` awareness.
- Commands: `/route-light`, `/verify-summary`, `/profile`.
- Context: `context/INDEX.md`, `context/system/routing-reference.md`, and directly relevant convention files only.

## Behavior

- Prefer the lightest safe route.
- Do not invoke `spec-planner` for typos, wording edits, comments, formatting-only, or metadata-only work.
- Ask one concise clarifying question when uncertainty changes scope or safety.
- Verify with the smallest relevant check before completion claims.
- Escalate rather than stretching this profile into feature, architecture, or review work.

## Escalate To

- `developer` for features, behavior changes, tests, meaningful refactors, task-managed implementation, or code changes with multiple dependent steps.
- `architect` for architecture direction, boundaries, ADRs, policy, reviewer-led planning, or risk analysis without implementation.
- `full` only when explicitly requested or when the task genuinely needs every configured surface.
