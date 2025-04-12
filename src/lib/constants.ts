import path from "node:path";

export const paths = {
	projects: path.join(process.cwd(), "src", "content", "projects"),
	blogs: path.join(process.cwd(), "src", "content", "blog"),
};
export const baseUrl = "https://polgubau.com";
export const metadata = {
	title: "Pol Gubau Amores",
	description:
		"👋🏼 Hello! I'm Pol Gubau Amores, a Frontend Developer and UX Designer based in Germany. I love to create beautiful and functional websites and apps.",
	name: "Pol",
	longName: "Pol Gubau Amores",
	slogan: "Frontend Developer and UX Designer",
	picture: "/assets/blog/authors/pol.jpg",
	tags: [
		"Pol Gubau Amores",
		"Pol Gubau",
		"Pol",
		"Gubau",
		"Amores",
		"Frontend Developer",
		"Frontend",
		"Developer",
		"UX Designer",
		"Barcelona",
		"Germany",
		"Spain",
		"Web Developer",
		"Mesalvo",
		"Best React Developer",
		"React",
		"React Developer",
		"UX Designer",
		"UI Designer",
		"Next.js developer",
		"TailwindCSS",
	],

	links: {
		website: "https:/polgubau.com",
		twitter: "https://twitter.com/PolGubau",
		github: "http://github.com/polgubau",
		linkedin: "https://www.linkedin.com/in/polgubauamores/",
		email: "mailto:gubaupol@gmail.com",
	},

	homeOgImage: "/assets/thumbnail.png",
};

export type WithBase<T> = T & { slug: string };

export type BlogMetadata = WithBase<{
	title: string;
	summary: string;
	startedAt: string;
	endedAt?: string;
	color: string;
	link?: string;
	githubLink?: string;
	npmCommand?: string;
	npmLink?: string;
	cover: string;
	category?: string;
	tech?: string;
}>;
