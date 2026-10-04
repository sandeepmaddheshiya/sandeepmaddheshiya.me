import styles from './Chart.module.css'

type DataPoint = {
  label: string
  before?: number
  after?: number
  unit?: string
}

export function ComparisonChart({
  title,
  data,
}: {
  title?: string
  data: DataPoint[]
}) {
  if (!data || data.length === 0) return null

  return (
    <div className={styles.chartWrapper}>
      {title && <h4 className={styles.chartTitle}>{title}</h4>}
      <div className={styles.comparisonGrid}>
        {data.map((item) => {
          const before = item.before ?? 0
          const after = item.after ?? 0
          const max = Math.max(before, after, 1)
          const beforePct = (before / max) * 100
          const afterPct = (after / max) * 100
          const diff = after - before
          const diffPct = before !== 0 ? Math.round((diff / before) * 100) : null

          return (
            <div key={item.label} className={styles.compRow}>
              <div className={styles.labelRow}>
                <span className={styles.metricName}>{item.label}</span>
                {diffPct !== null && (
                  <span
                    className={`${styles.diffTag} ${
                      diff > 0 ? styles.positive : diff < 0 ? styles.negative : ''
                    }`}
                  >
                    {diff > 0 ? `+${diffPct}%` : `${diffPct}%`}
                  </span>
                )}
              </div>

              <div className={styles.barGroup}>
                {item.before !== undefined && (
                  <div className={styles.barRow}>
                    <span className={styles.barLabel}>Before</span>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${styles.beforeFill}`}
                        style={{ width: `${Math.max(beforePct, 2)}%` }}
                      />
                    </div>
                    <span className={styles.barValue}>
                      {item.before}
                      {item.unit || ''}
                    </span>
                  </div>
                )}

                {item.after !== undefined && (
                  <div className={styles.barRow}>
                    <span className={styles.barLabel}>After</span>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${styles.afterFill}`}
                        style={{ width: `${Math.max(afterPct, 2)}%` }}
                      />
                    </div>
                    <span className={styles.barValue}>
                      {item.after}
                      {item.unit || ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
