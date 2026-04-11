"use client";

import { motion } from "framer-motion";

const executors = [
  "Claude Code",
  "Aider",
  "OpenAI Codex",
  "OpenCode",
  "Shell Script",
  "Raw CLI",
];

const formats = [
  "OpenAPI 3.x",
  "Swagger 2.0",
  "Postman v2.1",
  "GraphQL SDL",
  "HAR",
  "MCP Server",
  "OpenAI Tools",
  "Anthropic Tools",
  "A2A Service",
];

function MarqueeRow({ items, reverse = false, speed = 30 }: { items: string[]; reverse?: boolean; speed?: number }) {
  // Repeat items enough times to always fill the viewport (4 copies = 2 visible sets)
  const repeated = [...items, ...items, ...items, ...items];
  const duration = items.length * speed / 10;

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-3 w-max"
        initial={{ x: reverse ? "0%" : "-25%" }}
        animate={{ x: reverse ? "-25%" : "0%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 rounded-full border border-surface-3 bg-surface-1 px-4 py-2 text-[13px] text-warm-400 whitespace-nowrap hover:border-warm-600 hover:text-warm-200 transition-colors"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ExecutorMarquee() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 text-center mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-warm-500">
          Compatibility
        </p>
        <h2 className="mt-3 text-display text-3xl md:text-4xl">
          Works with <span className="italic">everything</span>
        </h2>
      </div>

      <div
        className="flex flex-col gap-3 w-full"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <MarqueeRow items={executors} speed={40} />
        <MarqueeRow items={formats} reverse speed={35} />
      </div>
    </section>
  );
}
