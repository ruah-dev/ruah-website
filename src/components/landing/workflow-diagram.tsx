"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Workflow diagram — three agent tracks running in parallel.
 * Each track is: [agent label] → [file path scope] → [status badge]
 * Progress bar fills in a staggered loop, visualising file-level claims
 * and merge order.
 */

type Track = {
  id: string;
  agent: string;
  scope: string;
  accentClass: string;
  dotClass: string;
  barClass: string;
  statusMerged: string;
  mergeDelay: number; // seconds
};

const TRACKS: Track[] = [
  {
    id: "auth",
    agent: "claude-code",
    scope: "src/auth/**",
    accentClass: "text-ruah-400",
    dotClass: "bg-ruah-400",
    barClass: "bg-ruah-400",
    statusMerged: "merged",
    mergeDelay: 2.6,
  },
  {
    id: "ui",
    agent: "opencode",
    scope: "src/ui/**",
    accentClass: "text-lavender-400",
    dotClass: "bg-lavender-400",
    barClass: "bg-lavender-400",
    statusMerged: "merged",
    mergeDelay: 3.8,
  },
  {
    id: "db",
    agent: "codex",
    scope: "src/db/**",
    accentClass: "text-amber-400",
    dotClass: "bg-amber-400",
    barClass: "bg-amber-400",
    statusMerged: "merged",
    mergeDelay: 5.0,
  },
];

const CYCLE_SECONDS = 6.5;

export function WorkflowDiagram({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  // Loop the animation on a timer (not an infinite keyframe) so we can gate it on reduced-motion
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), CYCLE_SECONDS * 1000);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div
      className={`relative rounded-[var(--r-lg)] border border-surface-3 bg-surface-1/80 p-5 md:p-6 backdrop-blur ${className ?? ""}`}
    >
      {/* header bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-ruah-400 opacity-60 animate-ping" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ruah-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-warm-400">
            ruah workflow run feature.md
          </span>
        </div>
        <span className="font-mono text-[11px] text-warm-600">live</span>
      </div>

      <div className="flex flex-col gap-3.5">
        {TRACKS.map((track, i) => (
          <TrackRow
            key={`${track.id}-${tick}`}
            track={track}
            index={i}
            reduced={!!reduced}
          />
        ))}
      </div>

      {/* footer — merge summary */}
      <div className="mt-5 pt-4 border-t border-surface-3/70 flex items-center justify-between font-mono text-[11px]">
        <span className="text-warm-500">3 tasks · 3 worktrees · 0 conflicts</span>
        <span className="text-sage-400">✓ merged in order</span>
      </div>
    </div>
  );
}

function TrackRow({
  track,
  index,
  reduced,
}: {
  track: Track;
  index: number;
  reduced: boolean;
}) {
  // Per-track bar fills between `startAt` and `mergeDelay`
  const startAt = 0.15 + index * 0.2;
  const fillDuration = track.mergeDelay - startAt;

  return (
    <div className="grid grid-cols-[6.5rem_1fr_4.5rem] md:grid-cols-[7rem_1fr_5rem] items-center gap-3 font-mono text-[12px]">
      <div className="flex items-center gap-2 min-w-0">
        <span className={`h-1.5 w-1.5 rounded-full ${track.dotClass}`} />
        <span className={`truncate ${track.accentClass}`}>{track.agent}</span>
      </div>

      <div className="relative h-[22px] rounded-[var(--r-xs)] border border-surface-3/60 bg-surface-2 overflow-hidden">
        {/* scope label centered */}
        <span className="absolute inset-0 z-10 flex items-center pl-3 text-[11px] text-warm-300 mix-blend-normal">
          {track.scope}
        </span>
        {/* Progress fill */}
        <motion.div
          className={`absolute inset-y-0 left-0 ${track.barClass} opacity-20`}
          initial={{ width: "0%" }}
          animate={reduced ? { width: "100%" } : { width: "100%" }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: fillDuration,
                  delay: startAt,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
        />
        {/* leading edge */}
        {!reduced && (
          <motion.div
            className={`absolute top-0 bottom-0 w-[2px] ${track.barClass}`}
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{
              duration: fillDuration,
              delay: startAt,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}
      </div>

      {/* status */}
      <motion.span
        className="text-right text-sage-400 text-[11px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduced ? { duration: 0 } : { delay: track.mergeDelay, duration: 0.3 }
        }
      >
        ✓ {track.statusMerged}
      </motion.span>
    </div>
  );
}
