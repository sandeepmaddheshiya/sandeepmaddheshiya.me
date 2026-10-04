import type { Metadata } from 'next'
import Link from 'next/link'
import { getWriting, estimateReadingTime } from '@/lib/content'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { EmptyState } from '@/components/EmptyState'
import styles from './writing.module.css'

export const metadata: Metadata = {
  title: 'Writing — Notes from Building Things',
  description:
    'Notes from building things: practical observations on SEO, SaaS economics, software engineering, and things that worked or broke.',
}

export default function WritingPage() {
  const posts = getWriting()

  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Writing', href: '/writing' },
          ]}
        />

        <div className={styles.header}>
          <h1 className={styles.title}>Notes from building things</h1>
          <p className={styles.subtitle}>
            Working notes, field reports, and technical teardowns. Not thought leadership — practical observations from shipping code and running experiments.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className={styles.list}>
            {posts.map((post) => {
              const readTime = estimateReadingTime(post.content)

              return (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className={styles.entry}
                >
                  <div className={styles.metaRow}>
                    <span className={styles.date}>{post.date}</span>
                    <span className={styles.separator}>·</span>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.separator}>·</span>
                    <span className={styles.readTime}>{readTime} min read</span>
                  </div>

                  <h2 className={styles.entryTitle}>{post.title}</h2>
                  <p className={styles.summary}>{post.summary}</p>
                </Link>
              )
            })}
          </div>
        ) : (
          <EmptyState
            title="No notes published yet"
            description="Notes and technical write-ups will appear here as they are written."
            devNote="Add an .mdx file to content/writing/ with front matter (title, slug, date, category, summary)."
          />
        )}
      </div>
    </div>
  )
}
