# Design Decisions — sandeepmaddheshiya.me

**Product:** Personal builder portfolio / living build journal  
**Owner:** Sandeep Maddheshiya  
**Domain:** sandeepmaddheshiya.me  
**Date:** 04 Oct 2026  

---

## 1. Aesthetic Direction & Positioning

### Why a "Living Lab Notebook" instead of a Hero / Portfolio?
Most developer portfolios feature generic centered heroes, floating gradient blobs, and bullet-point skill bars. They look identical, lack evidence, and fail to distinguish an actual software builder from someone copying a template.

**Our Core Concept:**
- The site is framed as a **living build journal and engineering lab notebook**.
- The core loop is `BUILD → EXPERIMENT → MEASURE → LEARN`.
- Failures and negative experiment results are celebrated and documented with the same fidelity as wins.
- Unknown metrics render honestly as `—` (no vanity metrics or fabricated traffic).

---

## 2. Typography & Color

### Two Font Families Max:
- **Body & Headings:** `Geist` (clean grotesque sans-serif) loaded via `next/font` for zero layout shift and zero external network requests.
- **Metadata, Labels, Numbers & Code:** `Geist Mono` (clean monospace).

### Strict Color Palette:
- **Light Mode:** Warm off-white background (`#faf9f7`), near-black text (`#1a1a1a`), and subtle gray borders (`#e5e3df`).
- **Dark Mode:** Deep warm charcoal (`#141414`), off-white text (`#e8e6e3`), and muted dark borders (`#2a2927`).
- **Single Warm Accent:** Terracotta / burnt orange (`#c05621` in light, `#e87040` in dark).
- Theme flash is completely prevented via a synchronous inline `head` script before paint.

---

## 3. Information Architecture & Navigation

### Top Primary Navigation:
`Work · Experiments · Writing · About · Now`

### Deep Secondary Routes:
- `/projects` — Editorial metadata list of all software builds.
- `/projects/[slug]` — Deep case study with sticky metadata sidebar and structured sections.
- `/experiments` — Lab notebook with computed experiment counts and outcome badges (`WORKED`, `DIDN'T WORK`, `INCONCLUSIVE`).
- `/experiments/[slug]` — 5-step hypothesis-to-conclusion report with data comparison chart.
- `/research` — Pre-build investigation notes and market validation.
- `/failed-projects` — Blunt post-mortems of shut down or abandoned projects.
- `/timeline` — Chronological builder history grouped by year with status markers.
- `/now` — Public declaration of current focus areas and things deliberately ignored.
- `/about` — Conversational background + evidence-based technology map.
- `/changelog` — Dated log of site updates.
- `/work` — Hub page connecting all building streams.

---

## 4. Performance & Rendering Strategy

- **100% Static Server-Side Generation (SSG):** All content files are parsed at build time with Zod validation. Zero database or CMS overhead.
- **Server-Rendered Charts:** SVG/CSS comparisons without bloated charting libraries.
- **Zero Heavy Runtime JS:** Interactive client components are restricted solely to the Theme Toggle, Mobile Menu, and IntersectionObserver Count-Up animation.
