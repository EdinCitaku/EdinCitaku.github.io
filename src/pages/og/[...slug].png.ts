import fs from "node:fs/promises";
import path from "node:path";
import type { APIContext, GetStaticPaths } from "astro";
import satori from "satori";
import sharp from "sharp";
import { SITE } from "@/config";
import { formatDate, getPosts } from "@/utils/posts";

interface Props {
  title: string;
  description: string;
  footer: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return [
    {
      params: { slug: "default" },
      props: {
        title: SITE.title,
        description: SITE.description,
        footer: "edincitaku.com",
      },
    },
    ...posts.map((post) => ({
      params: { slug: post.slug },
      props: {
        title: post.data.title,
        description: post.data.description,
        footer: formatDate(post.data.pubDate),
      },
    })),
  ];
};

const INK = "#17140f";
const MUTED = "#6d665a";
const PAPER = "#f5f1e8";
const ACCENT = "#7b2d26";

const fontDir = path.resolve("node_modules/@fontsource/newsreader/files");
const loadFont = (file: string) => fs.readFile(path.join(fontDir, file));
const fonts = Promise.all([
  loadFont("newsreader-latin-400-normal.woff"),
  loadFont("newsreader-latin-400-italic.woff"),
  loadFont("newsreader-latin-500-normal.woff"),
]);

const el = (style: Record<string, unknown>, children?: unknown) => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});

export async function GET({ props }: APIContext<Props>) {
  const { title, description, footer } = props;
  const [regular, italic, medium] = await fonts;

  const template = el(
    {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "64px 72px",
      backgroundColor: PAPER,
      color: INK,
      fontFamily: "Newsreader",
    },
    [
      el(
        {
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "22px",
          borderBottom: `2px solid ${INK}`,
          fontSize: "30px",
          fontWeight: 500,
        },
        [
          el({}, SITE.title),
          el({ fontSize: "24px", fontStyle: "italic", color: ACCENT }, "Essay"),
        ],
      ),
      el({ flexDirection: "column" }, [
        el(
          {
            fontSize: title.length > 48 ? "68px" : "82px",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
          },
          title,
        ),
        el(
          {
            marginTop: "26px",
            fontSize: "30px",
            lineHeight: 1.35,
            fontStyle: "italic",
            color: MUTED,
            display: "block",
            lineClamp: 2,
          },
          description,
        ),
      ]),
      el({ fontSize: "24px", color: MUTED }, footer),
    ],
  );

  const svg = await satori(template as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Newsreader", data: regular, weight: 400, style: "normal" },
      { name: "Newsreader", data: italic, weight: 400, style: "italic" },
      { name: "Newsreader", data: medium, weight: 500, style: "normal" },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
