"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/shared/section";

const steps = [
  {
    title: "Define",
    description:
      "Write a workflow in markdown or create tasks from the CLI. Specify which files each agent owns, which executor to use, and what depends on what.",
    code: `# .ruah/workflows/feature.md
- auth:
    files: src/auth/**
    executor: claude-code
- ui:
    files: src/ui/**
    executor: aider
    depends: [auth]`,
  },
  {
    title: "Orchestrate",
    description:
      "Each task gets an isolated workspace via git worktrees. Agents run in parallel where the dependency graph allows. File claims prevent collisions before they happen.",
    code: `$ ruah workflow run feature.md

[auth] Workspace created
[auth] Claimed: src/auth/** (owned)
[auth] Executing with claude-code...
[ui]   Waiting on: auth
[auth] ✓ Complete
[ui]   Workspace created
[ui]   Executing with aider...`,
  },
  {
    title: "Merge",
    description:
      "Changes merge back in dependency order. Governance gates validate each step. Clean commit history. Zero conflicts.",
    code: `$ ruah workflow status

auth ........... ✓ merged
ui ............. ✓ merged

2/2 tasks complete.
0 conflicts. 0 gate failures.`,
  },
];

export function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <Section>
      <motion.div
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-warm-500">
          Workflow
        </p>
        <h2 className="mt-4 text-display text-4xl md:text-5xl">
          Three steps. That&apos;s it.
        </h2>
      </motion.div>

      <div className="mt-12 flex flex-col gap-12 md:mt-20 md:gap-24">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="grid gap-8 md:grid-cols-2 md:gap-16"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="flex items-center gap-4 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-4 font-mono text-xs text-warm-400">
                  {i + 1}
                </span>
                <h3 className="text-display text-2xl md:text-3xl">{step.title}</h3>
              </div>
              <p className="text-warm-300 leading-relaxed max-w-md">
                {step.description}
              </p>
            </div>

            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <div data-mascot-avoid className="rounded-xl border border-surface-3 bg-surface-1 p-5 md:p-6 overflow-x-auto">
                <pre className="font-mono text-[13px] leading-relaxed text-warm-300">
                  <code>{step.code}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
