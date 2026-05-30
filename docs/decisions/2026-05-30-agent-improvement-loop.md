---
date: 2026-05-30
task: Implement Phase 5 agent improvement loop
domain: agent-improvement-loop
kind: process
scope: repo
status: active
triggers:
  - changing eval storage
  - adding improvement-loop commands
  - changing error-memory or decision-log workflow
  - adding prompt variant infrastructure
applies_to:
  - AGENTS.md
  - command/*.md
  - docs/**
  - .planning/evals/**
supersedes: []
---

# Keep The Agent Improvement Loop Lightweight And Command-Integrated

## Context

Phase 5 needed to make existing learning mechanisms operational without turning the config into an eval platform before the SDLC flow has more real usage. The concrete choices were whether to add a dedicated improvement command, where to store eval specs, and whether to add executable eval infrastructure now.

## Decision

Extend the existing `validate-repo`, `clean`, and `context-audit` commands for improvement-loop checks, store eval protocols under `.planning/evals/`, and keep the first task-management smoke test as markdown. This keeps the loop visible in commands agents already use while avoiding premature runner or prompt-variant infrastructure.

## Rejected Alternatives

**Add a dedicated `improvement-audit` command** was rejected for now because the existing operational commands already own validation, cleanup, and context auditing surfaces. A separate command can be added later if those checks become too large.

**Store evals at repo-root `evals/`** was rejected because `.planning/` is already the planning and execution-support area, and these smoke tests are workflow planning artifacts rather than runtime code.

**Add executable eval-runner infrastructure now** was rejected because markdown protocols are enough to validate the first workflow loop and avoid committing to runner semantics before more eval examples exist.

## Consequences

**Easier:** Phase 5 adds durable feedback hooks with minimal new surface area and no executable maintenance burden.

**Harder:** Eval execution remains manual until repeated smoke-test use proves a runner is worth maintaining.

**Watch for:** If `.planning/evals/` accumulates multiple protocols or manual runs become inconsistent, revisit whether to add an executable runner or a dedicated audit command.

**Unlearn:** Do not assume every feedback loop needs automation immediately; this decision is based on early-stage workflow stabilization.
