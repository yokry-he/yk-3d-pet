#!/usr/bin/env node
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import process from 'node:process'
const target=await mkdtemp(path.join(tmpdir(),'yk-3d-pet-adapters-'));try{const result=spawnSync(process.execPath,['scripts/cli.mjs','install-adapters','--target',target,'--all'],{cwd:process.cwd(),encoding:'utf8'});if(result.status!==0)throw new Error(result.stderr||result.stdout);const required=['.agents/skills/yk-3d-pet/SKILL.md','AGENTS.md','CLAUDE.md','.github/agents/yk-3d-pet.agent.md','.github/prompts/yk-3d-pet.prompt.md','.github/instructions/yk-3d-pet.instructions.md','GEMINI.md','.gemini/commands/yk-3d-pet/create.toml','.cursor/rules/yk-3d-pet.mdc','.windsurf/skills/yk-3d-pet/SKILL.md'];for(const file of required){const content=await readFile(path.join(target,file),'utf8');if(!content.includes('yk-3d-pet'))throw new Error(`${file} does not reference yk-3d-pet`)}console.log(`Agent adapter smoke test passed: ${required.length} files.`)}finally{await rm(target,{recursive:true,force:true})}
