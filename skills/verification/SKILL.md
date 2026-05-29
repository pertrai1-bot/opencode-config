---
name: verification
description: Requires structured evidence of correctness before quality gates, handoffs, pull requests, and completion claims.
metadata:
  source: agent-directives
  version: "1.0.0"
---

# Verification Protocol

Load after implementation/refactor and before final quality gates, PR creation, handoff, or any completion claim.

Do not claim work is done without fresh evidence produced after the last code/config/documentation change.

## Command

Run `/verify-summary` when a full verification template is needed. The command contains the detailed proof sections for functional behavior, tests, integration, architecture boundaries, codebase health, documentation, scope control, bug fixes, docs/chore work, and PR bodies.

Auto-suggestion:

```md
Verification required before completion. Run `/verify-summary` for the full evidence template.
```

## Required Evidence

Every implementation needs evidence appropriate to its route:

- Functional proof: one hit and one clean pass.
- Test proof: exact command and result, with relevant cases named.
- Integration proof: exports, registration, config, public API, and error handling.
- Boundary proof when imports, exports, packages, folders, services, or shared utilities changed.
- Documentation proof when public behavior or usage changed.
- Scope control proof showing the final diff stayed inside the planned scope budget.

Bug fixes must show the previously failing check now passing, the root-cause fix, and no-regression evidence.

Docs/chore changes must show the relevant quality gate or explain why no gate applies.

## Quality Gate Feedback

Run project-native gates selected by the route. Treat lint, type-check, build, test, static-analysis, and review-bot output as implementation feedback.

Fix root causes rather than suppressing rules, weakening config, or making superficial edits. If a finding is pre-existing or outside scope, state that classification and show the current change did not make it worse.

## Forbidden Patterns

| Pattern | Why Forbidden |
| --- | --- |
| "Tests pass, ship it" | Passing tests are not the whole verification story |
| Skipping functional proof | Must show expected behavior and no false positive |
| Skipping integration proof | Misconfigured code can pass tests and fail in production |
| Skipping boundary proof for dependency changes | Passing tests do not prove architectural validity |
| Claiming verification without showing output | Evidence, not claims |
| Running final gates before verification thinking | Verification catches issues gates may not cover |
