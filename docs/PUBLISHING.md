# Publishing yk-3d-pet

This document describes the guarded release process for the independent Skill and CLI package.

## Release invariants

Before a release:

- `package.json`, `SKILL.md`, and the Git tag use the same semantic version;
- `npm test` passes;
- `npm run check` passes;
- the actual npm tarball passes `scripts/check-package.mjs`;
- Ubuntu, Windows, and macOS validation is green;
- generated pets are still described as development starting points, not visually accepted final art.

## Local release check

```bash
npm run release:check
npm pack --dry-run --json --ignore-scripts
```

The package audit requires the Skill, references, templates, schemas, prompts, adapters, examples, CLI, documentation, changelog, and license. It rejects test files, GitHub workflows, Git metadata, `node_modules`, and unexpectedly large packages.

## GitHub Release

1. Update `package.json`, `SKILL.md`, and `CHANGELOG.md` to the target version.
2. Merge the release preparation PR after CI passes.
3. Create and push a matching tag, for example:

```bash
git checkout main
git pull --ff-only
git tag -a v0.1.0 -m "yk-3d-pet v0.1.0"
git push origin v0.1.0
```

The `Release yk-3d-pet` workflow verifies the version, runs the complete checks, creates the npm tarball, generates a SHA-256 file, uploads a workflow artifact, and creates a GitHub Release.

## Optional npm publication

npm publication is disabled unless the repository variable below is set:

```text
NPM_PUBLISH_ENABLED=true
```

The repository must also provide:

```text
NPM_TOKEN
```

When both are configured, a matching `v*` tag runs:

```bash
npm publish <generated-package.tgz> --access public --provenance
```

Keep `NPM_PUBLISH_ENABLED` unset or false while only GitHub Release distribution is desired. Do not place npm credentials in source files, issue comments, workflow logs, or generated Agent configuration.

## Failed publication

- Do not move or reuse a published version tag.
- Fix the repository on a new PR.
- Increment the version when npm already accepted the previous version.
- A GitHub Release can be corrected before users depend on it, but attached checksums must always match the uploaded tarball.

## Post-release verification

Verify:

```bash
npm view yk-3d-pet version
npx yk-3d-pet@<version> --help
```

Then generate and validate one temporary `generic` pet and one `yk-pets` pet from the published package. Record any untested WebGL views or Agent hosts honestly.
