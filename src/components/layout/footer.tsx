import { Logo } from "@/components/brand/logo";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "CLI", href: "/tools/ruah-cli" },
      { label: "Orchestrator", href: "/tools/ruah-orch" },
      { label: "Converter", href: "/tools/ruah-conv" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Getting Started", href: "/docs/getting-started" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/ruah-dev" },
      { label: "npm", href: "https://www.npmjs.com/org/ruah-dev" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-3">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo size="sm" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-warm-500">
              Open-source infrastructure for coordinating AI coding agents.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-warm-600">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-warm-400 hover:text-warm-200 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="divider mt-14" />

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-warm-600">
            &copy; {new Date().getFullYear()} ruah
          </p>
          <a
            href="https://levi23.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-warm-600 transition-colors duration-200 hover:text-warm-300"
          >
            Built by Levi
          </a>
          <p className="text-xs text-warm-600">MIT License</p>
        </div>
      </div>
    </footer>
  );
}
