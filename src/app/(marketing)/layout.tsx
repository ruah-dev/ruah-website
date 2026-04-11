import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { MascotCompanion } from "@/components/brand/mascot-companion";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grain">
      <Nav />
      <MascotCompanion />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </div>
  );
}
