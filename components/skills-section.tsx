"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Development",
    items: ["React / Next.js", "TypeScript", "Node.js", "Python"],
  },
  {
    category: "Design",
    items: ["Figma", "UI/UX Design", "Design Systems", "Prototyping"],
  },
  {
    category: "Tools",
    items: ["Git / GitHub", "Vercel", "Docker", "AWS"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Skills & Tools
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-sm tracking-[0.2em] uppercase text-muted-foreground border-b border-border pb-4">
                {skillGroup.category}
              </h3>
              <ul className="space-y-4">
                {skillGroup.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: groupIndex * 0.1 + itemIndex * 0.05,
                    }}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-2 h-px bg-muted-foreground group-hover:w-4 group-hover:bg-foreground transition-all" />
                    <span className="text-foreground text-lg font-light tracking-wide group-hover:text-muted-foreground transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
