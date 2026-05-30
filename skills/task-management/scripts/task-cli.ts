#!/usr/bin/env node
const fs = require("node:fs")
const path = require("node:path")

const TASK_ROOT = process.env.OPENCODE_TASK_ROOT ?? path.join(process.cwd(), ".planning", "tasks")
const ALLOWED_AGENTS = new Set(["build", "code-reviewer", "debugger", "test-reviewer"])
const VALID_STATUS = new Set(["pending", "in_progress", "completed", "blocked"])

type TaskStatus = "active" | "completed"
type SubtaskStatus = "pending" | "in_progress" | "completed" | "blocked"

type FeatureTask = {
  id: string
  name: string
  status: TaskStatus
  objective: string
  context_files: string[]
  reference_files: string[]
  exit_criteria: string[]
  subtask_count: number
  completed_count: number
  created_at: string
  completed_at: string | null
  spec_source: string | null
}

type Subtask = {
  id: string
  seq: string
  title: string
  objective: string
  status: SubtaskStatus
  depends_on: string[]
  parallel: boolean
  suggested_agent: "build" | "code-reviewer" | "debugger" | "test-reviewer"
  context_files: string[]
  reference_files: string[]
  acceptance_criteria: string[]
  deliverables: string[]
  validation_commands: string[]
  review_checkpoints: string[]
  risks_or_assumptions: string[]
  started_at: string | null
  completed_at: string | null
  completion_summary: string | null
}

type ParsedTask = Omit<Subtask, "id" | "status" | "started_at" | "completed_at" | "completion_summary">

function main() {
  const [command, ...args] = process.argv.slice(2)

  try {
    switch (command) {
      case "init":
        init(args)
        break
      case "status":
        status(args[0])
        break
      case "next":
        next(args[0])
        break
      case "blocked":
        blocked(args[0])
        break
      case "parallel":
        parallel(args[0])
        break
      case "start":
        start(args[0], args[1])
        break
      case "complete":
        complete(args[0], args[1], args.slice(2).join(" "))
        break
      case "deps":
        deps(args[0], args[1])
        break
      case "validate":
        validate(args[0], true)
        break
      case "help":
      case undefined:
        help()
        break
      default:
        fail(`Unknown command: ${command}`)
    }
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error))
  }
}

function help() {
  console.log(`task-management commands

Usage:
  router.sh init <feature-slug> --from-spec <path> [--name <name>] [--objective <text>]
  router.sh status [feature-slug]
  router.sh next [feature-slug]
  router.sh blocked [feature-slug]
  router.sh parallel [feature-slug]
  router.sh start <feature-slug> <seq>
  router.sh complete <feature-slug> <seq> "summary"
  router.sh deps <feature-slug> <seq>
  router.sh validate [feature-slug]

Task state root: ${TASK_ROOT}`)
}

function init(args: string[]) {
  const feature = args[0]
  if (!feature) fail("init requires <feature-slug>")

  const fromSpec = option(args, "--from-spec")
  if (!fromSpec) fail("init requires --from-spec <path>")
  if (!fs.existsSync(fromSpec)) fail(`Spec tasks file not found: ${fromSpec}`)

  const featureDir = featurePath(feature)
  if (fs.existsSync(featureDir)) fail(`Task feature already exists: ${featureDir}`)

  const source = fs.readFileSync(fromSpec, "utf8")
  const parsed = parseTasks(source)
  if (parsed.length === 0) fail("No tasks found. Expected headings like '### 01 - Task title'.")

  fs.mkdirSync(featureDir, { recursive: true })

  const task: FeatureTask = {
    id: feature,
    name: option(args, "--name") ?? titleCase(feature),
    status: "active",
    objective: option(args, "--objective") ?? "Execute tracked spec tasks.",
    context_files: [],
    reference_files: [],
    exit_criteria: ["All subtasks complete", "Required verification captured"],
    subtask_count: parsed.length,
    completed_count: 0,
    created_at: now(),
    completed_at: null,
    spec_source: path.relative(process.cwd(), path.resolve(fromSpec)),
  }

  writeJson(path.join(featureDir, "task.json"), task)
  for (const taskDef of parsed) {
    const subtask: Subtask = {
      ...taskDef,
      id: `${feature}-${taskDef.seq}`,
      status: "pending",
      started_at: null,
      completed_at: null,
      completion_summary: null,
    }
    writeJson(subtaskPath(feature, subtask.seq), subtask)
  }

  validate(feature, false)
  console.log(`Created ${parsed.length} tracked subtasks in ${path.relative(process.cwd(), featureDir)}`)
}

function status(feature?: string) {
  const features = feature ? [feature] : listFeatures()
  if (features.length === 0) {
    console.log("No tracked tasks found.")
    return
  }

  for (const slug of features) {
    const task = readFeature(slug)
    const subtasks = readSubtasks(slug)
    const counts = countStatuses(subtasks)
    console.log(`[${slug}] ${task.name}`)
    console.log(`  Status: ${task.status} | Progress: ${task.completed_count}/${task.subtask_count} (${percent(task.completed_count, task.subtask_count)}%)`)
    console.log(`  Pending: ${counts.pending} | In Progress: ${counts.in_progress} | Completed: ${counts.completed} | Blocked: ${counts.blocked}`)
    if (task.spec_source) console.log(`  Spec: ${task.spec_source}`)
  }
}

function next(feature?: string) {
  showReady(feature, false)
}

function parallel(feature?: string) {
  showReady(feature, true)
}

function blocked(feature?: string) {
  const features = feature ? [feature] : listFeatures()
  let found = false
  for (const slug of features) {
    const subtasks = readSubtasks(slug)
    const bySeq = new Map(subtasks.map((task) => [task.seq, task]))
    const blockedTasks = subtasks.filter((task) => task.status === "blocked" || blockingDeps(task, bySeq).length > 0)
    if (blockedTasks.length === 0) continue
    found = true
    console.log(`[${slug}]`)
    for (const task of blockedTasks) {
      const blockers = task.status === "blocked" ? ["explicitly blocked"] : blockingDeps(task, bySeq).map((dep) => `${dep.seq} (${dep.status})`)
      console.log(`  ${task.seq} - ${task.title} | blocked by: ${blockers.join(", ")}`)
    }
  }
  if (!found) console.log("No blocked tasks found.")
}

function start(feature?: string, seq?: string) {
  if (!feature || !seq) fail("start requires <feature-slug> <seq>")
  const task = readSubtask(feature, seq)
  if (task.status === "completed") fail(`${feature}/${seq} is already completed`)
  task.status = "in_progress"
  task.started_at ??= now()
  writeJson(subtaskPath(feature, seq), task)
  console.log(`Started ${feature}/${seq} - ${task.title}`)
}

function complete(feature?: string, seq?: string, summary?: string) {
  if (!feature || !seq) fail("complete requires <feature-slug> <seq> \"summary\"")
  if (!summary.trim()) fail("complete requires a non-empty summary")
  const task = readSubtask(feature, seq)
  task.status = "completed"
  task.started_at ??= now()
  task.completed_at = now()
  task.completion_summary = summary.trim()
  writeJson(subtaskPath(feature, seq), task)
  syncFeatureProgress(feature)
  const featureTask = readFeature(feature)
  console.log(`Completed ${feature}/${seq} - ${task.title}`)
  console.log(`Progress: ${featureTask.completed_count}/${featureTask.subtask_count} (${percent(featureTask.completed_count, featureTask.subtask_count)}%)`)
}

function deps(feature?: string, seq?: string) {
  if (!feature || !seq) fail("deps requires <feature-slug> <seq>")
  const subtasks = readSubtasks(feature)
  const bySeq = new Map(subtasks.map((task) => [task.seq, task]))
  const root = bySeq.get(normalizeSeq(seq))
  if (!root) fail(`Unknown task: ${feature}/${seq}`)
  console.log(`${root.seq} - ${root.title} [${root.status}]`)
  printDeps(root, bySeq, "  ", new Set())
}

function validate(feature?: string, verbose = true) {
  const features = feature ? [feature] : listFeatures()
  if (features.length === 0) fail("No tracked tasks found")

  for (const slug of features) {
    const task = readFeature(slug)
    const subtasks = readSubtasks(slug)
    const errors: string[] = []
    const seqs = new Set<string>()

    if (task.id !== slug) errors.push(`task.json id '${task.id}' does not match feature '${slug}'`)
    if (task.subtask_count !== subtasks.length) errors.push(`task.json subtask_count ${task.subtask_count} does not match ${subtasks.length}`)

    for (const subtask of subtasks) {
      if (seqs.has(subtask.seq)) errors.push(`duplicate seq ${subtask.seq}`)
      seqs.add(subtask.seq)
      if (subtask.id !== `${slug}-${subtask.seq}`) errors.push(`${subtask.seq}: id must be ${slug}-${subtask.seq}`)
      if (!VALID_STATUS.has(subtask.status)) errors.push(`${subtask.seq}: invalid status ${subtask.status}`)
      if (!ALLOWED_AGENTS.has(subtask.suggested_agent)) errors.push(`${subtask.seq}: invalid suggested_agent ${subtask.suggested_agent}`)
      if (!subtask.acceptance_criteria.length) errors.push(`${subtask.seq}: missing acceptance_criteria`)
      if (!subtask.deliverables.length) errors.push(`${subtask.seq}: missing deliverables`)
      for (const dep of subtask.depends_on) {
        if (!seqs.has(dep) && !subtasks.some((task) => task.seq === dep)) errors.push(`${subtask.seq}: missing dependency ${dep}`)
        if (dep === subtask.seq) errors.push(`${subtask.seq}: cannot depend on itself`)
      }
    }

    errors.push(...findCycles(subtasks))
    if (errors.length) fail(`[${slug}] validation failed:\n- ${errors.join("\n- ")}`)
    syncFeatureProgress(slug)
    if (verbose) console.log(`[${slug}] validation passed`)
  }
}

function parseTasks(markdown: string): ParsedTask[] {
  const lines = markdown.split(/\r?\n/)
  const tasks: ParsedTask[] = []
  let current: ParsedTask | null = null
  let field: keyof ParsedTask | null = null

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    const heading = line.match(/^#{2,6}\s+(?:Task\s+)?(\d{1,3})\s*(?:[-:.]\s*)?(.*)$/i)
    if (heading) {
      if (current) tasks.push(current)
      current = emptyParsedTask(normalizeSeq(heading[1]), heading[2].trim() || `Task ${normalizeSeq(heading[1])}`)
      field = null
      continue
    }

    const checkbox = line.match(/^\s*[-*]\s+\[[ xX]\]\s+(\d{1,3})[.):\-\s]+(.+)$/)
    if (checkbox) {
      if (current) tasks.push(current)
      current = emptyParsedTask(normalizeSeq(checkbox[1]), checkbox[2].trim())
      field = null
      continue
    }

    if (!current) continue

    const kv = line.match(/^\s*[-*]?\s*([A-Za-z][A-Za-z /_-]+):\s*(.*)$/)
    if (kv) {
      const key = normalizeKey(kv[1])
      const value = kv[2].trim()
      field = assignField(current, key, value)
      continue
    }

    const item = line.match(/^\s*[-*]\s+(.+)$/)
    if (item && field) appendField(current, field, item[1].trim())
  }

  if (current) tasks.push(current)
  return tasks.map((task) => ({
    ...task,
    depends_on: task.depends_on.map(normalizeSeq),
    suggested_agent: validateAgent(task.suggested_agent),
  }))
}

function emptyParsedTask(seq: string, title: string): ParsedTask {
  return {
    seq,
    title,
    objective: "",
    depends_on: [],
    parallel: false,
    suggested_agent: "build",
    context_files: [],
    reference_files: [],
    acceptance_criteria: [],
    deliverables: [],
    validation_commands: [],
    review_checkpoints: [],
    risks_or_assumptions: [],
  }
}

function assignField(task: ParsedTask, key: string, value: string): keyof ParsedTask | null {
  switch (key) {
    case "objective":
    case "outcome":
      task.objective = value
      return "objective"
    case "depends on":
    case "dependencies":
      task.depends_on = parseList(value).filter((item) => item.toLowerCase() !== "none").map(extractSeq)
      return "depends_on"
    case "parallel":
      task.parallel = /^(true|yes)$/i.test(value)
      return null
    case "suggested agent":
    case "agent":
      task.suggested_agent = validateAgent(value)
      return null
    case "context files":
    case "context":
      task.context_files = parseList(value)
      return "context_files"
    case "reference files":
    case "likely files":
    case "files":
      task.reference_files = parseList(value)
      return "reference_files"
    case "acceptance criteria":
    case "criteria":
      task.acceptance_criteria = parseList(value)
      return "acceptance_criteria"
    case "deliverables":
      task.deliverables = parseList(value)
      return "deliverables"
    case "validation commands":
    case "required validation":
    case "tests":
      task.validation_commands = parseList(value)
      return "validation_commands"
    case "review checkpoints":
    case "handoff notes":
      task.review_checkpoints = parseList(value)
      return "review_checkpoints"
    case "risks":
    case "risks or assumptions":
    case "assumptions":
      task.risks_or_assumptions = parseList(value)
      return "risks_or_assumptions"
    default:
      return null
  }
}

function appendField(task: ParsedTask, field: keyof ParsedTask, value: string) {
  if (field === "parallel" || field === "suggested_agent" || field === "seq" || field === "title") return
  if (field === "objective") return
  const current = task[field]
  if (Array.isArray(current)) current.push(value)
}

function showReady(feature: string | undefined, parallelOnly: boolean) {
  const features = feature ? [feature] : listFeatures()
  let found = false
  for (const slug of features) {
    const subtasks = readSubtasks(slug)
    const bySeq = new Map(subtasks.map((task) => [task.seq, task]))
    const ready = subtasks.filter((task) => task.status === "pending" && blockingDeps(task, bySeq).length === 0 && (!parallelOnly || task.parallel))
    if (!ready.length) continue
    found = true
    console.log(`[${slug}]`)
    for (const task of ready) console.log(`  ${task.seq} - ${task.title} [${task.suggested_agent}]${task.parallel ? " [parallel]" : ""}`)
  }
  if (!found) console.log(parallelOnly ? "No parallel-ready tasks found." : "No ready tasks found.")
}

function blockingDeps(task: Subtask, bySeq: Map<string, Subtask>): Subtask[] {
  return task.depends_on.map((seq) => bySeq.get(seq)).filter((dep): dep is Subtask => Boolean(dep) && dep.status !== "completed")
}

function printDeps(task: Subtask, bySeq: Map<string, Subtask>, prefix: string, seen: Set<string>) {
  for (const depSeq of task.depends_on) {
    const dep = bySeq.get(depSeq)
    if (!dep) {
      console.log(`${prefix}- ${depSeq} [missing]`)
      continue
    }
    console.log(`${prefix}- ${dep.seq} - ${dep.title} [${dep.status}]`)
    if (!seen.has(dep.seq)) {
      seen.add(dep.seq)
      printDeps(dep, bySeq, `${prefix}  `, seen)
    }
  }
}

function findCycles(subtasks: Subtask[]): string[] {
  const bySeq = new Map(subtasks.map((task) => [task.seq, task]))
  const errors: string[] = []
  const visiting = new Set<string>()
  const visited = new Set<string>()

  function visit(seq: string, stack: string[]) {
    if (visiting.has(seq)) {
      errors.push(`circular dependency: ${[...stack, seq].join(" -> ")}`)
      return
    }
    if (visited.has(seq)) return
    visiting.add(seq)
    const task = bySeq.get(seq)
    if (task) for (const dep of task.depends_on) visit(dep, [...stack, seq])
    visiting.delete(seq)
    visited.add(seq)
  }

  for (const task of subtasks) visit(task.seq, [])
  return errors
}

function readFeature(feature: string): FeatureTask {
  return readJson(path.join(featurePath(feature), "task.json")) as FeatureTask
}

function readSubtasks(feature: string): Subtask[] {
  return fs.readdirSync(featurePath(feature))
    .filter((name) => /^subtask_\d+\.json$/.test(name))
    .sort()
    .map((name) => readJson(path.join(featurePath(feature), name)) as Subtask)
}

function readSubtask(feature: string, seq: string): Subtask {
  const file = subtaskPath(feature, seq)
  if (!fs.existsSync(file)) fail(`Unknown task: ${feature}/${seq}`)
  return readJson(file) as Subtask
}

function syncFeatureProgress(feature: string) {
  const task = readFeature(feature)
  const subtasks = readSubtasks(feature)
  task.completed_count = subtasks.filter((subtask) => subtask.status === "completed").length
  task.status = task.completed_count === task.subtask_count ? "completed" : "active"
  task.completed_at = task.status === "completed" ? (task.completed_at ?? now()) : null
  writeJson(path.join(featurePath(feature), "task.json"), task)
}

function listFeatures(): string[] {
  if (!fs.existsSync(TASK_ROOT)) return []
  return fs.readdirSync(TASK_ROOT).filter((name) => fs.existsSync(path.join(TASK_ROOT, name, "task.json"))).sort()
}

function featurePath(feature: string) {
  return path.join(TASK_ROOT, feature)
}

function subtaskPath(feature: string, seq: string) {
  return path.join(featurePath(feature), `subtask_${normalizeSeq(seq)}.json`)
}

function readJson(file: string) {
  if (!fs.existsSync(file)) fail(`File not found: ${file}`)
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

function writeJson(file: string, value: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`)
}

function option(args: string[], name: string): string | undefined {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

function parseList(value: string): string[] {
  if (!value || /^none$/i.test(value)) return []
  return value.split(/[,;]/).map((item) => item.trim()).filter(Boolean)
}

function extractSeq(value: string): string {
  const match = value.match(/\d{1,3}/)
  return match ? normalizeSeq(match[0]) : value
}

function normalizeSeq(seq: string): string {
  return seq.padStart(2, "0")
}

function validateAgent(value: string): Subtask["suggested_agent"] {
  const normalized = value.trim() as Subtask["suggested_agent"]
  if (!ALLOWED_AGENTS.has(normalized)) fail(`Invalid suggested_agent '${value}'. Allowed: ${[...ALLOWED_AGENTS].join(", ")}`)
  return normalized
}

function normalizeKey(key: string): string {
  return key.trim().toLowerCase().replace(/[\s_-]+/g, " ")
}

function countStatuses(subtasks: Subtask[]) {
  return subtasks.reduce((acc, task) => {
    acc[task.status] += 1
    return acc
  }, { pending: 0, in_progress: 0, completed: 0, blocked: 0 } as Record<SubtaskStatus, number>)
}

function titleCase(slug: string): string {
  return slug.split(/[-_]/).map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`).join(" ")
}

function percent(done: number, total: number): number {
  return total === 0 ? 0 : Math.round((done / total) * 100)
}

function now(): string {
  return new Date().toISOString()
}

function fail(message: string): never {
  console.error(`task-management: ${message}`)
  process.exit(1)
}

main()
