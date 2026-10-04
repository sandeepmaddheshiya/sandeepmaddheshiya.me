import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getProjects,
  getProjectBySlug,
  getExperiments,
  getResearch,
  getWriting,
} from '@/lib/content'
import { StatusLabel } from '@/components/StatusLabel'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd, projectJsonLd } from '@/components/JsonLd'
import { MetaList, MetaRow } from '@/components/MetaList'
import { MDXContent } from '@/components/MDXContent'
import styles from './case-study.module.css'

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: `${project.name} — Case Study`,
    description:
      project.description && !project.description.startsWith('[')
        ? project.description
        : `Case study and build log for ${project.name}.`,
    openGraph: {
      title: `${project.name} — Sandeep Maddheshiya`,
      description: project.description,
      type: 'article',
    },
  }
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // Related content links
  const allExperiments = getExperiments()
  const allResearch = getResearch()
  const allWriting = getWriting()

  const relatedExperiments = allExperiments.filter(
    (e) => e.project === project.slug || project.experiments?.includes(e.slug)
  )
  const relatedResearch = allResearch.filter(
    (r) => r.project === project.slug || project.research?.includes(r.slug)
  )
  const relatedWriting = allWriting.filter(
    (w) => w.project === project.slug || project.writing?.includes(w.slug)
  )

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <div className="container">
      <JsonLd
        data={projectJsonLd({
          name: project.name,
          slug: project.slug,
          description: project.description,
          startedAt: project.startedAt,
          category: project.category,
          technologies: project.technologies,
          url: project.url,
        })}
      />

      <div className={styles.wrapper}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: project.name, href: `/projects/${project.slug}` },
          ]}
        />

        <div className={styles.layout}>
          {/* Main Article Content */}
          <article className={styles.mainContent}>
            <header className={styles.header}>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>{project.name}</h1>
                <StatusLabel status={project.status} />
              </div>
              {project.description && !project.description.startsWith('[') && (
                <p className={styles.lead}>{project.description}</p>
              )}
            </header>

            {/* Render case study MDX body */}
            <div className={styles.body}>
              <MDXContent source={project.content} />
            </div>

            {/* Related links section */}
            {(relatedExperiments.length > 0 ||
              relatedResearch.length > 0 ||
              relatedWriting.length > 0) && (
              <section className={styles.relatedSection}>
                <h3 className={styles.relatedTitle}>Related Logs & Notes</h3>
                <div className={styles.relatedGrid}>
                  {relatedExperiments.length > 0 && (
                    <div className={styles.relatedGroup}>
                      <span className={styles.groupLabel}>Experiments</span>
                      <ul>
                        {relatedExperiments.map((e) => (
                          <li key={e.slug}>
                            <Link href={`/experiments/${e.slug}`}>{e.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {relatedResearch.length > 0 && (
                    <div className={styles.relatedGroup}>
                      <span className={styles.groupLabel}>Research</span>
                      <ul>
                        {relatedResearch.map((r) => (
                          <li key={r.slug}>
                            <Link href={`/research/${r.slug}`}>{r.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {relatedWriting.length > 0 && (
                    <div className={styles.relatedGroup}>
                      <span className={styles.groupLabel}>Writing</span>
                      <ul>
                        {relatedWriting.map((w) => (
                          <li key={w.slug}>
                            <Link href={`/writing/${w.slug}`}>{w.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {isDev && (
              <div className={styles.devNote}>
                <strong>DEV NOTE:</strong> Sections with <code>[Add project details]</code> are placeholders. Update <code>content/projects/{project.slug}.mdx</code> with real details.
              </div>
            )}
          </article>

          {/* Sticky Meta Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h2 className={styles.sidebarTitle}>Project Metadata</h2>
              <MetaList>
                <MetaRow label="Status" value={<StatusLabel status={project.status} />} />
                <MetaRow label="Started" value={project.startedAt || '—'} />
                <MetaRow label="Updated" value={project.updatedAt || '—'} />
                {project.category.length > 0 && (
                  <MetaRow label="Category" value={project.category.join(' / ')} />
                )}
                {project.technologies.length > 0 && (
                  <MetaRow label="Stack" value={project.technologies.join(', ')} />
                )}
                {project.researchHours && (
                  <MetaRow label="Research" value={`${project.researchHours} hrs`} />
                )}
                {project.showMetrics?.traffic && (
                  <MetaRow label="Traffic" value={project.traffic?.value ?? '—'} />
                )}
                {project.showMetrics?.revenue && (
                  <MetaRow label="Revenue" value={project.revenue?.value ?? '—'} />
                )}
                {project.url && (
                  <MetaRow
                    label="Live URL"
                    value={
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        Visit site ↗
                      </a>
                    }
                  />
                )}
                {project.github && (
                  <MetaRow
                    label="GitHub"
                    value={
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        Source ↗
                      </a>
                    }
                  />
                )}
              </MetaList>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
