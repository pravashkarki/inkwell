# Roadmap

What's planned for inkwell. Focused on making it simpler for writers to set up, customize, and publish.

## Planned

### Setup tooling
- `pnpm ik:setup` - interactive first-run wizard (site name, theme, font)
- `pnpm ik:theme` - switch color scheme and font stack
- `pnpm ik:deploy` - generate config for Vercel, Cloudflare Pages, or Netlify
- `pnpm ik:analytics` - set up analytics (Cloudflare Web Analytics, Plausible, GA4)

### Pages
- About page / custom pages support (non-post markdown pages)

### Documentation
- Quickstart guide ("blog live in 10 minutes")
- Editor guide (Obsidian, iA Writer, Typora, github.dev workflows)
- Deploy guide (Vercel, Cloudflare Pages, Netlify, domain setup)

### Optional features (config-driven, off by default)
- Comments via Giscus (GitHub Discussions)
- Client-side search
- Newsletter subscribe form (Buttondown)
- Archive page (browse by year)
- Post series (multi-part posts with navigation)
- Table of contents (auto-generated from headings)
- JSON Feed

## Not planned

- Custom CMS or admin panel
- Database or backend
- User accounts
- Social automation
- AI writing tools
- Complex CI/CD pipeline

The template stays simple. Writers don't need infrastructure.
