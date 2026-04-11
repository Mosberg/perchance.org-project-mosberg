# Perchance Language (Mosberg)

A publish-ready VS Code extension for advanced **Perchance** syntax highlighting.

This extension is tuned for real-world Perchance generators and plugins that use:
- plugin imports like `{import:ai-text-plugin}`
- `$output(settings) =>` and `async generate() =>`
- nested list/config structures
- `meta:tags`-style namespaced keys
- prompt prose mixed with `[expressions]` and trailing `^weights`
- member chains like `input.description`, `settings.model.temperature`, `window.chatState.ready`
- embedded HTML and `<script>` blocks

## Features

- Advanced TextMate grammar for Perchance.
- Dedicated scopes for repo-style property lines and namespaced keys.
- Special handling for `input.*`, `settings.*`, and `window.*`.
- Prompt prose scopes for natural language lines with embedded expressions.
- Embedded JavaScript support for `<script>` blocks via `embeddedLanguages`.
- Language configuration for brackets, auto-closing pairs, folding, and indentation.

## Files

- `syntaxes/perchance.tmLanguage.json`
- `language-configuration.json`
- `media/icon.png`
- `examples/*.perchance`

## Scope examples

### Imports

```perchance
ai = {import:ai-text-plugin}
```

- `ai` -> `variable.other.assignment.perchance`
- `import` -> `support.function.import.perchance`
- `ai-text-plugin` -> `entity.name.module.perchance`

### Function definitions

```perchance
$output(settings) =>
async generate() =>
```

- `$output` / `generate` -> `entity.name.function.perchance`
- `settings` -> `variable.parameter.perchance`
- `=>` -> `storage.type.function.arrow.perchance`

### Namespaced properties

```perchance
meta:tags = [({chat:100, rewrite:70})]
```

- `meta` -> `support.type.property.namespace.perchance`
- `tags` -> `support.type.property.name.perchance`

### Member chains

```perchance
[input.description]
[settings.model.temperature]
[window.chatState.ready]
```

- `input.description` -> `variable.other.memberchain.input.perchance`
- `settings.model.temperature` -> `variable.other.memberchain.settings.perchance`
- `window.chatState.ready` -> `variable.other.memberchain.window.perchance`

### Prompt prose with weights

```perchance
prompt = Rewrite [input.userMessage] in [rewriteStyle] style. ^1.5
```

- prose -> `meta.prompt.prose.perchance`
- `[ ... ]` -> `meta.embedded.square.perchance`
- `^` -> `keyword.operator.probability.perchance`
- `1.5` -> `constant.numeric.perchance`

## Development

Open the extension folder in VS Code and press `F5` to run an Extension Development Host.

## Packaging

Install `@vscode/vsce`, then run:

```bash
vsce package
```
