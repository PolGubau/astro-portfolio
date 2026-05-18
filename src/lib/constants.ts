import path from "node:path";

export const paths = {
	projects: path.join(process.cwd(), "src", "content", "projects"),
	blogs: path.join(process.cwd(), "src", "content", "blog"),
};
export const metadata = {
	title: "Pol Gubau Amores — Frontend Developer & Designer",
	description:
		"Senior Frontend Engineer based in Barcelona. Creator of Pol UI (62k+ npm downloads). I build fast, accessible web and mobile products — React, TypeScript, Expo.",
	name: "Pol Gubau",
	longName: "Pol Gubau Amores",
	slogan: "Senior Frontend Engineer & Designer",
	picture: "/assets/blog/authors/pol.jpg",
	tags: [
		// Personal Branding
		"Pol Gubau Amores",
		"Pol Gubau",
		"polgubau.com",
		"polgubau",
		"gubau",
		"gubaupol",
		"Pol",
		"Gubau",
		"Amores",
		"Frontend Developer Barcelona",
		"UX Designer Barcelona",
		
		// Core Skills
		"Frontend Developer",
		"Frontend",
		"Developer",
		"UX Designer",
		"UI Designer",
		"Web Developer",
		"React Developer",
		"Best React Developer",
		
		// Technologies & Frameworks
		"React",
		"TypeScript",
		"Next.js developer",
		"TailwindCSS",
		"Astro",
		"Design Systems",
		"Component Libraries",
		
		// Expertise Areas
		"UI/UX Design",
		"Web Accessibility",
		"Performance Optimization",
		"Responsive Design",
		"Open Source",
		
		// Location & Languages
		"Barcelona",
		"Spain",
		"Germany",
		"Catalan Developer",
		"English",
		"Spanish",
		
		// Companies & Projects
		"Mesalvo",
		"Pol-ui",
	],

	links: {
		website: "https://polgubau.com",
		twitter: "https://x.com/PolGubau",
		github: "https://github.com/polgubau",
		linkedin: "https://www.linkedin.com/in/polgubauamores/",
		email: "mailto:gubaupol@gmail.com",
		npm: "https://www.npmjs.com/~polgubau",
	},

	/** Last updated: 2026-05-14 */
	npmDownloads: "62.6k",
	vercelViews: "1M+",

	homeOgImage: "assets/thumbnail.webp",
};
