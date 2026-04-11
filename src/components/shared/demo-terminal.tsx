"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface DemoTerminalProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  /** Delay before the component fades in (seconds) */
  delay?: number;
}

export function DemoTerminal({
  src,
  alt,
  title,
  className,
  width = 800,
  height = 500,
  delay = 0,
}: DemoTerminalProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "rounded-xl border border-surface-3 bg-surface-1 overflow-hidden shadow-card",
        className
      )}
      initial={reduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Terminal chrome */}
      <div className="flex items-center px-4 py-3 border-b border-surface-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-coral-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-ruah-400" />
          </div>
          {title && (
            <span className="ml-3 text-xs font-mono text-warm-600">{title}</span>
          )}
        </div>
      </div>

      {/* GIF content */}
      <div className="bg-surface-2">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          unoptimized
          priority={false}
        />
      </div>
    </motion.div>
  );
}
