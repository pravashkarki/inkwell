# Roadmap

What's planned for inkwell. Focused on making it simpler for writers to set up, customize, and publish.

## Planned

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

## Done

### Setup tooling
- `pnpm ik:setup` - interactive first-run wizard (site name, theme, font, git remote, demo cleanup, first post, deploy)
- `pnpm ik:theme` - switch color scheme with optional build and deploy
- `pnpm ik:deploy` - deploy to Vercel, Cloudflare Pages, or Netlify
- `pnpm ik:migrate` - move deployment between platforms
- `pnpm ik:analytics` - Google Analytics with Partytown (web worker, production-only)

### Pages
- About page / custom pages support (non-post markdown pages)

## Not planned

- Custom CMS or admin panel
- Database or backend
- User accounts
- Social automation
- AI writing tools
- Complex CI/CD pipeline

The template stays simple. Writers don't need infrastructure.
