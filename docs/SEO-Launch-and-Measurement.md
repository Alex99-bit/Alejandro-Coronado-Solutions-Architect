# SEO Launch and Measurement Plan

## Objective

Improve organic visibility for Carlos Alejandro Coronado Obregon across recruiter and company searches related to software engineering, solutions architecture, AI engineering, CTO-facing technical leadership, and Spanish-language equivalents.

This file is the operating checklist after deployment. Rankings cannot be proven from the codebase alone; they require Google Search Console, indexing, crawl data, query impressions, and repeated measurement.

## Canonical URL Map

| Search Intent | Primary URL | Primary Queries |
| --- | --- | --- |
| Personal brand | `/` | Alejandro Coronado, Carlos Alejandro Coronado Obregon, Alex Coronado |
| English role cluster | `/software-engineer-solutions-architect/` | software engineer, senior software engineer, solutions architect, AI solutions engineer |
| AI role cluster | `/ai-specialist-solutions-engineer/` | AI specialist, AI solutions engineer, AI agents, LLM orchestration |
| CTO/leadership cluster | `/cto-technical-leadership/` | CTO technical leadership, CTO-facing engineer, technical leadership |
| Proof/impact cluster | `/technical-impact-case-studies/` | technical impact case studies, AI agents case study, enterprise backend systems |
| Spanish broad profile | `/es/` | Alejandro Coronado espanol, ingeniero de software Mexico |
| Spanish role cluster | `/arquitecto-de-soluciones-ingeniero-software/` | arquitecto de soluciones, ingeniero de software, especialista en IA |
| Hiring/commercial intent | `/hire-senior-software-engineer-ai-solutions-architect/` | hire senior software engineer, remote software engineer Mexico, hire AI solutions architect |
| Recruiter page index | `/recruiter-seo-sitemap/` | Alejandro Coronado sitemap, recruiter software engineer Mexico |

## Launch Checklist

- Deploy the latest build to Vercel.
- Confirm the deployed homepage returns `200`.
- Confirm these URLs return `200` and redirect correctly when visited without the trailing slash:
  - `/es/`
  - `/software-engineer-solutions-architect/`
  - `/ai-specialist-solutions-engineer/`
  - `/technical-impact-case-studies/`
  - `/cto-technical-leadership/`
  - `/arquitecto-de-soluciones-ingeniero-software/`
  - `/hire-senior-software-engineer-ai-solutions-architect/`
  - `/recruiter-seo-sitemap/`
- Open `https://alejandro-coronado-solutions-architect.vercel.app/sitemap.xml` and verify all canonical URLs are present.
- Open `https://alejandro-coronado-solutions-architect.vercel.app/robots.txt` and verify it references the sitemap.
- Submit the sitemap in Google Search Console.
- Use URL Inspection in Search Console and request indexing for every canonical URL in the URL map.
- Test the homepage and main landing pages in Google Rich Results Test.
- Test `og-image.jpg` with LinkedIn Post Inspector or another social preview debugger after deployment.

## Search Console Setup

Create filters and saved views for:

- Branded queries:
  - `alejandro coronado`
  - `carlos alejandro coronado`
  - `alex coronado`
- English non-branded role queries:
  - `software engineer`
  - `solutions architect`
  - `ai specialist`
  - `ai solutions engineer`
  - `cto technical leadership`
- Spanish non-branded role queries:
  - `ingeniero de software`
  - `arquitecto de soluciones`
  - `especialista en ia`
  - `desarrollador backend`

Track these dimensions together:

- Query
- Page
- Country
- Device
- Average position
- Impressions
- Clicks
- CTR

## Cannibalization Check

Run this monthly in Search Console:

1. Open Performance > Search results.
2. Filter by each target query.
3. Switch to Pages.
4. Confirm the intended owner URL receives most impressions for that query.

Expected owner examples:

| Query | Expected Owner |
| --- | --- |
| software engineer | `/software-engineer-solutions-architect/` |
| solutions architect | `/software-engineer-solutions-architect/` |
| AI specialist | `/ai-specialist-solutions-engineer/` |
| CTO technical leadership | `/cto-technical-leadership/` |
| technical impact case studies | `/technical-impact-case-studies/` |
| arquitecto de soluciones | `/arquitecto-de-soluciones-ingeniero-software/` |
| ingeniero de software | `/arquitecto-de-soluciones-ingeniero-software/` |
| Alejandro Coronado | `/` |
| hire senior software engineer | `/hire-senior-software-engineer-ai-solutions-architect/` |

If two URLs split impressions for the same query, do not add more keyword repetitions. Instead:

- Strengthen internal links to the expected owner URL.
- Reduce competing wording on the non-owner page.
- Keep self-referencing canonicals.
- Recheck after Google recrawls.

## Weekly Metrics

Record every Friday:

| Date | Indexed URLs | Total Impressions | Total Clicks | Branded Avg Position | Best Non-Branded Query | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD |  |  |  |  |  |  |

## First 30 Days

- Week 1: Submit sitemap, request indexing, verify rich results, confirm no coverage errors.
- Week 2: Check whether all URLs are indexed. If a URL is discovered but not indexed, add one contextual internal link to it from a higher-authority page.
- Week 3: Review impressions by query. Preserve the owner URL map unless Search Console shows a clear better owner.
- Week 4: Update one page based on actual impressions, not assumptions. Prioritize queries with impressions and positions 8-30.

## Authority Building Targets

Code and on-page SEO are only part of the ranking problem. To compete for broad terms like `software engineer` or `solutions architect`, build authority signals:

- Keep LinkedIn profile aligned with the same role language and link to the portfolio.
- Add the portfolio link to GitHub profile, pinned repositories, YouTube channel, and CV.
- Publish one technical post or case-study summary per month that links back to the relevant landing page.
- Ask collaborators, projects, or directories to link to the portfolio using natural anchors like `Alejandro Coronado`, `software engineer`, or `solutions architect`.
- Avoid paid links, spam directories, automated comments, and keyword-stuffed anchors.

## Success Criteria

The goal is meaningfully achieved only when external evidence shows progress:

- All canonical URLs are indexed.
- Branded searches for Alejandro Coronado reliably show the portfolio.
- Search Console reports impressions for target English and Spanish non-branded queries.
- At least one non-branded target query reaches page one, or a recruiter-facing long-tail variant reaches page one.
- Organic clicks or qualified recruiter contacts begin arriving from search.
