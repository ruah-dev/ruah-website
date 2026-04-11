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

/**
 * Mascot companion — free-roaming with spring-path movement.
 * - Follows a sine-wave path along the page as you scroll
 * - Eyes track the cursor
 * - On click, eyes snap to click location
 * - Hidden during hero, appears after scrolling
 */
export function MascotCompanion() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const mascotRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // --- Position: sine-wave spring path ---
  // X oscillates in a sine wave as you scroll
  const scrollX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
    [
      typeof window !== "undefined" ? window.innerWidth + 80 : 1500, // off-screen right
      typeof window !== "undefined" ? window.innerWidth - 80 : 1400, // right side
      60, // left side
      typeof window !== "undefined" ? window.innerWidth - 100 : 1380, // right
      40, // left
      typeof window !== "undefined" ? window.innerWidth - 60 : 1420, // right
      80, // left
      typeof window !== "undefined" ? window.innerWidth / 2 : 700, // center bottom
    ]
  );

  // Y follows scroll but with offset to stay in viewport
  const scrollBasedY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.2, 1],
    [
      typeof window !== "undefined" ? window.innerHeight + 100 : 1000, // below viewport
      typeof window !== "undefined" ? window.innerHeight * 0.5 : 400, // mid
      typeof window !== "undefined" ? window.innerHeight * 0.4 : 350, // settle
      typeof window !== "undefined" ? window.innerHeight * 0.6 : 500, // drift down
    ]
  );

  // Spring-smooth the position for that organic feel
  const springX = useSpring(scrollX, { stiffness: 35, damping: 15, mass: 1.5 });
  const springY = useSpring(scrollBasedY, { stiffness: 40, damping: 18, mass: 1.2 });

  // Final position (spring-smoothed path)
  const finalX = springX;
  const finalY = springY;

  // Opacity: hidden at top
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.16, 0.9, 1], [0, 0, 1, 1, 0]);

  // Tilt based on horizontal movement direction
  const tilt = useTransform(scrollX, (latest) => {
    // Compare to spring to get direction
    const diff = latest - springX.get();
    return diff * 0.15; // subtle lean into movement
  });
  const springTilt = useSpring(tilt, { stiffness: 100, damping: 20 });

  // --- Eye tracking ---
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 700);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);

  // Click flash effect
  const clickScale = useMotionValue(1);
  const clickSpring = useSpring(clickScale, { stiffness: 600, damping: 15 });

  // Eye offset from center (max ±8px in SVG space)
  const eyeOffsetX = useMotionValue(0);
  const eyeOffsetY = useMotionValue(0);
  const smoothEyeX = useSpring(eyeOffsetX, { stiffness: 200, damping: 25 });
  const smoothEyeY = useSpring(eyeOffsetY, { stiffness: 200, damping: 25 });

  // Derived eye positions
  const leftPupilCx = useTransform(smoothEyeX, (v) => 237 + v);
  const leftPupilCy = useTransform(smoothEyeY, (v) => 358 + v);
  const rightPupilCx = useTransform(smoothEyeX, (v) => 363 + v);
  const rightPupilCy = useTransform(smoothEyeY, (v) => 358 + v);

  // Update eye direction toward cursor + card avoidance
  useAnimationFrame(() => {
    if (!mascotRef.current) return;
    const rect = mascotRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // --- Eye tracking ---
    const dx = mouseX.get() - cx;
    const dy = mouseY.get() - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxOffset = 8;

    if (dist > 0) {
      const scale = Math.min(dist / 200, 1);
      eyeOffsetX.set((dx / dist) * maxOffset * scale);
      eyeOffsetY.set((dy / dist) * maxOffset * scale);
    }

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
      // Snap eyes hard toward click
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      // Pop scale
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

  if (!mounted || reduced) return null;

  return (
    <motion.div
      ref={mascotRef}
      className="fixed z-10 pointer-events-none"
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
      <svg viewBox="0 0 600 600" className="w-20 h-20 drop-shadow-lg" aria-hidden="true">
        {/* Body */}
        <path
          d="M 468.0,380.4 L 466.8,388.4 L 464.5,396.0 L 461.1,403.1 L 456.8,409.9 L 451.5,416.2 L 445.3,422.2 L 438.4,427.7 L 430.6,432.8 L 422.2,437.5 L 413.1,441.8 L 403.5,445.7 L 393.3,449.2 L 382.7,452.3 L 371.6,454.9 L 360.2,457.2 L 348.5,459.0 L 336.6,460.5 L 324.5,461.5 L 312.3,462.1 L 300.0,462.3 L 287.7,462.1 L 275.5,461.5 L 263.4,460.5 L 251.5,459.0 L 239.8,457.2 L 228.4,454.9 L 217.3,452.3 L 206.7,449.2 L 196.5,445.7 L 186.9,441.8 L 177.8,437.5 L 169.4,432.8 L 161.6,427.7 L 154.7,422.2 L 148.5,416.2 L 143.2,409.9 L 138.9,403.1 L 135.5,396.0 L 133.2,388.4 L 132.0,380.4 L 130.9,371.6 L 130.0,362.9 L 129.4,354.3 L 129.1,345.7 L 129.0,337.2 L 129.3,328.8 L 129.9,320.6 L 130.7,312.4 L 131.9,304.3 L 133.5,296.4 L 135.3,288.6 L 137.6,280.9 L 140.1,273.4 L 143.1,266.0 L 146.4,258.7 L 150.1,251.6 L 154.2,244.7 L 158.7,238.0 L 163.6,231.4 L 169.0,225.0 L 170.3,216.2 L 172.2,208.1 L 174.6,200.9 L 177.4,194.6 L 180.7,189.1 L 184.4,184.5 L 188.3,180.8 L 192.5,178.1 L 196.9,176.3 L 201.4,175.5 L 206.1,175.8 L 210.7,177.0 L 215.4,179.3 L 220.0,182.7 L 224.4,187.2 L 228.7,193.9 L 233.2,199.5 L 237.7,203.9 L 242.3,207.1 L 246.9,209.2 L 251.5,210.3 L 255.9,210.3 L 260.2,209.3 L 264.3,207.3 L 268.2,204.3 L 271.7,200.4 L 274.8,195.6 L 277.7,186.2 L 280.7,177.6 L 283.8,169.7 L 287.1,162.6 L 290.4,156.3 L 293.8,150.8 L 297.2,146.1 L 300.7,142.1 L 304.2,138.9 L 307.7,136.5 L 311.2,134.9 L 314.6,134.0 L 318.0,133.9 L 321.3,134.6 L 324.6,136.1 L 327.7,138.4 L 330.7,141.4 L 333.6,145.2 L 338.6,154.5 L 343.7,162.4 L 348.7,168.7 L 353.8,173.7 L 358.8,177.2 L 363.8,179.4 L 368.9,180.2 L 373.9,179.6 L 379.0,177.7 L 384.0,174.6 L 387.5,169.2 L 391.1,164.8 L 394.9,161.3 L 398.8,158.7 L 402.7,157.0 L 406.6,156.1 L 410.4,156.0 L 414.2,156.6 L 417.9,158.0 L 421.3,160.0 L 424.6,162.6 L 427.5,165.9 L 430.2,169.7 L 432.5,174.0 L 434.4,178.8 L 438.8,185.3 L 441.8,191.3 L 443.9,196.8 L 445.0,201.8 L 445.4,206.2 L 445.2,210.0 L 444.6,213.2 L 443.9,215.7 L 443.1,217.5 L 442.5,218.6 L 442.2,219.0 L 442.4,218.6 L 443.3,217.4 L 445.1,215.3 L 447.8,212.4 L 451.7,206.1 L 455.4,201.1 L 458.9,197.5 L 462.3,195.0 L 465.5,193.8 L 468.4,193.7 L 471.0,194.7 L 473.4,196.8 L 475.6,199.8 L 477.4,203.8 L 478.8,208.6 L 479.9,214.3 L 480.7,220.7 L 481.0,227.9 L 481.0,235.7 L 480.5,244.2 L 479.5,253.2 L 478.1,262.8 L 477.4,272.8 L 476.8,282.5 L 476.2,292.0 L 475.7,301.2 L 475.1,310.1 L 474.5,318.7 L 474.0,327.0 L 473.4,335.0 L 472.8,342.6 L 472.1,349.9 L 471.4,356.8 L 470.7,363.3 L 469.8,369.4 L 469.0,375.1 L 468.0,380.4 Z"
          fill="currentColor"
          className="text-ruah-400"
        />
        {/* Left eye */}
        <ellipse cx={237} cy={355.2} rx={24.4} ry={31.5} className="fill-warm-100" />
        {/* Right eye */}
        <ellipse cx={363} cy={355.2} rx={24.4} ry={31.5} className="fill-warm-100" />
      </svg>
    </motion.div>
  );
}
