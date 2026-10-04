import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjects } from '@/lib/content'
import { StatusLabel } from '@/components/StatusLabel'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import styles from './projects.module.css'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Things I\'ve built, am building, or tried building. Each project is documented with real process, decisions, and results.',
}

export default function ProjectsPage() {
  const projects = getProjects()
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
            { label: 'Projects', href: '/projects' },
          ]}
        />

        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>
          Things I&apos;ve built, am building, or tried building. Not a
          portfolio grid — an editorial list with process, decisions, and
          real results.
        </p>

        {sortedProjects.length > 0 ? (
          <div className={styles.list}>
            {sortedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={styles.entry}
              >
                <div className={styles.entryHeader}>
                  <h2 className={styles.entryName}>{project.name}</h2>
                  <StatusLabel status={project.status} />
                </div>
                <div className={styles.entryMeta}>
                  {project.startedAt && (
                    <span>
                      <span className={styles.label}>Started:</span>{' '}
                      {project.startedAt}
                    </span>
                  )}
                  {project.category.length > 0 && (
                    <span>
                      <span className={styles.label}>Category:</span>{' '}
                      {project.category.join(' / ')}
                    </span>
                  )}
                  {project.researchHours && (
                    <span>
                      <span className={styles.label}>Research:</span>{' '}
                      {project.researchHours} hours
                    </span>
                  )}
                  <span>
                    <span className={styles.label}>Traffic:</span>{' '}
                    {project.traffic?.value ?? '—'}
                  </span>
                  <span>
                    <span className={styles.label}>Revenue:</span>{' '}
                    {project.revenue?.value ?? '—'}
                  </span>
                  {project.technologies.length > 0 && (
                    <span>
                      <span className={styles.label}>Stack:</span>{' '}
                      {project.technologies.join(' / ')}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No projects yet. They&apos;ll show up here as I build them.</p>
          </div>
        )}
      </div>
    </div>
  )
}
