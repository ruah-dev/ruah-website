import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import { Jura } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ruah — Parallel coding agents, no merge conflicts",
    template: "%s | ruah",
  },
  description:
    "Run Claude Code, OpenCode & Codex side by side. Each gets its own git worktree; OpenAPI specs become MCP tools. Open-source CLI, MIT.",
  metadataBase: new URL("https://ruah.sh"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ruah.sh",
    siteName: "ruah",
    title: "ruah — Parallel coding agents, no merge conflicts",
    description:
      "Run Claude Code, OpenCode & Codex side by side. Each gets its own git worktree; OpenAPI specs become MCP tools.",
    images: [{ url: "/brand/ruah-github-social.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ruah — Parallel coding agents, no merge conflicts",
    description:
      "Run Claude Code, OpenCode & Codex side by side. Each gets its own git worktree; OpenAPI specs become MCP tools.",
    images: ["/brand/ruah-twitter-banner.png"],
  },
  icons: {
    icon: "/brand/ruah-icon-nobg.svg",
    apple: "/brand/ruah-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${jura.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <RootProvider
          theme={{
            enabled: false,
            defaultTheme: "dark",
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
