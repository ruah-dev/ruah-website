"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface DoubleBezelCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  hover?: boolean;
  glow?: boolean;
}

export function DoubleBezelCard({
  children,
  className,
  innerClassName,
  hover = true,
  glow = false,
}: DoubleBezelCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-surface-3",
        "bg-surface-1",
        hover && "group/card",
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
    >
      <div
        className={cn(
          "p-8 md:p-10",
          "transition-colors duration-500",
          hover && "group-hover/card:bg-surface-2",
          innerClassName
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
