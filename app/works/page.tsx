import type { Metadata } from "next";
import { GeometricBackground } from "@/components/geometric-background";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WorksGallery } from "@/components/works-gallery";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A complete list of selected projects — web development, web applications, design systems, and UI/UX work.",
};

export default function WorksPage() {
  return (
    <main className="relative min-h-screen">
      <GeometricBackground />
      <Header />
      <WorksGallery />
      <Footer />
    </main>
  );
}
