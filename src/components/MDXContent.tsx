import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import styles from './MDXContent.module.css'

const components = {
  a: ({ href = '', children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },
  Callout: ({
    type = 'note',
    children,
  }: {
    type?: 'note' | 'warning' | 'tip'
    children: React.ReactNode
  }) => (
    <div className={`${styles.callout} ${styles[type]}`}>
      <div className={styles.calloutContent}>{children}</div>
    </div>
  ),
}

export function MDXContent({ source }: { source: string }) {
  if (!source || source.trim() === '') {
    return null
  }

  return (
    <div className={styles.prose}>
      <MDXRemote source={source} components={components} />
    </div>
  )
}
