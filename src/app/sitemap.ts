import type { MetadataRoute } from 'next'
import {
  getProjects,
  getExperiments,
  getResearch,
  getWriting,
} from '@/lib/content'
import { siteConfig } from '@content/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experiments`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/failed-projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/timeline`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/now`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Dynamic projects
  const projectRoutes: MetadataRoute.Sitemap = getProjects().map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Dynamic experiments
  const experimentRoutes: MetadataRoute.Sitemap = getExperiments().map((e) => ({
    url: `${baseUrl}/experiments/${e.slug}`,
    lastModified: e.date ? new Date(e.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Dynamic research
  const researchRoutes: MetadataRoute.Sitemap = getResearch().map((r) => ({
    url: `${baseUrl}/research/${r.slug}`,
    lastModified: r.date ? new Date(r.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Dynamic writing
  const writingRoutes: MetadataRoute.Sitemap = getWriting().map((w) => ({
    url: `${baseUrl}/writing/${w.slug}`,
    lastModified: w.updated ? new Date(w.updated) : new Date(w.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...experimentRoutes,
    ...researchRoutes,
    ...writingRoutes,
  ]
}
