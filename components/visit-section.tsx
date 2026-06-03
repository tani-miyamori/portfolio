"use client";

import { useEffect, useRef, useState } from "react";

export function VisitSection() {
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
      id="visit"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-card"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">
            Visit
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-balance">
            ご来館のご案内
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Opening hours */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-light mb-6">開館時間</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  <span className="text-foreground">火曜日〜日曜日</span><br />
                  9:30 — 17:00（入館は16:30まで）
                </p>
                <p>
                  <span className="text-foreground">金曜日・土曜日</span><br />
                  9:30 — 20:00（入館は19:30まで）
                </p>
                <p className="pt-2">
                  休館日：月曜日、年末年始
                </p>
              </div>
            </div>
          </div>

          {/* Admission */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-light mb-6">観覧料</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  <span className="text-foreground">一般</span><br />
                  1,000円
                </p>
                <p>
                  <span className="text-foreground">大学生</span><br />
                  500円
                </p>
                <p>
                  <span className="text-foreground">高校生以下</span><br />
                  無料
                </p>
              </div>
            </div>
          </div>

          {/* Access */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-light mb-6">アクセス</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  〒110-0007<br />
                  東京都台東区上野公園13-9
                </p>
                <p>
                  JR上野駅 公園口より徒歩10分<br />
                  東京メトロ 上野駅より徒歩15分
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm tracking-wider mt-6 hover:text-accent transition-colors duration-300 group"
              >
                <span>地図を見る</span>
                <span className="w-4 h-px bg-foreground group-hover:w-6 group-hover:bg-accent transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
