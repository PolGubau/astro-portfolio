import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { createElement as h } from "react";
import satori from "satori";

const CACHE_DIR = join(process.cwd(), ".cache", "og");

// Inter from @fontsource/inter (local WOFF files - static, non-variable, works with satori)
const base = join(process.cwd(), "node_modules/@fontsource/inter/files");
const fontRegular = readFileSync(join(base, "inter-latin-400-normal.woff"));
const fontBold = readFileSync(join(base, "inter-latin-700-normal.woff"));

export async function generateOgImage({
	title,
	summary,
	accent = "#ffff44",
	category,
}: {
	title: string;
	summary: string;
	accent?: string;
	category?: string;
}) {
	const t = title.length > 52 ? `${title.slice(0, 50)}…` : title;
	const s = summary.length > 130 ? `${summary.slice(0, 128)}…` : summary;

	const cacheKey = createHash("sha1")
		.update(JSON.stringify({ t, s, accent, category }))
		.digest("hex");
	const cachePath = join(CACHE_DIR, `${cacheKey}.png`);

	if (existsSync(cachePath)) {
		return readFileSync(cachePath);
	}

	const element = h(
		"div",
		{
			style: {
				width: "1200px",
				height: "630px",
				display: "flex",
				backgroundColor: "#f6f7f9",
				padding: "64px 88px",
				position: "relative",
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
		// Content
		h(
			"div",
			{
				style: {
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					width: "100%",
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
		),
	);

	const svg = await satori(element as any, {
		width: 1200,
		height: 630,
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
