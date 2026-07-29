import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { generateOgImage } from "../../../utils/og";

/**
 * Reads the built cover asset from `dist` and re-encodes it as a PNG data
 * URI. Satori embeds `<img src>` directly into the SVG, and resvg (which
 * rasterizes that SVG to PNG) only decodes PNG/JPEG/GIF - covers are
 * authored as `.webp`, so they must be converted first.
 */
async function coverToDataUri(src: string): Promise<string | undefined> {
  const filePath = join(process.cwd(), "dist", src);
  if (!existsSync(filePath)) return undefined;
  const png = await sharp(filePath).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate one OG image per project slug (English entries are canonical)
  const projects = (await getCollection("projects")).filter((e) =>
    e.id.startsWith("en/"),
  );

  return Promise.all(
    projects.map(async (project) => ({
      params: { slug: project.id.slice(3) }, // strip "en/"
      props: {
        title: project.data.title,
        summary: project.data.summary,
        accent: project.data.color,
        category: project.data.category,
        cover: await coverToDataUri(project.data.cover.src),
      },
    })),
  );
};

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage({
    title: props.title,
    summary: props.summary,
    accent: props.accent,
    category: props.category,
    cover: props.cover,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
