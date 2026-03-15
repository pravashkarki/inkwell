# Changelog

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
- Unlicense (public domain)
