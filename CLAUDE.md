# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A portfolio site built with Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS. Dark-only theme. Two routes (`/` and `/works`). No backend, no database — project data is hardcoded in `lib/i18n.ts`. Bilingual (ja default / en). The full design spec is in [spec.md](spec.md).

## Commands

```bash
pnpm dev       # start dev server with Turbopack (localhost:3000)
pnpm build     # production build
pnpm lint      # ESLint via next lint
```

## Architecture

`app/page.tsx` composes section components in order: `GeometricBackground → Header → HeroSection → WorksSection → AboutSection → SkillsSection → ContactSection → Footer`. `app/works/page.tsx` is the full project listing (uses [components/works-gallery.tsx](components/works-gallery.tsx)).

Metadata and dynamic asset routes live alongside pages: `app/icon.tsx` / `app/apple-icon.tsx` / `app/opengraph-image.tsx` are next/font-style image route handlers, and `app/not-found.tsx` is the 404 page.

All page sections live in [components/](components/) as named exports.

### Project data

Project meta (language-independent) is the `projects` array in [lib/i18n.ts](lib/i18n.ts): `id`, `category` (union type), `year`, `screenshot`, `url` (`string | null`), `featured`. Per-language title/description live in `translations[lang].works.projectsText` keyed by `id`. **To add a project: append one entry to `projects` and add the matching `id` text to both `ja` and `en`.** Screenshots go in `public/works/<id>.*` (16:10, WebP 1280px target; SVG placeholders ship today and `next.config.mjs` enables `dangerouslyAllowSVG`). `featuredProjects` (filtered by `featured`) drives the top WorksSection; `/works` shows all.

[components/project-card.tsx](components/project-card.tsx) (clickable card) + [components/project-modal.tsx](components/project-modal.tsx) (detail modal: focus trap, Esc/backdrop close, scroll lock, focus restore) are shared by WorksSection and the `/works` gallery.

### i18n

[lib/i18n.ts](lib/i18n.ts) holds all strings; [components/language-provider.tsx](components/language-provider.tsx) supplies `language` / `setLanguage` / `t` via context. Language is persisted in the `portfolio-language` cookie and read server-side in [app/layout.tsx](app/layout.tsx) so SSR renders the right language (no flicker). [components/providers.tsx](components/providers.tsx) wraps the tree with `MotionConfig reducedMotion="user"` + `LanguageProvider`.

### Owner-supplied / dummy values

Centralized in [lib/site-config.ts](lib/site-config.ts) (email, social URLs, Formspree endpoint via `NEXT_PUBLIC_FORMSPREE_ENDPOINT`; see [.env.example](.env.example)). See spec.md §7.3 for the pre-launch replacement checklist.

`lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class merging. `lib/image.ts` exports `BLUR_DATA_URL`, a shared 1×1 dark PNG used as `next/image` `placeholder="blur"` backing across all screenshots to suppress layout shift.

## CSS system

Design tokens are HSL CSS variables defined in [`app/globals.css`](app/globals.css) and consumed via Tailwind semantic aliases (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-secondary`, etc.) configured in [`tailwind.config.ts`](tailwind.config.ts).

Always use Tailwind utility classes. Never hardcode color or spacing values. Use `cn()` for conditional classes.

## Animations

Scroll-triggered animations use Framer Motion's `whileInView` with `viewport={{ once: true }}` throughout. New animated elements should follow the same `initial → whileInView` pattern with staggered `delay` for lists. `prefers-reduced-motion: reduce` is honored globally: CSS animations are neutralized in [app/globals.css](app/globals.css) and Framer Motion via `MotionConfig reducedMotion="user"`.

## Fonts

Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables.
