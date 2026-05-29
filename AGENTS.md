<!-- context7 -->
Use Context7 MCP to fetch current documentation whenever the user asks about a library, framework, SDK, API reference, CLI tool, or cloud service. This includes setup, configuration, migration, library-specific debugging, and code examples. Prefer Context7 over web search for library docs.

Do not use Context7 for refactoring, business-logic debugging, code review, or general programming concepts.

## Context7 Steps

1. Always start with `resolve-library-id` using the library name and the user's question, unless the user provides an exact library ID in `/org/project` format.
2. Pick the best match by exact name, relevant description, snippet coverage, source reputation, and benchmark score.
3. Use `query-docs` with the selected library ID and the user's full question.
4. Answer using the fetched docs.
<!-- context7 -->

---

## Skills - Progressive Disclosure

Skills are reusable knowledge packages. Load them on demand when a workflow is active or when the task needs the full protocol, checklist, output format, or forbidden-pattern guidance.

### When to Load a Skill

- Before unfamiliar or high-risk work when a matching skill exists.
- When a workflow summary below says to load the corresponding skill.
- When the task needs a detailed checklist, artifact template, or review rubric.
- When the task has moved from a light path into a specialized path such as spec writing, implementation planning, debugging, or review.

### Installed Workflow Skills

- `product-requirements-writer` - Turn rough feature ideas, vague requirements, or product requests into a concrete PRD/spec before implementation planning.
- `implementation-task-planner` - Turn a PRD, issue, spec, or acceptance criteria into an executable task list with likely files, tests, validation steps, and checkpoints.
- `specification-driven-development` - Use the full spec-first protocol for features or cross-cutting changes where build-and-see would risk rework.
- `adaptive-routing` - Select the lightest safe workflow path for the task.
- `task-framing` - Frame non-trivial, ambiguous, high-risk, or cross-cutting tasks before substantial edits.
- `verification` - Produce evidence of correctness before declaring work complete.
- `error-memory` - Capture repeated, non-obvious mistakes as durable prevention rules.
- `exploration-mode` - Investigate options before committing to an implementation approach.
- `codebase-navigation` - Use progressive codebase orientation before implementation, review, or unfamiliar work.

### Installed Specialist Skills

- `code-reviewer` - Review PRs, branches, diffs, or local changes for bugs, regressions, security, maintainability, and merge risk.
- `systematic-debugging` - Reproduce, localize, hypothesize, fix, and prove bugs or failures without guess-and-check edits.
- `self-audit` - Run a pre-verification Jenga test, anomaly register, diff check, and scope reality check.
- `spec-reviewer` - Review implementation against a written spec or PRD.
- `test-reviewer` - Review tests and evaluation scenarios.

### Additional Specialist Skills To Integrate

- `architecture-boundary-reviewer` - Review imports, exports, package boundaries, dependency direction, and shared-code movement.
- `codebase-health-reviewer` - Review TypeScript/JavaScript refactors, duplication, dead code, complexity, and static-analysis health.
- `production-readiness-reviewer` - Review production-sensitive changes involving persistence, external services, async jobs, auth, security, privacy, deploy, performance, or critical paths.
- `harness-hooks-reviewer` - Review deterministic agent harness hooks and workflow automation.
- `mcp-integration-reviewer` - Review MCP servers/tools, tool schemas, and agent-accessible API bridges.
- `subagent-driven-development` - Coordinate delegated or isolated implementation work when explicitly using subagents.

---

## Workflows - Universal Rules

These rules are always loaded. They provide routing and workflow selection only. Load the matching skill when the workflow is active and the summary is not enough.

### 1. Spec-Driven Development

Use for features, API additions, cross-cutting changes, unclear requirements, or any change where build-and-see risks rework.

Sequence:

1. PRD: load `product-requirements-writer` to define the problem, goals, non-goals, users, scope, functional requirements, success criteria, and open questions.
2. Tasks: load `implementation-task-planner` to turn the PRD/spec into small executable tasks with likely files, test targets, validation commands, and review checkpoints.
3. Implementation: follow the task list. Use task framing before major edits and routing to select any additional workflow path.
4. Verification: produce evidence that the implementation satisfies the spec before claiming completion.

Do not implement before the specification exists when the task needs spec-driven development. The spec is the contract; code is the delivery.

### 2. Adaptive Routing

Use for every task. Pick the lightest safe path that still proves correctness.

- Light Path: typo, docs wording, comments, formatting-only, or metadata changes with no behavior/build/test/runtime impact.
- Full Path: new features, behavior changes, meaningful refactors, tests changed for behavior, type/API changes.
- Debugging Path: bugs, failing tests, failing CI/build/lint/typecheck, regressions, flaky or unexpected behavior.
- Boundary Path: imports, exports, packages, shared utilities, public entry points, folder moves, service boundaries, or dependency direction.
- Review Path: PR, branch, diff, or local-change review.
- Exploration Path: investigation, comparison, explanation, research, uncertainty, or approach discovery.
- Policy Path: changes to directives, skills, repo workflow, contributor instructions, architecture policy, or cross-cutting conventions.

Do not load every skill by default. Escalate by risk, not by user wording. A request for a quick fix does not downgrade safety for security, data, public API, persistence, or boundary changes.

### 3. Task Framing

Use before substantial edits on non-trivial, ambiguous, high-risk, or cross-cutting work.

Establish the problem, success criteria, constraints, definitions, assumptions, failure modes, alternatives, evidence plan, and scope budget. If a binary choice appears, find at least one real third option before deciding. Ask one concise clarifying question when an unknown materially affects safety or scope.

### 4. Verification

Use after implementation and before claiming completion, opening a PR, or handing off work.

Verification must provide evidence, not assertions. Include the relevant functional proof, test proof, integration proof, boundary proof, documentation proof, and scope-control proof. In normal opencode sessions, put the verification summary in the final response or PR body if a PR is created.

### 5. Error Memory

Use when a mistake is likely to recur and prevention is non-obvious.

Write durable error memory only when the mistake reached a commit, PR, or significant draft; a human corrected it or verification caught it; it is likely to recur; and the prevention strategy is not obvious. Store reusable prevention knowledge, not blame or one-off trivia.

### 6. Exploration Mode

Use when the user asks to explore, investigate, compare options, think through an approach, or handle uncertainty.

Do not implement during exploration unless the user explicitly switches to execution. Be curious rather than prescriptive, ground conclusions in repo evidence where relevant, surface multiple plausible directions, and state uncertainty directly.

### 7. Codebase Navigation

Use for unfamiliar repositories, unfamiliar areas, or new multi-step sessions.

Orient progressively before editing. Survey the project instructions, top-level structure, entry points, and build/test/lint commands. Analyze only the relevant types, tests, and patterns. Focus on the files needed for the task. Avoid deep tree dumps, full-file reads, and unrelated context loading.

---

## Hivemind - Unified Memory System

The hive remembers learnings, decisions, patterns, and prior agent sessions. Query it before complex implementation or debugging to avoid rediscovering known solutions.

### When to Use

- Before implementing non-trivial work, search for relevant learnings or similar prior sessions.
- During debugging, search for similar errors, failure modes, or past fixes.
- After solving a hard or recurring problem, store the root cause, prevention strategy, and why it matters.
- When an architecture decision or project-specific pattern is confirmed, store the reasoning and tradeoffs.

### Usage Pattern

```typescript
// Before starting work
hivemind_find({ query: "<task keywords>", limit: 5 })

// After solving a durable problem
hivemind_store({
  information: "<what was learned, why it matters, and how to prevent recurrence>",
  tags: "<relevant,tags>"
})
```

Store why, not just what. Validate or remove stale memories when you discover they are outdated.

---

## Working Rules

- Prefer small, correct changes over broad rewrites.
- Do not perform unrelated cleanup, speculative abstraction, or drive-by formatting.
- Preserve user or other-agent work in dirty worktrees. Never revert changes you did not make unless explicitly asked.
- For frontend work, preserve existing design-system conventions unless the task explicitly asks for new visual direction.
- For reviews, findings come first and are ordered by severity with file/line references.
- At the end of work, state what changed, what was verified, and any remaining risks or restart requirements.
