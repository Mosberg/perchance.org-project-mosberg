# Perchance Language (Mosberg)

Version **0.5.0** pushes the grammar toward maximum theme granularity for Perchance.

## What this version emphasizes

- List methods like `selectOne`, `selectUnique`, `evaluateItem`, `joinItems`, and `getLengthItems`.
- Hierarchical and imported list structures.
- Shorthand list odds and range-like forms.
- Browser, DOM, storage, and UI globals.
- Optional chaining, nullish coalescing, spread, regex, `this`, and `arguments`.
- Inline HTML and CSS with richer attribute-level scopes.

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
- `examples/`
- `media/icon.png`
- `LICENSE`
- `CHANGELOG.md`
