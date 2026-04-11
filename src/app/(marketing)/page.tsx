import { Hero } from "@/components/landing/hero";
import { ProofStrip } from "@/components/landing/proof-strip";
import { ToolCards } from "@/components/landing/tool-cards";
import { CalloutStrip } from "@/components/landing/callout-strip";
import { CodeExample } from "@/components/landing/code-example";
import { DemoShowcase } from "@/components/landing/demo-showcase";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { ExecutorMarquee } from "@/components/landing/executor-marquee";
import { HowItWorks } from "@/components/landing/how-it-works";
import { InstallCTA } from "@/components/landing/install-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ToolCards />
      <CalloutStrip />
      <CodeExample />
      <DemoShowcase />
      <FeatureGrid />
      <ExecutorMarquee />
      <HowItWorks />
      <InstallCTA />
    </>
  );
}
