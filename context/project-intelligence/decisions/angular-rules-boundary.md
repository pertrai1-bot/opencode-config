---
type: project-intelligence
decision: angular-rules-boundary
status: active
triggers: moving Angular guidance, reorganizing rules, or adding domain context packs
---

# Keep Angular Rules In `rules/angular/`

## Context

Phase 2 created a new context system while existing Angular guidance already lived in `rules/angular/`. The choice was whether to migrate that content into `context/` or keep the rule-pack boundary intact.

## Decision

Keep Angular guidance in `rules/angular/` for now. The new context system is for reusable navigation, config operation, decisions, and patterns. Angular files are domain-specific rule packs with their own frontmatter and trigger model.

## Rejected Alternatives

**Move Angular rules to `context/domain/angular/` now** was rejected because it would turn Phase 2 into a content migration instead of validating the static context structure.

**Duplicate Angular summaries in `context/`** was rejected because duplicated guidance would drift from the rule files.

## Consequences

**Easier:** Phase 2 stays focused and `rules/angular/` remains the canonical Angular guidance location.

**Harder:** Agents must know that domain rules are outside `context/` and use `context/INDEX.md` to discover that boundary.

**Watch for:** If more domain rule packs are added, revisit whether `rules/` needs its own index or a context-manager search path.
