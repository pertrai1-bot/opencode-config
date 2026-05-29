---
name: test-driven-development
description: Defines RED/GREEN/REFACTOR expectations for behavior-changing implementation work and bug fixes.
metadata:
  source: agent-directives
  version: "1.0.0"
---

# Test Driven Development

Use TDD by default for behavior-changing code:

- New features.
- Bug fixes.
- Refactors that intentionally preserve or alter behavior.
- Edge-case patches.
- Review changes that affect runtime behavior.

TDD is not required for purely mechanical or non-behavioral work selected by `adaptive-routing`, such as docs-only edits, formatting-only changes, generated files, metadata-only updates, or mechanical renames with no behavior/API change.

If unsure whether a change affects behavior, choose TDD or ask one concise clarifying question.

## Command

Run `/tdd-cycle` before development starts and during development for detailed RED/GREEN/REFACTOR workflow guidance.

Auto-suggestion:

```md
Behavior-changing work selected. Run `/tdd-cycle` before implementation and use it during each RED/GREEN/REFACTOR cycle.
```

## Core Rule

For behavior-changing work, do not skip RED because the change seems obvious.

Requirements:

- One behavior per test.
- Clear descriptive name; split tests whose names need "and".
- Real code, not mocks, unless truly unavoidable.
- Test name describes behavior, not implementation.

## The Cycle

```text
RED -> GREEN -> REFACTOR -> GATES
```

- RED: write a failing test for one behavior.
- GREEN: write the minimum code to pass.
- REFACTOR: clean up while keeping tests green.
- GATES: run project quality gates selected by the route.

## Guardrails

- No implementation without a failing test.
- Write one test at a time.
- Write minimum code to pass.
- Verify types after GREEN when the project has type checks.
- Never refactor during GREEN.
- No skipping RED.
- No retrofitting tests after implementation to create the appearance of TDD.

## Quality Gates

After each RED/GREEN/REFACTOR cycle, run the project's relevant quality-gate command suite. If any gate fails, the cycle is incomplete.

## Commit Cadence

Commit after GATES, not after GREEN. GREEN means it works. REFACTOR means it is clean. GATES means it is verified.

## Verification Checklist

- [ ] Every behavior-changing function/method has a test.
- [ ] Watched each test fail before implementing.
- [ ] Each test failed for expected reason.
- [ ] Wrote minimal code to pass each test.
- [ ] All tests pass.
- [ ] Output is clean of unexpected errors or warnings.
- [ ] Tests use real code where practical.
- [ ] Edge cases and errors are covered.

## Forbidden Patterns

| Pattern | Why Forbidden |
| --- | --- |
| `it.skip()` | Skipping tests defeats TDD |
| `// TODO: write test later` | No test means no implementation constraint |
| Implementing without a failing test | RED must precede GREEN |
| Copy-pasting tests to pass quickly | Tests must reflect real behavior |
| `expect(true).toBe(true)` | Fake test, no constraint |
| Writing test after implementation | Not TDD |
