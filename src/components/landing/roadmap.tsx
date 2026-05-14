"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/shared/section";
import { roadmap, type RoadmapEntry } from "@/config/roadmap";

const GROUPS: {
  label: string;
  status: RoadmapEntry["status"];
  hint: string;
}[] = [
  {
    label: "In development",
    status: "in-development",
    hint: "Prototypes building now.",
  },
  {
    label: "Coming soon",
    status: "coming-soon",
    hint: "Designed. Shipping when the signal says so.",
  },
];

function StatusDot({ status }: { status: RoadmapEntry["status"] }) {
  const tone =
    status === "in-development"
      ? "bg-amber-400 shadow-[0_0_10px_var(--color-amber-400)]"
      : "bg-ruah-400/70";
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0">
      {status === "in-development" && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 motion-safe:animate-ping" />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${tone}`} />
    </span>
  );
}

function EnterpriseChip() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-lavender-500/30 bg-lavender-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-lavender-300">
      Enterprise
    </span>
  );
}

function RoadmapCard({
  entry,
  index,
  reduced,
}: {
  entry: RoadmapEntry;
  index: number;
  reduced: boolean | null;
}) {
  return (
    <motion.li
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col rounded-[var(--r-md)] border border-surface-3 bg-surface-1 p-5 md:p-6 transition-colors duration-500 hover:border-surface-4 hover:bg-surface-2"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <StatusDot status={entry.status} />
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-warm-500">
            Ruah {entry.name}
          </span>
        </div>
        {entry.enterprise && <EnterpriseChip />}
      </div>

      <h3 className="mt-4 text-display text-2xl leading-tight text-warm-100 group-hover:text-ruah-400 transition-colors duration-500">
        {entry.name}
      </h3>
      <p className="mt-1 font-serif italic text-sm text-warm-300">
        {entry.tagline}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-warm-400">
        {entry.blurb}
      </p>
    </motion.li>
  );
}

export function Roadmap() {
  const reduced = useReducedMotion();

  return (
    <Section id="roadmap" className="relative z-10">
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-warm-500">
          The roadmap
        </p>
        <h2 className="mt-4 text-display text-4xl md:text-5xl">
          Eleven more tools.{" "}
          <span className="italic text-ruah-400">On the way.</span>
        </h2>
        <p className="mt-4 text-warm-400">
          Open-core ecosystem. CLI and runtime stay OSS; team dashboards,
          policy management, and hosted registry ship as Ruah Cloud.
          Shipping when the signal says so — not when a calendar does.
        </p>
      </motion.div>

      <div className="mt-12 flex flex-col gap-14">
        {GROUPS.map((group) => {
          const entries = roadmap.filter((r) => r.status === group.status);
          if (entries.length === 0) return null;
          return (
            <div key={group.status}>
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-surface-3 pb-4">
                <div className="flex items-center gap-3">
                  <StatusDot status={group.status} />
                  <h3 className="text-display text-lg md:text-xl text-warm-200">
                    {group.label}
                  </h3>
                </div>
                <p className="text-[12px] text-warm-500 text-right">
                  {group.hint}
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry, i) => (
                  <RoadmapCard
                    key={entry.id}
                    entry={entry}
                    index={i}
                    reduced={reduced}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
