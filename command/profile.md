---
description: Inspect or change the active opencode operating profile.
---

# Profile Command

Manage the active operating profile. Profiles are defined in `profiles/` and control how much SDLC machinery should be considered active.

Arguments: `$ARGUMENTS`

## Supported Profiles

- `essential` - default lightweight mode for quick fixes, light docs, routing, framing, and verification.
- `developer` - full SDLC mode for features, behavior changes, tests, refactors, and task-managed implementation.
- `architect` - reviewer-led mode for architecture, boundaries, ADRs, policy, design critique, and implementation contracts.
- `full` - explicit all-surfaces mode for unusual cross-cutting work.

## Behavior

When invoked with no arguments:

1. Read `profiles/active-profile` if it exists.
2. If it does not exist, report `essential` as the default active profile.
3. Summarize the active profile using its matching file under `profiles/`.
4. List the available profiles and show examples for switching.

When invoked with one profile name:

1. Validate that the name is exactly one of `essential`, `developer`, `architect`, or `full`.
2. Read the matching `profiles/<name>.md` file.
3. Persist the selected profile by writing the profile name and a trailing newline to `profiles/active-profile`.
4. Report the new active profile and the main behavior change.

When invoked with an unknown value:

1. Do not write `profiles/active-profile`.
2. Explain the valid options.
3. Ask the user to rerun `/profile <name>` with a valid profile.

## Output

```md
Active profile: <profile>
Source: <profiles/active-profile or default>
Behavior: <one concise sentence>
Switch with: /profile essential | /profile developer | /profile architect | /profile full
```
