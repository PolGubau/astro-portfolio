import path from "node:path";

export const paths = {
	projects: path.join(process.cwd(), "src", "content", "projects"),
	blogs: path.join(process.cwd(), "src", "content", "blog"),
};
export const baseUrl = "https://polgubau.com";
export const metadata = {
	title: "Pol Gubau Amores - Frontend Developer & UX Designer | React, TypeScript, Design Systems",
	description:
		"Frontend Developer based in Barcelona. Founder of Pol-ui library. Building elegant, accessible web experiences. Explore my projects, articles, and open-source contributions.",
	name: "Pol",
	longName: "Pol Gubau Amores",
	slogan: "Frontend Developer and UX Designer",
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
		website: "https:/polgubau.com",
		twitter: "https://twitter.com/PolGubau",
		github: "http://github.com/polgubau",
		linkedin: "https://www.linkedin.com/in/polgubauamores/",
		email: "mailto:gubaupol@gmail.com",
		npm: "https://www.npmjs.com/~polgubau",
	},

	homeOgImage: "assets/thumbnail.webp",
};
