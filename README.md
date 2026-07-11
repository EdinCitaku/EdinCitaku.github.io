# edincitaku.com

Personal blog of Edin Citaku, built with [Astro](https://astro.build) and the [AstroPaper](https://github.com/satnaing/astro-paper) theme, deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev      # local dev server at localhost:4321
npm run build    # production build into ./dist
```

## Writing a post

Add a folder under `src/content/posts/<slug>/` with an `index.md` (images can live in the same folder):

```md
---
title: My post title
pubDatetime: 2026-07-10
description: One-line summary shown in the feed and used for SEO.
tags: ['career']
---

Post content...
```

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The custom domain is set via `public/CNAME`.
