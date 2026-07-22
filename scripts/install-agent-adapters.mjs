#!/usr/bin/env node
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '..')
const args = parseArgs(process.argv.slice(2))
const target = path.resolve(process.cwd(), String(args.target || '.'))
const supported = ['codex', 'claude', 'copilot', 'gemini', 'cursor', 'windsurf']
const requested = args.all || args.agents === 'all'
  ? supported
  : String(args.agents || args.agent || '').split(',').map(value => value.trim()).filter(Boolean)

if (!requested.length) fail('Use --all, --agents all, or --agents codex,claude,...')
for (const agent of requested) if (!supported.includes(agent)) fail(`Unsupported agent: ${agent}`)

const common = path.join(target, '.agents/skills/yk-3d-pet')
await copySkill(common)

for (const agent of requested) {
  if (agent === 'codex') await managed(path.join(target, 'AGENTS.md'), 'Read and follow `.agents/skills/yk-3d-pet/SKILL.md` for 3D pet creation, Rig, actions, idle behavior, symbols, integration, or validation.')
  if (agent === 'claude') {
    await managed(path.join(target, 'CLAUDE.md'), 'For 3D pet tasks read @.agents/skills/yk-3d-pet/SKILL.md.')
    await copySkill(path.join(target, '.claude/skills/yk-3d-pet'))
  }
  if (agent === 'copilot') {
    await write(path.join(target, '.github/agents/yk-3d-pet.agent.md'), copilotAgent())
    await write(path.join(target, '.github/prompts/yk-3d-pet.prompt.md'), copilotPrompt())
    await write(path.join(target, '.github/instructions/yk-3d-pet.instructions.md'), copilotInstructions())
  }
  if (agent === 'gemini') {
    await managed(path.join(target, 'GEMINI.md'), 'For 3D pet tasks read `.agents/skills/yk-3d-pet/SKILL.md`.')
    await write(path.join(target, '.gemini/commands/yk-3d-pet/create.toml'), geminiCreate())
    await write(path.join(target, '.gemini/commands/yk-3d-pet/validate.toml'), geminiValidate())
  }
  if (agent === 'cursor') await write(path.join(target, '.cursor/rules/yk-3d-pet.mdc'), cursorRule())
  if (agent === 'windsurf') await copySkill(path.join(target, '.windsurf/skills/yk-3d-pet'))
}

console.log(`Installed yk-3d-pet for ${requested.join(', ')} in ${target}`)

async function copySkill(destination) {
  await rm(destination, { recursive: true, force: true })
  await mkdir(destination, { recursive: true })
  for (const entry of ['SKILL.md', 'references', 'templates', 'schemas', 'prompts', 'scripts', 'examples']) {
    await cp(path.join(repoRoot, entry), path.join(destination, entry), { recursive: true })
  }
}

async function managed(file, body) {
  let current = ''
  try { current = await readFile(file, 'utf8') } catch {}
  const start = '<!-- yk-3d-pet:start -->'
  const end = '<!-- yk-3d-pet:end -->'
  const block = `${start}\n${body}\n${end}`
  const pattern = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`)
  const next = pattern.test(current)
    ? current.replace(pattern, block)
    : `${current.trim()}${current.trim() ? '\n\n' : ''}${block}\n`
  await write(file, next)
}

async function write(file, content) {
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, content.endsWith('\n') ? content : `${content}\n`)
}

function copilotAgent() { return `---\nname: yk-3d-pet\ndescription: Create and validate procedural 3D pets.\n---\nRead .agents/skills/yk-3d-pet/SKILL.md. Use its deterministic scaffold and validator. Do not claim visual acceptance without observing WebGL.\n` }
function copilotPrompt() { return `---\ndescription: Create or modify a procedural 3D pet with yk-3d-pet.\n---\nRead .agents/skills/yk-3d-pet/SKILL.md and execute the requested pet task.\n` }
function copilotInstructions() { return `---\napplyTo: "**/pets/**,**/pet-*/**,**/*Rig.vue"\n---\nFollow .agents/skills/yk-3d-pet/SKILL.md for Rig, actions, symbols, recipes, tests, and visual acceptance.\n` }
function cursorRule() { return `---\ndescription: Procedural 3D pet creation, Rig, actions, idle behavior, symbols, integration, and validation.\nalwaysApply: false\n---\nRead .agents/skills/yk-3d-pet/SKILL.md before editing 3D pets.\n` }
function geminiCreate() { return `description = "Create a procedural 3D pet with yk-3d-pet"\nprompt = "Read .agents/skills/yk-3d-pet/SKILL.md and create the requested pet: {{args}}"\n` }
function geminiValidate() { return `description = "Validate a procedural 3D pet"\nprompt = "Read .agents/skills/yk-3d-pet/SKILL.md and validate: {{args}}"\n` }

function parseArgs(values) {
  const out = {}
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index]
    if (value === '--all') { out.all = true; continue }
    if (value === '--help' || value === '-h') { printHelp(); process.exit(0) }
    if (!value.startsWith('--')) fail(`Unknown argument: ${value}`)
    const next = values[index + 1]
    if (!next || next.startsWith('--')) fail(`${value} requires a value`)
    out[value.slice(2)] = next
    index += 1
  }
  return out
}
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }
function printHelp() { console.log('Usage: yk-3d-pet install --target <project> --agents <all|codex,claude,copilot,gemini,cursor,windsurf>') }
function fail(message) { console.error(message); printHelp(); process.exit(1) }
