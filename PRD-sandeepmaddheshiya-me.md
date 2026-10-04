# PRD: sandeepmaddheshiya.me

**Product:** Personal builder portfolio / living build journal
**Owner:** Sandeep Maddheshiya
**Domain:** sandeepmaddheshiya.me
**Version:** 1.0 (draft)
**Date:** 04 Oct 2026
**Stack:** Next.js (App Router), TypeScript

---

## 1. Summary

A personal website that documents how Sandeep builds things: what he tried, why, what happened, and where he was wrong. It is not a conventional developer portfolio. It reads like a research notebook, engineering log and editorial site in one.

**Core loop:** `BUILD → EXPERIMENT → MEASURE → LEARN`

**Main differentiator:** show the process, not just the result.

**Target feeling:** a visitor spends 10–20 minutes exploring and thinks, *"He actually documents how he builds things."*

---

## 2. Goals and Non-Goals

### Goals
1. Establish Sandeep Maddheshiya as a builder of internet products (micro-SaaS, SEO, AI, automation, developer tools).
2. Make the site the canonical source of truth for his projects, experiments and research.
3. Reward deep exploration (case studies, failures, experiment logs) rather than screenshot appeal.
4. Be technically excellent: SEO, accessibility, Core Web Vitals.
5. Make adding content trivial: new project, experiment or article without touching layout code.
6. Be legible to search engines and AI systems (structured data, clear entity relationships).

### Non-Goals
- Not a freelance/agency lead-gen site. No "hire me" funnel, no contact-form hero.
- Not a skills or logo showcase.
- Not a template-style SaaS landing page.
- No CMS, auth, comments or database in v1 (file-based content only).
- No third-party scripts beyond privacy-friendly analytics, if added at all.

---

## 3. Audience

| Audience | What they want | How the site serves them |
|---|---|---|
| Fellow builders / indie hackers | Real numbers, real mistakes | Experiments, failed projects, case studies |
| SEO / dev community | Methods and results | Experiment logs, SEO sections, research |
| Potential collaborators / employers | Evidence of ability | Projects, process, tech-through-projects |
| Search engines / AI systems | Clear entity and project data | Structured data, internal linking, consistent project schema |

---

## 4. Principles

1. **Process over polish.** Show hypotheses, failures, and retrospectives.
2. **Evidence over claims.** No fabricated metrics, ever. Use placeholders.
3. **Crafted, not decorated.** Typography and layout do the work.
4. **Performance over effects.** Static rendering, minimal JS.
5. **One specific person.** The site should be unmistakably Sandeep's.

---

## 5. Hard Content Rules

### 5.1 Do not invent
Never fabricate: revenue, users, traffic, awards, clients, companies, years of experience, project results, testimonials. If data is missing, use `[Add project details]` or an empty state, or a clearly marked placeholder value (e.g., `—`, `TBD`).

### 5.2 Banned phrases (must not appear anywhere on the site)
- "Welcome to my portfolio"
- "I'm a passionate developer" / "passionate developer"
- "Turning ideas into reality" / "transforming ideas into reality"
- "Crafting digital experiences" / "crafting exceptional digital experiences"
- "Building the future"
- "Pixel-perfect"
- "Innovative solutions"
- "Cutting-edge technology"
- "Let's build something amazing" / "Let's work together"
- "I specialize in…"
- "My journey"
- "Problem solver"
- "Results-driven"
- "Tech enthusiast" / "technology enthusiast"
- "Visionary entrepreneur" / "digital innovator"

**Enforcement:** add a lint script (`scripts/check-banned-phrases.ts`) that scans `content/` and `app/` and fails the build on a match.

### 5.3 Tone
Direct, curious, honest, slightly informal, analytical, occasionally funny. Short natural sentences. Blunt where appropriate ("This one didn't work."). Written as a technical person talking to another technical person. Never corporate, never motivational.

### 5.4 Known facts only
Only these are known and may be written as real content:
- Name: Sandeep Maddheshiya
- Interests: internet products, micro-SaaS, SEO, AI, automation, developer tools, web products, experimentation, growth, infrastructure
- Projects: **VisaReadyNow**, **PhotoResizer**
- From the brief: VisaReadyNow is categorized SaaS / SEO / AI, started 2026, stack mentioned as Next.js / FastAPI (treat as illustrative until confirmed), research "40+ hours" (illustrative in brief; confirm before publishing)

Everything else is placeholder.

---

## 6. Information Architecture

### 6.1 Primary navigation
```
Work · Experiments · Writing · About · Now          GitHub · LinkedIn
```
Breadcrumbs on all deep pages. Secondary pages (Research, Failed Projects, Timeline, Changelog) are reachable via the homepage, `/work`, and the footer, not the main nav.

### 6.2 Sitemap and URLs

| Route | Purpose |
|---|---|
| `/` | Dashboard-style homepage |
| `/work` | Entry point to projects, failed projects, research (overview) |
| `/projects` | Project archive (editorial list with metadata) |
| `/projects/[slug]` | Case study |
| `/failed-projects` | Failure archive |
| `/failed-projects/[slug]` | Individual failure write-up (optional; may be inline in v1) |
| `/experiments` | Experiment log |
| `/experiments/[slug]` | Single experiment |
| `/research` | Pre-build research index |
| `/research/[slug]` | Single research note |
| `/writing` | "Notes from building things" |
| `/writing/[slug]` | Article/note |
| `/timeline` | Builder's history |
| `/now` | What I'm doing now |
| `/about` | Conversational about page |
| `/changelog` | Changelog of the site itself |
| `/sitemap.xml`, `/robots.txt` | SEO |

**Rules:** clean semantic URLs, no query-parameter routing, no duplicate URLs, one canonical per page. `/work` must not duplicate `/projects` content; it is a short hub that links out (or 301 → `/projects` if a hub adds no value, decide during implementation).

### 6.3 Entity relationships
```
Sandeep (Person)
 └─ Projects
     ├─ Case study
     ├─ Experiments (linked by slug)
     ├─ Research (linked by slug)
     └─ Writing (linked by slug)
```
Every project page links to its related experiments, research, and writing. Every experiment/research/writing page links back to its project. Relationships are defined in front matter and rendered automatically.

---

## 7. Page Requirements

### 7.1 Homepage `/`
Not a hero. A personal dashboard / builder journal.

**First screen must communicate:** who I am + what I'm building + what I learned recently.

**Contents (in order):**
1. **Name + one-line positioning** (original copy, e.g. "I build small things on the internet and keep track of what happens." Do not reuse the same sentence across pages.)
2. **Role line** (monospace): `Developer · Builder · Experimenter`
3. **Status strip:** `Currently building → [project]` and `Latest → [experiment/case study]`, driven by content.
4. **Currently Building:** 1–3 active projects. Each: name, short description, status label, what I'm trying to achieve, link.
5. **Recent Experiments:** latest 3–5. Each shows hypothesis → result → learning in compact form (lab notebook feel).
6. **Projects (editorial list):** archive preview with metadata rows.
7. **Numbers:** subtle metrics block (see 8.6).
8. **Currently obsessed with…:** small list, editable.
9. **Site meta:** last updated, experiments logged, site version, link to changelog.
10. **Ending:** a short, original, personal closing with GitHub/LinkedIn links. No "let's work together".

**Status labels:** `BUILDING`, `GROWING`, `EXPERIMENT`, `PAUSED`, `SHIPPED` (plus `ABANDONED` / `FAILED` for archive). Styled as small monospace text, not startup pills.

**Forbidden:** gradient hero, blobs, stock/3D illustrations, profile card, giant centered type.

### 7.2 Projects archive `/projects`
Editorial list, not an image-title-button card grid. Each row/entry:

```
VisaReadyNow
Status: Building        Started: 2026
Category: SaaS / SEO / AI
Research: 40+ hours     Traffic: —
Revenue: —              Stack: Next.js / FastAPI / …
```
- Metrics come from the project data file.
- Unknown values render as `—` or a quiet "not tracked yet".
- Filter by status/category via client-side state without changing the URL structure (or via static category sections to stay no-JS).

### 7.3 Project case study `/projects/[slug]`
Sections (each optional; empty ones show a muted `[Add project details]` in dev and are hidden in production unless explicitly set to show):

1. **What is it?**
2. **Why did I build it?**
3. **The problem**
4. **Research:** competitors, search demand, pricing, SERPs, technical constraints, market observations
5. **Building it:** key technical decisions and why
6. **SEO:** pages created, keyword strategy, internal linking, technical SEO, indexing, experiments, rankings, traffic
7. **What happened:** real metrics, with a growth timeline/chart (e.g. clicks/day over time)
8. **What went wrong:** bad decisions, failed experiments, traffic drops, deployment problems, wasted time
9. **What I learned**
10. **What I'd do differently**

**Sidebar/meta block (sticky on desktop, collapsed on mobile):** status, started, updated, category, stack, URL, GitHub, related experiments/research/writing.

### 7.4 Failed projects `/failed-projects`
Dedicated archive of projects that did not work. Each entry:

```
What I built
Why I thought it would work
What I expected
What actually happened
Why I stopped
What I learned
```
Plus metadata: dates, time spent, final status. Tone is blunt. Initially empty-state with instructions unless Sandeep provides entries. **Do not invent failures.**

### 7.5 Experiments `/experiments` and `/experiments/[slug]`
Small, data-driven notebook entries. Required fields:

- Hypothesis
- Change
- Expected result
- Actual result
- Conclusion

Optional: before/after numbers, chart, screenshots, linked project, tags (SEO, CRO, infra, AI, pricing, performance).

Index view: compact log with date, title, tag, outcome marker (`WORKED` / `DIDN'T` / `INCONCLUSIVE`), one-line result. Header shows `Experiments logged: N` (computed).

Example experiment types to support: title tag → CTR; CTA → conversions; internal linking → impressions; API workers → memory; Cloudflare caching → TTFB; programmatic pages → indexed count; pricing → conversion.

### 7.6 Research `/research`
Pre-build investigation notes: niche research, SaaS ideas, SEO/keyword/competitor research, monetization, technical research. Fields: title, date, type, summary, hours spent (optional), outcome (e.g. "built", "dropped", "parked"), linked project. Purpose: show he investigates before building.

### 7.7 Writing `/writing`
Framed as **"Notes from building things."** No "Blog / Latest Articles / Featured Posts" labels.
Categories: Building, SEO, SaaS, Engineering, Experiments, Lessons, Random useful things.
Reading-friendly layout, personal note tone, date + category + reading time in monospace.

### 7.8 Timeline `/timeline`
A builder's history, not a resume. Vertical, year-grouped, event types (launched, started, failed, learned, milestone) with small monospace markers. Mobile: single-column, no horizontal scroll. Initially seeded only with confirmed events; placeholders clearly marked.

### 7.9 Now `/now`
Easy-to-update page: current projects, current experiments, what I'm learning, what I'm researching, current goals, **things I'm deliberately not working on**. Shows "Last updated" date. Single content file.

### 7.10 About `/about`
Conversational and honest. Sections: short intro, background, what I build, what interests me, how I approach projects, technologies (through projects, see 7.11), things I care about when building, links (GitHub, LinkedIn, others). No logo wall.

### 7.11 Technology (evidence-based)
No skill logo wall. A section (on `/about`, or `/about#stack`) maps each technology to the projects/work where it was actually used:

```
Next.js
Used in: VisaReadyNow, …

Python
Used for: image processing, automation, backend services
```
Generated from project `technologies` fields so it cannot drift from reality. Only list technologies that appear in at least one project.

### 7.12 Changelog `/changelog`
Dated entries documenting changes to the site itself (launch, new sections, fixes). Header shows current site version and last-redesign date. Seed with: `04 Oct 2026 — Launched the first version.`

### 7.13 Footer
Minimal: name, one-line tagline, `GitHub · LinkedIn · Email`, © year. No large footer.

---

## 8. Content and Data Architecture

### 8.1 Principle
Content is data. No page content hardcoded in JSX. Adding a project/experiment/article means adding a file, with no layout edits.

### 8.2 Recommended structure
```
content/
  projects/
    visareadynow.mdx
    photoresizer.mdx
  failed-projects/
  experiments/
  research/
  writing/
  timeline.ts            # or timeline.json
  metrics.ts             # global numbers
  now.mdx
  site.ts                # name, links, tagline, version, lastUpdated
  changelog.ts
```
Format: MDX (or Markdown + front matter) with typed front matter validated by Zod at build time. Invalid or missing required fields fail the build with a clear message.

### 8.3 Project schema
```ts
type Project = {
  name: string
  slug: string
  description: string            // short
  longDescription?: string
  status: 'building' | 'growing' | 'experiment' | 'paused' | 'shipped' | 'abandoned' | 'failed'
  category: string[]             // e.g. ['SaaS','SEO','AI']
  startedAt: string              // ISO date or year
  updatedAt: string
  url?: string
  github?: string
  technologies: string[]
  researchHours?: number | string
  users?: number | null
  traffic?: { value: number | null; unit?: string; period?: string; note?: string }
  revenue?: { value: number | null; currency?: string; period?: string; note?: string }
  screenshots?: { src: string; alt: string }[]
  lessons?: string[]
  failures?: string[]
  experiments?: string[]         // experiment slugs
  research?: string[]            // research slugs
  writing?: string[]             // writing slugs
  currentGoal?: string           // shown in "Currently building"
  featured?: boolean
  showMetrics?: { traffic?: boolean; revenue?: boolean; users?: boolean }
}
```
Body of the MDX holds the case-study sections via headings (or structured front matter keys for each section).

### 8.4 Experiment schema
```ts
type Experiment = {
  title: string
  slug: string
  date: string
  project?: string               // project slug
  tags: string[]
  hypothesis: string
  change: string
  expected: string
  actual: string
  conclusion: string
  outcome: 'worked' | 'failed' | 'inconclusive'
  data?: { label: string; before?: number; after?: number; unit?: string }[]
}
```

### 8.5 Research, writing, timeline
- **Research:** `title, slug, date, type, summary, hoursSpent?, outcome?, project?`
- **Writing:** `title, slug, date, updated?, category, summary, project?, draft?`
- **Timeline event:** `date, title, kind ('launch'|'start'|'fail'|'learn'|'milestone'), project?, note?`

### 8.6 Metrics `metrics.ts`
Single editable file. Each metric: `{ key, label, value: number | null, note?, updatedAt }`.

Planned metrics: projects shipped, experiments run (auto-computed from content), countries reached, organic clicks, users, revenue generated, open-source downloads, hours spent researching (can be auto-summed from projects/research).

`null` renders as `—`. Computed values are derived, not typed manually where possible.

---

## 9. Visual Design System

### 9.1 Direction
Personal research notebook + product studio + engineering log + modern editorial site. Crafted, slightly imperfect, not corporate.

### 9.2 Avoid
Gradient backgrounds, glassmorphism, glowing borders, floating blobs, heavily rounded cards, 3D illustrations, excessive icons, skill badges, huge centered hero type, decorative animation, Framer/Webflow/Linear/Vercel/Stripe look-alikes.

### 9.3 Typography
- **Two families max:** one clean sans for body/headings, one monospace for metadata, labels, numbers, status.
- Self-hosted via `next/font` (no layout shift, no third-party request).
- Strong scale and hierarchy do most of the visual work. Suggested: fluid type with `clamp()`, tight headings, comfortable measure (60–72ch) for reading.
- Specific families to be chosen during implementation (candidates: a grotesque/neo-grotesque sans plus a clean mono). Decision to be recorded in `docs/design-decisions.md`.

### 9.4 Color
- Light: warm off-white background, near-black text, muted gray secondary.
- Dark: near-black (not pure `#000`) with warm gray text.
- **One** subtle accent color used for links, status highlights, and active states.
- Define as CSS variables / design tokens; verify WCAG AA contrast for both themes.
- Dark mode: supported, system-preference default with a manual toggle (justified because long reading sessions are the primary use case). Toggle must not flash on load (set theme before paint).

### 9.5 Layout
- Editorial, asymmetric grids where appropriate (e.g., narrow metadata column + wide content column).
- Subtle 1px borders and rules instead of card shadows.
- Generous whitespace; small radii (0–4px).
- Monospace micro-metadata everywhere: dates, status, hours, counts.

### 9.6 Motion
Allowed: subtle page transitions, hover states, timeline progress, number count-up on metrics, light chart draw-in, sparing reveal-on-scroll. Forbidden: everything flying in, floating objects, cursor-following effects, parallax. Everything respects `prefers-reduced-motion`. Performance wins over animation.

### 9.7 Personality details (subtle)
- Status indicator: `Currently building → VisaReadyNow`
- `Experiments logged: N`
- "Last updated" timestamp
- "Currently obsessed with…" list
- Mini site changelog entry on the homepage: `Site v1.0 · Built from scratch · Last redesigned: 04 Oct 2026`
- Small easter eggs that reward exploration (e.g., a hidden note in the footer, console message). Must not become a gimmick.

---

## 10. Component Inventory

| Component | Purpose |
|---|---|
| `SiteHeader` / `Nav` | Simple nav, active state, mobile menu |
| `ThemeToggle` | Light/dark, no flash |
| `Breadcrumbs` | Deep pages + BreadcrumbList JSON-LD |
| `StatusLabel` | Monospace status marker |
| `StatusStrip` | "Currently building → …" line |
| `MetaList` / `MetaRow` | Key-value metadata (monospace) |
| `ProjectEntry` | Editorial project row with metadata |
| `CurrentProject` | Homepage active-project block |
| `ExperimentEntry` | Compact lab-notebook entry |
| `ExperimentDetail` | Hypothesis/change/expected/actual/conclusion layout |
| `OutcomeMarker` | Worked / didn't / inconclusive |
| `CaseStudyLayout` | Section nav + sticky metadata |
| `SectionHeading` | Consistent anchored headings |
| `MetricsBlock` | Numbers with null handling and count-up |
| `Chart` (SVG, server-rendered) | Simple line/bar charts without a chart lib |
| `Timeline` / `TimelineEvent` | Builder's history |
| `TechEvidenceList` | Technology → projects map |
| `PostLayout` | Writing/research reading layout |
| `EmptyState` | Placeholder for missing data |
| `JsonLd` | Structured data injector |
| `SiteFooter` | Minimal footer |
| `Prose` (MDX components) | Typographic styles, code blocks, callouts |

Prefer server components. Client components only for: theme toggle, mobile menu, count-up/scroll reveal, optional filters.

---

## 11. SEO and Structured Data

### 11.1 On-page
- Semantic HTML; one `h1` per page; correct heading hierarchy.
- Unique `<title>` and meta description per page (generated from content with explicit override).
- Canonical URL on every page.
- Open Graph and Twitter/X cards, with generated OG images per page (via `next/og`, simple typographic style).
- Descriptive anchor text; automatic related-content internal links.
- Optimized images with required alt text (build fails on missing alt).
- Do not keyword-stuff the name.

### 11.2 Technical
- `app/sitemap.ts` generated from content (include `lastmod`).
- `app/robots.ts` allowing all, referencing the sitemap.
- Trailing-slash and `www` redirects decided once and enforced.
- 404 page that is useful, with links to main sections.
- RSS/Atom feed for `/writing` and `/experiments` (optional but recommended).

### 11.3 Structured data (JSON-LD)
| Page | Schema |
|---|---|
| Site-wide | `WebSite` |
| `/`, `/about` | `Person` (name, url, sameAs: GitHub, LinkedIn, etc., jobTitle: developer/builder) |
| `/projects/[slug]` | `CreativeWork` / `SoftwareApplication` (as appropriate) with `creator` → Person, `dateCreated`, `url`, `applicationCategory`, `keywords`; **no fabricated ratings or offers** |
| `/writing/[slug]`, `/research/[slug]`, `/experiments/[slug]` | `Article` (author → Person, `datePublished`, `dateModified`) |
| All deep pages | `BreadcrumbList` |

Use a stable `@id` for the Person entity (e.g. `https://sandeepmaddheshiya.me/#person`) and reference it everywhere, so the knowledge graph stays consistent.

### 11.4 AI / knowledge-graph readiness
Every project exposes the same structured block: Project, Creator, Date started, Status, Category, Technologies, Purpose, URL, both visibly in the page metadata and in JSON-LD. Consider an `/llms.txt` summarizing the site structure and key entities (optional, low cost).

---

## 12. Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip-to-content link.
- Full keyboard navigation, visible focus states.
- AA contrast minimum in both themes.
- `prefers-reduced-motion` honored; no autoplay motion.
- ARIA only where native semantics are insufficient.
- Charts have text alternatives (data table or summary).
- Tables are real tables with headers; on mobile they reflow or scroll within a labeled container.
- Form controls (if any) have labels.

---

## 13. Performance Requirements

| Metric | Target |
|---|---|
| Lighthouse (Perf / A11y / Best Practices / SEO) | 95+ / 100 / 100 / 100 on key pages |
| LCP | < 2.0s on mid-range mobile |
| CLS | < 0.05 |
| INP | < 200ms |
| JS shipped (homepage) | As low as practical; target < 100KB gzipped |

Approach: static generation for all content pages; server components by default; `next/image` with explicit dimensions; `next/font` self-hosting with `display: swap` and size-adjust; SVG charts rendered server-side; no third-party scripts (analytics, if used, must be a lightweight privacy-friendly one, loaded async); lazy-load below-the-fold media.

---

## 14. Mobile Requirements

Designed deliberately, not shrunk:
- Navigation: compact menu with five items, large tap targets.
- Typography: tuned sizes and line lengths for small screens.
- Project metadata: stacked key-value rows, not squeezed columns.
- Timeline: single-column with clear date anchors.
- Tables and charts: horizontally scrollable containers or reflowed summaries; never body-level horizontal scroll.
- Case studies: collapsible section index at top replacing the desktop sticky sidebar.
- Test at 360px, 390px, 768px, 1024px, 1440px.

---

## 15. Dependency Policy

Every dependency needs a stated reason in `docs/dependencies.md`. Starting set:

| Dependency | Reason |
|---|---|
| `next`, `react`, `typescript` | Framework |
| MDX tooling (`@next/mdx` or `next-mdx-remote` / `contentlayer` alternative) | Content authoring |
| `zod` | Front-matter validation at build |
| `gray-matter` (if not using MDX loader's front matter) | Parse front matter |
| `rehype-slug`, `rehype-autolink-headings`, `remark-gfm` | Anchors, tables |
| `shiki` or `rehype-pretty-code` | Build-time code highlighting (zero client JS) |
| Tailwind CSS **or** plain CSS modules/vanilla CSS with tokens | Decide at implementation; plain CSS preferred if it keeps the look distinct |

Not included without justification: animation libraries, chart libraries, icon packs, UI kits, state managers.

---

## 16. Initial Content (Seed)

**Seeded with real content only:**
- Project: **VisaReadyNow**: status `building`, category SaaS / SEO / AI, started 2026. Remaining fields `[Add project details]`.
- Project: **PhotoResizer**: details `[Add project details]`.
- `site.ts`: name, links (GitHub/LinkedIn URLs to be provided), version 1.0, last redesigned 04 Oct 2026.
- Changelog entry: 04 Oct 2026, "Launched the first version."
- `/now`, `/about`, `/research`, `/experiments`, `/failed-projects`, `/timeline`, `/writing`: structurally complete with clearly marked placeholder/empty states and a short "how to add" note visible only in dev.
- Metrics: all values `null` except computed counts.

**Open input needed from Sandeep before content goes live:**
1. GitHub, LinkedIn, email, other profile URLs
2. Real details for VisaReadyNow and PhotoResizer (status, dates, stack, metrics, lessons)
3. Any other projects to include
4. Any failed projects to document
5. Background text for `/about`
6. Whether to show revenue/traffic publicly per project

---

## 17. Documentation Deliverables

Ship in the repo:
1. `README.md`: project structure, local dev, deploy
2. `docs/design-decisions.md`: why the major choices were made
3. `docs/adding-content.md`: how to add a project, experiment, article, research note, timeline event; how to update metrics and Now
4. `docs/dependencies.md`: dependency justifications
5. `docs/seo.md`: SEO and structured data architecture

### How-to summary (to appear in docs)
- **New project:** create `content/projects/<slug>.mdx` with the front matter above; it appears on the homepage, `/projects`, sitemap and tech-evidence list automatically.
- **New experiment:** create `content/experiments/<slug>.mdx` with hypothesis/change/expected/actual/conclusion; counter and homepage feed update automatically.
- **New article:** create `content/writing/<slug>.mdx`; set category and date.
- **Update metrics:** edit `content/metrics.ts` (global) or the project's front matter (per project); bump `updatedAt`.
- **Update Now:** edit `content/now.mdx`; update `lastUpdated`.
- **Deploy:** push to GitHub, connect to Vercel (or Cloudflare Pages), set domain `sandeepmaddheshiya.me`, configure `www` → apex redirect, verify in Google Search Console and submit the sitemap.

---

## 18. Implementation Plan

Per the brief, architecture comes before code.

1. **Architecture pass:** confirm IA, design tokens, component list, content schemas, URL map, SEO plan (this document).
2. **Foundation:** Next.js + TS, fonts, tokens, layout shell, theme, nav, footer.
3. **Content layer:** loaders, Zod schemas, MDX pipeline, derived data (counts, relations, sitemap).
4. **Core pages:** homepage, projects archive, case study template.
5. **Notebook pages:** experiments, research, writing, failed projects.
6. **Narrative pages:** about, now, timeline, changelog.
7. **SEO layer:** metadata, JSON-LD, sitemap, robots, OG images, breadcrumbs.
8. **Polish:** motion, mobile pass, a11y audit, performance audit, banned-phrase lint.
9. **Docs and deploy.**

---

## 19. Acceptance Criteria

**Content and tone**
- [ ] No banned phrases anywhere (lint passes)
- [ ] No fabricated metrics, clients, testimonials, or achievements
- [ ] All unknowns shown as placeholders or empty states

**Structure**
- [ ] All routes in section 6.2 exist and resolve with clean URLs
- [ ] Adding a project/experiment/article requires only a new content file
- [ ] Project, experiment and article relationships render automatically both ways

**Design**
- [ ] Homepage is a dashboard/journal, not a hero
- [ ] No gradients, blobs, glassmorphism, stock/3D illustrations
- [ ] Max two font families; one accent color
- [ ] Light and dark themes with no flash on load

**SEO**
- [ ] Unique title, description, canonical on every page
- [ ] OG/Twitter cards present
- [ ] Sitemap and robots live
- [ ] Person, WebSite, Article, BreadcrumbList, and project schema validate in Google's Rich Results Test / Schema validator
- [ ] All images have alt text

**Accessibility and performance**
- [ ] Lighthouse targets in section 13 met
- [ ] Keyboard-only navigation works across all pages
- [ ] Reduced-motion respected
- [ ] No horizontal body scroll at 360px

**Experience**
- [ ] A first-time visitor can find a case study, a failed project, and an experiment log within three clicks from the homepage
- [ ] Site clearly reads as one specific person's, not a template

---

## 20. Risks and Open Questions

| Risk / Question | Mitigation |
|---|---|
| Little real content at launch makes the site feel empty | Strong empty states; prioritize writing the VisaReadyNow case study and 3–5 experiments first |
| Placeholder text leaks to production | Hide empty sections in production; lint for `[Add project details]` in a pre-deploy check with a warning |
| Copy drifts into generic "AI voice" | Banned-phrase lint plus manual voice review; write case studies in Sandeep's own words |
| Public metrics may be sensitive (revenue) | Per-project `showMetrics` flags |
| Should `/work` exist alongside `/projects`? | Decide at implementation; avoid duplicate content |
| Analytics choice | Optional; if used, privacy-friendly, async, no cookie banner |
| Tailwind vs. custom CSS | Choose whichever keeps the design distinct and bundle small |
| Email exposure to scrapers | Obfuscate or use a simple mailto with minimal spam risk |

---

## 21. Success Measures

Qualitative first, since the site is not a conversion funnel:
- Visitors reach case studies/experiments (not just the homepage)
- Average session time reflects real exploration (target: several minutes)
- Branded searches for "Sandeep Maddheshiya" return the site as the primary result with correct entity info
- Individual projects/experiments rank or get referenced externally
- Sandeep keeps updating it (experiments logged and changelog entries per month): the real signal that the site is alive
