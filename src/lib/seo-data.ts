export const SOCIAL_PROFILES = {
	github: {
		url: "https://github.com/PolGubau",
		handle: "@PolGubau",
		platform: "GitHub",
	},
	linkedin: {
		url: "https://www.linkedin.com/in/polgubauamores/",
		handle: "polgubauamores",
		platform: "LinkedIn",
	},
	twitter: {
		url: "https://twitter.com/PolGubau",
		handle: "@PolGubau",
		platform: "Twitter",
	},
	npm: {
		url: "https://www.npmjs.com/~polgubau",
		handle: "~polgubau",
		platform: "NPM",
	},
	email: {
		url: "mailto:gubaupol@gmail.com",
		handle: "gubaupol@gmail.com",
		platform: "Email",
	},
};

export const SEO_KEYWORDS = {
	primary: [
		"Pol Gubau Amores",
		"Frontend Developer Barcelona",
		"UX Designer Barcelona",
		"React Developer",
		"TypeScript Expert",
	],
	technologies: [
		"React",
		"TypeScript",
		"Next.js",
		"Astro",
		"Tailwind CSS",
		"Node.js",
		"Design Systems",
	],
	skills: [
		"UI/UX Design",
		"Web Development",
		"Component Libraries",
		"Performance Optimization",
		"Accessibility",
		"Responsive Design",
	],
	location: ["Barcelona", "Spain", "Remote"],
};

export const FEATURED_PROJECTS = [
	{
		name: "Pol-ui",
		url: "https://polgubau.com/projects/polui",
		description: "Open-source React component library",
		keywords: ["React", "TypeScript", "Component Library", "Design System"],
	},
	{
		name: "Entre Líneas",
		url: "https://polgubau.com/projects/entre-lineas",
		description: "Poetry analysis platform",
		keywords: ["Next.js", "Literature", "Web App", "Reading Experience"],
	},
];

export const PROFESSIONAL_PROFILES = [
	"Frontend Developer",
	"UX Designer",
	"Open Source Contributor",
	"Technical Writer",
	"Design Systems Architect",
];

export const SITE_STRUCTURE = {
	mainSections: [
		{ name: "Home", path: "/", priority: 1.0 },
		{ name: "Projects", path: "/projects", priority: 0.9 },
		{ name: "Blog", path: "/blog", priority: 0.9 },
		{ name: "UI Components", path: "/ui", priority: 0.7 },
	],
	socialProof: {
		github: "180+ open source projects",
		npm: "Pol-ui library",
		linkedin: "Professional network",
	},
};
