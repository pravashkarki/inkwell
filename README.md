# pravashkarki.com

Personal site built with [Astro](https://astro.build). Markdown files in, static HTML out.

## How it works

- Write posts as `.md` files in `src/content/posts/`
- Push to GitHub — Vercel builds automatically when the commit message contains `[build]`
- Every post is available as HTML and as raw Markdown (append `.md` to any post URL)

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
