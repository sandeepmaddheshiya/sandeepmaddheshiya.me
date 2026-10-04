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
              I worked as a Software Developer (SDE-1) at Collegedunia building production web systems and backend services, after a brief period at Mobiloitte in Pune. On July 31, 2026, I left full-time employment to dedicate 100% of my time to building independent micro-SaaS and internet products.
            </p>
            <p>
              My early products included <Link href="/failed-projects">Resourcify</Link> (1,000+ mobile downloads) and the custom art e-commerce platform <Link href="/projects/believersart">BelieversArt</Link>. Currently, I operate <Link href="/projects/photoresizer">PhotoResizer</Link> (1,000+ daily organic clicks) and <Link href="/projects/visareadynow">VisaReadyNow</Link> ($250+ micro-SaaS revenue).
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Engineering Experience</h2>
          <div className={styles.experienceList}>
            {/* 1. Indie Developer */}
            <div className={styles.experienceCard}>
              <div className={styles.expHeader}>
                <div>
                  <h3 className={styles.expRole}>Indie Developer / Builder</h3>
                  <span className={styles.expCompany}>Independent · Full-time</span>
                </div>
                <span className={styles.expPeriod}>Jul 2026 – Present</span>
              </div>
              <p className={styles.expDesc}>
                Designing, building, and operating independent micro-SaaS utilities, programmatic SEO platforms, and computer vision tools (<Link href="/projects/visareadynow">VisaReadyNow</Link>, <Link href="/projects/photoresizer">PhotoResizer</Link>, <Link href="/projects/pawvalid">PawValid</Link>, <Link href="/projects/mydocstatus">MyDocStatus</Link>).
              </p>
            </div>

            {/* 2. Collegedunia */}
            <div className={styles.experienceCard}>
              <div className={styles.expHeader}>
                <div>
                  <h3 className={styles.expRole}>Software Development Engineer I (SDE-1)</h3>
                  <span className={styles.expCompany}>Collegedunia · Full-time (Gurugram)</span>
                </div>
                <span className={styles.expPeriod}>Sep 2024 – Jul 2026</span>
              </div>
              <p className={styles.expDesc}>
                Full-stack developer engineering 4 core production enterprise systems using Laravel (PHP), MySQL, Livewire, and third-party APIs:
              </p>
              <ul className={styles.expBullets}>
                <li><strong>PreppIAS Evaluation Platform:</strong> Automated scanned answer sheet workflows and evaluator distribution, speeding up academic evaluation turnarounds by 3–5 days with real-time dashboards.</li>
                <li><strong>CRM (Customer Relationship Management):</strong> Built lead tracking and pipeline management (~45% conversion tracking improvement) and integrated WhatsApp Cloud API for automated notifications.</li>
                <li><strong>HRMS (Human Resource Management System):</strong> Developed employee onboarding, attendance, and leave management modules, cutting manual HR work by 70% and saving 25+ hours/month.</li>
                <li><strong>ATS (Applicant Tracking System):</strong> Customized candidate pipeline tracking and interview coordination features, reducing hiring pipeline delays by 25%.</li>
              </ul>
            </div>

            {/* 3. Mobiloitte */}
            <div className={styles.experienceCard}>
              <div className={styles.expHeader}>
                <div>
                  <h3 className={styles.expRole}>Software Developer Apprentice</h3>
                  <span className={styles.expCompany}>Mobiloitte · Apprenticeship (Pune)</span>
                </div>
                <span className={styles.expPeriod}>Jan 2024 – Jul 2024</span>
              </div>
              <p className={styles.expDesc}>
                Full-stack development training on Node.js, Express, React, MongoDB, user authentication, and payment gateway integrations.
              </p>
            </div>
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
