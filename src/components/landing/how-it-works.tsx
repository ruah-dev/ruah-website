"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Section } from "@/components/shared/section";
import { Terminal } from "@/components/shared/terminal";
import { Phantom } from "@/components/brand/phantom";

const PHANTOM_EXPRESSIONS = ["idle", "thinking", "success"] as const;

/**
 * "How it works + live demo" — merged from the previous 3 separate
 * sections per the landing redesign. A sticky step-list on the left
 * drives the terminal output on the right.
 *
 * Each step updates the terminal contents. An auto-advance timer cycles
 * through the steps; users can click a step to jump.
 */

const STEPS = [
  {
    title: "Convert any API into agent tools",
    body:
      "Feed Ruah an OpenAPI, Swagger, Postman, GraphQL, or HAR spec. Get MCP tool definitions, function-calling schemas, or a typed server scaffold — risk-classified for free.",
    terminal: `$ ruah conv generate stripe.yaml \\
    --target mcp-ts-server

→ Parsed 47 operations
→ Generated 47 tools
→ Risk: 32 safe · 12 moderate · 3 destructive
→ Wrote ./out/mcp-server (TypeScript)`,
    title_label: "01 · convert",
  },
  {
    title: "Isolate every agent in its own worktree",
    body:
      "Declare each task's file scope. Ruah spins up an isolated git worktree, locks owned paths, and lets non-overlapping work run in parallel without clobbering.",
    terminal: `$ ruah task create checkout \\
    --files "src/checkout/**" \\
    --executor claude-code

✓ Worktree → .worktrees/checkout
✓ Claimed: src/checkout/** (owned)
✓ Ready — claude-code assigned`,
    title_label: "02 · isolate",
  },
  {
    title: "Run the whole workflow from one CLI",
    body:
      "One entry point routes prompts, schedules the DAG, runs governance gates, and merges back in dependency order. Same command works for Claude Code, OpenCode, or Codex.",
    terminal: `$ ruah workflow run feature.md

[checkout] Executing with claude-code…
[payments] Executing with codex…
[ui]       Waiting on: checkout

3/3 tasks complete.
0 conflicts. 0 gate failures.`,
    title_label: "03 · run",
  },
];

const AUTO_ADVANCE_MS = 7000;

export function HowItWorks() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance — disabled under reduced-motion
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % STEPS.length),
      AUTO_ADVANCE_MS
    );
    return () => clearInterval(id);
  }, [reduced, paused]);

  const step = STEPS[active];

  return (
    <Section id="how-it-works">
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-warm-500">
          How it works
        </p>
        <h2 className="mt-4 text-display text-4xl md:text-5xl">
          Three primitives.{" "}
          <span className="italic text-ruah-400">Composed.</span>
        </h2>
        <p className="mt-4 max-w-xl text-warm-400">
          Each tool stands alone — together they form the toolchain. Click a
          step to jump. Demo cycles automatically — hover to pause.
        </p>
      </motion.div>

      <div
        className="mt-12 grid grid-cols-1 md:grid-cols-[minmax(0,28rem)_1fr] gap-8 lg:gap-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Step list */}
        <ol className="flex flex-col gap-3 md:gap-4" aria-label="Workflow steps">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={isActive ? "step" : undefined}
                  className={`group w-full text-left rounded-[var(--r-md)] border p-5 md:p-6 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ruah-400 ${
                    isActive
                      ? "border-surface-4 bg-surface-2"
                      : "border-surface-3 bg-surface-1 hover:bg-surface-2/60"
                  }`}
                >
                  <div className="flex items-baseline gap-4 mb-2">
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.15em] ${
                        isActive ? "text-ruah-400" : "text-warm-500"
                      }`}
                    >
                      {s.title_label}
                    </span>
                    {isActive && !reduced && (
                      <motion.span
                        className="relative flex-1 h-[2px] rounded-full bg-surface-3 overflow-hidden"
                        aria-hidden="true"
                      >
                        <motion.span
                          key={active}
                          className="absolute inset-y-0 left-0 bg-ruah-400"
                          initial={{ width: "0%" }}
                          animate={{ width: paused ? "20%" : "100%" }}
                          transition={{
                            duration: paused ? 0.3 : AUTO_ADVANCE_MS / 1000,
                            ease: "linear",
                          }}
                        />
                      </motion.span>
                    )}
                  </div>
                  <h3
                    className={`text-display text-xl md:text-2xl ${
                      isActive ? "text-warm-100" : "text-warm-300"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isActive ? "text-warm-300" : "text-warm-500"
                    }`}
                  >
                    {s.body}
                  </p>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Terminal side */}
        <motion.div
          key={active}
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="md:sticky md:top-24 md:self-start"
        >
          <Terminal title={`~/.project · ${step.title_label}`} copyable>
            {step.terminal}
          </Terminal>

          {/* Phantom narrator — expression shifts with the active step */}
          <div className="mt-5 flex items-center gap-3 pl-1">
            <Phantom
              expression={PHANTOM_EXPRESSIONS[active]}
              size={40}
              noGlow
              noFloat={!!reduced}
            />
            <p className="font-serif italic text-sm text-warm-400">
              {active === 0 && "translating the spec into tools…"}
              {active === 1 && "carving out a worktree…"}
              {active === 2 && "running the toolchain end-to-end."}
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
