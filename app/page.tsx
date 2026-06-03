import type { Metadata } from "next";
import { GeometricBackground } from "@/components/geometric-background";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WorksSection } from "@/components/works-section";
import { AboutSection } from "@/components/about-section";
// import { SkillsSection } from "@/components/skills-section"; // 非表示中

import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    absolute: "Portfolio | Creative Developer",
  },
  description:
    "Crafting digital experiences with precision and creativity. Explore my work in web development, design, and interactive experiences.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <GeometricBackground />
      <Header />
      <HeroSection />
      <WorksSection />
      <AboutSection />
      {/* 非表示中（削除はしていない）: 必要になったら下行のコメントを外す */}
      {/* <SkillsSection /> */}
      <ContactSection />
      <Footer />
    </main>
  );
}
