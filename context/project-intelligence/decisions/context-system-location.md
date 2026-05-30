---
type: project-intelligence
decision: context-system-location
status: active
triggers: changing context root, moving context files, or adding context-manager behavior
---

# Use `context/` For Config Context

## Context

Phase 2 needed a root for reusable context in this personal opencode config. The real options were `context/`, `.opencode/context/`, or another root-local directory.

## Decision

Use `context/` at the repository root. This config repo is already the opencode configuration, so a visible top-level context directory is simpler to discover and easier for future agents to navigate.

## Rejected Alternatives

**`.opencode/context/`** was rejected because this repo is itself the global opencode config. Nesting context under `.opencode/` would make the structure less visible without adding a loading benefit.

**Another root-local name** was rejected because `context/` is direct, conventional, and matches the purpose of the directory.

## Consequences

**Easier:** Fresh sessions can find context from the root without knowing opencode project-local layout conventions.

**Harder:** If this structure is copied into normal application repos, agents must decide whether `context/` or project-local `.opencode/context/` is more appropriate there.

**Watch for:** Future profile-loading or context-manager behavior must not assume opencode automatically loads `context/`.
