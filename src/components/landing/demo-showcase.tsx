"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/shared/section";
import { DemoTerminal } from "@/components/shared/demo-terminal";
import { tools } from "@/config/tools";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react";

const demos = tools.filter((t) => t.demoGif);

export function DemoShowcase() {
  const reduced = useReducedMotion();

  if (demos.length === 0) return null;

  return (
    <Section>
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-600">
          See it
        </p>
        <h2 className="mt-4 text-display text-4xl md:text-5xl">
          Watch it <span className="italic text-ruah-400">work</span>.
        </h2>
        <p className="mt-4 max-w-lg text-warm-400">
          Terminal recordings from the actual tools. No mockups, no edits.
        </p>
      </motion.div>

      <div className="mt-14 flex flex-col gap-16">
        {demos.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
              i % 2 === 1 ? "lg:direction-rtl" : ""
            }`}
          >
            {/* Description side */}
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="flex items-baseline gap-4 mb-3">
                <Link
                  href={`/tools/${tool.id}`}
                  className="group inline-flex items-baseline gap-2"
                >
                  <h3 className="text-display text-2xl group-hover:text-ruah-400 transition-colors">
                    {tool.name}
                  </h3>
                  <ArrowRight
                    size={13}
                    weight="bold"
                    className="text-warm-600 transition-all group-hover:text-ruah-400 group-hover:translate-x-1"
                  />
                </Link>
              </div>
              <p className="font-mono text-xs text-warm-600 mb-4">
                {tool.tagline}
              </p>
              <p className="text-sm text-warm-400 leading-relaxed mb-5">
                {tool.description}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {tool.features.slice(0, 6).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-warm-400"
                  >
                    <Check
                      size={14}
                      weight="bold"
                      className="text-ruah-400/70 mt-0.5 shrink-0"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* GIF side */}
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <DemoTerminal
                src={tool.demoGif!}
                alt={tool.demoAlt || `${tool.name} demo`}
                title={tool.package}
                width={560}
                height={350}
                delay={i * 0.05}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
