export interface ToolConfig {
  id: string;
  name: string;
  package: string;
  tagline: string;
  description: string;
  install: string;
  github: string;
  features: string[];
  commands: { name: string; description: string }[];
  color: string;
  demoGif?: string;
  demoAlt?: string;
  /** Use an animated React terminal instead of a GIF */
  demoAnimated?: boolean;
}

export const tools: ToolConfig[] = [
  {
    id: "ruah-cli",
    name: "CLI Router",
    package: "@ruah-dev/cli",
    tagline: "One command. Every agent tool.",
    description:
      "Top-level CLI router and unified cockpit for the ruah ecosystem. Install one package to get instant access to guardrails, verification, cost profiling, replays, and conversions with sub-millisecond dispatch.",
    install: "npm i -g @ruah-dev/cli",
    github: "https://github.com/ruah-dev/ruah-cli",
    color: "var(--color-ruah-400)",
    demoAnimated: true,
    features: [
      "Unified CLI namespace (ruah <tool>)",
      "Sub-millisecond command dispatch",
      "Zero-config auto-detection",
      "Repo health diagnostics (ruah doctor)",
      "Strict JSON stdout / logging stderr",
      "Zero runtime dependencies",
    ],
    commands: [
      { name: "ruah status", description: "Show ecosystem status and active agents" },
      { name: "ruah doctor", description: "Validate repository health and agent readiness" },
      { name: "ruah guard <cmd>", description: "Execute safety policies & secret scans" },
      { name: "ruah verify <cmd>", description: "Run definition-of-done criteria" },
      { name: "ruah opt <cmd>", description: "Scan token waste & inspect session costs" },
      { name: "ruah watch <cmd>", description: "Render shareable redacted HTML replays" },
      { name: "ruah eval <cmd>", description: "Run micro-benchmarks across executors" },
      { name: "ruah conv <cmd>", description: "Curate and generate MCP tool surfaces" },
      { name: "ruah init", description: "Initialize .ruah/ configuration in a repo" },
    ],
  },
  {
    id: "ruah-guard",
    name: "Guard",
    package: "@ruah-dev/guard",
    tagline: "Can I trust the agent not to do damage — in any harness, with proof?",
    description:
      "One deterministic policy file. The same verdict in Claude Code, Codex, Cursor, and CI, backed by a bypass-attempt test suite. Portable and testable — not just another rm -rf blocker.",
    install: "npm i -g @ruah-dev/guard",
    github: "https://github.com/ruah-dev/ruah-guard",
    color: "var(--color-coral-400)",
    demoAnimated: true,
    features: [
      "Sub-50ms deterministic command verdicts",
      "High-entropy secret scanner (sk_live, AWS, PEM)",
      "Drop-in Claude Code PreToolUse hook adapter",
      "Allow, Deny, and Interactive 'Ask' actions",
      "Audit trail logging (.ruah/guard-audit.jsonl)",
      "Zero runtime dependencies & zero network latency",
    ],
    commands: [
      { name: "ruah guard check --cmd <cmd>", description: "Evaluate policy verdict for a command" },
      { name: "ruah guard check --file <diff>", description: "Scan staged diff for credentials & secrets" },
      { name: "ruah guard hook claude-code", description: "Generate or install agent hook adapter" },
      { name: "ruah guard audit --last 50", description: "Inspect recent allow/deny policy decisions" },
      { name: "ruah guard init", description: "Scaffold starter .ruah/guard.json policy" },
    ],
  },
  {
    id: "ruah-verify",
    name: "Verify",
    package: "@ruah-dev/verify",
    tagline: "Did the agent actually finish?",
    description:
      "The independent, deterministic referee for agent outputs. Turns acceptance criteria into machine-runnable checks. Anything that cannot be machine-checked is marked unverifiable — never silently passed.",
    install: "npm i -g @ruah-dev/verify",
    github: "https://github.com/ruah-dev/ruah-verify",
    color: "var(--color-sage-400)",
    demoAnimated: true,
    features: [
      "6 criteria types (shell, regex, schema, no-diff, file, script)",
      "Parallel criterion execution with deterministic order",
      "Auto-detect stack (scripts -> starter criteria)",
      "Markdown PR comment generator for GitHub Actions",
      "Structured evidence capture in .ruah/evidence.json",
      "Zero LLM-as-judge hallucinations",
    ],
    commands: [
      { name: "ruah verify run", description: "Execute all criteria from .ruah/verify.json" },
      { name: "ruah verify run --criteria <path>", description: "Execute a specific criteria spec file" },
      { name: "ruah verify init", description: "Detect stack and generate starter criteria" },
      { name: "ruah verify report --format md", description: "Generate GitHub PR-ready markdown summary" },
      { name: "ruah verify report --format json", description: "Export machine-readable verdict & evidence" },
    ],
  },
  {
    id: "ruah-opt",
    name: "Optimizer",
    package: "@ruah-dev/opt",
    tagline: "Where did my tokens go?",
    description:
      "Read Claude Code session transcripts and canonical traces to reveal exactly where your tokens and money went. Pinpoint context bloat, repeated file reads, and oversized tool outputs with actionable fixes.",
    install: "npm i -g @ruah-dev/opt",
    github: "https://github.com/ruah-dev/ruah-opt",
    color: "var(--color-amber-400)",
    demoAnimated: true,
    features: [
      "Claude Code JSONL transcript adapter (~/.claude/projects/)",
      "Waste heuristics H1–H4 (oversized tools, repeated reads, dead context)",
      "Self-contained offline HTML reports (zero CDN, strict CSP)",
      "Prompt cache read/write efficiency breakdown",
      "Versioned price tables with custom override support",
      "Actionable one-line fix suggestions per waste item",
    ],
    commands: [
      { name: "ruah opt analyze <dir>", description: "Generate session cost, token, and cache summary" },
      { name: "ruah opt waste <transcript>", description: "Rank top context-bloat and token waste offenders" },
      { name: "ruah opt report --out <file.html>", description: "Export self-contained interactive visual report" },
      { name: "ruah opt pricing --override <prices.json>", description: "Show or configure token price tables" },
    ],
  },
  {
    id: "ruah-watch",
    name: "Watch (Lite)",
    package: "@ruah-dev/watch",
    tagline: "Can I show someone what this session did?",
    description:
      "Convert raw, messy agent sessions into beautiful, self-contained HTML replays. Includes interactive turn timelines, syntax-highlighted diffs, and automatic privacy redaction. Zero server required.",
    install: "npm i -g @ruah-dev/watch",
    github: "https://github.com/ruah-dev/ruah-watch",
    color: "var(--color-lavender-400)",
    demoAnimated: true,
    features: [
      "Single-command replay generation (ruah watch render --latest)",
      "Automated privacy redaction (--redact strips paths, tokens, emails)",
      "Syntax-highlighted diff view for Edit and Write tool calls",
      "Turn-by-turn token, cost, and latency meter",
      "Embedded verification verdict block from Ruah Verify",
      "Zero server & zero external CDN dependencies (<500KB bundle)",
    ],
    commands: [
      { name: "ruah watch render <session.jsonl>", description: "Render static HTML replay from transcript" },
      { name: "ruah watch render --latest", description: "Render most recent Claude Code session in workspace" },
      { name: "ruah watch render --redact", description: "Enable strict redaction for paths, secrets, & emails" },
      { name: "ruah watch render --out <file.html>", description: "Specify output HTML path" },
    ],
  },
  {
    id: "ruah-eval",
    name: "Eval",
    package: "@ruah-dev/eval",
    tagline: "Same task — which executor wins, and what did it cost?",
    description:
      "A fast micro-benchmark harness for AI coding agents. Run one task specification across multiple executors in fresh, isolated sandboxes with deterministic acceptance criteria and cost scorecards.",
    install: "npm i -g @ruah-dev/eval",
    github: "https://github.com/ruah-dev/ruah-eval",
    color: "var(--color-sage-300)",
    demoAnimated: true,
    features: [
      "Ephemeral sandbox isolation per run (/tmp/ruah-sandbox-*)",
      "Multi-executor orchestration (Claude Code, Codex, OpenCode, Scripts)",
      "Deterministic criteria referee (powered by Ruah Verify)",
      "Multi-run variance analysis (--runs N with median & spread)",
      "Exportable scorecards in JSON, Markdown, and self-contained HTML",
      "Real cost-per-successful-delivery calculations",
    ],
    commands: [
      { name: "ruah eval run <spec.json>", description: "Execute benchmark spec across all configured executors" },
      { name: "ruah eval run <spec.json> --runs 5", description: "Run multiple iterations for statistical variance" },
      { name: "ruah eval compare a.json b.json", description: "Diff two benchmark scorecards side-by-side" },
      { name: "ruah eval report <scorecard.json>", description: "Render scorecard as markdown or shareable HTML" },
    ],
  },
  {
    id: "ruah-conv",
    name: "Converter",
    package: "@ruah-dev/conv",
    tagline: "How do I make this API agent-sized?",
    description:
      "Curate and convert massive API specifications into compact, agent-friendly tool surfaces. Compress 400-endpoint specs into 5–10 task-level MCP tools with minimal context overhead.",
    install: "npm i -g @ruah-dev/conv",
    github: "https://github.com/ruah-dev/ruah-conv",
    color: "var(--color-ruah-200)",
    demoAnimated: true,
    features: [
      "5 input formats (OpenAPI 3.x, Swagger 2.0, Postman, GraphQL, HAR)",
      "Smart endpoint curation (collapses bloated APIs into task-level tools)",
      "MCP Tool Definitions & TypeScript/Python server scaffolds",
      "OpenAI & Anthropic Function Calling schema generation",
      "Context footprint & token cost calculator per toolset",
      "Single runtime dependency",
    ],
    commands: [
      { name: "ruah conv curate <spec>", description: "Interactively collapse endpoints into ≤10 task tools" },
      { name: "ruah conv generate <spec>", description: "Parse specification and generate target tool surface" },
      { name: "ruah conv inspect <spec>", description: "Parse and display intermediate representation (IR) summary" },
      { name: "ruah conv validate <spec>", description: "Validate API spec against best practices for agents" },
      { name: "ruah conv targets", description: "List all supported output surface targets" },
    ],
  },
  {
    id: "ruah-orch",
    name: "Orchestrator",
    package: "@ruah-dev/orch",
    tagline: "Parallel agents. Zero collisions.",
    description:
      "Multi-agent orchestration that coordinates simultaneous code changes. Each task runs in an isolated git worktree, file-level claims prevent merge conflicts, and DAG scheduling enforces dependency order.",
    install: "npm i -g @ruah-dev/orch",
    github: "https://github.com/ruah-dev/ruah-orch",
    color: "var(--color-ruah-300)",
    demoAnimated: true,
    features: [
      "Git worktree isolation per task",
      "File-level claim locking (owned / shared / read-only)",
      "Workflow DAG scheduling with automatic dependency order",
      "Durable task artifacts & audit trails",
      "Compatibility-check engine across active branches",
      "6 pluggable executor adapters",
    ],
    commands: [
      { name: "ruah task create <id>", description: "Create task with isolated worktree and file claims" },
      { name: "ruah task start <id>", description: "Start task execution in workspace with configured executor" },
      { name: "ruah task done <id>", description: "Mark task as complete and prepare for merge" },
      { name: "ruah task merge <id>", description: "Merge task changes back to main with governance gates" },
      { name: "ruah workflow run <file>", description: "Execute a multi-agent workflow DAG" },
      { name: "ruah workflow plan <file>", description: "Preview execution schedule and dependencies" },
      { name: "ruah workflow resume <id>", description: "Resume a paused workflow from failure point" },
    ],
  },
];

export const executors = [
  { name: "claude-code", label: "Claude Code" },
  { name: "open-code", label: "OpenCode" },
  { name: "codex", label: "OpenAI Codex" },
  { name: "script", label: "Shell Script" },
  { name: "raw", label: "Raw Shell" },
] as const;

export const inputFormats = [
  "OpenAPI 3.x",
  "Swagger 2.0",
  "Postman v2.1",
  "GraphQL SDL",
  "HAR",
] as const;

export const outputTargets = [
  "MCP Tool Definitions",
  "MCP Server (TypeScript)",
  "MCP Server (Python)",
  "OpenAI Function Calling",
  "Anthropic Function Calling",
  "A2A Service",
] as const;
