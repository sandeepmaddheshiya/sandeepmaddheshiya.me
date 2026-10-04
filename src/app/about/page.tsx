import type { Metadata } from 'next'
import Link from 'next/link'
import { getTechEvidenceMap } from '@/lib/content'
import { siteConfig } from '@content/site'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TechEvidenceList } from '@/components/TechEvidenceList'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Sandeep Maddheshiya: background, approach to building software, and real technical experience verified through active projects.',
}

export default function AboutPage() {
  const techMap = getTechEvidenceMap()
  const techItems = Object.entries(techMap).map(([name, projects]) => ({
    name,
    projects,
  }))

  return (
    <div className="container">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
          ]}
        />

        <header className={styles.header}>
          <h1 className={styles.title}>About Sandeep Maddheshiya</h1>
          <p className={styles.lead}>
            Developer, builder, and experimenter based in India. I focus on internet products, micro-SaaS, programmatic SEO, and backend automation.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Background</h2>
          <div className={styles.prose}>
            <p>
              I work as a Software Developer at Collegedunia, building production web systems and backend services. Earlier in 2024, I spent a brief period at Mobiloitte in Pune.
            </p>
            <p>
              My first production mobile product was <Link href="/failed-projects">Resourcify</Link>, an ad-free educational utility for college semester exam preparation that reached 1,000+ organic downloads on the Google Play Store before being retired. Currently, I&apos;m focused on building <Link href="/projects/visareadynow">VisaReadyNow</Link> and documenting experiments in web performance and programmatic SEO.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>How I Approach Projects</h2>
          <div className={styles.prose}>
            <p>
              I prefer shipping functional, focused utilities rather than complex platforms. Before writing production code, I usually spend time researching keyword volumes, SERP competitiveness, and the actual economics of the problem.
            </p>
            <p>
              My process follows a straightforward loop: <code>BUILD → EXPERIMENT → MEASURE → LEARN</code>. When an assumption is wrong, I document the post-mortem in the <Link href="/failed-projects">failure archive</Link> or <Link href="/experiments">experiment logs</Link>.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>What Interests Me</h2>
          <div className={styles.prose}>
            <ul className={styles.interestList}>
              <li><strong>Micro-SaaS:</strong> Small, high-margin software solving specific operational bottlenecks.</li>
              <li><strong>Programmatic SEO:</strong> Architecture, internal linking graphs, and indexing strategies for data-dense sites.</li>
              <li><strong>AI & Automation:</strong> Computer vision and background automation pipelines that replace manual repetitive workflows.</li>
              <li><strong>Developer Tooling:</strong> Fast, single-purpose CLI utilities and zero-dependency scripts.</li>
            </ul>
          </div>
        </section>

        {/* 7.11 Evidence-based Technology Section */}
        <section id="stack" className={styles.section}>
          <h2 className={styles.sectionHeading}>Technologies (Evidence-Based)</h2>
          <p className={styles.sectionDesc}>
            No arbitrary skill ratings or vendor logo walls. Every tool listed below is tied directly to the projects in this portfolio where it was used in production.
          </p>
          <TechEvidenceList items={techItems} />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Principles When Building</h2>
          <div className={styles.prose}>
            <ul className={styles.principlesList}>
              <li><strong>Speed matters:</strong> Minimal client bundles, server-side rendering, and instant response times.</li>
              <li><strong>No fabricated numbers:</strong> Real metrics only. If something isn&apos;t tracked yet, it is marked as such.</li>
              <li><strong>Simple infrastructure:</strong> Static edge hosting, serverless functions, and minimal moving parts.</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Connect & Links</h2>
          <div className={styles.linksBlock}>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              GitHub ↗
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              LinkedIn ↗
            </a>
            <a href={`mailto:${siteConfig.links.email}`} className={styles.linkItem}>
              Email ({siteConfig.links.email}) ↗
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
