import path from "node:path";
import githubRepositoriesReport from "./github-stats/github-repos.json";
import npmDownloadsReport from "./npm-stats/npm-downloads.json";

const githubRepositories = String(githubRepositoriesReport.repositories);
const npmDownloads = String(npmDownloadsReport.totals.downloads);

export const paths = {
  projects: path.join(process.cwd(), "src", "content", "projects"),
  blogs: path.join(process.cwd(), "src", "content", "blog"),
};
export const metadata = {
  title: "Pol Gubau Amores - Frontend Developer & Designer",
  description:
    "Senior Frontend Engineer based in Barcelona. Founder of Doscientos. I build fast, accessible web and mobile products - React, TypeScript, Expo.",
  name: "Pol Gubau",
  longName: "Pol Gubau Amores",
  slogan: "Senior Frontend Engineer & Designer",
  picture: "/assets/blog/authors/pol.jpg",

  links: {
    website: "https://polgubau.com",
    twitter: "https://x.com/PolGubau",
    github: "https://github.com/polgubau",
    linkedin: "https://www.linkedin.com/in/polgubauamores/",
    email: "mailto:hola@polgubau.com",
    npm: "https://www.npmjs.com/~polgubau",
  },

  npmDownloads,
  githubRepositories,
  vercelViews: "1M+",

  homeOgImage: "assets/thumbnail.webp",
};
