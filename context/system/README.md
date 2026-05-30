---
type: system-context
purpose: Overview of how this opencode config is organized.
triggers: orienting in this config repo or preparing to edit config artifacts
---

# System Context

This repo is a personal opencode configuration for running AI agents like a small software engineering team.

## Primary Surfaces

- `AGENTS.md` defines always-loaded workflow rules.
- `opencode.jsonc` defines model, agent overrides, permissions, and MCP servers.
- `agent/` defines custom SDLC agents.
- `skills/` defines loadable workflow and reviewer skills.
- `command/` defines explicit command entry points.
- `rules/` stores domain-specific rule packs.
- `context/` stores reusable navigation and project-intelligence context.

## Progressive Disclosure

- Start from `context/INDEX.md` when unsure what to read.
- Load a skill only when its trigger applies.
- Prefer links to canonical files over duplicated instructions.
- Keep task-specific state in `.planning/`, `.agents/`, PR bodies, or final responses, not in `context/`.

## Common Entry Points

- New feature or unclear request: read `context/system/sdlc-overview.md`.
- Route selection: read `context/system/routing-reference.md`.
- Config artifact editing: read `context/system/conventions.md`.
- Tracked spec execution: read `context/system/task-tracking.md`.
- Durable config decision: read `context/project-intelligence/decisions/README.md`.
