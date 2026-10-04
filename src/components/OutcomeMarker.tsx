import styles from './OutcomeMarker.module.css'

type Outcome = 'worked' | 'failed' | 'inconclusive'

const outcomeLabels: Record<Outcome, string> = {
  worked: 'WORKED',
  failed: "DIDN'T WORK",
  inconclusive: 'INCONCLUSIVE',
}

export function OutcomeMarker({ outcome }: { outcome: Outcome }) {
  return (
    <span className={`${styles.outcome} ${styles[outcome]}`}>
      {outcomeLabels[outcome]}
    </span>
  )
}
