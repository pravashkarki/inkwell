# inkwell

A blog template for writers. Markdown in, website out. No CMS, no database. Write, push, it's live.

Every post is served as clean HTML for readers and raw Markdown for AI crawlers. Append `.md` to any post URL to get the source.

**Deploy your own:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpravashkarki%2Finkwell)

**Note:** Demo posts are AI-generated for layout demonstration only.

## Quick start

```
pnpm install
pnpm dev
```

## Create a post

```
pnpm ik:new
```

Prompts for title, description, and tags. Generates the file with correct frontmatter.

For posts with images, use the folder structure:

```
pnpm ik:new -- --folder
```

This creates `posts/my-post/index.md` so you can drop images alongside your markdown.

## Configure

Two files to edit:

- **`token.json`** - design tokens (colors, typography, spacing). Syncs with Figma.
- **`src/config.ts`** - site name, URL, description, and nav links.

### Color schemes

Four built-in OKLCH schemes: `warm`, `cool`, `mono`, `forest`. Set `scheme` in token.json.

### Navigation

Add header links in `src/config.ts`:

```ts
export const nav = [
  { label: "About", href: "/about" },
  { label: "Twitter", href: "https://twitter.com/you", external: true },
];
```

## Features

### For writers
- **Tags** - optional `tags: [writing, thinking]` in frontmatter. Tag pages at `/tags/`
- **Drafts** - add `draft: true` to hide a post from production. Visible in dev.
- **Reading time** - estimated from word count, shown on every post
- **Prev/next navigation** - links to adjacent posts at the bottom of each post
- **Image colocation** - folder-per-post structure for posts with images
- **Pagination** - homepage paginates at 10 posts per page

### For sharing
- **Open Graph + Twitter cards** - every post renders properly when shared on social media
- **Auto OG images** - 1200x630 PNG generated for each post. No manual image creation.
- **Canonical URLs** - set on every page. Optional `canonicalUrl` field for cross-posting.
- **RSS feed** at `/rss.xml`

### For SEO
- **Sitemap** - auto-generated via @astrojs/sitemap
- **robots.txt** - points to sitemap
- **Semantic HTML** - clean, accessible markup

### For AI
- **Raw Markdown** - every post available at `/posts/slug.md`
- **llms.txt** - site manifest for AI crawlers at `/llms.txt`
- **posts.json** - structured API at `/posts.json`

### Design
- **OKLCH colors** - perceptually uniform, four schemes with light/dark mode
- **Design tokens** - all values in token.json, injected as CSS custom properties
- **Typography scale** - sm, md, lg, xl. Serif or sans font stack.
- **Hot reload** - token.json changes update instantly in dev

## Frontmatter

```yaml
---
title: Your Post Title          # required
date: 2026-03-15                # required
description: A short summary.   # required, under 160 chars
tags: [writing, thinking]       # optional
draft: true                     # optional, hides from production
image: /images/cover.jpg        # optional, used as OG image
canonicalUrl: https://...       # optional, for cross-posting
---
```

Only the first three fields are required. Everything else is opt-in.

## Build and deploy

```
pnpm build
pnpm preview
```

Push with `[build]` in the commit message to trigger Vercel:

```
git commit -m "[build] Add new post"
git push
```

Commits without `[build]` are ignored by Vercel.

## Docs

- [Writing a post](docs/WRITING.md) - creating posts, frontmatter, images, drafts
- [Theming](docs/THEMING.md) - color schemes, OKLCH, typography, spacing, Figma sync
- [Updating](docs/UPDATING.md) - pulling template updates without losing customizations

## Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features.

## Author

[Pravo](https://www.linkedin.com/in/pravasho/)

## License

[MIT](LICENSE)
