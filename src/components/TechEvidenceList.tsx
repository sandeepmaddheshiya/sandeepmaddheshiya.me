import Link from 'next/link'
import styles from './TechEvidenceList.module.css'

type TechItem = {
  name: string
  projects: { name: string; href: string }[]
  purpose?: string
}

export function TechEvidenceList({ items }: { items: TechItem[] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.name} className={styles.item}>
            <div className={styles.techName}>{item.name}</div>
            <div className={styles.usedIn}>
              <span className={styles.usedLabel}>Used in: </span>
              {item.projects.map((proj, idx) => (
                <span key={proj.href + idx}>
                  <Link href={proj.href} className={styles.projectLink}>
                    {proj.name}
                  </Link>
                  {idx < item.projects.length - 1 && ', '}
                </span>
              ))}
            </div>
            {item.purpose && <p className={styles.purpose}>{item.purpose}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
