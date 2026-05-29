---
description: Run the RED/GREEN/REFACTOR TDD cycle before and during behavior-changing development.
---

Use this command before development starts and during development for behavior-changing work, bug fixes, edge-case patches, and review changes that affect runtime behavior.

## Step-by-Step Cycle

1. Pick one method, behavior, or scenario to implement.
2. RED phase:
   - Write one test for that behavior.
   - Review the test with `@test-reviewer` when test quality is material.
   - Run the test and confirm it fails for the expected reason.
   - Do not open implementation files until RED output exists.
3. GREEN phase:
   - Write the minimum code to make the test pass.
   - Run the focused test and confirm it passes.
   - Run type checks when the project has them.
4. REFACTOR phase:
   - Clean up implementation while keeping behavior unchanged.
   - Remove duplication and simplify only where the current evidence requires it.
   - Run the focused test again.
5. GATES:
   - Run the project quality gates selected by the route: test, lint, type-check, build, or static analysis.
   - Fix failures before proceeding.
6. Commit or hand off only after RED, GREEN, REFACTOR, and GATES are complete.

## Fixes and Review Changes

Bug fixes, review feedback, and edge-case patches are not exempt:

1. RED: write a test that demonstrates the bug or missing edge case.
2. Confirm it fails.
3. GREEN: write the fix.
4. REFACTOR: clean up without changing behavior.
5. GATES: run required verification.

## Checkpoints

- [ ] One behavior per test.
- [ ] Test name describes behavior, not implementation.
- [ ] Test fails before implementation.
- [ ] Test fails for the expected reason.
- [ ] Implementation is minimum necessary to pass.
- [ ] Refactor happened only after GREEN.
- [ ] Quality gates passed after REFACTOR.
- [ ] No skipped tests, fake assertions, or implementation mirroring.

## Output

```md
### TDD Cycle Evidence

- Behavior:
- RED command/result:
- GREEN command/result:
- REFACTOR notes:
- Gates command/result:
- Next behavior:
```
