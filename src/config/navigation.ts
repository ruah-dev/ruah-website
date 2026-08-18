export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navItems: (NavItem | NavGroup)[] = [
  {
    label: "Tools",
    items: [
      { label: "CLI", href: "/tools/ruah-cli" },
      { label: "Guard", href: "/tools/ruah-guard" },
      { label: "Verify", href: "/tools/ruah-verify" },
      { label: "Optimizer", href: "/tools/ruah-opt" },
      { label: "Watch", href: "/tools/ruah-watch" },
      { label: "Eval", href: "/tools/ruah-eval" },
      { label: "Converter", href: "/tools/ruah-conv" },
      { label: "Orchestrator", href: "/tools/ruah-orch" },
    ],
  },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/ruah-dev", external: true },
];

export function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return "items" in item;
}
