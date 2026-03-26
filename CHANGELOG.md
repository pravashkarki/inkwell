# Changelog

## v2.0.0 - 2026-03-26

### Added
- Tags support with optional `tags` array in frontmatter
- Tag listing page at `/tags/` and individual tag pages at `/tags/[tag]/`
- Draft support with `draft: true` in frontmatter (hidden in production, visible in dev)
- Pagination on homepage (10 posts per page)
- Previous/next post navigation at bottom of each post
- Reading time estimate on every post
- 404 page
- Configurable header navigation via `nav` array in `src/config.ts`
- Open Graph meta tags (og:title, og:description, og:url, og:site_name, og:type, og:image)
- Twitter card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
- Canonical URL on every page
- Optional `image` and `canonicalUrl` fields in frontmatter
- Sitemap via @astrojs/sitemap
- RSS feed at `/rss.xml` via @astrojs/rss with auto-discovery link
- `robots.txt` endpoint pointing to sitemap
- `llms.txt` endpoint for AI discoverability
- `posts.json` API endpoint with structured post metadata

### Changed
- Homepage uses Astro pagination (moved from `index.astro` to `[...page].astro`)
- Content schema expanded: tags, draft, image, canonicalUrl (all optional)
- Post date display now includes reading time inline

## v1.3.1 - 2026-03-16

### Added
- Updating guide (docs/UPDATING.md) for pulling template updates

## v1.3.0 - 2026-03-16

### Added
- Copy-to-clipboard button on code blocks (appears on hover)
- Hot-reload for token.json in dev server via watch-tokens integration

### Fixed
- Code font size now uses typography scale instead of relative em

## v1.2.0 - 2026-03-15

### Added
- Skip-to-content link for keyboard navigation
- Visible focus styles for interactive elements
- `aria-label` on nav landmark
- Footer with quote
- Deploy with Vercel button context line in README

### Changed
- License from Unlicense to MIT
- Line height from 1.3 to 1.5 (WCAG compliant)
- Removed emdash rule from code style guidelines

## v1.1.0 - 2026-03-15

### Added
- Serif/sans-serif font stack choice via `fontStack` in token.json
- Italic styling for blockquotes

### Changed
- Body text size back to lg scale
- Site name to "inkwell"

### Fixed
- THEMING.md body size example now matches default

## v1.0.0 - 2026-03-15

Initial release.

### Added
- Astro-based static site with markdown content collection
- Homepage with post list sorted by date
- .md URL pattern - append .md to any post URL for raw Markdown
- Auto-discovery `<link rel="alternate" type="text/markdown">` tag
- Design tokens in token.json (colors, typography, spacing, radii)
- OKLCH color system with four schemes (warm, cool, mono, forest)
- Typography scale (sm, md, lg, xl) configurable from token.json
- Light/dark mode based on system setting
- Conditional Vercel deploys via [build] in commit message
- Theming guide (docs/THEMING.md)
- Writing guide (docs/WRITING.md)
- MIT license
