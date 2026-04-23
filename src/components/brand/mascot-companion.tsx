"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  useAnimationFrame,
} from "framer-motion";
import { Phantom, type PhantomExpression } from "@/components/brand/phantom";

/**
 * Mascot companion — free-roaming with spring-path movement.
 * - Follows a sine-wave path along the page as you scroll
 * - Eyes track the cursor
 * - On click, eyes snap to click location
 * - Under `prefers-reduced-motion`, stays visible but static (no sine path, no drift)
 * - Clickable (links to GitHub) per design redesign recommendation
 */
export function MascotCompanion() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const mascotRef = useRef<HTMLAnchorElement>(null);
  const [expression, setExpression] = useState<PhantomExpression>("tracking");

  const { scrollYProgress } = useScroll();

  // --- Position: sine-wave spring path ---
  const scrollX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
    [
      typeof window !== "undefined" ? window.innerWidth + 80 : 1500,
      typeof window !== "undefined" ? window.innerWidth - 80 : 1400,
      60,
      typeof window !== "undefined" ? window.innerWidth - 100 : 1380,
      40,
      typeof window !== "undefined" ? window.innerWidth - 60 : 1420,
      80,
      typeof window !== "undefined" ? window.innerWidth / 2 : 700,
    ]
  );

  const scrollBasedY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.2, 1],
    [
      typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
      typeof window !== "undefined" ? window.innerHeight * 0.5 : 400,
      typeof window !== "undefined" ? window.innerHeight * 0.4 : 350,
      typeof window !== "undefined" ? window.innerHeight * 0.6 : 500,
    ]
  );

  const springX = useSpring(scrollX, { stiffness: 35, damping: 15, mass: 1.5 });
  const springY = useSpring(scrollBasedY, { stiffness: 40, damping: 18, mass: 1.2 });

  const finalX = springX;
  const finalY = springY;

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.16, 0.9, 1], [0, 0, 1, 1, 0]);

  const tilt = useTransform(scrollX, (latest) => {
    const diff = latest - springX.get();
    return diff * 0.15;
  });
  const springTilt = useSpring(tilt, { stiffness: 100, damping: 20 });

  // --- Eye tracking ---
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 700);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);

  const clickScale = useMotionValue(1);
  const clickSpring = useSpring(clickScale, { stiffness: 600, damping: 15 });

  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const smoothEyeX = useMotionValue(0);
  const smoothEyeY = useMotionValue(0);
  const springEyeX = useSpring(smoothEyeX, { stiffness: 200, damping: 25 });
  const springEyeY = useSpring(smoothEyeY, { stiffness: 200, damping: 25 });

  useAnimationFrame(() => {
    if (!mascotRef.current) return;
    const rect = mascotRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = mouseX.get() - cx;
    const dy = mouseY.get() - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxOffset = 8;

    if (dist > 0) {
      const scale = Math.min(dist / 200, 1);
      smoothEyeX.set((dx / dist) * maxOffset * scale);
      smoothEyeY.set((dy / dist) * maxOffset * scale);
    }

    // Mirror motion values to React state for Phantom props (cheap — just two numbers)
    setEyeOffset({ x: springEyeX.get(), y: springEyeY.get() });
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      clickScale.set(1.25);
      setTimeout(() => clickScale.set(1), 100);
    },
    [mouseX, mouseY, clickScale]
  );

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleClick]);

  if (!mounted) return null;

  // Reduced-motion: render Phantom statically at bottom-right, still clickable.
  if (reduced) {
    return (
      <a
        href="https://github.com/ruah-dev"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ruah-400 rounded-full"
        aria-label="Ruah mascot — view on GitHub"
      >
        <Phantom expression="idle" size={56} noFloat noGlow />
      </a>
    );
  }

  return (
    <motion.a
      ref={mascotRef}
      href="https://github.com/ruah-dev"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-10 pointer-events-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ruah-400 rounded-full"
      aria-label="Ruah mascot — view on GitHub"
      onMouseEnter={() => setExpression("agent")}
      onMouseLeave={() => setExpression("tracking")}
      style={{
        left: finalX,
        top: finalY,
        rotate: springTilt,
        opacity,
        scale: clickSpring,
        x: "-50%",
        y: "-50%",
      }}
    >
      <Phantom
        expression={expression}
        size={80}
        eyeOffsetX={eyeOffset.x}
        eyeOffsetY={eyeOffset.y}
        noFloat
        noGlow
      />
    </motion.a>
  );
}
