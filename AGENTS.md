<!-- context7 -->
Use Context7 MCP to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service -- even well-known ones like React, Next.js, Prisma, Express, Tailwind, Django, or Spring Boot. This includes API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage. Use even when you think you know the answer -- your training data may not reflect recent changes. Prefer this over web search for library docs.

Do not use for: refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Steps

1. Always start with `resolve-library-id` using the library name and the user's question, unless the user provides an exact library ID in `/org/project` format
2. Pick the best match (ID format: `/org/project`) by: exact name match, description relevance, code snippet count, source reputation (High/Medium preferred), and benchmark score (higher is better). If results don't look right, try alternate names or queries (e.g., "next.js" not "nextjs", or rephrase the question). Use version-specific IDs when the user mentions a version
3. `query-docs` with the selected library ID and the user's full question (not single words)
4. Answer using the fetched docs
<!-- context7 -->

---

## Skills - Knowledge Injection

Skills are reusable knowledge packages. Load them on-demand for specialized tasks.

### When to Use

- Before unfamiliar work - check if a skill exists
- When you need domain-specific patterns
- For complex workflows that benefit from guidance

### Usage

```bash
skills_list()                              # See available skills
skills_use(name="swarm-coordination")      # Load a skill
skills_use(name="cli-builder", context="building a new CLI") # With context
```

**Bundled Skills:** cli-builder, learning-systems, skill-creator, swarm-coordination, system-design, testing-patterns

## Hivemind - Unified Memory System

The hive remembers everything. Learnings, sessions, patterns—all searchable.

**Unified storage:** Manual learnings and AI agent session histories stored in the same database, searchable together. Powered by libSQL vectors + Ollama embeddings.

**Indexed agents:** Claude Code, Codex, Cursor, Gemini, Aider, ChatGPT, Cline, OpenCode, Amp, Pi-Agent

### When to Use

- **BEFORE implementing** - check if you or any agent solved it before
- **After solving hard problems** - store learnings for future sessions
- **Debugging** - search past sessions for similar errors
- **Architecture decisions** - record reasoning, alternatives, tradeoffs
- **Project-specific patterns** - capture domain rules and gotchas

### Tools

| Tool | Purpose |
|------|---------|
| `hivemind_store` | Store a memory (learnings, decisions, patterns) |
| `hivemind_find` | Search all memories (learnings + sessions, semantic + FTS fallback) |
| `hivemind_get` | Get specific memory by ID |
| `hivemind_remove` | Delete outdated/incorrect memory |
| `hivemind_validate` | Confirm memory still accurate (resets 90-day decay timer) |
| `hivemind_stats` | Memory statistics and health check |
| `hivemind_index` | Index AI session directories |
| `hivemind_sync` | Sync to .hive/memories.jsonl (git-backed, team-shared) |

### Usage

**Store a learning** (include WHY, not just WHAT):

```typescript
hivemind_store({
  information: "OAuth refresh tokens need 5min buffer before expiry to avoid race conditions. Without buffer, token refresh can fail mid-request if expiry happens between check and use.",
  tags: "auth,oauth,tokens,race-conditions"
})
```

**Search all memories** (learnings + sessions):

```typescript
// Search everything
hivemind_find({ query: "token refresh", limit: 5 })

// Search only learnings (manual entries)
hivemind_find({ query: "authentication", collection: "default" })

// Search only Claude sessions
hivemind_find({ query: "Next.js caching", collection: "claude" })

// Search only Cursor sessions
hivemind_find({ query: "API design", collection: "cursor" })
```

**Get specific memory**:

```typescript
hivemind_get({ id: "mem_xyz123" })
```

**Delete outdated memory**:

```typescript
hivemind_remove({ id: "mem_old456" })
```

**Validate memory is still accurate** (resets decay):

```typescript
// Confirmed this memory is still relevant
hivemind_validate({ id: "mem_xyz123" })
```

**Index new sessions**:

```typescript
// Automatically indexes ~/.config/opencode/sessions, ~/.cursor-tutor, etc.
hivemind_index()
```

**Sync to git**:

```typescript
// Writes learnings to .hive/memories.jsonl for git sync
hivemind_sync()
```

**Check stats**:

```typescript
hivemind_stats()
```

### Usage Pattern

```bash
# 1. Before starting work - query for relevant learnings
hivemind_find({ query: "<task keywords>", limit: 5 })

# 2. Do the work...

# 3. After solving hard problem - store learning
hivemind_store({
  information: "<what you learned, WHY it matters>",
  tags: "<relevant,tags>"
})

# 4. Validate memories when you confirm they're still accurate
hivemind_validate({ id: "<memory-id>" })
```

### Integration with Workflow

**At task start** (query BEFORE implementing):

```bash
# Check if you or any agent solved similar problems
hivemind_find({ query: "OAuth token refresh buffer", limit: 5 })
```

**During debugging** (search past sessions):

```bash
# Find similar errors from past sessions
hivemind_find({ query: "cannot read property of undefined", collection: "claude" })
```

**After solving problems** (store learnings):

```bash
# Store root cause + solution, not just "fixed it"
hivemind_store({
  information: "Next.js searchParams causes dynamic rendering. Workaround: destructure in parent, pass as props to cached child.",
  tags: "nextjs,cache-components,dynamic-rendering,searchparams"
})
```

**Learning from other agents**:

```bash
# See how Cursor handled similar feature
hivemind_find({ query: "implement authentication", collection: "cursor" })
```

**Pro tip:** Query Hivemind at the START of complex tasks. Past solutions (yours or other agents') save time and prevent reinventing wheels.

## Swarm Coordinator Checklist (MANDATORY)

When coordinating a swarm, you MUST monitor workers and review their output.

### Monitor Loop

```
┌─────────────────────────────────────────────────────────────┐
│                 COORDINATOR MONITOR LOOP                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. CHECK INBOX                                             │
│     swarmmail_inbox()                                       │
│     swarmmail_read_message(message_id=N)                    │
│                                                             │
│  2. CHECK STATUS                                            │
│     swarm_status(epic_id, project_key)                      │
│                                                             │
│  3. REVIEW COMPLETED WORK                                   │
│     swarm_review(project_key, epic_id, task_id, files)      │
│     → Generates review prompt with epic context + diff      │
│                                                             │
│  4. SEND FEEDBACK                                           │
│     swarm_review_feedback(                                  │
│       project_key, task_id, worker_id,                      │
│       status="approved|needs_changes",                      │
│       issues="[{file, line, issue, suggestion}]"            │
│     )                                                       │
│                                                             │
│  5. INTERVENE IF NEEDED                                     │
│     - Blocked >5min → unblock or reassign                   │
│     - File conflicts → mediate                              │
│     - Scope creep → approve or reject                       │
│     - 3 review failures → escalate to human                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Review Tools

| Tool | Purpose |
|------|---------|
| `swarm_review` | Generate review prompt with epic context, dependencies, and git diff |
| `swarm_review_feedback` | Send approval/rejection to worker (tracks 3-strike rule) |

### Review Criteria

- Does work fulfill subtask requirements?
- Does it serve the overall epic goal?
- Does it enable downstream tasks?
- Type safety, no obvious bugs?

### 3-Strike Rule

After 3 review rejections, task is marked **blocked**. This signals an architectural problem, not "try harder."

**NEVER skip the review step.** Workers complete faster when they get feedback.
