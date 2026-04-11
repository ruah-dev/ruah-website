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
}

export const tools: ToolConfig[] = [
  {
    id: "ruah-cli",
    name: "CLI",
    package: "@ruah-dev/cli",
    tagline: "One command. Every tool.",
    description:
      "Top-level CLI router for the ruah ecosystem. Install one package, get access to the full orchestration and conversion toolchain with shorthand support.",
    install: "npm i -g @ruah-dev/cli",
    github: "https://github.com/ruah-dev/ruah-cli",
    color: "var(--color-ruah-400)",
    // demoGif: "/demos/ruah-cli-demo.gif", — needs re-recording; tape at .github/demo.tape
    features: [
      "Unified CLI namespace",
      "Shorthand commands",
      "Multi-namespace routing",
      "Interactive demo mode",
      "Repo health checks",
      "Zero-config setup",
    ],
    commands: [
      { name: "ruah init", description: "Initialize .ruah/ in a git repo" },
      { name: "ruah task <cmd>", description: "Task management (create, start, done, merge)" },
      { name: "ruah workflow <cmd>", description: "Workflow DAG execution" },
      { name: "ruah setup", description: "Register with AI agents" },
      { name: "ruah status", description: "Show orchestration dashboard" },
      { name: "ruah doctor", description: "Validate repo health" },
      { name: "ruah clean", description: "Remove stale tasks" },
      { name: "ruah config", description: "Show resolved configuration" },
      { name: "ruah demo", description: "Interactive walkthrough" },
    ],
  },
  {
    id: "ruah-orch",
    name: "Orchestrator",
    package: "@ruah-dev/orch",
    tagline: "Parallel agents. Zero collisions.",
    description:
      "Multi-agent orchestration that coordinates code changes. Each task gets an isolated workspace, file-level claims prevent conflicts, and merges happen in dependency order.",
    install: "npm i -g @ruah-dev/orch",
    github: "https://github.com/ruah-dev/ruah-orch",
    color: "var(--color-ruah-300)",
    demoGif: "/demos/ruah-orch-demo.gif",
    demoAlt: "ruah demo — worktree isolation, file locking, conflict detection, and DAG scheduling",
    features: [
      "Git worktree isolation",
      "File-level claims (owned/shared/read-only)",
      "Workflow DAGs with dependencies",
      "Durable task artifacts",
      "Compatibility-check engine",
      "6 executor adapters",
    ],
    commands: [
      { name: "ruah task create", description: "Create task with isolated worktree" },
      { name: "ruah task start", description: "Start task execution in workspace" },
      { name: "ruah task done", description: "Mark task complete" },
      { name: "ruah task merge", description: "Merge task back with governance gates" },
      { name: "ruah workflow run", description: "Execute a workflow DAG" },
      { name: "ruah workflow plan", description: "Preview execution plan" },
      { name: "ruah workflow resume", description: "Resume a paused workflow" },
    ],
  },
  {
    id: "ruah-conv",
    name: "Converter",
    package: "@ruah-dev/conv",
    tagline: "Any spec. Agent-ready tools.",
    description:
      "Convert API specs into agent-ready tool surfaces. Feed it an OpenAPI spec, get MCP tool definitions, function-calling schemas, or a full MCP server scaffold.",
    install: "npm i -g @ruah-dev/conv",
    github: "https://github.com/ruah-dev/ruah-conv",
    color: "var(--color-ruah-200)",
    demoGif: "/demos/ruah-conv-demo.gif",
    demoAlt: "ruah-conv — inspect, validate, and generate MCP tool definitions from API specs",
    features: [
      "OpenAPI, Swagger, Postman, GraphQL, HAR input",
      "MCP, OpenAI, Anthropic, A2A output",
      "Risk classification (safe/moderate/destructive)",
      "TypeScript & Python server scaffolds",
      "Intermediate representation (Ruah Tool Schema)",
      "Single runtime dependency",
    ],
    commands: [
      { name: "ruah conv generate", description: "Parse spec and generate output" },
      { name: "ruah conv inspect", description: "Parse and display IR summary" },
      { name: "ruah conv validate", description: "Check spec for issues" },
      { name: "ruah conv targets", description: "List available output targets" },
    ],
  },
];

export const executors = [
  { name: "claude-code", label: "Claude Code" },
  { name: "aider", label: "Aider" },
  { name: "codex", label: "OpenAI Codex" },
  { name: "open-code", label: "OpenCode" },
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
