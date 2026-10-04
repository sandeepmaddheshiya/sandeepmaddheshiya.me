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
    label: 'Open-source packages',
    value: 2,
    note: 'npm & PyPI (visareadynow-passport-specs)',
    updatedAt: '2026-10-04',
  },
  {
    key: 'revenue',
    label: 'Contract revenue',
    value: 500,
    note: '500 CAD (BelieversArt delivery)',
    updatedAt: '2026-10-04',
  },
]
