import { defineCollection, z } from "astro:content";

const unique = (label: string) =>
  z
    .array(z.string())
    .refine((items: string[]) => new Set(items).size === items.length, {
      message: `${label} must be unique`,
    })
    .optional();

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updated: z.coerce.date().optional(),
      /** Artwork shown with the post; path relative to the markdown file. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverCredit: z.string().optional(),
      /** Legacy field from the previous theme; no longer displayed. */
      image: z.string().optional(),
      badge: z.string().optional(),
      draft: z.boolean().default(false),
      categories: unique("categories"),
      tags: unique("tags"),
    }),
});

export const collections = { blog };
