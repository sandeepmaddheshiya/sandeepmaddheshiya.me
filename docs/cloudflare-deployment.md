# Deploying sandeepmaddheshiya.me to Cloudflare Pages

This site is configured with Next.js static HTML export (`output: 'export'`), which generates zero-server, lightning-fast static assets in the `out/` directory.

---

## Option 1: Git Integration (Recommended — Auto-deploys on push)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Configure Cloudflare Pages static export"
   git push origin main
   ```

2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
4. Select your GitHub repository.
5. In the **Build settings** section, enter:
   - **Framework preset:** `Next.js (Static HTML Export)` or `None`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `/`
6. Under **Environment variables (advanced)**, add:
   - Variable name: `NODE_VERSION`
   - Value: `20` (or `22`)
7. Click **Save and Deploy**.
8. Once deployed, attach your custom domain (`sandeepmaddheshiya.me`) under **Custom domains** in the Pages project settings.

---

## Option 2: Direct Terminal Deployment (Wrangler CLI)

If you prefer to deploy directly from your local terminal:

1. Build the static production bundle:
   ```bash
   npm run build
   ```

2. Deploy the `out` directory to Cloudflare Pages:
   ```bash
   npx wrangler pages deploy out --project-name=sandeepmaddheshiya
   ```

3. Follow the one-time browser login prompt to authenticate with your Cloudflare account.

---

## Verified Outputs Included in Build
- `out/index.html` (Homepage)
- `out/projects/` (Case studies for VisaReadyNow, PhotoResizer, PawValid, MyDocStatus, etc.)
- `out/experiments/` (Lab experiment logs)
- `out/failed-projects/` (Post-mortems)
- `out/writing/` (Technical essays)
- `out/feed.xml` (RSS feed)
- `out/llms.txt` (AI search discovery)
- `out/sitemap.xml` & `out/robots.txt` (SEO indexation)
