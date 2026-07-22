# Motion and idle authoring / 动作与闲时调度

## Action registry

```ts
interface PetActionDefinition {
  id: string
  label: string
  labelEn: string
  durationMs: number
  category: 'state' | 'social' | 'basic' | 'life' | 'prop' | 'energy' | 'scene'
  intensity: 'micro' | 'normal' | 'high'
  interruptible: boolean
  idleTier: 'never' | 'normal' | 'rare' | 'high' | 'easter'
  requiredAnchors: readonly string[]
  evaluate(context: PetActionContext): PetMotionPose
}
```

The action returns a desired pose; the Rig layer applies damping. Use stable kebab-case IDs.

## Lifecycle

```text
enter → active → exit → settle
```

Jump example: 0–15% crouch, 15–42% rise, 42–55% apex, 55–80% fall, 80–92% landing compression, 92–100% settle.

## Shared targets

Ball, catch, meal, and energy actions define one pose containing prop position/velocity, active side, body target, paw target, facing, and gaze target. Never duplicate similar equations in props, eyes, and limbs.

## Control

Explicit replay restarts the timeline. Interruptible actions may yield through a short neutral state. Non-interruptible actions accept only higher-priority system requests. Keep at most one meaningful queued action and settle between actions.

## Rotations and particles

Use monotonically increasing accumulated angles for spins/flips. Normalize equivalent full turns only after the visible motion. Charge particles may move inward; post-explosion particles only move outward, decelerate, fall, drift, and fade.

## Idle policy

```ts
interface PetIdlePolicy {
  enabled: boolean
  normalIntervalMs: [number, number]
  rareIntervalMs: [number, number]
  highIntervalMs: [number, number]
  easterIntervalMs: [number, number]
  allowHighEnergy: boolean
  pauseWhenHidden: boolean
  respectReducedMotion: boolean
}
```

Suggested intervals: normal 10–20s, rare 30–70s, high 90–180s, easter 150–300s. Pause while hidden, dragging, busy, or menus are open. Reduced motion disables high/easter actions. Do not repeat the same idle action consecutively.
