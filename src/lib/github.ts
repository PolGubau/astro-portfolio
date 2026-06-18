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

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

export async function getGitHubContributions(
	username: string,
): Promise<GitHubContributions | null> {
	const token = import.meta.env.GITHUB_TOKEN;

	if (!token) {
		console.warn(
			"GITHUB_TOKEN is not defined. Generating mock data for visualization.",
		);
		return generateMockContributions();
	}

	try {
		const response = await fetch(GITHUB_GRAPHQL_API, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: QUERY,
				variables: { username },
			}),
		});

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.statusText}`);
		}

		const data = await response.json();
		return data.data.user.contributionsCollection.contributionCalendar;
	} catch (error) {
		console.error("Error fetching GitHub contributions:", error);
		return null;
	}
}

function generateMockContributions(): GitHubContributions {
	const weeks: ContributionWeek[] = [];
	const totalContributions = 420;
	const today = new Date();

	for (let i = 0; i < 52; i++) {
		const contributionDays: ContributionDay[] = [];
		for (let j = 0; j < 7; j++) {
			const date = new Date(today);
			date.setDate(today.getDate() - (52 - i) * 7 + j);
			const count = Math.floor(Math.random() * 12);
			contributionDays.push({
				contributionCount: count,
				date: date.toISOString().split("T")[0],
				color: "#ebedf0", // basic color, the component handles actual colors
			});
		}
		weeks.push({ contributionDays });
	}

	return {
		totalContributions,
		weeks,
	};
}
