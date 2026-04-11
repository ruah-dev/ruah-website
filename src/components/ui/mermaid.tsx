"use client";

import { useEffect, useRef, useId } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#1a2e2b",
    primaryTextColor: "#f0eee9",
    primaryBorderColor: "#00bea8",
    lineColor: "#00bea8",
    secondaryColor: "#1a1f1e",
    tertiaryColor: "#151514",
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: "14px",
    background: "transparent",
    mainBkg: "#1a2e2b",
    nodeBorder: "#00bea8",
    clusterBkg: "#111110",
    clusterBorder: "#2a2a28",
    edgeLabelBackground: "#111110",
  },
});

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "-");

  useEffect(() => {
    if (!ref.current) return;

    const render = async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (e) {
        console.error("Mermaid render error:", e);
      }
    };

    render();
  }, [chart, id]);

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center [&_svg]:max-w-full"
    />
  );
}
