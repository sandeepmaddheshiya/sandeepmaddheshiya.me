import type { Metadata } from 'next'
import Link from 'next/link'
import { timeline } from '@content/timeline'
import { getProjects } from '@/lib/content'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import styles from './timeline.module.css'

export const metadata: Metadata = {
  title: 'Timeline — Builder History',
  description:
    'A chronological log of builds, launches, milestones, experiments, and lessons learned over time.',
}

const kindLabels: Record<string, { label: string; className: string }> = {
  launch: { label: 'LAUNCH', className: styles.kindLaunch },
  start: { label: 'STARTED', className: styles.kindStart },
  fail: { label: 'FAILED', className: styles.kindFail },
  learn: { label: 'LEARNED', className: styles.kindLearn },
  milestone: { label: 'MILESTONE', className: styles.kindMilestone },
}

export default function TimelinePage() {
  const projects = getProjects()

  // Group timeline events by year
  const grouped = timeline.reduce((acc, event) => {
    const year = event.date.split('-')[0] || 'Unknown'
    if (!acc[year]) acc[year] = []
    acc[year].push(event)
    return acc
  }, {} as Record<string, typeof timeline>)

  const sortedYears = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Timeline', href: '/timeline' },
          ]}
        />

        <div className={styles.header}>
          <h1 className={styles.title}>Timeline</h1>
          <p className={styles.subtitle}>
            A builder&apos;s chronological log, not a resume. Launches, starts,
            failures, and milestones recorded over time.
          </p>
        </div>

        <div className={styles.timelineContainer}>
          {sortedYears.map((year) => (
            <div key={year} className={styles.yearSection}>
              <div className={styles.yearHeader}>
                <span className={styles.yearText}>{year}</span>
              </div>

              <div className={styles.eventList}>
                {grouped[year].map((event, idx) => {
                  const meta = kindLabels[event.kind] || {
                    label: event.kind.toUpperCase(),
                    className: '',
                  }
                  const projectObj = event.project
                    ? projects.find((p) => p.slug === event.project)
                    : null

                  return (
                    <div key={idx} className={styles.eventCard}>
                      <div className={styles.eventMeta}>
                        <span className={styles.eventDate}>{event.date}</span>
                        <span className={`${styles.kindBadge} ${meta.className}`}>
                          {meta.label}
                        </span>
                      </div>

                      <h3 className={styles.eventTitle}>{event.title}</h3>

                      {event.note && (
                        <p className={styles.eventNote}>{event.note}</p>
                      )}

                      {projectObj && (
                        <div className={styles.projectLinkRow}>
                          <Link
                            href={`/projects/${projectObj.slug}`}
                            className={styles.projectLink}
                          >
                            View {projectObj.name} case study →
                          </Link>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
