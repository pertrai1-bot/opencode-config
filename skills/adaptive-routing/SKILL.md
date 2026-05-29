---
name: adaptive-routing
description: Selects the lightest safe workflow path, relevant agents/skills, command suggestions, and handoff requirements based on task intent, risk, and touched surfaces.
metadata:
  source: agent-directives
  version: "1.6.0"
---

# Adaptive Workflow Routing

Load first for every implementation, debugging, review, exploration, or policy task. Select the lightest workflow that still proves safety. Do not load every skill or command by default.

## Router Output

For tiny low-risk edits, one sentence is enough:

```md
Route: Light Path; suggested command `/route-light`; no additional specialist skills required.
```

Before major edits, output a compact route decision:

```md
## Workflow Route

- Intent: <feature | bug-fix | refactor | docs | review | exploration | policy-change | mechanical>
- Path: <Light | Full | Debugging | Boundary | Workspace Isolation | Review | Exploration | Policy> or combined paths
- Risk: <low | medium | high> with reason
- Suggested command: </route-* command>
- Required agents: <agents, if any>
- Required skills: <skills, if any>
- Selected rules: <rule paths, if any>
- Evidence required: <tests/checks/proofs>
- Handoff required: <yes/no and why>
- Confirmation needed: <yes/no and why>
```

## Core Routing Rules

1. Start with project instructions.
2. Pick the lightest safe path.
3. Escalate by risk; words like "quick" or "just" do not downgrade safety.
4. Combine paths when needed.
5. Prefer evidence over ritual.
6. Use `context-handoff` and `/context-handoff` at major phase/session/agent boundaries.
7. Ask only when classification uncertainty affects safety or scope.
8. Bound implementation; avoid unrelated cleanup, rewrites, speculative abstractions, and drive-by formatting.

## Command Suggestions By Path

When a path is selected, suggest the matching command for detailed guidance:

| Path | Use when | Suggested command |
| --- | --- | --- |
| Light | Docs, typos, comments, formatting, metadata-only changes | `/route-light` |
| Full | Features, behavior changes, meaningful refactors, type/API changes | `/route-full` |
| Debugging | Bugs, failing gates, regressions, flaky or unexpected behavior | `/route-debug` |
| Boundary | Imports, exports, packages, public entry points, shared utilities | `/route-boundary` |
| Review | PRs, branches, diffs, local-change review | `/route-review` |
| Exploration | Investigation, comparison, explanation, research, uncertain approach | `/route-explore` |
| Policy | Directives, skills, agents, commands, repo workflow, conventions | `/route-policy` |

## Skill Discovery Map

Use this map after selecting the workflow path. Do not rely on inference when a listed situation matches.

| Situation / intent | Common path(s) | Required agent/skill |
| --- | --- | --- |
| Vague feature idea, product request, or unclear requirement needs a PRD/spec | Exploration / Full / Policy | `@spec-planner` |
| PRD, issue, spec, or acceptance criteria needs implementation tasks | Exploration / Full / Policy | `@spec-planner` |
| Existing implementation plan needs delegated subagents or isolated worker sessions | Full / Debugging / Policy | `subagent-driven-development` |
| Bug, regression, failing test, failing CI/build/lint/type-check, or unexpected behavior | Debugging | `@debugger` |
| Reviewing a PR, branch, diff, or local changes | Review | `@code-reviewer` |
| Writing, changing, or reviewing tests/eval scenarios | Full / Review | `@test-reviewer` |
| Implementation must be checked against a written spec/PRD | Full / Review | `@spec-planner` |
| Imports, exports, package boundaries, folders, services, shared utilities, or dependency direction change | Boundary / Review | `architecture-boundary-reviewer` |
| TypeScript/JavaScript refactor, cleanup, shared utilities, dead-code, duplication, complexity, or static-analysis health concern | Full / Review | `codebase-health-reviewer` |
| Persistence, external services, async jobs, auth/security/privacy, infra/config/deploy, critical user paths, performance/scale, or cross-service compatibility | Full / Debugging / Review | `production-readiness-reviewer` |
| Agent harness hooks, start/stop hooks, post-change automation, or deterministic agent workflow scripts are added or reviewed | Full / Review / Policy | `harness-hooks-reviewer` |
| MCP servers/tools, agent-accessible APIs, connectors, tool schemas, or write-capable agent tools are added or reviewed | Full / Review / Policy | `mcp-integration-reviewer` |
| Full Path work reaches post-REFACTOR pre-verification checkpoint | Full | `self-audit` |

## Rule Selection

- Treat `rules/` entries as lazy-loaded standards, not always-loaded context.
- Load framework rules only when project evidence and touched files match.
- Load file-scoped rules when touched paths match their `applies_to` frontmatter and the rule's description is relevant to the actual change.
- List selected rules separately from skills and agents in route output.
- Do not load unrelated framework rule packs.

The only migrated rule pack today is `rules/angular/`.

## Risk Escalation

| Risk trigger | Add |
| --- | --- |
| Auth, permissions, security, privacy, payments, data loss | Full Path + Production Readiness Review + stronger verification |
| Database schema, migrations, persistence, queues | Full Path + Production Readiness Review + rollback/edge-case proof |
| External services, async jobs, infra/config/deploy, critical user paths, performance/scale, cross-service compatibility | Full Path + Production Readiness Review |
| Agent harness hooks or deterministic agent automation | Policy/Full/Review Path + Harness Hooks Review |
| MCP servers/tools, agent-accessible APIs, or write-capable agent tools | Policy/Full/Review Path + MCP Integration Review |
| Public API, exported types, package entry points | Full Path + Integration Proof + Boundary Path |
| Imports, shared utilities, packages, folders, services | Boundary Path |
| Shared/default checkout, unrelated local changes, or explicit isolation request | Workspace Isolation Path |
| Failing CI/test/build/lint/type-check | Debugging Path |
| Cross-cutting policy or workflow | Policy Path |
| Large diff or broad refactor | Full Path + Self-Audit + Codebase Health Review + Context Handoff |

## Forbidden Patterns

| Pattern | Why Forbidden |
| --- | --- |
| Loading every skill, command, or rule by default | Wastes context and creates compliance theater |
| Using Light Path for behavior or bug fixes | Skips necessary proof |
| Treating "quick" as permission to skip safety | Risk depends on impact, not wording |
| Producing boilerplate verification with no evidence | Ritual is not proof |
| Appending active handoffs forever | Recreates context drift under a different filename |
| Ignoring lint/type/test/build feedback as "just tooling" | Tool output is implementation feedback |
| Adding cross-cutting tooling/config as a drive-by change | Policy changes need explicit review |
| Opportunistic refactors or cleanup outside the task | Increases review surface and hides behavior risk |
| Adding abstractions for hypothetical future use | Produces unnecessary code and weakens local fit |
