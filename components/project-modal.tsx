"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { BLUR_DATA_URL } from "@/lib/image";
import type { Project } from "@/lib/i18n";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const open = project !== null;

  useEffect(() => {
    if (!open) return;

    // 開いた時点のフォーカス要素を記憶し、閉じたら戻す。
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // 背面スクロールを固定。
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 初期フォーカスを閉じるボタンへ。
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // フォーカストラップ。
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = original;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  const text = project ? t.works.projectsText[project.id] : null;

  return (
    <AnimatePresence>
      {open && project && text && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-border"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={t.a11y.closeModal}
              className="absolute top-4 right-4 z-20 p-2 text-muted-foreground hover:text-foreground bg-background/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-[16/10] w-full bg-background">
              <Image
                src={project.screenshot}
                alt={text.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="tracking-wide">
                  {t.categories[project.category]}
                </span>
                <span className="font-mono">{project.year}</span>
              </div>
              <h2
                id="project-modal-title"
                className="text-2xl md:text-3xl font-light tracking-tight"
              >
                {text.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {text.description}
              </p>

              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-foreground text-background text-sm font-medium tracking-wide uppercase hover:bg-muted-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  {t.works.viewLiveSite}
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-2 mt-2 px-6 py-3 border border-border text-muted-foreground/60 text-sm font-medium tracking-wide uppercase cursor-not-allowed"
                  aria-disabled="true"
                >
                  {t.works.noLiveSite}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
