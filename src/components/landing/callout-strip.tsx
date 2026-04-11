"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CalloutStrip() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={ref} className="overflow-hidden border-y border-surface-3 py-14 md:py-20 lg:py-28 bg-surface-1">
      <motion.div style={reduced ? undefined : { x }}>
        <p className="text-display text-[1.75rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5rem] text-center leading-[1.1] text-warm-200 px-6">
          Stop merging.&ensp;Start <span className="italic text-ruah-400">orchestrating.</span>
        </p>
      </motion.div>
    </section>
  );
}
