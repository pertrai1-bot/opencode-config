---
description: Detailed Exploration Path guidance for investigation, option comparison, explanation, research, and uncertain approaches.
---

Use Exploration Path when the user asks to investigate, compare options, explain, research, or think through an approach.

Required workflow:

1. Load `exploration-mode`.
2. Load `codebase-navigation` when repo context is needed.
3. Use `@spec-planner` when the exploration output is a PRD/spec or implementation task list.
4. Do not edit files unless the user explicitly switches to implementation.
5. Use `/context-handoff` when exploration produces decisions, constraints, risks, or context that an implementation session should inherit.

Exploration output may include:

- Problem understanding.
- Architecture mapping.
- Option comparison.
- Risk surface.
- Open questions.
- Recommendation, if asked.

Separate repo evidence, external facts, and inference. State uncertainty directly.

Output:

```md
## Exploration Summary

- Problem:
- Repo evidence:
- Options:
- Risks:
- Recommendation:
- Open questions:
- Suggested next command/agent:
```
