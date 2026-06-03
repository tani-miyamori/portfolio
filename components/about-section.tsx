"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left column - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              {t.about.label}
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
              {t.about.headingLine1} <br className="hidden md:block" />
              <span className="text-muted-foreground">
                {t.about.headingLine2}
              </span>
            </h2>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              <span className="text-foreground italic">
                {t.about.leadEmphasis}
              </span>
              <br />
              {t.about.lead}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.about.paragraph2}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.about.paragraph3}
            </p>
          </motion.div>
        </div>

        {/* Stats — 一時的に非表示（削除はしない） */}
        {false && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 pt-16 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {t.about.stats.map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <p className="text-4xl md:text-5xl font-light tracking-tight mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        )}
      </div>
    </section>
  );
}
