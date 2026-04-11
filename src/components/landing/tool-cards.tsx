"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tools } from "@/config/tools";
import { Section } from "@/components/shared/section";
import { ArrowRight, Terminal, GitBranch, ArrowsClockwise } from "@phosphor-icons/react";
import { highlightTerminal } from "@/components/shared/terminal";
import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";

const icons: Icon[] = [Terminal, GitBranch, ArrowsClockwise];

const codeSnippets = [
  `$ ruah init\n$ ruah task create api \\\n    --executor claude-code\n$ ruah status`,
  `$ ruah task create auth \\\n    --files "src/auth/**"\n$ ruah task start auth\n# ✓ Worktree created\n# ✓ Claims established`,
  `$ ruah conv generate spec.yaml \\\n    --target mcp-ts-server\n# → 12 tools generated\n# → Risk: 8 safe, 3 moderate, 1 destructive`,
];

export function ToolCards() {
  const reduced = useReducedMotion();

  return (
    <Section className="relative z-20">
      <div className="mb-12">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-warm-500">
          The Toolchain
        </p>
        <h2 className="mt-4 text-display text-4xl md:text-5xl">
          Three tools.
          <br />
          <span className="italic text-warm-300">One ecosystem.</span>
        </h2>
      </div>

      {/* Uniform grid — all cards same layout */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {tools.map((tool, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={tool.id}
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/tools/${tool.id}`} className="group block h-full">
                <div className="flex flex-col h-full rounded-2xl border border-surface-3 bg-surface-1 overflow-hidden transition-colors duration-500 hover:bg-surface-2">
                  <div className="p-5 sm:p-8 lg:p-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-3">
                      <Icon size={18} weight="regular" className="text-ruah-400" />
                      <span className="font-mono text-xs text-warm-500">{tool.package}</span>
                    </div>
                    <h3 className="mt-4 text-display text-2xl md:text-3xl group-hover:text-ruah-400 transition-colors duration-500">
                      {tool.name}
                    </h3>
                    <p className="mt-1 italic font-serif text-warm-300">{tool.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-warm-400">
                      {tool.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {tool.features.slice(0, 3).map((f) => (
                        <span key={f} className="rounded-full border border-surface-4 px-2.5 py-1 text-[11px] text-warm-500">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-6 inline-flex items-center gap-2 text-sm text-warm-400 group-hover:text-ruah-400 transition-colors">
                      Explore
                      <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                  <div className="border-t border-surface-3 bg-surface-0 min-h-[140px] flex flex-col">
                    <div className="flex items-center gap-1.5 px-4 pt-3 pb-2">
                      <div className="w-2 h-2 rounded-full bg-coral-400" />
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <div className="w-2 h-2 rounded-full bg-ruah-400" />
                    </div>
                    <pre className="font-mono text-[11px] leading-relaxed px-4 pb-4 overflow-x-auto">
                      <code>{highlightTerminal(codeSnippets[i])}</code>
                    </pre>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
