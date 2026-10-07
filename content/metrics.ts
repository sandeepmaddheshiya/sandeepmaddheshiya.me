export type MetricItem = {
  key: string
  label: string
  value: number | null
  note?: string
  updatedAt: string
  computed?: boolean
}

export const metrics: MetricItem[] = [
  {
    key: 'projects_shipped',
    label: 'Projects shipped',
    value: null,
    updatedAt: '2026-10-04',
    computed: true,
  },
  {
    key: 'experiments_run',
    label: 'Experiments run',
    value: null,
    updatedAt: '2026-10-04',
    computed: true,
  },
  {
    key: 'research_hours',
    label: 'Hours researching',
    value: null,
    updatedAt: '2026-10-04',
    computed: true,
  },
  {
    key: 'total_search_clicks',
    label: 'Total organic clicks',
    value: 58000,
    note: '53.7k Bing + 4.6k+ Google (photoresizer.in)',
    updatedAt: '2026-10-04',
  },
  {
    key: 'total_impressions',
    label: 'Total search impressions',
    value: 750000,
    note: '710.9k Bing + Google (photoresizer.in)',
    updatedAt: '2026-10-04',
  },
  {
    key: 'organic_clicks',
    label: 'Daily organic clicks',
    value: 1100,
    note: 'PhotoResizer (1k+), MyDocStatus (80–100), VisaReadyNow (20–40)',
    updatedAt: '2026-10-04',
  },
  {
    key: 'countries_reached',
    label: 'Countries reached',
    value: 2,
    note: 'India, Canada',
    updatedAt: '2026-10-04',
  },
  {
    key: 'mobile_downloads',
    label: 'Mobile app downloads',
    value: 1000,
    note: '1k+ organic installs (Resourcify)',
    updatedAt: '2026-10-04',
  },
  {
    key: 'saas_revenue',
    label: 'Micro-SaaS revenue',
    value: 350,
    note: '$350+ USD (VisaReadyNow & PhotoResizer.us)',
    updatedAt: '2026-10-04',
  },
  {
    key: 'open_source_packages',
    label: 'Open-source packages & datasets',
    value: 3,
    note: 'npm & PyPI (visareadynow-passport-specs) + ICAO Dataset (GitHub)',
    updatedAt: '2026-10-07',
  },
  {
    key: 'revenue',
    label: 'Contract revenue',
    value: 500,
    note: '500 CAD (BelieversArt delivery)',
    updatedAt: '2026-10-04',
  },
]
