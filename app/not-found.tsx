"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GeometricBackground } from "@/components/geometric-background";
import { useLanguage } from "@/components/language-provider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6">
      <GeometricBackground />
      <div className="relative z-10 text-center max-w-md">
        <p className="text-7xl md:text-8xl font-light font-mono tracking-tight mb-6">
          404
        </p>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
          {t.notFound.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          {t.notFound.description}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm tracking-wide uppercase hover:bg-secondary transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {t.notFound.backToHome}
        </Link>
      </div>
    </main>
  );
}
