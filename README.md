# inkwell

A blog template for writers. Markdown in, website out. No CMS, no database. Write, push, it's live.

Every post is served as clean HTML for readers and raw Markdown for AI crawlers. Append `.md` to any post URL to get the source.

**Deploy your own:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpravashkarki%2Finkwell)

**Note:** Demo posts are AI-generated for layout demonstration only.

## Quick start

```
pnpm install
pnpm ik:setup
```

The setup wizard walks you through site name, color scheme, font, and deployment. Or skip it and edit files directly:

```
pnpm dev
```

## CLI tools

```
pnpm ik:new          # Create a new post (interactive or with args)
pnpm ik:setup        # First-run wizard (config, theme, deploy, demo cleanup)
pnpm ik:theme        # Switch color scheme
pnpm ik:deploy       # Deploy to Vercel, Cloudflare Pages, or Netlify
pnpm ik:migrate      # Move deployment to a different platform
pnpm ik:analytics    # Set up Google Analytics (runs via web worker)
```

### Create a post

```
pnpm ik:new
```

Prompts for title, description, and tags. For posts with images:

```
pnpm ik:new -- --folder
```

### Switch theme

```
pnpm ik:theme cool
```

Four built-in OKLCH schemes: `warm`, `cool`, `mono`, `forest`. Run without args for interactive selection.

### Deploy

```
pnpm ik:deploy
```

First run asks which platform. After that, it redeploys to the same platform. Use `pnpm ik:migrate` to switch platforms.

### Analytics

```
pnpm ik:analytics
```

Adds Google Analytics with Partytown, which runs the tracking script in a web worker instead of the main thread. Production builds only. Remove with `pnpm ik:analytics --remove`.

## Configure

Two files to edit (or use `pnpm ik:setup`):

- **`token.json`** - design tokens (colors, typography, spacing). Syncs with Figma.
- **`src/config.ts`** - site name, URL, description, and nav links.

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

Or use the deploy tool:

```
pnpm ik:deploy
```

For git-push deploys, include `[build]` in the commit message:

```
git commit -m "[build] Add new post"
git push
```

Commits without `[build]` are ignored by the deploy platform.

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
