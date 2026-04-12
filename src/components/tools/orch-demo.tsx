"use client";

import { AnimatedTerminal } from "@/components/shared/animated-terminal";

/**
 * Animated terminal demo for ruah-orch.
 * Shows the task creation + parallel execution + merge workflow.
 */

const COMMAND = 'ruah task create auth --files "src/auth/**" --executor claude-code';

const OUTPUT = [
  { text: "", delay: 80 },
  { text: "✓ Created task 'auth'", className: "text-ruah-400", delay: 120 },
  { text: "  Worktree:  .ruah/worktrees/auth", delay: 50 },
  { text: "  Branch:    ruah/auth", delay: 40 },
  { text: "  Files:     src/auth/** (owned)", delay: 40 },
  { text: "  Executor:  claude-code", delay: 40 },
  { text: "", delay: 200 },
];

const COMMAND_2 = 'ruah task create api --files "src/api/**" --executor claude-code';

const OUTPUT_2 = [
  { text: "", delay: 80 },
  { text: "✓ Created task 'api'", className: "text-ruah-400", delay: 120 },
  { text: "  Worktree:  .ruah/worktrees/api", delay: 50 },
  { text: "  Branch:    ruah/api", delay: 40 },
  { text: "  Files:     src/api/** (owned)", delay: 40 },
  { text: "  Executor:  claude-code", delay: 40 },
  { text: "", delay: 200 },
];

const COMMAND_3 = "ruah status";

const OUTPUT_3 = [
  { text: "", delay: 80 },
  { text: "ruah v1.1.3 — 2 active tasks", className: "text-warm-100 font-semibold", delay: 100 },
  { text: "──────────────────────────────────────────", className: "text-warm-700", delay: 40 },
  { text: "  auth   running   src/auth/**   claude-code", delay: 60 },
  { text: "  api    running   src/api/**    claude-code", delay: 60 },
  { text: "", delay: 40 },
  { text: "  File locks: 2 owned, 0 shared, 0 conflicts", delay: 60 },
  { text: "  Worktrees:  2 active", delay: 40 },
];

interface OrchDemoProps {
  className?: string;
  delay?: number;
}

export function OrchDemo({ className, delay = 0 }: OrchDemoProps) {
  return (
    <MultiStepTerminal
      steps={[
        { command: COMMAND, output: OUTPUT },
        { command: COMMAND_2, output: OUTPUT_2 },
        { command: COMMAND_3, output: OUTPUT_3 },
      ]}
      title="@ruah-dev/orch"
      className={className}
      delay={delay}
    />
  );
}

/* ── Multi-step animated terminal ── */

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";

interface TerminalLine {
  text: string;
  className?: string;
  delay?: number;
}

interface Step {
  command: string;
  output: TerminalLine[];
}

interface MultiStepTerminalProps {
  steps: Step[];
  title?: string;
  className?: string;
  typingSpeed?: number;
  outputDelay?: number;
  stepPause?: number;
  loopDelay?: number;
  delay?: number;
}

/* ── Colorize output lines ── */

function colorize(line: string): ReactNode {
  // Success markers
  if (/^✓/.test(line)) {
    return <span className="text-ruah-400">{line}</span>;
  }

  // Separator
  if (/^[─]+$/.test(line)) {
    return <span className="text-warm-700">{line}</span>;
  }

  // Status table lines: "  auth   running   src/auth/**   claude-code"
  const statusMatch = line.match(
    /^(\s{2})(\w+)(\s+)(pending|running|done|failed|merged)(\s+)(.+?)(\s{2,})(.+)$/
  );
  if (statusMatch) {
    const [, indent, name, sp1, status, sp2, files, sp3, executor] =
      statusMatch;
    const statusColor =
      status === "running"
        ? "text-amber-400"
        : status === "done" || status === "merged"
          ? "text-ruah-400"
          : status === "failed"
            ? "text-coral-400"
            : "text-warm-500";
    return (
      <>
        <span className="text-warm-600">{indent}</span>
        <span className="text-cyan-400">{name}</span>
        <span className="text-warm-700">{sp1}</span>
        <span className={statusColor}>{status}</span>
        <span className="text-warm-700">{sp2}</span>
        <span className="text-warm-500">{files}</span>
        <span className="text-warm-700">{sp3}</span>
        <span className="text-warm-600">{executor}</span>
      </>
    );
  }

  // Key-value: "  Worktree:  .ruah/worktrees/auth"
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

  // Info lines with counts
  if (/^\s{2}(File locks|Worktrees):/.test(line)) {
    const colonIdx = line.indexOf(":");
    const key = line.slice(0, colonIdx + 1);
    const value = line.slice(colonIdx + 1);
    return (
      <>
        <span className="text-warm-500">{key}</span>
        <span className="text-warm-400">{value}</span>
      </>
    );
  }

  return <span className="text-warm-400">{line}</span>;
}

function MultiStepTerminal({
  steps,
  title,
  className,
  typingSpeed = 30,
  outputDelay = 400,
  stepPause = 600,
  loopDelay = 7000,
  delay = 0,
}: MultiStepTerminalProps) {
  const reduced = useReducedMotion();

  // State: which step we're on, how many chars typed, how many output lines visible
  const [stepIdx, setStepIdx] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<
    "typing" | "output" | "step-pause" | "done"
  >("typing");
  const [cursorVisible, setCursorVisible] = useState(true);

  // All completed steps' content (command + output) for display
  const [completedSteps, setCompletedSteps] = useState<
    { command: string; output: TerminalLine[] }[]
  >([]);

  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const currentStep = steps[stepIdx];

  // Intersection observer
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

  // Auto-scroll terminal body
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [typedChars, visibleLines, completedSteps, phase]);

  // Reset
  const reset = useCallback(() => {
    setStepIdx(0);
    setTypedChars(0);
    setVisibleLines(0);
    setPhase("typing");
    setCompletedSteps([]);
  }, []);

  // Reduced motion — show everything
  useEffect(() => {
    if (reduced) {
      setCompletedSteps(steps.slice(0, -1));
      setStepIdx(steps.length - 1);
      const last = steps[steps.length - 1];
      setTypedChars(last.command.length);
      setVisibleLines(last.output.length);
      setPhase("done");
    }
  }, [reduced, steps]);

  // Typing
  useEffect(() => {
    if (!inView || reduced || phase !== "typing" || !currentStep) return;

    if (typedChars < currentStep.command.length) {
      timerRef.current = setTimeout(
        () => setTypedChars((c) => c + 1),
        typingSpeed
      );
      return () => clearTimeout(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => setPhase("output"), outputDelay);
      return () => clearTimeout(timerRef.current);
    }
  }, [inView, reduced, phase, typedChars, currentStep, typingSpeed, outputDelay]);

  // Output reveal
  useEffect(() => {
    if (!inView || reduced || phase !== "output" || !currentStep) return;

    if (visibleLines < currentStep.output.length) {
      const lineDelay = currentStep.output[visibleLines]?.delay ?? 60;
      timerRef.current = setTimeout(
        () => setVisibleLines((l) => l + 1),
        lineDelay
      );
      return () => clearTimeout(timerRef.current);
    } else {
      // Step done — move to next or finish
      if (stepIdx < steps.length - 1) {
        setPhase("step-pause");
      } else {
        setPhase("done");
      }
    }
  }, [inView, reduced, phase, visibleLines, currentStep, stepIdx, steps.length]);

  // Step pause → advance
  useEffect(() => {
    if (phase !== "step-pause" || !currentStep) return;
    timerRef.current = setTimeout(() => {
      setCompletedSteps((prev) => [
        ...prev,
        { command: currentStep.command, output: currentStep.output },
      ]);
      setStepIdx((i) => i + 1);
      setTypedChars(0);
      setVisibleLines(0);
      setPhase("typing");
    }, stepPause);
    return () => clearTimeout(timerRef.current);
  }, [phase, stepPause, currentStep]);

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
      <div
        ref={bodyRef}
        className="bg-surface-2 p-5 min-h-[320px] max-h-[420px] overflow-y-auto scrollbar-thin"
      >
        <pre className="font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
          {/* Completed steps */}
          {completedSteps.map((step, si) => (
            <span key={si}>
              <span className="text-ruah-400">❯ </span>
              <span className="text-warm-100">{step.command}</span>
              {"\n"}
              {step.output.map((line, li) => (
                <span key={li}>
                  {line.className ? (
                    <span className={line.className}>{line.text}</span>
                  ) : (
                    colorize(line.text)
                  )}
                  {"\n"}
                </span>
              ))}
            </span>
          ))}

          {/* Current step */}
          {currentStep && (
            <>
              <span className="text-ruah-400">❯ </span>
              <span className="text-warm-100">
                {currentStep.command.slice(0, typedChars)}
              </span>
              {phase === "typing" && (
                <span
                  className={cn(
                    "inline-block w-[7px] h-[15px] align-middle -mb-[1px] ml-[1px]",
                    cursorVisible ? "bg-ruah-400" : "bg-transparent"
                  )}
                />
              )}
              {"\n"}

              {currentStep.output.slice(0, visibleLines).map((line, i) => (
                <span key={i}>
                  {line.className ? (
                    <span className={line.className}>{line.text}</span>
                  ) : (
                    colorize(line.text)
                  )}
                  {"\n"}
                </span>
              ))}
            </>
          )}

          {/* Final cursor */}
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
