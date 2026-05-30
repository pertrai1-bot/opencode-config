---
type: system-context
purpose: Authoring conventions for config artifacts and context files.
triggers: adding or editing agents, skills, commands, rules, context, or config docs
---

# Conventions

## Context Files

Use lightweight frontmatter:

```yaml
---
type: system-context | project-intelligence | index
purpose: one-line purpose
triggers: when agents should read this file
---
```

Keep context MVI-compliant: concise concepts, short bullets, concrete examples, and links to canonical sources.

## Skills

- Path: `skills/<skill-name>/SKILL.md`.
- Frontmatter includes `name`, `description`, and optional `metadata`.
- Use descriptions that state what the skill does and when to trigger it.
- Keep detailed protocols in skills, not in context summaries.

## Agents

- Path: `agent/<agent-name>.md`.
- Frontmatter defines opencode agent fields such as `name`, `description`, `mode`, `model`, permissions, and temperature.
- The body is the agent prompt.
- Use agents for SDLC ownership, not for one-off task notes.

## Commands

- Path: `command/<command-name>.md`.
- Frontmatter usually contains a short `description`.
- Use commands as explicit entry points for workflow modes or repeatable procedures.

## Profiles

- Path: `profiles/<profile-name>.md`.
- Use `profiles/README.md` as the registry and comparison table.
- Keep profile files focused on included agents, skills, commands, context, behavior, and escalation rules.
- Store the local active profile in `profiles/active-profile`; keep that file ignored by git.

## Rules

- Path: `rules/<domain>/<topic>.md`.
- Use domain-specific frontmatter such as `name`, `description`, `version`, `category`, `source_urls`, and `applies_to`.
- Keep rules close to technical ecosystems, such as `rules/angular/`.

## Project Intelligence

- Path: `context/project-intelligence/`.
- Use decisions for durable config choices with real alternatives.
- Use patterns for repeated reusable practices discovered during work.
- Do not store transient handoffs or local session notes here.

## Restart Requirement

After changing `opencode.jsonc`, agent files, skill files, plugin files, or other config-time files, restart opencode so the running session loads the changes.
