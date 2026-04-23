import { Hero } from "@/components/landing/hero";
import { ToolCards } from "@/components/landing/tool-cards";
import { HowItWorks } from "@/components/landing/how-it-works";
import { InstallCTA } from "@/components/landing/install-cta";

/**
 * Landing page — 4 sections, per marketing critique §07.
 * Cut: ProofStrip (no adoption yet), Capabilities (filler after demo),
 * ImpactMetrics (unverified stats), Testimonials (we have none).
 *
 * 1. Hero         — named tools, live workflow diagram, Phantom
 * 2. ToolCards    — the three products in the toolchain
 * 3. HowItWorks   — 3 steps + live terminal demo (merged per redesign)
 * 4. InstallCTA   — single-command install + quickstart link
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolCards />
      <HowItWorks />
      <InstallCTA />
    </>
  );
}
