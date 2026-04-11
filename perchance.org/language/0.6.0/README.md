# Perchance Language (Mosberg)

Version **0.6.0** pushes the grammar toward maximum theme granularity for Perchance.

## What this version emphasizes

- Expanded list methods, built-ins, and Perchance-specific helpers in plugin/generator files.
- Richer highlighting for imported lists, nested list references, weights, probabilities, and property namespaces.
- More JS language coverage in hybrid blocks: nullish coalescing, optional chaining, spread, ternaries, regex, and modern operators.
- Better HTML tokenization and inline CSS scopes (style attribute properties, colors, units, and punctuation).
- Template string interpolation and escaped sequences with finer granularity.
- Additional DOM/browser/event/state scopes that match real patterns in your existing t2i files.

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
