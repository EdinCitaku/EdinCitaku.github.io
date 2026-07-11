# edincitaku.com

Personal blog of Edin Citaku, built with [Astro](https://astro.build) and the [Frosti](https://github.com/EveSunMaple/Frosti) theme, deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev      # local dev server at localhost:4321
npm run build    # production build into ./dist
npm run preview  # serve the production build locally
```

## Writing a post

Add `src/content/blog/<slug>.md`; put any images in `public/image/posts/<slug>/` and reference them with absolute paths:

```md
---
title: My post title
pubDate: 2026-07-10
description: One-line summary shown on the card and used for SEO.
image: /image/posts/my-post/cover.png # optional cover
tags: ['career']
---

Post content... ![screenshot](/image/posts/my-post/screenshot.png)
```

## Site configuration

Site title, menu, and social links live in `frosti.config.yaml`. The homepage and about page are `src/pages/index.astro` and `src/pages/about.astro`.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The custom domain is set via `public/CNAME`.
