export type ChangelogEntry = {
  date: string
  version?: string
  title: string
  description?: string
}

export const changelog: ChangelogEntry[] = [
  {
    date: '2026-10-04',
    version: '1.0',
    title: 'Launched the first version.',
    description:
      'Built from scratch with Next.js, TypeScript, and plain CSS. No templates, no UI kits.',
  },
]
