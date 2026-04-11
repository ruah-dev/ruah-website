import type { Transition, MotionProps } from "framer-motion";

const springTransition: Transition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

export function fadeUpProps(
  prefersReducedMotion: boolean | null,
  delay = 0
): MotionProps {
  if (prefersReducedMotion) return {};

  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { ...springTransition, delay },
  };
}

export function fadeUpAnimateProps(
  prefersReducedMotion: boolean | null,
  delay = 0
): MotionProps {
  if (prefersReducedMotion) return {};

  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springTransition, delay },
  };
}

export { springTransition };
