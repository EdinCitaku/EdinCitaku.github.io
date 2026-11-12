import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

import { remarkReadingTime } from "./src/plugins/remark-reading-time";

// https://astro.build/config
export default defineConfig({
  site: "https://edincitaku.com",
  output: "static",
  redirects: {
    // URLs from the original Jekyll-era site
    "/01-loading-html-file-react": "/blog/loading-html-files-in-react",
    "/02-internship-experience": "/blog/jetbrains-internship",
    "/03-notion": "/blog/notion-linked-databases",
    "/04-resume": "/blog/tech-resume-guide",
    "/05-blogs": "/blog/tech-blogs",
    "/07-big-tech-hiring": "/blog/big-tech-hiring",
    "/amazon-internship": "/blog/amazon-internship",
    "/posts": "/blog",
    // Pages that existed in the previous theme
    "/blog/2": "/blog",
    "/blog/archives": "/blog",
    "/blog/categories": "/blog",
    "/blog/tags": "/blog",
    "/blog/search": "/blog",
  },
  integrations: [
    expressiveCode({
      themes: ["min-light", "vesper"],
      themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
      useDarkModeMediaQuery: false,
      styleOverrides: {
        borderRadius: "0",
        borderColor: "var(--rule)",
        codeFontFamily:
          "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace",
        codeFontSize: "0.82rem",
        codeLineHeight: "1.65",
        codeBackground: "var(--surface)",
        frames: {
          frameBoxShadowCssValue: "none",
          editorBackground: "var(--surface)",
          terminalBackground: "var(--surface)",
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
  },
});
