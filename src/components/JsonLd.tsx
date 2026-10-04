import { siteConfig } from '@content/site'

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    jobTitle: 'Developer, Builder',
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    creator: { '@id': `${siteConfig.url}/#person` },
  }
}

export function articleJsonLd({
  title,
  slug,
  date,
  updated,
  description,
  section,
}: {
  title: string
  slug: string
  date: string
  updated?: string
  description: string
  section: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    url: `${siteConfig.url}/${section}/${slug}`,
    datePublished: date,
    dateModified: updated || date,
    description,
    author: { '@id': `${siteConfig.url}/#person` },
  }
}

export function projectJsonLd({
  name,
  slug,
  description,
  startedAt,
  category,
  technologies,
  url,
}: {
  name: string
  slug: string
  description: string
  startedAt: string
  category: string[]
  technologies: string[]
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    url: url || `${siteConfig.url}/projects/${slug}`,
    description,
    dateCreated: startedAt,
    creator: { '@id': `${siteConfig.url}/#person` },
    applicationCategory: category.join(', '),
    keywords: technologies.join(', '),
  }
}
