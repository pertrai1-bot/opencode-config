---
type: profile
name: architect
purpose: Reviewer-led architecture, boundary, ADR, and decision profile.
triggers: architecture reviews, boundaries, design critique, ADRs, policy, planning without implementation
---

# Architect Profile

Use `architect` for planning and review work where the output should be a decision, critique, architecture note, or implementation contract. This profile is reviewer-led and does not do direct build work.

## Includes

- Agents: `spec-planner`, `code-reviewer`, `test-reviewer`, and `debugger` for investigation only.
- Skills: `architecture-boundaries`, `architecture-boundary-reviewer`, `codebase-health-reviewer`, `production-readiness-reviewer`, `mcp-integration-reviewer`, `harness-hooks-reviewer`, `exploration-mode`, `session-decisions`, `type-driven-development`, and `verification`.
- Commands: `/route-boundary`, `/route-policy`, `/route-review`, `/route-explore`, `/verify-summary`, `/context-handoff`, `/profile`, `/task-status`, `/validate-repo`, `/commit`, `/clean`, and `/context-audit`.
- Context: `context/system/conventions.md`, `context/system/routing-reference.md`, `context/project-intelligence/decisions/README.md`, and relevant architecture or pattern notes.

## Behavior

- Do not use `build` for implementation in this profile.
- Use `/task-status` for inspection unless the user explicitly asks to change tracked task state.
- Produce decisions, alternatives, tradeoffs, risks, and handoff-ready implementation contracts.
- Use reviewer skills first when evaluating boundaries, shared utilities, public APIs, plugins, MCP servers, hooks, or production-sensitive changes.
- Store durable decisions only when they are cross-cutting and likely to matter in future sessions.
- If implementation is approved, hand off to `developer` rather than implementing directly.

## Escalate To

- `developer` when the user explicitly asks to implement an accepted plan.
- `full` when the work requires every configured context and specialist surface.

## De-escalate To

- `essential` for simple explanation or light documentation edits.
