import githubContributionsReport from "./github-stats/github-contributions.json";

export interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface GitHubContributions {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export const githubContributions: GitHubContributions | null =
  githubContributionsReport.source === "github" &&
    githubContributionsReport.weeks.length > 0
    ? {
      totalContributions: githubContributionsReport.totalContributions,
      weeks: githubContributionsReport.weeks,
    }
    : null;
