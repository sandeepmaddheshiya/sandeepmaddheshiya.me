import { getProjects, getExperiments, getResearch, getWriting } from '@/lib/content'
import { siteConfig } from '@content/site'

export async function GET() {
  const projects = getProjects()
  const experiments = getExperiments()
  const research = getResearch()
  const writing = getWriting()

  const text = `# ${siteConfig.name}
> ${siteConfig.description}

## Entity Information
- Name: ${siteConfig.name}
- Role: Developer, Builder, Experimenter
- Canonical URL: ${siteConfig.url}
- GitHub: ${siteConfig.links.github}
- LinkedIn: ${siteConfig.links.linkedin}

## Projects
${projects
  .map(
    (p) => `- [${p.name}](${siteConfig.url}/projects/${p.slug})
  Status: ${p.status}
  Started: ${p.startedAt}
  Stack: ${p.technologies.join(', ') || 'N/A'}
  Categories: ${p.category.join(', ') || 'N/A'}
  Description: ${p.description}`
  )
  .join('\n\n')}

## Experiments
${experiments
  .map(
    (e) => `- [${e.title}](${siteConfig.url}/experiments/${e.slug}) (${e.date})
  Hypothesis: ${e.hypothesis}
  Outcome: ${e.outcome}
  Conclusion: ${e.conclusion}`
  )
  .join('\n\n')}

## Pre-Build Research
${research
  .map(
    (r) => `- [${r.title}](${siteConfig.url}/research/${r.slug}) (${r.date})
  Type: ${r.type}
  Summary: ${r.summary}`
  )
  .join('\n\n')}

## Writing
${writing
  .map(
    (w) => `- [${w.title}](${siteConfig.url}/writing/${w.slug}) (${w.date})
  Category: ${w.category}
  Summary: ${w.summary}`
  )
  .join('\n\n')}
`

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  })
}
