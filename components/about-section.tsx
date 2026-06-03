"use client";

import { useEffect, useRef, useState } from "react";

export function AboutSection() {
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
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
    >
      {/* Geometric accent */}
      <div className="absolute top-32 right-24 w-32 h-32 border border-border/30 hidden lg:block" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text content */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">
              About
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8 text-balance">
              沈黙のなかに、
              <br />
              美は語る。
            </h2>
            <div className="w-16 h-px bg-accent mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              当館は1923年の創設以来、日本の美術と歴史を守り、未来へと伝える使命を担ってまいりました。
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              静寂のなかで作品と向き合う時間。それは、時代を超えた対話の始まりです。
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase hover:text-accent transition-colors duration-300 group"
            >
              <span>詳しく見る</span>
              <span className="w-6 h-px bg-foreground group-hover:w-10 group-hover:bg-accent transition-all duration-300" />
            </a>
          </div>

          {/* Visual element */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="aspect-[4/5] bg-card relative overflow-hidden">
              {/* Placeholder for image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-px h-24 bg-border mx-auto mb-6" />
                  <p className="vertical-text text-muted-foreground text-sm tracking-widest mx-auto">
                    百年の時を越えて
                  </p>
                  <div className="w-px h-24 bg-border mx-auto mt-6" />
                </div>
              </div>
              {/* Geometric overlay */}
              <div className="absolute top-8 left-8 w-16 h-16 border border-accent/40" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border border-accent/40 rotate-45" />
            </div>
            {/* Caption */}
            <p className="text-xs text-muted-foreground tracking-wider mt-4 text-right">
              Est. 1923
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
