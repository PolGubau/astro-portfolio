import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql'
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
`

function parseArguments(args) {
  const options = { output: 'github-contributions.json' }
  for (let index = 0; index < args.length; index += 1) {
    const flag = args[index]
    const value = args[++index]
    if (!value || value.startsWith('--')) throw new Error(`Missing value for ${flag}`)
    if (flag === '--user') options.user = value
    else if (flag === '--output') options.output = value
    else throw new Error(`Unknown option: ${flag}`)
  }
  if (!options.user) throw new Error('Provide --user <github-user>.')
  return options
}

function isCalendar(value) {
  return (
    Number.isSafeInteger(value?.totalContributions) &&
    value.totalContributions >= 0 &&
    Array.isArray(value.weeks) &&
    value.weeks.every((week) =>
      Array.isArray(week?.contributionDays) &&
      week.contributionDays.every(
        (day) =>
          Number.isSafeInteger(day?.contributionCount) &&
          day.contributionCount >= 0 &&
          typeof day.date === 'string',
      ),
    )
  )
}

export async function getGitHubContributions(user, token, fetchImpl = fetch) {
  const response = await fetchImpl(GITHUB_GRAPHQL_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { username: user } }),
  })
  if (!response.ok) throw new Error(`GitHub API request failed (${response.status}).`)

  const result = await response.json()
  const calendar = result?.data?.user?.contributionsCollection?.contributionCalendar
  if (!isCalendar(calendar)) throw new Error('GitHub API returned invalid contribution data.')
  return calendar
}

async function readLastSuccessfulReport(output) {
  try {
    const report = JSON.parse(await readFile(resolve(output), 'utf8'))
    return report.source === 'github' && isCalendar(report) ? report : undefined
  } catch {
    return undefined
  }
}

async function writeReport(output, report) {
  const path = resolve(output)
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, `${JSON.stringify(report, null, 2)}\n`)
}

async function main() {
  const options = parseArguments(process.argv.slice(2))
  const previousReport = await readLastSuccessfulReport(options.output)
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    if (previousReport) {
      console.warn('GITHUB_TOKEN is not defined. Preserving the last successful contribution report.')
      return
    }
    await writeReport(options.output, {
      generatedAt: null,
      user: options.user,
      source: 'unavailable',
      totalContributions: 0,
      weeks: [],
    })
    console.warn('GITHUB_TOKEN is not defined. No contribution report is available.')
    return
  }

  try {
    const calendar = await getGitHubContributions(options.user, token)
    await writeReport(options.output, {
      generatedAt: new Date().toISOString(),
      user: options.user,
      source: 'github',
      ...calendar,
    })
    console.info(`GitHub contribution report written to ${options.output}.`)
  } catch (error) {
    if (previousReport) {
      console.warn(`${error.message} Preserving the last successful contribution report.`)
      return
    }
    await writeReport(options.output, {
      generatedAt: null,
      user: options.user,
      source: 'unavailable',
      totalContributions: 0,
      weeks: [],
    })
    console.warn(`${error.message} No contribution report is available.`)
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main()
}