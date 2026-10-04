import { getWriting, getExperiments } from '@/lib/content'
import { siteConfig } from '@content/site'

export const dynamic = 'force-static'

export async function GET() {
  const writing = getWriting()
  const experiments = getExperiments()

  const allFeedItems = [
    ...writing.map((w) => ({
      title: w.title,
      link: `${siteConfig.url}/writing/${w.slug}`,
      date: new Date(w.date).toUTCString(),
      description: w.summary,
      category: `Writing / ${w.category}`,
    })),
    ...experiments.map((e) => ({
      title: `[Experiment] ${e.title}`,
      link: `${siteConfig.url}/experiments/${e.slug}`,
      date: new Date(e.date).toUTCString(),
      description: `Hypothesis: ${e.hypothesis}. Outcome: ${e.outcome}. Result: ${e.conclusion}`,
      category: 'Experiments',
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const itemsXml = allFeedItems
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid>${item.link}</guid>
      <pubDate>${item.date}</pubDate>
      <description><![CDATA[${item.description}]]></description>
      <category>${item.category}</category>
    </item>`
    )
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.title}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
