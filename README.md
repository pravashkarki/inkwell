# markdown-site

A minimal personal site where Markdown is the source of truth. Write, push, publish.

Every page is available as clean HTML for humans and as raw Markdown for AI crawlers. Append `.md` to any post URL to get the raw Markdown. No CMS, no database, nothing to manage beyond the writing itself.

## Use this template

1. Fork or clone this repo
2. Edit `token.json` for design (colors, typography, spacing)
3. Edit `src/config.ts` for site identity (name, URL, description)
4. Delete the example post in `src/content/posts/` and write your own
5. Connect to Vercel (or any static host) and deploy

## Writing a post

1. Create a `.md` file in `src/content/posts/` (lowercase, hyphenated filename)
2. Add frontmatter at the top:

```yaml
---
title: Your Post Title
date: 2026-03-15
description: A one-line summary of the post.
---
```

3. Write the body in plain Markdown below the frontmatter
4. Do not add `# Title` as the first line. The layout renders the title from frontmatter
5. Use `##` for section headings within the post
6. Images go in `public/` and are referenced as `/image.png`

All three frontmatter fields are required. `description` is used in the HTML meta tag. Keep it under 160 characters.

## Design tokens

All design values live in `token.json`. This file syncs with Figma.

- `scheme` - active color scheme ("warm", "cool", "mono", "forest")
- `color` - all schemes use OKLCH. Each has light and dark variants
- `typography` - font family, base size, line height
- `spacing` - body padding, max width, gaps, heading margins
- `radii` - border radius values

Colors use OKLCH for perceptual uniformity. Lightness flips between modes, chroma stays low for pastel tones, hue sets the mood.

## Development

```
pnpm install
pnpm dev
```

## Build

```
pnpm build
pnpm preview
```

## Deploy

Push with `[build]` in the commit message:

```
git commit -m "[build] Add new post"
git push
```

Commits without `[build]` are ignored by Vercel.

## Roadmap

- [x] Step-by-step color theme setup guide (see [THEMING.md](THEMING.md))
- [x] Typography scale (sm, md, lg, xl) defined in token.json

## License

Public domain. [Unlicense](LICENSE). Do whatever you want with it.
