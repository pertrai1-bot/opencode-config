---
description: Produce a structured verification summary with functional, test, integration, boundary, documentation, and scope-control proof.
---

Produce verification evidence before final quality gates, PR creation, handoff, or any completion claim.

## For New Features or Changes

Include all applicable sections:

### Functional Proof

- Hit: one input or scenario that produces the expected new behavior.
- Clean pass: one input or scenario that should not be affected, proving no false positive.

```md
Hit: <scenario/input> -> <expected result>
Clean: <scenario/input> -> <unchanged or rejected result>
```

### Test Coverage Proof

List passing test cases grouped by:

- Happy path.
- Error cases.
- Edge cases.
- Suggestion/fix cases, if applicable.

Include the exact command and relevant passing output.

### Integration Proof

Use `[x]` for confirmed and `[ ]` for missing:

- [ ] Exported/registered in the appropriate entry point.
- [ ] Included in the relevant configuration or module.
- [ ] Public API, types, and function signatures match usage.
- [ ] Error messages are clear and actionable.

### Architecture Boundary Proof

Required when imports, exports, packages, shared code, service boundaries, or folder/layer structure changed.

- Modified zones/layers/packages.
- Changed dependency edges.
- Evidence that no upward, sideways, cyclic, or public-API-bypassing import was introduced.
- Tool evidence when available.

### Codebase Health Proof

For TypeScript/JavaScript refactors, cleanup, shared utilities, or generated changes where static-analysis tooling is available, summarize new dead code, duplication, complexity, cycles, or boundary regressions.

Separate pre-existing debt from issues introduced by the change.

### Documentation Proof

- [ ] API documentation updated, if public-facing or externally consumed.
- [ ] README or usage docs updated, if relevant.

### Scope Control Proof

- Planned scope budget: <quote exact scope budget>
- Changed files match the stated scope, or expansion is explained with evidence.
- No unrelated cleanup, opportunistic refactor, or drive-by formatting.
- No new abstraction, helper layer, dependency, or config surface unless required by current evidence.

## For Bug Fixes

```md
### Bug Fix Verification

- Previously failing check now passes:
- Root-cause fix:
- No regression evidence:
- Commands run:
- Remaining risks:
```

## For Docs or Chore Changes

Show the relevant quality gate still passes. Paste command output or state why no gate applies.

## PR Verification Block

```md
## Verification

### Functional

Hit: ...
Clean: ...

### Tests

- Command: ...
- Result: ...

### Integration

- [x] ...

### Architecture Boundaries

- [x] ...

### Documentation

- [x] ...

### Scope Control

Planned scope budget: ...
Scope control: ...
```

If anything is `[ ]` or tests are missing for required behavior, the implementation is not ready.
