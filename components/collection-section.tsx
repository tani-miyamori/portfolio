"use client";

import { useEffect, useRef, useState } from "react";

const collections = [
  {
    id: 1,
    category: "絵画",
    categoryEn: "Painting",
    count: "2,400+",
  },
  {
    id: 2,
    category: "彫刻",
    categoryEn: "Sculpture",
    count: "800+",
  },
  {
    id: 3,
    category: "工芸",
    categoryEn: "Crafts",
    count: "1,200+",
  },
  {
    id: 4,
    category: "書跡",
    categoryEn: "Calligraphy",
    count: "600+",
  },
];

export function CollectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
    >
      {/* Geometric accent */}
      <div className="absolute bottom-32 left-24 w-24 h-24 border border-border/30 rotate-45 hidden lg:block" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left column */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">
              Collection
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8 text-balance">
              五千点を超える、<br />
              日本美術の至宝
            </h2>
            <div className="w-16 h-px bg-accent mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-8">
              国宝・重要文化財を含む珠玉のコレクション。
              絵画、彫刻、工芸、書跡など、多岐にわたる日本美術の精華をご覧いただけます。
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase hover:text-accent transition-colors duration-300 group"
            >
              <span>コレクションを探す</span>
              <span className="w-6 h-px bg-foreground group-hover:w-10 group-hover:bg-accent transition-all duration-300" />
            </a>
          </div>

          {/* Right column - Stats grid */}
          <div className={`grid grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            {collections.map((item, index) => (
              <div
                key={item.id}
                className="group p-6 md:p-8 border border-border hover:border-accent/50 transition-colors duration-300"
                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
              >
                <p className="text-3xl md:text-4xl font-light mb-4 group-hover:text-accent transition-colors duration-300">
                  {item.count}
                </p>
                <p className="text-foreground text-sm mb-1">
                  {item.category}
                </p>
                <p className="text-muted-foreground text-xs tracking-wider">
                  {item.categoryEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
