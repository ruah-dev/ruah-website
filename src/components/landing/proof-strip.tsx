"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GitBranch, Star, Package, Terminal } from "@phosphor-icons/react";

const stats = [
  { icon: Terminal, label: "CLI commands", value: "30+" },
  { icon: GitBranch, label: "Parallel agents", value: "Unlimited" },
  { icon: Package, label: "API integrations", value: "Any spec" },
  { icon: Star, label: "License", value: "MIT" },
];

export function ProofStrip() {
  const reduced = useReducedMotion();

  return (
    <div className="border-y border-surface-3/50">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-surface-3/50">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-1 py-6 md:py-8"
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.3 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <stat.icon
                size={16}
                weight="duotone"
                className="text-ruah-400/60 mb-1"
              />
              <span className="text-sm font-medium text-warm-200 md:text-base">
                {stat.value}
              </span>
              <span className="text-xs text-warm-500">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
