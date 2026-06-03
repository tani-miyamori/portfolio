"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6"
        >
          {t.hero.label}
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none mb-8"
        >
          <span className="block">{t.hero.headingLine1}</span>
          <span className="block text-muted-foreground">
            {t.hero.headingLine2}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t.hero.description1}
          <br className="hidden md:block" />
          {t.hero.description2}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#works"
            className="group relative px-8 py-4 bg-foreground text-background font-medium tracking-wide text-sm uppercase overflow-hidden transition-all hover:bg-muted-foreground"
          >
            {t.hero.viewWorks}
          </a>
          <a
            href="#contact"
            className="group relative px-8 py-4 border border-border text-foreground font-medium tracking-wide text-sm uppercase hover:bg-secondary transition-all"
          >
            {t.hero.getInTouch}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <a
            href="#works"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs tracking-widest uppercase">
              {t.hero.scroll}
            </span>
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
