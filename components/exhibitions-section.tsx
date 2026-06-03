"use client";

import { useEffect, useRef, useState } from "react";

const exhibitions = [
  {
    id: 1,
    title: "時の記憶",
    subtitle: "Memory of Time",
    period: "2024.04.01 — 2024.07.31",
    description: "時代を超えて語り継がれる、日本美術の系譜を辿る。",
  },
  {
    id: 2,
    title: "静寂の美学",
    subtitle: "Aesthetics of Silence",
    period: "2024.08.15 — 2024.11.30",
    description: "「間」と「余白」が紡ぐ、日本独自の美意識。",
  },
  {
    id: 3,
    title: "永遠の一瞬",
    subtitle: "Eternal Moment",
    period: "2024.12.01 — 2025.03.31",
    description: "刹那に宿る永遠。瞬間を捉えた名品の数々。",
  },
];

export function ExhibitionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="exhibitions"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-card"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`mb-20 md:mb-32 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">
            Exhibitions
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-balance">
            時を紡ぐ、<br className="md:hidden" />展示のかたち
          </h2>
        </div>

        {/* Exhibitions list */}
        <div className="space-y-0">
          {exhibitions.map((exhibition, index) => (
            <div
              key={exhibition.id}
              className={`group border-t border-border py-12 md:py-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="text-muted-foreground text-sm tracking-wider">
                    {String(exhibition.id).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-light mb-2 group-hover:text-accent transition-colors duration-300">
                    {exhibition.title}
                  </h3>
                  <p className="text-muted-foreground text-sm tracking-wider">
                    {exhibition.subtitle}
                  </p>
                </div>

                {/* Period */}
                <div className="md:col-span-3">
                  <p className="text-muted-foreground text-sm tracking-wider">
                    {exhibition.period}
                  </p>
                </div>

                {/* Description & Link */}
                <div className="md:col-span-3">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {exhibition.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm tracking-wider hover:text-accent transition-colors duration-300 group/link"
                  >
                    <span>詳細</span>
                    <span className="w-4 h-px bg-foreground group-hover/link:w-8 group-hover/link:bg-accent transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <a
            href="#"
            className="inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300 group"
          >
            <span>すべての展示を見る</span>
            <span className="w-8 h-px bg-foreground group-hover:w-12 group-hover:bg-accent transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
