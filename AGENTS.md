# Repository agent instructions

For any request involving creation, modification, integration, or validation of a 3D pet, read and follow [`SKILL.md`](./SKILL.md).

Use the deterministic commands before declaring completion:

```bash
node scripts/cli.mjs validate --root <pet-directory>
npm test
npm run check
```

Do not claim four-view WebGL acceptance unless the rendered pet was actually observed.
