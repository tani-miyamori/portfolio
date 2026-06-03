"use client";

import { useState } from "react";

const navItems = [
  { label: "館について", href: "#about" },
  { label: "展示", href: "#exhibitions" },
  { label: "所蔵品", href: "#collection" },
  { label: "ご来館", href: "#visit" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-foreground flex items-center justify-center">
            <span className="text-xs font-light">歴</span>
          </div>
          <span className="text-sm tracking-[0.2em] hidden md:block">歴史館</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="メニューを開く"
        >
          <span className={`w-6 h-px bg-foreground transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-px bg-foreground transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-px bg-foreground transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Language */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <span className="text-foreground">JP</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">EN</span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-background border-t border-border overflow-hidden transition-all duration-500 ${isMenuOpen ? "max-h-96" : "max-h-0"}`}>
        <nav className="flex flex-col px-6 py-8 gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-4 text-sm pt-4 border-t border-border">
            <span className="text-foreground">JP</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">EN</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
