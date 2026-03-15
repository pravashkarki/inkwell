# pravashkarki.com

A personal site where Markdown is the source of truth. Write, push, publish.

Every page is available as clean HTML for humans and as raw Markdown for AI crawlers — append `.md` to any post URL. No CMS, no database, nothing to manage beyond the writing itself.

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
