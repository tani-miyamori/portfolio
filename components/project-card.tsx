"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { BLUR_DATA_URL } from "@/lib/image";
import type { Project } from "@/lib/i18n";

export function ProjectCard({
  project,
  index,
  onSelect,
  sizes,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
  /** next/image の sizes 属性（レイアウトに応じて指定）。 */
  sizes: string;
}) {
  const { t } = useLanguage();
  const text = t.works.projectsText[project.id];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={text?.title}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-card border border-border">
          <Image
            src={project.screenshot}
            alt={text?.title ?? project.id}
            fill
            sizes={sizes}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="text-lg md:text-xl font-light tracking-tight group-hover:text-muted-foreground transition-colors">
            {text?.title}
          </h3>
          <span className="text-muted-foreground text-sm font-mono shrink-0">
            {project.year}
          </span>
        </div>
        <p className="mt-1 text-muted-foreground text-sm tracking-wide">
          {t.categories[project.category]}
        </p>
      </button>
    </motion.article>
  );
}
