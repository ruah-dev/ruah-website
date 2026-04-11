"use client";

import { motion, useReducedMotion } from "framer-motion";

const stats = [
  { value: "6", label: "Executor adapters" },
  { value: "5", label: "Input formats" },
  { value: "6", label: "Output targets" },
  { value: "0", label: "Runtime deps" },
];

export function StatsStrip() {
  const reduced = useReducedMotion();

  return (
    <section className="border-y border-surface-3 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-display text-5xl md:text-6xl text-warm-100">{stat.value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
