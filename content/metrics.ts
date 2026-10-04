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
    label: 'Organic clicks',
    value: null,
    note: 'Not tracked yet',
    updatedAt: '2026-10-04',
  },
  {
    key: 'countries_reached',
    label: 'Countries reached',
    value: null,
    updatedAt: '2026-10-04',
  },
  {
    key: 'revenue',
    label: 'Revenue generated',
    value: null,
    updatedAt: '2026-10-04',
  },
]
