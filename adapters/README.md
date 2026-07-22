# Agent adapters

`SKILL.md` is the only source of truth. Files in this directory and repository-level Agent instructions are thin discovery or command adapters.

Install into another project:

```bash
node scripts/cli.mjs install-adapters --target /path/to/project --all
```

Supported targets: Codex/ChatGPT (`AGENTS.md`), Claude Code (`CLAUDE.md` and `.claude/skills`), GitHub Copilot (`.github/agents`, prompts, instructions), Gemini CLI (`GEMINI.md` and TOML commands), Cursor (`.cursor/rules`), and Windsurf (`.windsurf/skills`).
