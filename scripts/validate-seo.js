// Post-build SEO regression guard.
//
// Scans `dist/` for the kind of SEO defects that are easy to reintroduce
// silently (missing/duplicate H1, broken canonical/hreflang, invalid JSON-LD,
// 404s leaking into the sitemap or RSS feed). Run after `pnpm build`.
//
// Exits with code 1 (failing the build/CI) when a hard error is found.
// Non-fatal issues (title/description length, duplicate metadata) are
// reported as warnings and do not fail the build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(rootDir, "dist");

if (!fs.existsSync(distDir)) {
  console.error("✖ dist/ not found. Run `pnpm build` first.");
  process.exit(1);
}

const errors = [];
const warnings = [];

function walkHtmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkHtmlFiles(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function urlPathFor(file) {
  const rel = path.relative(distDir, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}`;
  return `/${rel.replace(/\.html$/, "")}`;
}

/** Whether a site-absolute pathname (no trailing slash) resolves to a dist file. */
function pathnameExists(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/") return fs.existsSync(path.join(distDir, "index.html"));
  const segments = clean.slice(1).split("/");
  // Routes can build to either "{segments}/index.html" (nested route) or
  // "{segments}.html" (flat route, e.g. the top-level 404 pages).
  return (
    fs.existsSync(path.join(distDir, ...segments, "index.html")) ||
    fs.existsSync(path.join(distDir, ...segments.slice(0, -1), `${segments.at(-1)}.html`))
  );
}

const htmlFiles = walkHtmlFiles(distDir);
const titleMap = new Map();
const descMap = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf-8");
  const urlPath = urlPathFor(file);
  const isErrorPage = /\/404$/.test(urlPath);

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) errors.push(`${urlPath}: expected 1 <h1>, found ${h1Count}`);

  const canonicalMatches = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/gi)];
  if (canonicalMatches.length !== 1) {
    errors.push(`${urlPath}: expected 1 canonical link, found ${canonicalMatches.length}`);
  } else if (!canonicalMatches[0][1].startsWith("https://polgubau.com")) {
    errors.push(`${urlPath}: canonical href is not absolute: ${canonicalMatches[0][1]}`);
  }

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  if (!title) errors.push(`${urlPath}: missing <title>`);
  else if (!isErrorPage) {
    if (title.length < 10 || title.length > 70) {
      warnings.push(`${urlPath}: title length ${title.length} outside 10-70 ("${title}")`);
    }
    if (!titleMap.has(title)) titleMap.set(title, []);
    titleMap.get(title).push(urlPath);
  }

  const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
  const description = descMatch ? descMatch[1].trim() : "";
  if (!description) errors.push(`${urlPath}: missing meta description`);
  else if (!isErrorPage) {
    if (description.length < 50 || description.length > 165) {
      warnings.push(`${urlPath}: description length ${description.length} outside 50-165`);
    }
    if (!descMap.has(description)) descMap.set(description, []);
    descMap.get(description).push(urlPath);
  }

  const ldMatches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (!isErrorPage && ldMatches.length === 0) {
    errors.push(`${urlPath}: no JSON-LD script found`);
  }
  for (const [, json] of ldMatches) {
    try {
      JSON.parse(json);
    } catch (err) {
      errors.push(`${urlPath}: invalid JSON-LD (${err.message})`);
    }
  }

  const hreflangMatches = [
    ...html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/gi),
  ];
  for (const [, hreflang, href] of hreflangMatches) {
    if (hreflang === "x-default") continue;
    try {
      if (!pathnameExists(new URL(href).pathname)) {
        errors.push(`${urlPath}: hreflang "${hreflang}" points to missing page ${href}`);
      }
    } catch {
      errors.push(`${urlPath}: hreflang "${hreflang}" has a malformed href "${href}"`);
    }
  }
}

for (const [title, paths] of titleMap) {
  if (paths.length > 1) warnings.push(`Duplicate <title> "${title}" on: ${paths.join(", ")}`);
}
for (const [description, paths] of descMap) {
  if (paths.length > 1) {
    warnings.push(`Duplicate meta description ("${description.slice(0, 40)}...") on: ${paths.join(", ")}`);
  }
}

const sitemapPath = path.join(distDir, "sitemap-0.xml");
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, "utf-8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    if (/\/404\/?$/.test(loc)) errors.push(`sitemap: contains a 404 URL ${loc}`);
    if (!pathnameExists(new URL(loc).pathname)) {
      errors.push(`sitemap: URL has no matching page ${loc}`);
    }
  }
} else {
  warnings.push("sitemap-0.xml not found");
}

const rssPath = path.join(distDir, "rss.xml");
if (fs.existsSync(rssPath)) {
  const xml = fs.readFileSync(rssPath, "utf-8");
  const links = [...xml.matchAll(/<link>([^<]+)<\/link>/g)]
    .map((m) => m[1])
    .filter((l) => l.startsWith("http"));
  for (const link of links) {
    if (!pathnameExists(new URL(link).pathname)) {
      errors.push(`rss: item link has no matching page ${link}`);
    }
  }
} else {
  warnings.push("rss.xml not found");
}

console.log(`Checked ${htmlFiles.length} page(s) in dist/.`);

if (warnings.length > 0) {
  console.log(`\n⚠ ${warnings.length} warning(s):`);
  for (const warning of warnings) console.log(`  - ${warning}`);
}

if (errors.length > 0) {
  console.log(`\n✖ ${errors.length} error(s):`);
  for (const error of errors) console.log(`  - ${error}`);
  process.exit(1);
}

console.log("\n✔ SEO validation passed.");
