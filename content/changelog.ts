export type ChangelogEntry = {
  date: string
  version?: string
  title: string
  description?: string
}

export const changelog: ChangelogEntry[] = [
  {
    date: '2026-10-07',
    version: '1.1',
    title: 'VisaReadyNow 204-Country Overhaul & Research Update',
    description:
      'Updated VisaReadyNow documentation, research logs (100+ total hours), and timeline reflecting the 60+ hour sprint verifying all 204 countries, ICAO dataset release on GitHub, PyPI spec update, and live production launch.',
  },
  {
    date: '2026-10-04',
    version: '1.0',
    title: 'Launched the first version.',
    description:
      'Built from scratch with Next.js, TypeScript, and plain CSS. No templates, no UI kits.',
  },
]
