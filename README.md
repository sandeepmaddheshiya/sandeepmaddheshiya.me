# sandeepmaddheshiya.me

> Personal builder portfolio and living build journal for **Sandeep Maddheshiya**.

A technical research notebook, engineering log, and editorial portfolio built around the core loop:  
`BUILD → EXPERIMENT → MEASURE → LEARN`.

---

## ⚡ Features

- **Dashboard Homepage:** Status strips, active projects, lab notebook experiments, numbers with count-up, and obsession topics.
- **Editorial Projects Archive (`/projects` & `/projects/[slug]`):** Detailed case studies with sticky metadata sidebars, technical decisions, SEO breakdowns, and honest retrospectives.
- **Lab Notebook (`/experiments` & `/experiments/[slug]`):** Data-driven experiment logs featuring hypothesis, change, expected vs. actual outcomes, and conclusion markers (`WORKED`, `DIDN'T WORK`, `INCONCLUSIVE`).
- **Pre-Build Research (`/research` & `/research/[slug]`):** Notes on keyword demand, competitor teardowns, and technical feasibility before building.
- **Post-Mortem Archive (`/failed-projects`):** Honest breakdowns of abandoned or failed projects and what was learned.
- **Builder Timeline (`/timeline`):** Year-grouped chronological log of launches, starts, milestones, and lessons.
- **Now Page (`/now`):** Current priorities and things deliberately ignored.
- **Evidence-Based Stack (`/about#stack`):** Technologies mapped directly to real production projects where they are used.
- **Site Changelog (`/changelog`):** Transparent iteration log for this site.
- **AI & SEO Ready:** Dynamic `sitemap.xml`, `robots.txt`, `feed.xml` (RSS), and `llms.txt`.
- **Zero-Banned-Phrases Enforcement:** Automated build-time lint script (`scripts/check-banned-phrases.ts`) ensuring no generic buzzwords exist on the site.

---

## 🛠️ Stack

- **Framework:** Next.js 16 (App Router, Turbopack, SSG)
- **Language:** TypeScript
- **Styling:** Vanilla CSS with CSS Modules & Design Tokens (Dark / Light mode with zero theme flash)
- **Content Pipeline:** MDX with `next-mdx-remote`, `gray-matter`, and `zod` build-time validation
- **Zero Heavy Runtime JS:** No UI frameworks, no external chart libs, no CSS-in-JS runtimes

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Check for Banned Buzzwords
```bash
npm run check-banned
```

### 4. Build for Production
```bash
npm run build
```

---

## 📚 Documentation

- [Design Decisions](docs/design-decisions.md): Aesthetics, typography, color palette, and architectural choices.
- [Adding Content](docs/adding-content.md): Step-by-step instructions for adding projects, experiments, research notes, articles, and timeline events.
- [Dependency Policy](docs/dependencies.md): Audit and justification for every dependency in the repo.
- [SEO & Structured Data](docs/seo.md): Schema.org JSON-LD graphs, sitemaps, RSS, and LLM indexing.
