#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
const skill = await readFile(path.join(root, 'SKILL.md'), 'utf8')
const failures = []

check(packageJson.name === 'yk-3d-pet', 'package name must be yk-3d-pet')
check(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(packageJson.version), 'package version must be semantic')
check(packageJson.license === 'Apache-2.0', 'package license must be Apache-2.0')
check(packageJson.bin?.['yk-3d-pet'] === './scripts/cli.mjs', 'package bin must expose scripts/cli.mjs')
check(packageJson.repository?.url === 'git+https://github.com/yokry-he/yk-3d-pet.git', 'package repository URL is incorrect')
check(packageJson.publishConfig?.access === 'public', 'package must publish with public access')

const skillVersion = skill.match(/^\s*version:\s*["']?([^"'\s]+)["']?\s*$/m)?.[1]
check(skillVersion === packageJson.version, `SKILL.md version ${skillVersion || '<missing>'} must match package version ${packageJson.version}`)

const packArguments = ['pack', '--dry-run', '--json', '--ignore-scripts']
const npmExecPath = process.env.npm_execpath
const npmCommand = npmExecPath
  ? process.execPath
  : process.platform === 'win32' ? 'cmd.exe' : 'npm'
const npmArguments = npmExecPath
  ? [npmExecPath, ...packArguments]
  : process.platform === 'win32' ? ['/d', '/s', '/c', `npm ${packArguments.join(' ')}`] : packArguments
const packed = spawnSync(npmCommand, npmArguments, {
  cwd: root,
  encoding: 'utf8',
  env: process.env,
})

if (packed.status !== 0) {
  failures.push(`npm pack --dry-run failed: ${packed.error?.message || packed.stderr || packed.stdout}`)
}
else {
  const output = packed.stdout.trim()
  const start = output.indexOf('[')
  const end = output.lastIndexOf(']')
  try {
    const result = JSON.parse(output.slice(start, end + 1))[0]
    validatePackResult(result)
  }
  catch (error) {
    failures.push(`unable to parse npm pack output: ${error instanceof Error ? error.message : String(error)}`)
  }
}

if (failures.length) {
  console.error(`npm package validation failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`npm package validation passed for yk-3d-pet@${packageJson.version}.`)

function validatePackResult(result) {
  check(result?.name === packageJson.name, 'packed name does not match package.json')
  check(result?.version === packageJson.version, 'packed version does not match package.json')
  check(Number.isFinite(result?.unpackedSize) && result.unpackedSize > 0, 'packed unpackedSize is invalid')
  check(result.unpackedSize <= 2_000_000, `package is unexpectedly large: ${result.unpackedSize} bytes`)

  const files = new Set((result?.files || []).map(entry => String(entry.path).replaceAll('\\', '/')))
  const required = [
    'package.json',
    'SKILL.md',
    'README.md',
    'README.zh-CN.md',
    'CHANGELOG.md',
    'LICENSE',
    'scripts/cli.mjs',
    'scripts/scaffold-pet.mjs',
    'scripts/validate-pet.mjs',
    'scripts/install-agent-adapters.mjs',
    'scripts/check-skill.mjs',
    'scripts/check-agent-adapters.mjs',
    'scripts/check-package.mjs',
    'templates/generic/pet-definition.ts.template',
    'templates/generic/procedural-pet.vue.template',
    'templates/generic/actions.ts.template',
    'templates/generic/renderer-adapter.ts.template',
    'templates/yk-pets/pet-definition.ts.template',
    'templates/yk-pets/renderer-adapter.ts.template',
    'schemas/build-pet-request.schema.json',
    'schemas/pet-manifest.schema.json',
    'prompts/system.md',
    'examples/cloud-fox-request.json',
  ]
  for (const file of required) check(files.has(file), `package is missing ${file}`)

  const forbiddenPrefixes = ['tests/', '.github/', '.git/', 'node_modules/']
  for (const file of files) {
    for (const prefix of forbiddenPrefixes) check(!file.startsWith(prefix), `package must not include ${file}`)
  }
}

function check(condition, message) {
  if (!condition) failures.push(message)
}
