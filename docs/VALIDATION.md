# Standalone validation

The repository validates on Ubuntu, macOS, and Windows with Node.js 22.

Required checks:

```bash
npm test
npm run check
```

Coverage:

- generic and YK-PETS scaffold generation;
- generated pet validation;
- Agent adapter installation;
- Skill, template, schema, prompt, and example completeness;
- path portability and zero third-party runtime dependencies.

Automated checks do not replace front, left, back, and right WebGL visual acceptance for a real generated pet.
