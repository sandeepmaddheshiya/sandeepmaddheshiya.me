import fs from 'fs'
import path from 'path'

const BANNED_PHRASES = [
  'welcome to my portfolio',
  "i'm a passionate developer",
  'passionate developer',
  'turning ideas into reality',
  'transforming ideas into reality',
  'crafting digital experiences',
  'crafting exceptional digital experiences',
  'building the future',
  'pixel-perfect',
  'pixel perfect',
  'innovative solutions',
  'cutting-edge technology',
  'cutting edge technology',
  "let's build something amazing",
  "let's work together",
  'i specialize in',
  'my journey',
  'problem solver',
  'results-driven',
  'results driven',
  'tech enthusiast',
  'technology enthusiast',
  'visionary entrepreneur',
  'digital innovator',
]

const DIRS_TO_CHECK = ['content', 'src/app', 'src/components']

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const fullDir = path.join(process.cwd(), dir)
  if (!fs.existsSync(fullDir)) return fileList

  const entries = fs.readdirSync(fullDir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(fullDir, entry.name)
    if (entry.isDirectory()) {
      getAllFiles(path.join(dir, entry.name), fileList)
    } else if (
      entry.name.endsWith('.mdx') ||
      entry.name.endsWith('.md') ||
      entry.name.endsWith('.ts') ||
      entry.name.endsWith('.tsx')
    ) {
      fileList.push(fullPath)
    }
  }
  return fileList
}

let hasViolations = false

console.log('🔍 Checking for banned buzzwords & generic phrases...\n')

for (const dir of DIRS_TO_CHECK) {
  const files = getAllFiles(dir)
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8').toLowerCase()
    const relPath = path.relative(process.cwd(), file)

    for (const phrase of BANNED_PHRASES) {
      if (content.includes(phrase)) {
        console.error(`❌ BANNED PHRASE FOUND in ${relPath}: "${phrase}"`)
        hasViolations = true
      }
    }
  }
}

if (hasViolations) {
  console.error('\n🚨 Build failed: Remove banned phrases from content/code.')
  process.exit(1)
} else {
  console.log('✅ Clean! No banned phrases found in content or code.')
  process.exit(0)
}
