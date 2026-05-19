# Paws & Play Network

A fun pet-sitter directory built from a Claude Design handoff. Two pages:

- `/` — landing page with searchable, filterable sitter grid
- `/sitter.html?id=<sitter-id>` — sitter profile with dashed placeholder for an embeddable booking widget

Built with Vite + React. Output is fully static and deploys to Cloudflare Pages or Cloudflare Workers (static assets).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to ./dist
npm run preview    # local preview of the production build
```

## Deploy to Cloudflare Pages

Direct upload via Wrangler:

```bash
npm run build
npm run deploy     # wrangler pages deploy dist
```

Or connect this repo in the Cloudflare Pages dashboard with:

- Build command: `npm run build`
- Build output directory: `dist`

## Deploy to Cloudflare Workers (static assets)

`wrangler.toml` is configured to serve `./dist` as Worker static assets.

```bash
npm run build
npm run deploy:worker
```
