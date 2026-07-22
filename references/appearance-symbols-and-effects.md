# Appearance, symbols, props, and effects / 外观、标志、道具与特效

Separate species definition, appearance, and runtime state. Appearance imports must not overwrite active actions, affinity, memory, audit/network state, or agent connections.

## Normalization

Treat input as untrusted data. Verify plain objects, trim and length-limit strings, validate colors, clamp finite numbers, accept only registered enums, apply explicit migrations, and never execute extension fields.

## Suggested appearance

Include identity, palette roles, body/head/eye/limb/tail proportions, part choices, tail/front-paw design, belly patches, chest display, chest/back symbols, orbit/effects, and extensions.

## Symbols

```ts
interface SymbolChannel {
  enabled: boolean
  text: string
  color: string
  scale: number
  rotation: number
  glowIntensity: number
  offsetX: number
  offsetY: number
  offsetZ: number
}
```

Limit short text to 1–3 characters. Chest mode is `none | energy-core | symbol | hybrid`; hybrid shrinks the core and places the symbol in front. Back symbols avoid the tail-root envelope.

## Eyes

Separate eye shape, movable pupil/emissive target, mirrored highlights, and eyelid/emotion layers. Closing eyes changes visible height or eyelids, not eye position inside the head.

## Props

Meals group table, bowl, food, and optional steam/decoration. Mouth, head, gaze, and paws share a meal target. Ball/catch actions share one ball pose. Supported clouds/platforms remain fully visible below the pet.

## Energy and effects

Energy balls have a bright core, halo, charge particles, shockwave, outward particles, and fade lifecycle. Antenna energy uses the tip midpoint; paw energy uses the current paw-anchor midpoint. Scans and rings never live inside closed head geometry.

## Orbits

Keep depth testing so the rear half is occluded by the body. Prefer round particles; tangentially orient any bars. Disabling the orbit removes rings and particles. Explosion shockwaves use separate meshes.
