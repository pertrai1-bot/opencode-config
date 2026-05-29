---
name: specification-driven-development
description: Load for features, API additions, cross-cutting changes, or requirements-sensitive work that should define a written specification before implementation begins.
metadata:
  source: agent-directives
  version: "1.0.0"
---

# Specification-Driven Development

Use this skill when building features or changes large enough to benefit from written specifications before implementation. It applies to new features, cross-cutting changes, API additions, and any work where "build it and see" risks significant rework.

This skill governs how the agent defines what it is going to build before building it, then verifies the result against that definition. It operates at a higher level than TDD and type-driven development. Spec-driven defines what and why, type-driven defines shapes, and TDD defines correctness.

Do not implement before the specification is written. Specifications are the contract. Code is the delivery.

## Core Principle: Write It Down First

A specification is a written description of what the system will do, written before the system does it. It is not documentation after the fact. It is a design tool that forces clarity about requirements, scope, and success criteria before any code is written.

The specification serves three audiences:

1. The implementer, possibly in a different session, who needs to know exactly what to build.
2. The reviewer, who can verify implementation against an explicit contract.
3. Future readers, who need to understand why the system works this way.

## The Specification Loop

```text
1. PROPOSE   - Define what and why
2. DESIGN    - Define how
3. SPECIFY   - Define requirements
4. IMPLEMENT - Build against spec
5. VERIFY    - Check against spec
```

### Phase 1: Propose

Write a short proposal that answers:

- What is changing and why
- Scope: what is in and what is explicitly out
- Success criteria: how do we know it is done
- Risks: what could go wrong or make this harder than expected

The proposal should be one page or less. If it needs to be longer, the scope is too big; break it into smaller changes.

Gate: read the proposal back. Does a competent developer understand what to build without asking clarifying questions? If not, fill the gaps before proceeding.

Wobble check: if you or the user hold strong conviction on any design choice in the proposal, introduce one credible dissenting perspective before locking it. If the conviction survives the challenge, it is stronger. If it does not, the proposal avoided a blind spot.

### Phase 2: Design

Write a design document that answers:

- Architecture: how the change fits into the existing system
- Key decisions: what approach was chosen and why alternatives were rejected
- Component changes: what files, modules, or services are affected
- Data flow: how data moves through the system for this change

The design should be concrete enough that an implementer can work from it without making architectural decisions.

Gate: trace through the design mentally. Can you walk from trigger to outcome without hitting a gap? If not, fill the gap.

Counterfactual check: for at least one key decision, ask, "Would this hold if the system used a different architecture, language, or data model?" Decisions that only make sense under current assumptions should be noted as such.

### Phase 3: Specify

Write detailed requirements. Each requirement should be:

- Atomic: one requirement, one behavior
- Testable: clear pass/fail condition
- Unambiguous: one reasonable interpretation

Use a consistent format for requirements and scenarios:

```md
### Requirement: [Name]

The system SHALL [behavior].

#### Scenario: [Name]

- GIVEN [precondition]
- WHEN [trigger]
- THEN [expected outcome]
```

Gate: for each requirement, ask, "Could I write a test for this?" If not, the requirement is too vague.

### Phase 4: Implement

Build the code against the specification:

- Requirements become implementation tasks
- Scenarios become test cases
- Design decisions guide architecture choices

During implementation, the specification is the source of truth. If the code suggests the specification is wrong, stop and update the specification first, then adjust the code. Do not silently diverge.

Implementation discipline:

1. Pick a requirement.
2. Write a test for its scenario when practical.
3. Implement to make the test pass.
4. Move to the next requirement.
5. Track progress against the full requirement list.

### Phase 5: Verify

After implementation, verify the result against the specification. Verification checks three dimensions:

| Dimension | Question | Method |
| --- | --- | --- |
| Completeness | Are all requirements implemented? | Check each requirement has code |
| Correctness | Does the code do what the spec says? | Trace scenarios to implementations |
| Coherence | Does the code follow the design? | Check architecture matches design |

In opencode, put the verification summary in the final response or PR body when creating a PR.

## Progressive Depth

Not every change needs all five phases. Scale the specification to the complexity of the change:

| Change Size | Proposal | Design | Detailed Spec | Phases |
| --- | --- | --- | --- | --- |
| Small, single function | Yes | Skip | Brief | 1, 3-5 |
| Medium feature | Yes | Yes | Yes | 1-5 |
| Large cross-cutting change | Yes | Yes | Yes | 1-5 |
| Bug fix | Brief | Skip | Skip | 1, 4-5 |

Rule of thumb: if you can hold the full change in your head, a brief proposal is sufficient. If you cannot, write the design and spec.

## Specification Location

Store specifications where the project expects them. Common patterns:

```text
project/
├── docs/specs/
├── .agents/specs/
└── openspec/specs/
```

The key constraint: specifications live in the repository, not in the agent's context window. They must be readable by future sessions.

## When Specifications Diverge from Reality

During implementation, you may discover that the specification is wrong. This is valuable because the specification caught a bad assumption early.

Process:

1. Stop implementing on the affected requirement.
2. Document the divergence: what the spec says and what reality requires.
3. Update the specification.
4. Note why the spec changed when the change is a durable decision.
5. Resume implementation from the updated spec.

Do not silently implement something different from the spec, keep implementing on top of a spec you know is wrong, or throw away the spec because "code is the real documentation."

## Relationship to Other Skills

| Skill | Relationship |
| --- | --- |
| `product-requirements-writer` | Produces the PRD/spec input for spec-driven work |
| `implementation-task-planner` | Turns the PRD/spec into executable tasks |
| `task-framing` | Frames scope and ambiguity before major edits |
| `codebase-navigation` | Provides repo orientation during proposal/design |
| `verification` | Provides final evidence protocol |
| `exploration-mode` | Investigates unclear options before locking the spec |

## Forbidden Patterns

| Pattern | Why Forbidden |
| --- | --- |
| Implementing before writing any specification | Skips the clarity that spec-first thinking provides |
| Writing specs after implementation | This is documentation, not specification |
| Vague requirements without testable criteria | Untestable requirements are unimplementable requirements |
| Silently diverging from the spec during coding | Defeats the purpose of having a spec |
| Skipping verification against the spec | Unverified specs are aspirations, not contracts |
| Writing a spec and never reading it again | The spec is a living document, not ceremony |

## Quick Reference

| Phase | Output | Gate |
| --- | --- | --- |
| Propose | What, why, scope, risks | Could someone else build from this? |
| Design | Architecture, decisions | Can you trace trigger to outcome? |
| Specify | Requirements, scenarios | Could you write a test for each? |
| Implement | Code and tests | Does each test map to a scenario? |
| Verify | Verification report | All requirements covered? All pass? |
