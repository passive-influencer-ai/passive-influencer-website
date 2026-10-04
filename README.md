# PassiveInfluencer.AI Website

Public placeholder website for PassiveInfluencers, implemented in Astro and styled from the approved print poster.

## Stack

- Astro
- Tailwind CSS v4
- Manrope (variable)
- GitHub Pages via GitHub Actions
- Custom domain: `https://passiveinfluencer.ai`

## Local development

```bash
npm install
npm run dev
```

The dev server binds to `0.0.0.0` so it is reachable on the Tailnet.

## Build

```bash
npm run build
npm run preview
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with `withastro/action` and deploys to GitHub Pages.

Canonical URL:

`https://passiveinfluencer.ai/`

`astro.config.mjs` sets:

- `site`: `https://passiveinfluencer.ai`
- `base`: `/`

`public/CNAME` contains `passiveinfluencer.ai` so Pages serves the site at the domain root (not under `/passive-influencer-website/`).

One-time repository setup:

1. Settings → Pages → Build and deployment → Source: **GitHub Actions**
2. Settings → Pages → Custom domain: `passiveinfluencer.ai`
3. Enable **Enforce HTTPS** so `github.io` and `http://` hop straight to `https://passiveinfluencer.ai` with no intermediate timer page

## Context

The parent CITAble workspace at `../..` remains the bounded source for organisation strategy and brand. Read `AGENTS.md` before expanding scope.

## Notes

- The primary call to action is "Join the waitlist", a `mailto:` link to `hello@passiveinfluencer.ai` with the subject "I want to join the waitlist" (hero and footer). The footer also shows the address for people without a mail app.
- `public/robots.txt` allows search, answer and training bots, and points to `public/sitemap.xml`. Add a sitemap entry for every new page.
- `public/og.png` (1200 x 630) is the link-preview image used by the Open Graph tags in `src/layouts/Layout.astro`, which also holds the Organization JSON-LD.
- No LinkedIn link until the company page exists.
- Do not invent product availability, creator results, testimonials, or private data in this repository.
