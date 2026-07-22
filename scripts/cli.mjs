#!/usr/bin/env node
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const [command, ...args] = process.argv.slice(2)
const commands = {
  scaffold: './scaffold-pet.mjs',
  validate: './validate-pet.mjs',
  install: './install-agent-adapters.mjs',
  'install-adapters': './install-agent-adapters.mjs',
  'check-adapters': './check-agent-adapters.mjs',
  check: './check-skill.mjs',
}

if (!command || command === '--help' || command === '-h') {
  console.log(`
yk-3d-pet

Usage:
  yk-3d-pet scaffold --species <id> --name <name> --preset <generic|yk-pets> --output <dir>
  yk-3d-pet validate --root <pet-directory> [--json]
  yk-3d-pet install --target <project-directory> --agents <all|comma-list>
  yk-3d-pet check-adapters
  yk-3d-pet check
`)
  process.exit(0)
}

const modulePath = commands[command]
if (!modulePath) {
  console.error(`Unknown command: ${command}`)
  process.exit(1)
}

process.argv = [process.argv[0], fileURLToPath(new URL(modulePath, import.meta.url)), ...args]
await import(modulePath)
