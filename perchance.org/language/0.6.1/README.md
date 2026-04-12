# Perchance Language (Mosberg)

Version **0.6.1** now includes colorful grammar, snippets, IntelliSense, hover docs, navigation, and import diagnostics.

## What this version emphasizes

- 16 production snippets with tabstops for scaffold, imports, weighted items, callbacks, prompts, and common blocks.
- Context-aware completion suggestions for globals, methods, and common property keys.
- Hover documentation for high-frequency symbols used in generator/plugin authoring.
- Document outline symbols for lists, functions, imports, and top-level assignments.
- Go-to-definition and find-references for in-document list/function/assignment declarations.
- Import diagnostics with quick fixes for unresolved and duplicate imports.
- Grammar regression snapshot checks and JSON validation scripts for CI.
- GitHub Actions CI workflow that validates, tests snapshots, and packages the VSIX.

## Colorful examples

```perchance
sentence
  The [animals.selectOne] jumps over the [animalType].
  {10-20} apples and {30-70} pears
  [animals.selectUnique(2).joinItems(", ")]
```

```perchance
async generate() =>
  let regex = /chat|code|rewrite/g;
  console.log(window.chatState?.ready ?? false);
  return `<div style="color:#ff5555; margin:8px;">[input.userMessage]</div>`;
```

## Included

- `syntaxes/perchance.tmLanguage.json`
- `language-configuration.json`
- `extension.js`
- `snippets/perchance.code-snippets`
- `examples/`
- `media/icon.png`
- `LICENSE`
- `CHANGELOG.md`

## Settings

- `perchance.completions.enableGlobals`
- `perchance.completions.enableMethods`
- `perchance.completions.enableProperties`
- `perchance.hover.enableDocs`

## Validation Commands

- `npm run validate:json`
- `npm run test:grammar`
- `npm run test`
- `npm run package:vsix`
