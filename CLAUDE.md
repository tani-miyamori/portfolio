# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A static, no-build portfolio site for showcasing web production work (LP, HP, EC). Two pages share one CSS/JS pair:

- `index.html` — public view, renders work cards from `localStorage`
- `admin.html` — password-protected CRUD dashboard for managing works

No npm, no bundler. Serve with `npx serve .` (port 3000) or any static file server.

## Data model

All data lives in browser storage. Three keys:

| Key | Storage | Contents |
|-----|---------|----------|
| `portfolio_works_v1` | localStorage | JSON array of work objects |
| `portfolio_admin_hash` | localStorage | SHA-256 hash of admin password |
| `portfolio_admin_session` | sessionStorage | `"true"` when logged in |

Work object shape:
```js
{ id: Date.now(), url, title, comment, price, period, scope, ingenuity, addedAt }
```

## Architecture

**`js/main.js`** — reads works from localStorage, renders `.card` elements into `#portfolioGrid`, shows `#emptyState` when empty.

**`js/admin.js`** — three screens (`setupScreen` / `loginScreen` / `adminDashboard`) toggled by `showScreen()`. Auth uses `crypto.subtle` SHA-256. CRUD operations call `saveWorks()` then `renderWorks()`.

**Thumbnail generation** — card/admin-row images are fetched from `https://image.thum.io/get/width/{w}/crop/{h}/{url}`. Falls back to `assets/placeholder.svg` on error.

## CSS system

All values must come from `css/variables.css` — no hardcoded colors, spacing, or sizes anywhere in `style.css`. Key token groups:

- Colors: `--color-primary`, `--color-primary-dark`, `--color-accent`, `--color-surface`, `--color-text-muted`, etc.
- Spacing: `--sp-1` through `--sp-16` (0.25 rem increments)
- Font sizes: `--fs-xs` through `--fs-3xl`
- Radius: `--r-sm` / `--r-md` / `--r-lg` / `--r-xl` / `--r-full`
- Transitions: `--t-fast` (150ms) / `--t-base` (250ms)

Responsive: mobile-first with `min-width` breakpoints. Grid collapses 3→2→1 columns.

## XSS safety

Every piece of user-supplied content rendered into HTML **must** go through `esc()`. Both `main.js` and `admin.js` define their own copy. Do not bypass or forget it when adding new fields.

## Rules

- CSS variables only — no direct color/spacing values in `style.css`
- Images in `assets/images/`, always with `alt` attribute
- Responsive: mobile-first (`min-width` media queries), test at 375 px and 1280 px
- All user content through `esc()` before inserting into innerHTML
