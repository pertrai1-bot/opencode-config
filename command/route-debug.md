---
description: Detailed Debugging Path guidance for bugs, failing tests, CI/build/lint/typecheck failures, regressions, and flaky behavior.
---

Use Debugging Path for:

- Bugs.
- Failing tests.
- Failing CI, build, lint, or type-check.
- Regressions.
- Flaky or unexpected behavior.

Required workflow:

1. Use `@debugger`.
2. Reproduce the failure before changing code.
3. Capture the exact command, expected result, actual result, determinism, and smallest known trigger.
4. Localize where correct state becomes incorrect.
5. Form one falsifiable hypothesis at a time.
6. Add or identify a failing regression test when behavior changed.
7. Use `/tdd-cycle` for the fix when production behavior changes.
8. Use `/verify-summary` for fix proof and no-regression evidence.
9. Use `/context-handoff` after reproduction, before a risky fix, or before resuming in a new session.

Required debugging summary:

```md
### Reproduction
- Command or steps:
- Expected:
- Actual:
- Determinism:
- Smallest trigger:

### Fault Localization
- Working reference:
- Failing path:
- Boundary where it diverges:
- Evidence:

### Hypothesis
- Hypothesis:
- Test performed:
- Result: confirmed / disproven / inconclusive
- Evidence:

### Fix Proof
- Regression proof:
- Root-cause fix:
- Narrow verification:
- Broad verification:
- Follow-up memory/decision needed:
```

Do not edit before reproducing. Do not try multiple fixes at once. After three failed fix attempts, stop and reassess instead of trying a fourth fix.
