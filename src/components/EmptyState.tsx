import styles from './EmptyState.module.css'

export function EmptyState({
  title,
  description,
  devNote,
}: {
  title: string
  description?: string
  devNote?: string
}) {
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <div className={styles.empty}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
