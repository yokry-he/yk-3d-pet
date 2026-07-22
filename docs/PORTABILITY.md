# Portability and agent compatibility

`SKILL.md` is the only source of truth. Platform-specific files are discovery and command adapters, not separate copies of the full authoring workflow.

## Supported agent surfaces

| Platform | Entry point |
|---|---|
| ChatGPT / Codex | `SKILL.md`, `AGENTS.md` |
| Claude Code | `CLAUDE.md`, installed `.claude/skills/yk-3d-pet` |
| GitHub Copilot | `.github/agents`, prompts, and instructions |
| Gemini CLI | `adapters/gemini` or installed `GEMINI.md` and TOML commands |
| Cursor | `.cursor/rules/yk-3d-pet.mdc` |
| Windsurf | installed `.windsurf/skills/yk-3d-pet` |
| Bare model APIs | `SKILL.md`, `prompts/`, and `schemas/` supplied by the caller |

## Tool capability degradation

- Without image input, consume a structured reference-analysis JSON.
- Without shell access, produce a file plan and generated contents but do not claim commands ran.
- Without WebGL/browser access, run static validation and explicitly leave four-view acceptance pending.
- Without MCP, use the dependency-free Node.js CLI.
- Without Vue/TresJS, keep the Rig/action/appearance contracts and add a host preset or adapter rather than changing Skill core rules.

## Installation

```bash
node scripts/cli.mjs install-adapters --target /path/to/project --all
```

The installer copies the portable Skill into `.agents/skills/yk-3d-pet` and adds thin, managed platform adapters. Existing top-level instruction files are preserved outside the managed block.

## Versioning

Consumers should pin a release tag or commit SHA. Projects that vendor the Skill should record repository URL, version, commit SHA, and checksum to avoid silent drift.
