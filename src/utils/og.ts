import { Resvg } from "@resvg/resvg-js";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createElement as h } from "react";
import satori from "satori";

const CACHE_DIR = join(process.cwd(), ".cache", "og");
const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;
const IMAGE_WIDTH = 440;
const BACKGROUND = "#f6f7f9";

// Inter from @fontsource/inter (local WOFF files - static, non-variable, works with satori)
const base = join(process.cwd(), "node_modules/@fontsource/inter/files");
const fontRegular = readFileSync(join(base, "inter-latin-400-normal.woff"));
const fontBold = readFileSync(join(base, "inter-latin-700-normal.woff"));

export async function generateOgImage({
  title,
  summary,
  accent = "#ffff44",
  category,
  cover,
}: {
  title: string;
  summary: string;
  accent?: string;
  category?: string;
  /** `data:image/...;base64,...` URI - only PNG/JPEG/GIF are decodable by resvg. */
  cover?: string;
}) {
  const titleLimit = cover ? 40 : 52;
  const summaryLimit = cover ? 100 : 130;
  const t = title.length > titleLimit ? `${title.slice(0, titleLimit - 2)}…` : title;
  const s =
    summary.length > summaryLimit
      ? `${summary.slice(0, summaryLimit - 2)}…`
      : summary;

  const cacheKey = createHash("sha1")
    .update(JSON.stringify({ t, s, accent, category, cover }))
    .digest("hex");
  const cachePath = join(CACHE_DIR, `${cacheKey}.png`);

  if (existsSync(cachePath)) {
    return readFileSync(cachePath);
  }

  const textWidth = cover ? CARD_WIDTH - IMAGE_WIDTH : CARD_WIDTH;

  const textColumn = h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: `${textWidth}px`,
        height: "100%",
        padding: cover ? "64px 48px 64px 88px" : "64px 88px",
        position: "relative",
        zIndex: 2,
      },
    },
    // Top: site name
    h(
      "div",
      {
        style: {
          fontSize: "22px",
          color: "#9ca3af",
          letterSpacing: "0.04em",
        },
      },
      "polgubau.com",
    ),
    // Bottom: main content
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "18px" } },
      category
        ? h(
          "div",
          {
            style: {
              fontSize: "18px",
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            },
          },
          category,
        )
        : null,
      h(
        "div",
        {
          style: {
            fontSize: "68px",
            fontWeight: 700,
            color: "#0d0d0d",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
          },
        },
        t,
      ),
      h(
        "div",
        {
          style: { fontSize: "26px", color: "#6b7280", lineHeight: 1.4 },
        },
        s,
      ),
    ),
  );

  const imageColumn = cover
    ? h(
      "div",
      {
        style: {
          display: "flex",
          position: "relative",
          width: `${IMAGE_WIDTH}px`,
          height: "100%",
          overflow: "hidden",
        },
      },
      h("img", {
        src: cover,
        width: IMAGE_WIDTH,
        height: CARD_HEIGHT,
        style: {
          width: `${IMAGE_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
          objectFit: "cover",
        },
      }),
      // Fade the image's left edge into the background instead of a hard seam
      h("div", {
        style: {
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(to right, ${BACKGROUND} 0%, rgba(246,247,249,0) 14%)`,
        },
      }),
    )
    : null;

  const element = h(
    "div",
    {
      style: {
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        display: "flex",
        flexDirection: "row",
        backgroundColor: BACKGROUND,
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter",
      },
    },
    // Left accent bar
    h("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "10px",
        backgroundColor: accent,
      },
    }),
    textColumn,
    imageColumn,
  );

  const svg = await satori(element as any, {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts: [
      { name: "Inter", data: fontRegular!, weight: 400, style: "normal" },
      { name: "Inter", data: fontBold!, weight: 700, style: "normal" },
    ],
  });

  const png = new Resvg(svg).render().asPng();

  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cachePath, new Uint8Array(png));

  return png;
}
