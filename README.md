# markdown-site

A minimal personal site where Markdown is the source of truth. Write, push, publish.

Every page is available as clean HTML for humans and as raw Markdown for AI crawlers — append `.md` to any post URL. No CMS, no database, nothing to manage beyond the writing itself.

## Use this template

1. Fork or clone this repo
2. Edit `src/config.ts` — set your name, site URL, and description
3. Delete the example post in `src/content/posts/` and write your own
4. Connect to Vercel (or any static host) and deploy

That's it. One config file, then just write Markdown.

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

## Color schemes

Users can pick a color scheme from the dropdown. Schemes are defined in `src/config.ts`. Light/dark mode follows the system setting automatically.

To add a scheme, add an entry to the `colorSchemes` object with `light` and `dark` color values.

## License

Public domain — [Unlicense](LICENSE). Do whatever you want with it.
