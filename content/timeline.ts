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
    note: 'First version of the site. Built from scratch.',
  },
  {
    date: '2026',
    title: 'Started building VisaReadyNow',
    kind: 'start',
    project: 'visareadynow',
    note: 'SaaS product for visa photo processing.',
  },
  // [Add more events as they happen]
]
