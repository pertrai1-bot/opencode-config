---
description: Detailed Light Path guidance for low-risk docs, typo, comments, formatting, and metadata-only work.
---

Use Light Path for low-risk, non-behavioral changes:

- Typos.
- Docs wording edits.
- Comments.
- Formatting-only changes.
- Metadata changes that do not affect runtime, build, tests, packaging, or public API.

Required workflow:

1. Do minimal orientation.
2. Make the smallest targeted change.
3. Run the relevant project quality gate when available.
4. Provide concise verification evidence.
5. Skip handoff unless work will continue in another session or the user requests it.

Do not use Light Path for bug fixes, behavior changes, public API changes, dependency changes, boundary changes, security, data, auth, or persistence work.

Output:

```md
Route: Light Path; no additional specialist commands required.
Verification: <command/check and result>
```
