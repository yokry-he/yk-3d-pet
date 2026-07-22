import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import process from 'node:process'
function run(args){const result=spawnSync(process.execPath,args,{cwd:process.cwd(),encoding:'utf8'});assert.equal(result.status,0,result.stderr||result.stdout)}
test('scaffolds and validates generic and yk-pets pets',async()=>{const temp=await mkdtemp(path.join(tmpdir(),'yk-3d-pet-test-'));try{for(const preset of ['generic','yk-pets']){const output=path.join(temp,preset);run(['scripts/cli.mjs','scaffold','--species',`test-${preset}`,'--name',`Test ${preset}`,'--preset',preset,'--output',output]);run(['scripts/cli.mjs','validate','--root',output]);const manifest=JSON.parse(await readFile(path.join(output,'pet.manifest.json'),'utf8'));assert.equal(manifest.preset,preset)}}finally{await rm(temp,{recursive:true,force:true})}})
test('installs all agent adapters',()=>run(['scripts/check-agent-adapters.mjs']))
