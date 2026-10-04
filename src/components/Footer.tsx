import Link from 'next/link'
import { siteConfig } from '@content/site'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <span className={styles.footerName}>{siteConfig.name}</span>
          <span className={styles.footerTagline}>
            Building things, documenting what happens.
          </span>
        </div>

        <div className={styles.footerLinks}>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            GitHub
          </a>
          <span className={styles.footerDot}>·</span>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            LinkedIn
          </a>
          <span className={styles.footerDot}>·</span>
          <a
            href={`mailto:${siteConfig.links.email}`}
            className={styles.footerLink}
          >
            Email
          </a>
        </div>

        <p className={styles.copyright}>
          © {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  )
}
