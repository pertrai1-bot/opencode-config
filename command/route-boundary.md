---
description: Detailed Boundary Path guidance for imports, exports, packages, folders, services, shared utilities, and dependency direction.
---

Add Boundary Path whenever the task touches:

- Imports or exports.
- Folder, module, or package moves.
- Public entry points.
- Shared utilities.
- Service or package boundaries.
- Dependency direction or architecture rules.

Required workflow:

1. Load `architecture-boundaries`.
2. Identify modified zones, layers, packages, and public entry points.
3. Identify changed dependency edges.
4. Use `architecture-boundary-reviewer` before merge/review.
5. Include boundary proof in `/verify-summary`.
6. Use `/context-handoff` before boundary review or session transfer when the dependency-edge evidence matters.

Boundary proof should show:

- Modified zones/layers/packages.
- Changed dependency edges.
- Evidence that no upward, sideways, cyclic, or public-API-bypassing import was introduced.
- Tool evidence when available, such as `npx fallow dead-code --boundary-violations` or circular-dependency checks.

Output:

```md
Route: Boundary Path + <base path>
Changed dependency edges:
- <from> -> <to>
Boundary evidence:
- <check/result>
Review command/skill: architecture-boundary-reviewer
```
