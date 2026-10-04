import Link from 'next/link'
import { getProjects, getExperiments, getComputedMetrics } from '@/lib/content'
import { metrics as globalMetrics } from '@content/metrics'
import { siteConfig } from '@content/site'
import { StatusLabel } from '@/components/StatusLabel'
import { OutcomeMarker } from '@/components/OutcomeMarker'
import { MetricsBlock } from '@/components/MetricsBlock'
import { EmptyState } from '@/components/EmptyState'
import styles from './page.module.css'

export default function HomePage() {
  const projects = getProjects()
  const experiments = getExperiments()
  const computed = getComputedMetrics()
  const activeProjects = projects.filter(
    (p) =>
      p.status === 'building' ||
      p.status === 'growing' ||
      p.status === 'experiment'
  )

  // Merge computed values into global metrics
  const mergedMetrics = globalMetrics.map((m) => {
    if (m.key === 'projects_shipped')
      return { ...m, value: computed.projects_shipped || m.value }
    if (m.key === 'experiments_run')
      return { ...m, value: computed.experiments_run || m.value }
    if (m.key === 'research_hours')
      return { ...m, value: computed.research_hours ?? m.value }
    return m
  })

  const obsessions = [
    'programmatic SEO',
    'micro-SaaS economics',
    'AI image processing',
    'build-in-public',
    'conversion experiments',
    'Next.js internals',
  ]

  return (
    <div className={styles.page}>
      {/* 1. Name + positioning */}
      <section className={styles.hero}>
        <h1 className={styles.name}>{siteConfig.name}</h1>
        <p className={styles.positioning}>
          I build small things on the internet and keep track of what happens.
          What worked, what didn&apos;t, and what I was wrong about.
        </p>
        <p className={styles.role}>Developer · Builder · Experimenter</p>
      </section>

      {/* 2. Status strip */}
      <div className={styles.statusStrip}>
        {activeProjects.length > 0 && (
          <div className={styles.statusItem}>
            <span>Currently building</span>
            <span className={styles.statusArrow}>→</span>
            <Link href={`/projects/${activeProjects[0].slug}`}>
              {activeProjects[0].name}
            </Link>
          </div>
        )}
        {experiments.length > 0 && (
          <div className={styles.statusItem}>
            <span>Latest experiment</span>
            <span className={styles.statusArrow}>→</span>
            <Link href={`/experiments/${experiments[0].slug}`}>
              {experiments[0].title}
            </Link>
          </div>
        )}
        {experiments.length === 0 && activeProjects.length === 0 && (
          <div className={styles.statusItem}>
            <span>Setting things up. Content incoming.</span>
          </div>
        )}
      </div>

      {/* 3. Currently Building */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Currently Building</h2>
          <Link href="/projects" className={styles.sectionLink}>
            All projects →
          </Link>
        </div>

        {activeProjects.length > 0 ? (
          <div className={styles.projectCards}>
            {activeProjects.slice(0, 3).map((project) => (
              <div key={project.slug} className={styles.projectCard}>
                <div className={styles.projectCardHeader}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.projectCardName}
                  >
                    {project.name}
                  </Link>
                  <StatusLabel status={project.status} />
                </div>
                <p className={styles.projectCardDesc}>
                  {project.description}
                </p>
                <div className={styles.projectCardMeta}>
                  {project.category.length > 0 && (
                    <span>
                      <span className={styles.metaLabel}>Category: </span>
                      <span className={styles.metaValue}>
                        {project.category.join(' / ')}
                      </span>
                    </span>
                  )}
                  {project.startedAt && (
                    <span>
                      <span className={styles.metaLabel}>Started: </span>
                      <span className={styles.metaValue}>
                        {project.startedAt}
                      </span>
                    </span>
                  )}
                  {project.technologies.length > 0 && (
                    <span>
                      <span className={styles.metaLabel}>Stack: </span>
                      <span className={styles.metaValue}>
                        {project.technologies.join(' / ')}
                      </span>
                    </span>
                  )}
                </div>
                {project.currentGoal &&
                  !project.currentGoal.startsWith('[') && (
                    <p className={styles.projectCardGoal}>
                      Goal: {project.currentGoal}
                    </p>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No active projects yet"
            devNote="Add a project with status 'building' in content/projects/"
          />
        )}
      </section>

      {/* 4. Recent Experiments */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Experiments</h2>
          <Link href="/experiments" className={styles.sectionLink}>
            All experiments →
          </Link>
        </div>

        {experiments.length > 0 ? (
          <div className={styles.experimentList}>
            {experiments.slice(0, 5).map((exp) => (
              <Link
                key={exp.slug}
                href={`/experiments/${exp.slug}`}
                className={styles.experimentEntry}
              >
                <span className={styles.experimentDate}>{exp.date}</span>
                <div className={styles.experimentContent}>
                  <span className={styles.experimentTitle}>{exp.title}</span>
                  <span className={styles.experimentResult}>
                    {exp.hypothesis} → {exp.conclusion}
                  </span>
                </div>
                <OutcomeMarker outcome={exp.outcome} />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No experiments logged yet"
            description="Experiments will show up here as they're documented."
            devNote="Create an .mdx file in content/experiments/ with hypothesis, change, expected, actual, conclusion fields."
          />
        )}
      </section>

      {/* 5. Projects (editorial list) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Projects</h2>
        </div>

        {projects.length > 0 ? (
          <div className={styles.projectList}>
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={styles.projectRow}
              >
                <div className={styles.projectRowName}>{project.name}</div>
                <div className={styles.projectRowMeta}>
                  <span>
                    <span className={styles.metaLabel}>Status: </span>
                    <StatusLabel status={project.status} />
                  </span>
                  {project.startedAt && (
                    <span>
                      <span className={styles.metaLabel}>Started: </span>
                      <span className={styles.metaValue}>
                        {project.startedAt}
                      </span>
                    </span>
                  )}
                  {project.category.length > 0 && (
                    <span>
                      <span className={styles.metaLabel}>Category: </span>
                      <span className={styles.metaValue}>
                        {project.category.join(' / ')}
                      </span>
                    </span>
                  )}
                  {project.researchHours && (
                    <span>
                      <span className={styles.metaLabel}>Research: </span>
                      <span className={styles.metaValue}>
                        {project.researchHours} hours
                      </span>
                    </span>
                  )}
                  <span>
                    <span className={styles.metaLabel}>Traffic: </span>
                    <span className={styles.metaValue}>
                      {project.traffic?.value ?? '—'}
                    </span>
                  </span>
                  <span>
                    <span className={styles.metaLabel}>Revenue: </span>
                    <span className={styles.metaValue}>
                      {project.revenue?.value ?? '—'}
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No projects yet"
            devNote="Add .mdx files in content/projects/"
          />
        )}
      </section>

      {/* 6. Numbers */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Numbers</h2>
        </div>
        <div className={styles.numbersSection}>
          <MetricsBlock
            metrics={mergedMetrics.map((m) => ({
              label: m.label,
              value: m.value,
              note: m.note,
            }))}
          />
        </div>
      </section>

      {/* 7. Currently obsessed with */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Currently obsessed with…</h2>
        </div>
        <ul className={styles.obsessedList}>
          {obsessions.map((item) => (
            <li key={item} className={styles.obsessedItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Site meta */}
      <div className={styles.siteMeta}>
        <span>Last updated: {siteConfig.lastRedesigned}</span>
        <span>Experiments logged: {experiments.length}</span>
        <span>Site v{siteConfig.version}</span>
        <Link href="/changelog">Changelog</Link>
      </div>

      {/* 9. Closing */}
      <section className={styles.closing}>
        <p className={styles.closingText}>
          If you got this far, you might find something useful in the{' '}
          <Link href="/experiments">experiment logs</Link> or the{' '}
          <Link href="/projects">project case studies</Link>. I document
          things as they happen — not after they succeed.
        </p>
        <div className={styles.closingLinks}>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  )
}
