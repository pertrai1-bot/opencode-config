---
description: Detailed Full Path guidance for features, behavior changes, meaningful refactors, tests, and type/API changes.
---

Use Full Path for normal implementation work:

- New features.
- Behavior changes.
- Meaningful refactors.
- Tests added or changed for behavior.
- Type or API changes.

Required workflow:

1. Use `codebase-navigation` before editing unfamiliar code.
2. Use `task-framing` for non-trivial, ambiguous, high-risk, or cross-cutting work.
3. Use `type-driven-development` for typed projects or public contracts.
4. Use `test-driven-development`; run `/tdd-cycle` before development starts and during development when behavior changes.
5. Use `verification`; run `/verify-summary` before final gates or completion claims.
6. Use `context-handoff`; run `/context-handoff` when switching phases, sessions, or agents.

Agent and skill routing:

- Use `@spec-planner` when turning a feature idea or vague request into a PRD/spec before planning.
- Use `@spec-planner` when turning a PRD/spec/issue into implementation tasks.
- Use `subagent-driven-development` when executing an existing implementation plan through delegated subagents or isolated worker sessions.
- Use `self-audit` after REFACTOR for substantial Full Path work.
- Use `@test-reviewer` when tests are added or substantially changed.
- Use `@spec-planner` when reviewing implementation against a written spec or preparing spec-governed work for merge.
- Use `production-readiness-reviewer` before merge/review when the change touches persistence, external services, async jobs, auth/security/privacy, infra/config/deploy, critical user paths, performance/scale, or cross-service compatibility.
- Use `harness-hooks-reviewer` when implementation adds or changes agent harness hooks or deterministic agent automation.
- Use `mcp-integration-reviewer` when implementation adds or changes MCP servers/tools, tool schemas, or agent-accessible internal API bridges.

Output:

```md
Route: Full Path
Scope budget: <files/areas and non-goals>
Commands suggested: /tdd-cycle, /verify-summary, /context-handoff when crossing phases
Evidence required: <tests/checks/proofs>
```
