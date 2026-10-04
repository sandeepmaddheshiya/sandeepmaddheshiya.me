import type { Metadata } from 'next'
import Link from 'next/link'
import { getFailedProjects } from '@/lib/content'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { EmptyState } from '@/components/EmptyState'
import styles from './failed-projects.module.css'

export const metadata: Metadata = {
  title: 'Failed Projects & Post-Mortems',
  description:
    'Post-mortems of projects that failed, shut down, or were abandoned. Blunt breakdowns of what went wrong and lessons learned.',
}

export default function FailedProjectsPage() {
  const failures = getFailedProjects()

  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Failed Projects', href: '/failed-projects' },
          ]}
        />

        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Failed Projects & Post-Mortems</h1>
            <span className={styles.countBadge}>
              Archived: {failures.length}
            </span>
          </div>
          <p className={styles.subtitle}>
            Projects that did not work out. I shut them down, abandoned them, or
            pivoted. Documenting failures is more useful than hiding them — it
            prevents repeating the same bad assumptions.
          </p>
        </div>

        {failures.length > 0 ? (
          <div className={styles.list}>
            {failures.map((f) => (
              <div key={f.slug} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div className={styles.entryTitleRow}>
                    <h2 className={styles.name}>{f.name}</h2>
                    <span className={styles.failedTag}>FAILED</span>
                  </div>
                  <div className={styles.metaRow}>
                    <span>Started: {f.startedAt}</span>
                    {f.stoppedAt && <span>Stopped: {f.stoppedAt}</span>}
                    {f.timeSpent && <span>Time invested: {f.timeSpent}</span>}
                  </div>
                </div>

                <div className={styles.breakdown}>
                  <div className={styles.point}>
                    <span className={styles.pointLabel}>What I built</span>
                    <p className={styles.pointText}>{f.description}</p>
                  </div>

                  <div className={styles.point}>
                    <span className={styles.pointLabel}>Why I thought it would work</span>
                    <p className={styles.pointText}>{f.whyIThoughtItWouldWork}</p>
                  </div>

                  <div className={styles.point}>
                    <span className={styles.pointLabel}>What I expected</span>
                    <p className={styles.pointText}>{f.whatIExpected}</p>
                  </div>

                  <div className={styles.point}>
                    <span className={styles.pointLabel}>What actually happened</span>
                    <p className={styles.pointText}>{f.whatActuallyHappened}</p>
                  </div>

                  <div className={styles.point}>
                    <span className={styles.pointLabel}>Why I stopped</span>
                    <p className={styles.pointText}>{f.whyIStopped}</p>
                  </div>

                  <div className={`${styles.point} ${styles.learnedPoint}`}>
                    <span className={styles.pointLabel}>What I learned</span>
                    <p className={styles.pointText}>{f.whatILearned}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No failed projects documented yet"
            description="When a project fails or is abandoned, an honest, structured post-mortem will be published here."
            devNote="Add .mdx files to content/failed-projects/ with fields (name, slug, description, whyIThoughtItWouldWork, whatIExpected, whatActuallyHappened, whyIStopped, whatILearned, startedAt, stoppedAt, timeSpent)."
          />
        )}
      </div>
    </div>
  )
}
