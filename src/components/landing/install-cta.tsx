"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/shared/section";
import { InstallCommand } from "@/components/shared/terminal";
import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

export function InstallCTA() {
  const reduced = useReducedMotion();

  return (
    <Section className="pb-20">
      <motion.div
        className="text-center"
        initial={reduced ? undefined : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-display text-4xl md:text-6xl">
          Ready to <span className="italic text-ruah-400">build</span>?
        </h2>
        <p className="mt-6 text-warm-400 md:text-lg max-w-md mx-auto">
          Node.js 18+. Zero runtime dependencies. MIT licensed.
          Works with every AI coding agent.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <InstallCommand />
        </div>

        <div className="mt-6">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-sm text-warm-400 hover:text-warm-200 transition-colors"
          >
            Read the documentation
            <ArrowRight size={13} weight="bold" />
          </Link>
        </div>
      </motion.div>
    </Section>
  );
}
