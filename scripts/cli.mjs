#!/usr/bin/env node
import process from 'node:process'
const [command, ...args] = process.argv.slice(2)
const commands = { scaffold: './scaffold-pet.mjs', validate: './validate-pet.mjs', 'install-adapters': './install-agent-adapters.mjs', 'check-adapters': './check-agent-adapters.mjs', check: './check-skill.mjs' }
if (!command || command === '--help' || command === '-h') { console.log('yk-3d-pet <scaffold|validate|install-adapters|check-adapters|check> [options]'); process.exit(0) }
const modulePath = commands[command]
if (!modulePath) { console.error(`Unknown command: ${command}`); process.exit(1) }
process.argv = [process.argv[0], new URL(modulePath, import.meta.url).pathname, ...args]
await import(modulePath)
