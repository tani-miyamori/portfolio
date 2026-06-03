"use client";

import { motion } from "framer-motion";

export function Footer() {
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
          <a
            href="#"
            className="text-foreground font-mono text-sm tracking-widest uppercase hover:text-muted-foreground transition-colors"
          >
            Portfolio
          </a>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm tracking-wide">
            &copy; {currentYear} All rights reserved.
          </p>

          {/* Back to top */}
          <a
            href="#"
            className="text-muted-foreground text-sm tracking-wide hover:text-foreground transition-colors"
          >
            Back to top &uarr;
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
