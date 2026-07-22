#!/usr/bin/env node
import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
const here = path.dirname(fileURLToPath(import.meta.url)); const repoRoot = path.resolve(here, '..'); const args = parseArgs(process.argv.slice(2))
if (args.help) { help(); process.exit(0) }
let request = {}
if (args.request) request = JSON.parse(await readFile(path.resolve(process.cwd(), String(args.request)), 'utf8'))
const speciesId = String(args.species || request.speciesId || '').trim(); const petName = String(args.name || request.petName || speciesId).trim(); const preset = String(args.preset || request.preset || 'generic'); const outputValue = String(args.output || '').trim()
if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(speciesId)) fail('species must be kebab-case'); if (!petName) fail('name is required'); if (!['generic','yk-pets'].includes(preset)) fail('preset must be generic or yk-pets'); if (!outputValue) fail('output is required')
const output = path.resolve(process.cwd(), outputValue); if (!args.force && await nonEmpty(output)) fail(`output already exists and is not empty: ${output}`); await mkdir(output, { recursive: true })
const pascal = petName.replace(/[^A-Za-z0-9]+/g,' ').trim().split(/\s+/).map(v => v ? v[0].toUpperCase()+v.slice(1) : '').join('') || speciesId.split('-').map(v=>v[0].toUpperCase()+v.slice(1)).join(''); const constant = speciesId.replace(/-/g,'_').toUpperCase(); const monogram = petName.replace(/[^A-Za-z0-9]/g,'').slice(0,1).toUpperCase() || 'P'; const rendererId = `${speciesId}-procedural`
const replacement = { '__SPECIES_ID__': speciesId, '__PET_NAME__': petName, '__PASCAL_NAME__': pascal, '__CONSTANT_NAME__': constant, '__MONOGRAM__': monogram }
const files = [
  { source: `templates/${preset}/pet-definition.ts.template`, target: 'definition.ts' },
  { source: 'templates/generic/procedural-pet.vue.template', target: `${pascal}Rig.vue` },
  { source: 'templates/generic/actions.ts.template', target: 'actions.ts' },
  { source: `templates/${preset}/renderer-adapter.ts.template`, target: 'renderer-adapter.ts' },
]
for (const file of files) { let content = await readFile(path.join(repoRoot,file.source),'utf8'); for (const [token,value] of Object.entries(replacement)) content = content.split(token).join(value); await writeFile(path.join(output,file.target), content) }
const manifest = { schemaVersion: 1, generatorVersion: '0.1.0', speciesId, rendererId, preset, capabilities: request.requiredParts || ['four-limbs','independent-eyes','segmented-tail','chest-symbol','back-symbol'], files: { definition: 'definition.ts', rig: `${pascal}Rig.vue`, actions: 'actions.ts', rendererAdapter: 'renderer-adapter.ts' } }
await writeFile(path.join(output,'pet.manifest.json'), JSON.stringify(manifest,null,2)+'\n'); await writeFile(path.join(output,'README.md'), `# ${petName}\n\nGenerated with yk-3d-pet using the ${preset} preset.\n\n## Next steps\n\n1. Refine geometry and species-safe ranges.\n2. Add requested actions and idle policy.\n3. Integrate symbols, props, effects, and the host registry.\n4. Run \`node ${path.relative(output,path.join(repoRoot,'scripts/validate-pet.mjs'))} --root .\`.\n5. Perform front/left/back/right WebGL acceptance.\n`)
console.log(`Generated ${petName} (${speciesId}) at ${output}`)
function parseArgs(values) { const out = {}; for (let i=0;i<values.length;i++) { const value=values[i]; if (value==='--help'||value==='-h') { out.help=true; continue } if (!value.startsWith('--')) fail(`unknown argument ${value}`); const key=value.slice(2); if (key==='force') { out.force=true; continue } const next=values[++i]; if (!next||next.startsWith('--')) fail(`${value} requires a value`); out[key]=next } return out }
async function nonEmpty(target) { try { await access(target); return (await readdir(target)).length>0 } catch { return false } }
function fail(message) { console.error(message); help(); process.exit(1) } function help() { console.log('Usage: yk-3d-pet scaffold --species <id> --name <name> --preset <generic|yk-pets> --output <dir> [--request file] [--force]') }
