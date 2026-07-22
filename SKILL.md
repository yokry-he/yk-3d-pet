---
name: yk-3d-pet
description: Create, extend, integrate, and validate procedural 3D pets with semantic rigs, four limbs, segmented tails, independent gaze, idle behaviors, configurable chest/back symbols, explicit actions, recipes, renderer adapters, tests, and four-view visual acceptance.
license: Apache-2.0
metadata:
  author: yokry-he
  version: "0.1.0"
  compatibility: "Agent Skills, Codex, Claude Code, Copilot, Gemini CLI, Cursor, Windsurf, API agents"
---

# yk-3d-pet

Use this Skill when a request creates, modifies, integrates, or validates a 3D pet. The goal is not a static mascot: deliver a configurable pet with a semantic Rig, natural idle life, explicit actions, persistent appearance, symbols, renderer integration, tests, and honest visual acceptance status.

## Default scope

Prefer TypeScript, Vue 3, TresJS, Three.js, procedural geometry, and a Transform Rig when the host already supports them. The core rules are host-neutral. Use `generic` templates by default and `yk-pets` only when the target project uses YK-PETS `pet-core` and `<yk-pet>`.

Stable first scope: one head, one body, four limbs, independent eyes, one segmented tail, chest/back symbols, explicit actions, idle behaviors, props/effects, and a renderer adapter. GLB skinning, wings, multiple tails, and asymmetric bodies are extension modes.

## Read before editing

1. The target repository instructions and current branch/diff.
2. Existing species, renderer, action, recipe, and idle registries.
3. `references/rig-and-anchors.md`.
4. `references/motion-and-idle.md`.
5. `references/appearance-symbols-and-effects.md`.
6. `references/acceptance-and-performance.md`.
7. `references/host-integration.md`.
8. User reference images and constraints.

Do not duplicate an existing core, renderer pipeline, or production action implementation before inspecting it.

## Normalize the request

```ts
interface BuildPetRequest {
  operation: 'create-pet' | 'add-action' | 'edit-rig' | 'edit-symbol' | 'validate-pet'
  speciesId: string
  petName?: string
  preset?: 'generic' | 'yk-pets'
  visualStyle?: 'procedural-cute' | 'robot' | 'organic' | 'glb'
  referenceImages?: string[]
  palette?: Record<string, string>
  requiredParts?: string[]
  requiredActions?: string[]
  idleActions?: string[]
  chestSymbol?: Record<string, unknown>
  backSymbol?: Record<string, unknown>
  constraints?: string[]
}
```

Reference images inform silhouette, head/body ratio, limb anchors, tail path, eye ratio, palette, symbols, and visual character. Do not treat camera perspective as true model proportion.

## Non-negotiable rules

### Rig

- Use semantic anchors instead of recalculating positions independently in each action.
- Front limbs have shoulder, forearm, paw tip, and prop anchor levels.
- Hind limbs participate independently.
- A tail has root, mid, and tip when the species declares a segmented tail.
- Left/right eye bases and pupils are independent.
- Provide mouth, chest, back, prop, and scene-effect anchors.
- Local tail motion must not rotate the whole pet.

### Motion

- Register a unique action ID, duration, category, intensity, interrupt policy, idle tier, and required anchors.
- Use `enter / active / exit / settle` stages.
- Replaying the same explicit action restarts it.
- Props, gaze, body, and limbs consume one shared motion pose.
- Full rotations use monotonically increasing angles and never visibly reverse to zero.
- Explosion particles only disperse, decelerate, fall, drift, and fade; they never return to the center.
- Manual actions override idle actions.

### Eyes

- Separate eye shape, pupil/emissive target, and mirrored highlights.
- Convert world targets into head-local coordinates before gaze calculation.
- Both pupils move in the same gaze direction while highlights remain mirrored.
- Never damp eyes toward the face center.

### Appearance and symbols

- Separate species definition, appearance recipe, and runtime state.
- Clamp numbers, validate colors/enums, migrate missing fields, and keep local patches isolated.
- Chest/back symbols support text, color, scale, rotation, glow, and XYZ offsets.
- Chest mode supports `none / energy-core / symbol / hybrid`.
- Back symbols avoid the tail-root motion envelope.

### Performance and safety

- Respect reduced motion and pause idle scheduling while hidden.
- Cap DPR, particles, geometry segments, and dynamic allocations.
- Dispose textures, materials, geometry, timers, listeners, audio, and framework instances.
- Treat recipes as untrusted JSON; never execute recipe strings or remote JavaScript.
- Action, species, and renderer IDs come from registries.

## Create a pet

1. Inspect the host architecture and choose `generic` or `yk-pets` preset.
2. Extract the visual specification from text/reference images.
3. Generate a starting directory:

```bash
node scripts/cli.mjs scaffold --species cloud-cat --name "Luma" --preset generic --output ./generated/cloud-cat
```

4. Refine geometry and proportions; templates are not final art.
5. Establish the semantic Rig and anchors.
6. Add idle breathing, blinking, gaze, tail/ear micro-motion, hidden-page handling, and reduced motion.
7. Add and normalize appearance recipes.
8. Register at least idle, greeting, jumping, stretching, resting, one prop action, and one tail action.
9. Register the renderer with the host.
10. Connect Studio/editor persistence when applicable.
11. Validate:

```bash
node scripts/cli.mjs validate --root ./generated/cloud-cat
```

12. Run target-repository checks and the four-view visual matrix.

## Add an action

- Confirm the action ID is unique.
- Declare anchors and a shared target pose.
- Define phases, source/preview duration when the host distinguishes them, restart, interruption, and settle behavior.
- Do not copy ball/prop formulas into eyes and limbs.
- Update menus, idle policy, documentation, and tests.
- Observe front, left, back, and right views.

## Modify an existing pet

- Read the latest implementation and Git diff first.
- Patch only the requested domain.
- Preserve recipes, migrations, unrelated parts, actions, and runtime state.
- Recheck all actions depending on changed anchors.
- If a complex composition remains unstable, restore the last locally correct action implementation rather than reverting unrelated phases.

## Deliverables

Report changed species/Rig/renderer, defaults and migrations, explicit actions, idle policy, symbols, tests, checks/builds, unperformed visual checks, usage examples, and known limits. Never claim WebGL visual acceptance when it was not observed.

## Completion definition

- Stable four-limb, eye, and tail Rig.
- Natural idle life.
- Explicit actions can be selected and replayed.
- Idle actions do not interfere with manual actions.
- Configurable chest/back symbols.
- Recipes save, migrate, import, and export correctly.
- The host can resolve and mount the renderer.
- Major actions have no obvious clipping or reversed gaze in four views.
- Automated tests and production builds pass.
