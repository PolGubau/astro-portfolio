import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { generateOgImage } from "../../../utils/og";

export const getStaticPaths: GetStaticPaths = async () => {
	// Generate one OG image per project slug (English entries are canonical)
	const projects = (await getCollection("projects")).filter((e) =>
		e.id.startsWith("en/"),
	);
	return projects.map((project) => ({
		params: { slug: project.id.slice(3) }, // strip "en/"
		props: {
			title: project.data.title,
			summary: project.data.summary,
			accent: project.data.color,
			category: project.data.category,
		},
	}));
};

export const GET: APIRoute = async ({ props }) => {
	const png = await generateOgImage({
		title: props.title,
		summary: props.summary,
		accent: props.accent,
		category: props.category,
	});

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
