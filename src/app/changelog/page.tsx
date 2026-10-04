import type { Metadata } from 'next'
import { changelog } from '@content/changelog'
import { siteConfig } from '@content/site'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import styles from './changelog.module.css'

export const metadata: Metadata = {
  title: 'Site Changelog',
  description:
    'Documenting the technical iterations, redesigns, and updates made to sandeepmaddheshiya.me.',
}

export default function ChangelogPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Changelog', href: '/changelog' },
          ]}
        />

        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Site Changelog</h1>
            <div className={styles.versionBadges}>
              <span className={styles.badge}>v{siteConfig.version}</span>
              <span className={styles.badge}>Redesigned: {siteConfig.lastRedesigned}</span>
            </div>
          </div>
          <p className={styles.subtitle}>
            A record of changes to this portfolio site itself. New sections, performance tweaks, schema improvements, and feature updates.
          </p>
        </div>

        <div className={styles.list}>
          {changelog.map((entry, index) => (
            <div key={index} className={styles.entry}>
              <div className={styles.entryMeta}>
                <span className={styles.date}>{entry.date}</span>
                {entry.version && (
                  <span className={styles.versionTag}>v{entry.version}</span>
                )}
              </div>
              <h2 className={styles.entryTitle}>{entry.title}</h2>
              {entry.description && (
                <p className={styles.description}>{entry.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
