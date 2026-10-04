import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getResearch, getResearchBySlug, getProjectBySlug } from '@/lib/content'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd, articleJsonLd } from '@/components/JsonLd'
import { MDXContent } from '@/components/MDXContent'
import styles from './research-note.module.css'

export async function generateStaticParams() {
  const research = getResearch()
  return research.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getResearchBySlug(slug)
  if (!item) return {}

  return {
    title: `${item.title} — Research Note`,
    description: item.summary,
  }
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getResearchBySlug(slug)

  if (!item) {
    notFound()
  }

  const project = item.project ? getProjectBySlug(item.project) : null

  return (
    <div className="container">
      <JsonLd
        data={articleJsonLd({
          title: item.title,
          slug: item.slug,
          date: item.date,
          description: item.summary,
          section: 'research',
        })}
      />

      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Research', href: '/research' },
            { label: item.title, href: `/research/${item.slug}` },
          ]}
        />

        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.metaRow}>
              <span className={styles.date}>{item.date}</span>
              <span className={styles.typeBadge}>{item.type}</span>
            </div>

            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.lead}>{item.summary}</p>

            <div className={styles.metaBlock}>
              {item.hoursSpent && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Investigation Time</span>
                  <span className={styles.metaValue}>{item.hoursSpent} hours</span>
                </div>
              )}
              {item.outcome && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Build Decision</span>
                  <span className={styles.metaValue}>{item.outcome}</span>
                </div>
              )}
              {project && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Target Project</span>
                  <Link href={`/projects/${project.slug}`} className={styles.projectLink}>
                    {project.name} →
                  </Link>
                </div>
              )}
            </div>
          </header>

          <div className={styles.body}>
            <MDXContent source={item.content} />
          </div>
        </article>
      </div>
    </div>
  )
}
