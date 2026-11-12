import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { marked } from "marked";
import { SITE } from "@/config";
import { getPosts } from "@/utils/posts";

/** Make root-relative image and link paths absolute so they work in feed readers. */
function absolutize(html: string, site: URL): string {
  return html.replaceAll(/(src|href)="(\/[^"]*)"/g, (_match, attr, path) => {
    return `${attr}="${new URL(path, site)}"`;
  });
}

export async function GET(context: APIContext) {
  const site = context.site as URL;
  const posts = await getPosts();

  const items = await Promise.all(
    posts.map(async (post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      author: SITE.author,
      content: absolutize(await marked(post.body ?? ""), site),
    })),
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site,
    items,
    customData: `<language>${SITE.language}</language>`,
  });
}
