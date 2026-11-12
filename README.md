# edincitaku.com

Personal blog of Edin Citaku, built with [Astro](https://astro.build) and a hand-written editorial design, deployed to GitHub Pages.

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

## Cover artwork

Each post can carry a piece of artwork, shown on the home page, in the archive and at the top of the post. Put the image in `src/assets/art/` and add to the post's frontmatter:

```md
cover: ../../assets/art/hodler-chosen-one.jpg
coverAlt: "Short description of the picture."
coverCredit: "Ferdinand Hodler, The Chosen One, 1903."
```

The current covers are public-domain paintings from [Wikimedia Commons](https://commons.wikimedia.org), chosen to match each post's subject (Hodler, Larsson, Klee, Delaunay, Boccioni, Turner). Lists crop the picture to 3:2; the post page shows it whole. Images are resized and converted to WebP at build time.

## Site configuration

- `src/config.ts` — site title, description, navigation and social links.
- `src/styles/global.css` — the whole design: colours (light and dark), type and layout. The palette is the block of CSS variables at the top.
- `src/layouts/Base.astro` — page shell (head, masthead, footer, analytics).
- `src/pages/` — home (`index.astro`), the archive (`blog/index.astro`), posts (`blog/[...slug].astro`), topics (`blog/tag/[tag].astro`) and `about.astro`.

Fonts (Newsreader and Inter) are self-hosted through Fontsource; Open Graph images are generated at build time in `src/pages/og/`.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The custom domain is set via `public/CNAME`.
