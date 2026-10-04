import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className="container">
      <div className={styles.page}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.desc}>
          The page you are looking for doesn&apos;t exist or was moved.
        </p>

        <div className={styles.linksBlock}>
          <p className={styles.linksTitle}>Useful starting points:</p>
          <ul className={styles.linksList}>
            <li>
              <Link href="/">Homepage & Dashboard →</Link>
            </li>
            <li>
              <Link href="/projects">Project Archive →</Link>
            </li>
            <li>
              <Link href="/experiments">Experiment Notebook →</Link>
            </li>
            <li>
              <Link href="/writing">Notes from Building →</Link>
            </li>
            <li>
              <Link href="/about">About & Tech Stack →</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
