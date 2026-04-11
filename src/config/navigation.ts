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
      { label: "Orchestrator", href: "/tools/ruah-orch" },
      { label: "Converter", href: "/tools/ruah-conv" },
    ],
  },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/ruah-dev", external: true },
];

export function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return "items" in item;
}
