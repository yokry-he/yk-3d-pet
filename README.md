# yk-3d-pet

Cross-agent Skill and deterministic toolkit for creating, rigging, animating, integrating, and validating procedural 3D pets.

[简体中文](./README.zh-CN.md)

## Features

- Portable root `SKILL.md` as the single source of truth.
- Semantic Transform Rig contract for a body, four limbs, independent eyes, segmented tails, symbols, props, and effects.
- Explicit action lifecycle and idle scheduling.
- Generic and YK-PETS scaffolding presets.
- Dependency-free Node.js scaffold and validation tools.
- Thin adapters for Codex, Claude Code, GitHub Copilot, Gemini CLI, Cursor, and Windsurf.
- JSON Schemas and model-neutral prompts for API agents.
- Smoke tests that generate and validate temporary pets.
- npm tarball auditing and guarded GitHub tag releases.

## Use from a repository checkout

```bash
git clone https://github.com/yokry-he/yk-3d-pet.git
cd yk-3d-pet
npm test
npm run check
```

Create and validate a pet:

```bash
node scripts/cli.mjs scaffold --species cloud-cat --name "Luma" --preset generic --output ./generated/cloud-cat
node scripts/cli.mjs validate --root ./generated/cloud-cat
```

YK-PETS preset:

```bash
node scripts/cli.mjs scaffold --species cloud-cat --name "Luma" --preset yk-pets --output ./generated/cloud-cat
```

Install the Skill and Agent adapters into another project:

```bash
node scripts/cli.mjs install --target /path/to/project --agents all
```

After an npm version has been published, the equivalent CLI entry is:

```bash
npx yk-3d-pet@<version> --help
```

Do not assume npm availability from the repository version alone; verify the published version before using `npx` in automation.

## Stable scope

The first stable scope is a procedural cute-style pet with one head, one body, four limbs, independent eyes, one segmented tail, configurable chest/back symbols, explicit actions, idle behaviors, and a renderer adapter. GLB skinning, wings, multiple tails, and asymmetric rigs are extension modes.

Generated code is a structurally complete starting point, not final art. Every real pet still requires geometry refinement and front/left/back/right WebGL acceptance.

## Requirements

- Node.js 22+
- No runtime dependencies for scaffold and validation commands

## Validation

```bash
npm test
npm run check
npm run release:check
```

`npm run check` inspects the actual npm tarball and rejects missing runtime files or accidental inclusion of tests, workflows, dependencies, and Git metadata.

## Publishing

See [`docs/PUBLISHING.md`](./docs/PUBLISHING.md). A matching version tag creates a checked tarball, SHA-256 file, workflow artifact, and GitHub Release. npm publication remains disabled until repository credentials and `NPM_PUBLISH_ENABLED=true` are configured.

## License

Apache-2.0
