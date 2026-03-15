# CLAUDE.md

This file gives an AI assistant everything it needs to understand, maintain, and reproduce this project.

## What this is

A minimal personal site. Markdown files are the source of truth. Every page is served as clean HTML for humans and as raw Markdown for AI crawlers. No CMS, no database.

## Stack

- **Astro** - static site generator (markdown-first)
- **Vercel** - hosting, auto-deploys from GitHub
- **Plain CSS** - single stylesheet, no framework
- **pnpm** - package manager

## Project structure

```
token.json               → design tokens (colors, typography, spacing) - syncs with Figma
src/
  config.ts              → site identity (name, URL) + reads token.json
  content/
    posts/               → blog posts as .md files
  layouts/
    Base.astro           → shared HTML shell, injects tokens as CSS vars
  pages/
    index.astro          → homepage, lists all posts sorted by date
    posts/
      [...slug].astro    → renders individual post pages
  integrations/
    copy-markdown.ts     → build plugin that copies raw .md files to output
  styles/
    global.css           → layout and structure styles using CSS variables
public/                  → static assets (images, favicon)
astro.config.mjs         → Astro config, pulls site URL from config.ts
vercel.json              → conditional build: only deploys when commit has [build]
```

## Configuration

Two files to edit:

**`token.json`** - design tokens (shared with Figma):
- `typography` - fontFamily, fontSize, lineHeight, small, code
- `spacing` - body padding, maxWidth, gaps, heading margins
- `radii` - border radius for code and pre blocks
- `scheme` - which color scheme to use ("warm", "cool", "mono", "forest")
- `color` - named color schemes, each with light/dark variants

**`src/config.ts`** - site identity:
- `site.name` - displayed in the header
- `site.title` - HTML `<title>` on the homepage
- `site.description` - meta description
- `site.url` - canonical site URL

## How tokens flow

`token.json` → `config.ts` imports it → `Base.astro` injects all values as CSS custom properties on `:root` → `global.css` uses `var(--token-name)` everywhere. No hardcoded values in CSS.

Light/dark mode: colors swap automatically via `@media (prefers-color-scheme: dark)`. Typography and spacing stay the same in both modes.

## The .md URL pattern

Every post at `/posts/foo/` also has `/posts/foo.md` serving the raw Markdown source. This is for AI crawlers. Two pieces make it work:

1. `src/integrations/copy-markdown.ts` copies source `.md` files into the build output
2. `Base.astro` adds `<link rel="alternate" type="text/markdown" href="/posts/foo.md">` to the HTML head so crawlers can discover it

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
3. Write body in plain Markdown - do NOT add `# Title`, the layout handles it
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
3. Create `token.json` with typography, spacing, radii, scheme, and color definitions
4. Create `src/config.ts` with site identity, importing token.json
5. Set up `src/content.config.ts` with a `posts` collection using glob loader and the schema (title, date, description)
6. Create `Base.astro` layout that injects all tokens as CSS custom properties and adds `<link rel="alternate" type="text/markdown">` support
7. Create `global.css` using only CSS variables from tokens - no hardcoded values
8. Create `index.astro` that queries the posts collection and lists them by date
9. Create `[...slug].astro` that renders individual posts and passes `mdUrl` to the layout
10. Create `copy-markdown.ts` integration - on `astro:build:done`, copy `.md` files to output
11. Register the integration in `astro.config.mjs`
12. Add `vercel.json` with `ignoreCommand` that checks for `[build]` in the commit message
13. Push to GitHub, connect to Vercel - zero config, Vercel auto-detects Astro

## License

Unlicense - public domain. No restrictions.
