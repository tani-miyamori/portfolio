"use client";

import { motion } from "framer-motion";

export function AboutSection() {
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
              About Me
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
              Building <br className="hidden md:block" />
              <span className="text-muted-foreground">with Purpose</span>
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
              <span className="text-foreground italic">Crafting interfaces.</span>{" "}
              Building polished software and web experiences. Experimenting with
              magical details in user interfaces.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I specialize in creating thoughtful digital experiences that combine
              clean aesthetics with functional design. My approach focuses on
              attention to detail, performance optimization, and user-centered
              solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With expertise spanning frontend development, UI/UX design, and
              creative coding, I bring ideas to life through carefully crafted
              code and design systems.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 pt-16 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "50+", label: "Projects Completed" },
              { value: "30+", label: "Happy Clients" },
              { value: "100%", label: "Dedication" },
            ].map((stat, index) => (
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
      </div>
    </section>
  );
}
