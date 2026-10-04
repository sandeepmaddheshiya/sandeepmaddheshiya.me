import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
  ProjectSchema,
  ExperimentSchema,
  ResearchSchema,
  WritingSchema,
  FailedProjectSchema,
} from './schemas'
import type {
  Project,
  Experiment,
  Research,
  Writing,
  FailedProject,
} from './schemas'

const contentDir = path.join(process.cwd(), 'content')

// ── Generic loader ──────────────────────────────────────────────
function loadContentFiles<T>(
  subdir: string,
  schema: { parse: (data: unknown) => T }
): { data: T; content: string }[] {
  const dir = path.join(contentDir, subdir)
  if (!fs.existsSync(dir)) return []

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    const parsed = schema.parse(data)
    return { data: parsed, content }
  })
}

// ── Projects ────────────────────────────────────────────────────
export function getProjects(): (Project & { content: string })[] {
  return loadContentFiles('projects', ProjectSchema).map((p) => ({
    ...p.data,
    content: p.content,
  }))
}

export function getProjectBySlug(
  slug: string
): (Project & { content: string }) | null {
  const projects = getProjects()
  return projects.find((p) => p.slug === slug) ?? null
}

export function getFeaturedProjects(): (Project & { content: string })[] {
  return getProjects().filter((p) => p.featured)
}

export function getActiveProjects(): (Project & { content: string })[] {
  return getProjects().filter(
    (p) => p.status === 'building' || p.status === 'growing'
  )
}

// ── Experiments ─────────────────────────────────────────────────
export function getExperiments(): (Experiment & { content: string })[] {
  return loadContentFiles('experiments', ExperimentSchema).map((e) => ({
    ...e.data,
    content: e.content,
  }))
}

export function getExperimentBySlug(
  slug: string
): (Experiment & { content: string }) | null {
  const experiments = getExperiments()
  return experiments.find((e) => e.slug === slug) ?? null
}

// ── Research ────────────────────────────────────────────────────
export function getResearch(): (Research & { content: string })[] {
  return loadContentFiles('research', ResearchSchema).map((r) => ({
    ...r.data,
    content: r.content,
  }))
}

export function getResearchBySlug(
  slug: string
): (Research & { content: string }) | null {
  const research = getResearch()
  return research.find((r) => r.slug === slug) ?? null
}

// ── Writing ─────────────────────────────────────────────────────
export function getWriting(): (Writing & { content: string })[] {
  return loadContentFiles('writing', WritingSchema)
    .map((w) => ({
      ...w.data,
      content: w.content,
    }))
    .filter((w) => !w.draft)
}

export function getAllWriting(): (Writing & { content: string })[] {
  return loadContentFiles('writing', WritingSchema).map((w) => ({
    ...w.data,
    content: w.content,
  }))
}

export function getWritingBySlug(
  slug: string
): (Writing & { content: string }) | null {
  const writing = getAllWriting()
  return writing.find((w) => w.slug === slug) ?? null
}

// ── Failed Projects ─────────────────────────────────────────────
export function getFailedProjects(): (FailedProject & {
  content: string
})[] {
  return loadContentFiles('failed-projects', FailedProjectSchema).map(
    (fp) => ({
      ...fp.data,
      content: fp.content,
    })
  )
}

export function getFailedProjectBySlug(
  slug: string
): (FailedProject & { content: string }) | null {
  const failedProjects = getFailedProjects()
  return failedProjects.find((fp) => fp.slug === slug) ?? null
}

// ── Computed Metrics ────────────────────────────────────────────
export function getComputedMetrics() {
  const projects = getProjects()
  const experiments = getExperiments()
  const research = getResearch()

  const totalResearchHours = [
    ...projects,
    ...research,
  ].reduce((sum, item) => {
    const hours =
      'researchHours' in item
        ? item.researchHours
        : 'hoursSpent' in item
          ? item.hoursSpent
          : undefined
    if (typeof hours === 'number') return sum + hours
    return sum
  }, 0)

  return {
    projects_shipped: projects.filter((p) => p.status === 'shipped').length,
    experiments_run: experiments.length,
    research_hours: totalResearchHours || null,
    total_projects: projects.length,
  }
}

// ── Reading Time ────────────────────────────────────────────────
export function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

// ── Technology Evidence Map ─────────────────────────────────────
export function getTechEvidenceMap(): Record<string, { name: string; slug: string }[]> {
  const projects = getProjects()
  const map: Record<string, { name: string; slug: string }[]> = {}

  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      if (!map[tech]) map[tech] = []
      map[tech].push({ name: project.name, slug: project.slug })
    })
  })

  return map
}

// ── Now Page ────────────────────────────────────────────────────
export function getNowContent(): {
  lastUpdated?: string
  location?: string
  content: string
} | null {
  const nowPath = path.join(contentDir, 'now.mdx')
  if (!fs.existsSync(nowPath)) return null
  const raw = fs.readFileSync(nowPath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    lastUpdated: data.lastUpdated as string | undefined,
    location: data.location as string | undefined,
    content,
  }
}


