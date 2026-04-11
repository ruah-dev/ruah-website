import { tools, executors, inputFormats, outputTargets } from "@/config/tools";
import { notFound } from "next/navigation";
import { ToolPageClient } from "./client";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.id === slug);
  if (!tool) return {};

  return {
    title: `${tool.name} — ruah`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} — ruah`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((t) => t.id === slug);
  if (!tool) notFound();

  return (
    <ToolPageClient
      tool={tool}
      executors={[...executors]}
      inputFormats={[...inputFormats]}
      outputTargets={[...outputTargets]}
    />
  );
}
