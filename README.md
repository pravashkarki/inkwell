# inkwell

A minimal personal site where Markdown is the source of truth. Write, push, publish.

Every page is available as clean HTML for humans and as raw Markdown for AI crawlers. Append `.md` to any post URL to get the raw Markdown. No CMS, no database, nothing to manage beyond the writing itself.

## Use this template

1. Fork or clone this repo
2. Edit `token.json` for design (colors, typography, spacing)
3. Edit `src/config.ts` for site identity (name, URL, description)
4. Delete the example post in `src/content/posts/` and write your own
5. Connect to Vercel (or any static host) and deploy

## Docs

- [Writing a post](docs/WRITING.md) - how to create posts, frontmatter rules, examples
- [Theming](docs/THEMING.md) - color schemes, OKLCH guide, typography scale, spacing, Figma sync

## Design tokens

All design values live in `token.json`. This file syncs with Figma.

- `scheme` - active color scheme ("warm", "cool", "mono", "forest")
- `color` - OKLCH colors with light and dark variants
- `typography.scale` - sm, md, lg, xl sizes. Change once, updates everywhere
- `spacing` - body padding, max width, gaps, heading margins
- `radii` - border radius values

## Development

```
pnpm install
pnpm dev
```

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

## License

Public domain. [Unlicense](LICENSE). Do whatever you want with it.
