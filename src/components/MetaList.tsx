import styles from './MetaList.module.css'

export function MetaRow({
  label,
  value,
  children,
}: {
  label: string
  value?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{value ?? children}</span>
    </div>
  )
}

export function MetaList({ children }: { children: React.ReactNode }) {
  return <div className={styles.list}>{children}</div>
}
