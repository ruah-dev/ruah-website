import { Hero } from "@/components/landing/hero";
import { ToolCards } from "@/components/landing/tool-cards";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Roadmap } from "@/components/landing/roadmap";
import { InstallCTA } from "@/components/landing/install-cta";

/**
 * Landing page — 5 sections.
 *
 * 1. Hero         — named tools, live workflow diagram, Phantom
 * 2. ToolCards    — the three shipping products
 * 3. HowItWorks   — 3 steps + live terminal demo
 * 4. Roadmap      — upcoming ecosystem products (in-dev + coming soon)
 * 5. InstallCTA   — single-command install + quickstart link
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolCards />
      <HowItWorks />
      <Roadmap />
      <InstallCTA />
    </>
  );
}
