---
description: Detailed Policy Path guidance for directives, skills, repo workflow, contributor instructions, architecture policy, and conventions.
---

Use Policy Path for changes to:

- Directives or skills.
- Repo workflow.
- Contributor instructions.
- Architecture policy.
- Cross-cutting conventions.
- Agent, command, or opencode configuration architecture.

Required workflow:

1. Load `task-framing`.
2. Provide a proposal before major edits when tradeoffs exist.
3. Use `session-decisions` if the accepted change establishes or changes durable policy.
4. Use `/verify-summary` before PR or completion.
5. Use `/context-handoff` for multi-phase directive/workflow changes or new-session handoff.
6. Use `harness-hooks-reviewer` when policy changes affect agent harness hooks or deterministic automation.
7. Use `mcp-integration-reviewer` when policy changes affect MCP/tool surfaces exposed to agents.

Scope guardrails:

- Bound the implementation tightly.
- Do not delete policy files casually; deprecate or migrate with clear rationale.
- Avoid broad cleanup or unrelated rewording.
- Preserve startup compatibility for opencode config, agents, commands, and skills.

Output:

```md
Route: Policy Path
Proposal:
- Chosen approach:
- Alternatives rejected:
- Scope budget:
- Verification plan:
- Decision log needed: yes/no
```
