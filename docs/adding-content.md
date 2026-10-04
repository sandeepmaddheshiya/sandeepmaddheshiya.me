# Adding Content Guide — sandeepmaddheshiya.me

Content in this codebase is treated strictly as **typed data**. You do not need to touch React components or layout files to add projects, experiments, research notes, articles, or timeline events.

---

## 1. Adding a New Project

Create a new file: `content/projects/<slug>.mdx`

```yaml
---
name: "My Project Name"
slug: "my-project"
description: "A short, one-line summary of what the project does."
status: "building" # 'building' | 'growing' | 'experiment' | 'paused' | 'shipped' | 'abandoned' | 'failed'
category:
  - SaaS
  - SEO
startedAt: "2026-10"
updatedAt: "2026-10-04"
url: "https://myproject.com" # optional
github: "https://github.com/..." # optional
technologies:
  - Next.js
  - Python
researchHours: 20
featured: true
currentGoal: "Ship automated webhook notifications"
showMetrics:
  traffic: false
  revenue: false
  users: false
---

## What is it?
Full description of the application.

## Why did I build it?
Origin story and motive.

## The problem
The specific user pain point.

## Research
Market observations, competitors, keyword volume.

## Building it
Architecture, tech decisions, tradeoffs.

## SEO
Indexing strategy, programmatic pages, internal linking.

## What happened
Real metrics, launch feedback.

## What went wrong
Mistakes, bugs, failed assumptions.

## What I learned
Key takeaways.

## What I'd do differently
Retrospective improvements.
```

---

## 2. Adding a New Experiment

Create a new file: `content/experiments/<slug>.mdx`

```yaml
---
title: "Testing TTFB Impact of Cloudflare Edge Caching"
slug: "edge-cache-ttfb"
date: "2026-10-04"
project: "visareadynow" # optional linked project slug
tags:
  - infra
  - performance
hypothesis: "Caching HTML responses at edge nodes will reduce TTFB from 650ms to under 120ms globally."
change: "Added Cache-Control: s-maxage=86400 to Next.js route handlers."
expected: "TTFB drop to < 150ms across US and EU test locations."
actual: "Average TTFB dropped to 85ms in US and 110ms in EU. Zero cache invalidation issues observed."
conclusion: "Edge caching dramatically improved perceived page speed without requiring infrastructure changes."
outcome: "worked" # 'worked' | 'failed' | 'inconclusive'
data:
  - label: "US TTFB (ms)"
    before: 640
    after: 85
    unit: "ms"
  - label: "EU TTFB (ms)"
    before: 710
    after: 110
    unit: "ms"
---

Additional narrative, debug logs, or notes can go here.
```

---

## 3. Adding a Pre-Build Research Note

Create a new file: `content/research/<slug>.mdx`

```yaml
---
title: "Competitor Pricing & Keyword Gap in Visa Photography"
slug: "visa-photo-market-research"
date: "2026-10-04"
type: "SaaS & SEO"
summary: "Analyzing search volume for passport photo requirements and SaaS pricing elasticity."
hoursSpent: 18
outcome: "Building VisaReadyNow"
project: "visareadynow"
---

Detailed breakdown of keywords, SERP intent, and competitor teardowns.
```

---

## 4. Adding an Article / Note

Create a new file: `content/writing/<slug>.mdx`

```yaml
---
title: "Why Zero-Dependency Scripts Beat Heavy SDKs in Early Builds"
slug: "zero-dependency-scripts"
date: "2026-10-04"
category: "Engineering"
summary: "How minimizing dependencies keeps small web utilities fast, secure, and maintenance-free."
draft: false
---

Body of the article formatted in Markdown or MDX.
```

---

## 5. Adding a Timeline Event

Edit `content/timeline.ts`:

```ts
{
  date: '2026-10-04',
  title: 'Launched sandeepmaddheshiya.me',
  kind: 'launch', // 'launch' | 'start' | 'fail' | 'learn' | 'milestone'
  note: 'First version of the site. Built from scratch.',
}
```

---

## 6. Updating Global Metrics

Edit `content/metrics.ts` to update numbers (e.g., `countries_reached`, `organic_clicks`, `revenue`).
`projects_shipped`, `experiments_run`, and `research_hours` are computed dynamically from your content files at build time!

---

## 7. Updating the Now Page

Edit `content/now.mdx` directly and update the `lastUpdated` date in the front matter.
