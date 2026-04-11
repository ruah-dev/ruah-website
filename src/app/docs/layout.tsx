import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { Logo } from "@/components/brand/logo";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: <Logo size="sm" href="" />,
        url: "/",
      }}
      sidebar={{
        defaultOpenLevel: 1,
      }}
      links={[
        {
          text: "Tools",
          url: "/tools/ruah-cli",
        },
        {
          text: "GitHub",
          url: "https://github.com/ruah-dev",
          external: true,
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
