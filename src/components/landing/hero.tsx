"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { InstallCommand } from "@/components/shared/terminal";
import { ArrowRight, GithubLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef, useState } from "react";

function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(reduced ?? false);
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className={`inline-block mr-[0.25em] ${revealed ? "" : "overflow-hidden"}`}>
          <motion.span
            className="inline-block"
            initial={reduced ? undefined : { y: "110%", rotateX: -80 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + wi * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "bottom" }}
            onAnimationComplete={wi === words.length - 1 ? () => setRevealed(true) : undefined}
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

  // Parallax — text moves slower, mascot moves faster
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const mascotY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const mascotRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-8 pb-8 md:pt-16 md:pb-14">
      <motion.div className="mx-auto max-w-7xl px-6 md:px-8" style={{ opacity }}>
        {/* Centered layout with mascot as accent */}
        <div className="relative">
          {/* Mascot — positioned as background accent on desktop */}
          <motion.div
            className="flex justify-center md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:z-0"
            style={reduced ? undefined : { y: mascotY, rotate: mascotRotate }}
          >
            <motion.div
              className="relative"
              initial={reduced ? undefined : { opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 -m-16 rounded-full bg-ruah-400/[0.16] blur-[100px]" />

              <motion.svg
                viewBox="0 0 600 600"
                className="relative w-40 h-40 md:w-64 md:h-64 lg:w-72 lg:h-72 md:opacity-60 lg:opacity-70"
                animate={reduced ? undefined : { y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <path
                  d="M 468.0,380.4 L 466.8,388.4 L 464.5,396.0 L 461.1,403.1 L 456.8,409.9 L 451.5,416.2 L 445.3,422.2 L 438.4,427.7 L 430.6,432.8 L 422.2,437.5 L 413.1,441.8 L 403.5,445.7 L 393.3,449.2 L 382.7,452.3 L 371.6,454.9 L 360.2,457.2 L 348.5,459.0 L 336.6,460.5 L 324.5,461.5 L 312.3,462.1 L 300.0,462.3 L 287.7,462.1 L 275.5,461.5 L 263.4,460.5 L 251.5,459.0 L 239.8,457.2 L 228.4,454.9 L 217.3,452.3 L 206.7,449.2 L 196.5,445.7 L 186.9,441.8 L 177.8,437.5 L 169.4,432.8 L 161.6,427.7 L 154.7,422.2 L 148.5,416.2 L 143.2,409.9 L 138.9,403.1 L 135.5,396.0 L 133.2,388.4 L 132.0,380.4 L 130.9,371.6 L 130.0,362.9 L 129.4,354.3 L 129.1,345.7 L 129.0,337.2 L 129.3,328.8 L 129.9,320.6 L 130.7,312.4 L 131.9,304.3 L 133.5,296.4 L 135.3,288.6 L 137.6,280.9 L 140.1,273.4 L 143.1,266.0 L 146.4,258.7 L 150.1,251.6 L 154.2,244.7 L 158.7,238.0 L 163.6,231.4 L 169.0,225.0 L 170.3,216.2 L 172.2,208.1 L 174.6,200.9 L 177.4,194.6 L 180.7,189.1 L 184.4,184.5 L 188.3,180.8 L 192.5,178.1 L 196.9,176.3 L 201.4,175.5 L 206.1,175.8 L 210.7,177.0 L 215.4,179.3 L 220.0,182.7 L 224.4,187.2 L 228.7,193.9 L 233.2,199.5 L 237.7,203.9 L 242.3,207.1 L 246.9,209.2 L 251.5,210.3 L 255.9,210.3 L 260.2,209.3 L 264.3,207.3 L 268.2,204.3 L 271.7,200.4 L 274.8,195.6 L 277.7,186.2 L 280.7,177.6 L 283.8,169.7 L 287.1,162.6 L 290.4,156.3 L 293.8,150.8 L 297.2,146.1 L 300.7,142.1 L 304.2,138.9 L 307.7,136.5 L 311.2,134.9 L 314.6,134.0 L 318.0,133.9 L 321.3,134.6 L 324.6,136.1 L 327.7,138.4 L 330.7,141.4 L 333.6,145.2 L 338.6,154.5 L 343.7,162.4 L 348.7,168.7 L 353.8,173.7 L 358.8,177.2 L 363.8,179.4 L 368.9,180.2 L 373.9,179.6 L 379.0,177.7 L 384.0,174.6 L 387.5,169.2 L 391.1,164.8 L 394.9,161.3 L 398.8,158.7 L 402.7,157.0 L 406.6,156.1 L 410.4,156.0 L 414.2,156.6 L 417.9,158.0 L 421.3,160.0 L 424.6,162.6 L 427.5,165.9 L 430.2,169.7 L 432.5,174.0 L 434.4,178.8 L 438.8,185.3 L 441.8,191.3 L 443.9,196.8 L 445.0,201.8 L 445.4,206.2 L 445.2,210.0 L 444.6,213.2 L 443.9,215.7 L 443.1,217.5 L 442.5,218.6 L 442.2,219.0 L 442.4,218.6 L 443.3,217.4 L 445.1,215.3 L 447.8,212.4 L 451.7,206.1 L 455.4,201.1 L 458.9,197.5 L 462.3,195.0 L 465.5,193.8 L 468.4,193.7 L 471.0,194.7 L 473.4,196.8 L 475.6,199.8 L 477.4,203.8 L 478.8,208.6 L 479.9,214.3 L 480.7,220.7 L 481.0,227.9 L 481.0,235.7 L 480.5,244.2 L 479.5,253.2 L 478.1,262.8 L 477.4,272.8 L 476.8,282.5 L 476.2,292.0 L 475.7,301.2 L 475.1,310.1 L 474.5,318.7 L 474.0,327.0 L 473.4,335.0 L 472.8,342.6 L 472.1,349.9 L 471.4,356.8 L 470.7,363.3 L 469.8,369.4 L 469.0,375.1 L 468.0,380.4 Z"
                  fill="currentColor"
                  className="text-ruah-400"
                />
                <ellipse cx="237.0" cy="355.2" rx="24.4" ry="31.5" className="fill-warm-100" />
                <ellipse cx="363.0" cy="355.2" rx="24.4" ry="31.5" className="fill-warm-100" />
              </motion.svg>
            </motion.div>
          </motion.div>

          {/* Content — full width, layered over mascot on desktop */}
          <motion.div className="relative z-10 max-w-3xl" style={reduced ? undefined : { y: textY }}>
            <motion.p
              className="text-sm font-medium tracking-[0.15em] uppercase text-warm-400"
              initial={reduced ? undefined : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Open-source developer tooling
            </motion.p>

            <h1 className="mt-6 text-display text-5xl md:text-7xl lg:text-[5.5rem] [perspective:800px]">
              <SplitText text="The toolchain for" delay={0.15} />
              <br />
              <span className="italic text-ruah-400">
                <SplitText text="agentic" delay={0.5} />
              </span>{" "}
              <SplitText text="AI" delay={0.65} />
            </h1>

            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed text-warm-300"
              initial={reduced ? undefined : { opacity: 0, y: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Route commands. Orchestrate parallel agents. Convert any API spec
              into agent-ready tools. One CLI, every workflow.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-4"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <InstallCommand className="w-fit" />

                <motion.span
                  className="flex items-center gap-2 text-xs text-warm-500"
                  initial={reduced ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-ruah-400 animate-pulse" />
                  v1.1.1 · MIT · Node 18+
                </motion.span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/docs"
                  className="magnetic group inline-flex items-center gap-3 rounded-full bg-warm-50 px-6 py-3.5 text-sm font-medium text-surface-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white hover:shadow-[0_0_40px_-8px_rgba(240,238,233,0.3)]"
                >
                  Get started
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-surface-0/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                    <ArrowRight size={13} weight="bold" />
                  </span>
                </Link>

                <a
                  href="https://github.com/ruah-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic group inline-flex items-center gap-3 rounded-full border border-warm-800 px-6 py-3.5 text-sm font-medium text-warm-300 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-warm-600 hover:text-warm-100"
                >
                  <GithubLogo size={16} weight="fill" />
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
