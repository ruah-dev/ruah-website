import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}

export function Section({
  children,
  className,
  id,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("relative py-16 md:py-24", className)}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">{children}</div>
    </Tag>
  );
}
