import type { Metadata } from 'next'
import Link from 'next/link'
import { getResearch, getProjectBySlug } from '@/lib/content'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { EmptyState } from '@/components/EmptyState'
import styles from './research.module.css'

export const metadata: Metadata = {
  title: 'Pre-Build Research',
  description:
    'Investigation notes before writing code: niche viability, search volume, competitor gaps, and technical constraints.',
}

export default function ResearchPage() {
  const research = getResearch()

  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Research', href: '/research' },
          ]}
        />

        <div className={styles.header}>
          <h1 className={styles.title}>Pre-Build Research</h1>
          <p className={styles.subtitle}>
            Notes and investigations conducted before committing time to code.
            Search demand, competitor teardowns, technical feasibility, and
            market observations.
          </p>
        </div>

        {research.length > 0 ? (
          <div className={styles.list}>
            {research.map((item) => {
              const project = item.project ? getProjectBySlug(item.project) : null

              return (
                <Link
                  key={item.slug}
                  href={`/research/${item.slug}`}
                  className={styles.entry}
                >
                  <div className={styles.entryTop}>
                    <span className={styles.date}>{item.date}</span>
                    <span className={styles.typeBadge}>{item.type}</span>
                  </div>

                  <h2 className={styles.entryTitle}>{item.title}</h2>
                  <p className={styles.summary}>{item.summary}</p>

                  <div className={styles.entryMeta}>
                    {item.hoursSpent && (
                      <span className={styles.metaItem}>
                        Time spent: {item.hoursSpent} hrs
                      </span>
                    )}
                    {item.outcome && (
                      <span className={styles.metaItem}>
                        Outcome: <span className={styles.outcomeTag}>{item.outcome}</span>
                      </span>
                    )}
                    {project && (
                      <span className={styles.metaItem}>
                        Project: {project.name}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <EmptyState
            title="No research notes logged yet"
            description="Pre-build investigations will be published here as they are documented."
            devNote="Add an .mdx file to content/research/ with front matter (title, slug, date, type, summary, hoursSpent, outcome, project)."
          />
        )}
      </div>
    </div>
  )
}
