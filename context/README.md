---
type: index
purpose: Entry point for reusable context in this opencode config.
triggers: starting unfamiliar work, resuming a session, changing workflow guidance, or looking for reusable knowledge
---

# Context System

This directory stores reusable knowledge for this opencode configuration. It helps agents find the smallest useful context instead of loading every instruction file up front.

## Start Here

- Read `context/INDEX.md` to find the right module.
- Read only the files matched by the task trigger.
- Use canonical files such as `AGENTS.md`, `skills/*/SKILL.md`, and `agent/*.md` for full rules.
- Treat context files as navigation and distilled memory, not replacements for source instructions.

## Minimal Viable Information

Context should follow MVI:

- **Concepts:** one clear sentence per concept.
- **Bullets:** short, scan-friendly, and directly actionable.
- **Examples:** concrete paths, commands, or trigger phrases.
- **Links:** point to canonical files rather than copying long sections.

## Context Areas

- `context/system/` explains how this config operates.
- `context/project-intelligence/` stores durable decisions and reusable patterns about this config.
- `rules/` keeps domain-specific rule packs such as Angular guidance.

## Do Not

- Do not load the whole context tree by default.
- Do not duplicate complete skill, agent, or command docs here.
- Do not use context files for private session state or temporary notes.
- Do not let stale context remain active when a decision changes.

## Future Context Manager

A future `context-manager` skill may add search, harvest, compact, and validate commands once the static structure proves useful.
