"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/shared/section";

const features = [
  {
    title: "Workspace isolation",
    description: "Every task runs in its own git worktree. No stash juggling, no stepping on each other's files. Clean separation by design.",
    span: "md:col-span-2 md:row-span-2",
    large: true,
  },
  {
    title: "File-level claims",
    description: "Mark files as owned, shared, or read-only. Conflicts are caught before agents start.",
    span: "md:col-span-1",
    large: false,
  },
  {
    title: "Workflow DAGs",
    description: "Define workflows in markdown. Tasks run in dependency order with automatic parallelization.",
    span: "md:col-span-1",
    large: false,
  },
  {
    title: "Spec conversion",
    description: "OpenAPI, Swagger, Postman, GraphQL, HAR → MCP servers, function-calling schemas, A2A wrappers.",
    span: "md:col-span-1",
    large: false,
  },
  {
    title: "Multi-executor",
    description: "Claude Code, Aider, Codex, OpenCode, or any shell command. Mix agents freely.",
    span: "md:col-span-1",
    large: false,
  },
  {
    title: "Zero dependencies",
    description: "The orchestrator has no runtime dependencies. The converter needs only yaml.",
    span: "md:col-span-4",
    large: false,
  },
];

export function FeatureGrid() {
  const reduced = useReducedMotion();

  return (
    <Section>
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-warm-500">
          Capabilities
        </p>
        <h2 className="mt-4 text-display text-4xl md:text-5xl max-w-xl">
          Everything you need,{" "}
          <span className="italic">nothing you don&apos;t</span>
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            data-mascot-avoid
            className={`${feature.span} rounded-2xl border border-surface-3 bg-surface-1 transition-colors duration-500 hover:bg-surface-2 ${feature.large ? "p-6 sm:p-8 md:p-10" : "p-5 sm:p-6 md:p-8"}`}
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
          >
            <p className={`font-medium text-warm-100 ${feature.large ? "text-display text-2xl md:text-3xl" : "text-base"}`}>
              {feature.title}
            </p>
            <p className={`mt-3 leading-relaxed text-warm-400 ${feature.large ? "text-base max-w-sm" : "text-sm"}`}>
              {feature.description}
            </p>
            {feature.large && (
              <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-surface-3">
                {["owned", "shared", "read-only"].map((type) => (
                  <div key={type} className="text-center">
                    <p className="text-xs uppercase tracking-[0.1em] text-warm-600">{type}</p>
                    <div className={`mt-2 h-1 rounded-full ${type === "owned" ? "bg-ruah-400" : type === "shared" ? "bg-warm-400" : "bg-warm-600"}`} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
