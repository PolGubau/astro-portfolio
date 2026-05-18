import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../../utils/og";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.filter((post) => !post.data.draft).map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      summary: post.data.summary,
      category: post.data.tags?.[0],
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage({
    title: props.title,
    summary: props.summary,
    category: props.category,
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
