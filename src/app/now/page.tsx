import type { Metadata } from 'next'
import { getNowContent } from '@/lib/content'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MDXContent } from '@/components/MDXContent'
import { EmptyState } from '@/components/EmptyState'
import styles from './now.module.css'

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What I am currently focused on, building, learning, and deliberately ignoring right now.',
}

export default function NowPage() {
  const nowData = getNowContent()

  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Now', href: '/now' },
          ]}
        />

        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>What I&apos;m Doing Now</h1>
            {nowData?.lastUpdated && (
              <span className={styles.updatedBadge}>
                Last updated: {nowData.lastUpdated}
              </span>
            )}
          </div>
          <p className={styles.subtitle}>
            A public declaration of current priorities, inspired by Derek Sivers&apos; now page movement.
          </p>
        </div>

        {nowData?.content ? (
          <div className={styles.body}>
            <MDXContent source={nowData.content} />
          </div>
        ) : (
          <EmptyState
            title="Now page not initialized"
            description="Create content/now.mdx to display current focuses and priorities."
          />
        )}
      </div>
    </div>
  )
}
