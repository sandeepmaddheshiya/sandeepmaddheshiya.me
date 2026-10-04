import { z } from 'zod'

// ── Project Schema ──────────────────────────────────────────────
export const ProjectStatusSchema = z.enum([
  'building',
  'growing',
  'experiment',
  'paused',
  'shipped',
  'abandoned',
  'failed',
])

export const ProjectSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  longDescription: z.string().optional(),
  status: ProjectStatusSchema,
  category: z.array(z.string()).default([]),
  startedAt: z.string(),
  updatedAt: z.string(),
  url: z.string().optional(),
  github: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  researchHours: z.union([z.number(), z.string()]).optional(),
  users: z.number().nullable().optional(),
  traffic: z
    .object({
      value: z.number().nullable(),
      unit: z.string().optional(),
      period: z.string().optional(),
      note: z.string().optional(),
    })
    .optional(),
  revenue: z
    .object({
      value: z.number().nullable(),
      currency: z.string().optional(),
      period: z.string().optional(),
      note: z.string().optional(),
    })
    .optional(),
  screenshots: z
    .array(z.object({ src: z.string(), alt: z.string() }))
    .optional(),
  lessons: z.array(z.string()).optional(),
  failures: z.array(z.string()).optional(),
  experiments: z.array(z.string()).optional(),
  research: z.array(z.string()).optional(),
  writing: z.array(z.string()).optional(),
  currentGoal: z.string().optional(),
  featured: z.boolean().default(false),
  showMetrics: z
    .object({
      traffic: z.boolean().optional(),
      revenue: z.boolean().optional(),
      users: z.boolean().optional(),
    })
    .optional(),
})

export type Project = z.infer<typeof ProjectSchema>

// ── Experiment Schema ───────────────────────────────────────────
export const ExperimentOutcomeSchema = z.enum([
  'worked',
  'failed',
  'inconclusive',
])

export const ExperimentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  project: z.string().optional(),
  tags: z.array(z.string()).default([]),
  hypothesis: z.string(),
  change: z.string(),
  expected: z.string(),
  actual: z.string(),
  conclusion: z.string(),
  outcome: ExperimentOutcomeSchema,
  data: z
    .array(
      z.object({
        label: z.string(),
        before: z.number().optional(),
        after: z.number().optional(),
        unit: z.string().optional(),
      })
    )
    .optional(),
})

export type Experiment = z.infer<typeof ExperimentSchema>

// ── Research Schema ─────────────────────────────────────────────
export const ResearchSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  type: z.string(),
  summary: z.string(),
  hoursSpent: z.number().optional(),
  outcome: z.string().optional(),
  project: z.string().optional(),
})

export type Research = z.infer<typeof ResearchSchema>

// ── Writing Schema ──────────────────────────────────────────────
export const WritingSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  updated: z.string().optional(),
  category: z.string(),
  summary: z.string(),
  project: z.string().optional(),
  draft: z.boolean().default(false),
})

export type Writing = z.infer<typeof WritingSchema>

// ── Failed Project Schema ───────────────────────────────────────
export const FailedProjectSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  whyIThoughtItWouldWork: z.string(),
  whatIExpected: z.string(),
  whatActuallyHappened: z.string(),
  whyIStopped: z.string(),
  whatILearned: z.string(),
  startedAt: z.string(),
  stoppedAt: z.string().optional(),
  timeSpent: z.string().optional(),
  status: z.string().default('failed'),
})

export type FailedProject = z.infer<typeof FailedProjectSchema>
