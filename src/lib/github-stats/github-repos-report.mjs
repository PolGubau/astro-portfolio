import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const DEFAULT_REPOSITORIES = 55

function parseArguments(args) {
  const options = { fallback: DEFAULT_REPOSITORIES, output: 'github-repos.json' }
  for (let index = 0; index < args.length; index += 1) {
    const flag = args[index]
    const value = args[++index]
    if (!value || value.startsWith('--')) throw new Error(`Missing value for ${flag}`)
    if (flag === '--user') options.user = value
    else if (flag === '--fallback') options.fallback = Number(value)
    else if (flag === '--output') options.output = value
    else throw new Error(`Unknown option: ${flag}`)
  }
  if (!options.user) throw new Error('Provide --user <github-user>.')
  if (!Number.isSafeInteger(options.fallback) || options.fallback < 0) {
    throw new Error('--fallback must be a non-negative integer.')
  }
  return options
}

export async function getPublicRepositoryCount(user, fetchImpl = fetch) {
  const response = await fetchImpl(`https://api.github.com/users/${encodeURIComponent(user)}`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!response.ok) throw new Error(`GitHub API request failed (${response.status}).`)

  const profile = await response.json()
  if (!Number.isSafeInteger(profile.public_repos) || profile.public_repos < 0) {
    throw new Error('GitHub API returned an invalid public repository count.')
  }
  return profile.public_repos
}

async function main() {
  const options = parseArguments(process.argv.slice(2))
  let repositories = options.fallback
  let source = 'fallback'

  try {
    repositories = await getPublicRepositoryCount(options.user)
    source = 'github'
  } catch (error) {
    console.warn(`${error.message} Using fallback of ${options.fallback}.`)
  }

  const report = {
    generatedAt: new Date().toISOString(),
    user: options.user,
    repositories,
    source,
  }
  await writeFile(resolve(options.output), `${JSON.stringify(report, null, 2)}\n`)
  console.info(`GitHub repository report written to ${options.output}: ${repositories} (${source}).`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main()
}