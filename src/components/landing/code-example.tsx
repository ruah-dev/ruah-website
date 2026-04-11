"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/shared/section";
import { Terminal } from "@/components/shared/terminal";

const codeSnippet = `# Create parallel tasks with file isolation
$ ruah task create auth \\
    --files "src/auth/**" \\
    --executor claude-code

$ ruah task create ui \\
    --files "src/ui/**" \\
    --executor aider

# Both execute simultaneously — zero conflicts
$ ruah task start auth
$ ruah task start ui

# Merge in dependency order
$ ruah task done auth && ruah task merge auth
$ ruah task done ui   && ruah task merge ui`;

export function CodeExample() {
  const reduced = useReducedMotion();

  return (
    <Section>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        {/* Left — editorial text (offset top) */}
        <motion.div
          className="md:col-span-4 md:pt-12"
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-display text-3xl sm:text-4xl md:text-5xl">
            Parallel agents.
            <br />
            <span className="italic text-ruah-400">Zero</span> collisions.
          </h2>

          <div className="mt-10 flex flex-col gap-6">
            {[
              { label: "Workspaces", text: "Every task runs in its own git worktree" },
              { label: "Claims", text: "File-level locks prevent edit conflicts" },
              { label: "DAGs", text: "Workflows execute in dependency order" },
              { label: "Executors", text: "Claude Code, Aider, Codex, or any CLI" },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-surface-3 pl-4">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-500">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-warm-200">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — terminal (takes 8 cols, slight overlap) */}
        <motion.div
          className="md:col-span-8"
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Terminal title="~/.project">{codeSnippet}</Terminal>
        </motion.div>
      </div>
    </Section>
  );
}
