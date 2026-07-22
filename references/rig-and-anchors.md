# Rig and semantic anchors / Rig 与语义挂点

A Rig is the stable animated node hierarchy. Procedural pets may use `Group/Object3D` Transform Rigs instead of skinned bones.

## Recommended hierarchy

```text
root
└── positionRig
    └── actionRig
        └── lookRig
            ├── body
            │   ├── chestSymbolAnchor
            │   ├── backSymbolAnchor
            │   └── propRoot
            ├── leftFrontShoulder → leftFrontForearm → leftFrontPawTip → leftFrontPawAnchor
            ├── rightFrontShoulder → rightFrontForearm → rightFrontPawTip → rightFrontPawAnchor
            ├── leftHindLeg → leftHindPawAnchor
            ├── rightHindLeg → rightHindPawAnchor
            ├── tailRoot → tailMid → tailTip
            └── head
                ├── leftEye → leftPupil
                ├── rightEye → rightPupil
                ├── mouthAnchor
                └── optional ear/antenna-tip anchors
sceneEffectsRoot
```

## Coordinate rules

- Centralize base transforms; do not scatter constants through action branches.
- Convert world targets into the local space of the head/body/paw before applying offsets.
- `positionRig` owns page placement, `actionRig` owns whole-body actions, and `lookRig` owns small orientation changes.
- Scene effects stay outside rotating/flipping body rigs.
- Shared prop targets are computed once and consumed by eyes, head, body, and limbs.

## Limbs

Shoulders embed into the body. Front limbs keep independent phases and reachable target limits. Hind limbs support jump compression, alternating kicks, rest/sleep poses, and center-of-mass changes.

## Tail

A segmented tail uses local root rotation with phase-delayed mid/tip motion. Tail windmills never drive whole-body Y rotation. Segment geometry overlaps or uses rounded joints so cross-sections are not exposed.

## Gaze

```ts
const local = head.worldToLocal(targetWorld.clone())
const gazeX = clamp(local.x * factorX, -maxX, maxX)
const gazeY = clamp(local.y * factorY, -maxY, maxY)
```

Both pupils move in the same direction. Highlights remain mirrored. Offsets are added to independent eye bases.

## Symbols and props

Place the chest anchor on the front upper torso and the back anchor above the tail-root envelope. Use mouth and paw anchors for meals, balls, energy, and contact targets. Compute paw centers from current world matrices.
