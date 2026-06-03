import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExhibitionsSection } from "@/components/exhibitions-section";
import { CollectionSection } from "@/components/collection-section";
import { VisitSection } from "@/components/visit-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen texture-overlay">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExhibitionsSection />
      <CollectionSection />
      <VisitSection />
      <Footer />
    </main>
  );
}
