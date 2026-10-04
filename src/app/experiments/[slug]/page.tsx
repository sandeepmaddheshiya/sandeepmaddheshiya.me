import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getExperiments, getExperimentBySlug, getProjectBySlug } from '@/lib/content'
import { OutcomeMarker } from '@/components/OutcomeMarker'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd, articleJsonLd } from '@/components/JsonLd'
import { ComparisonChart } from '@/components/Chart'
import { MDXContent } from '@/components/MDXContent'
import styles from './experiment.module.css'

export async function generateStaticParams() {
  const experiments = getExperiments()
  return experiments.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const exp = getExperimentBySlug(slug)
  if (!exp) return {}

  return {
    title: `${exp.title} — Experiment Log`,
    description: `Hypothesis: ${exp.hypothesis} Result: ${exp.conclusion}`,
  }
}

export default async function ExperimentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const exp = getExperimentBySlug(slug)

  if (!exp) {
    notFound()
  }

  const project = exp.project ? getProjectBySlug(exp.project) : null

  return (
    <div className="container">
      <JsonLd
        data={articleJsonLd({
          title: exp.title,
          slug: exp.slug,
          date: exp.date,
          description: exp.conclusion,
          section: 'experiments',
        })}
      />

      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Experiments', href: '/experiments' },
            { label: exp.title, href: `/experiments/${exp.slug}` },
          ]}
        />

        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.metaRow}>
              <span className={styles.date}>{exp.date}</span>
              <OutcomeMarker outcome={exp.outcome} />
            </div>

            <h1 className={styles.title}>{exp.title}</h1>

            {project && (
              <p className={styles.projectLink}>
                Project:{' '}
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
              </p>
            )}

            {exp.tags.length > 0 && (
              <div className={styles.tags}>
                {exp.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Structured Lab Notebook Block */}
          <div className={styles.notebook}>
            <div className={styles.gridItem}>
              <span className={styles.stepTitle}>1. Hypothesis</span>
              <p className={styles.stepContent}>{exp.hypothesis}</p>
            </div>

            <div className={styles.gridItem}>
              <span className={styles.stepTitle}>2. Change Made</span>
              <p className={styles.stepContent}>{exp.change}</p>
            </div>

            <div className={styles.gridItem}>
              <span className={styles.stepTitle}>3. Expected Result</span>
              <p className={styles.stepContent}>{exp.expected}</p>
            </div>

            <div className={styles.gridItem}>
              <span className={styles.stepTitle}>4. Actual Result</span>
              <p className={styles.stepContent}>{exp.actual}</p>
            </div>

            <div className={`${styles.gridItem} ${styles.conclusionItem}`}>
              <span className={styles.stepTitle}>5. Conclusion & Takeaway</span>
              <p className={styles.stepContent}>{exp.conclusion}</p>
            </div>
          </div>

          {/* Data diff / Comparison Chart if provided */}
          {exp.data && exp.data.length > 0 && (
            <ComparisonChart title="Data & Impact" data={exp.data} />
          )}

          {/* Extended MDX body if provided */}
          {exp.content && exp.content.trim() !== '' && (
            <div className={styles.notes}>
              <h3 className={styles.notesTitle}>Detailed Notes & Context</h3>
              <MDXContent source={exp.content} />
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
