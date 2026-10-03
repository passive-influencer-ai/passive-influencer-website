# PassiveInfluencer.AI Website

Public placeholder website for PassiveInfluencers, implemented in Astro and styled from the approved print poster.

## Stack

- Astro
- Tailwind CSS v4
- Manrope (variable)
- GitHub Pages via GitHub Actions

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

Expected URL once Pages is enabled on the repository:

`https://passive-influencer-ai.github.io/passive-influencer-website/`

One-time repository setup:

1. Settings → Pages → Build and deployment → Source: **GitHub Actions**
2. Confirm the first workflow run succeeds

`astro.config.mjs` sets:

- `site`: `https://passive-influencer-ai.github.io`
- `base`: `/passive-influencer-website/`

## Context

The parent CITAble workspace at `../..` remains the bounded source for organisation strategy and brand. Read `AGENTS.md` before expanding scope.

## Notes

- LinkedIn button and QR currently point to `https://www.linkedin.com/` as a placeholder. Replace both when the company page is ready.
- Do not invent product availability, creator results, testimonials, or private data in this repository.
