import styles from './StatusLabel.module.css'

type StatusType =
  | 'building'
  | 'growing'
  | 'experiment'
  | 'paused'
  | 'shipped'
  | 'abandoned'
  | 'failed'

const statusLabels: Record<StatusType, string> = {
  building: 'BUILDING',
  growing: 'GROWING',
  experiment: 'EXPERIMENT',
  paused: 'PAUSED',
  shipped: 'SHIPPED',
  abandoned: 'ABANDONED',
  failed: 'FAILED',
}

export function StatusLabel({ status }: { status: StatusType }) {
  return (
    <span className={`${styles.status} ${styles[status]}`}>
      {statusLabels[status]}
    </span>
  )
}
