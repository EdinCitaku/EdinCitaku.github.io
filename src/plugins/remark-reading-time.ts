import type { Root } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import type { Plugin } from "unified";

const WORDS_PER_MINUTE = 220;

export const remarkReadingTime: Plugin<[], Root> = () => {
  return (tree, file) => {
    const words = mdastToString(tree).split(/\s+/).filter(Boolean).length;
    const data = file.data as { astro: { frontmatter: Record<string, any> } };
    data.astro.frontmatter.readingTime = Math.max(
      1,
      Math.round(words / WORDS_PER_MINUTE),
    );
  };
};
