"use client";

import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 py-32 overflow-hidden">
      {/* Minimal geometric accents */}
      <div className="absolute top-24 left-12 w-px h-32 bg-border animate-fade-in delay-500 opacity-0" style={{ animationFillMode: "forwards" }} />
      <div className="absolute top-24 left-12 w-16 h-px bg-border animate-fade-in delay-600 opacity-0" style={{ animationFillMode: "forwards" }} />
      <div className="absolute bottom-24 right-12 w-px h-32 bg-border animate-fade-in delay-500 opacity-0 hidden md:block" style={{ animationFillMode: "forwards" }} />
      <div className="absolute bottom-24 right-12 w-16 h-px bg-border animate-fade-in delay-600 opacity-0 hidden md:block" style={{ animationFillMode: "forwards" }} />
      
      {/* Floating geometric shape */}
      <div className="absolute top-1/4 right-1/4 w-24 h-24 border border-border/40 rotate-45 animate-float-gentle opacity-30 hidden lg:block" />
      
      <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Small label */}
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
          Since 1923
        </p>
        
        {/* Main catchphrase */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
          美は、時間を超える。
        </h1>
        
        {/* Decorative line */}
        <div className="w-24 h-px bg-accent mx-auto mb-12 animate-draw-line" style={{ animationDelay: "600ms" }} />
        
        {/* Subtitle */}
        <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-16 animate-fade-in-up opacity-0" style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
          千年の時を超えて受け継がれる、<br className="hidden md:block" />
          日本の美と文化の深淵へ。
        </p>
        
        {/* CTA */}
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "900ms", animationFillMode: "forwards" }}>
          <a
            href="#exhibitions"
            className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-foreground hover:text-accent transition-colors duration-300 group"
          >
            <span>展示を見る</span>
            <span className="w-8 h-px bg-foreground group-hover:w-12 group-hover:bg-accent transition-all duration-300" />
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}>
        <span className="vertical-text text-xs tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <div className="w-full h-4 bg-accent/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
