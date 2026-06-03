"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { languages } from "@/lib/i18n";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (!isLangOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen]);

  // /works など別ルートからも辿れるよう絶対アンカー（/#...）にする。
  const navItems = [
    { label: t.nav.works, href: "/#works" },
    { label: t.nav.about, href: "/#about" },
    // スキルセクション非表示中のためナビからも除外（削除はしていない）
    // { label: t.nav.skills, href: "/#skills" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  const currentLabel =
    languages.find((l) => l.code === language)?.label ?? language;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-foreground font-mono text-sm tracking-widest hover:text-muted-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            T-base
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted-foreground text-sm tracking-wide hover:text-foreground transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen((open) => !open)}
                className="flex items-center gap-1.5 text-muted-foreground text-sm tracking-wide hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={t.a11y.changeLanguage}
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
              >
                <Globe size={16} />
                {currentLabel}
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform",
                    isLangOpen && "rotate-180"
                  )}
                />
              </button>

              <ul
                role="listbox"
                className={cn(
                  "absolute right-0 mt-2 min-w-[8rem] border border-border bg-background overflow-hidden transition-all origin-top",
                  isLangOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                )}
              >
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      role="option"
                      aria-selected={language === lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm tracking-wide transition-colors hover:bg-secondary",
                        language === lang.code
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {lang.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={isMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-96 mt-6" : "max-h-0"
          )}
        >
          <ul className="flex flex-col gap-4 border-t border-border pt-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-muted-foreground text-sm tracking-wide hover:text-foreground transition-colors block py-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile language switcher */}
          <div className="flex items-center gap-3 border-t border-border pt-6 mt-4">
            <Globe size={16} className="text-muted-foreground" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "text-sm tracking-wide transition-colors",
                  language === lang.code
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
