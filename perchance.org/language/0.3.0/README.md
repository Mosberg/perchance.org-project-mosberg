# Perchance Language (Mosberg)

A VS Code extension for advanced **Perchance** syntax highlighting with hybrid **Perchance/JavaScript** support.

## New in 0.3.0

This pass focuses on JS-heavy Perchance bodies by treating indented arrow-function blocks as embedded JavaScript until indentation decreases.

Target patterns include:

```perchance
async generate() =>
  let pendingObj = ai(settings);
  let data = await pendingObj.onFinishPromise;
```

and callback properties such as:

```perchance
settings
  instruction() =>
    return modes[currentMode].instruction.toString();
  onFinish(data) =>
    localStorage.response = responseEl.value;
```

## Features

- Advanced TextMate grammar for Perchance.
- Dedicated scopes for namespaced keys like `meta:tags`.
- Special highlighting for `input.*`, `settings.*`, and `window.*`.
- Prompt prose handling for mixed natural-language and expression lines.
- Embedded JavaScript for `<script>` blocks.
- Embedded JavaScript for hybrid arrow-function bodies until indentation decreases.

## Hybrid scopes

- `meta.function.definition.hybrid.perchance`
- `meta.embedded.block.javascript.perchance`
- `storage.modifier.async.perchance`
- `entity.name.function.perchance`
- `storage.type.function.arrow.perchance`

## Examples

### Hybrid top-level function

```perchance
async generate() =>
  let pendingObj = ai(settings);
  let data = await pendingObj.onFinishPromise;
```

### Hybrid callback property

```perchance
settings
  instruction() =>
    return modes[currentMode].instruction.toString();
  onFinish(data) =>
    localStorage.response = responseEl.value;
```

## Development

Open the extension folder in VS Code and press `F5` to run an Extension Development Host.

## Packaging

```bash
vsce package
```
