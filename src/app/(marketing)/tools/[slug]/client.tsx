"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/shared/section";
import { InstallCommand, Terminal } from "@/components/shared/terminal";
import { DemoTerminal } from "@/components/shared/demo-terminal";
import { ArrowRight, ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { tools, type ToolConfig } from "@/config/tools";

interface Props {
  tool: ToolConfig;
  executors: { name: string; label: string }[];
  inputFormats: string[];
  outputTargets: string[];
}

const quickStarts: Record<string, string> = {
  "ruah-cli": `$ npm i -g @ruah-dev/cli
$ cd my-project
$ ruah init
# ✓ Created .ruah/ directory
# ✓ Detected git repository
# ✓ Ready to orchestrate

$ ruah status
# Active tasks: 0
# Workflows: 0
# Executors: claude-code, aider`,
  "ruah-orch": `$ ruah task create auth-module \\
    --files "src/auth/**" \\
    --executor claude-code

# ✓ Workspace created: .ruah/tasks/auth-module
# ✓ Claimed: src/auth/** (owned)

$ ruah task start auth-module
# → Executor: claude-code
# → Working in isolated worktree...`,
  "ruah-conv": `$ ruah conv generate api.yaml \\
    --target mcp-server \\
    --language typescript

# ✓ Parsed: 24 endpoints
# ✓ Classified: 8 safe, 12 moderate, 4 destructive
# ✓ Generated: src/mcp-server/
#   → 24 tool definitions
#   → Type-safe schemas
#   → Ready to serve`,
};

const highlightData: Record<string, { value: string; label: string }[]> = {
  "ruah-cli": [
    { value: "1", label: "Package to install" },
    { value: "9", label: "Commands" },
    { value: "0", label: "Config required" },
  ],
  "ruah-orch": [
    { value: "6", label: "Executor adapters" },
    { value: "\u221E", label: "Parallel agents" },
    { value: "0", label: "Conflicts" },
  ],
  "ruah-conv": [
    { value: "5", label: "Input formats" },
    { value: "6", label: "Output targets" },
    { value: "1", label: "Dependency" },
  ],
};

export function ToolPageClient({ tool, executors, inputFormats, outputTargets }: Props) {
  const reduced = useReducedMotion();

  const highlights = highlightData[tool.id] ?? [];

  return (
    <>
      {/* Hero */}
      <Section className="pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-3xl">
          <motion.p
            className="font-mono text-xs text-ruah-400"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {tool.package}
          </motion.p>

          <motion.h1
            className="mt-4 text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {tool.name}
          </motion.h1>

          <motion.p
            className="mt-4 text-xl text-warm-200 font-serif italic"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {tool.tagline}
          </motion.p>

          <motion.p
            className="mt-6 text-warm-400 leading-relaxed md:text-lg max-w-2xl"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {tool.description}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <InstallCommand command={tool.install} />
            <a
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-warm-300 transition-colors"
            >
              <GithubLogo size={16} weight="bold" />
              Source
              <ArrowUpRight size={11} weight="bold" />
            </a>
          </motion.div>
        </div>
      </Section>

      {/* Demo GIF */}
      {tool.demoGif && (
        <Section className="pb-16 md:pb-24">
          <motion.div
            className="mx-auto max-w-2xl"
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-600 mb-6">
              See it
            </p>
            <DemoTerminal
              src={tool.demoGif}
              alt={tool.demoAlt || `${tool.name} demo`}
              title={tool.package}
            />
          </motion.div>
        </Section>
      )}

      {/* Quick Start */}
      {quickStarts[tool.id] && (
        <Section className="py-16 md:py-24">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-600">
              Quick start
            </p>
            <h2 className="mt-3 text-display text-3xl md:text-4xl">
              Up and running in <span className="italic text-ruah-400">seconds</span>
            </h2>
            <div className="mt-10 mx-auto max-w-2xl">
              <Terminal title={tool.package}>{quickStarts[tool.id]}</Terminal>
            </div>
          </motion.div>
        </Section>
      )}

      {/* Features */}
      <Section className="py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-600">
          Features
        </p>
        <div className="mt-8 grid gap-px bg-surface-3 border border-surface-3 rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {tool.features.map((feature, i) => (
            <div
              key={feature}
              className="bg-surface-0 px-6 py-5 text-sm text-warm-300 hover:bg-surface-1 transition-colors"
            >
              <span className="mr-3 font-mono text-xs text-warm-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              {feature}
            </div>
          ))}
        </div>
      </Section>

      {/* Highlights */}
      {highlights.length > 0 && (
        <motion.section
          className="border-y border-surface-3 py-12 md:py-16"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-3 gap-6 text-center">
            {highlights.map((h) => (
              <div key={h.label}>
                <p className="text-2xl md:text-3xl font-medium text-warm-100">{h.value}</p>
                <p className="mt-1 text-xs text-warm-500">{h.label}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Commands */}
      <Section className="py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-600">
          Command Reference
        </p>
        <h2 className="mt-3 text-display text-3xl md:text-4xl">Commands</h2>

        <div className="mt-10 border border-surface-3 rounded-xl overflow-hidden">
          {tool.commands.map((cmd) => (
            <div
              key={cmd.name}
              className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between border-b border-surface-3 last:border-b-0 hover:bg-surface-1 transition-colors"
            >
              <code className="font-mono text-sm text-ruah-400">{cmd.name}</code>
              <span className="text-sm text-warm-400">{cmd.description}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Executor matrix for orch */}
      {tool.id === "ruah-orch" && (
        <Section className="py-16 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-600">
            Compatibility
          </p>
          <h2 className="mt-3 text-display text-3xl">Supported executors</h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {executors.map((executor) => (
              <div
                key={executor.name}
                className="flex items-center justify-between rounded-lg border border-surface-3 px-5 py-4 hover:border-warm-600 transition-colors"
              >
                <span className="text-sm text-warm-200">{executor.label}</span>
                <code className="font-mono text-xs text-warm-500">{executor.name}</code>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Format matrix for conv */}
      {tool.id === "ruah-conv" && (
        <Section className="py-16 md:py-24">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-600">
                Input
              </p>
              <h3 className="mt-3 text-display text-2xl">Supported formats</h3>
              <div className="mt-6 flex flex-col gap-2">
                {inputFormats.map((fmt) => (
                  <div key={fmt} className="flex items-center gap-3 py-2 border-b border-surface-3 last:border-0 text-sm text-warm-300">
                    <span className="h-1 w-1 rounded-full bg-ruah-400" />
                    {fmt}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-600">
                Output
              </p>
              <h3 className="mt-3 text-display text-2xl">Target surfaces</h3>
              <div className="mt-6 flex flex-col gap-2">
                {outputTargets.map((target) => (
                  <div key={target} className="flex items-center gap-3 py-2 border-b border-surface-3 last:border-0 text-sm text-warm-300">
                    <span className="h-1 w-1 rounded-full bg-warm-400" />
                    {target}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Other tools */}
      <Section className="py-16 md:py-24">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-600">
            Ecosystem
          </p>
          <h2 className="mt-3 text-display text-3xl md:text-4xl">
            Part of the <span className="italic">ruah</span> toolchain
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {tools
              .filter((t) => t.id !== tool.id)
              .map((otherTool) => (
                <Link
                  key={otherTool.id}
                  href={`/tools/${otherTool.id}`}
                  className="group flex flex-col gap-2 rounded-xl border border-surface-3 p-6 transition-all duration-300 hover:border-warm-600 hover:bg-surface-1"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-warm-200 group-hover:text-warm-50 transition-colors">
                      {otherTool.name}
                    </h3>
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="text-warm-600 transition-all group-hover:text-ruah-400 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="font-mono text-xs text-warm-600">{otherTool.package}</p>
                  <p className="text-sm text-warm-400 leading-relaxed">{otherTool.tagline}</p>
                </Link>
              ))}
          </div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section className="pb-16 md:pb-32">
        <div className="text-center">
          <h2 className="text-display text-3xl md:text-4xl">
            Dive <span className="italic">deeper</span>
          </h2>
          <p className="mt-3 text-warm-400">
            Full API reference, guides, and examples.
          </p>
          <div className="mt-8">
            <Link
              href={`/docs/${tool.id}`}
              className="group inline-flex items-center gap-2 rounded-full bg-warm-50 px-6 py-3 text-sm font-medium text-surface-0 hover:bg-white transition-all duration-500"
            >
              Read the docs
              <ArrowRight
                size={13}
                weight="bold"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
