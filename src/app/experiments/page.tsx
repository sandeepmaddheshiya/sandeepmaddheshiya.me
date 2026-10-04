import type { Metadata } from 'next'
import Link from 'next/link'
import { getExperiments } from '@/lib/content'
import { OutcomeMarker } from '@/components/OutcomeMarker'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { EmptyState } from '@/components/EmptyState'
import styles from './experiments.module.css'

export const metadata: Metadata = {
  title: 'Experiments',
  description:
    'Lab notebook of small, data-driven experiments. Hypotheses, changes, expected vs. actual outcomes, and conclusions.',
}

export default function ExperimentsPage() {
  const experiments = getExperiments()

  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Experiments', href: '/experiments' },
          ]}
        />

        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Experiments</h1>
            <span className={styles.countBadge}>
              Experiments logged: {experiments.length}
            </span>
          </div>
          <p className={styles.subtitle}>
            A living lab notebook. I formulate a hypothesis, make a single
            change, record the result, and draw a conclusion. Documented
            regardless of whether it worked.
          </p>
        </div>

        {experiments.length > 0 ? (
          <div className={styles.list}>
            {experiments.map((exp) => (
              <Link
                key={exp.slug}
                href={`/experiments/${exp.slug}`}
                className={styles.entry}
              >
                <div className={styles.entryTop}>
                  <span className={styles.date}>{exp.date}</span>
                  <OutcomeMarker outcome={exp.outcome} />
                </div>

                <h2 className={styles.entryTitle}>{exp.title}</h2>

                <div className={styles.flow}>
                  <div className={styles.flowStep}>
                    <span className={styles.stepLabel}>Hypothesis:</span>
                    <span className={styles.stepText}>{exp.hypothesis}</span>
                  </div>
                  <div className={styles.flowStep}>
                    <span className={styles.stepLabel}>Conclusion:</span>
                    <span className={styles.stepText}>{exp.conclusion}</span>
                  </div>
                </div>

                {exp.tags.length > 0 && (
                  <div className={styles.tags}>
                    {exp.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No experiments logged yet"
            description="Experiments will appear here as they are conducted."
            devNote="Add an .mdx file to content/experiments/ with front matter (hypothesis, change, expected, actual, conclusion, outcome)."
          />
        )}
      </div>
    </div>
  )
}
