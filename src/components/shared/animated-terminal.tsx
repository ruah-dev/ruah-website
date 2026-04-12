"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useRef, useCallback, type ReactNode } from "react";

/* ── Types ── */

interface TerminalLine {
  text: string;
  /** Optional className overrides for this line */
  className?: string;
  /** Delay (ms) before this line appears after the previous one */
  delay?: number;
}

interface AnimatedTerminalProps {
  /** The command to type out (without the $ prefix) */
  command: string;
  /** Lines of output that appear after the command finishes typing */
  output: TerminalLine[];
  /** Terminal title bar text */
  title?: string;
  className?: string;
  /** Typing speed in ms per character (default: 40) */
  typingSpeed?: number;
  /** Delay (ms) before output starts appearing (default: 400) */
  outputDelay?: number;
  /** Delay (ms) before animation restarts (0 = no loop, default: 6000) */
  loopDelay?: number;
  /** Delay before the component fades in (seconds) */
  delay?: number;
}

/* ── Syntax colouring for output lines ── */

function colorize(line: string): ReactNode {
  // Bold headers: "API Spec Summary", "Auth Schemes (1)", "Tools (4)", "Types (3)"
  if (/^(API Spec Summary|Auth Schemes|Tools|Types)\b/.test(line)) {
    return <span className="text-warm-100 font-semibold">{line}</span>;
  }

  // Separator line
  if (/^[─]+$/.test(line)) {
    return <span className="text-warm-700">{line}</span>;
  }

  // Key-value lines like "  Title:    Petstore API"
  if (/^\s{2}\w+:/.test(line)) {
    const colonIdx = line.indexOf(":");
    const key = line.slice(0, colonIdx + 1);
    const value = line.slice(colonIdx + 1);
    return (
      <>
        <span className="text-warm-500">{key}</span>
        <span className="text-cyan-400">{value}</span>
      </>
    );
  }

  // Tool list items: "  • listPets  GET /pets  (2 params)"
  if (/^\s{2}[•]/.test(line)) {
    // Match: bullet, tool name, method, path, params, optional risk tag
    const match = line.match(
      /^(\s{2}[•]\s)(\w+)(\s+)(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)(\s+)(\/\S+)(\s+\([^)]+\))(\s+\[(\w+)\])?$/
    );
    if (match) {
      const [, bullet, name, sp1, method, sp2, path, params, , risk] = match;
      const methodColor =
        method === "GET"
          ? "text-ruah-400"
          : method === "DELETE"
            ? "text-coral-400"
            : "text-amber-400";
      const riskColor =
        risk === "destructive"
          ? "text-coral-400"
          : risk === "moderate"
            ? "text-amber-400"
            : "text-warm-600";
      return (
        <>
          <span className="text-warm-600">{bullet}</span>
          <span className="text-cyan-400">{name}</span>
          <span className="text-warm-700">{sp1}</span>
          <span className={methodColor}>{method}</span>
          <span className="text-warm-700">{sp2}</span>
          <span className="text-warm-500">{path}</span>
          <span className="text-warm-600">{params}</span>
          {risk && <span className={riskColor}> [{risk}]</span>}
        </>
      );
    }
    // Auth scheme bullet
    const authMatch = line.match(/^(\s{2}[•]\s)(.+)$/);
    if (authMatch) {
      return (
        <>
          <span className="text-warm-600">{authMatch[1]}</span>
          <span className="text-warm-400">{authMatch[2]}</span>
        </>
      );
    }
  }

  // Type list: "  Pet, NewPet, Error"
  if (/^\s{2}\w+,\s/.test(line)) {
    return <span className="text-cyan-400">{line}</span>;
  }

  // Default
  return <span className="text-warm-400">{line}</span>;
}

/* ── Component ── */

export function AnimatedTerminal({
  command,
  output,
  title,
  className,
  typingSpeed = 40,
  outputDelay = 400,
  loopDelay = 6000,
  delay = 0,
}: AnimatedTerminalProps) {
  const reduced = useReducedMotion();
  const [typedChars, setTypedChars] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "done">("typing");
  const [cursorVisible, setCursorVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Intersection observer — start animation when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Reset helper
  const reset = useCallback(() => {
    setTypedChars(0);
    setVisibleLines(0);
    setPhase("typing");
  }, []);

  // If reduced motion, show everything immediately
  useEffect(() => {
    if (reduced) {
      setTypedChars(command.length);
      setVisibleLines(output.length);
      setPhase("done");
    }
  }, [reduced, command.length, output.length]);

  // Typing phase
  useEffect(() => {
    if (!inView || reduced || phase !== "typing") return;

    if (typedChars < command.length) {
      timerRef.current = setTimeout(
        () => setTypedChars((c) => c + 1),
        typingSpeed
      );
      return () => clearTimeout(timerRef.current);
    } else {
      // Done typing → pause → start output
      timerRef.current = setTimeout(() => setPhase("output"), outputDelay);
      return () => clearTimeout(timerRef.current);
    }
  }, [inView, reduced, phase, typedChars, command.length, typingSpeed, outputDelay]);

  // Output phase — reveal lines one-by-one
  useEffect(() => {
    if (!inView || reduced || phase !== "output") return;

    if (visibleLines < output.length) {
      const lineDelay = output[visibleLines]?.delay ?? 60;
      timerRef.current = setTimeout(
        () => setVisibleLines((l) => l + 1),
        lineDelay
      );
      return () => clearTimeout(timerRef.current);
    } else {
      setPhase("done");
    }
  }, [inView, reduced, phase, visibleLines, output]);

  // Loop
  useEffect(() => {
    if (phase !== "done" || loopDelay === 0 || reduced) return;
    timerRef.current = setTimeout(reset, loopDelay);
    return () => clearTimeout(timerRef.current);
  }, [phase, loopDelay, reduced, reset]);

  return (
    <motion.div
      ref={containerRef}
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
            <span className="ml-3 text-xs font-mono text-warm-600">
              {title}
            </span>
          )}
        </div>
      </div>

      {/* Terminal body */}
      <div className="bg-surface-2 p-5 min-h-[280px]">
        <pre className="font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
          {/* Command line */}
          <span className="text-ruah-400">❯ </span>
          <span className="text-warm-100">{command.slice(0, typedChars)}</span>
          {phase === "typing" && (
            <span
              className={cn(
                "inline-block w-[7px] h-[15px] align-middle -mb-[1px] ml-[1px]",
                cursorVisible ? "bg-ruah-400" : "bg-transparent"
              )}
            />
          )}
          {"\n"}

          {/* Output lines */}
          {output.slice(0, visibleLines).map((line, i) => (
            <span key={i}>
              {line.className ? (
                <span className={line.className}>{line.text}</span>
              ) : (
                colorize(line.text)
              )}
              {"\n"}
            </span>
          ))}

          {/* Cursor at end when done */}
          {phase === "done" && (
            <>
              <span className="text-ruah-400">❯ </span>
              <span
                className={cn(
                  "inline-block w-[7px] h-[15px] align-middle -mb-[1px]",
                  cursorVisible ? "bg-ruah-400" : "bg-transparent"
                )}
              />
            </>
          )}
        </pre>
      </div>
    </motion.div>
  );
}
