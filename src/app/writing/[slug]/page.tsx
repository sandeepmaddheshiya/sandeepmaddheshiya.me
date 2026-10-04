import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getWriting, getWritingBySlug, getProjectBySlug, estimateReadingTime } from '@/lib/content'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd, articleJsonLd } from '@/components/JsonLd'
import { MDXContent } from '@/components/MDXContent'
import styles from './writing-post.module.css'

export async function generateStaticParams() {
  const writing = getWriting()
  return writing.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getWritingBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
    },
  }
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getWritingBySlug(slug)

  if (!post) {
    notFound()
  }

  const project = post.project ? getProjectBySlug(post.project) : null
  const readTime = estimateReadingTime(post.content)

  return (
    <div className="container">
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          slug: post.slug,
          date: post.date,
          updated: post.updated,
          description: post.summary,
          section: 'writing',
        })}
      />

      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Writing', href: '/writing' },
            { label: post.title, href: `/writing/${post.slug}` },
          ]}
        />

        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.metaRow}>
              <span className={styles.date}>{post.date}</span>
              {post.updated && (
                <span className={styles.updated}>(Updated: {post.updated})</span>
              )}
              <span className={styles.separator}>·</span>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.separator}>·</span>
              <span className={styles.readTime}>{readTime} min read</span>
            </div>

            <h1 className={styles.title}>{post.title}</h1>

            {project && (
              <p className={styles.projectContext}>
                Related project:{' '}
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
              </p>
            )}

            <p className={styles.lead}>{post.summary}</p>
          </header>

          <div className={styles.body}>
            <MDXContent source={post.content} />
          </div>
        </article>
      </div>
    </div>
  )
}
