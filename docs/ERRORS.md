# Error Memory

Last Review: 2026-05-30

Use this file for recurring, non-obvious mistakes that future agents are likely to repeat. Do not record one-off typos, errors already caught by lint or type checks, or mistakes caused by unclear requirements.

## When To Add An Entry

Add an entry only when all are true:

- The mistake reached a commit, PR, or significant draft.
- A human corrected it, or verification caught it.
- The mistake is likely to recur in a fresh session.
- The prevention strategy is not obvious from existing checks.

## Review Cadence

Review this file monthly. During review:

- Automate prevention for entries with 5+ occurrences when a linter, type guard, test, or CI check can catch the pattern.
- Consider retiring entries with 1-2 occurrences and no recurrence in 30+ days.
- Keep retired entries for reference and mark them with `(RETIRED)` in the heading.

## Entry Format

```md
## Error: Short descriptive name

**Frequency**: N occurrences | **Severity**: High | Medium | Low | **Last Occurrence**: YYYY-MM-DD

**Symptom**: What you see when the error manifests.

**Bad Pattern**: `concrete mistake`

**Correct Pattern**: `concrete fix`

**Prevention**: Actionable prevention steps.

---
```

## Active Entries

No qualifying recurring errors have been recorded yet.
