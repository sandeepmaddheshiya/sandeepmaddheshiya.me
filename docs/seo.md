# SEO & Structured Data Architecture — sandeepmaddheshiya.me

This site is built to be maximally legible to search engines, web crawlers, and AI systems / LLMs.

---

## 1. On-Page SEO Architecture

- **Semantic HTML5:** Strict heading hierarchy (`h1` per page, sequential `h2`, `h3`), landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`).
- **Dynamic Metadata & OG Cards:** `generateMetadata` implemented across all static and dynamic routes (`/projects/[slug]`, `/experiments/[slug]`, `/writing/[slug]`, `/research/[slug]`).
- **Canonical URLs:** Canonical tags emitted for every page.
- **Fast Core Web Vitals:** Fully pre-rendered static HTML with self-hosted Google Fonts (`next/font`), zero client-side layout shift (CLS), and sub-100ms TTFB.

---

## 2. Structured Data (JSON-LD) Knowledge Graph

All schema entities link back to a stable canonical `@id` representing Sandeep Maddheshiya:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://sandeepmaddheshiya.me/#person",
  "name": "Sandeep Maddheshiya",
  "url": "https://sandeepmaddheshiya.me",
  "sameAs": [
    "https://github.com/sandeepmaddheshiya",
    "https://linkedin.com/in/sandeepmaddheshiya"
  ],
  "jobTitle": "Developer, Builder"
}
```

### Page-Specific Schemas:
1. **Homepage & About:** `WebSite` and `Person` schemas with stable `@id` anchors.
2. **Project Case Studies:** `CreativeWork` / `SoftwareApplication` with `creator` → `Person`, `applicationCategory`, `keywords`, `dateCreated`.
3. **Writing, Research, Experiments:** `Article` schema with `author` → `Person`, `headline`, `datePublished`, `dateModified`.
4. **Deep Pages:** `BreadcrumbList` schema linking navigation hierarchies.

---

## 3. Machine-Readable & Discovery Feeds

- **Dynamic Sitemap:** `sitemap.xml` generated automatically at build time from all content collections (`/app/sitemap.ts`) including `lastModified` timestamps.
- **Robots Policy:** `robots.txt` generated dynamically via `/app/robots.ts`.
- **RSS / Atom Feed:** `/feed.xml` exposes newest articles and logged experiments in valid RSS 2.0 format.
- **LLM Context:** `/llms.txt` serves plain text structured summaries of all projects, experiments, research, and person entity data for AI search bots.
