"use client";

import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import Link from "next/link";
import { navItems, isNavGroup } from "@/config/navigation";
import type { NavItem, NavGroup } from "@/config/navigation";

const toolDescriptions: Record<string, string> = {
  CLI: "Unified CLI router",
  Orchestrator: "Multi-agent coordination",
  Converter: "API spec \u2192 agent tools",
};

function DesktopDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.1em] text-warm-400 transition-colors duration-300 hover:text-warm-100"
        onClick={() => setOpen((prev) => !prev)}
      >
        {group.label}
        <CaretDown
          size={10}
          weight="bold"
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-2 w-56 rounded-xl border border-surface-3 bg-surface-1 p-2 shadow-lg"
          >
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex flex-col rounded-lg px-4 py-3 transition-colors hover:bg-surface-2"
              >
                <span className="text-sm text-warm-200">{item.label}</span>
                {toolDescriptions[item.label] && (
                  <span className="text-xs text-warm-500">
                    {toolDescriptions[item.label]}
                  </span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8 md:py-6">
        <Logo size="md" />

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            if (isNavGroup(item)) {
              return <DesktopDropdown key={item.label} group={item} />;
            }

            const link = item as NavItem;
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.1em] text-warm-400 transition-colors duration-300 hover:text-warm-100"
              >
                {link.label}
                {link.external && <ArrowUpRight size={10} weight="bold" />}
              </Link>
            );
          })}

          <Link
            href="/docs/getting-started"
            className="rounded-full border border-warm-600 px-4 py-2 text-[13px] font-medium text-warm-200 transition-all duration-300 hover:border-warm-400 hover:text-warm-50"
          >
            Get started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-warm-300 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={22} weight="bold" />
          ) : (
            <List size={22} weight="bold" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-surface-3 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6">
              {navItems.map((item) => {
                if (isNavGroup(item)) {
                  return (
                    <div key={item.label}>
                      <span className="block pt-3 pb-1 text-xs font-medium uppercase tracking-[0.15em] text-warm-600">
                        {item.label}
                      </span>
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-3 pl-4 text-sm text-warm-300 transition-colors hover:text-warm-100"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  );
                }

                const link = item as NavItem;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="py-3 text-sm text-warm-300 transition-colors hover:text-warm-100"
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/docs/getting-started"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-full border border-warm-600 px-4 py-3 text-center text-sm font-medium text-warm-200 transition-all duration-300 hover:border-warm-400 hover:text-warm-50"
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
