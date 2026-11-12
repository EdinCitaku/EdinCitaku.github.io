import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export type Post = CollectionEntry<"blog">;

/** All posts, newest first. Drafts are hidden in production builds. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog");
  return posts
    .filter((post: Post) => !(import.meta.env.PROD && post.data.draft))
    .sort(
      (a: Post, b: Post) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
    );
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatMonth(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Issue-style number: the oldest post is No. 01. */
export function postNumber(posts: Post[], post: Post): string {
  const index = posts.findIndex((p) => p.slug === post.slug);
  return String(posts.length - index).padStart(2, "0");
}
