"use client";

import { cn } from "@/lib/utils";
import { useState, useCallback, type ReactNode } from "react";
import { Check, Copy } from "@phosphor-icons/react";

/* ── Syntax highlighting for terminal snippets ── */

function highlightLine(line: string): ReactNode {
  // Comment lines (# ...)
  if (/^\s*#/.test(line)) {
    // Success markers: ✓
    if (line.includes("✓")) {
      return (
        <span className="text-warm-600">
          {line.replace(/✓[^]*/g, "")}
          <span className="text-ruah-400">{line.match(/✓.*/)?.[0]}</span>
        </span>
      );
    }
    // Arrow markers: →
    if (line.includes("→")) {
      return (
        <span className="text-warm-600">
          {line.split("→")[0]}
          <span className="text-amber-400">→{line.split("→").slice(1).join("→")}</span>
        </span>
      );
    }
    return <span className="text-warm-600">{line}</span>;
  }

  // Command lines starting with $
  if (/^\s*\$/.test(line)) {
    const parts: ReactNode[] = [];
    let remaining = line;
    let key = 0;

    // Extract the $ prompt
    const promptMatch = remaining.match(/^(\s*\$\s*)/);
    if (promptMatch) {
      parts.push(<span key={key++} className="text-ruah-400">{promptMatch[1]}</span>);
      remaining = remaining.slice(promptMatch[1].length);
    }

    // Tokenize the rest
    const tokens = remaining.split(/(\s+|"[^"]*"|'[^']*'|--\S+|\\)/g).filter(Boolean);
    let isFirstWord = true;

    for (const token of tokens) {
      if (/^\s+$/.test(token) || token === "\\") {
        parts.push(<span key={key++} className="text-warm-300">{token}</span>);
      } else if (token.startsWith("--")) {
        // Flags
        parts.push(<span key={key++} className="text-amber-400">{token}</span>);
      } else if (token.startsWith('"') || token.startsWith("'")) {
        // Quoted strings
        parts.push(<span key={key++} className="text-amber-300">{token}</span>);
      } else if (token.startsWith("@")) {
        // Package names
        parts.push(<span key={key++} className="text-ruah-300">{token}</span>);
      } else if (isFirstWord) {
        // Command name (first word after $)
        parts.push(<span key={key++} className="text-warm-100 font-medium">{token}</span>);
        isFirstWord = false;
      } else {
        // Subcommands and arguments
        parts.push(<span key={key++} className="text-warm-300">{token}</span>);
      }
    }

    return <>{parts}</>;
  }

  // Plain output lines
  return <span className="text-warm-400">{line}</span>;
}

export function highlightTerminal(code: string): ReactNode {
  const lines = code.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {highlightLine(line)}
      {i < lines.length - 1 ? "\n" : ""}
    </span>
  ));
}

/* ── Terminal component ── */

interface TerminalProps {
  children: string;
  title?: string;
  className?: string;
  copyable?: boolean;
  highlight?: boolean;
}

export function Terminal({ children, title, className, copyable = true, highlight = true }: TerminalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  return (
    <div
      className={cn(
        "rounded-xl border border-surface-3 bg-surface-1 overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-3">
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
        {copyable && (
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-warm-600 hover:text-warm-300 transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check size={13} weight="bold" className="text-ruah-400" />
            ) : (
              <Copy size={13} weight="bold" />
            )}
          </button>
        )}
      </div>

      <div className="p-5">
        <pre className="font-mono text-[13px] leading-relaxed overflow-x-auto">
          <code>{highlight ? highlightTerminal(children) : <span className="text-warm-300">{children}</span>}</code>
        </pre>
      </div>
    </div>
  );
}

interface InstallCommandProps {
  command?: string;
  className?: string;
}

export function InstallCommand({
  command = "npm i -g @ruah-dev/cli",
  className,
}: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [command]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group inline-flex items-center gap-3",
        "rounded-full border border-surface-3 bg-surface-1 px-5 py-3",
        "font-mono text-[13px] text-warm-400",
        "hover:border-warm-600 hover:text-warm-200",
        "transition-all duration-300",
        className
      )}
      aria-label={`Copy command: ${command}`}
    >
      <span className="text-ruah-400">$</span>
      <span>{command}</span>
      <span className="ml-1 text-warm-600 group-hover:text-warm-400 transition-colors">
        {copied ? <Check size={13} weight="bold" /> : <Copy size={13} weight="bold" />}
      </span>
    </button>
  );
}
