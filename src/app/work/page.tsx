import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjects, getExperiments, getResearch, getFailedProjects } from '@/lib/content'
import { StatusLabel } from '@/components/StatusLabel'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import styles from './work.module.css'

export const metadata: Metadata = {
  title: 'Work Overview',
  description:
    'Overview of building streams: active software projects, pre-build research, lab experiments, and post-mortems.',
}

export default function WorkHubPage() {
  const projects = getProjects()
  const experiments = getExperiments()
  const research = getResearch()
  const failures = getFailedProjects()

  const prioritySlugs = ['pawvalid', 'visareadynow', 'photoresizer']
  const sortedProjects = [
    ...prioritySlugs
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    ...projects.filter((p) => !prioritySlugs.includes(p.slug)),
  ]

  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Work', href: '/work' },
          ]}
        />

        <h1 className={styles.title}>Work Streams</h1>
        <p className={styles.subtitle}>
          Everything built, tested, or investigated. Explore by stream:
        </p>

        <div className={styles.grid}>
          {/* Projects Archive */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Projects</h2>
              <span className={styles.cardCount}>{projects.length} documented</span>
            </div>
            <p className={styles.cardDesc}>
              Products and software tools built or in progress. Detailed case studies with architecture, SEO, and real metrics.
            </p>
            <Link href="/projects" className={styles.cardLink}>
              View project archive →
            </Link>
          </div>

          {/* Experiments */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Experiments</h2>
              <span className={styles.cardCount}>{experiments.length} logged</span>
            </div>
            <p className={styles.cardDesc}>
              Lab notebook entries: hypotheses, changes made, expected vs. actual outcomes across SEO, performance, and CRO.
            </p>
            <Link href="/experiments" className={styles.cardLink}>
              View experiment logs →
            </Link>
          </div>

          {/* Pre-build Research */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Research</h2>
              <span className={styles.cardCount}>{research.length} notes</span>
            </div>
            <p className={styles.cardDesc}>
              Pre-build investigation notes: niche analysis, search demand, technical feasibility, and competitor teardowns.
            </p>
            <Link href="/research" className={styles.cardLink}>
              Explore research notes →
            </Link>
          </div>

          {/* Failed Projects */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Failed Projects</h2>
              <span className={styles.cardCount}>{failures.length} archived</span>
            </div>
            <p className={styles.cardDesc}>
              Blunt post-mortems of projects that were shut down or abandoned. What was expected vs. what went wrong.
            </p>
            <Link href="/failed-projects" className={styles.cardLink}>
              View failure archive →
            </Link>
          </div>
        </div>

        {/* Quick look at active projects */}
        <div className={styles.activeSection}>
          <h3 className={styles.activeSectionTitle}>Active Projects</h3>
          <div className={styles.activeList}>
            {sortedProjects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className={styles.activeRow}>
                <span className={styles.activeName}>{p.name}</span>
                <span className={styles.activeMeta}>
                  <StatusLabel status={p.status} />
                  {p.category.length > 0 && <span>{p.category.join(' / ')}</span>}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
