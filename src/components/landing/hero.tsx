"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { InstallCommand } from "@/components/shared/terminal";
import { ArrowRight, GithubLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef } from "react";
import { Phantom } from "@/components/brand/phantom";
import { WorkflowDiagram } from "@/components/landing/workflow-diagram";

/**
 * SplitText — reveals text word-by-word.
 * Unlike the previous implementation, the initial rendered state is the
 * final state (revealed). JS then applies the animation on top. If JS fails
 * or is disabled, the text is still visible.
 */
function SplitText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={reduced ? { y: 0, rotateX: 0 } : { y: "40%", rotateX: -40, opacity: 0 }}
            animate={{ y: "0%", rotateX: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + wi * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax — but DON'T fade the whole section opacity (CTAs must stay visible on scroll)
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-10 pb-12 md:pt-16 md:pb-20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: copy + CTAs */}
          <motion.div
            className="relative z-10"
            style={reduced ? undefined : { y: textY }}
          >
            {/* Eyebrow with live pulse */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-surface-3 bg-surface-1/60 px-3 py-1.5 backdrop-blur"
              initial={reduced ? undefined : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative flex h-2 w-2">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-ruah-400 opacity-60 animate-ping" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ruah-400" />
              </span>
              <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-warm-300">
                Claude Code · OpenCode · Codex — in parallel
              </span>
            </motion.div>

            <h1 className="mt-5 text-display text-[2.25rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[4.25rem] [perspective:800px]">
              <SplitText text="Three coding agents." delay={0.15} />
              <br />
              <SplitText text="One repo." delay={0.45} />{" "}
              <span className="italic text-ruah-400">
                <SplitText text="Zero" delay={0.6} />
              </span>{" "}
              <SplitText text="merge conflicts." delay={0.75} />
            </h1>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-warm-300"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              Ruah spins each agent into its own git worktree, routes prompts,
              and turns any OpenAPI spec into MCP tools. So Claude Code,
              OpenCode, and Codex can work in parallel without clobbering each
              other&rsquo;s changes.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-4"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <InstallCommand className="w-fit" />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/docs"
                  className="magnetic group inline-flex items-center gap-3 rounded-full bg-warm-50 px-6 py-3.5 text-sm font-medium text-surface-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white hover:shadow-[0_0_40px_-8px_rgba(240,238,233,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ruah-400"
                >
                  Start in 60s
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-surface-0/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                    <ArrowRight size={13} weight="bold" />
                  </span>
                </Link>

                <a
                  href="https://github.com/ruah-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic group inline-flex items-center gap-3 rounded-full border border-surface-3 px-6 py-3.5 text-sm font-medium text-warm-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-warm-600 hover:text-warm-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ruah-400"
                >
                  <GithubLogo size={16} weight="fill" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: workflow diagram + phantom */}
          <motion.div
            className="relative"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 -m-8 rounded-[50%] bg-ruah-400/[0.08] blur-[100px]" />

            <WorkflowDiagram className="relative z-10" />

            {/* Phantom peeking over the diagram corner */}
            <div className="absolute -top-14 -right-6 md:-top-16 md:-right-10 z-20 pointer-events-none">
              <Phantom expression="thinking" size={96} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
