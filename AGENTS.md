# PassiveInfluencer.AI Website

## Purpose

Public website repository for PassiveInfluencer.AI. Current state: Astro placeholder matching the approved PassiveInfluencers print poster, deployed to GitHub Pages.

## Canonical context

Before planning or implementation, read the parent workspace:

1. `../../AGENTS.md`
2. `../../docs/README.md`
3. `../../docs/context/three-ws.md`
4. `../../docs/indicators-strategy/strategy.md`
5. `../../docs/brand/voice.md`
6. `../../docs/brand/visual-direction-brief.md`

## Current stack

- Framework: Astro
- Styling: Tailwind CSS v4
- Hosting: GitHub Pages
- Deploy: `.github/workflows/deploy.yml`
- Package manager: npm

## Constraints

- Keep this repository public-safe.
- Do not invent positioning, testimonials, creator results, integrations, or product availability beyond the approved poster copy.
- Never include creator credentials, inbox content, negotiations, financial data, unreleased content, or connected-account tokens.
- Use Canadian spelling and no em dashes.
- Dev servers must bind to `0.0.0.0`.

## Verification

```bash
npm run build
```

Spot-check the built `dist/` output and confirm GitHub Actions Pages deployment after enabling the Pages source.
