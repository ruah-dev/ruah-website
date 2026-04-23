"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Section } from "@/components/shared/section";
import { ArrowRight, Copy, Check } from "@phosphor-icons/react";
import Link from "next/link";
import { Phantom } from "@/components/brand/phantom";

/**
 * Install CTA — final block. Per critique §09 install-cta item:
 * differentiate from hero install by giving something the hero doesn't
 * (copy-to-clipboard affordance + quickstart link). Single install path
 * (npm) — no brew/curl yet.
 */

const INSTALL_CMD = "npm i -g @ruah-dev/cli";
const FIRST_RUN_CMD = "ruah init";

export function InstallCTA() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState<"install" | "first" | null>(null);

  const copy = (which: "install" | "first", value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(which);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <Section className="pb-24">
      <motion.div
        className="relative overflow-hidden rounded-[var(--r-xl)] border border-surface-3 bg-gradient-to-br from-surface-1 to-surface-2 px-6 py-14 md:px-12 md:py-20 text-center"
        initial={reduced ? undefined : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(0,210,185,0.08), transparent 55%)",
          }}
        />

        {/* Phantom on the left, success expression */}
        <div className="absolute left-6 top-6 md:left-10 md:top-10 hidden md:block">
          <Phantom expression="success" size={72} noGlow />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-warm-500">
            Install
          </p>
          <h2 className="mt-4 text-display text-4xl md:text-6xl">
            Three agents. <span className="italic text-ruah-400">One command.</span>
          </h2>
          <p className="mt-5 text-warm-400 md:text-lg">
            Node.js 18+ · Zero runtime dependencies · MIT licensed.
          </p>

          {/* Install command — copy affordance */}
          <button
            onClick={() => copy("install", INSTALL_CMD)}
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-surface-3 bg-surface-1/80 px-6 py-4 font-mono text-[14px] text-warm-200 transition-colors hover:border-warm-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ruah-400"
            aria-label={`Copy install command: ${INSTALL_CMD}`}
          >
            <span className="text-ruah-400">$</span>
            <span>{INSTALL_CMD}</span>
            <span className="ml-1 text-warm-600 group-hover:text-warm-300 transition-colors">
              {copied === "install" ? (
                <Check size={14} weight="bold" className="text-ruah-400" />
              ) : (
                <Copy size={14} weight="bold" />
              )}
            </span>
          </button>

          {/* Then this — per critique, give bottom CTA something hero doesn't */}
          <p className="mt-8 text-xs font-mono uppercase tracking-[0.15em] text-warm-500">
            Then this
          </p>
          <button
            onClick={() => copy("first", FIRST_RUN_CMD)}
            className="group mt-3 inline-flex items-center gap-3 rounded-full border border-dashed border-surface-3 bg-transparent px-5 py-3 font-mono text-[13px] text-warm-300 transition-colors hover:border-warm-600 hover:text-warm-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ruah-400"
            aria-label={`Copy first-run command: ${FIRST_RUN_CMD}`}
          >
            <span className="text-ruah-400">$</span>
            <span>{FIRST_RUN_CMD}</span>
            <span className="ml-1 text-warm-600 group-hover:text-warm-300 transition-colors">
              {copied === "first" ? (
                <Check size={13} weight="bold" className="text-ruah-400" />
              ) : (
                <Copy size={13} weight="bold" />
              )}
            </span>
          </button>

          {/* Secondary links */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center gap-1.5 text-sm text-warm-300 hover:text-warm-100 transition-colors"
            >
              60-second quickstart
              <ArrowRight size={13} weight="bold" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 text-sm text-warm-500 hover:text-warm-300 transition-colors"
            >
              Full docs
              <ArrowRight size={13} weight="bold" />
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
