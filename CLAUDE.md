# CLAUDE.md

This file gives an AI assistant everything it needs to understand, maintain, and reproduce this project.

## What this is

A minimal personal site. Markdown files are the source of truth. Every page is served as clean HTML for humans and as raw Markdown for AI crawlers. No CMS, no database.

## Stack

- **Astro** -static site generator (markdown-first)
- **Vercel** -hosting, auto-deploys from GitHub
- **Plain CSS** -single stylesheet, no framework
- **pnpm** -package manager

## Project structure

```
src/
  config.ts            → site name, URL, description, color schemes (edit this to make it yours)
  content/
    posts/             → blog posts as .md files (the only thing you edit day-to-day)
  layouts/
    Base.astro         → shared HTML shell, theme picker, <link rel="alternate"> for .md URLs
  pages/
    index.astro        → homepage, lists all posts sorted by date
    posts/
      [...slug].astro  → renders individual post pages
  integrations/
    copy-markdown.ts   → build plugin that copies raw .md files to output
  styles/
    global.css         → all styles, typography-focused, system serif font, 640px max width
public/                → static assets (images, favicon)
astro.config.mjs       → Astro config, pulls site URL from config.ts
vercel.json            → conditional build: only deploys when commit has [build]
```

## Configuration

All personal details live in `src/config.ts`:
- `site.name` -displayed in the header
- `site.title` -used in the HTML `<title>` on the homepage
- `site.description` -meta description
- `site.url` -canonical site URL
- `colorSchemes` -named color schemes with light/dark variants
- `defaultScheme` -which scheme loads by default

## The .md URL pattern

Every post at `/posts/foo/` also has `/posts/foo.md` serving the raw Markdown source. This is for AI crawlers. Two pieces make it work:

1. `src/integrations/copy-markdown.ts` copies source `.md` files into the build output
2. `Base.astro` adds `<link rel="alternate" type="text/markdown" href="/posts/foo.md">` to the HTML head so crawlers can discover it

## Color schemes

Defined in `src/config.ts` as objects with `light` and `dark` color values. The theme picker in `Base.astro` lets users switch between them. Selection is saved to `localStorage`. Light/dark mode follows the system setting via `prefers-color-scheme`.

To add a new scheme: add an entry to `colorSchemes` with a `label`, `light`, and `dark` object containing: `text`, `textMuted`, `bg`, `link`, `border`, `codeBg`.

## Content collection

Defined in `src/content.config.ts`. Uses Astro's glob loader pointed at `src/content/posts/`. Schema requires three fields:

```yaml
---
title: string       # required
date: YYYY-MM-DD    # required, coerced to Date
description: string # required, used in meta tag, keep under 160 chars
---
```

## Writing a post

1. Create `src/content/posts/your-post-name.md` (lowercase, hyphenated)
2. Add the required frontmatter (title, date, description)
3. Write body in plain Markdown -do NOT add `# Title`, the layout handles it
4. Use `##` for section headings within the post
5. Images go in `public/`, reference as `/image.png`

## Commands

```
pnpm install    # install dependencies
pnpm dev        # local dev server
pnpm build      # production build to dist/
pnpm preview    # preview the production build
```

## Deploying

Vercel only builds when the commit message contains `[build]`.

```
git commit -m "[build] Add new post"    → triggers Vercel build
git commit -m "Fix typo"               → Vercel ignores it
```

This is controlled by `vercel.json`'s `ignoreCommand`.

## Commit conventions

- Include `[build]` in the message only when you want Vercel to deploy
- Keep messages short and direct

## Reproducing this project from scratch

1. Create an empty directory and run `pnpm init`
2. Install Astro: `pnpm add astro`
3. Create `src/config.ts` with site details and color schemes
4. Set up `src/content.config.ts` with a `posts` collection using glob loader and the schema (title, date, description)
5. Create `Base.astro` layout with theme picker and `<link rel="alternate" type="text/markdown">` support
6. Create `global.css` with CSS variables for colors, system serif font stack
7. Create `index.astro` that queries the posts collection and lists them by date
8. Create `[...slug].astro` that renders individual posts and passes `mdUrl` to the layout
9. Create `copy-markdown.ts` integration -on `astro:build:done`, copy `.md` files to output
10. Register the integration in `astro.config.mjs`
11. Add `vercel.json` with `ignoreCommand` that checks for `[build]` in the commit message
12. Push to GitHub, connect to Vercel -zero config, Vercel auto-detects Astro

## License

Unlicense -public domain. No restrictions.
