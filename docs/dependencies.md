# Dependency Policy & Justifications — sandeepmaddheshiya.me

Every dependency in this repository is strictly audited and justified. We do not use UI component libraries, runtime CSS-in-JS runtimes, heavy charting frameworks, or generic template kits.

---

## Production Dependencies

| Dependency | Version | Justification |
|---|---|---|
| `next` | `16.3.8` | Core web framework providing App Router, Turbopack, static page generation (SSG), and image optimization. |
| `react` & `react-dom` | `19.2.8` | UI component library powering Next.js. |
| `zod` | `^4.6.5` | Strict build-time schema validation for MDX front matter across projects, experiments, research, and notes. Ensures broken content stops the build immediately. |
| `gray-matter` | `^4.0.3` | Parses YAML front matter from markdown files with high speed and zero runtime overhead. |
| `next-mdx-remote` | `^6.0.0` | Server-side rendering for MDX files without requiring bloated client-side AST parsers. |
| `@next/mdx`, `@mdx-js/*` | `^16.3.8`, `^3.1.1` | MDX tooling support for dynamic content pages. |
| `remark-gfm` | `^4.0.1` | Enables GitHub Flavored Markdown (tables, strikethrough, task lists). |
| `rehype-slug`, `rehype-autolink-headings` | `^6.0.0`, `^7.1.0` | Automatic heading IDs and permalink anchors for case studies and articles. |
| `shiki` | `^4.5.0` | Zero-runtime code syntax highlighting generated at build time. |

---

## Dev Dependencies

| Dependency | Purpose |
|---|---|
| `typescript` | Static type safety across schemas, components, and content loaders. |
| `eslint`, `eslint-config-next` | Code quality and Next.js best practice rules. |
| `tsx` | Executes TypeScript build-time enforcement scripts like `scripts/check-banned-phrases.ts`. |

---

## Explicitly Excluded (Forbidden without formal justification)

- **No CSS Frameworks / Utility bloat:** Pure CSS Modules with CSS Variables design tokens.
- **No Heavy Charting Libraries (Chart.js / Recharts / D3):** Pure SVG / CSS server-rendered charts.
- **No Animation Frameworks (Framer Motion / GSAP):** Native CSS transitions and lightweight IntersectionObserver.
- **No Icon Font Bloat:** Inline semantic SVGs.
