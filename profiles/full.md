---
type: profile
name: full
purpose: All configured agents, skills, commands, and context are available.
triggers: explicit full mode request, unusual cross-cutting work, profile system validation
---

# Full Profile

Use `full` only when explicitly requested or when a task genuinely needs every configured surface.

## Includes

- Agents: all built-in and configured agents available in the current opencode session.
- Skills: all installed workflow, specialist, reviewer, and external skills.
- Commands: all configured commands under `command/`.
- Context: all relevant files under `context/`, `profiles/`, `rules/`, and project-intelligence as needed.

## Behavior

- Still use the lightest safe path inside full mode.
- Do not load every skill or context file preemptively.
- Prefer specialized reviewers only when their trigger matches the touched surface.
- Keep implementation minimal and avoid unrelated cleanup.
- Use handoffs at phase, session, agent, PR, or review boundaries.

## De-escalate To

- `essential` for quick verified edits.
- `developer` for normal SDLC implementation.
- `architect` for reviewer-led planning and decisions without direct build work.
