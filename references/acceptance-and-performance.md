# Acceptance, performance, and safety / 验收、性能与安全

## Automated checks

Validate defaults, migration, import/export round trips, isolated local patches, finite/clamped values, enum/color validation, Rig anchors, unique actions, restart/settle, shared targets, renderer lifecycle, resource disposal, and unavailable-WebGL behavior.

## Four-view matrix

Observe front, left, back, and right for idle, greeting, jumping, prop/catch, meal, rest/sleep, tail, and energy actions. Check limb attachment, eye direction, tail joints, symbol visibility, prop alignment, support relationships, outward particles, and smooth settle.

## Reference-image comparison

Compare head/body ratio, thickness, eye size/spacing/height, ear/antenna silhouette, limb embed points, tail root/path/tip, symbols, palette, glow, and front-view recognition. Rebuild stable proportions before matching camera perspective.

## Performance budget

Cap default DPR near 1.4 for persistent page pets, avoid full-screen bloom, cap particles and high-segment geometry, reuse temporary vectors/materials, pause or lower rendering while hidden, and disable expensive effects in low-performance/reduced-motion modes.

## Resource disposal

Stop loops/timers/audio, remove DOM/window/document/storage listeners, dispose dynamic textures/materials/geometry, clear action queues, and destroy framework instances.

## Safety

Recipes are untrusted JSON. Do not execute code or arbitrary URLs. Resolve actions/species/renderers from registries. Validate imported size/type. External GLB requires explicit source, license, size, and parser policy. Pet actions never receive shell commands or arbitrary source paths.

## Honest reporting

Distinguish automated checks from observed browser/WebGL/audio results. CI success never substitutes for visual acceptance.
