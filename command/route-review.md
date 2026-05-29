---
description: Detailed Review Path guidance for PRs, branches, diffs, local changes, tests, specs, boundaries, and production-sensitive reviews.
---

Use Review Path when the user asks to review a PR, branch, diff, or local changes.

Required routing:

- Use `@code-reviewer` for baseline PR/branch/diff/local-change review.
- Use `@test-reviewer` for tests and eval scenarios.
- Use `@spec-planner` for spec-backed work.
- Use `architecture-boundary-reviewer` for imports, exports, packages, moves, public APIs, or shared code.
- Use `codebase-health-reviewer` for TypeScript/JavaScript refactors, cleanup, shared utilities, dead code, duplication, complexity, or static-analysis health.
- Use `production-readiness-reviewer` for persistence, external services, async jobs, auth/security/privacy, infra/config/deploy, critical user paths, performance/scale, or cross-service compatibility.
- Use `harness-hooks-reviewer` for agent harness hooks or deterministic agent automation.
- Use `mcp-integration-reviewer` for MCP servers/tools, tool schemas, or agent-accessible internal API bridges.

Rules:

- Do not edit code during Review Path unless the user asks for fixes.
- Findings come first, ordered by severity with file and line references.
- Do not invent issues. If clean, say `No material findings` and list residual risks or testing gaps.
- Use `/context-handoff` for compact PR/review handoffs when findings will be fixed later or transferred to another session.

Output:

```md
## Findings

- File:Line - Severity - Finding. Fix: <specific remediation>

## Open Questions

- <question or assumption>

## Verdict

APPROVE / REQUEST_CHANGES / COMMENT
```
