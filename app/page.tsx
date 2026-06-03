import { GeometricBackground } from "@/components/geometric-background";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WorksSection } from "@/components/works-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <GeometricBackground />
      <Header />
      <HeroSection />
      <WorksSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
