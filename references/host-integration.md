# Host integration / 宿主集成

`yk-3d-pet` is host-neutral. Choose a preset based on the target project.

## Generic preset

The generic output defines local species/action/renderer contracts and a framework adapter interface without importing YK-PETS. Map these contracts to the host's existing registries instead of introducing a second core.

## YK-PETS preset

Use only when the target has `@yk-pets/pet-core`, `@yk-pets/pet-web-component`, and the Vue adapter. The output registers a renderer ID, passes recipe appearance and behavior to the component, and calls `defineYkPetElement()`.

## Other hosts

For React, Lit, Svelte, native Three.js, or a custom engine:

1. Keep the same Rig/action/appearance contracts.
2. Implement mount/update/destroy around the host lifecycle.
3. Register the renderer with the host's resolver.
4. Keep framework code outside host-neutral species/action data.
5. Add a preset rather than modifying the Skill core for a single project.

## Bare model APIs

Inject `SKILL.md` plus only the references needed for the current task. Provide file and execution tools separately. Use schemas in `schemas/` for structured input/output. A model without vision consumes a precomputed reference-analysis JSON instead of raw images.
