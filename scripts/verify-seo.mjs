import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const siteUrl = 'https://alejandro-coronado-solutions-architect.vercel.app'
const requiredAssetPaths = ['/sitemap.xml', '/robots.txt', '/og-image.jpg', '/profile-photo-800.jpg']
const requiredSameAs = [
  'https://www.linkedin.com/in/alejandro-obregon',
  'https://github.com/Alex99-bit',
  'https://www.youtube.com/@alexcoronado3219',
  'https://www.instagram.com/99alexco/',
]
const requiredRelMe = requiredSameAs.filter((url) => !url.includes('instagram.com'))

const errors = []
const warnings = []

function fail(message) {
  errors.push(message)
}

function warn(message) {
  warnings.push(message)
}

function readFile(relativePath) {
  const filePath = path.join(distDir, relativePath)
  if (!fs.existsSync(filePath)) {
    fail(`Missing file: ${relativePath}`)
    return ''
  }
  return fs.readFileSync(filePath, 'utf8')
}

function routeToFile(url) {
  const { pathname } = new URL(url)
  if (pathname === '/') return 'index.html'
  return path.join(pathname.replace(/^\/|\/$/g, ''), 'index.html')
}

function extractFirst(html, regex) {
  const match = html.match(regex)
  return match?.[1]?.trim() || ''
}

function extractMetaContent(html, attributeName, attributeValue) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => match[0])
  const target = tags.find((tag) => {
    const attrPattern = new RegExp(`${attributeName}=["']${attributeValue}["']`)
    return attrPattern.test(tag)
  })

  return target?.match(/content=["']([^"']+)["']/)?.[1]?.trim() || ''
}

function extractJsonLd(html, routeFile) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  if (!blocks.length) {
    fail(`${routeFile}: missing JSON-LD`)
    return
  }

  const parsedBlocks = []
  for (const block of blocks) {
    try {
      parsedBlocks.push(JSON.parse(block[1]))
    } catch (error) {
      fail(`${routeFile}: invalid JSON-LD (${error.message})`)
    }
  }

  const graphItems = parsedBlocks.flatMap((block) => block['@graph'] || [block])
  const person = graphItems.find((item) => item?.['@type'] === 'Person')

  if (!person) {
    fail(`${routeFile}: missing Person schema`)
    return
  }

  for (const url of requiredSameAs) {
    if (!person.sameAs?.includes(url)) {
      fail(`${routeFile}: Person schema missing sameAs ${url}`)
    }
  }

  if (!person.email || !person.jobTitle || !person.knowsAbout?.length) {
    fail(`${routeFile}: Person schema missing email, jobTitle, or knowsAbout`)
  }
}

for (const assetPath of requiredAssetPaths) {
  const filePath = path.join(distDir, assetPath)
  if (!fs.existsSync(filePath)) {
    fail(`Missing required asset: ${assetPath}`)
  }
}

const sitemap = readFile('sitemap.xml')
const robots = readFile('robots.txt')

if (!robots.includes(`${siteUrl}/sitemap.xml`)) {
  fail('robots.txt does not reference the canonical sitemap URL')
}

const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])

if (!sitemapUrls.length) {
  fail('sitemap.xml has no <loc> URLs')
}

const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index)
for (const url of new Set(duplicateUrls)) {
  fail(`Duplicate sitemap URL: ${url}`)
}

const recruiterSitemapHtml = readFile(path.join('recruiter-seo-sitemap', 'index.html'))

for (const url of sitemapUrls) {
  if (!url.startsWith(`${siteUrl}/`)) {
    fail(`Sitemap URL is outside canonical site: ${url}`)
  }

  if (!url.endsWith('/')) {
    fail(`Sitemap URL must use trailing slash: ${url}`)
  }

  const routeFile = routeToFile(url)
  const html = readFile(routeFile)
  if (!html) continue

  const canonical = extractFirst(html, /<link rel="canonical" href="([^"]+)" \/>/)
  const title = extractFirst(html, /<title>(.*?)<\/title>/)
  const description = extractMetaContent(html, 'name', 'description')
  const h1Count = (html.match(/<h1[\s>]/g) || []).length
  const ogImage = extractMetaContent(html, 'property', 'og:image')
  const twitterImage = extractMetaContent(html, 'name', 'twitter:image')
  const robotsMeta = extractMetaContent(html, 'name', 'robots')

  if (canonical !== url) {
    fail(`${routeFile}: canonical (${canonical || 'missing'}) does not match sitemap URL (${url})`)
  }

  if (!title || title.length > 70) {
    warn(`${routeFile}: title length is ${title.length}`)
  }

  if (!description || description.length < 90 || description.length > 170) {
    warn(`${routeFile}: description length is ${description.length}`)
  }

  if (h1Count !== 1) {
    fail(`${routeFile}: expected exactly one H1, found ${h1Count}`)
  }

  if (ogImage !== `${siteUrl}/og-image.jpg`) {
    fail(`${routeFile}: og:image should be ${siteUrl}/og-image.jpg`)
  }

  if (twitterImage && twitterImage !== `${siteUrl}/og-image.jpg`) {
    fail(`${routeFile}: twitter:image should be ${siteUrl}/og-image.jpg`)
  }

  if (!robotsMeta.includes('index') || !robotsMeta.includes('follow')) {
    fail(`${routeFile}: robots meta should include index and follow`)
  }

  for (const url of requiredRelMe) {
    if (!html.includes(`<link rel="me" href="${url}" />`)) {
      fail(`${routeFile}: missing rel=me link for ${url}`)
    }
  }

  extractJsonLd(html, routeFile)

  const { pathname } = new URL(url)
  if (pathname !== '/recruiter-seo-sitemap/' && !recruiterSitemapHtml.includes(`href="${pathname}"`)) {
    fail(`recruiter-seo-sitemap/index.html: missing visible link to ${pathname}`)
  }
}

if (warnings.length) {
  console.log('SEO warnings:')
  for (const message of warnings) console.log(`- ${message}`)
}

if (errors.length) {
  console.error('SEO verification failed:')
  for (const message of errors) console.error(`- ${message}`)
  process.exit(1)
}

console.log(`SEO verification passed for ${sitemapUrls.length} canonical URLs.`)
