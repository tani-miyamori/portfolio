"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce solution with seamless user experience and fast performance.",
    year: "2024",
  },
  {
    id: 2,
    title: "Brand Identity System",
    category: "Design System",
    description: "Comprehensive design system for a fintech startup, including components and guidelines.",
    year: "2024",
  },
  {
    id: 3,
    title: "Interactive Dashboard",
    category: "Web Application",
    description: "Real-time analytics dashboard with data visualization and intuitive controls.",
    year: "2023",
  },
  {
    id: 4,
    title: "Mobile App UI",
    category: "UI/UX Design",
    description: "Clean and minimal mobile interface design for a productivity application.",
    year: "2023",
  },
];

export function WorksSection() {
  return (
    <section id="works" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            Selected Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">Works</h2>
        </motion.div>

        {/* Projects grid */}
        <div className="space-y-1">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <a
                href="#"
                className="flex flex-col md:flex-row md:items-center justify-between py-8 border-t border-border hover:bg-secondary/30 transition-all px-4 -mx-4"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 mb-4 md:mb-0">
                  <span className="text-muted-foreground text-sm font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-muted-foreground text-sm tracking-wide hidden lg:block">
                    {project.category}
                  </span>
                  <span className="text-muted-foreground text-sm font-mono">
                    {project.year}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-muted-foreground text-sm tracking-wide hover:text-foreground transition-colors group"
          >
            View All Projects
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
