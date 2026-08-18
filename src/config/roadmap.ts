export type RoadmapStatus = "in-development" | "coming-soon";

export interface RoadmapEntry {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  status: RoadmapStatus;
  enterprise?: boolean;
}

/**
 * Upcoming ecosystem products. Status is signal-based, not date-based.
 *
 * - "in-development" — actively building: Architect, Optimizer, Code.
 * - "coming-soon"    — designed, not yet building.
 *
 * `enterprise: true` marks products that are part of the enterprise tier
 * (Gateway, Guard, Sync, Hub, Watch). Open-core — CLI/core remains OSS.
 *
 * Ruah Code is a unified coding environment built on T3Code — the point
 * of convergence for Claude Code, OpenCode, and Codex.
 *
 * Deprioritized per strategy doc — intentionally omitted: Memory, Deploy,
 * Simulate. Eval/Bench omitted until it earns a phase slot.
 */
export const roadmap: RoadmapEntry[] = [
  {
    id: "architect",
    name: "Architect",
    tagline: "PRDs into DAGs.",
    blurb:
      "Brief, issue, or meeting notes in. A typed task graph with claims, acceptance criteria, and rollback plans out.",
    status: "in-development",
  },
  {
    id: "optimizer",
    name: "Optimizer",
    tagline: "Cost & context, measured.",
    blurb:
      "Token counts, wasted-token detection, model routing, and budget policies per workflow. Profiler (`@ruah-dev/opt`) is shipped; routing is later.",
    status: "in-development",
  },
  {
    id: "code",
    name: "Code",
    tagline: "One IDE. Every agent.",
    blurb:
      "A unified coding environment built on T3Code — Claude Code, OpenCode, and Codex converge into a single surface with shared state.",
    status: "in-development",
  },
  {
    id: "exec",
    name: "Exec",
    tagline: "Typed runtime for agents.",
    blurb:
      "Replaces bash as the agent-to-system interface. Typed file, git, HTTP, and process ops with structured errors.",
    status: "coming-soon",
  },
  {
    id: "observe",
    name: "Observe",
    tagline: "Traces, costs, replay.",
    blurb:
      "Per-workflow traces, task lineage, and decision snapshots. Exports to OpenTelemetry — no generic obs rebuild.",
    status: "coming-soon",
  },
  {
    id: "link",
    name: "Link",
    tagline: "Cross-repo orchestration.",
    blurb:
      "Coordinate agents across monorepo boundaries: update API in repo A, client SDK in repo B, docs in repo C.",
    status: "coming-soon",
  },
  {
    id: "gateway",
    name: "Gateway",
    tagline: "API gateway for agents.",
    blurb:
      "Auth, quotas, audit, tracing, and tenant isolation across MCP, REST, gRPC, WebSocket, and A2A endpoints.",
    status: "coming-soon",
    enterprise: true,
  },
  {
    id: "guard",
    name: "Guard",
    tagline: "Policy engine for agents.",
    blurb:
      "CLI/core shipped as `@ruah-dev/guard`. Hosted policy + tenant isolation stays enterprise later.",
    status: "in-development",
    enterprise: true,
  },
  {
    id: "sync",
    name: "Sync",
    tagline: "Tickets ⇄ tasks.",
    blurb:
      "Two-way GitHub, Jira, Linear, and Notion sync. Work items become agent tasks; results update tickets.",
    status: "coming-soon",
    enterprise: true,
  },
  {
    id: "hub",
    name: "Hub",
    tagline: "Registry for agent work.",
    blurb:
      "npm-style registry for tools, prompts, contracts, workflow templates, and skills. Composition, discoverable.",
    status: "coming-soon",
    enterprise: true,
  },
  {
    id: "watch",
    name: "Watch",
    tagline: "Live workflow UI.",
    blurb:
      "Replay-lite shipped as `@ruah-dev/watch` (static HTML). Live tail + DAG studio stays parked.",
    status: "coming-soon",
    enterprise: true,
  },
];
