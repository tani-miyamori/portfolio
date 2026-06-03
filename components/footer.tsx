"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-foreground font-mono text-sm tracking-widest hover:text-muted-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            T-base
          </Link>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm tracking-wide">
            &copy; {currentYear} {siteConfig.author}. {t.footer.rights}
          </p>

          {/* Back to top */}
          <Link
            href="/#top"
            className="text-muted-foreground text-sm tracking-wide hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t.footer.backToTop}
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}
