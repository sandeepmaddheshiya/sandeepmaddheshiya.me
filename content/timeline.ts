export type TimelineEvent = {
  date: string
  title: string
  kind: 'launch' | 'start' | 'fail' | 'learn' | 'milestone'
  project?: string
  note?: string
}

export const timeline: TimelineEvent[] = [
  {
    date: '2026-10-04',
    title: 'Launched sandeepmaddheshiya.me',
    kind: 'launch',
    note: 'First version of the living builder journal. Built from scratch with Next.js and plain CSS.',
  },
  {
    date: '2026-09-25',
    title: 'PhotoResizer hit 1k+ daily clicks & 25k+ daily impressions',
    kind: 'milestone',
    project: 'photoresizer',
    note: 'Google Analytics anomaly alert confirmed organic breakout; achieved Top 5 Google ranking for tool-based photo resizer searches.',
  },
  {
    date: '2026-09',
    title: 'Retired OneStopWrite after SEO/AEO traffic plateau',
    kind: 'fail',
    project: 'onestopwrite',
    note: 'Document generator peaked at 3–8 free users/day against high-authority legal template incumbents; allowed domain to expire.',
  },
  {
    date: '2026-08',
    title: 'Abandoned OneStopRead after algorithmic traffic collapse',
    kind: 'fail',
    project: 'onestopread',
    note: 'Automated AI exam portal traffic dropped to 0 after 25 days; recovery attempts with manual verified links failed.',
  },
  {
    date: '2026-06',
    title: 'Pivoted OneStopRead into Gemini Flash automated exam portal',
    kind: 'start',
    project: 'onestopread',
    note: 'Automated scrapers and Gemini Flash summarization grew to 20–30 daily clicks before search algorithm penalties.',
  },
  {
    date: '2026-06',
    title: 'PhotoResizer traffic spiked to 400–600/day on exam queries',
    kind: 'learn',
    project: 'photoresizer',
    note: 'Programmatic pages for government exams (DSSSB) surged in Bing before encountering post-application seasonality drops.',
  },
  {
    date: '2026-05',
    title: 'Built OneStopWrite policy generator after failed domain flip',
    kind: 'start',
    project: 'onestopwrite',
    note: 'Built free legal document generators (Privacy Policy, Terms, Refund) on onestopwrite.com.',
  },
  {
    date: '2026-04',
    title: 'Launched onestopread.com as trending blog',
    kind: 'launch',
    project: 'onestopread',
    note: 'General blogging site generated 0–1 clicks/day against established authority publications.',
  },
  {
    date: '2026-02',
    title: 'Started research and development of photoresizer.in',
    kind: 'start',
    project: 'photoresizer',
    note: 'Initiated keyword investigation and built privacy-focused client-side image resizing utility using Web Canvas API.',
  },
  {
    date: '2026',
    title: 'Started building VisaReadyNow',
    kind: 'start',
    project: 'visareadynow',
    note: 'SaaS product for automated visa photo compliance and background processing.',
  },
  {
    date: '2024',
    title: 'Joined Collegedunia as Software Developer',
    kind: 'milestone',
    note: 'Full-time software engineering role working on production web applications and backend systems.',
  },
  {
    date: '2024',
    title: 'Resourcify suspended on Google Play Store',
    kind: 'fail',
    project: 'resourcify',
    note: 'App and account suspended after 3 warnings due to inability to push target SDK / policy compliance updates while working full-time.',
  },
  {
    date: '2024-04',
    title: 'Shipped BelieversArt E-Commerce Platform',
    kind: 'launch',
    project: 'believersart',
    note: 'Delivered full-stack Next.js + Strapi store for Canadian client handling Stripe payments and Resend transactional emails. 500 CAD payout.',
  },
  {
    date: '2024',
    title: 'Left Mobiloitte after 3 months',
    kind: 'milestone',
    note: 'Joined in Pune during final college year; left after 3 months due to lack of active project allocation / being kept on bench.',
  },
  {
    date: '2024-02',
    title: 'Started building BelieversArt',
    kind: 'start',
    project: 'believersart',
    note: 'Began architecture and implementation of custom sketch storefront with headless Strapi CMS and Stripe.',
  },
  {
    date: '2023',
    title: 'Launched Resourcify on Google Play Store',
    kind: 'launch',
    project: 'resourcify',
    note: 'First production mobile app built with Flutter, Dart, and SendGrid. Reached 1,000+ organic downloads helping college students with free, ad-free semester exam prep.',
  },
]
